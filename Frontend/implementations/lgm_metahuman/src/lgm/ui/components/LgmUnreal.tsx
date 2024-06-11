import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { LgmStoreContext } from '../../stores/LgmStore';
import { LgmConfig } from '../../LgmConfig';
import { PixelStreamingWrapper } from '../../../components/PixelStreamingWrapper';

export const LgmUnreal = observer(() => {
    const store = useContext(LgmStoreContext);
    if (!store) {
        return null;
    }

    return <PixelStreamingWrapper
        initialSettings={{
            AutoPlayVideo: true,
            GamepadInput: false,
            KeyboardInput: false,
            MouseInput: false,
            TouchInput: false,
            StreamerAutoJoinInterval: 5000,
            AutoConnect: true,
            ss: LgmConfig.MH_SERVER,
            StartVideoMuted: false,
            HoveringMouse: false,
            WaitForStreamer: true
        }}
    />;
});