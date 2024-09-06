import { autorun, makeAutoObservable, ObservableMap } from 'mobx';
import { LgmClient } from '../client/LgmClient';
import { LgmConfig } from '../LgmConfig';
import { LgmApiMessage, LgmChatMessage, LgmRole, LgmUser } from '../client/LgmData';
import { LgmChatStore } from './LgmChatStore';
import { LgmWebRTCStore } from './LgmWebRTCStore';
import { createContext } from 'react';
import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';
import { LgmStore } from './LgmStore';

export class LGMUeControl {
    base: LgmStore;

    constructor(base: LgmStore) {
        this.base = base;
        makeAutoObservable(this);
    }

    setLevel(index: number) {
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'level',
            'index': index.toString()
        });
    }

    setChild(index: number) {
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'child',
            'index': index.toString()
        });
    }
}