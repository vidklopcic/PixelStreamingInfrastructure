# LGM Changes vs Upstream UE5.7

This document outlines all modifications made to the Epic Games Pixel Streaming Infrastructure for LGM (Live Generated Metahuman) session management.

**Base Branch:** `upstream/UE5.7` (Epic Games official UE5.7 release)
**LGM Branch:** `feature/architecture-overhaul` → merged to `LGM/staging`

---

## Overview

The LGM extension adds multi-session, multi-streamer support to Pixel Streaming, enabling:
- Multiple concurrent sessions with isolated streamers
- Session-based access control (prevents video leaks between sessions)
- Real-time session management (create, join, close)
- WebRTC peer-to-peer audio/video between session participants
- LiveLink integration for Unreal Engine control

**Design Philosophy:** All LGM-specific code is modular and isolated, minimizing changes to upstream files to ease future merges.

---

## File Changes Summary

| Category | Files Added | Files Modified | Lines Added |
|----------|-------------|----------------|-------------|
| SignallingWebServer (LGM Extension) | 5 | 2 | ~1,050 |
| Frontend (lgm_metahuman) | 31 | 0 | ~4,500 |
| Development Scripts | 1 | 0 | ~280 |
| Configuration | 3 | 1 | ~100 |
| Documentation | 2 | 0 | ~1,700 |
| **Total** | **42** | **3** | **~7,600** |

---

## 1. SignallingWebServer Changes

### 1.1 Modified Files

#### `SignallingWebServer/src/index.ts`
**Changes:** +50 lines (CLI options and LGM initialization)

```typescript
// Added imports
import { createLgmExtension, LgmConfig } from './lgm';

// Added CLI options (lines 181-205):
--lgm                    // Enable LGM extension
--streamer_ports <ports> // Comma-separated ports for multi-streamer
--live_link_ip <ip>      // LiveLink IP for UE communication
--live_link_port <port>  // LiveLink port
--session_timeout <ms>   // Session inactivity timeout

// Added LGM initialization (lines 299-324):
if (options.lgm) {
    const lgmExtension = createLgmExtension(signallingServer, lgmConfig);
    // Graceful shutdown handlers for SIGTERM/SIGINT
}
```

#### `SignallingWebServer/config.json`
**Changes:** Added LGM configuration options

```json
{
    "http_root": "../Frontend/implementations/lgm_metahuman/dist",
    "homepage": "index.html",
    "https": true,
    "https_port": 8443,
    "lgm": true,
    "streamer_ports": [8888, 8890, 8891, 8892],
    "live_link_ip": "localhost",
    "live_link_port": "11111",
    "session_timeout": "30000"
}
```

### 1.2 New Files: LGM Extension Module

All LGM server logic is contained in `SignallingWebServer/src/lgm/`:

#### `LgmTypes.ts` (103 lines)
TypeScript interfaces and enums:
- `LgmConfig` - Extension configuration
- `LgmSessionData` - Session state data
- `LgmMessage` - Message protocol types
- `LgmMessageType` - Enum of message types (create-session, join-session, etc.)
- `LgmPlayerInfo` - Player-session binding info

#### `LgmSession.ts` (178 lines)
Session class managing:
- Client connections (Map of userId → WebSocket)
- Session data (secret, streamerIndex, timestamps)
- Message broadcasting to session participants
- Activity tracking for timeout cleanup

#### `LgmSessionManager.ts` (333 lines)
Session lifecycle management:
- Session creation with streamer index assignment
- Session joining with client registration
- Inactive session cleanup (configurable timeout)
- Message routing (create, join, close, ping, broadcast)
- Streamer index allocation (round-robin)

#### `LgmExtension.ts` (372 lines)
Main integration point - hooks into SignallingServer without modifying core files:

**Multi-Streamer Support:**
- Creates additional WebSocket servers for ports beyond the first
- Each session gets a dedicated streamer port
- Streamer connections are registered in the main registry

