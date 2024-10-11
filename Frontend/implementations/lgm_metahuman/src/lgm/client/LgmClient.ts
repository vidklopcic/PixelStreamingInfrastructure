import { makeAutoObservable, ObservableMap } from 'mobx';
import { SocketConnector } from 'proto_socket_typescript';
import { LgmApiMessage, LgmChatMessage, LgmUser } from './LgmData';
import { Subject } from 'rxjs';

export class LgmClient {
    connection: SocketConnector;
    connected = false;
    messages = new Subject<LgmApiMessage>();
    private readonly userId: string;
    private sessionSecret?: string;
    private disposed = false;


    constructor(wsEndpoint: string, userId: string) {
        // Create a new socket connector
        this.userId = userId;
        this.connection = new SocketConnector(wsEndpoint);
        this.connection.connectedChanges.subscribe((connected) => {
            this.connected = connected;
        });
        this.connection.rx.subscribe((message) => this.onMessage(message));
        makeAutoObservable(this);
    }

    setSessionSecret(sessionSecret?: string) {
        this.sessionSecret = sessionSecret;
    }

    private onMessage(message: string) {
        try {
            const messageObject = JSON.parse(message) as LgmApiMessage;
            if (messageObject.namespace !== 'lgm') {
                return;
            }
            this.messages.next(messageObject);
        } catch (error) {
            console.error('Error parsing message', message);
            return;
        }
    }

    send(message: LgmApiMessage) {
        if (this.disposed) {
            console.warn('Trying to send message on disposed client', message);
            return;
        }
        message.fromUserId = this.userId;
        message.namespace = 'lgm';
        message.sessionSecret = this.sessionSecret;
        if (this.connected) {
            this.connection.send(JSON.stringify(message));
        }
    }

    dispose() {
        this.connection.disconnect();
        this.messages.complete();
        this.disposed = true;
    }
}

