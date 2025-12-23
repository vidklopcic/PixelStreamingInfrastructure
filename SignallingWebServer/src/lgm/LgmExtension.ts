// LGM Extension - Main integration point for LGM session management
// This module hooks into the SignallingServer without modifying core files

import * as wslib from 'ws';
import http from 'http';
import {
    SignallingServer,
    Logger,
    StreamerConnection,
    IServerConfig
} from '@epicgames-ps/lib-pixelstreamingsignalling-ue5.7';
import { LgmSessionManager } from './LgmSessionManager';
import { LgmConfig, LgmMessage, LgmPlayerInfo } from './LgmTypes';
import { LgmSession } from './LgmSession';

/**
 * Extended server config with LGM options
 */
export interface LgmServerConfig extends IServerConfig {
    lgm?: LgmConfig;
}

/**
 * LGM Extension - Adds session management and multi-streamer support
 * to the Pixel Streaming signalling server.
 *
 * Design principles:
 * - Does NOT modify core SignallingServer files
 * - Uses composition and event hooking
 * - All LGM-specific code is isolated here
 * - Easy to maintain during upstream merges
 */
export class LgmExtension {
    private server: SignallingServer;
    private sessionManager: LgmSessionManager;
    private config: LgmConfig;

    // Multi-streamer support
    private streamerServers: wslib.WebSocketServer[] = [];
    private streamerConnections: (StreamerConnection | undefined)[] = [];

    // Player-session bindings (playerId -> session info)
    private playerSessionBindings: Map<string, LgmPlayerInfo> = new Map();

    // WebSocket -> userId mapping for LGM clients
    private wsToUserId: Map<wslib.WebSocket, string> = new Map();

    constructor(server: SignallingServer, config: LgmConfig) {
        this.server = server;
        this.config = config;
        this.sessionManager = new LgmSessionManager(config);

        // Initialize streamer connections array
        for (let i = 0; i < config.streamerPorts.length; i++) {
            this.streamerConnections.push(undefined);
        }

        this.initMultiStreamer();
        this.hookPlayerMessages();

        Logger.info(`LGM: Extension initialized with ${config.streamerPorts.length} streamer ports`);
    }

    /**
     * Initialize multiple streamer WebSocket servers
     * Each session gets its own dedicated streamer
     */
    private initMultiStreamer(): void {
        // Skip the first port as it's handled by the main SignallingServer
        // We only create additional servers for ports beyond the first
        for (let i = 1; i < this.config.streamerPorts.length; i++) {
            const port = this.config.streamerPorts[i];
            const streamerServer = new wslib.WebSocketServer({
                port,
                backlog: 1
            });

            streamerServer.on('connection', (ws: wslib.WebSocket, request: http.IncomingMessage) => {
                this.onStreamerConnected(ws, request, i);
            });

            this.streamerServers.push(streamerServer);
            Logger.info(`LGM: Listening for streamer connections on port ${port} (index ${i})`);
        }
    }

    /**
     * Handle streamer connection for a specific index
     */
    private onStreamerConnected(ws: wslib.WebSocket, request: http.IncomingMessage, streamerIndex: number): void {
        Logger.info(`LGM: Streamer connected on port ${this.config.streamerPorts[streamerIndex]} (index ${streamerIndex})`);

        // Create a new StreamerConnection using the server's infrastructure
        const newStreamer = new StreamerConnection(
            this.server,
            ws,
            request.socket.remoteAddress
        );
        newStreamer.maxSubscribers = (this.server.config as any).maxSubscribers || 0;

        // Store reference by index
        this.streamerConnections[streamerIndex] = newStreamer;

        // Add to registry
        this.server.streamerRegistry.add(newStreamer);

        // Handle disconnect
        newStreamer.transport.on('close', () => {
            this.server.streamerRegistry.remove(newStreamer);
            this.streamerConnections[streamerIndex] = undefined;
            Logger.info(`LGM: Streamer ${newStreamer.streamerId} (index ${streamerIndex}) disconnected`);
        });

        // Send config message
        const configMessage = {
            type: 'config',
            protocolVersion: this.server.protocolConfig.protocolVersion,
            peerConnectionOptions: this.server.protocolConfig.peerConnectionOptions || {}
        };
        newStreamer.sendMessage(configMessage as any);
    }

    /**
     * Hook into player message handling
     * Intercepts raw WebSocket messages before protocol processing
     */
    private hookPlayerMessages(): void {
        // We need to hook into the player registry to intercept new connections
        const originalAdd = this.server.playerRegistry.add.bind(this.server.playerRegistry);

        this.server.playerRegistry.add = (player: any) => {
            // Call original add
            originalAdd(player);

            // Hook into the player's protocol for LGM messages
            this.hookPlayerProtocol(player);
        };
    }

