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
    enabled = true;
    loading = false;

    constructor(base: LgmStore) {
        this.base = base;
        this.base.client.messages.subscribe((message) => this.onMessage(message));
        makeAutoObservable(this);
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
        // Normalize: handle both { models: [...] } and raw array
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
        this.loading = false;
    }

    requestModels() {
        this.base.client.send({
            type: 'vc-get-models',
            data: {}
        });
    }

    setModel(modelName: string) {
        this.loading = true;
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
        this.base.client.send({
            type: 'vc-set-enabled',
            data: { enabled }
        });
    }

    dispose() {}
}
