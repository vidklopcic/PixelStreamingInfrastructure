import { LgmStore } from './LgmStore';
import {
    LgmApiMessage,
    LgmRole,
    MediaCapabilitiesData,
    TransportCreatedData,
    ConsumeResponseData,
    ProduceResponseData,
} from '../client/LgmData';
import { autorun, makeAutoObservable, ObservableMap } from 'mobx';
import { Device, types as mediasoupTypes } from 'mediasoup-client';

interface ConsumerEntry {
    consumer: mediasoupTypes.Consumer;
    stream: MediaStream;
}

export class LgmWebRTCStore {
    private base: LgmStore;
    private device: Device;
    private sendTransport?: mediasoupTypes.Transport;
    private recvTransport?: mediasoupTypes.Transport;
    private producers: Map<string, mediasoupTypes.Producer> = new Map();
    private consumerEntries: ObservableMap<string, ConsumerEntry> = new ObservableMap();
    localStream?: MediaStream = undefined;
    accessRejected = false;
    muted = false;

    // Pending transport creation callbacks
    private pendingSendTransportResolve?: (data: TransportCreatedData) => void;
    private pendingRecvTransportResolve?: (data: TransportCreatedData) => void;
    private pendingTransportType?: 'send' | 'recv';

    constructor(base: LgmStore) {
        this.base = base;
        this.device = new Device();
        this.base.client.messages.subscribe((message) => this.onMessage(message));
        makeAutoObservable(this);

        // Request media based on role
        if (this.base.user.role === LgmRole.student || this.base.user.role === LgmRole.instructor) {
            navigator.mediaDevices?.getUserMedia({
                video: this.base.user.role === LgmRole.student,
                audio: true
            }).then((stream) => this.localStream = stream)
                .catch((error) => {
                    console.error('Error accessing media devices:', error);
                    this.accessRejected = true;
                });
        }

        // Mute control
        autorun(() => {
            if (!this.localStream) return;
            this.localStream.getAudioTracks().forEach((track) => track.enabled = !this.muted);
        });
    }

    get peerStreams(): MediaStream[] {
        return Array.from(this.consumerEntries.values())
            .map((entry) => entry.stream)
            .filter((stream) => stream.getVideoTracks().length > 0);
    }

    get peerAudioStreams(): MediaStream[] {
        return Array.from(this.consumerEntries.values())
            .map((entry) => entry.stream)
            .filter((stream) => stream.getVideoTracks().length === 0);
    }

    private async onMessage(message: LgmApiMessage) {
        switch (message.type) {
            case 'media-capabilities':
                await this.handleMediaCapabilities(message);
                break;
            case 'transport-created':
                this.handleTransportCreated(message);
                break;
            case 'produce-response':
                // Handled via callback in sendTransport.produce
                break;
            case 'consume':
                await this.handleConsume(message);
                break;
            case 'new-consumer':
                await this.handleNewConsumer(message);
                break;
            case 'producers-closed':
                this.handleProducersClosed(message);
                break;
        }
    }

    /**
     * Called when server sends Router's rtpCapabilities after session join.
     * Initializes the mediasoup Device and creates transports.
     */
    private async handleMediaCapabilities(message: LgmApiMessage) {
        const { rtpCapabilities } = message.data as MediaCapabilitiesData;

        try {
            if (!this.device.loaded) {
                await this.device.load({ routerRtpCapabilities: rtpCapabilities });
            }

            // Create send transport (for producing audio/video)
            if (this.base.user.role !== LgmRole.supervisor) {
                await this.createSendTransport();
            }

            // Create recv transport (for consuming others' audio/video)
            await this.createRecvTransport();
        } catch (err) {
            console.error('Failed to initialize mediasoup device:', err);
        }
    }

    private createSendTransport(): Promise<void> {
        return new Promise((resolve) => {
            this.pendingTransportType = 'send';
            this.pendingSendTransportResolve = (data: TransportCreatedData) => {
                this.setupSendTransport(data).then(resolve);
            };

            this.base.client.send({
                type: 'create-transport',
                data: { role: this.base.user.role }
            });
        });
    }

