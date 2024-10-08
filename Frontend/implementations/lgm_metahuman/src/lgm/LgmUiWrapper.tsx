import { observer } from 'mobx-react-lite';
import { LgmStore, LgmStoreContext } from './stores/LgmStore';
import { LgmRole } from './client/LgmData';
import React, { CSSProperties, useState } from 'react';
import { LgmOnboardingUi } from './ui/components/LgmOnboardingUi';
import { LgmInstructorUi } from './ui/LgmInstructorUi';
import { LgmStudentUi } from './ui/LgmStudentUi';
import { LgmSupervisorUi } from './ui/LgmSupervisorUi';

export const LgmUiWrapper = observer(() => {
    const [lgmStore, setLgmStore] = useState<LgmStore | undefined>(undefined);

    return <LgmStoreContext.Provider value={lgmStore}>
        <div style={ComponentStyle}>
            {!lgmStore && <LgmOnboardingUi onLgmStore={(store) => setLgmStore(store)} />}
            {lgmStore?.user.role === LgmRole.instructor && <LgmInstructorUi />}
            {lgmStore?.user.role === LgmRole.student && <LgmStudentUi />}
            {lgmStore?.user.role === LgmRole.supervisor && <LgmSupervisorUi />}
        </div>
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