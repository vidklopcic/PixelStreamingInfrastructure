export interface LgmChatMessage {
    id: string;
    from: string;
    message: string;
    ts: number;
}

export interface LgmApiMessage {
    type: string;
    fromUserId?: string;

    [key: string]: any;
}

export interface LgmUser {
    id: string;
    role?: LgmRole;
    name?: string;
}

export enum LgmRole {
    instructor = 'instructor',
    student = 'student',
    supervisor = 'supervisor',
}