**Player Message Interception:**
- Hooks `playerRegistry.add` to intercept new players
- Overrides `listStreamers` to filter by session
- Overrides `subscribe` to validate streamer access
- Handles `setSessionId` to bind players to sessions

**Security Features:**
- Blocks `listStreamers` until session is bound (returns empty list)
- Blocks `subscribe` until session is bound
- Validates streamer belongs to player's session
- Auto-resubscribes to correct streamer if needed

#### `index.ts` (7 lines)
Module exports.

---

## 2. Frontend Changes

### 2.1 New Implementation: `lgm_metahuman`

Located in `Frontend/implementations/lgm_metahuman/` (31 source files, ~4,500 lines)

#### Core Structure
```
src/
├── components/           # React wrapper components
│   ├── App.tsx          # Main application
│   ├── PixelStreamingWrapper.tsx
│   └── LiveLinkTutorial.tsx
├── lgm/
│   ├── LgmConfig.ts     # Configuration (WebSocket URL)
│   ├── LgmUiWrapper.tsx # Main LGM UI wrapper
│   ├── client/
│   │   ├── LgmClient.ts # WebSocket client for LGM messages
│   │   └── LgmData.ts   # Data types
│   ├── stores/
│   │   ├── LgmStore.ts      # MobX state management
│   │   ├── LgmChatStore.ts  # Chat state
│   │   ├── LgmUEControl.ts  # UE control messages
│   │   └── LgmWebRTCStore.ts # WebRTC peer connections
│   └── ui/
│       ├── LgmInstructorUi.tsx
│       ├── LgmStudentUi.tsx
│       ├── LgmSupervisorUi.tsx
│       └── components/
│           ├── LgmUnreal.tsx      # PixelStreaming integration
│           ├── LgmSessionInfo.tsx
│           ├── LgmUeControls.tsx
│           ├── LgmOnboardingUi.tsx
│           ├── chat/              # Video/audio chat UI
│           ├── controls/          # Emotion wheel, etc.
│           └── dialogs/           # Modal dialogs
└── utils/
    └── formatters.ts
```

#### Key Features
- **Role-based UI:** Instructor, Student, Supervisor views
- **Session Management:** Create/join sessions with secret codes
- **WebRTC Chat:** Peer-to-peer video/audio between participants
- **UE Control:** Emotion wheel, character control via DataChannel
- **MobX State:** Reactive state management

#### Configuration (`LgmConfig.ts`)
```typescript
export abstract class LgmConfig {
    static SIGNALLING_SERVER = (() => {
        const hostname = window.location.hostname;
        const isLocalDev = hostname === 'localhost' || hostname === '127.0.0.1';
        return isLocalDev ? `wss://${hostname}:8443` : `wss://${hostname}`;
    })();
}
```

#### Session Binding (`LgmUnreal.tsx`)
```typescript
onStreamingCreated={(streaming) => {
    // Wait for connection, then send session binding
    streaming.signallingProtocol.sendMessage({
        type: 'setSessionId',
        namespace: 'lgm',
        sessionSecret: store.session.sessionSecret,
        userId: store.user.id
    } as any);
}}
```

### 2.2 Build Configuration

- `webpack.common.js` - Shared webpack config
- `webpack.dev.js` - Development with HTTPS, hot reload, WebSocket proxy
- `webpack.prod.js` - Production build
- `tsconfig.json` - TypeScript configuration

---

## 3. Development Environment

### `start_development_pixel_streaming.sh` (279 lines)

Comprehensive development script providing:

**Commands:**
```bash
./start_development_pixel_streaming.sh start  # Full setup
./start_development_pixel_streaming.sh quick  # Skip install if node_modules exist
./start_development_pixel_streaming.sh watch  # Library watching mode
./start_development_pixel_streaming.sh build  # Build all packages
```

**Features:**
- Auto-generates self-signed SSL certificates for HTTPS
- Builds dependencies in correct order (Common → Signalling → Frontend/library → SignallingWebServer)
- Runs concurrent dev servers with hot reload
- nodemon for SignallingWebServer auto-rebuild
- webpack-dev-server for frontend with HMR

**URLs:**
- Frontend: `https://localhost:3000`
- SignallingServer: `https://localhost:8443`
- Streamer Ports: 8888, 8890, 8891, 8892

