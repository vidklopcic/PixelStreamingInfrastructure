// LGM Session - Represents a single session with connected clients

import WebSocket from 'ws';
import { LgmSessionData, LgmClient, LgmMessage } from './LgmTypes';
import { Logger } from '@epicgames-ps/lib-pixelstreamingsignalling-ue5.7';

/**
 * Represents a single LGM session with connected clients
 */
export class LgmSession {
    private clients: Map<string, LgmClient> = new Map();
    private data: LgmSessionData;

    constructor(sessionSecret: string, streamerIndex: number, liveLinkIp: string, liveLinkPort: string, contextText?: string) {
        this.data = {
            sessionSecret,
            liveLinkIp,
            liveLinkPort,
            contextText,
            createdTimestamp: Date.now(),
            streamerIndex,
            lastMessageTs: Date.now()
        };
    }

    /**
     * Get session data for client transmission
     */
    getData(): LgmSessionData {
        return { ...this.data };
    }

    /**
     * Get session secret
     */
    get sessionSecret(): string {
        return this.data.sessionSecret;
    }

    /**
     * Get assigned streamer index
     */
    get streamerIndex(): number {
        return this.data.streamerIndex;
    }

    /**
     * Get last message timestamp
     */
    get lastMessageTs(): number {
        return this.data.lastMessageTs;
    }

    /**
     * Check if session has been started
     */
    get isStarted(): boolean {
        return this.data.startedTimestamp !== undefined;
    }

    /**
     * Update session started timestamp
     */
    setStarted(timestamp: number): void {
        this.data.startedTimestamp = timestamp;
        this.updateActivity();
    }

    /**
     * Update context text
     */
    setContextText(contextText: string): void {
        this.data.contextText = contextText;
        this.updateActivity();
    }

    /**
     * Update last activity timestamp
     */
    updateActivity(): void {
        this.data.lastMessageTs = Date.now();
    }

    /**
     * Add a client to this session
     */
    addClient(userId: string, ws: WebSocket, playerId?: string): void {
        this.clients.set(userId, { ws, userId, playerId });
        this.updateActivity();
        Logger.info(`LGM: Client ${userId} joined session ${this.sessionSecret}`);
    }

    /**
     * Remove a client from this session
     */
    removeClient(userId: string): void {
        this.clients.delete(userId);
        Logger.info(`LGM: Client ${userId} left session ${this.sessionSecret}`);
    }

    /**
     * Get client by user ID
     */
    getClient(userId: string): LgmClient | undefined {
        return this.clients.get(userId);
    }

    /**
     * Check if session has any clients
     */
    hasClients(): boolean {
        return this.clients.size > 0;
    }

    /**
     * Get client count
     */
    get clientCount(): number {
        return this.clients.size;
    }

    /**
     * Send a message to a specific client
     */
    sendTo(userId: string, message: LgmMessage | string): boolean {
        const client = this.clients.get(userId);
        if (!client) {
            return false;
        }

        const msgStr = typeof message === 'string' ? message : JSON.stringify({
            ...message,
            namespace: 'lgm',
            sessionSecret: this.sessionSecret
        });

        if (client.ws.readyState === WebSocket.OPEN) {
            client.ws.send(msgStr);
            return true;
        }

        return false;
    }

    /**
     * Broadcast a message to all clients except the sender
     */
    broadcast(fromUserId: string | undefined, message: LgmMessage | string): void {
        const msgStr = typeof message === 'string' ? message : JSON.stringify({
            ...message,
            namespace: 'lgm',
            sessionSecret: this.sessionSecret
        });

        this.clients.forEach((client, userId) => {
            if (userId !== fromUserId) {
                if (client.ws.readyState === WebSocket.OPEN) {
                    client.ws.send(msgStr);
                } else {
                    // Clean up dead connections
                    this.clients.delete(userId);
                }
            }
        });
    }

    /**
     * Close session and notify all clients
     */
    close(): void {
        this.broadcast(undefined, {
            type: 'session-closed',
            namespace: 'lgm'
        });
        this.clients.clear();
        Logger.info(`LGM: Session ${this.sessionSecret} closed`);
    }
}
