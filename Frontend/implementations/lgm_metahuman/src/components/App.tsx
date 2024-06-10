// Copyright Epic Games, Inc. All Rights Reserved.

import React from 'react';
import { PixelStreamingWrapper } from './PixelStreamingWrapper';
import { LgmConfig } from '../lgm/LgmConfig';
import { LgmUiWrapper } from '../lgm/LgmUiWrapper';
import { lgmStore } from '../lgm/stores/LgmStore';

export const App = () => {
    return (
        <div
            style={{
                height: '100%',
                width: '100%'
            }}
        >
            {lgmStore.showUe && <PixelStreamingWrapper
                initialSettings={{
                    AutoPlayVideo: true,
                    GamepadInput: false,
                    KeyboardInput: false,
                    MouseInput: false,
                    TouchInput: false,
                    StreamerAutoJoinInterval: 5000,
                    AutoConnect: true,
                    ss: `wss://${LgmConfig.HOST}`,
                    StartVideoMuted: false,
                    HoveringMouse: false,
                    WaitForStreamer: true
                }}
            />}
            <LgmUiWrapper/>
        </div>
    );
};