---

## 4. Configuration Files

### SSL Certificates
```
SignallingWebServer/certificates/
├── client-cert.pem  # Self-signed certificate
└── client-key.pem   # Private key
```

### `.gitignore` Additions
```
_lgm_backup/
.DS_Store
.idea/
```

---

## 5. Message Protocol

### LGM Namespace Messages

All LGM messages use `namespace: 'lgm'` for routing:

```typescript
// Create/Join Session
{
    type: 'create-session' | 'join-session',
    namespace: 'lgm',
    data: { sessionSecret, userName, contextText? },
    fromUserId: string
}

// Session Response
{
    type: 'session',
    namespace: 'lgm',
    data: LgmSessionData
}

// Session Binding (Player → Server)
{
    type: 'setSessionId',
    namespace: 'lgm',
    sessionSecret: string,
    userId: string
}

// Ping/Pong (Activity tracking)
{
    type: 'ping' | 'pong',
    namespace: 'lgm',
    user: { id, role, name }
}

// Broadcast Messages (Chat, WebRTC signaling, etc.)
{
    type: 'chat' | 'offer' | 'answer' | 'ice-candidate' | ...,
    namespace: 'lgm',
    ...payload
}
```

---

## 6. Security Model

### Session Isolation

1. **Empty Streamer List:** Until `setSessionId` is received, `listStreamers` returns empty array
2. **Blocked Subscription:** `subscribe` is rejected until session is bound
3. **Streamer Validation:** Players can only subscribe to their session's assigned streamer
4. **Auto-Resubscribe:** If player somehow connects to wrong streamer, they're automatically moved

### Flow
```
Player Connect → listStreamers (empty) → create-session → setSessionId
                                                              ↓
                                           Player bound to streamer index
                                                              ↓
                                           subscribe(correct streamer) ✓
```

---

## 7. Multi-Streamer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SignallingServer                          │
├─────────────────────────────────────────────────────────────┤
│  Port 8888 (main)  │  Port 8890  │  Port 8891  │  Port 8892 │
│  ───────────────   │  ─────────  │  ─────────  │  ─────────  │
│  Streamer Index 0  │  Index 1    │  Index 2    │  Index 3    │
│  Session A         │  Session B  │  Session C  │  Session D  │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │  LgmSessionManager │
                    │  ─────────────────  │
                    │  Session → Streamer │
                    │  mapping & isolation│
                    └─────────────────────┘
```

---

## 8. Upstream Merge Strategy

### Minimal Core Changes
Only 2 core files modified:
- `SignallingWebServer/src/index.ts` - CLI options + initialization
- `SignallingWebServer/config.json` - Default configuration

### Isolated Extension
All LGM logic in `SignallingWebServer/src/lgm/` can be:
- Easily disabled via `--lgm false`
- Removed entirely without affecting upstream functionality
- Updated independently of core changes

### Merge Process
1. Fetch upstream changes
2. Merge into LGM branch
3. Resolve conflicts in `index.ts` (usually just re-add LGM imports/options)
4. Test LGM functionality
5. No changes needed to `src/lgm/` unless APIs change

---

## 9. Dependencies

### Added npm packages (lgm_metahuman)
- `mobx`, `mobx-react-lite` - State management
- `react-toastify` - Notifications
- `peerjs` - WebRTC abstraction (may be removed)
- Standard React/TypeScript/Webpack stack

### Global tools (dev script)
- `concurrently` - Run multiple processes
- `nodemon` - Auto-restart on changes

---

## 10. Future Considerations

1. **Streamer Health Monitoring:** Track streamer connection status per port
2. **Session Persistence:** Optional session state persistence for reconnection
3. **Load Balancing:** Dynamic streamer assignment based on load
4. **Metrics:** Session duration, participant count, error tracking
5. **Admin API:** REST endpoints for session management
