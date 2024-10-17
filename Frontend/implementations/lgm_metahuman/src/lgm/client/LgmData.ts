export interface LgmChatMessage {
    id: string;
    from: string;
    role: LgmRole;
    user: string;
    message: string;
    ts: number;
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

