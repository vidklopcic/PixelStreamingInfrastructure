// LGM Session Manager - Manages all active sessions

import WebSocket from 'ws';
import { LgmSession } from './LgmSession';
import { LgmConfig, LgmSessionData, LgmMessage, LgmCreateSessionData, LgmJoinSessionData, LgmMessageType } from './LgmTypes';
import { Logger } from '@epicgames-ps/lib-pixelstreamingsignalling-ue5.7';

/**
 * Manages all LGM sessions and handles session-level operations
 */
export class LgmSessionManager {
    private sessions: Map<string, LgmSession> = new Map();
    private config: LgmConfig;
    private cleanupInterval?: NodeJS.Timeout;

    constructor(config: LgmConfig) {
        this.config = config;
        this.startCleanupTimer();
        Logger.info(`LGM: SessionManager initialized with ${config.streamerPorts.length} streamer ports, ${config.liveLinkPorts.length} LiveLink ports`);
    }

    /**
     * Start the inactive session cleanup timer
     */
    private startCleanupTimer(): void {
        this.cleanupInterval = setInterval(() => {
            this.cleanupInactiveSessions();
        }, 1000);
    }

    /**
     * Stop the cleanup timer
     */
    stopCleanupTimer(): void {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }

    /**
     * Clean up sessions that have been inactive for too long
     */
    private cleanupInactiveSessions(): void {
        const now = Date.now();
        this.sessions.forEach((session, sessionSecret) => {
            if (now - session.lastMessageTs > this.config.sessionTimeoutMs) {
                Logger.info(`LGM: Closing inactive session ${sessionSecret}`);
                session.close();
                this.sessions.delete(sessionSecret);
            }
        });
    }

    /**
     * Get the number of active sessions
     */
    get sessionCount(): number {
        return this.sessions.size;
    }

    /**
     * Get maximum allowed sessions (based on streamer ports)
     */
    get maxSessions(): number {
        return this.config.streamerPorts.length;
    }

    /**
     * Check if we can create a new session
     */
    canCreateSession(): boolean {
        return this.sessions.size < this.maxSessions;
    }

    /**
     * Get the next available streamer index
     */
    private getNextStreamerIndex(): number {
        // Find first unused streamer index
        const usedIndices = new Set<number>();
        this.sessions.forEach(session => {
            usedIndices.add(session.streamerIndex);
        });

        for (let i = 0; i < this.config.streamerPorts.length; i++) {
            if (!usedIndices.has(i)) {
                return i;
            }
        }

        return -1; // No available index
    }

    /**
     * Get session by secret
     */
    getSession(sessionSecret: string): LgmSession | undefined {
        return this.sessions.get(sessionSecret);
    }

    /**
     * Check if session exists
     */
    hasSession(sessionSecret: string): boolean {
        return this.sessions.has(sessionSecret);
    }

    /**
     * Create a new session
     */
    createSession(data: LgmCreateSessionData): LgmSession | null {
        if (!this.canCreateSession()) {
            Logger.warn(`LGM: Cannot create session - max sessions (${this.maxSessions}) reached`);
            return null;
        }

        if (this.sessions.has(data.sessionSecret)) {
            Logger.warn(`LGM: Session ${data.sessionSecret} already exists`);
            return this.sessions.get(data.sessionSecret)!;
        }

        const streamerIndex = this.getNextStreamerIndex();
        if (streamerIndex === -1) {
            Logger.error('LGM: No available streamer index');
            return null;
        }

        // Get LiveLink port for this streamer index (fallback to first port if not enough ports configured)
        const liveLinkPort = this.config.liveLinkPorts[streamerIndex] || this.config.liveLinkPorts[0];

        const session = new LgmSession(
            data.sessionSecret,
            streamerIndex,
            this.config.liveLinkIp,
            liveLinkPort,
            data.contextText
        );

        this.sessions.set(data.sessionSecret, session);
        Logger.info(`LGM: Created session ${data.sessionSecret} with streamerIndex ${streamerIndex}, liveLinkPort ${liveLinkPort}`);

        return session;
    }

    /**
     * Join an existing session
     */
    joinSession(data: LgmJoinSessionData, userId: string, ws: WebSocket): LgmSession | null {
        const session = this.sessions.get(data.sessionSecret);
        if (!session) {
            Logger.warn(`LGM: Cannot join - session ${data.sessionSecret} not found`);
            return null;
        }

        session.addClient(userId, ws);
        return session;
    }

