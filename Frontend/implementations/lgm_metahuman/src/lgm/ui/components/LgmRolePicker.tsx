import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import React, { CSSProperties } from 'react';
import { LgmRole } from '../../client/LgmData';
import { LgmConfig } from '../../LgmConfig';

interface LgmRolePickerProps {
    onRoleSelected: (role: LgmRole) => void;
}

export const LgmRolePicker = observer((props: LgmRolePickerProps) => {
    return (
        <div style={ContainerStyle}>
            {/* Buttons for role selection */}
            <div style={FlexRowStyle}>
                <button
                    onClick={() => props.onRoleSelected(LgmRole.instructor)}
                >
                    Instructor
                </button>
                <button
                    onClick={() => props.onRoleSelected(LgmRole.student)}
                >
                    Student
                </button>
                <button
                    onClick={() => props.onRoleSelected(LgmRole.supervisor)}
                >
                    Supervisor
                </button>
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