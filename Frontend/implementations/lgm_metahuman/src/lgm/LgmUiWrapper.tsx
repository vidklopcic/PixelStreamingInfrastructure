import { observer } from 'mobx-react-lite';
import { LgmStore, LgmStoreContext } from './stores/LgmStore';
import { LgmRole } from './client/LgmData';
import React, { CSSProperties, useState } from 'react';
import { LgmOnboardingUi } from './ui/components/LgmOnboardingUi';
import { LgmInstructorUi } from './ui/LgmInstructorUi';
import { LgmStudentUi } from './ui/LgmStudentUi';
import { LgmSupervisorUi } from './ui/LgmSupervisorUi';
import { Dialog, Fab, Typography } from '@mui/material';
import { Refresh } from '@mui/icons-material';

export const LgmUiWrapper = observer(() => {
    const [lgmStore, setLgmStore] = useState<LgmStore | undefined>(undefined);

    return <LgmStoreContext.Provider value={lgmStore}>
        <div style={ComponentStyle}>
            {!lgmStore && <LgmOnboardingUi onLgmStore={(store) => setLgmStore(store)} />}
            {lgmStore?.user.role === LgmRole.instructor && <LgmInstructorUi />}
            {lgmStore?.user.role === LgmRole.student && <LgmStudentUi />}
            {lgmStore?.user.role === LgmRole.supervisor && <LgmSupervisorUi />}
        </div>
        <Dialog sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }} open={lgmStore?.sessionEnded}
                onClose={() => {
                }}>
            <div style={{
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography variant={'h4'}>Session has ended</Typography>
                <p>Session has ended. You can now close this window.</p>
                <Fab
                    style={{
                        marginTop: 32,
                        display: 'flex',
                        gap: 8
                    }}
                    variant={'extended'}
                    onClick={() => {
                        window.location.reload();
                    }}>
                    <Refresh/> START NEW SESSION
                </Fab>
            </div>
        </Dialog>
    </LgmStoreContext.Provider>;
});

const ComponentStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
};