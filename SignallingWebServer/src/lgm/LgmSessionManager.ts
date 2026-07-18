// LGM Session Manager - Manages all active sessions

import WebSocket from 'ws';
import { LgmSession } from './LgmSession';
import { LgmConfig, LgmSessionData, LgmMessage, LgmCreateSessionData, LgmJoinSessionData, LgmMessageType } from './LgmTypes';
import { LgmMediaClient } from './LgmMediaClient';
import { Logger } from '@epicgames-ps/lib-pixelstreamingsignalling-ue5.7';

/**
 * Manages all LGM sessions and handles session-level operations
 */
export class LgmSessionManager {
    private sessions: Map<string, LgmSession> = new Map();
    private config: LgmConfig;
    private cleanupInterval?: NodeJS.Timeout;
    private mediaClient?: LgmMediaClient;
    private recorderUrl?: string;

    // Cache rtpCapabilities per session for sending to clients on join
    private sessionRtpCapabilities: Map<string, any> = new Map();

    // Active voice-changer status pollers (sessionSecret -> timer)
    private vcStatusPollers: Map<string, NodeJS.Timeout> = new Map();

    // Active recording watchdog pollers (sessionSecret -> timer)
    private recordingPollers: Map<string, NodeJS.Timeout> = new Map();
    // consumer-resume requests from students parked until session start
    // (consumers are created paused on the media server) - see ConsumerResume
    private heldStudentResumes: Map<string, Set<string>> = new Map();

    constructor(config: LgmConfig) {
        this.config = config;
        if (config.mediaServerUrl) {
            this.mediaClient = new LgmMediaClient(config.mediaServerUrl);
            Logger.info(`LGM: Media-server integration enabled at ${config.mediaServerUrl}`);
        }
        if (config.recorderUrl) {
            this.recorderUrl = config.recorderUrl.replace(/\/$/, '');
            Logger.info(`LGM: Recorder integration enabled at ${this.recorderUrl}`);
        }
        this.startCleanupTimer();
        Logger.info(`LGM: SessionManager initialized with ${config.streamerPorts.length} streamer ports, ${config.liveLinkPorts.length} LiveLink ports`);
    }

    /**
     * Get the media client for direct use by LgmExtension
     */
    getMediaClient(): LgmMediaClient | undefined {
        return this.mediaClient;
    }

