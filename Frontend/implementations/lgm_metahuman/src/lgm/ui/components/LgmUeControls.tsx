import { observer } from 'mobx-react-lite';
import { LgmStoreContext } from '../../stores/LgmStore';
import { CSSProperties, useContext } from 'react';
import { LgmStyles } from '../LgmStyles';

export const LgmUeControls = observer(() => {
    const store = useContext(LgmStoreContext);

    return <div style={RootStyle}>
        <div style={HeaderStyle}>Controls</div>
    </div>;
});

const RootStyle: CSSProperties = {
    borderRadius: 16,
    border: '1px solid #3c3c3c',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexBasis: 0,
};

const HeaderStyle: CSSProperties = {
    height: 54,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 20
};
