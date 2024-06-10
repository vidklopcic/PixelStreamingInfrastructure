import { observer } from 'mobx-react-lite';
import { LgmStore } from './stores/LgmStore';
import { LgmRole } from './client/LgmData';
import React, { useState } from 'react';

export const LgmUiWrapper = observer(() => {
    const [lgmStore, setLgmStore] = useState<LgmStore | undefined>(undefined);

    return <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    }}>
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: 24,
            gap: '16px'
        }}>
            LGM UI {lgmStore && `(${lgmStore.user.role})`}
            {/*{lgmStore && <PixelStreamingWrapper*/}
            {/*    initialSettings={{*/}
            {/*        AutoPlayVideo: true,*/}
            {/*        GamepadInput: false,*/}
            {/*        KeyboardInput: false,*/}
            {/*        MouseInput: false,*/}
            {/*        TouchInput: false,*/}
            {/*        StreamerAutoJoinInterval: 5000,*/}
            {/*        AutoConnect: true,*/}
            {/*        ss: `wss://${LgmConfig.HOST}`,*/}
            {/*        StartVideoMuted: false,*/}
            {/*        HoveringMouse: false,*/}
            {/*        WaitForStreamer: true*/}
            {/*    }}*/}
            {/*/>}*/}
            {!lgmStore && <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setLgmStore(new LgmStore(LgmRole.instructor))}>
                    Become Instructor
                </button>
                <button onClick={() => setLgmStore(new LgmStore(LgmRole.student))}>
                    Become Student
                </button>
                <button onClick={() => setLgmStore(new LgmStore(LgmRole.supervisor))}>
                    Become Supervisor
                </button>
            </div>}
        </div>
    </div>;
});