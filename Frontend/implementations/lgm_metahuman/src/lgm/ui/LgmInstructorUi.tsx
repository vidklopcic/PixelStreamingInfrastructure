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
import { LgmDeviceSettings } from './components/LgmDeviceSettings';
import { LgmRecordingsMenu } from './components/LgmRecordingsMenu';
import { LgmConnectionBanner } from './components/LgmConnectionBanner';
import { LgmSpeakingIndicator } from './components/LgmSpeakingIndicator';
import { ExitToApp, FiberManualRecord, FullscreenExit, Mic, MicOff, PlayArrow, Stop, StopCircle, TransitEnterexit } from '@mui/icons-material';
import { Fab } from '@mui/material';

export const LgmInstructorUi = observer(() => {
    const store = useContext(LgmStoreContext);
    const peerStreams = store.webrtc.peerStreams;
    const peerAudioStreams = store.webrtc.peerAudioStreams;
    return <div style={RootStyle}>
        <LgmConnectionBanner />
        {!!peerAudioStreams?.length && peerAudioStreams.map((s, i) => <LgmAudioStream key={i} stream={s} />)}
        <div style={StreamsStyle}>
            <div style={{
                ...VideoGridStyle,
                gridTemplateColumns: (1 + (peerStreams?.length || 0)) >= 3 ? '1fr 1fr' : '1fr'
            }}>
                <div style={VideoTileStyle}>
                    <LgmUnreal
                        interactive={true}
                        cover radius />
                </div>
                {store.webrtc.peerMedia.filter((p) => p.video).map((p) => <LgmVideoStream
                    key={p.video!.id}
                    stream={p.video!}
                    style={VideoTileStyle}
                    overlay={<LgmSpeakingIndicator stream={p.audio} />}
                />)}
            </div>
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
            <LgmRecordingsMenu fabStyle={{ position: 'absolute', top: 8, left: 8, zIndex: 5 }} />
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
            <div
                style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8
                }}>
                <LgmDeviceSettings />
                <Fab
                    onClick={() => {
                        store.webrtc.muted = !store.webrtc.muted;
                    }}>
                    {!store.webrtc.muted && <Mic />}
                    {store.webrtc.muted && <MicOff />}
                </Fab>
            </div>
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
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'center'
};

const VideoGridStyle: CSSProperties = {
    display: 'grid',
    gap: 8,
};

const VideoTileStyle: CSSProperties = {
    aspectRatio: '16 / 9',
    objectFit: 'cover',
    boxShadow: LgmStyles.shadow,
    borderRadius: 16,
    overflow: 'hidden',
    minWidth: 0
};