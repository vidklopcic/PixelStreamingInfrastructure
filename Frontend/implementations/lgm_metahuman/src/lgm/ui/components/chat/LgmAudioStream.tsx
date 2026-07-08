import { observer } from 'mobx-react-lite';
import { CSSProperties, useContext, useEffect, useRef } from 'react';
import { LgmStoreContext } from '../../../stores/LgmStore';

interface LgmAudioStreamProps {
    stream: MediaStream;
    style?: CSSProperties;
}

export const LgmAudioStream = observer((props: LgmAudioStreamProps) => {
    const store = useContext(LgmStoreContext);
    const speakerId = store.webrtc.speakerDeviceId;
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = audioRef.current as (HTMLAudioElement & { setSinkId?: (id: string) => Promise<void> }) | null;
        audio?.setSinkId?.(speakerId).catch(() => undefined);
    }, [speakerId, props.stream]);

    return <audio
        key={props.stream.id}
        autoPlay
        playsInline
        style={{
            opacity: 0,
            pointerEvents: 'none',
            position: 'fixed',
            top: -100,
        }}
        ref={(audio) => {
            audioRef.current = audio;
            if (audio) {
                audio.srcObject = props.stream;
            }
        }}
    />;
});
