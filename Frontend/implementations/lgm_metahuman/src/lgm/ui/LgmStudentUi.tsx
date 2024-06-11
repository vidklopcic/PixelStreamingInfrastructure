import { observer } from 'mobx-react-lite';
import { CSSProperties, useContext } from 'react';
import { LgmUnreal } from './components/LgmUnreal';
import { LgmVideoStream } from './components/chat/LgmVideoStream';
import { LgmStoreContext } from '../stores/LgmStore';

export const LgmStudentUi = observer(() => {
    const store = useContext(LgmStoreContext);
    return <div style={RootStyle}>
        <LgmUnreal cover />
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