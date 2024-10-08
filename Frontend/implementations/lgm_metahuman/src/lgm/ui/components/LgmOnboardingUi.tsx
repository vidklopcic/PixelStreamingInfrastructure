import { observer } from 'mobx-react-lite';
import React, { CSSProperties } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material';
import { LgmStore } from '../../stores/LgmStore';
import { LgmOnboardingEnterDetails } from './LgmOnboardingEnterDetails';
import { DoneAll, Warning } from '@mui/icons-material';

interface LgmRolePickerProps {
    onLgmStore: (role: LgmStore) => void;
}

export const LgmOnboardingUi = observer((props: LgmRolePickerProps) => {
    const [lgmStore, setLgmStore] = React.useState<LgmStore | undefined>(undefined);
    const readyToJoin = lgmStore?.isConnected && lgmStore?.hasSession;

    if (!lgmStore) {
        return <LgmOnboardingEnterDetails onLgmStore={(store) => setLgmStore(store)} />;
    } else {
        return <div style={ContainerStyle}>
            <div style={InnerContainerStyle}>
                <PendingItem done={lgmStore?.isConnected}>
                    connecting to server
                </PendingItem>
                <PendingItem error={lgmStore.streamRejected} done={lgmStore?.hasStream}>
                    camera and microphone access
                </PendingItem>
                <PendingItem error={['session-not-found', 'session-exists'].includes(lgmStore.errorCode)}
                             done={lgmStore?.hasSession}>
                    session
                </PendingItem>
            </div>
            <Button
                variant={'contained'}
                onClick={() => {
                    if (readyToJoin) {
                        lgmStore.join();
                        props.onLgmStore(lgmStore);
                    } else {
                        lgmStore.dispose();
                        setLgmStore(undefined);
                    }
                }}
            >
                {!readyToJoin && 'CANCEL'}
                {readyToJoin && 'JOIN'}
            </Button>
        </div>;
    }
});

const PendingItem = (props: { done: boolean, error?: boolean, children?: any }) => {
    return <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    }}>
        <div style={{ width: '32px', height: '32px', display: 'flex', justifyItems: 'center', alignItems: 'center' }}>
            {!props.done && !props.error && <CircularProgress color={'secondary'} size={16} />}
            {!props.error && props.done && <DoneAll />}
            {props.error && !props.done && <Warning color={'error'} />}
        </div>
        <Typography variant={'h6'}>
            {props.children}
        </Typography>
    </div>;
};

const ContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'stretch',
    justifyContent: 'start',
    overflow: 'auto'
};

const InnerContainerStyle: CSSProperties = {
    ...ContainerStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '16px',
    borderRadius: '8px'
};