// LGM Media Client - HTTP client for communication with media-server

import { Logger } from '@epicgames-ps/lib-pixelstreamingsignalling-ue5.7';

/**
 * HTTP client for the media-server API.
 * Used by the signalling server to create sessions, transports, and manage
 * mediasoup objects on behalf of connected clients.
 */
export class LgmMediaClient {
    private baseUrl: string;

    constructor(mediaServerUrl: string) {
        this.baseUrl = mediaServerUrl.replace(/\/$/, '');
        Logger.info(`LGM MediaClient: Connecting to media-server at ${this.baseUrl}`);
    }

    private async request(method: string, path: string, body?: unknown): Promise<any> {
        const url = `${this.baseUrl}${path}`;
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: body ? JSON.stringify(body) : undefined,
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`HTTP ${response.status}: ${text}`);
            }

            return response.json();
        } catch (err) {
            Logger.error(`LGM MediaClient: ${method} ${path} failed: ${err}`);
            throw err;
        }
    }

    /**
     * Create a media session (mediasoup Router)
     */
    async createSession(sessionId: string): Promise<{ sessionId: string; rtpCapabilities: any }> {
        return this.request('POST', '/sessions', { sessionId });
    }

    /**
     * Delete a media session
     */
    async deleteSession(sessionId: string): Promise<void> {
        try {
            await this.request('DELETE', `/sessions/${encodeURIComponent(sessionId)}`);
        } catch (err) {
            Logger.warn(`LGM MediaClient: Failed to delete session ${sessionId}: ${err}`);
        }
    }

    /**
     * Clean up a client's transports/producers/consumers in a session.
     * Returns the producer IDs that were closed.
     */
    async cleanupClient(sessionId: string, userId: string): Promise<{ producerIds: string[] } | undefined> {
        try {
            return await this.request('DELETE', `/sessions/${encodeURIComponent(sessionId)}/client/${encodeURIComponent(userId)}`);
        } catch (err) {
            Logger.warn(`LGM MediaClient: Failed to cleanup client ${userId} in session ${sessionId}: ${err}`);
            return undefined;
        }
    }

    /**
     * Create a WebRTC transport for a client
     */
    async createTransport(sessionId: string, role: string, userId: string): Promise<any> {
        return this.request('POST', `/sessions/${encodeURIComponent(sessionId)}/transport`, {
            role,
            userId,
        });
    }

    /**
     * Connect a transport (DTLS handshake)
     */
    async connectTransport(sessionId: string, transportId: string, dtlsParameters: any): Promise<void> {
        await this.request(
            'POST',
            `/sessions/${encodeURIComponent(sessionId)}/transport/${encodeURIComponent(transportId)}/connect`,
            { dtlsParameters }
        );
    }

    /**
     * Create a producer on a transport
     */
    async produce(sessionId: string, transportId: string, kind: string, rtpParameters: any, role: string, userId: string): Promise<any> {
        return this.request(
            'POST',
            `/sessions/${encodeURIComponent(sessionId)}/transport/${encodeURIComponent(transportId)}/produce`,
            { kind, rtpParameters, role, userId }
        );
    }

    /**
     * Create consumers on a transport (returns array of consumers based on role routing)
     */
    async consume(sessionId: string, transportId: string, rtpCapabilities: any, role: string, userId: string): Promise<any> {
        return this.request(
            'POST',
            `/sessions/${encodeURIComponent(sessionId)}/transport/${encodeURIComponent(transportId)}/consume`,
            { rtpCapabilities, role, userId }
        );
    }

    /**
     * Resume a paused consumer
     */
    async resumeConsumer(sessionId: string, consumerId: string): Promise<void> {
        await this.request(
            'POST',
            `/sessions/${encodeURIComponent(sessionId)}/consumer/${encodeURIComponent(consumerId)}/resume`
        );
    }

    // --- Voice Changer ---

    async getVcModels(sessionId: string): Promise<any> {
        return this.request('GET', `/sessions/${encodeURIComponent(sessionId)}/vc/models`);
    }

    async setVcModel(sessionId: string, model: string): Promise<any> {
        return this.request('POST', `/sessions/${encodeURIComponent(sessionId)}/vc/model`, { model });
    }

    async setVcPitch(sessionId: string, semitones: number): Promise<any> {
        return this.request('POST', `/sessions/${encodeURIComponent(sessionId)}/vc/pitch`, { semitones });
    }

    async setVcGain(sessionId: string, gain: number): Promise<any> {
        return this.request('POST', `/sessions/${encodeURIComponent(sessionId)}/vc/gain`, { gain });
    }

    async setVcEnabled(sessionId: string, enabled: boolean): Promise<any> {
        return this.request('POST', `/sessions/${encodeURIComponent(sessionId)}/vc/enabled`, { enabled });
    }

    async getVcState(sessionId: string): Promise<any> {
        return this.request('GET', `/sessions/${encodeURIComponent(sessionId)}/vc/state`);
    }

    // --- Recording ---

    async startRecording(sessionId: string): Promise<any> {
        return this.request('POST', `/sessions/${encodeURIComponent(sessionId)}/recording/start`);
    }

    async stopRecording(sessionId: string): Promise<any> {
        return this.request('POST', `/sessions/${encodeURIComponent(sessionId)}/recording/stop`);
    }

    /**
     * Health check
     */
    async healthCheck(): Promise<{ status: string; sessions: number }> {
        return this.request('GET', '/health');
    }
}
