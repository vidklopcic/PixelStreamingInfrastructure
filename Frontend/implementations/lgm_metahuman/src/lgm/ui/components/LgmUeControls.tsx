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
            style={{ margin: '8px auto' }}
            onEmotionSelected={(e, i) => {
                console.log('Emotion selected:', e, i);
                store.ueControl.setEmotion(e, i);
            }}
        />

        <Typography style={{ marginTop: 8 }} variant={'subtitle1'}>Game</Typography>
        <div style={ControlsGroupContainerStyle}>
            <Button variant={'contained'} onClick={() => store.ueControl.setLevel(0)}>RESET ALL</Button>
        </div>

        <Typography style={{ marginTop: 8 }} variant={'subtitle1'}>Environment</Typography>
        <div style={ControlsGroupContainerStyle}>
            <Button variant={'contained'} onClick={() => store.ueControl.setLevel(0)}>LIVING ROOM</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setLevel(1)}>FI ROOM</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setLevel(2)}>OFFICE</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setLevel(3)}>CLASSROOM</Button>
        </div>

        <Typography style={{ marginTop: 8 }} variant={'subtitle1'}>Idle animation</Typography>
        <div style={ControlsGroupContainerStyle}>
            <Button variant={'contained'} onClick={() => store.ueControl.setIdleAnimation(0)}>RESTING</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setIdleAnimation(1)}>UNEASY</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setIdleAnimation(2)}>EXPLAINING</Button>
        </div>

        <Typography style={{ marginTop: 8 }} variant={'subtitle1'}>Actions</Typography>
        <div style={ControlsGroupContainerStyle}>
            <Button variant={'contained'} onClick={() => store.ueControl.setUpperBodyAnimation('cry')}>CRY</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setUpperBodyAnimation('cut')}>CUT</Button>
            <Button variant={'contained'}
                    onClick={() => store.ueControl.setUpperBodyAnimation('scratch')}>SCRATCH</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setUpperBodyAnimation('slap')}>SLAP</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setUpperBodyAnimation('yawn')}>YAWN</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setFullBodyAnimation('walk')}>WALK</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.cancelUpperBodyAnimation()}>CANCEL UPPER
                BODY</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.cancelFullBodyAnimation()}>CANCEL FULL
                BODY</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.resetAllAnimation()}>RESET ANIMATIONS</Button>
        </div>

        <Typography style={{ marginTop: 8 }} variant={'subtitle1'}>Character</Typography>
        <div style={ControlsGroupContainerStyle}>
            {
                Array.from({ length: 9 }, (_, i) => i).map(i => {
                    return <Button variant={'contained'} onClick={() => store.ueControl.setChild(i)}>{i}</Button>;
                })
            }
        </div>
        <Typography style={{ marginTop: 8 }} variant={'subtitle1'}>Camera</Typography>
        <div style={ControlsGroupContainerStyle}>
            <Button variant={'contained'} onClick={() => store.ueControl.setCamera(0)}>CLOSEUP</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setCamera(1)}>WAIST-UP</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setCamera(2)}>FULL BODY</Button>
            <Button variant={'contained'} onClick={() => store.ueControl.setCamera(3)}>SCENE</Button>
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