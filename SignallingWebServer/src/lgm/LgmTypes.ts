// LGM Session Types - Modular extension for Pixel Streaming signalling server

import WebSocket from 'ws';

/**
 * Configuration for LGM extension
 */
export interface LgmConfig {
    /** Array of ports for multiple streamers (one per session) */
    streamerPorts: number[];
    /** LiveLink IP address for UE communication */
    liveLinkIp: string;
    /** LiveLink port for UE communication */
    liveLinkPort: string;
    /** Session inactivity timeout in milliseconds */
    sessionTimeoutMs: number;
}

/**
 * LGM Session data structure
 */
export interface LgmSessionData {
    sessionSecret: string;
    liveLinkIp: string;
    liveLinkPort: string;
    contextText?: string;
    startedTimestamp?: number;
    createdTimestamp: number;
    streamerIndex: number;
    lastMessageTs: number;
}

/**
 * LGM message base interface
 */
export interface LgmMessage {
    type: string;
    namespace: 'lgm';
    sessionSecret?: string;
    fromUserId?: string;
    data?: unknown;
}

/**
 * Create session message data
 */
export interface LgmCreateSessionData {
    sessionSecret: string;
    contextText?: string;
    userName?: string;
}

/**
 * Join session message data
 */
export interface LgmJoinSessionData {
    sessionSecret: string;
    userName?: string;
}

/**
 * Error message structure
 */
export interface LgmErrorMessage {
    type: 'error';
    namespace: 'lgm';
    code: string;
    message: string;
}

/**
 * Session client entry
 */
export interface LgmClient {
    ws: WebSocket;
    userId: string;
    playerId?: string;
}

/**
 * Extended player info with LGM session binding
 */
export interface LgmPlayerInfo {
    playerId: string;
    sessionSecret?: string;
    streamerIndex?: number;
    userId?: string;
}

/**
 * LGM message types enum
 */
export enum LgmMessageType {
    CreateSession = 'create-session',
    JoinSession = 'join-session',
    CloseSession = 'close-session',
    Session = 'session',
    SessionClosed = 'session-closed',
    Ping = 'ping',
    Error = 'error',
    RequestChatHistory = 'request-chat-history',
    SetSessionId = 'setSessionId'
}
