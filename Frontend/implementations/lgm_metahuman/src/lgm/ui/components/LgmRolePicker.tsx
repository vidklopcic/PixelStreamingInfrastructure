import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import React, { CSSProperties } from 'react';
import { LgmRole } from '../../client/LgmData';
import { LgmConfig } from '../../LgmConfig';

interface LgmRolePickerProps {
    onRoleSelected: (role: LgmRole) => void;
}

export const LgmRolePicker = observer((props: LgmRolePickerProps) => {
    // State to store the server address
    const [serverAddress, setServerAddress] = useState(() => {
        if (window.location.hash?.length) {
            const value = window.location.hash.substring(1);
            history.replaceState(null, null, ' ');
            LgmConfig.set(value);
            return value;
        }
    });

    // Function to handle the change in server address input
    const handleServerAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        LgmConfig.set(event.target.value);
        setServerAddress(event.target.value);
    };

    return (
        <div style={ContainerStyle}>
            {/* Server address input field */}
            <span style={IpTextStyle}>
                {!!serverAddress && serverAddress}
                {!serverAddress && 'Server address is not set!'}
            </span>
            {/* Buttons for role selection */}
            <div style={FlexRowStyle}>
                <button
                    onClick={() => props.onRoleSelected(LgmRole.instructor)}
                    disabled={!serverAddress}
                >
                    Instructor
                </button>
                <button
                    onClick={() => props.onRoleSelected(LgmRole.student)}
                    disabled={!serverAddress}
                >
                    Student
                </button>
                <button
                    onClick={() => props.onRoleSelected(LgmRole.supervisor)}
                    disabled={!serverAddress}
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