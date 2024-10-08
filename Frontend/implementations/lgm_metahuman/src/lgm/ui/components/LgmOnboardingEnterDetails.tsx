import { observer } from 'mobx-react-lite';
import { Button, TextField, Typography } from '@mui/material';
import { LgmRole } from '../../client/LgmData';
import { LgmStore } from '../../stores/LgmStore';
import React, { CSSProperties } from 'react';

export const LgmOnboardingEnterDetails = observer((props: { onLgmStore: (store: LgmStore) => any }) => {
    const [role, setRole] = React.useState<LgmRole | undefined>(undefined);
    const [name, setName] = React.useState<string | undefined>('');
    const [sessionSecret, setSessionSecret] = React.useState<string | undefined>('');
    const [contextInfo, setContextInfo] = React.useState<string | undefined>('');

    return <div style={{ maxHeight: '80vh', ...ContainerStyle }}>
        <div style={InnerContainerStyle}>
            <Typography variant={'h6'}>
                Select your role
            </Typography>
            <div style={FlexRowStyle}>
                <Button variant={role === LgmRole.instructor ? 'contained' : 'outlined'} color={'secondary'}
                        onClick={() => setRole(LgmRole.instructor)}>
                    Instructor
                </Button>
                <Button variant={role === LgmRole.student ? 'contained' : 'outlined'} color={'secondary'}
                        onClick={() => setRole(LgmRole.student)}>
                    Student
                </Button>
                <Button variant={role === LgmRole.supervisor ? 'contained' : 'outlined'} color={'secondary'}
                        onClick={() => setRole(LgmRole.supervisor)}>
                    Supervisor
                </Button>
            </div>
        </div>

        <div style={InnerContainerStyle}>
            <Typography variant={'h6'}>
                Enter session details
            </Typography>
            <TextField
                label={'Session password'}
                placeholder={'Must be shared with others to join.'}
                value={sessionSecret}
                onChange={(e) => setSessionSecret(e.target.value)}
                {...DisableAutocomplete} />
            <TextField
                label={'Your name'}
                value={name}
                placeholder={'Your name will be visible to others.'}
                onChange={(e) => setName(e.target.value)}
                {...DisableAutocomplete} />
            <TextField
                disabled={role !== LgmRole.instructor}
                style={{
                    transition: 'all 0.3s',
                    opacity: role === LgmRole.instructor ? 1 : 0,
                    height: role === LgmRole.instructor ? '56px' : 0
                }}
                label={'Session context'}
                multiline={true}
                placeholder={'Enter short description for this session.'}
                value={contextInfo}
                onChange={(e) => setContextInfo(e.target.value)}
                {...DisableAutocomplete} />
        </div>

        <Button
            variant={'contained'}
            color={'primary'}
            disabled={!sessionSecret?.length || !name?.length || role === undefined}
            onClick={() => {
                const store = new LgmStore(role!, name!, sessionSecret!, contextInfo);
                props.onLgmStore(store);
            }}>
            {role === LgmRole.instructor ? 'Create or join' : 'Join'} session
        </Button>
    </div>;
});

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
    borderRadius: '8px',
    overflow: 'hidden'
};

const FlexRowStyle: CSSProperties = {
    display: 'flex',
    gap: '8px'
};

const InputStyle: CSSProperties = {
    marginBottom: '8px',
    padding: '4px 8px',
    fontSize: '14px',
    width: '300px'
};

const IpTextStyle: CSSProperties = {
    fontWeight: 'bold',
    fontSize: 14
};

const DisableAutocomplete = {
    inputProps: {
        autocomplete: 'off',
        form: {
            autocomplete: 'off'
        }
    }
};