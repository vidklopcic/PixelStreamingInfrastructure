import { autorun, makeAutoObservable, ObservableMap } from 'mobx';
import { LgmClient } from '../client/LgmClient';
import { LgmConfig } from '../LgmConfig';
import { LgmApiMessage, LgmChatMessage, LgmUser } from '../client/LgmData';
import { LgmChatStore } from './LgmChatStore';

export class LgmStore {
    user: LgmUser = {
        id: Math.random().toString(36).substring(7),
        role: undefined,
        name: undefined
    };
    client = new LgmClient(
        `${LgmConfig.LGM_SERVER_SSL ? 'wss' : 'ws'}://${LgmConfig.HOST}:${LgmConfig.LGM_SERVER_PORT}`,
        this.user.id
    );

    peers = new ObservableMap<string, LgmPeer>();
    chat: LgmChatStore;

    constructor() {
        this.chat = new LgmChatStore(this);

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
                this.client.sendMessage({
                    type: 'ping',
                    user: this.user
                });
            }
        }, 1000);

        autorun(() => {
            if (this.client.connected) {
                this.client.sendMessage({ type: 'requestChatHistory' });
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
                this.peers.set(user.id, new LgmPeer(user));
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
}

export const lgmStore = new LgmStore();