    private createRecvTransport(): Promise<void> {
        return new Promise((resolve) => {
            this.pendingTransportType = 'recv';
            this.pendingRecvTransportResolve = (data: TransportCreatedData) => {
                this.setupRecvTransport(data).then(resolve);
            };

            this.base.client.send({
                type: 'create-transport',
                data: { role: this.base.user.role }
            });
        });
    }

    private handleTransportCreated(message: LgmApiMessage) {
        const data = message.data as TransportCreatedData;

        if (this.pendingSendTransportResolve && this.pendingTransportType === 'send') {
            const resolve = this.pendingSendTransportResolve;
            this.pendingSendTransportResolve = undefined;
            this.pendingTransportType = 'recv';
            resolve(data);
        } else if (this.pendingRecvTransportResolve && this.pendingTransportType === 'recv') {
            const resolve = this.pendingRecvTransportResolve;
            this.pendingRecvTransportResolve = undefined;
            this.pendingTransportType = undefined;
            resolve(data);
        }
    }

    private async setupSendTransport(data: TransportCreatedData): Promise<void> {
        this.sendTransport = this.device.createSendTransport({
            id: data.id,
            iceParameters: data.iceParameters,
            iceCandidates: data.iceCandidates,
            dtlsParameters: data.dtlsParameters,
        });

        this.sendTransport.on('connect', ({ dtlsParameters }: any, callback: any, errback: any) => {
            this.base.client.send({
                type: 'connect-transport',
                data: { transportId: data.id, dtlsParameters }
            });
            // Assume success since signalling will report errors separately
            callback();
        });

        this.sendTransport.on('produce', (parameters: any, callback: any, errback: any) => {
            // Listen for produce-response to get producer ID
            const handler = (msg: LgmApiMessage) => {
                if (msg.type === 'produce-response') {
                    const resp = msg.data as ProduceResponseData;
                    sub.unsubscribe();
                    callback({ id: resp.id });
                }
            };
            const sub = this.base.client.messages.subscribe(handler);

            this.base.client.send({
                type: 'produce',
                data: {
                    transportId: data.id,
                    kind: parameters.kind,
                    rtpParameters: parameters.rtpParameters,
                    role: this.base.user.role,
                }
            });
        });

        // Produce local tracks
        if (this.localStream) {
            await this.produceLocalTracks();
        } else {
            // Wait for local stream
            const dispose = autorun(() => {
                if (this.localStream) {
                    dispose();
                    this.produceLocalTracks();
                }
            });
        }
    }

    private async produceLocalTracks(): Promise<void> {
        if (!this.sendTransport || !this.localStream) return;

        // Produce audio
        const audioTrack = this.localStream.getAudioTracks()[0];
        if (audioTrack) {
            try {
                const producer = await this.sendTransport.produce({ track: audioTrack });
                this.producers.set(producer.id, producer);
            } catch (err) {
                console.error('Failed to produce audio:', err);
            }
        }

        // Produce video (students only)
        const videoTrack = this.localStream.getVideoTracks()[0];
        if (videoTrack) {
            try {
                const producer = await this.sendTransport.produce({ track: videoTrack });
                this.producers.set(producer.id, producer);
            } catch (err) {
                console.error('Failed to produce video:', err);
            }
        }

        // Consumers are requested from setupRecvTransport, no need to request again here
    }

    private async setupRecvTransport(data: TransportCreatedData): Promise<void> {
        this.recvTransport = this.device.createRecvTransport({
            id: data.id,
            iceParameters: data.iceParameters,
            iceCandidates: data.iceCandidates,
            dtlsParameters: data.dtlsParameters,
        });

        this.recvTransport.on('connect', ({ dtlsParameters }: any, callback: any, errback: any) => {
            this.base.client.send({
                type: 'connect-transport',
                data: { transportId: data.id, dtlsParameters }
            });
            callback();
        });

        // Request consumers once recv transport is ready
        this.requestConsumers();
    }

    /**
     * Ask the server for consumers based on our role.
     * The server returns consumers according to audio routing rules.
     */
    private requestConsumers(): void {
        console.log(`[WebRTC] requestConsumers: recvTransport=${!!this.recvTransport}, loaded=${this.device.loaded}, role=${this.base.user.role}`);
        if (!this.recvTransport || !this.device.loaded) return;

        this.base.client.send({
            type: 'consume',
            data: {
                transportId: this.recvTransport.id,
                rtpCapabilities: this.device.rtpCapabilities,
                role: this.base.user.role,
            }
        });
        console.log(`[WebRTC] requestConsumers: sent consume request on transport ${this.recvTransport.id}`);
    }

