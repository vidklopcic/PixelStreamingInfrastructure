import { observer } from 'mobx-react-lite';
import React, { CSSProperties, useContext } from 'react';
import { LgmUnreal } from './components/LgmUnreal';
import { LgmVideoStream } from './components/chat/LgmVideoStream';
import { LgmStoreContext } from '../stores/LgmStore';
import { LgmAudioStream } from './components/chat/LgmAudioStream';

export const LgmStudentUi = observer(() => {
    const store = useContext(LgmStoreContext);
    const peerAudioStreams = store.webrtc.peerAudioStreams;
    return <div style={RootStyle}>
        <LgmUnreal cover />
        {!!peerAudioStreams?.length && peerAudioStreams.map((s) => <LgmAudioStream stream={s} />)}
        {store.webrtc.localStream && <LgmVideoStream
            stream={store.webrtc.localStream}
            style={VideoStyle}
            muted={true} />}
    </div>;
});

const RootStyle: CSSProperties = {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    display: 'flex'
};

const VideoStyle: CSSProperties = {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'gray',
    width: 240,
    height: 180
};