    /**
     * Close a session
     */
    closeSession(sessionSecret: string): boolean {
        const session = this.sessions.get(sessionSecret);
        if (!session) {
            return false;
        }

        session.close();
        this.sessions.delete(sessionSecret);
        Logger.info(`LGM: Closed session ${sessionSecret}`);
        return true;
    }

    /**
     * Get streamer index for a session
     */
    getStreamerIndex(sessionSecret: string): number | undefined {
        return this.sessions.get(sessionSecret)?.streamerIndex;
    }

    /**
     * Handle incoming LGM message
     * Returns true if message was handled, false otherwise
     */
    handleMessage(ws: WebSocket, msg: LgmMessage, userId: string, onSessionJoined?: (session: LgmSession) => void): boolean {
        switch (msg.type) {
            case LgmMessageType.CreateSession:
            case LgmMessageType.JoinSession: {
                const data = msg.data as LgmCreateSessionData | LgmJoinSessionData;
                let session: LgmSession | null = null;

                if (msg.type === LgmMessageType.CreateSession) {
                    if (!this.hasSession(data.sessionSecret)) {
                        if (!this.canCreateSession()) {
                            this.sendError(ws, 'sessions-exhausted',
                                'Maximum number of sessions reached. Please close an existing session.');
                            return true;
                        }
                        session = this.createSession(data as LgmCreateSessionData);
                    } else {
                        session = this.getSession(data.sessionSecret)!;
                    }
                } else {
                    if (!this.hasSession(data.sessionSecret)) {
                        this.sendError(ws, 'session-not-found',
                            `Session ${data.sessionSecret} not found`);
                        return true;
                    }
                    session = this.getSession(data.sessionSecret)!;
                }

                if (session) {
                    session.addClient(userId, ws);

                    if (msg.type === LgmMessageType.CreateSession && (msg.data as LgmCreateSessionData).contextText) {
                        session.setContextText((msg.data as LgmCreateSessionData).contextText!);
                    }

                    // Send session data to client
                    this.sendTo(ws, session.sessionSecret, {
                        type: 'session',
                        namespace: 'lgm',
                        data: session.getData()
                    });

                    // Request chat history from other clients
                    session.broadcast(userId, {
                        type: 'request-chat-history',
                        namespace: 'lgm'
                    });

                    if (onSessionJoined) {
                        onSessionJoined(session);
                    }
                }
                return true;
            }

            case LgmMessageType.CloseSession: {
                const session = this.getSessionByClient(ws);
                if (!session) {
                    this.sendError(ws, 'session-not-found', 'No active session');
                    return true;
                }
                this.closeSession(session.sessionSecret);
                return true;
            }

            case LgmMessageType.Session: {
                const session = this.getSessionByClient(ws);
                if (!session) {
                    this.sendError(ws, 'session-not-found', 'Session not found');
                    return true;
                }
                session.updateActivity();
                if ((msg.data as LgmSessionData)?.startedTimestamp) {
                    session.setStarted((msg.data as LgmSessionData).startedTimestamp!);
                }
                session.broadcast(userId, msg);
                return true;
            }

            case LgmMessageType.Ping: {
                const session = this.getSessionByClient(ws);
                if (session) {
                    session.updateActivity();
                    session.broadcast(userId, msg);
                }
                return true;
            }

            default: {
                // For any other LGM message, just broadcast to session
                const session = this.getSessionByClient(ws);
                if (session) {
                    session.updateActivity();
                    session.broadcast(userId, msg);
                    return true;
                }
                return false;
            }
        }
    }

    /**
     * Get session by client WebSocket
     */
    private getSessionByClient(ws: WebSocket): LgmSession | undefined {
        for (const session of this.sessions.values()) {
            // Check all clients in the session
            for (const [, client] of (session as any).clients) {
                if (client.ws === ws) {
                    return session;
                }
            }
        }
        return undefined;
    }

    /**
     * Send message to a specific WebSocket
     */
    private sendTo(ws: WebSocket, sessionSecret: string, message: LgmMessage): void {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                ...message,
                namespace: 'lgm',
                sessionSecret
            }));
        }
    }

    /**
     * Send error message to WebSocket
     */
    private sendError(ws: WebSocket, code: string, message: string): void {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                type: 'error',
                namespace: 'lgm',
                code,
                message
            }));
        }
    }

    /**
     * Cleanup on shutdown
     */
    shutdown(): void {
        this.stopCleanupTimer();
        this.sessions.forEach(session => session.close());
        this.sessions.clear();
        Logger.info('LGM: SessionManager shutdown complete');
    }
}
