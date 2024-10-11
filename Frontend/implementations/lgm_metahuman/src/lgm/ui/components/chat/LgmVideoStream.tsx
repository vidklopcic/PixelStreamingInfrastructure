import { observer } from 'mobx-react-lite';
import React, { CSSProperties, useState } from 'react';
import { Fab, IconButton } from '@mui/material';
import { Close, Videocam } from '@mui/icons-material';

interface LgmVideoStreamProps {
    stream: MediaStream;
    style?: CSSProperties;
    muted?: boolean;
    canHide?: boolean;
}

export const LgmVideoStream = observer((props: LgmVideoStreamProps) => {
    const [visible, setVisible] = useState(true);
    return <div style={{
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        ...props.style,
        ...(visible ? {} : {  backgroundColor: 'transparent', pointerEvents: 'none', width: 56, height: 56})
    }}>
        <video
            key={props.stream.id}
            autoPlay
            playsInline
            muted={props.muted}
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: visible ? 1 : 0,
                transition: 'all 0.3s'
            }}
            ref={(video) => {
                if (video) {
                    video.srcObject = props.stream;
                }
            }}
        />
        {props.canHide && <IconButton style={{
            position: 'absolute',
            backgroundColor: 'white',
            transform: 'scale(0.7)',
            top: 0,
            right: 0,
            opacity: visible ? 1 : 0,
            transition: 'all 0.2s'
        }} onClick={() => setVisible(!visible)}>
            <Close />
        </IconButton>}
        <Fab
            style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                transition: 'all 0.2s',
                pointerEvents: visible ? 'none' : 'auto',
                opacity: visible ? 0 : 1,
            }}
            onClick={() => {
                setVisible(!visible);
            }}>
            <Videocam />
        </Fab>
    </div>;
});