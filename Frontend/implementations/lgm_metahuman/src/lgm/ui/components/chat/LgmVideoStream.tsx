import { observer } from 'mobx-react-lite';
import { CSSProperties } from 'react';

interface LgmVideoStreamProps {
    stream: MediaStream;
    style?: CSSProperties;
}

export const LgmVideoStream = observer((props: LgmVideoStreamProps) => {
    return <div style={{
        borderRadius: '16px',
        overflow: 'hidden',
        ...props.style
    }}>
        <video
            key={props.stream.id}
            autoPlay
            playsInline
            style={{
                width: '100%',
                height: '100%'
            }}
            ref={(video) => video.srcObject = props.stream}
        />
    </div>;
});