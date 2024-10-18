import { observer } from 'mobx-react-lite';
import { LgmUnreal } from './components/LgmUnreal';
import { LgmVideoStream } from './components/chat/LgmVideoStream';
import { LgmStoreContext } from '../stores/LgmStore';
import React, { CSSProperties, useContext } from 'react';
import { LgmChat } from './components/chat/LgmChat';
import { LgmStyles } from './LgmStyles';
import { LgmUeControls } from './components/LgmUeControls';
import { LgmSessionInfo } from './components/LgmSessionInfo';
import { ExitToApp, FullscreenExit, Mic, MicOff, PlayArrow, Stop, TransitEnterexit } from '@mui/icons-material';
import { Fab } from '@mui/material';

export const LgmInstructorUi = observer(() => {
    const store = useContext(LgmStoreContext);
    const peerStreams = store.webrtc.peerStreams;
    return <div style={RootStyle}>
        <div style={StreamsStyle}>
            <div style={LgmUnrealContainerStyle}>
                <LgmUnreal
                    interactive={true}
                    cover radius />
            </div>
            {!!peerStreams?.length && <LgmVideoStream
                stream={peerStreams[0]}
                style={VideoStyle}
            />}
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
            <LgmUeControls />
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

const VideoStyle: CSSProperties = {
    aspectRatio: '16 / 9',
    objectFit: 'cover',
    boxShadow: LgmStyles.shadow
};