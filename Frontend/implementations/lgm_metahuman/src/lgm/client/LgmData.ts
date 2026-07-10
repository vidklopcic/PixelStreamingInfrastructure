export interface LgmChatMessage {
    id: string;
    from: string;
    role: LgmRole;
    user: string;
    message: string;
    ts: number;
    // Stamped by the signalling server on relay. Client clocks skew, so
    // ordering by sender-side ts shuffled conversations; the server is the
    // single serialization point.
    serverTs?: number;
}

export interface LgmApiMessage {
    type: string;
    namespace?: string;
    sessionSecret?: string;
    fromUserId?: string;

    [key: string]: any;
}

export interface LgmSession {
    sessionSecret?: string;
    liveLinkIp?: string;
    liveLinkPort?: string;
    contextText?: string;
    startedTimestamp?: number;
    createdTimestamp?: number;
}

export interface LgmUser {
    id: string;
    role?: LgmRole;
    name?: string;
}

export interface LgmJoinSessionData {
    userName: string;
    sessionSecret: string;
}

export interface LgmCreateSessionData extends LgmJoinSessionData {
    contextText: string;
}

export enum LgmRole {
    instructor = 'instructor',
    student = 'student',
    supervisor = 'supervisor',
}

// Mediasoup signalling message types
export interface MediaCapabilitiesData {
    rtpCapabilities: any;
}

export interface TransportCreatedData {
    id: string;
    iceParameters: any;
    iceCandidates: any[];
    dtlsParameters: any;
    // STUN/TURN servers from the signalling config - the TURN relay is the
    // only path to the media server on networks that block its port range.
    iceServers?: any[];
}

export interface ProduceResponseData {
    id: string;
    kind: string;
}

export interface ConsumeResponseData {
    consumers: Array<{
        id: string;
        producerId: string;
        kind: string;
        rtpParameters: any;
    }>;
}

// Voice changer message types
export interface VcModelsData {
    models: Array<{ name: string; pthFile: string; indexFile: string }>;
}

export interface VcStateData {
    model: string | null;
    pitch: number;
    enabled: boolean;
    /** Voice model load status reported by the voice changer service. */
    status?: 'idle' | 'loading' | 'ready' | 'failed';
}

