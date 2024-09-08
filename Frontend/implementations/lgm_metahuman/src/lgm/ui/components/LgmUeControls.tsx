import { observer } from 'mobx-react-lite';
import { LgmStoreContext } from '../../stores/LgmStore';
import { CSSProperties, useContext } from 'react';
import { Button, Typography } from '@mui/material';
import { LgmEmotionWheel } from './controls/LgmEmotionWheel';

export const LgmUeControls = observer(() => {
    const store = useContext(LgmStoreContext);

    return <div style={RootStyle}>
        <div style={HeaderStyle}>Controls</div>
        <LgmEmotionWheel
            size={300}
            style={{margin: '8px auto'}}
            onEmotionSelected={(e, i) => {
                console.log('Emotion selected:', e, i);
                store.ueControl.setEmotion(e, i);
            }}
        />
        <Typography style={{marginTop: 8}} variant={'subtitle1'}>Level control</Typography>
        <div style={ControlsGroupContainerStyle}>
            <Button variant={'contained'} onClick={() => store.ueControl.setLevel(0)}>DNEVNA SOBA</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setLevel(1)}>OTROŠKA SOBA</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setLevel(2)}>PISARNA</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setLevel(3)}>UČILNICA</Button>
        </div>
        <Typography style={{marginTop: 8}} variant={'subtitle1'}>Child control</Typography>
        <div style={ControlsGroupContainerStyle}>
            {
                Array.from({ length: 9 }, (_, i) => i).map(i => {
                    return <Button variant={'contained'} onClick={() => store.ueControl.setChild(i)}>{i}</Button>;
                })
            }
        </div>

    </div>;
});

const RootStyle: CSSProperties = {
    borderRadius: 16,
    border: '1px solid #3c3c3c',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: 0,
    padding: 8
};

const HeaderStyle: CSSProperties = {
    height: 54,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20
};

const ControlsGroupContainerStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8
};