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
            // NOTE: inboundVideoStats.bitrate is bits/ms == kbps already.
            const statsLog = { prev: undefined as any, lastMs: 0, encoderQP: undefined as number | undefined };
            streaming.addEventListener('videoEncoderAvgQP', (e: any) => {
                statsLog.encoderQP = e.data?.avgQP;
            });
            streaming.addEventListener('statsReceived', (e: any) => {
                try {
                    const s = e.data?.aggregatedStats;
                    const v = s?.inboundVideoStats as any;
                    if (!v) return;
                    const now = Date.now();
                    if (now - statsLog.lastMs < 5000) return;
                    const prev = statsLog.prev;
                    const dtSecs = prev ? (now - statsLog.lastMs) / 1000 : 5;
                    statsLog.lastMs = now;
                    statsLog.prev = {
                        framesDropped: v.framesDropped ?? 0,
                        framesReceived: v.framesReceived ?? 0,
                        framesDecoded: v.framesDecoded ?? 0,
                        keyFramesDecoded: v.keyFramesDecoded ?? 0,
                        packetsLost: v.packetsLost ?? 0,
                        packetsReceived: v.packetsReceived ?? 0,
                        retransmittedPacketsReceived: v.retransmittedPacketsReceived ?? 0,
                        freezeCount: v.freezeCount ?? 0,
                        totalFreezesDuration: v.totalFreezesDuration ?? 0,
                        nackCount: v.nackCount ?? 0,
                        pliCount: v.pliCount ?? 0,
                        qpSum: v.qpSum ?? 0,
                        jitterBufferDelay: v.jitterBufferDelay ?? 0,
                        jitterBufferEmittedCount: v.jitterBufferEmittedCount ?? 0,
                        totalDecodeTime: v.totalDecodeTime ?? 0,
                    };
                    const pair = s.getActiveCandidatePair?.();
                    const local = s.localCandidates?.find((c: any) => c.id === pair?.localCandidateId);
                    const remote = s.remoteCandidates?.find((c: any) => c.id === pair?.remoteCandidateId);
                    const rtt = pair?.currentRoundTripTime;
                    const dFramesDecoded = (v.framesDecoded ?? 0) - (prev?.framesDecoded ?? 0);
                    const dJbufEmitted = (v.jitterBufferEmittedCount ?? 0) - (prev?.jitterBufferEmittedCount ?? 0);
                    console.info('[metka-stats]', JSON.stringify({
                        fps: v.framesPerSecond,
                        kbps: v.bitrate !== undefined ? Math.round(v.bitrate) : undefined,
                        res: v.frameWidth ? `${v.frameWidth}x${v.frameHeight}` : undefined,
                        // Encoder QP reported by UE over the data channel (H.264: ~20 good, >40 blocky).
                        encQP: statsLog.encoderQP,
                        // Avg decoder QP over the window - confirms low quality is encoder-side.
                        decQP: dFramesDecoded > 0
                            ? Math.round(((v.qpSum ?? 0) - (prev?.qpSum ?? 0)) / dFramesDecoded)
                            : undefined,
                        jitterMs: v.jitter !== undefined ? Math.round(v.jitter * 1000) : undefined,
                        rttMs: rtt !== undefined ? Math.round(rtt * 1000) : undefined,
                        // Avg jitter-buffer hold time per emitted frame - rises with network delay variance.
                        jbufMs: dJbufEmitted > 0
                            ? Math.round((((v.jitterBufferDelay ?? 0) - (prev?.jitterBufferDelay ?? 0)) / dJbufEmitted) * 1000)
                            : undefined,
                        // Avg decode time per frame - rules the client GPU/CPU in or out.
                        decodeMs: dFramesDecoded > 0
                            ? Math.round((((v.totalDecodeTime ?? 0) - (prev?.totalDecodeTime ?? 0)) / dFramesDecoded) * 1000)
                            : undefined,
                        recvFps: Math.round(((v.framesReceived ?? 0) - (prev?.framesReceived ?? 0)) / dtSecs),
                        pktRate: Math.round(((v.packetsReceived ?? 0) - (prev?.packetsReceived ?? 0)) / dtSecs),
                        dropped: (v.framesDropped ?? 0) - (prev?.framesDropped ?? 0),
                        lost: (v.packetsLost ?? 0) - (prev?.packetsLost ?? 0),
                        rtx: (v.retransmittedPacketsReceived ?? 0) - (prev?.retransmittedPacketsReceived ?? 0),
                        keyframes: (v.keyFramesDecoded ?? 0) - (prev?.keyFramesDecoded ?? 0),
                        freezes: (v.freezeCount ?? 0) - (prev?.freezeCount ?? 0),
                        freezeMs: Math.round(((v.totalFreezesDuration ?? 0) - (prev?.totalFreezesDuration ?? 0)) * 1000),
                        nack: (v.nackCount ?? 0) - (prev?.nackCount ?? 0),
                        pli: (v.pliCount ?? 0) - (prev?.pliCount ?? 0),
                        path: pair
                            ? `${local?.candidateType ?? '?'}/${remote?.candidateType ?? '?'}/${local?.protocol ?? remote?.protocol ?? '?'}`
                            : undefined,
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
