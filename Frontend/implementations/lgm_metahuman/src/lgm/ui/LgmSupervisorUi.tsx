import { observer } from 'mobx-react-lite';
import { LgmUnreal } from './components/LgmUnreal';
import { LgmVideoStream } from './components/chat/LgmVideoStream';
import { LgmStoreContext } from '../stores/LgmStore';
import React, { CSSProperties, useContext } from 'react';
import { LgmChat } from './components/chat/LgmChat';
import { LgmStyles } from './LgmStyles';
import { LgmUeControls } from './components/LgmUeControls';
import { LgmAudioStream } from './components/chat/LgmAudioStream';
import { LgmSessionInfo } from './components/LgmSessionInfo';

export const LgmSupervisorUi = observer(() => {
    const store = useContext(LgmStoreContext);
    const peerStreams = store.webrtc.peerStreams;
    const peerAudioStreams = store.webrtc.peerAudioStreams;
    return <div style={RootStyle}>
        <div style={StreamsStyle}>
            <div style={LgmUnrealContainerStyle}>
                <LgmUnreal cover radius />
            </div>
            {!!peerStreams?.length && <LgmVideoStream
                stream={peerStreams[0]}
                style={VideoStyle}
            />}
            {!!peerAudioStreams?.length && peerAudioStreams.map((s) => <LgmAudioStream stream={s} />)}
        </div>
        <div style={ChatContainerStyle}>
            <LgmChat />
        </div>
        <div style={{
            position: 'absolute',
            top: 8,
            left: 0,
            right: 400,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <LgmSessionInfo />
        </div>
    </div>;
});

const RootStyle: CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    padding: 16,
    gap: 16
};

const ChatContainerStyle: CSSProperties = {
    display: 'flex',
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: 400
};

const StreamsStyle: CSSProperties = {
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: '82vh',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'center',
    margin: 'auto'
};

const LgmUnrealContainerStyle: CSSProperties = {
    aspectRatio: '16 / 9'
};

const VideoStyle: CSSProperties = {
    aspectRatio: '16 / 9',
    objectFit: 'cover',
    boxShadow: LgmStyles.shadow
};