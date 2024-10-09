import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { LgmStoreContext } from '../../stores/LgmStore';
import { LgmConfig } from '../../LgmConfig';
import { PixelStreamingWrapper } from '../../../components/PixelStreamingWrapper';

interface LgmUnrealProps {
    interactive?: boolean;
    cover?: boolean;
    radius?: boolean;
}

export const LgmUnreal = observer((props: LgmUnrealProps) => {
    const store = useContext(LgmStoreContext);
    if (!store || !store.hasSession) {
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
            HoveringMouse: false,
            WaitForStreamer: true
        }}
        onStreamingCreated={(streaming) => {
            store.pixelStreaming = streaming;

            const handlePixelStramingResponse = (response: string) :void => {
                console.log('Pixel streaming response:', response);
            }
            store.pixelStreaming.addResponseEventListener("handle_responses", handlePixelStramingResponse);
        }}
        onConneced={(connected) => {
            store.pixelStreamingConnected = connected;
        }}
    />;
});