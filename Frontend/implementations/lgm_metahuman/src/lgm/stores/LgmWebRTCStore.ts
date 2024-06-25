import { LgmStore } from './LgmStore';
import { LgmApiMessage, LgmRole } from '../client/LgmData';
import { autorun, makeAutoObservable, ObservableMap } from 'mobx';

interface PeerConnection {
    connection: RTCPeerConnection;
    mediaStream: MediaStream | null;
}

export class LgmWebRTCStore {
    private base: LgmStore;
    private txPeerConnections: ObservableMap<string, PeerConnection>;
    private rxPeerConnections: ObservableMap<string, PeerConnection>;
    localStream?: MediaStream = undefined;

    constructor(base: LgmStore) {
        this.base = base;
        this.txPeerConnections = new ObservableMap();
        this.rxPeerConnections = new ObservableMap();
        this.base.client.messages.subscribe((message) => this.onMessage(message));
        makeAutoObservable(this);
        this.initializeLocalStream();
    }

    private async initializeLocalStream() {
        const constraints = this.getMediaConstraints();
        try {
            this.localStream = await navigator.mediaDevices?.getUserMedia(constraints);
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    }

    private getMediaConstraints(): MediaStreamConstraints {
        switch (this.base.user.role) {
            case LgmRole.student:
                return { video: true, audio: true };
            case LgmRole.instructor:
                return { audio: true };
            default:
                return { audio: false, video: false };
        }
    }

    get peerStreams() {
        return Array.from(this.rxPeerConnections.values()).map((peer) => peer.mediaStream).filter((stream) => stream !== null && !!stream.getVideoTracks().length) as MediaStream[];
    }

    get peerAudioStreams() {
        return Array.from(this.rxPeerConnections.values()).map((peer) => peer.mediaStream).filter((stream) => stream !== null && !!stream.getAudioTracks().length) as MediaStream[];
    }

    private async onMessage(message: LgmApiMessage) {
        switch (message.type) {
            case 'offer':
                await this.handleOffer(message);
                break;
            case 'answer':
                await this.handleAnswer(message);
                break;
            case 'ice-candidate':
                await this.handleIceCandidate(message);
                break;
        }
    }

    async createOffer(peerId: string) {
        console.log('create offer to', peerId);
        const peerConnection = await this.createPeerConnection(this.txPeerConnections, peerId);

        // Create the offer
        const offer = await peerConnection.connection.createOffer();
        await peerConnection.connection.setLocalDescription(offer);

        // Send the offer to the peer via WebSocket
        this.base.client.broadcast({
            type: 'offer',
            offer,
            from: this.base.user.id,
            to: peerId
        });
    }

    private async handleOffer(message: LgmApiMessage) {
        const { from, offer, to } = message;
        if (to !== this.base.user.id) {
            return;
        }

        const peerConnection = await this.createPeerConnection(this.rxPeerConnections, from!);

        // Set the remote description
        await peerConnection.connection.setRemoteDescription(new RTCSessionDescription(offer));

        // Create an answer
        const answer = await peerConnection.connection.createAnswer();
        await peerConnection.connection.setLocalDescription(answer);

        // Send the answer back to the peer via WebSocket
        this.base.client.broadcast({
            type: 'answer',
            answer,
            from: this.base.user.id,
            to: from
        });
    }

    private async handleAnswer(message: LgmApiMessage) {
        const { from, answer, to } = message;
        if (to !== this.base.user.id) {
            return;
        }

        const peerConnection = this.txPeerConnections.get(from!);
        if (peerConnection) {
            await peerConnection.connection.setRemoteDescription(new RTCSessionDescription(answer));
        }
    }

    private async handleIceCandidate(message: LgmApiMessage) {
        const { from, candidate, to } = message;
        if (to !== this.base.user.id) {
            return;
        }

        const peerConnection = this.txPeerConnections.get(from!);
        if (peerConnection && candidate) {
            await peerConnection.connection.addIceCandidate(new RTCIceCandidate(candidate));
        }
    }

    private async createPeerConnection(connections: ObservableMap<string, PeerConnection>, peerId: string): Promise<PeerConnection> {
        if (connections.has(peerId)) {
            console.log('existing peer connection', peerId);
            return connections.get(peerId)!;
        }

        const peerConnection = new RTCPeerConnection();

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.base.client.broadcast({
                    type: 'ice-candidate',
                    candidate: event.candidate,
                    from: this.base.user.id,
                    to: peerId
                });
            }
        };

        peerConnection.ontrack = (event) => {
            const peer = connections.get(peerId);
            if (peer) {
                peer.mediaStream = event.streams[0];
            }
        };

        peerConnection.onconnectionstatechange = (event) => {
            if (peerConnection.connectionState === 'disconnected' || peerConnection.connectionState === 'closed') {
                this.closePeerConnection(peerId);
            }
        };

        peerConnection.oniceconnectionstatechange = (event) => {
            if (peerConnection.iceConnectionState === 'disconnected' || peerConnection.iceConnectionState === 'closed') {
                this.closePeerConnection(peerId);
            }
        };

        // Add local stream based on user role
        if (this.shouldAddLocalStream()) {
            if (!this.localStream) {
                await this.initializeLocalStream();
            }
            this.localStream?.getTracks().forEach((track) => peerConnection.addTrack(track, this.localStream!));
        }

        const peer = { connection: peerConnection, mediaStream: null } as PeerConnection;
        connections.set(peerId, peer);
        console.log('created peer connection', peerId);

        return peer;
    }

    private shouldAddLocalStream(): boolean {
        switch (this.base.user.role) {
            case LgmRole.student:
                return true;
            case LgmRole.instructor:
                return true;
            default:
                return false;
        }
    }

    private closePeerConnection(peerId: string) {
        const peer = this.txPeerConnections.get(peerId);
        if (peer) {
            peer.connection.close();
            this.txPeerConnections.delete(peerId);
        }
    }
}