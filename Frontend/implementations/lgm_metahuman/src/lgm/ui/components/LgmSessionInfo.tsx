import { observer } from 'mobx-react-lite';
import { CSSProperties, useContext, useEffect, useState } from 'react';
import { Badge, Dialog, IconButton, Typography } from '@mui/material';
import { Info, People } from '@mui/icons-material';
import { LgmSessionContextDialog } from './dialogs/LgmSessionContextDialog';
import { LgmSessionParticipantsDialog } from './dialogs/LgmSessionParticipantsDialog';
import { LgmStoreContext } from '../../stores/LgmStore';
import { Formatters } from '../../../utils/formatters';

export const LgmSessionInfo = observer(() => {
    const [info, setInfo] = useState(false);
    const [people, setPeople] = useState(false);
    const store = useContext(LgmStoreContext);
    const [duration, setDuration] = useState(() => {
        return store.sessionActive ? Formatters.toDuration((Date.now() - store.session.startedTimestamp) / 1000) : Formatters.toDuration(0);
    });
    useEffect(() => {
        const interval = setInterval(() => {
            if (store.sessionEnded) {
                clearInterval(interval);
                return;
            }
            if (store.session?.startedTimestamp) {
                setDuration(Formatters.toDuration((Date.now() - store.session.startedTimestamp) / 1000));
            } else {
                setDuration(Formatters.toDuration(0));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [store]);

    return <div style={ContainerStyle}>
        <Typography
            variant={'button'} style={{
            color: 'white',
            padding: '4px 8px',
            marginLeft: 4,
            borderRadius: 50,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }}>{duration}</Typography>
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
    alignItems: 'center',
    flexDirection: 'row',
    padding: '2px 2px',
    gap: 2
};