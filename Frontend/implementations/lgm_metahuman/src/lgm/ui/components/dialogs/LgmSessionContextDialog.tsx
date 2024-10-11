import { observer } from 'mobx-react-lite';
import { LgmDialog } from './LgmDialog';
import { LgmStoreContext } from '../../../stores/LgmStore';
import { useContext } from 'react';

export const LgmSessionContextDialog = observer(({ onClose }: { onClose: () => any }) => {
    const store = useContext(LgmStoreContext);
    return <LgmDialog onClose={() => onClose()} title={'Session information'}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
            flexBasis: 0,
            padding: 16,
        }}>
            {store.session?.contextText}
        </div>
    </LgmDialog>;
});