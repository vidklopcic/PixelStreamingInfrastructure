import { autorun, makeAutoObservable, ObservableMap } from 'mobx';
import { LgmClient } from '../client/LgmClient';
import { LgmConfig } from '../LgmConfig';
import {
    LgmApiMessage,
    LgmCreateSessionData,
    LgmJoinSessionData,
    LgmRole,
    LgmSession,
    LgmUser
} from '../client/LgmData';
import { LgmChatStore } from './LgmChatStore';
import { LgmWebRTCStore } from './LgmWebRTCStore';
import { LgmVoiceChangerStore } from './LgmVoiceChangerStore';
import { createContext, useContext } from 'react';
import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.7';
import { LGMUeControl } from './LgmUEControl';
import { toast } from 'react-toastify';

export const LgmStoreContext = createContext<LgmStore | undefined>(undefined);

export class LgmStore {
    private joined = false;
    private sessionSecret: string;
    private sessionContext?: string;
    session?: LgmSession = undefined;

    user: LgmUser = {
        id: Math.random().toString(36).substring(7),
        role: undefined,
        name: undefined
    };
    client = new LgmClient(
        LgmConfig.SIGNALLING_SERVER,
        this.user.id
    );

    peers = new ObservableMap<string, LgmPeer>();
    chat: LgmChatStore;
    webrtc: LgmWebRTCStore;
    voiceChanger: LgmVoiceChangerStore;

    // Pixel streaming
    private pingInterval?: any;
    errorCode?: string = undefined;
    sessionEnded = false;
    recording = false;

    get hasSession() {
        return this.session !== undefined;
    };

    /** Session secret ("password") this store was created for - stays
     *  available after the session ends (the URL hash is cleared then). */
    get sessionId(): string {
        return this.sessionSecret;
    }

    get sessionActive() {
        return this.session?.startedTimestamp !== undefined;
    }

    ueControl: LGMUeControl;
    pixelStreaming?: PixelStreaming = undefined;
    pixelStreamingConnected = false;

    get isConnected() {
        return this.client.connected;
    }

    get hasStream() {
        return this.user.role === LgmRole.supervisor || this.webrtc.localStream !== undefined;
    }

    get streamRejected() {
        return this.webrtc.accessRejected;
    }

    get canStartSession() {
        return this.user.role === LgmRole.instructor && !this.hasSession && this.session.startedTimestamp === undefined;
    }

    get canEndSession() {
        return this.hasSession && this.session.startedTimestamp !== undefined && !this.sessionEnded;
    }

    constructor(role: LgmRole, participantName: string, sessionSecret: string, contextInfo?: string) {
        const urlParams = new URLSearchParams();
        urlParams.set('role', role);
        urlParams.set('name', participantName);
        urlParams.set('session', sessionSecret);
        // Preserve the signalling-server override (see LgmConfig) across the hash rewrite
        const ss = new URLSearchParams(window.location.hash.substring(1)).get('ss');
        if (ss) urlParams.set('ss', ss);
        window.location.hash = urlParams.toString();

        this.user.role = role;
        this.user.name = participantName;
        this.sessionSecret = sessionSecret;
        this.sessionContext = contextInfo;

        this.chat = new LgmChatStore(this);
        this.webrtc = new LgmWebRTCStore(this);
        this.voiceChanger = new LgmVoiceChangerStore(this);
        this.ueControl = new LGMUeControl(this);

        makeAutoObservable(this);
        this.client.messages.subscribe((message) => this.onMessage(message));

        // Re-create/join the session on EVERY (re)connect, not just the first:
        // the server closes sessions after session_timeout of silence (long
        // network outage), and a reconnecting client that doesn't re-join is
        // stuck with "session not found" forever. createSession is idempotent
        // server-side, so re-sending is safe.
        autorun(() => {
            if (this.client.connected && !this.sessionEnded) {
                this.createSession(this.sessionSecret, this.sessionContext);
            }
        });

        autorun(() => {
            if (this.pixelStreaming !== undefined) {
                this.pixelStreaming.addResponseEventListener('handle_responses', (response: string) => {
                    this.ueControl.parseState(response);
                });
            }
        });
    }

