import { CSSProperties } from 'react';
import { IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

interface LgmDialogProps {
    title?: any;
    style?: CSSProperties;
    children?: any;
    onClose?: () => any;
}

export const LgmDialog = (props: LgmDialogProps) => <div style={{
    ...ContainerStyle,
    ...(props.style ?? {})
}}>
    <div style={HeaderStyle}>
        <Typography variant={'h6'}>
            {props.title}
        </Typography>
        {props.onClose && <IconButton onClick={() => props.onClose()} color={'secondary'} style={{
            position: 'absolute',
            right: 8
        }}>
            <Close />
        </IconButton>}
    </div>
    <div style={ContentStyle}>
        {props.children}
    </div>
</div>;

const ContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: 400,
    maxHeight: '80vh',
    border: '1px solid #666666',
    backgroundColor: '#1c1c1c',
    borderRadius: 16,
    overflow: 'hidden'
};

const HeaderStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    height: 54,
    backgroundColor: '#3c3c3c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    boxShadow: '0 0px 8px rgba(0, 0, 0, 0.3)'
};

const ContentStyle: CSSProperties = {
    overflow: 'auto',
    maxHeight: 'calc(80vh - 54px)',
};