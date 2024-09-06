import { autorun, makeAutoObservable, ObservableMap } from 'mobx';
import { LgmClient } from '../client/LgmClient';
import { LgmConfig } from '../LgmConfig';
import { LgmApiMessage, LgmChatMessage, LgmRole, LgmUser } from '../client/LgmData';
import { LgmChatStore } from './LgmChatStore';
import { LgmWebRTCStore } from './LgmWebRTCStore';
import { createContext } from 'react';
import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';
import { LGMUeControl } from './LgmUEControl';

export const LgmStoreContext = createContext<LgmStore | undefined>(undefined);

export class LgmStore {
    user: LgmUser = {
        id: Math.random().toString(36).substring(7),
        role: undefined,
        name: undefined
    };
    client = new LgmClient(
        LgmConfig.LGM_SERVER,
        this.user.id
    );

    peers = new ObservableMap<string, LgmPeer>();
    chat: LgmChatStore;
    webrtc: LgmWebRTCStore;

    // Pixel streaming
    ueControl: LGMUeControl;
    pixelStreaming?: PixelStreaming;
    pixelStreamingConnected = false;

    constructor(role: LgmRole) {
        this.user.role = role;
        this.chat = new LgmChatStore(this);
        this.webrtc = new LgmWebRTCStore(this);
        this.ueControl = new LGMUeControl(this);

        makeAutoObservable(this);
        this.client.messages.subscribe((message) => this.onMessage(message));

        // Send a ping message every second
        setInterval(() => {
            // remove peers that have been inactive for more than 3 seconds
            const now = new Date();
            this.peers.forEach((peer, id) => {
                if (now.getTime() - peer.date.getTime() > 3000) {
                    this.peers.delete(id);
                }
            });

            // send ping message
            if (this.client.connected && this.user.role !== undefined) {
                this.client.broadcast({
                    type: 'ping',
                    user: this.user
                });
            }
        }, 1000);

        autorun(() => {
            if (this.client.connected) {
                this.client.broadcast({ type: 'requestChatHistory' });
            }
        });
    }

    get showUe() {
        return this.user.role !== undefined;
    }

    private onMessage(message: LgmApiMessage) {
        switch (message.type) {
            case 'ping':
                const user = message.user as LgmUser;
                if (user.role === undefined) {
                    console.error('Received ping message without role', user);
                    return;
                }
                const peer = this.peers.get(user.id);
                if (peer) {
                    peer.update(user);
                } else {
                    this.peers.set(user.id, new LgmPeer(user));
                    this.webrtc.createOffer(user.id);
                }
                break;
        }
    }
}

class LgmPeer {
    date = new Date();
    user: LgmUser;

    constructor(user: LgmUser) {
        this.user = user;
    }

    update(user: LgmUser) {
        this.date = new Date();
        this.user = user;
    }
}