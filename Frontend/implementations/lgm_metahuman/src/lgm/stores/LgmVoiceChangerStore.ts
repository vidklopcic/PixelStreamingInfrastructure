import { makeAutoObservable } from 'mobx';
import { LgmStore } from './LgmStore';
import { LgmApiMessage, VcModelsData, VcStateData } from '../client/LgmData';
import { audioNormalizer } from './LgmAudioNormalizer';

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
        // The UI slider / auto-normalizer computes the gain in-browser, but
        // it is APPLIED as a static multiplier in the voice changer server
        // (an in-browser WebAudio send path corrupted the outgoing audio).
        audioNormalizer.sink = (gain) => this.setGain(gain);
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

    private stateReceived = false;

    /**
     * Fetch models + state once the session is joined, retrying until the
     * first reply arrives (the websocket→session binding on the signalling
     * server settles with the first session messages). Without this the
     * status indicator stays blank after a reload until the dialog is opened.
     */
    bootstrap() {
        let attempts = 0;
        const tick = () => {
            if (this.stateReceived || attempts >= 5) return;
            attempts++;
            this.requestModels();
            this.requestState();
            setTimeout(tick, 2000);
        };
        tick();
    }

    private handleState(message: LgmApiMessage) {
        const data = message.data as VcStateData;
        if (!data) return;
        this.stateReceived = true;
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

    setGain(gain: number) {
        this.base.client.send({
            type: 'vc-set-gain',
            data: { gain }
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
        if (enabled && !this.selectedModel) {
            // Enabling without a model is a silent no-op server-side; pick the
            // first model so the toggle always does something predictable.
            if (this.models.length === 0) return;
            this.selectedModel = this.models[0].name;
            this.base.client.send({
                type: 'vc-set-model',
                data: { model_name: this.selectedModel }
            });
        }
        this.enabled = enabled;
        this.status = enabled ? 'loading' : 'idle';
        this.base.client.send({
            type: 'vc-set-enabled',
            data: { enabled }
        });
    }

    dispose() {}
}