    /**
     * Re-send create/join-session on the live socket. The server responds
     * with media-capabilities, which rebuilds the whole media pipeline -
     * used to recover when the WebRTC transports die while the WS is up.
     */
    resendJoin() {
        if (this.client.connected && !this.sessionEnded) {
            this.createSession(this.sessionSecret, this.sessionContext);
        }
    }

    join() {
        if (!this.hasSession) {
            throw new Error('Session is not set');
        }
        if (!this.hasStream) {
            throw new Error('No audio / video stream available');
        }
        if (this.joined) {
            return;
        }
        this.joined = true;
        this.voiceChanger.bootstrap();
        // Send a ping message every second
        this.pingInterval = setInterval(() => {
            // remove peers that have been inactive for more than 3 seconds
            const now = new Date();
            this.peers.forEach((peer, id) => {
                if (now.getTime() - peer.date.getTime() > 3000) {
                    this.peers.delete(id);
                }
            });

            // send ping message
            if (this.client.connected && this.user.role !== undefined) {
                this.client.send({
                    type: 'ping',
                    user: this.user
                });
            }
        }, 1000);
    }

    private onMessage(message: LgmApiMessage) {
        switch (message.type) {
            case 'ping':
                if (!this.joined) {
                    return;
                }
                const user = message.user as LgmUser;
                if (user.role === undefined) {
                    console.error('Received ping message without role', user);
                    return;
                }
                const peer = this.peers.get(user.id);
                if (peer) {
                    peer.update(user);
                } else {
                    this.peers.set(user.id, new LgmPeer(user));
                }
                break;
            case 'session':
                this.sessionEnded = false;
                this.session = message.data as LgmSession;
                break;
            case 'session-closed':
                this.dispose();
                this.sessionEnded = true;
                window.location.hash = '';
                break;
            case 'recording-status':
                this.recording = message.data?.recording ?? false;
                // The server reports recording failures (capture produced no
                // video, compositing failed, recorder restarted) through this
                // message so every client resets its recording state. Only the
                // instructor - who owns the recording - sees the error toast.
                if (message.data?.error && this.user.role === LgmRole.instructor) {
                    toast.error(message.data.error);
                }
                break;
            case 'error':
                this.errorCode = message.code;
                toast.error(message.message);
                // A rejected start must not leave the optimistic red
                // record button claiming a recording is running.
                if (message.code === 'recorder-error') {
                    this.recording = false;
                }
                break;
        }
    }

    dispose() {
        this.client.dispose();
        this.chat.dispose();
        this.webrtc.dispose();
        this.voiceChanger.dispose();
        this.ueControl.dispose();
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
        }
    }

    private createSession(sessionSecret: string, sessionContext?: string) {
        this.client.setSessionSecret(sessionSecret);
        let data = {
            userName: this.user.name,
            sessionSecret: sessionSecret
        } as LgmJoinSessionData;
        if (this.user.role === LgmRole.instructor) {
            this.client.send({
                type: 'create-session',
                data: {
                    ...data,
                    contextText: sessionContext
                } as LgmCreateSessionData
            });
        } else {
            this.client.send({
                type: 'join-session',
                data: data
            });
        }
    }

    startSession() {
        if (this.user.role !== LgmRole.instructor) {
            throw new Error('Only instructors can start a session');
        }
        this.session.startedTimestamp = Date.now();
        this.client.send({
            type: 'session', data: this.session
        });
    }

    endSession() {
        this.client.send({ type: 'close-session' });
    }

    startRecording() {
        this.client.send({ type: 'start-recording' });
        this.recording = true;
    }

    stopRecording() {
        this.client.send({ type: 'stop-recording' });
        this.recording = false;
    }
}

class LgmPeer {
    date = new Date();
    user: LgmUser;

    constructor(user: LgmUser) {
        this.user = user;
    }

    update(user: LgmUser) {
        this.date = new Date();
        this.user = user;
    }
}