    /**
     * Get cached RTP capabilities for a session
     */
    getSessionRtpCapabilities(sessionSecret: string): any | undefined {
        return this.sessionRtpCapabilities.get(sessionSecret);
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
        const toClose: string[] = [];
        this.sessions.forEach((session, sessionSecret) => {
            if (now - session.lastMessageTs > this.config.sessionTimeoutMs) {
                toClose.push(sessionSecret);
            }
        });
        for (const sessionSecret of toClose) {
            Logger.info(`LGM: Closing inactive session ${sessionSecret}`);
            this.closeSession(sessionSecret);
        }
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

        // Create media session on media-server (async, non-blocking)
        if (this.mediaClient) {
            this.mediaClient.createSession(data.sessionSecret)
                .then((result) => {
                    this.sessionRtpCapabilities.set(data.sessionSecret, result.rtpCapabilities);
                    Logger.info(`LGM: Media session created for ${data.sessionSecret}`);
                })
                .catch((err) => {
                    Logger.error(`LGM: Failed to create media session for ${data.sessionSecret}: ${err}`);
                });
        }

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
        this.sessionRtpCapabilities.delete(sessionSecret);
        this.stopRecordingWatch(sessionSecret);
        this.heldStudentResumes.delete(sessionSecret);

        // Delete media session on media-server (async, non-blocking)
        if (this.mediaClient) {
            this.mediaClient.deleteSession(sessionSecret).catch((err) => {
                Logger.warn(`LGM: Failed to delete media session ${sessionSecret}: ${err}`);
            });
        }

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
     * Replay consumer resumes that were parked while the session had not
     * started yet. Stale ids (student reconnected pre-start) fail the resume
     * harmlessly - the reconnect created fresh consumers that were parked too.
     */
    private releaseHeldResumes(session: LgmSession): void {
        const held = this.heldStudentResumes.get(session.sessionSecret);
        if (!held || !this.mediaClient) return;
        this.heldStudentResumes.delete(session.sessionSecret);
        for (const consumerId of Array.from(held)) {
            Logger.info(`LGM: releasing held consumer ${consumerId} resume for started session ${session.sessionSecret}`);
            this.mediaClient.resumeConsumer(session.sessionSecret, consumerId)
                .catch((err) => {
                    Logger.warn(`LGM: held resumeConsumer ${consumerId} failed: ${err}`);
                });
        }
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
                            // Log who is holding the slots - "maximum sessions
                            // reached" reports were untraceable without this
                            // (an idle tab can hold a session alive for hours).
                            const holders = Array.from(this.sessions.values()).map(s =>
                                `${s.sessionSecret} (age ${Math.round((Date.now() - (s.getData().createdTimestamp ?? Date.now())) / 60000)}min, ` +
                                `${(s as any).clients?.size ?? '?'} clients, ` +
                                `last activity ${Math.round((Date.now() - s.lastMessageTs) / 1000)}s ago)`
                            ).join('; ');
                            Logger.warn(`LGM: create-session '${data.sessionSecret}' rejected - slots held by: ${holders}`);
                            this.sendError(ws, 'sessions-exhausted',
                                'Maximum number of sessions reached. Another session is still active - ' +
                                'sessions close automatically ~30s after their last participant leaves, ' +
                                'so make sure no other tab or device is still connected.');
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

                    // Send media capabilities if available
                    const rtpCapabilities = this.sessionRtpCapabilities.get(session.sessionSecret);
                    if (rtpCapabilities) {
                        this.sendTo(ws, session.sessionSecret, {
                            type: LgmMessageType.MediaCapabilities,
                            namespace: 'lgm',
                            data: { rtpCapabilities }
                        });
                    } else if (this.mediaClient) {
                        // Capabilities not cached yet, fetch and send
                        this.mediaClient.createSession(session.sessionSecret)
                            .then((result) => {
                                this.sessionRtpCapabilities.set(session!.sessionSecret, result.rtpCapabilities);
                                this.sendTo(ws, session!.sessionSecret, {
                                    type: LgmMessageType.MediaCapabilities,
                                    namespace: 'lgm',
                                    data: { rtpCapabilities: result.rtpCapabilities }
                                });
                            })
                            .catch((err) => {
                                Logger.error(`LGM: Failed to get media capabilities: ${err}`);
                            });
                    }

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
                    this.releaseHeldResumes(session);
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

            // Mediasoup signalling messages - proxy to media-server
            case LgmMessageType.CreateTransport: {
                if (!this.mediaClient) return true;
                const session = this.getSessionByClient(ws);
                if (!session) return true;
                session.updateActivity();

                const { role } = msg.data as any;
                const transportClient = session.getClient(userId);
                if (transportClient && role) {
                    transportClient.role = role;
                }
                this.mediaClient.createTransport(session.sessionSecret, role, userId)
                    .then((result) => {
                        this.sendTo(ws, session.sessionSecret, {
                            type: LgmMessageType.TransportCreated,
                            namespace: 'lgm',
                            // iceServers give the client a TURN fallback for
                            // networks that block the media-server port range
                            data: { ...result, iceServers: this.config.iceServers }
                        });
                    })
                    .catch((err) => {
                        // If media session doesn't exist (e.g. media-server restarted), recreate and retry
                        if (String(err).includes('404')) {
                            Logger.warn(`LGM: Media session not found for ${session.sessionSecret}, recreating...`);
                            this.sessionRtpCapabilities.delete(session.sessionSecret);
                            this.mediaClient!.createSession(session.sessionSecret)
                                .then(() => this.mediaClient!.createTransport(session.sessionSecret, role, userId))
                                .then((result) => {
                                    this.sendTo(ws, session.sessionSecret, {
                                        type: LgmMessageType.TransportCreated,
                                        namespace: 'lgm',
                                        data: { ...result, iceServers: this.config.iceServers }
                                    });
                                })
                                .catch((retryErr) => {
                                    Logger.error(`LGM: createTransport retry failed: ${retryErr}`);
                                    this.sendError(ws, 'media-error', 'Failed to create transport');
                                });
                        } else {
                            Logger.error(`LGM: createTransport failed: ${err}`);
                            this.sendError(ws, 'media-error', 'Failed to create transport');
                        }
                    });
                return true;
            }

            case LgmMessageType.ConnectTransport: {
                if (!this.mediaClient) return true;
                const session = this.getSessionByClient(ws);
                if (!session) return true;
                session.updateActivity();

                const { transportId, dtlsParameters } = msg.data as any;
                this.mediaClient.connectTransport(session.sessionSecret, transportId, dtlsParameters)
                    .catch((err) => {
                        Logger.error(`LGM: connectTransport failed: ${err}`);
                        this.sendError(ws, 'media-error', 'Failed to connect transport');
                    });
                return true;
            }

            case LgmMessageType.Produce: {
                if (!this.mediaClient) return true;
                const session = this.getSessionByClient(ws);
                if (!session) return true;
                session.updateActivity();

                const { transportId, kind, rtpParameters, role } = msg.data as any;
                this.mediaClient.produce(session.sessionSecret, transportId, kind, rtpParameters, role, userId)
                    .then((result) => {
                        // Send produce response to the producing client
                        this.sendTo(ws, session.sessionSecret, {
                            type: LgmMessageType.ProduceResponse,
                            namespace: 'lgm',
                            data: { id: result.id, kind: result.kind }
                        });

                        // The media server closed stale producers this one
                        // replaces (media recovery / instructor reload) - tell
                        // everyone so frozen tiles and dead audio entries go away.
                        if (result.closedProducerIds?.length) {
                            session.broadcast(undefined, {
                                type: LgmMessageType.ProducersClosed,
                                namespace: 'lgm',
                                data: { producerIds: result.closedProducerIds }
                            });
                        }

                        // Send new-consumer messages to other clients for auto-created consumers
                        if (result.newConsumers && result.newConsumers.length > 0) {
                            for (const nc of result.newConsumers) {
                                const client = session.getClient(nc.userId);
                                if (client && client.ws.readyState === 1) {
                                    this.sendTo(client.ws, session.sessionSecret, {
                                        type: LgmMessageType.NewConsumer,
                                        namespace: 'lgm',
                                        data: nc.consumer
                                    });
                                } else {
                                    // The push is the only delivery path for this consumer;
                                    // a client missing it stays silent until it re-joins.
                                    Logger.warn(`LGM: new-consumer push to ${nc.userId} skipped (${client ? `ws readyState=${client.ws.readyState}` : 'client not in session'}) - consumer ${nc.consumer?.id} undelivered`);
                                }
                            }
                        }
                    })
                    .catch((err) => {
                        Logger.error(`LGM: produce failed: ${err}`);
                        this.sendError(ws, 'media-error', 'Failed to produce');
                    });
                return true;
            }

            case LgmMessageType.Consume: {
                if (!this.mediaClient) return true;
                const session = this.getSessionByClient(ws);
                if (!session) return true;
                session.updateActivity();

                const consumeData = msg.data as any;
                this.mediaClient.consume(
                    session.sessionSecret,
                    consumeData.transportId,
                    consumeData.rtpCapabilities,
                    consumeData.role,
                    userId
                )
                    .then((result) => {
                        this.sendTo(ws, session.sessionSecret, {
                            type: LgmMessageType.Consume,
                            namespace: 'lgm',
                            data: result
                        });
                    })
                    .catch((err) => {
                        Logger.error(`LGM: consume failed: ${err}`);
                        this.sendError(ws, 'media-error', 'Failed to consume');
                    });
                return true;
            }

            case LgmMessageType.ConsumerResume: {
                if (!this.mediaClient) return true;
                const session = this.getSessionByClient(ws);
                if (!session) return true;
                session.updateActivity();

                const { consumerId } = msg.data as any;
                // Students must not hear/see anything before the instructor
                // starts the session (7/15 feedback: instructor audio was
                // audible in the pre-start waiting screen). Consumers are
                // created paused on the media server, so parking the resume
                // fully gates RTP; it is replayed on session start. The
                // instructor keeps consuming pre-start - the student preview
                // is how they check the setup works before starting.
                const resumeClient = session.getClient(userId);
                if (resumeClient?.role === 'student' && !session.isStarted) {
                    let held = this.heldStudentResumes.get(session.sessionSecret);
                    if (!held) {
                        held = new Set();
                        this.heldStudentResumes.set(session.sessionSecret, held);
                    }
                    held.add(consumerId);
                    Logger.info(`LGM: holding consumer ${consumerId} resume for student ${userId} until session start`);
                    return true;
                }
                this.mediaClient.resumeConsumer(session.sessionSecret, consumerId)
                    .catch((err) => {
                        Logger.error(`LGM: resumeConsumer failed: ${err}`);
                    });
                return true;
            }

            // Voice changer messages
            case LgmMessageType.VcGetModels: {
                if (!this.mediaClient) return true;
                const session = this.getSessionByClient(ws);
                if (!session) return true;
                session.updateActivity();

                this.mediaClient.getVcModels(session.sessionSecret)
                    .then((result) => {
                        this.sendTo(ws, session.sessionSecret, {
                            type: LgmMessageType.VcModels,
                            namespace: 'lgm',
                            data: result
                        });
                    })
                    .catch((err) => {
                        Logger.error(`LGM: getVcModels failed: ${err}`);
                        this.sendError(ws, 'vc-error', 'Failed to get voice changer models');
                    });
                return true;
            }

            case LgmMessageType.VcGetState: {
                if (!this.mediaClient) return true;
                const session = this.getSessionByClient(ws);
                if (!session) return true;
                session.updateActivity();

                this.mediaClient.getVcState(session.sessionSecret)
                    .then((state) => {
                        this.sendTo(ws, session.sessionSecret, {
                            type: LgmMessageType.VcState,
                            namespace: 'lgm',
                            data: state
                        });
                    })
                    .catch((err) => {
                        Logger.error(`LGM: getVcState failed: ${err}`);
                        this.sendError(ws, 'vc-error', 'Failed to get voice changer state');
                    });
                return true;
            }

            case LgmMessageType.VcSetModel: {
                if (!this.mediaClient) return true;
                const session = this.getSessionByClient(ws);
                if (!session) return true;
                session.updateActivity();

                const { model_name } = msg.data as any;
                this.mediaClient.setVcModel(session.sessionSecret, model_name)
                    .then((result) => {
                        session.broadcast(undefined, {
                            type: LgmMessageType.VcState,
                            namespace: 'lgm',
                            data: result
                        });
                        // Model loading is async in the voice changer — keep
                        // clients updated until it reports ready/failed.
                        this.pollVcStateWhileLoading(session);
                    })
                    .catch((err) => {
                        Logger.error(`LGM: setVcModel failed: ${err}`);
                        this.sendError(ws, 'vc-error', 'Failed to set voice changer model');
                    });
                return true;
            }

            case LgmMessageType.VcSetPitch: {
                if (!this.mediaClient) return true;
                const session = this.getSessionByClient(ws);
                if (!session) return true;
                session.updateActivity();

                const { semitones } = msg.data as any;
                this.mediaClient.setVcPitch(session.sessionSecret, semitones)
                    .then(() => {
                        return this.mediaClient!.getVcState(session.sessionSecret);
                    })
                    .then((state) => {
                        session.broadcast(undefined, {
                            type: LgmMessageType.VcState,
                            namespace: 'lgm',
                            data: state
                        });
                    })
                    .catch((err) => {
                        Logger.error(`LGM: setVcPitch failed: ${err}`);
                        this.sendError(ws, 'vc-error', 'Failed to set voice changer pitch');
                    });
                return true;
            }

            case LgmMessageType.VcSetGain: {
                if (!this.mediaClient) return true;
                const session = this.getSessionByClient(ws);
                if (!session) return true;
                session.updateActivity();

                const { gain } = msg.data as any;
                // Fire-and-forget on purpose: the slider streams values while
                // dragging, a state broadcast per step would be noise.
                this.mediaClient.setVcGain(session.sessionSecret, gain)
                    .catch((err) => {
                        Logger.error(`LGM: setVcGain failed: ${err}`);
                    });
                return true;
            }

            case LgmMessageType.VcSetEnabled: {
                if (!this.mediaClient) return true;
                const session = this.getSessionByClient(ws);
                if (!session) return true;
                session.updateActivity();

                const { enabled } = msg.data as any;
                this.mediaClient.setVcEnabled(session.sessionSecret, enabled)
                    .then(() => {
                        return this.mediaClient!.getVcState(session.sessionSecret);
                    })
                    .then((state) => {
                        session.broadcast(undefined, {
                            type: LgmMessageType.VcState,
                            namespace: 'lgm',
                            data: state
                        });
                        if (enabled) {
                            this.pollVcStateWhileLoading(session);
                        }
                    })
                    .catch((err) => {
                        Logger.error(`LGM: setVcEnabled failed: ${err}`);
                        this.sendError(ws, 'vc-error', 'Failed to set voice changer enabled state');
                    });
                return true;
            }

            // Recording messages - route through media server (which creates PlainTransports to send RTP to recorder)
            case LgmMessageType.StartRecording: {
                if (!this.mediaClient) {
                    this.sendError(ws, 'recorder-error', 'Media server not configured');
                    return true;
                }
                const session = this.getSessionByClient(ws);
                if (!session) return true;
                session.updateActivity();

                this.mediaClient.startRecording(session.sessionSecret)
                    .then((result) => {
                        Logger.info(`LGM: Recording started for session ${session.sessionSecret}`);
                        session.broadcast(undefined, {
                            type: LgmMessageType.RecordingStatus,
                            namespace: 'lgm',
                            data: { recording: true, ...result }
                        });
                        this.watchRecording(session);
                    })
                    .catch((err) => {
                        Logger.error(`LGM: startRecording failed: ${err}`);
                        this.sendError(ws, 'recorder-error', 'Failed to start recording');
                    });
                return true;
            }

            case LgmMessageType.StopRecording: {
                if (!this.mediaClient) {
                    this.sendError(ws, 'recorder-error', 'Media server not configured');
                    return true;
                }
                const session = this.getSessionByClient(ws);
                if (!session) return true;
                session.updateActivity();

                this.stopRecordingWatch(session.sessionSecret);
                this.mediaClient.stopRecording(session.sessionSecret)
                    .then(() => {
                        Logger.info(`LGM: Recording stopped for session ${session.sessionSecret}`);
                        session.broadcast(undefined, {
                            type: LgmMessageType.RecordingStatus,
                            namespace: 'lgm',
                            data: { recording: false }
                        });
                        // Compositing continues in the background on the
                        // recorder - keep watching so a failed composite
                        // still reaches the instructor as an error toast.
                        this.watchCompositing(session);
                    })
                    .catch((err) => {
                        // The stop itself resets everyone's recording state;
                        // the error field makes the failure visible instead of
                        // pretending a recording was saved.
                        Logger.error(`LGM: stopRecording failed: ${err}`);
                        const reason = err instanceof Error ? err.message : String(err);
                        session.broadcast(undefined, {
                            type: LgmMessageType.RecordingStatus,
                            namespace: 'lgm',
                            data: { recording: false, error: `Recording failed - ${reason || 'unknown error'}` }
                        });
                    });
                return true;
            }

            case 'chat' as LgmMessageType: {
                const session = this.getSessionByClient(ws);
                if (!session) return false;
                session.updateActivity();
                // Stamp server time and echo to EVERYONE (sender included):
                // clients render chat in serverTs order, so the conversation
                // reads identically for all participants regardless of how
                // skewed their local clocks are.
                const chat = (msg as any).message;
                if (chat && typeof chat === 'object') {
                    chat.serverTs = Date.now();
                }
                session.broadcast(undefined, msg);
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
     * Watch an active recording via the recorder's status endpoint. The
     * recorder flags a session as errored when its captures produce no
     * video (see the recorder-side watchdog); without this poll the
     * instructor keeps a red record button for a recording that is
     * already dead. On failure everyone gets recording:false plus an
     * error message, and the media pipeline is torn down.
     */
    private watchRecording(session: LgmSession): void {
        const key = session.sessionSecret;
        this.stopRecordingWatch(key);
        if (!this.recorderUrl) return;

        const tick = () => {
            fetch(`${this.recorderUrl}/sessions/${encodeURIComponent(key)}/status`)
                .then(async (resp) => {
                    if (!this.recordingPollers.has(key)) return; // stopped meanwhile
                    if (resp.status === 404) {
                        this.failRecording(session, 'Recording lost - recorder restarted');
                        return;
                    }
                    const status = (await resp.json()) as { status?: string; error?: string };
                    if (status.status === 'error') {
                        this.failRecording(session, `Recording failed - ${status.error || 'unknown error'}`);
                        return;
                    }
                    this.recordingPollers.set(key, setTimeout(tick, 5000));
                })
                .catch(() => {
                    // recorder briefly unreachable - keep watching
                    if (this.recordingPollers.has(key)) {
                        this.recordingPollers.set(key, setTimeout(tick, 5000));
                    }
                });
        };
        this.recordingPollers.set(key, setTimeout(tick, 5000));
    }

    /**
     * After a stop, compositing runs asynchronously on the recorder. Poll
     * until it finishes: 'done' or 404 (session removed after success) end
     * the watch silently - clients see the file via their list refresh -
     * while 'error' is broadcast so the instructor learns the recording
     * was lost. Bounded to ~10 minutes.
     */
    private watchCompositing(session: LgmSession): void {
        const key = session.sessionSecret;
        this.stopRecordingWatch(key);
        if (!this.recorderUrl) return;

        let attempts = 0;
        const tick = () => {
            attempts++;
            fetch(`${this.recorderUrl}/sessions/${encodeURIComponent(key)}/status`)
                .then(async (resp) => {
                    if (!this.recordingPollers.has(key)) return;
                    if (resp.status === 404) {
                        this.stopRecordingWatch(key);
                        return;
                    }
                    const status = (await resp.json()) as { status?: string; error?: string };
                    if (status.status === 'error') {
                        this.stopRecordingWatch(key);
                        Logger.error(`LGM: compositing failed for ${key}: ${status.error}`);
                        session.broadcast(undefined, {
                            type: LgmMessageType.RecordingStatus,
                            namespace: 'lgm',
                            data: { recording: false, error: `Recording failed - ${status.error || 'no video was saved'}` }
                        });
                        return;
                    }
                    if (status.status === 'done' || attempts > 200) {
                        this.stopRecordingWatch(key);
                        return;
                    }
                    this.recordingPollers.set(key, setTimeout(tick, 3000));
                })
                .catch(() => {
                    if (this.recordingPollers.has(key) && attempts <= 200) {
                        this.recordingPollers.set(key, setTimeout(tick, 3000));
                    }
                });
        };
        this.recordingPollers.set(key, setTimeout(tick, 2000));
    }

    private stopRecordingWatch(sessionSecret: string): void {
        const timer = this.recordingPollers.get(sessionSecret);
        if (timer) {
            clearTimeout(timer);
            this.recordingPollers.delete(sessionSecret);
        }
    }

    private failRecording(session: LgmSession, message: string): void {
        this.stopRecordingWatch(session.sessionSecret);
        Logger.error(`LGM: ${message} (session ${session.sessionSecret})`);
        session.broadcast(undefined, {
            type: LgmMessageType.RecordingStatus,
            namespace: 'lgm',
            data: { recording: false, error: message }
        });
        // Tear down the media-server side (PlainTransports etc.); the
        // recorder session is already dead or will be cleaned by this call.
        this.mediaClient?.stopRecording(session.sessionSecret).catch(() => undefined);
    }

    /**
     * Poll the media server's VC state while a voice model is loading and
     * broadcast updates so clients can show a live loading indicator. Stops
     * when the status leaves 'loading' (ready/failed) or after ~90s.
     */
    private pollVcStateWhileLoading(session: LgmSession): void {
        const key = session.sessionSecret;
        if (this.vcStatusPollers.has(key)) return; // already polling

        let attempts = 0;
        let lastStatus: string | undefined;
        const tick = () => {
            attempts++;
            this.mediaClient!.getVcState(key)
                .then((state: any) => {
                    if (state?.status !== lastStatus) {
                        lastStatus = state?.status;
                        session.broadcast(undefined, {
                            type: LgmMessageType.VcState,
                            namespace: 'lgm',
                            data: state
                        });
                    }
                    if (state?.status === 'loading' && attempts < 90) {
                        this.vcStatusPollers.set(key, setTimeout(tick, 1000));
                        return;
                    }
                    this.vcStatusPollers.delete(key);
                })
                .catch((err) => {
                    Logger.error(`LGM: VC status poll failed: ${err}`);
                    this.vcStatusPollers.delete(key);
                });
        };
        this.vcStatusPollers.set(key, setTimeout(tick, 500));
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
        this.recordingPollers.forEach(timer => clearTimeout(timer));
        this.recordingPollers.clear();
        this.sessions.forEach(session => session.close());
        this.sessions.clear();
        Logger.info('LGM: SessionManager shutdown complete');
    }
}
