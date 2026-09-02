import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { LgmStoreContext } from '../../stores/LgmStore';
import { LgmConfig } from '../../LgmConfig';
import { PixelStreamingWrapper } from '../../../components/PixelStreamingWrapper';

// Experiment hook (2026-09 freeze harness): `#stall=<secs>` overrides the
// library's stream-stall watchdog timeout (default 5); 0 disables the watchdog
// so a killed feed can be observed instead of reconnected.
const STALL_TIMEOUT_OVERRIDE: number | undefined = (() => {
    const v = new URLSearchParams(window.location.hash.substring(1)).get('stall');
    return v === null || v === '' || isNaN(Number(v)) ? undefined : Number(v);
})();

interface LgmUnrealProps {
    interactive?: boolean;
    cover?: boolean;
    radius?: boolean;
}

export const LgmUnreal = observer((props: LgmUnrealProps) => {
    const store = useContext(LgmStoreContext);
    // Unmounting on session end is what disconnects the PixelStreaming player
    // (the wrapper's cleanup) and stops its reconnect loops - otherwise the
    // socket stays subscribed to the streamer for as long as the tab is open.
    if (!store || !store.hasSession || store.sessionEnded) {
        return null;
    }

    return <PixelStreamingWrapper
        cover={props.cover}
        radius={props.radius}
        initialSettings={{
            AutoPlayVideo: true,
            GamepadInput: !!props.interactive,
            KeyboardInput: !!props.interactive,
            MouseInput: !!props.interactive,
            TouchInput: !!props.interactive,
            StreamerAutoJoinInterval: 5000,
            AutoConnect: true,
            ss: LgmConfig.SIGNALLING_SERVER,
            StartVideoMuted: true,
            HoveringMouse: true,
            WaitForStreamer: true,
            WebRTCMaxBitrate: 6000,
            WebRTCMinBitrate: 1000,
            // Default is 3 attempts 2s apart - gives up mid WiFi-switch. 999 is
            // the library max; the wrapper's periodic retry then takes over, so
            // in practice we never stop trying.
            MaxReconnectAttempts: 999,
            ...(STALL_TIMEOUT_OVERRIDE !== undefined ? { StreamStallTimeoutSecs: STALL_TIMEOUT_OVERRIDE } : {}),
        }}
        onStreamingCreated={(streaming) => {
            store.pixelStreaming = streaming;
            // The signalling server ignores listStreamers/subscribe until
            // setSessionId binds the connection to a session, and the binding is
            // per-connection (playerId) - so it must be re-sent on EVERY
            // (re)connect, not just the first one, or reconnects hang forever.
            const sendSessionId = () => {
                try {
                    const protocol = streaming.signallingProtocol;
                    if (protocol?.isConnected()) {
                        protocol.sendMessage({
                            type: 'setSessionId',
                            namespace: 'lgm',
                            sessionSecret: store.session.sessionSecret,
                            userId: store.user.id
                        } as any);
                    }
                } catch (e) {
                    // WebSocket not ready - the next 'open' will retry
                }
            };
            const armSessionBinding = () => {
                try {
                    const protocol = streaming.signallingProtocol;
                    if (protocol?.transport) {
                        // fires on the initial connect and every reconnect
                        protocol.transport.on('open', sendSessionId);
                        // socket may already be open by the time we attach
                        if (protocol.isConnected()) {
                            sendSessionId();
                        }
                        return;
                    }
                } catch (e) {
                    // protocol not constructed yet, retry
                }
                setTimeout(armSessionBinding, 50);
            };
            armSessionBinding();
            // setSessionId fails silently if the session was closed server-side
            // (inactivity timeout during a long outage) and only succeeds after
            // LgmClient re-joins and re-creates it - keep re-sending until the
            // stream is actually up. The server ignores duplicates once bound.
            const rebindTimer = setInterval(() => {
                if (store.sessionEnded) {
                    clearInterval(rebindTimer);
                    return;
                }
                if (!store.pixelStreamingConnected) {
                    sendSessionId();
                }
            }, 2000);
        }}
        onConneced={(connected) => {
            store.pixelStreamingConnected = connected;
        }}
    />;
});