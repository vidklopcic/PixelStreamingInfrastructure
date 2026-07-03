// Copyright Epic Games, Inc. All Rights Reserved.

import React, { useEffect, useRef, useState } from 'react';
import {
    Config,
    AllSettings,
    PixelStreaming,
    Logger,
    LogLevel,
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.7';

// Suppress verbose PixelStreaming Info/Debug logs
Logger.InitLogging(LogLevel.Warning, false);
import { LgmStyles } from '../lgm/ui/LgmStyles';

export interface PixelStreamingWrapperProps {
    initialSettings?: Partial<AllSettings>;
    cover?: boolean;
    radius?: boolean;
    onStreamingCreated?: (streaming: PixelStreaming) => void;
    onConneced?: (connected: boolean) => void;
}

export const PixelStreamingWrapper = ({
                                          initialSettings,
                                          cover,
                                          radius,
                                          onStreamingCreated,
                                          onConneced
                                      }: PixelStreamingWrapperProps) => {
    // A reference to parent div element that the Pixel Streaming library attaches into:
    const videoParent = useRef<HTMLDivElement>(null);

    // Pixel streaming library instance is stored into this state variable after initialization:
    const [pixelStreaming, setPixelStreaming] = useState<PixelStreaming>();

    // A boolean state variable that determines if the Click to play overlay is shown:
    const [clickToPlayVisible, setClickToPlayVisible] = useState(false);

    // Run on component mount:
    useEffect(() => {
        if (videoParent.current) {
            // Attach Pixel Streaming library to videoParent element:
            const config = new Config({ initialSettings });
            const streaming = new PixelStreaming(config, {
                videoElementParent: videoParent.current
            });

            // register a playStreamRejected handler to show Click to play overlay if needed:
            streaming.addEventListener('playStreamRejected', () => {
                setClickToPlayVisible(true);
            });

            streaming.addEventListener('webRtcConnected', () => {
                onConneced?.(true);
            });
            streaming.addEventListener('webRtcDisconnected', () => {
                onConneced?.(false);
            });

            // Compact WebRTC stats line every 5s for diagnosing stream glitches
            // (read via browser console; counters are deltas per 5s window).
            const statsLog = { prev: undefined as any, lastMs: 0 };
            streaming.addEventListener('statsReceived', (e: any) => {
                try {
                    const s = e.data?.aggregatedStats;
                    const v = s?.inboundVideoStats;
                    if (!v) return;
                    const now = Date.now();
                    if (now - statsLog.lastMs < 5000) return;
                    const prev = statsLog.prev;
                    statsLog.lastMs = now;
                    statsLog.prev = {
                        framesDropped: v.framesDropped ?? 0,
                        packetsLost: v.packetsLost ?? 0,
                        freezeCount: v.freezeCount ?? 0,
                        nackCount: v.nackCount ?? 0,
                        pliCount: v.pliCount ?? 0,
                    };
                    const rtt = s.getActiveCandidatePair?.()?.currentRoundTripTime;
                    console.info('[metka-stats]', JSON.stringify({
                        fps: v.framesPerSecond,
                        kbps: v.bitrate !== undefined ? Math.round(v.bitrate / 1000) : undefined,
                        res: v.frameWidth ? `${v.frameWidth}x${v.frameHeight}` : undefined,
                        jitterMs: v.jitter !== undefined ? Math.round(v.jitter * 1000) : undefined,
                        rttMs: rtt !== undefined ? Math.round(rtt * 1000) : undefined,
                        dropped: (v.framesDropped ?? 0) - (prev?.framesDropped ?? 0),
                        lost: (v.packetsLost ?? 0) - (prev?.packetsLost ?? 0),
                        freezes: (v.freezeCount ?? 0) - (prev?.freezeCount ?? 0),
                        nack: (v.nackCount ?? 0) - (prev?.nackCount ?? 0),
                        pli: (v.pliCount ?? 0) - (prev?.pliCount ?? 0),
                    }));
                } catch {
                }
            });

            // Save the library instance into component state so that it can be accessed later:
            setPixelStreaming(streaming);
            onStreamingCreated(streaming);

            // Clean up on component unmount:
            return () => {
                try {
                    streaming.disconnect();
                } catch {
                }
            };
        }
    }, []);

    return (
        <div
            className={cover ? 'object-fit-cover' : ''}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                backgroundColor: 'black',
                overflow: 'hidden',
                borderRadius: radius ? 16 : 0,
                boxShadow: LgmStyles.shadow
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%'
                }}
                ref={videoParent}
            />
            {clickToPlayVisible && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => {
                        pixelStreaming?.play();
                        setClickToPlayVisible(false);
                    }}
                >
                    <div>Click to play</div>
                </div>
            )}
        </div>
    );
};
