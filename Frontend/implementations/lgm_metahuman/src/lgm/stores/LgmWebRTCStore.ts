import { LgmStore } from './LgmStore';
import { LgmApiMessage, LgmRole } from '../client/LgmData';
import { autorun, makeAutoObservable, ObservableMap } from 'mobx';

interface PeerConnection {
    connection: RTCPeerConnection;
    mediaStream: MediaStream | null;
}

export class LgmWebRTCStore {
    private base: LgmStore;
    private peerConnections: ObservableMap<string, PeerConnection>;
    localStream?: MediaStream = undefined;
    accessRejected = false;
    muted = false;

    constructor(base: LgmStore) {
        this.base = base;
        this.peerConnections = new ObservableMap();
        this.base.client.messages.subscribe((message) => this.onMessage(message));
        makeAutoObservable(this);
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
        autorun(() => {
            if (!this.localStream) {
                return;
            }
            if (this.muted) {
                this.localStream?.getAudioTracks().forEach((track) => track.enabled = false);
            } else {
                this.localStream?.getAudioTracks().forEach((track) => track.enabled = true);
            }
        });
    }

    get peerStreams() {
        return Array.from(this.peerConnections.values()).map((peer) => peer.mediaStream).filter((stream) => stream !== null && !!stream.getVideoTracks().length) as MediaStream[];
    }

    get peerAudioStreams() {
        return Array.from(this.peerConnections.values()).map((peer) => peer.mediaStream).filter((stream) => stream !== null && !stream.getVideoTracks().length) as MediaStream[];
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

    async createOffer(toPeerRole: LgmRole, toPeerId: string) {
        if (toPeerRole === LgmRole.student || this.base.user.role === LgmRole.supervisor) {
            // instructor and supervisor accept students' offers
            // supervisor accepts instructors' offers
            return;
        }
        const peerConnection = await this.createPeerConnection(toPeerId);

        // Create the offer
        const offer = await peerConnection.connection.createOffer();
        await peerConnection.connection.setLocalDescription(offer);

        // Send the offer to the peer via WebSocket
        this.base.client.send({
            type: 'offer',
            offer,
            from: this.base.user.id,
            to: toPeerId
        });
    }

    // Handle receiving an offer from a peer
    private async handleOffer(message: LgmApiMessage) {
        const { from, offer, to } = message;
        if (to !== this.base.user.id || this.base.user.role === LgmRole.student) {
            return;
        }

        const peerConnection = await this.createPeerConnection(from!);

        // Set the remote description
        await peerConnection.connection.setRemoteDescription(new RTCSessionDescription(offer));

        // Create an answer
        const answer = await peerConnection.connection.createAnswer();
        await peerConnection.connection.setLocalDescription(answer);

        // Send the answer back to the peer via WebSocket
        this.base.client.send({
            type: 'answer',
            answer,
            from: this.base.user.id,
            to: from
        });
    }

    // Handle receiving an answer from a peer
    private async handleAnswer(message: LgmApiMessage) {
        const { from, answer, to } = message;
        if (to !== this.base.user.id) {
            console.error('Invalid answer message');
            return;
        }

        const peerConnection = this.peerConnections.get(from!);
        if (peerConnection) {
            await peerConnection.connection.setRemoteDescription(new RTCSessionDescription(answer));
        }
    }

    // Handle receiving an ICE candidate from a peer
    private async handleIceCandidate(message: LgmApiMessage) {
        const { from, candidate, to } = message;
        if (to !== this.base.user.id) {
            console.error('Invalid ICE candidate message');
            return;
        }

        const peerConnection = this.peerConnections.get(from!);
        if (peerConnection && candidate) {
            try {
                await peerConnection.connection.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (e) {
                console.error('Error adding ICE candidate:', e);
            }
        }
    }

    // Create and initialize a new RTCPeerConnection
    private async createPeerConnection(peerId: string): Promise<PeerConnection> {
        if (this.peerConnections.has(peerId)) {
            return this.peerConnections.get(peerId)!;
        }

        const peerConnection = new RTCPeerConnection();

        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                this.base.client.send({
                    type: 'ice-candidate',
                    candidate: event.candidate,
                    from: this.base.user.id,
                    to: peerId
                });
            }
        };

        // Handle track event to receive remote stream
        peerConnection.ontrack = (event) => {
            const peer = this.peerConnections.get(peerId);
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

        // If the user is a student or instructor, they will add their local media stream to the connection
        if (this.base.user.role === LgmRole.student || this.base.user.role === LgmRole.instructor) {
            this.localStream!.getTracks().forEach((track) => peerConnection.addTrack(track, this.localStream));
        }

        // Store the peer connection
        const peer = { connection: peerConnection, mediaStream: null } as PeerConnection;
        this.peerConnections.set(peerId, peer);

        return peer;
    }

    // Close and remove a peer connection
    private closePeerConnection(peerId: string) {
        const peer = this.peerConnections.get(peerId);
        if (peer) {
            peer.connection.close();
            this.peerConnections.delete(peerId);
        }
    }

    dispose() {

    }
}
