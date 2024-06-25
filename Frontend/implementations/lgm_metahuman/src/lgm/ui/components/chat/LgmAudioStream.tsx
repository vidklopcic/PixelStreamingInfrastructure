import { observer } from 'mobx-react-lite';
import { CSSProperties } from 'react';

interface LgmAudioStreamProps {
    stream: MediaStream;
    style?: CSSProperties;
}

export const LgmAudioStream = observer((props: LgmAudioStreamProps) => {
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
            if (audio) {
                audio.srcObject = props.stream;
            }
        }}
    />;
});