import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import React, { CSSProperties } from 'react';
import { LgmRole } from '../../client/LgmData';
import { LgmConfig } from '../../LgmConfig';
import { Button, Typography } from '@mui/material';

interface LgmRolePickerProps {
    onRoleSelected: (role: LgmRole) => void;
}

export const LgmRolePicker = observer((props: LgmRolePickerProps) => {
    return (
        <div style={ContainerStyle}>
            <Typography variant={'h5'}>
                Select your role
            </Typography>
            <div style={FlexRowStyle}>
                <Button variant={'contained'} onClick={() => props.onRoleSelected(LgmRole.instructor)}>
                    Instructor
                </Button>
                <Button variant={'contained'} onClick={() => props.onRoleSelected(LgmRole.student)}>
                    Student
                </Button>
                <Button variant={'contained'} onClick={() => props.onRoleSelected(LgmRole.supervisor)}>
                    Supervisor
                </Button>
            </div>
        </div>
    );
});

const ContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center'
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