    /**
     * Hook into a player's protocol to handle LGM messages
     */
    private hookPlayerProtocol(player: any): void {
        const ws = (player.transport as any).socket as wslib.WebSocket;
        const playerId = player.playerId;

        // Store original onMessage handler
        const originalOnMessage = player.transport.onMessage;

        // Create wrapped message handler
        player.transport.onMessage = (msgStr: string) => {
            try {
                const msg = JSON.parse(msgStr);

                // Check for LGM namespace
                if (msg.namespace === 'lgm') {
                    this.handleLgmMessage(ws, msg, playerId);
                    return; // Don't pass to original handler
                }

                // Check for setSessionId (special player message for session binding)
                if (msg.type === 'setSessionId') {
                    this.handleSetSessionId(player, msg);
                    // Still pass to original handler for logging
                }

                // Check for listStreamers - we need to filter by session
                if (msg.type === 'listStreamers') {
                    const binding = this.playerSessionBindings.get(playerId);
                    if (binding && binding.streamerIndex !== undefined) {
                        // Override listStreamers to only show the session's streamer
                        this.handleFilteredListStreamers(player, binding.streamerIndex);
                        return; // Don't pass to original handler
                    }
                }
            } catch (e) {
                // Parse error, let original handler deal with it
            }

            // Pass to original handler
            if (originalOnMessage) {
                originalOnMessage(msgStr);
            }
        };

        // Handle player disconnect
        player.transport.on('close', () => {
            this.playerSessionBindings.delete(playerId);
            this.wsToUserId.delete(ws);
        });
    }

    /**
     * Handle LGM namespace messages
     */
    private handleLgmMessage(ws: wslib.WebSocket, msg: LgmMessage, playerId: string): void {
        const userId = msg.fromUserId || playerId;

        // Store ws -> userId mapping
        this.wsToUserId.set(ws, userId);

        Logger.debug(`LGM: Received ${msg.type} from ${userId}`);

        // Delegate to session manager
        this.sessionManager.handleMessage(ws, msg, userId, (session: LgmSession) => {
            // When session is joined, bind player to session's streamer
            this.playerSessionBindings.set(playerId, {
                playerId,
                sessionSecret: session.sessionSecret,
                streamerIndex: session.streamerIndex,
                userId
            });
        });
    }

    /**
     * Handle setSessionId message from player
     * Binds player to session's streamer index
     */
    private handleSetSessionId(player: any, msg: any): void {
        const session = this.sessionManager.getSession(msg.sessionSecret);
        if (session) {
            this.playerSessionBindings.set(player.playerId, {
                playerId: player.playerId,
                sessionSecret: msg.sessionSecret,
                streamerIndex: session.streamerIndex,
                userId: msg.userId
            });
            Logger.info(`LGM: Player ${player.playerId} bound to session ${msg.sessionSecret} (streamer ${session.streamerIndex})`);
        }
    }

    /**
     * Handle filtered listStreamers for session-bound players
     * Only returns the streamer assigned to their session
     */
    private handleFilteredListStreamers(player: any, streamerIndex: number): void {
        const streamer = this.getStreamerByIndex(streamerIndex);
        const ids: string[] = [];

        if (streamer && (streamer as any).streaming) {
            ids.push(streamer.streamerId);
        }

        const listMessage = {
            type: 'streamerList',
            ids
        };

        player.sendMessage(listMessage);
        Logger.debug(`LGM: Sent filtered streamerList to player ${player.playerId}: ${JSON.stringify(ids)}`);
    }

    /**
     * Get streamer by index
     */
    getStreamerByIndex(index: number): StreamerConnection | undefined {
        if (index === 0) {
            // First streamer is managed by main SignallingServer
            // Get first streamer from registry
            const streamers = this.server.streamerRegistry.streamers;
            if (streamers.length > 0) {
                // Find a streamer that's not in our additional connections
                for (const s of streamers) {
                    let isAdditional = false;
                    for (let i = 1; i < this.streamerConnections.length; i++) {
                        if (this.streamerConnections[i] === s) {
                            isAdditional = true;
                            break;
                        }
                    }
                    if (!isAdditional) {
                        return s as StreamerConnection;
                    }
                }
            }
            return undefined;
        }
        return this.streamerConnections[index];
    }

    /**
     * Get the session manager
     */
    getSessionManager(): LgmSessionManager {
        return this.sessionManager;
    }

    /**
     * Get player's session binding
     */
    getPlayerBinding(playerId: string): LgmPlayerInfo | undefined {
        return this.playerSessionBindings.get(playerId);
    }

    /**
     * Shutdown the LGM extension
     */
    shutdown(): void {
        // Close all additional streamer servers
        for (const server of this.streamerServers) {
            server.close();
        }
        this.streamerServers = [];
        this.streamerConnections = [];

        // Shutdown session manager
        this.sessionManager.shutdown();

        // Clear bindings
        this.playerSessionBindings.clear();
        this.wsToUserId.clear();

        Logger.info('LGM: Extension shutdown complete');
    }
}

/**
 * Create and initialize LGM extension
 */
export function createLgmExtension(server: SignallingServer, config: LgmConfig): LgmExtension {
    return new LgmExtension(server, config);
}
