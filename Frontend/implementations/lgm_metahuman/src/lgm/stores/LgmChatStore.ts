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
        const lgmMessage = {
            id: Math.random().toString(),
            from: this.base.user.id,
            role: this.base.user.role,
            user: this.base.user.name,
            message: message,
            ts: Date.now()
        } as LgmChatMessage;
        this.messages.push(lgmMessage);
        this.base.client.send({
            type: 'chat',
            message: lgmMessage
        });
    }

    private onMessage(message: LgmApiMessage) {
        switch (message.type) {
            case 'request-chat-history':
                this.base.client.send({
                    type: 'chat-history',
                    chat: this.messages
                });
                break;
            case 'chat-history':
                const chatHistory = message.chat as LgmChatMessage[];
                this.messages = [...this.messages, ...chatHistory];
                const uniqueMessages: { [k: string]: LgmChatMessage } = {};
                for (const message of this.messages) {
                    uniqueMessages[message.id] = message;
                }
                this.messages = Object.values(uniqueMessages);
                this.messages.sort((a, b) => a.ts - b.ts);
                break;
            case 'chat':
                const chatMessage = message.message as LgmChatMessage;
                this.messages.push(chatMessage);
                this.messages.sort((a, b) => a.ts - b.ts);
                break;
        }
    }

    dispose() {

    }
}