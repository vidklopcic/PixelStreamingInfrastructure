// Copyright Epic Games, Inc. All Rights Reserved.

import React, { useEffect, useRef, useState } from 'react';
import {
    Config,
    AllSettings,
    PixelStreaming
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.4';
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
