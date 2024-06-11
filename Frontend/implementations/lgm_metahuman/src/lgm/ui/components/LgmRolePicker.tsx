import { observer } from 'mobx-react-lite';
import { LgmRole } from '../../client/LgmData';
import React, { CSSProperties } from 'react';

interface LgmRolePickerProps {
    onRoleSelected: (role: LgmRole) => void;
}

export const LgmRolePicker = observer((props: LgmRolePickerProps) => {
    return <div style={FlexRowStyle}>
        <button onClick={() => props.onRoleSelected(LgmRole.instructor)}>
            Instructor
        </button>
        <button onClick={() => props.onRoleSelected(LgmRole.student)}>
            Student
        </button>
        <button onClick={() => props.onRoleSelected(LgmRole.supervisor)}>
            Supervisor
        </button>
    </div>;
});

const FlexRowStyle: CSSProperties = {
    display: 'flex', gap: '8px'
};