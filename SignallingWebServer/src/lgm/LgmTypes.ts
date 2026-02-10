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
    /** LiveLink ports for UE communication (one per streamer, mapped to streamerPorts) */
    liveLinkPorts: string[];
    /** Session inactivity timeout in milliseconds */
    sessionTimeoutMs: number;
    /** URL of the media-server (mediasoup SFU) for audio routing */
    mediaServerUrl?: string;
    /** URL of the recorder service */
    recorderUrl?: string;
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
    SetSessionId = 'setSessionId',

    // Mediasoup signalling
    MediaCapabilities = 'media-capabilities',
    CreateTransport = 'create-transport',
    TransportCreated = 'transport-created',
    ConnectTransport = 'connect-transport',
    Produce = 'produce',
    ProduceResponse = 'produce-response',
    Consume = 'consume',
    ConsumerResume = 'consumer-resume',
    NewConsumer = 'new-consumer',

    // Voice changer
    VcGetModels = 'vc-get-models',
    VcModels = 'vc-models',
    VcSetModel = 'vc-set-model',
    VcSetPitch = 'vc-set-pitch',
    VcSetEnabled = 'vc-set-enabled',
    VcState = 'vc-state',

    // Recording
    StartRecording = 'start-recording',
    StopRecording = 'stop-recording',
    RecordingStatus = 'recording-status',
}
