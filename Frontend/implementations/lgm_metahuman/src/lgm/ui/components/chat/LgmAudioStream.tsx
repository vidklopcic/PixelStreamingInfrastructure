import { observer } from 'mobx-react-lite';
import { CSSProperties, useContext, useEffect, useMemo, useRef } from 'react';
import { LgmStoreContext } from '../../../stores/LgmStore';
import { audioNormalizer } from '../../../stores/LgmAudioNormalizer';

interface LgmAudioStreamProps {
    stream: MediaStream;
    style?: CSSProperties;
}

export const LgmAudioStream = observer((props: LgmAudioStreamProps) => {
    const store = useContext(LgmStoreContext);
    const speakerId = store.webrtc.speakerDeviceId;
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Route through the in-browser loudness normalizer (server-side AGC is
    // disabled); play the normalized stream instead of the raw one.
    const normalizedStream = useMemo(() => audioNormalizer.attach(props.stream), [props.stream]);
    useEffect(() => () => audioNormalizer.detach(props.stream), [props.stream]);

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
                audio.srcObject = normalizedStream;
            }
        }}
    />;
});
