import { observer } from 'mobx-react-lite';
import { LgmUnreal } from './components/LgmUnreal';
import { LgmVideoStream } from './components/chat/LgmVideoStream';
import { LgmStoreContext } from '../stores/LgmStore';
import { CSSProperties, useContext } from 'react';

export const LgmInstructorUi = observer(() => {
    const store = useContext(LgmStoreContext);
    const peerStreams = store.webrtc.peerStreams;
    return <div style={RootStyle}>
        <div style={StreamsStyle}>
            <div style={LgmUnrealContainerStyle}>
                <LgmUnreal interactive={true} cover radius />
            </div>
            {peerStreams?.length && <LgmVideoStream
                stream={peerStreams[0]}
                style={VideoStyle}
            />}
        </div>
    </div>;
});

const RootStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
};

const StreamsStyle: CSSProperties = {
    width: '50%',
    maxWidth: '82vh',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'center',
};

const LgmUnrealContainerStyle: CSSProperties = {
    aspectRatio: '16 / 9'
};

const VideoStyle: CSSProperties = {
    aspectRatio: '16 / 9',
    objectFit: 'cover'
};