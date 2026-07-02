import { makeAutoObservable } from 'mobx';
import { LgmStore } from './LgmStore';
import { LgmApiMessage, VcModelsData, VcStateData } from '../client/LgmData';

export interface VoiceModel {
    name: string;
    pthFile: string;
    indexFile: string | null;
}

export class LgmVoiceChangerStore {
    private base: LgmStore;

    models: VoiceModel[] = [];
    selectedModel: string | null = null;
    pitch = 0;
    enabled = false;
    status: 'idle' | 'loading' | 'ready' | 'failed' = 'idle';

    get loading() {
        return this.status === 'loading';
    }

    get failed() {
        return this.status === 'failed';
    }

    constructor(base: LgmStore) {
        this.base = base;
        makeAutoObservable(this);
        this.base.client.messages.subscribe((message) => this.onMessage(message));
    }

    private onMessage(message: LgmApiMessage) {
        switch (message.type) {
            case 'vc-models':
                this.handleModels(message);
                break;
            case 'vc-state':
                this.handleState(message);
                break;
        }
    }

    private handleModels(message: LgmApiMessage) {
        const data = message.data as any;
        if (Array.isArray(data?.models)) {
            this.models = data.models;
        } else if (Array.isArray(data)) {
            this.models = data;
        } else {
            this.models = [];
        }
    }

    private handleState(message: LgmApiMessage) {
        const data = message.data as VcStateData;
        if (!data) return;
        this.selectedModel = data.model ?? null;
        this.pitch = data.pitch ?? 0;
        this.enabled = data.enabled ?? false;
        // Older servers don't report status; treat a state reply as idle then.
        this.status = data.status ?? 'idle';
    }

    requestModels() {
        this.base.client.send({
            type: 'vc-get-models',
            data: {}
        });
    }

    requestState() {
        this.base.client.send({
            type: 'vc-get-state',
            data: {}
        });
    }

    setModel(modelName: string) {
        if (this.enabled) {
            this.status = 'loading';
        }
        this.selectedModel = modelName;
        this.base.client.send({
            type: 'vc-set-model',
            data: { model_name: modelName }
        });
    }

    setPitch(semitones: number) {
        this.pitch = semitones;
        this.base.client.send({
            type: 'vc-set-pitch',
            data: { semitones }
        });
    }

    setEnabled(enabled: boolean) {
        this.enabled = enabled;
        this.status = enabled && this.selectedModel ? 'loading' : 'idle';
        this.base.client.send({
            type: 'vc-set-enabled',
            data: { enabled }
        });
    }

    dispose() {}
}
