import { observer } from 'mobx-react-lite';
import { lgmStore } from './stores/LgmStore';

export const LgmUiWrapper = observer(() => {
    return <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    }}>
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: 24
        }}>
            LGM UI
            {lgmStore.client.connected ? ' (Connected)' : ' (Disconnected)'}
        </div>
    </div>
});