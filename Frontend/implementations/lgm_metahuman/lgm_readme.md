# LGM Metahuman Frontend

## Build Order

This project is part of a monorepo. Dependencies must be built in order:

```bash
# 1. Build Common library
cd Common
npm install
npm run build:cjs && npm run build:esm

# 2. Build Frontend library
cd Frontend/library
npm install
npm run build

# 3. Build LGM Metahuman frontend
cd Frontend/implementations/lgm_metahuman
npm install
npm run build
```

## Development

For development with hot reload:

```bash
cd Frontend/implementations/lgm_metahuman
npm run serve
```

## UE5.6 API Changes

The UE5.6 upgrade introduced breaking changes to the signalling API:

| Old API (UE5.4) | New API (UE5.6) |
|-----------------|-----------------|
| `streaming.webSocketController.webSocket.readyState === 1` | `streaming.signallingProtocol.isConnected()` |
| `streaming.webSocketController.webSocket.send(JSON.stringify(...))` | `streaming.signallingProtocol.sendMessage({...})` |

Custom messages must be cast with `as any` since `BaseMessage` is strictly typed.