    /**
     * Handle consume response - create local consumers from server data.
     */
    private async handleConsume(message: LgmApiMessage) {
        const { consumers } = message.data as ConsumeResponseData;
        console.log(`[WebRTC] handleConsume: ${consumers?.length ?? 0} consumers, recvTransport=${!!this.recvTransport}`);
        if (!consumers || !this.recvTransport) return;

        for (const consumerData of consumers) {
            await this.createLocalConsumer(consumerData);
        }
    }

    /**
     * Handle new-consumer - auto-triggered when a new producer appears server-side.
     */
    private async handleNewConsumer(message: LgmApiMessage) {
        const consumerData = message.data as any;
        console.log(`[WebRTC] handleNewConsumer: id=${consumerData?.id}, kind=${consumerData?.kind}, producerId=${consumerData?.producerId}, recvTransport=${!!this.recvTransport}`);
        if (!this.recvTransport) return;
        await this.createLocalConsumer(consumerData);
    }

    /**
     * Handle producers-closed - server notifies that producers were removed (e.g. client disconnected).
     * Close local consumers that were consuming from those producers.
     */
    private handleProducersClosed(message: LgmApiMessage) {
        const { producerIds } = message.data as { producerIds: string[] };
        if (!producerIds?.length) return;

        const producerIdSet = new Set(producerIds);
        console.log(`[WebRTC] handleProducersClosed: ${producerIds.length} producers closed`);

        this.consumerEntries.forEach((entry, id) => {
            if (producerIdSet.has(entry.consumer.producerId)) {
                console.log(`[WebRTC] Closing consumer ${id} (producerId=${entry.consumer.producerId})`);
                entry.consumer.close();
                this.consumerEntries.delete(id);
            }
        });
    }

    private async createLocalConsumer(consumerData: {
        id: string;
        producerId: string;
        kind: string;
        rtpParameters: any;
    }): Promise<void> {
        if (!this.recvTransport) return;

        try {
            console.log(`[WebRTC] createLocalConsumer: creating consumer id=${consumerData.id}, kind=${consumerData.kind}`);
            const consumer = await this.recvTransport.consume({
                id: consumerData.id,
                producerId: consumerData.producerId,
                kind: consumerData.kind as mediasoupTypes.MediaKind,
                rtpParameters: consumerData.rtpParameters,
            });

            const stream = new MediaStream([consumer.track]);
            console.log(`[WebRTC] createLocalConsumer: consumer created, track=${consumer.track.id}, enabled=${consumer.track.enabled}, readyState=${consumer.track.readyState}`);

            this.consumerEntries.set(consumer.id, { consumer, stream });
            console.log(`[WebRTC] consumerEntries size: ${this.consumerEntries.size}, peerAudioStreams: ${this.peerAudioStreams.length}`);

            // Resume the consumer on the server
            this.base.client.send({
                type: 'consumer-resume',
                data: { consumerId: consumer.id }
            });
            console.log(`[WebRTC] createLocalConsumer: sent consumer-resume for ${consumer.id}`);

            consumer.on('trackended', () => {
                console.log(`[WebRTC] track ended for consumer ${consumer.id}`);
                consumer.track.stop();
                this.consumerEntries.delete(consumer.id);
            });

            consumer.on('transportclose', () => {
                console.log(`[WebRTC] transport closed for consumer ${consumer.id}`);
                consumer.track.stop();
                this.consumerEntries.delete(consumer.id);
            });

            // mediasoup emits 'producerclose' when remote producer is closed
            (consumer as any).on('producerclose', () => {
                console.log(`[WebRTC] producer closed for consumer ${consumer.id} (kind=${consumer.kind})`);
                consumer.close();
                this.consumerEntries.delete(consumer.id);
            });
        } catch (err) {
            console.error('[WebRTC] Failed to consume:', err);
        }
    }

    dispose() {
        this.producers.forEach((producer) => {
            producer.close();
        });
        this.producers.clear();

        this.consumerEntries.forEach((entry) => {
            entry.consumer.close();
        });
        this.consumerEntries.clear();

        this.sendTransport?.close();
        this.recvTransport?.close();
    }
}
