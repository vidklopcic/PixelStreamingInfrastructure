import { observer } from 'mobx-react-lite';
import { CSSProperties, useContext, useState } from 'react';
import { Badge, Dialog, IconButton } from '@mui/material';
import { Info, People } from '@mui/icons-material';
import { LgmSessionContextDialog } from './dialogs/LgmSessionContextDialog';
import { LgmSessionParticipantsDialog } from './dialogs/LgmSessionParticipantsDialog';
import { LgmStoreContext } from '../../stores/LgmStore';

export const LgmSessionInfo = observer(() => {
    const [info, setInfo] = useState(false);
    const [people, setPeople] = useState(false);
    const store = useContext(LgmStoreContext);

    return <div style={ContainerStyle}>
        <IconButton color={'secondary'} onClick={() => setInfo(true)}>
            <Info />
        </IconButton>
        <IconButton color={'secondary'} onClick={() => setPeople(true)}>
            <Badge badgeContent={store.peers.size + 1} color={'error'} style={{
                position: 'absolute',
                bottom: 12,
                right: 12
            }} />
            <People />
        </IconButton>
        <Dialog open={info} onClose={() => setInfo(false)}>
            <LgmSessionContextDialog onClose={() => setInfo(false)} />
        </Dialog>
        <Dialog open={people} onClose={() => setPeople(false)}>
            <LgmSessionParticipantsDialog onClose={() => setPeople(false)} />
        </Dialog>
    </div>;
});


const ContainerStyle: CSSProperties = {
    borderRadius: 100,
    border: '1px solid #666666',
    backgroundColor: '#3c3c3c',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'row',
    padding: '2px 2px',
    gap: 2
};