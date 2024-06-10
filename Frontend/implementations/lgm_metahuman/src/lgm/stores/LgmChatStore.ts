import { makeAutoObservable } from 'mobx';
import { LgmApiMessage, LgmChatMessage } from '../client/LgmData';
import { LgmStore } from './LgmStore';

export class LgmChatStore {
    private base: LgmStore;
    messages: LgmChatMessage[] = [];

    constructor(base: LgmStore) {
        this.base = base;
        makeAutoObservable(this);

        this.base.client.messages.subscribe((message) => this.onMessage(message));
    }

    send(message: string) {
        this.base.client.broadcast({
            type: 'chat',
            message: {
                from: this.base.user.id,
                message: message,
                ts: Date.now()
            }
        });
    }

    private onMessage(message: LgmApiMessage) {
        switch (message.type) {
            case 'requestChatHistory':
                this.base.client.broadcast({
                    type: 'chatHistory',
                    chat: this.messages.filter((m) => m.from === this.base.user.id)
                });
                break;
            case 'chatHistory':
                const chatHistory = message.chat as LgmChatMessage[];
                this.messages = [...this.messages, ...chatHistory];
                this.messages = this.messages.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);
                this.messages.sort((a, b) => a.ts - b.ts);
                break;
            case 'chat':
                const chatMessage = message.message as LgmChatMessage;
                this.messages.push(chatMessage);
                this.messages.sort((a, b) => a.ts - b.ts);
                break;
        }
    }
}