import { observer } from 'mobx-react-lite';
import { LgmStoreContext } from '../../stores/LgmStore';
import { CSSProperties, useContext } from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import { LgmEmotionWheel } from './controls/LgmEmotionWheel';
import { Refresh } from '@mui/icons-material';

const characterNames: [number, string, string, string][] = [
    [0, 'A', 'M', '15'],
    [1, 'B', 'M', '15'],
    [6, 'C', 'M', '16'],
    [7, 'D', 'M', '17'],
    [8, 'E', 'M', '16'],
    [9, 'F', 'M', '9'],
    [2, 'G', 'F', '14'],
    [3, 'H', 'F', '15'],
    [4, 'I', 'F', '13'],
    [5, 'J', 'F', '13'],
    [10, 'K', 'F', '9']
];

export const LgmUeControls = observer(() => {
    const store = useContext(LgmStoreContext);

    return <div style={RootStyle}>
        <div style={HeaderStyle}>
            Controls
            <IconButton color={'secondary'} style={{ position: 'absolute', right: 8 }}
                        onClick={() => store.ueControl.resetAllAnimation()}>
                <Refresh />
            </IconButton>
        </div>
        <LgmEmotionWheel
            size={300}
            style={{ margin: '8px auto' }}
            onEmotionSelected={(e, i) => {
                console.log('Emotion selected:', e, i);
                store.ueControl.setEmotion(e, i);
            }}
        />
        <Typography style={{ marginTop: 8 }} variant={'subtitle1'}>Idle animation</Typography>
        <div style={ControlsGroupContainerStyle}>
            <Button color={store.ueControl.state.child.idle === 0 ? 'secondary' : undefined} variant={'contained'}
                    onClick={() => store.ueControl.setIdleAnimation(0)}>RESTING</Button>
            <Button color={store.ueControl.state.child.idle === 1 ? 'secondary' : undefined} variant={'contained'}
                    onClick={() => store.ueControl.setIdleAnimation(1)}>UNEASY</Button>
            <Button color={store.ueControl.state.child.idle === 2 ? 'secondary' : undefined} variant={'contained'}
                    onClick={() => store.ueControl.setIdleAnimation(2)}>EXPLAINING</Button>
        </div>

        <Typography style={{ marginTop: 8 }} variant={'subtitle1'}>Actions</Typography>
        <div style={ControlsGroupContainerStyle}>
            <Button color={store.ueControl.state.child.upper_body === 'cry' ? 'secondary' : undefined}
                    variant={'contained'} onClick={() => store.ueControl.setUpperBodyAnimation('cry')}>CRY</Button>
            <Button color={store.ueControl.state.child.upper_body === 'cut' ? 'secondary' : undefined}
                    variant={'contained'} onClick={() => store.ueControl.setUpperBodyAnimation('cut')}>CUT</Button>
            <Button color={store.ueControl.state.child.upper_body === 'scratch' ? 'secondary' : undefined}
                    variant={'contained'}
                    onClick={() => store.ueControl.setUpperBodyAnimation('scratch')}>SCRATCH</Button>
            <Button color={store.ueControl.state.child.upper_body === 'slap' ? 'secondary' : undefined}
                    variant={'contained'} onClick={() => store.ueControl.setUpperBodyAnimation('slap')}>SLAP</Button>
            <Button color={store.ueControl.state.child.upper_body === 'yawn' ? 'secondary' : undefined}
                    variant={'contained'} onClick={() => store.ueControl.setUpperBodyAnimation('yawn')}>YAWN</Button>
        </div>

        <Typography style={{ marginTop: 8 }} variant={'subtitle1'}>Camera</Typography>
        <div style={ControlsGroupContainerStyle}>
            <Button color={store.ueControl.state.camera === 'Closeup' ? 'secondary' : undefined} variant={'contained'}
                    onClick={() => store.ueControl.setCamera(0)}>CLOSEUP</Button>
            <Button color={store.ueControl.state.camera === 'Waist-up' ? 'secondary' : undefined} variant={'contained'}
                    onClick={() => store.ueControl.setCamera(1)}>WAIST-UP</Button>
            <Button color={store.ueControl.state.camera === 'Full Body' ? 'secondary' : undefined} variant={'contained'}
                    onClick={() => store.ueControl.setCamera(2)}>FULL BODY</Button>
            <Button color={store.ueControl.state.camera === 'Scene' ? 'secondary' : undefined} variant={'contained'}
                    onClick={() => store.ueControl.setCamera(3)}>SCENE</Button>
        </div>

        <Typography style={{ marginTop: 8 }} variant={'subtitle1'}>Environment</Typography>
        <div style={ControlsGroupContainerStyle}>
            <Button color={store.ueControl.state.level === 'DnevnaSoba' ? 'secondary' : undefined} variant={'contained'}
                    onClick={() => store.ueControl.setLevel(0)}>LIVING ROOM</Button>
            <Button color={store.ueControl.state.level === 'OtroskaSoba' ? 'secondary' : undefined}
                    variant={'contained'} onClick={() => store.ueControl.setLevel(1)}>FI ROOM</Button>
            <Button color={store.ueControl.state.level === 'Pisarna' ? 'secondary' : undefined} variant={'contained'}
                    onClick={() => store.ueControl.setLevel(2)}>OFFICE</Button>
            <Button color={store.ueControl.state.level === 'Ucilnica' ? 'secondary' : undefined} variant={'contained'}
                    onClick={() => store.ueControl.setLevel(3)}>CLASSROOM</Button>
        </div>

        <Typography style={{ marginTop: 8 }} variant={'subtitle1'}>Character</Typography>
        <div style={ControlsGroupContainerStyle}>
            {
                characterNames.map(([index, letter, gender, age]) => <Button
                    style={{
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        justifyContent: 'start',
                        width: 72
                    }}
                    color={store.ueControl.state.childIndex === index ? 'secondary' : undefined}
                    variant={'contained'}
                    onClick={() => store.ueControl.setChild(index)}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: store.ueControl.state.childIndex === index ? 'white' : 'black',
                        backgroundColor: store.ueControl.state.childIndex === index ? 'black' : 'white',
                        borderRadius: 50,
                        fontSize: 12,
                        width: 20,
                        height: 20,
                        marginRight: 4
                    }}>{letter}</div>
                    {age}{gender}</Button>)
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
    position: 'relative',
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