# LGM Pixel Streaming Infrastructure - Architecture Overhaul Plan

## Executive Summary

This document outlines the complete restructuring of the LGM Pixel Streaming Infrastructure into a production-ready, containerized monorepo with:

- **Pixel Streaming 2 (PS2)** migration from UE5.4 to UE5.5
- **Server-mediated WebRTC** (replacing P2P) for recording and voice processing
- **RVC voice changing** integration
- **Session recording** (side-by-side video)
- **Multi-session support** (concurrent isolated sessions)
- **Fully containerized** deployment (including Unreal Engine instances)
- **TypeScript-first** codebase with modular architecture

---

## Table of Contents

0. [Pixel Streaming 2 Migration](#0-pixel-streaming-2-migration)
1. [Architecture Overview](#1-architecture-overview)
2. [Repository Structure](#2-repository-structure)
3. [Component Specifications](#3-component-specifications)
4. [Docker Architecture](#4-docker-architecture)
5. [Build System](#5-build-system)
6. [Migration Strategy](#6-migration-strategy)
7. [Implementation Phases](#7-implementation-phases)
8. [Git Workflow](#8-git-workflow)

---

## Git Workflow

### Branch Strategy

We use **sub-branches with squash merges** for clean, atomic commits per task.

```
master (production)
    │
    └── feature/architecture-overhaul (main feature branch)
            │
            ├── feature/architecture-overhaul/update-frontend-ue56
            │       └── squash merge → "Update lgm_metahuman frontend to UE5.6"
            │
            ├── feature/architecture-overhaul/port-lgm-sessions
            │       └── squash merge → "Port LGM session logic to SignallingServer"
            │
            ├── feature/architecture-overhaul/docker-infrastructure
            │       └── squash merge → "Add Docker Compose infrastructure"
            │
            ├── feature/architecture-overhaul/media-server
            │       └── squash merge → "Implement mediasoup media server"
            │
            └── ... (one sub-branch per task)
```

### Branch Naming Convention

```
feature/architecture-overhaul/<task-name>
```

Task names should be kebab-case and descriptive:
- `update-frontend-ue56`
- `port-lgm-sessions`
- `docker-infrastructure`
- `media-server`
- `rvc-integration`
- `recording-service`

### Workflow Process

#### Starting a Task

```bash
# Ensure main feature branch is up to date
git checkout feature/architecture-overhaul
git pull origin feature/architecture-overhaul

# Create sub-branch for task
git checkout -b feature/architecture-overhaul/<task-name>
```

#### Working on a Task

```bash
# Multiple commits are OK - they will be squashed
git commit -m "wip: initial implementation"
git commit -m "wip: add tests"
git commit -m "fix: edge case handling"

# Push to remote for backup (optional)
git push -u origin feature/architecture-overhaul/<task-name>
```

#### Completing a Task

```bash
# Switch to main feature branch
git checkout feature/architecture-overhaul

# Squash merge the task branch
git merge --squash feature/architecture-overhaul/<task-name>

# Commit with descriptive message
git commit -m "Short description of completed task

Detailed description of what was done:
- Item 1
- Item 2
- Item 3"

# Delete the sub-branch (local)
git branch -d feature/architecture-overhaul/<task-name>

# Delete remote sub-branch (if pushed)
git push origin --delete feature/architecture-overhaul/<task-name>
```

### Commit Message Format

For squash merge commits on `feature/architecture-overhaul`:

```
<Short summary in imperative mood>

<Detailed description>:
- What was added/changed
- Key implementation details
- Any breaking changes

<Optional: Related issues or notes>
```

Example:
```
Port LGM session logic to SignallingServer

Extends the new TypeScript SignallingServer with LGM session management:
- Add LgmSessionManager class for multi-session handling
- Add LgmSession class with participant tracking
- Implement message handlers: create-session, join-session, close-session
- Add session timeout and cleanup logic
- Add streamer index assignment per session

Ported from: _lgm_backup/cirrus.js.backup
```

### Current Task Queue

| Order | Task | Branch Name | Status |
|-------|------|-------------|--------|
| 1 | Update frontend imports to UE5.6 | `update-frontend-ue56` | Pending |
| 2 | Port LGM session logic | `port-lgm-sessions` | Pending |
| 3 | Docker infrastructure setup | `docker-infrastructure` | Pending |
| 4 | Media server implementation | `media-server` | Pending |
| 5 | Frontend SFU migration | `frontend-sfu` | Pending |
| 6 | RVC service integration | `rvc-integration` | Pending |
| 7 | Recording service | `recording-service` | Pending |
| 8 | Production hardening | `production-hardening` | Pending |

---

## 0. Pixel Streaming 2 Migration (UE5.6)

### 0.1 Status: MERGED ✓

UE5.6 branch from EpicGamesExt has been merged. Major discovery:

**Epic has already done the TypeScript rewrite!** The new signalling server ("Wilbur") is:
- Fully TypeScript-based
- Modular architecture with `@epicgames-ps/lib-pixelstreamingsignalling-ue5.6`
- Express + Commander + OpenAPI for REST API
- Structured JSON logging

This eliminates our Phase 2 (Signalling Rewrite) - we just need to **extend** the new architecture with LGM session logic.

### 0.2 New Architecture (from UE5.6)

```
SignallingWebServer/
├── src/
│   ├── index.ts              # Main entry (Wilbur server)
│   ├── InputHandler.ts       # CLI input handling
│   ├── Utils.ts
│   └── paths/                # REST API routes
│       ├── config.ts
│       ├── players.ts
│       ├── streamers.ts
│       └── status.ts
├── config.json               # New format config
└── package.json              # Uses @epicgames-ps/lib-pixelstreamingsignalling-ue5.6

Signalling/                   # The actual library
├── src/
│   ├── SignallingServer.ts   # Main server class
│   ├── PlayerConnection.ts   # Player WebSocket handling
│   ├── PlayerRegistry.ts     # Player management
│   ├── StreamerConnection.ts # UE connection handling
│   ├── StreamerRegistry.ts   # Streamer management
│   ├── SFUConnection.ts      # SFU support
│   ├── WebServer.ts          # HTTP/HTTPS server
│   └── Logger.ts             # Structured logging
└── package.json
```

### 0.3 LGM Session Logic to Port

Our cirrus.js customizations (backed up to `_lgm_backup/cirrus.js.backup`):

```typescript
// Key LGM additions that need porting:
let lgmClients = new Map();      // sessionSecret -> Map<userId, WebSocket>
let lgmSessions = new Map();     // sessionSecret -> session data

// Session data structure:
{
  sessionSecret: string,
  liveLinkIp: string,
  liveLinkPort: string,
  contextText: string,
  startedTimestamp: number | undefined,
  createdTimestamp: number,
  streamerIndex: number,
  lastMessageTs: number
}

// Message types to handle:
// - create-session
// - join-session
// - close-session
// - ping (peer discovery)
// - session (state sync)
// - Generic broadcast (chat, etc.)
```

### 0.4 Key PS2/UE5.6 Changes

#### Settings/Launch Arguments Changes

| Old (UE5.4) | New (PS2/UE5.6) | Notes |
|-------------|-----------------|-------|
| `-PixelStreamingURL` | `-PixelStreamingSignallingURL` | Deprecation warning if old used |
| `-PixelStreamingID` | `-PixelStreamingID` | Now settable via command line |
| `-PixelStreamingWebRTCMaxBitrate` | Same | Default lowered: 100→40 Mbps |
| `-PixelStreamingEncoderMaxQP` | `-PixelStreamingEncoderMinQuality` | Range [0-100], inverted meaning |
| `-PixelStreamingEncoderMinQP` | `-PixelStreamingEncoderMaxQuality` | Range [0-100], inverted meaning |

#### Frontend Library Update

```json
// package.json - Now uses UE5.6 libraries
{
  "dependencies": {
    "@epicgames-ps/lib-pixelstreamingfrontend-ue5.6": "^0.2.5",
    "@epicgames-ps/lib-pixelstreamingcommon-ue5.6": "^0.1.3"
  }
}
```

### 0.5 Updated Launch Arguments

**New (PS2/UE5.6):**
```bash
/app/lgm_metahuman_56.sh \
    -Windowed \
    -PixelStreamingSignallingURL="ws://signalling:80" \
    -RenderOffscreen \
    -ForceRes \
    -ResX=1280 \
    -ResY=720 \
    -PixelStreamingID=Streamer0 \
    -PixelStreamingSignalingKeepAliveInterval=30 \
    -PixelStreamingEncoderLatencyMode=Default \
    -PixelStreamingEncoderQualityPreset=Default
```

### 0.6 Migration Checklist

**Infrastructure (DONE):**
- [x] Merge PixelStreamingInfra UE5.6 branch
- [x] Backup LGM session logic from cirrus.js
- [x] Update config.json to new format

**Still TODO:**
- [ ] Port LGM session logic to extend SignallingServer
- [ ] Update lgm_metahuman frontend to use UE5.6 libraries
- [ ] Coordinate UE project upgrade to 5.6
- [ ] Enable PixelStreaming2 plugin in UE project
- [ ] Recreate PixelStreaming blueprint nodes as PS2 versions
- [ ] Build new Linux shipping build (lgm_metahuman_56)
- [ ] Test basic pixel streaming functionality
- [ ] Test with custom session/room system

---

## 1. Architecture Overview

### 1.1 Current State (P2P)

```
Instructor ◄───────P2P WebRTC───────► Student
                                          │
UE Instance ◄──────Pixel Streaming────────┘
```

**Problems:**
- No server access to media streams (can't record, can't process)
- P2P fails across different networks (NAT issues)
- No voice changing capability
- Manual service management (systemd units)

### 1.2 Target State (Server-Mediated)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           HOST (nginx)                                       │
│                     HTTPS termination :443                                   │
└─────────────────────────────────┬───────────────────────────────────────────┘
                                  │
┌─────────────────────────────────┴───────────────────────────────────────────┐
│                        DOCKER COMPOSE NETWORK                                │
│                                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐│
│  │   nginx     │  │ signalling  │  │media-server │  │   ue-instance-N     ││
│  │  (static)   │  │ (TypeScript)│  │ (mediasoup) │  │  (Unreal Engine)    ││
│  │  :80 int    │  │  :3000      │  │ UDP 10000+  │  │  :8888+N            ││
│  └─────────────┘  └──────┬──────┘  └──────┬──────┘  └─────────────────────┘│
│                          │                │                                  │
│                          │    ┌───────────┴───────────┐                     │
│                          │    │                       │                     │
│                   ┌──────┴────┴──┐           ┌───────┴───────┐             │
│                   │  rvc-service │           │   recording   │             │
│                   │   (Python)   │           │   (FFmpeg)    │             │
│                   │   GPU/CUDA   │           │               │             │
│                   └──────────────┘           └───────────────┘             │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Data Flow

```
INSTRUCTOR                     SERVER                           STUDENT
     │                            │                                 │
     │────WebRTC (audio)─────────►│                                 │
     │                            ├───►RVC Processing               │
     │                            │         │                       │
     │                            │◄────────┘                       │
     │                            │                                 │
     │                            │────WebRTC (processed audio)────►│
     │                            │                                 │
     │                            │◄───WebRTC (video+audio)─────────│
     │◄───WebRTC (student feed)───│                                 │
     │                            │                                 │
     │                            │────►Recording Service           │
     │                            │     (side-by-side)              │
     │                            │                                 │
UE INSTANCE ──WebRTC──────────────┼──────────────────────────────►│
                                  │                                 │
```

### 1.4 Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| WebRTC topology | Server-mediated (SFU) | Required for recording + RVC |
| TURN server | Not needed | Server has public IP |
| Media server | mediasoup (Node.js) | Already used for SFU, mature |
| Voice processing | w-okada RVC (Python) | Best open-source RVC |
| Recording | FFmpeg | Industry standard, filter_complex |
| Language | TypeScript | Type safety, maintainability |
| Container runtime | Docker Compose | Simple, sufficient for scale |
| SSL termination | Host nginx | Standard pattern, Let's Encrypt |
| Static files | Container nginx | Separation of concerns |

---

## 2. Repository Structure

### 2.1 Monorepo Layout

```
lgm-streaming/
│
├── .github/
│   └── workflows/
│       ├── build.yml              # CI: Build all containers
│       └── test.yml               # CI: Run tests
│
├── .gitmodules                    # Git submodule configuration
├── .gitattributes                 # LFS tracking rules
├── docker-compose.yml             # Main compose file
├── docker-compose.dev.yml         # Development overrides
├── docker-compose.prod.yml        # Production overrides
├── .env.example                   # Environment template
├── pull.sh                        # Script to pull submodules + LFS
├── build.sh                       # Build all containers
├── plan.md                        # This document
├── README.md                      # Project documentation
│
├── packages/                      # Shared TypeScript packages
│   ├── shared-types/              # Shared type definitions
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── session.ts         # Session types
│   │       ├── signalling.ts      # Signalling message types
│   │       ├── media.ts           # Media/WebRTC types
│   │       └── api.ts             # Internal API types
│   │
│   └── proto/                     # gRPC protocol definitions
│       ├── audio.proto            # RVC audio streaming
│       └── recording.proto        # Recording control
│
├── services/
│   │
│   ├── signalling/                # Signalling server (cirrus.js rewrite)
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts           # Entry point
│   │       ├── server.ts          # Express + WebSocket server
│   │       ├── config.ts          # Configuration management
│   │       │
│   │       ├── session/
│   │       │   ├── SessionManager.ts
│   │       │   ├── Session.ts
│   │       │   └── types.ts
│   │       │
│   │       ├── signalling/
│   │       │   ├── SignallingServer.ts
│   │       │   ├── PlayerConnection.ts
│   │       │   ├── StreamerConnection.ts
│   │       │   └── MessageHandlers.ts
│   │       │
│   │       ├── media/
│   │       │   └── MediaServerClient.ts  # HTTP client to media-server
│   │       │
│   │       └── utils/
│   │           ├── logging.ts
│   │           └── validation.ts
│   │
│   ├── media-server/              # mediasoup-based media router
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── server.ts          # Express API server
│   │       ├── config.ts
│   │       │
│   │       ├── mediasoup/
│   │       │   ├── WorkerManager.ts
│   │       │   ├── RouterManager.ts
│   │       │   └── TransportManager.ts
│   │       │
│   │       ├── session/
│   │       │   ├── MediaSession.ts
│   │       │   ├── ParticipantHandler.ts
│   │       │   └── AudioPipeline.ts
│   │       │
│   │       ├── rvc/
│   │       │   └── RvcClient.ts   # gRPC client to RVC service
│   │       │
│   │       ├── recording/
│   │       │   └── RecordingClient.ts
│   │       │
│   │       └── api/
│   │           ├── routes.ts
│   │           └── handlers.ts
│   │
│   ├── rvc-service/               # Voice changer service
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   ├── pyproject.toml
│   │   └── src/
│   │       ├── __init__.py
│   │       ├── server.py          # gRPC server
│   │       ├── rvc_processor.py   # w-okada integration
│   │       ├── audio_utils.py     # PCM/Opus handling
│   │       └── config.py
│   │
│   ├── recording-service/         # Recording/muxing service
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── server.ts          # gRPC server
│   │       ├── RecordingPipeline.ts
│   │       ├── FFmpegManager.ts
│   │       └── storage.ts
│   │
│   └── nginx/                     # Static file server
│       ├── Dockerfile
│       ├── nginx.conf
│       └── mime.types
│
├── frontend/                      # React frontend (lgm_metahuman)
│   ├── Dockerfile                 # Multi-stage build
│   ├── package.json
│   ├── tsconfig.json
│   ├── webpack.common.js
│   ├── webpack.prod.js
│   └── src/
│       ├── index.tsx
│       ├── components/
│       │   ├── App.tsx
│       │   └── PixelStreamingWrapper.tsx
│       │
│       └── lgm/
│           ├── LgmConfig.ts
│           ├── client/
│           │   ├── LgmClient.ts
│           │   └── LgmData.ts
│           │
│           ├── stores/
│           │   ├── LgmStore.ts
│           │   ├── LgmWebRTCStore.ts    # REWRITTEN: SFU-style
│           │   ├── LgmChatStore.ts
│           │   └── LgmUEControl.ts
│           │
│           └── ui/
│               ├── LgmInstructorUi.tsx
│               ├── LgmStudentUi.tsx
│               └── components/
│
├── ue-build/                      # Git submodule (LFS)
│   ├── .gitattributes             # LFS rules for binaries
│   ├── Linux/
│   │   ├── lgm_metahuman_54.sh
│   │   ├── lgm_metahuman_54/      # Build artifacts (LFS)
│   │   └── Engine/                # Engine files (LFS)
│   └── README.md
│
└── ue-runtime/                    # UE container definition
    ├── Dockerfile
    ├── entrypoint.sh
    └── healthcheck.sh
```

### 2.2 Git Submodule Configuration

**.gitmodules:**
```gitmodules
[submodule "ue-build"]
    path = ue-build
    url = git@github.com:your-org/lgm-ue-build.git
    branch = main
```

**.gitattributes (in ue-build repo):**
```gitattributes
# Unreal Engine build artifacts
*.so filter=lfs diff=lfs merge=lfs -text
*.pak filter=lfs diff=lfs merge=lfs -text
*.uasset filter=lfs diff=lfs merge=lfs -text
*.umap filter=lfs diff=lfs merge=lfs -text
*.bin filter=lfs diff=lfs merge=lfs -text
*.dll filter=lfs diff=lfs merge=lfs -text
*.exe filter=lfs diff=lfs merge=lfs -text
lgm_metahuman_54 filter=lfs diff=lfs merge=lfs -text
```

---

## 3. Component Specifications

### 3.1 Signalling Server (TypeScript Rewrite)

**Responsibilities:**
- WebSocket server for client connections
- Session lifecycle management (create, join, leave, end)
- Signalling message routing (offer, answer, ICE candidates)
- Coordination with media-server via HTTP API
- Health checks and monitoring

**Key Classes:**

```typescript
// src/session/SessionManager.ts
class SessionManager {
  private sessions: Map<string, Session>;
  private maxSessions: number;

  createSession(secret: string, config: SessionConfig): Promise<Session>;
  getSession(secret: string): Session | undefined;
  endSession(secret: string): Promise<void>;
  getAvailableStreamerIndex(): number | null;
}

// src/session/Session.ts
class Session {
  readonly id: string;
  readonly secret: string;
  readonly streamerIndex: number;
  readonly createdAt: Date;

  participants: Map<string, Participant>;
  mediaRouterId?: string;
  recordingId?: string;

  addParticipant(participant: Participant): void;
  removeParticipant(participantId: string): void;
  broadcast(message: SignallingMessage, excludeId?: string): void;
}

// src/signalling/SignallingServer.ts
class SignallingServer {
  private wss: WebSocket.Server;
  private players: Map<string, PlayerConnection>;
  private streamers: Map<number, StreamerConnection>;

  handlePlayerConnection(ws: WebSocket, req: Request): void;
  handleStreamerConnection(ws: WebSocket, streamerIndex: number): void;
  forwardToMediaServer(sessionId: string, message: MediaMessage): Promise<void>;
}
```

**Configuration:**

```typescript
// src/config.ts
interface Config {
  http: {
    port: number;                    // 3000
  };
  sessions: {
    maxConcurrent: number;           // from env: MAX_SESSIONS
    inactivityTimeout: number;       // 30000ms
  };
  mediaServer: {
    url: string;                     // http://media-server:4000
  };
  streamerPorts: number[];           // [8888, 8889, ...]
  publicIp: string;                  // from env: PUBLIC_IP
}
```

### 3.2 Media Server (mediasoup)

**Responsibilities:**
- WebRTC transport management (create, connect, produce, consume)
- mediasoup Router per session
- Audio pipeline management (tap for RVC, inject processed)
- Recording stream management
- Port allocation per session

**Key Classes:**

```typescript
// src/mediasoup/WorkerManager.ts
class WorkerManager {
  private workers: mediasoup.Worker[];

  async initialize(numWorkers: number): Promise<void>;
  getWorkerForSession(): mediasoup.Worker;
}

// src/session/MediaSession.ts
class MediaSession {
  readonly sessionId: string;
  readonly router: mediasoup.Router;

  private transports: Map<string, mediasoup.WebRtcTransport>;
  private producers: Map<string, mediasoup.Producer>;
  private consumers: Map<string, mediasoup.Consumer>;
  private audioPipeline?: AudioPipeline;

  async createTransport(participantId: string): Promise<TransportInfo>;
  async connectTransport(transportId: string, dtls: DtlsParameters): Promise<void>;
  async produce(transportId: string, params: ProduceParams): Promise<string>;
  async consume(transportId: string, producerId: string, caps: RtpCapabilities): Promise<ConsumeResult>;

  async enableRvcProcessing(instructorProducerId: string): Promise<void>;
  async startRecording(): Promise<string>;
}

// src/session/AudioPipeline.ts
class AudioPipeline {
  private plainTransport: mediasoup.PlainTransport;
  private directTransport: mediasoup.DirectTransport;
  private rvcClient: RvcClient;

  async start(instructorAudioProducer: mediasoup.Producer): Promise<void>;
  async getProcessedProducerId(): string;
  async stop(): Promise<void>;
}
```

**API Endpoints:**

```typescript
// POST /sessions
// Create new media session
interface CreateSessionRequest {
  sessionId: string;
  streamerPort: number;
}
interface CreateSessionResponse {
  routerId: string;
  rtpCapabilities: RtpCapabilities;
}

// POST /sessions/:sessionId/transports
// Create WebRTC transport for participant
interface CreateTransportRequest {
  participantId: string;
  role: 'instructor' | 'student' | 'supervisor' | 'ue';
}
interface CreateTransportResponse {
  transportId: string;
  iceParameters: IceParameters;
  iceCandidates: IceCandidate[];
  dtlsParameters: DtlsParameters;
}

// POST /sessions/:sessionId/transports/:transportId/connect
// POST /sessions/:sessionId/transports/:transportId/produce
// POST /sessions/:sessionId/transports/:transportId/consume
// DELETE /sessions/:sessionId
```

**Port Allocation:**

```typescript
// Each session gets a range of UDP ports
// Session 0: 10000-10019
// Session 1: 10020-10039
// Session N: 10000 + (N * 20) to 10000 + (N * 20) + 19

const PORTS_PER_SESSION = 20;
const BASE_PORT = 10000;

function getPortRange(sessionIndex: number): { min: number; max: number } {
  return {
    min: BASE_PORT + (sessionIndex * PORTS_PER_SESSION),
    max: BASE_PORT + (sessionIndex * PORTS_PER_SESSION) + PORTS_PER_SESSION - 1
  };
}
```

### 3.3 RVC Service (Python)

**Responsibilities:**
- Load and manage RVC models
- Process audio frames in real-time
- Handle multiple concurrent session streams
- GPU resource management

**Architecture:**

```python
# src/server.py
class RvcServer(audio_pb2_grpc.AudioProcessorServicer):
    def __init__(self, model_path: str, max_sessions: int):
        self.processor = RvcProcessor(model_path)
        self.session_queues: Dict[str, Queue] = {}

    def ProcessAudio(self, request_iterator, context):
        """Bidirectional streaming RPC"""
        session_id = None
        for frame in request_iterator:
            session_id = frame.session_id
            processed = self.processor.process(frame.pcm_data)
            yield audio_pb2.AudioFrame(
                session_id=session_id,
                pcm_data=processed,
                timestamp=frame.timestamp
            )

# src/rvc_processor.py
class RvcProcessor:
    def __init__(self, model_path: str):
        self.model = load_model(model_path)
        self.sample_rate = 48000
        self.hop_length = 512

    def process(self, pcm_data: bytes) -> bytes:
        # Convert bytes to numpy array
        audio = np.frombuffer(pcm_data, dtype=np.float32)

        # Apply RVC transformation
        processed = self.model.infer(audio)

        return processed.tobytes()
```

**Expected Latency:** 50-150ms (model inference + buffering)

### 3.4 Recording Service

**Responsibilities:**
- Receive RTP streams from media-server
- Manage FFmpeg subprocesses per session
- Compose side-by-side video
- Store recordings with metadata

**Key Classes:**

```typescript
// src/RecordingPipeline.ts
class RecordingPipeline {
  private ffmpeg: ChildProcess;
  private sessionId: string;
  private outputPath: string;

  async start(streams: StreamConfig[]): Promise<void>;
  async stop(): Promise<RecordingResult>;

  private buildFFmpegCommand(): string[];
}

// FFmpeg command construction
// Side-by-side composition with audio tracks
const ffmpegArgs = [
  '-protocol_whitelist', 'rtp,udp,file',
  '-i', `rtp://127.0.0.1:${instructorPort}`,  // Instructor
  '-i', `rtp://127.0.0.1:${studentPort}`,      // Student
  '-filter_complex',
    '[0:v]scale=640:480[left];' +
    '[1:v]scale=640:480[right];' +
    '[left][right]hstack=inputs=2[out]',
  '-map', '[out]',
  '-map', '0:a',
  '-map', '1:a',
  '-c:v', 'libx264',
  '-preset', 'ultrafast',
  '-c:a', 'aac',
  '-f', 'mp4',
  outputPath
];
```

### 3.5 Frontend Changes (LgmWebRTCStore)

**Current (P2P):**
```typescript
// Creates direct peer connection to other clients
const peerConnection = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});
// Sends offer directly to peer via signalling
```

**New (SFU-style):**
```typescript
// src/lgm/stores/LgmWebRTCStore.ts
class LgmWebRTCStore {
  private transport?: RTCPeerConnection;
  private producers: Map<string, MediaStreamTrack> = new Map();
  private consumers: Map<string, MediaStreamTrack> = new Map();

  async connect(): Promise<void> {
    // 1. Request transport from signalling server
    const transportInfo = await this.requestTransport();

    // 2. Create RTCPeerConnection
    this.transport = new RTCPeerConnection({
      iceServers: transportInfo.iceServers,
      iceTransportPolicy: 'all'
    });

    // 3. Connect transport (DTLS handshake via signalling)
    await this.connectTransport();

    // 4. Add local tracks (produce)
    if (this.localStream) {
      for (const track of this.localStream.getTracks()) {
        await this.produce(track);
      }
    }

    // 5. Request remote tracks (consume)
    await this.consumeAvailableTracks();
  }

  private async produce(track: MediaStreamTrack): Promise<void> {
    // Send produce request to signalling → media-server
    // Get RTP parameters back
    // Add track to peer connection with parameters
  }

  private async consumeAvailableTracks(): Promise<void> {
    // Request list of available producers for this session
    // For each relevant producer, create consumer
    // Add received tracks to remoteStream
  }
}
```

---

## 4. Docker Architecture

### 4.1 docker-compose.yml

```yaml
version: '3.8'

services:
  # Static file server
  nginx:
    build: ./services/nginx
    container_name: lgm-nginx
    restart: unless-stopped
    volumes:
      - frontend-dist:/usr/share/nginx/html:ro
    networks:
      - lgm-internal
    expose:
      - "80"

  # Signalling server
  signalling:
    build: ./services/signalling
    container_name: lgm-signalling
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3000
      - MEDIA_SERVER_URL=http://media-server:4000
      - PUBLIC_IP=${PUBLIC_IP}
      - MAX_SESSIONS=${MAX_SESSIONS:-4}
      - STREAMER_PORTS=8888,8889,8890,8891
    ports:
      - "3000:3000"
    depends_on:
      - media-server
    networks:
      - lgm-internal

  # Media server (mediasoup)
  media-server:
    build: ./services/media-server
    container_name: lgm-media-server
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=4000
      - PUBLIC_IP=${PUBLIC_IP}
      - RTC_MIN_PORT=10000
      - RTC_MAX_PORT=10100
      - RVC_SERVICE_URL=rvc-service:50051
      - RECORDING_SERVICE_URL=recording-service:50052
      - MAX_SESSIONS=${MAX_SESSIONS:-4}
    ports:
      - "10000-10100:10000-10100/udp"
    depends_on:
      - rvc-service
      - recording-service
    networks:
      - lgm-internal

  # RVC voice changer
  rvc-service:
    build: ./services/rvc-service
    container_name: lgm-rvc
    restart: unless-stopped
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    environment:
      - CUDA_VISIBLE_DEVICES=0
      - MODEL_PATH=/models/default.pth
      - MAX_SESSIONS=${MAX_SESSIONS:-4}
    volumes:
      - ./models/rvc:/models:ro
    networks:
      - lgm-internal

  # Recording service
  recording-service:
    build: ./services/recording-service
    container_name: lgm-recording
    restart: unless-stopped
    environment:
      - RECORDINGS_PATH=/recordings
    volumes:
      - ${RECORDINGS_PATH:-./recordings}:/recordings
    networks:
      - lgm-internal

  # Unreal Engine instances (one per max session)
  ue-instance-0:
    build: ./ue-runtime
    container_name: lgm-ue-0
    restart: unless-stopped
    environment:
      - STREAMER_PORT=8888
      - STREAMER_ID=Streamer8888
      - SIGNALLING_URL=ws://signalling:3000
      - DISPLAY=:99
    volumes:
      - ./ue-build/Linux:/app:ro
    depends_on:
      - signalling
    networks:
      - lgm-internal
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu, video]

  ue-instance-1:
    build: ./ue-runtime
    container_name: lgm-ue-1
    restart: unless-stopped
    environment:
      - STREAMER_PORT=8889
      - STREAMER_ID=Streamer8889
      - SIGNALLING_URL=ws://signalling:3000
      - DISPLAY=:99
    volumes:
      - ./ue-build/Linux:/app:ro
    depends_on:
      - signalling
    networks:
      - lgm-internal
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu, video]

  # Add more ue-instance-N as needed...

volumes:
  frontend-dist:

networks:
  lgm-internal:
    driver: bridge
```

### 4.2 UE Runtime Container

**ue-runtime/Dockerfile:**
```dockerfile
FROM nvidia/vulkan:1.3-470

# Install dependencies
RUN apt-get update && apt-get install -y \
    xvfb \
    libvulkan1 \
    libopengl0 \
    libgl1-mesa-glx \
    libpulse0 \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m -s /bin/bash ue

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
COPY healthcheck.sh /healthcheck.sh
RUN chmod +x /entrypoint.sh /healthcheck.sh

USER ue

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s \
    CMD /healthcheck.sh

ENTRYPOINT ["/entrypoint.sh"]
```

**ue-runtime/entrypoint.sh:**
```bash
#!/bin/bash
set -e

# Start Xvfb
Xvfb :99 -screen 0 1280x720x24 &
export DISPLAY=:99

# Wait for X server
sleep 2

# Launch Unreal Engine
exec /app/lgm_metahuman_54.sh \
    -Windowed \
    -PixelStreamingURL="${SIGNALLING_URL:-ws://signalling:3000}" \
    -RenderOffscreen \
    -ForceRes \
    -ResX=1280 \
    -ResY=720 \
    -PixelStreamingWebRTCDisableReceiveAudio=true \
    -PixelStreamingWebRTCDisableTransmitAudio=true \
    -PixelStreamingWebRTCDisableAudioSync=true \
    -PixelStreamingWebRTCDisableFrameDropper=true \
    -PixelStreamingID="${STREAMER_ID:-Streamer}" \
    "$@"
```

### 4.3 Frontend Build (Multi-stage)

**frontend/Dockerfile:**
```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Output (just the dist files)
FROM scratch AS dist
COPY --from=builder /app/dist /
```

**services/nginx/Dockerfile:**
```dockerfile
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types

# Frontend dist will be mounted as volume
```

### 4.4 Service Dockerfiles

**services/signalling/Dockerfile:**
```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

USER node
CMD ["node", "dist/index.js"]
```

**services/media-server/Dockerfile:**
```dockerfile
FROM node:20-bullseye AS builder

# mediasoup requires build tools
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-bullseye-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

USER node
CMD ["node", "dist/index.js"]
```

**services/rvc-service/Dockerfile:**
```dockerfile
FROM nvidia/cuda:11.8-runtime-ubuntu22.04

RUN apt-get update && apt-get install -y \
    python3.10 \
    python3-pip \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

COPY src/ ./src/

CMD ["python3", "-m", "src.server"]
```

---

## 5. Build System

### 5.1 pull.sh

```bash
#!/bin/bash
set -e

echo "=== LGM Streaming Infrastructure - Pull Script ==="

# Initialize and update submodules
echo "[1/3] Initializing submodules..."
git submodule init
git submodule update --recursive

# Pull LFS files in main repo (if any)
echo "[2/3] Pulling LFS files (main repo)..."
git lfs pull

# Pull LFS files in ue-build submodule
echo "[3/3] Pulling LFS files (ue-build)..."
cd ue-build
git lfs install
git lfs pull
cd ..

echo "=== Pull complete ==="
echo ""
echo "Next steps:"
echo "  1. Copy .env.example to .env and configure"
echo "  2. Run ./build.sh to build all containers"
echo "  3. Run docker compose up -d to start services"
```

### 5.2 build.sh

```bash
#!/bin/bash
set -e

echo "=== LGM Streaming Infrastructure - Build Script ==="

# Check for required tools
command -v docker >/dev/null 2>&1 || { echo "Docker required but not installed."; exit 1; }
command -v node >/dev/null 2>&1 || { echo "Node.js required but not installed."; exit 1; }

# Load environment
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Build shared packages first
echo "[1/6] Building shared packages..."
cd packages/shared-types && npm ci && npm run build && cd ../..

# Build frontend
echo "[2/6] Building frontend..."
cd frontend && npm ci && npm run build && cd ..

# Build and extract frontend dist to volume
echo "[3/6] Preparing frontend dist..."
docker build -t lgm-frontend-builder --target dist ./frontend
docker create --name temp-frontend lgm-frontend-builder
docker cp temp-frontend:/ ./services/nginx/dist/
docker rm temp-frontend

# Build all service containers
echo "[4/6] Building service containers..."
docker compose build signalling media-server recording-service

# Build RVC service (requires GPU context)
echo "[5/6] Building RVC service..."
docker compose build rvc-service

# Build UE runtime
echo "[6/6] Building UE runtime..."
docker compose build ue-instance-0 ue-instance-1

echo "=== Build complete ==="
echo ""
echo "Run 'docker compose up -d' to start all services"
```

### 5.3 Package Scripts

**package.json (root):**
```json
{
  "name": "lgm-streaming",
  "private": true,
  "workspaces": [
    "packages/*",
    "services/*",
    "frontend"
  ],
  "scripts": {
    "pull": "./pull.sh",
    "build": "./build.sh",
    "dev": "docker compose -f docker-compose.yml -f docker-compose.dev.yml up",
    "start": "docker compose up -d",
    "stop": "docker compose down",
    "logs": "docker compose logs -f",
    "clean": "docker compose down -v --rmi local"
  }
}
```

---

## 6. Migration Strategy

### 6.1 Incremental Migration Path

```
Phase 1: Setup          Phase 2: Core         Phase 3: Features      Phase 4: Polish
─────────────────────────────────────────────────────────────────────────────────────►

├─ Repo structure       ├─ Signalling TS      ├─ RVC integration    ├─ Monitoring
├─ Docker compose       ├─ Media server       ├─ Recording          ├─ CI/CD
├─ Nginx setup          ├─ Frontend SFU       ├─ Multi-session      ├─ Documentation
├─ UE containers        ├─ Basic routing      ├─ Error handling     ├─ Testing
```

### 6.2 Backwards Compatibility

During migration, maintain both paths:

```typescript
// LgmWebRTCStore.ts
class LgmWebRTCStore {
  private mode: 'p2p' | 'sfu';

  constructor(base: LgmStore) {
    // Feature flag for gradual rollout
    this.mode = LgmConfig.USE_SFU ? 'sfu' : 'p2p';
  }

  async connect(peerId: string) {
    if (this.mode === 'sfu') {
      return this.connectSFU();
    } else {
      return this.connectP2P(peerId);
    }
  }
}
```

---

## 7. Implementation Phases

### Phase 0: Pixel Streaming 2 Migration (Week 1) - PARTIALLY DONE ✓

**Goals:** Upgrade to UE 5.6 and Pixel Streaming 2

**Status:** Infrastructure merge complete, UE project upgrade pending

**Completed:**
- [x] Merge PixelStreamingInfra UE5.6 branch
- [x] Backup LGM session logic from cirrus.js
- [x] Resolve merge conflicts

**Remaining Tasks:**
- [ ] Port LGM session logic to extend new SignallingServer (see Phase 2)
- [ ] Update lgm_metahuman frontend to use UE5.6 libraries
- [ ] Coordinate with UE team on project upgrade to 5.6
- [ ] Enable PixelStreaming2 plugin in UE project
- [ ] Recreate PixelStreaming blueprint nodes as PS2 versions
- [ ] Build new Linux shipping build (lgm_metahuman_56)
- [ ] Test basic pixel streaming functionality
- [ ] Test custom session/room system with PS2

**Deliverable:** Working PS2-based pixel streaming with current P2P functionality

### Phase 1: Foundation (Week 2-3)

**Goals:** Repository structure, containerization, basic infrastructure

**Tasks:**
- [ ] Create new repository structure (monorepo layout)
- [ ] Setup ue-build submodule with LFS
- [ ] Create pull.sh and build.sh scripts
- [ ] Setup docker-compose.yml with all services (stubs)
- [ ] Configure host nginx for HTTPS termination
- [ ] Containerize UE instances (PS2/UE5.6 builds)
- [ ] Setup internal nginx for static files
- [ ] Move frontend build to multi-stage Docker

**Deliverable:** Containerized infrastructure with PS2-based P2P functionality

### Phase 2: LGM Session Extension (Week 4) - SIMPLIFIED ✓

**Goals:** Extend new TypeScript SignallingServer with LGM session logic

**Note:** Epic's UE5.6 already provides TypeScript SignallingServer! We only need to:

**Tasks:**
- [ ] Create LGM extension module for SignallingServer
- [ ] Implement LgmSessionManager class (port from cirrus.js)
- [ ] Implement LgmSession class with participant management
- [ ] Add LGM message handlers (create-session, join-session, etc.)
- [ ] Add streamer index assignment per session
- [ ] Add session timeout/cleanup logic
- [ ] Add MediaServerClient for future media server integration
- [ ] Unit tests for LGM session logic

**Deliverable:** TypeScript signalling server with LGM session management

### Phase 3: Media Server (Week 6-7)

**Goals:** mediasoup-based media routing

**Tasks:**
- [ ] Implement WorkerManager (mediasoup worker pool)
- [ ] Implement RouterManager (per-session routers)
- [ ] Implement TransportManager (WebRTC transports)
- [ ] Implement MediaSession (session media state)
- [ ] Create HTTP API for signalling integration
- [ ] Port allocation system
- [ ] Integration tests

**Deliverable:** Working SFU routing (without RVC/recording)

### Phase 4: Frontend Migration (Week 8)

**Goals:** Update frontend for SFU-style connections

**Tasks:**
- [ ] Rewrite LgmWebRTCStore for SFU pattern
- [ ] Update signalling message handling
- [ ] Add produce/consume logic
- [ ] Test with multiple participants
- [ ] Maintain backwards compatibility flag

**Deliverable:** Frontend working with media server

### Phase 5: RVC Integration (Week 9-10)

**Goals:** Voice changing pipeline

**Tasks:**
- [ ] Implement RVC service (Python + gRPC)
- [ ] Implement AudioPipeline in media server
- [ ] PlainRtpTransport for audio extraction
- [ ] DirectTransport for audio injection
- [ ] Latency optimization
- [ ] Model management

**Deliverable:** Working voice changing

### Phase 6: Recording (Week 11)

**Goals:** Session recording

**Tasks:**
- [ ] Implement RecordingService
- [ ] FFmpeg pipeline for side-by-side
- [ ] PlainRtpTransport taps
- [ ] Storage management
- [ ] Metadata handling

**Deliverable:** Working session recording

### Phase 7: Production Hardening (Week 12-13)

**Goals:** Production readiness

**Tasks:**
- [ ] Health checks for all services
- [ ] Graceful shutdown handling
- [ ] Error recovery
- [ ] Monitoring and metrics
- [ ] CI/CD pipeline
- [ ] Documentation
- [ ] Load testing

**Deliverable:** Production-ready system

---

## Appendix A: Environment Variables

**.env.example:**
```bash
# Public IP address of the server
PUBLIC_IP=your.server.ip

# Maximum concurrent sessions
MAX_SESSIONS=4

# Recordings storage path
RECORDINGS_PATH=/var/lib/lgm/recordings

# RVC model path
RVC_MODEL_PATH=/var/lib/lgm/models

# Domain for SSL
DOMAIN=your-domain.com

# Node environment
NODE_ENV=production
```

---

## Appendix B: Nginx Host Configuration

**/etc/nginx/sites-available/lgm:**
```nginx
upstream signalling {
    server 127.0.0.1:3000;
}

upstream static {
    server 127.0.0.1:8080;  # nginx container maps to this
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Static files (frontend)
    location / {
        proxy_pass http://static;
        proxy_set_header Host $host;
    }

    # WebSocket (signalling)
    location /ws {
        proxy_pass http://signalling;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_read_timeout 86400s;
    }

    # Signalling API
    location /api {
        proxy_pass http://signalling;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Appendix C: Monitoring Endpoints

Each service exposes health and metrics:

| Service | Health | Metrics |
|---------|--------|---------|
| signalling | GET /health | GET /metrics |
| media-server | GET /health | GET /metrics |
| rvc-service | gRPC health check | Prometheus metrics |
| recording | GET /health | GET /metrics |
| ue-instance-N | Custom healthcheck.sh | - |

---

## Appendix D: Estimated Resource Requirements

| Service | CPU | RAM | GPU | Notes |
|---------|-----|-----|-----|-------|
| nginx | 0.1 | 64MB | - | Static files |
| signalling | 0.5 | 256MB | - | WebSocket handling |
| media-server | 2.0 | 1GB | - | Per session: +256MB |
| rvc-service | 1.0 | 4GB | 1 | CUDA required |
| recording | 1.0 | 512MB | - | Per session: +256MB |
| ue-instance | 4.0 | 8GB | 1 | Per instance |

**Total for 4 concurrent sessions:**
- CPU: ~20 cores
- RAM: ~40GB
- GPU: 2 (1 for RVC, 1 shared by UE instances or 4 separate)

---

*Document Version: 1.0*
*Last Updated: 2024*
