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
    const [serverAddress, setServerAddress] = useState('');

    // Function to handle the change in server address input
    const handleServerAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        LgmConfig.set(event.target.value);
        setServerAddress(event.target.value);
    };

    return (
        <div style={ContainerStyle}>
            {/* Server address input field */}
            <input
                type="text"
                placeholder="Enter server address (e.g. 192.168.1.245)"
                value={serverAddress}
                onChange={handleServerAddressChange}
                style={InputStyle}
            />
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
