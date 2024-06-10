import { makeAutoObservable, ObservableMap } from 'mobx';
import { SocketConnector } from 'proto_socket_typescript';
import { LgmApiMessage, LgmChatMessage, LgmUser } from './LgmData';
import { Subject } from 'rxjs';

export class LgmClient {
    connection: SocketConnector;
    connected = false;
    messages = new Subject<LgmApiMessage>();
    private userId: string;

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

    private onMessage(message: string) {
        const messageObject = JSON.parse(message) as LgmApiMessage;
        console.log('LGMMessage:', messageObject.type);
        this.messages.next(messageObject);
    }

    sendMessage(message: LgmApiMessage) {
        message.from = this.userId;
        this.connection.send(JSON.stringify(message));
    }
}

