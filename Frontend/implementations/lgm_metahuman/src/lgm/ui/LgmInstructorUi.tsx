import { observer } from 'mobx-react-lite';
import { LgmUnreal } from './components/LgmUnreal';
import { LgmVideoStream } from './components/chat/LgmVideoStream';
import { LgmAudioStream } from './components/chat/LgmAudioStream';
import { LgmStoreContext } from '../stores/LgmStore';
import React, { CSSProperties, useContext } from 'react';
import { LgmChat } from './components/chat/LgmChat';
import { LgmStyles } from './LgmStyles';
import { LgmUeControls } from './components/LgmUeControls';
import { LgmSessionInfo } from './components/LgmSessionInfo';
import { ExitToApp, FiberManualRecord, FullscreenExit, Mic, MicOff, PlayArrow, Stop, StopCircle, TransitEnterexit } from '@mui/icons-material';
import { Fab } from '@mui/material';

export const LgmInstructorUi = observer(() => {
    const store = useContext(LgmStoreContext);
    const peerStreams = store.webrtc.peerStreams;
    const peerAudioStreams = store.webrtc.peerAudioStreams;
    return <div style={RootStyle}>
        {!!peerAudioStreams?.length && peerAudioStreams.map((s, i) => <LgmAudioStream key={i} stream={s} />)}
        <div style={StreamsStyle}>
            <div style={LgmUnrealContainerStyle}>
                <LgmUnreal
                    interactive={true}
                    cover radius />
            </div>
            {!!peerStreams?.length && <div style={VideoGridStyle}>
                {peerStreams.map((s) => <LgmVideoStream
                    key={s.id}
                    stream={s}
                    style={VideoStyle}
                />)}
            </div>}
            <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <LgmSessionInfo />
            </div>
            <Fab
                style={{
                    position: 'absolute',
                    bottom: 16,
                    alignSelf: 'center',
                    height: 56,
                    borderRadius: 28,
                    display: 'flex',
                    gap: 8
                }}
                disabled={store.sessionEnded || !store.hasSession}
                variant={'extended'}
                onClick={() => {
                    if (store.sessionActive) {
                        store.endSession();
                    } else {
                        store.startSession();
                    }
                }}>
                {!store.sessionActive && <><PlayArrow />START SESSION</>}
                {store.sessionActive && <><Stop />END SESSION</>}
            </Fab>
            <Fab
                style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 80
                }}
                color={store.recording ? 'error' : 'default'}
                disabled={!store.sessionActive}
                onClick={() => {
                    if (store.recording) {
                        store.stopRecording();
                    } else {
                        store.startRecording();
                    }
                }}>
                {!store.recording && <FiberManualRecord />}
                {store.recording && <StopCircle />}
            </Fab>
            <Fab
                style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16
                }}
                onClick={() => {
                    store.webrtc.muted = !store.webrtc.muted;
                }}>
                {!store.webrtc.muted && <Mic />}
                {store.webrtc.muted && <MicOff />}
            </Fab>
        </div>
        <div style={SideUiContainerStyle} className={'mobile-column desktop-row'}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flexGrow: 1, flexBasis: 0, minWidth: 0 }}>
                <LgmUeControls />
            </div>
            <LgmChat />
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

const SideUiContainerStyle: CSSProperties = {
    display: 'flex',
    gap: 16,
    flexGrow: 1,
    width: 0
};

const StreamsStyle: CSSProperties = {
    position: 'relative',
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: '82vh',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'center'
};

const LgmUnrealContainerStyle: CSSProperties = {
    aspectRatio: '16 / 9'
};

const VideoGridStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center'
};

const VideoStyle: CSSProperties = {
    aspectRatio: '16 / 9',
    objectFit: 'cover',
    boxShadow: LgmStyles.shadow,
    flex: '0 0 calc(50% - 4px)',
    maxWidth: 'calc(50% - 4px)'
};