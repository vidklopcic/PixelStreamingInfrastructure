import { observer } from 'mobx-react-lite';
import React, { CSSProperties, useContext } from 'react';
import { LgmUnreal } from './components/LgmUnreal';
import { LgmVideoStream } from './components/chat/LgmVideoStream';
import { LgmStoreContext } from '../stores/LgmStore';
import { LgmAudioStream } from './components/chat/LgmAudioStream';
import { LgmChat } from './components/chat/LgmChat';
import { Badge, Fab } from '@mui/material';
import { Chat, ChevronLeft } from '@mui/icons-material';
import { LgmSessionInfo } from './components/LgmSessionInfo';

export const LgmStudentUi = observer(() => {
    const store = useContext(LgmStoreContext);
    const peerAudioStreams = store.webrtc.peerAudioStreams;
    const [chat, setChat] = React.useState(false);
    const [lastChatCount, setLastChatCount] = React.useState(0);
    return <div style={RootStyle}>
        <div style={UnrealStyle(chat)}>
            <LgmUnreal cover />
            <div style={{
                position: 'absolute',
                top: 8,
                left: 0,
                right: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <LgmSessionInfo />
            </div>
        </div>
        {!!peerAudioStreams?.length && peerAudioStreams.map((s) => <LgmAudioStream stream={s} />)}
        {store.webrtc.localStream && <LgmVideoStream
            stream={store.webrtc.localStream}
            style={VideoStyle(chat)}
            muted={true} />}
        <div style={ChatContainerStyle(chat)}>
            <LgmChat />
        </div>
        <Fab
            style={{
                position: 'absolute',
                bottom: chat ? 'calc(100vh / 2 - 28px)' : 16,
                left: chat ? (412 - 28) : 16,
                transition: 'all 0.3s'
            }}
            onClick={() => {
                if (!chat) {
                    setLastChatCount(store.chat.messages.length);
                }
                setChat(!chat);
            }}>
            {!chat && <Chat />}
            {chat && <ChevronLeft />}
            <Badge badgeContent={chat ? 0 : (store.chat.messages.length - lastChatCount)} color={'error'}
                   style={{ transform: 'translate(0, 8px)' }} />
        </Fab>
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

const UnrealStyle = (chat: boolean): CSSProperties => ({
    position: 'absolute',
    left: chat ? 416 : 0,
    right: chat ? 8 : 0,
    bottom: chat ? 8 : 0,
    top: chat ? 8 : 0,
    borderRadius: chat ? 8 : 0,
    overflow: 'hidden',
    transition: 'all 0.3s'
});

const VideoStyle = (chat: boolean): CSSProperties => ({
    position: 'absolute',
    bottom: 16 + (chat ? 8 : 0),
    right: 16 + (chat ? 8 : 0),
    backgroundColor: 'gray',
    width: 240,
    height: 180,
    transition: 'all 0.3s'
});

const ChatContainerStyle = (chat: boolean): CSSProperties => ({
    position: 'absolute',
    display: 'flex',
    top: 8,
    left: 8 - (chat ? 0 : 408),
    bottom: 8,
    width: 400,
    transition: 'all 0.3s'
});