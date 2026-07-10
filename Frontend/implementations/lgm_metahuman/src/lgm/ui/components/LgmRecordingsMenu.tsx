import { observer } from 'mobx-react-lite';
import React, { CSSProperties, useContext } from 'react';
import { LgmStoreContext } from '../../stores/LgmStore';
import { LgmConfig } from '../../LgmConfig';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogTitle,
    Drawer,
    Fab,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography
} from '@mui/material';
import { Delete, Download, Menu as MenuIcon, Refresh } from '@mui/icons-material';

interface RecordingEntry {
    filename: string;
    sizeBytes: number;
    modifiedAt: string;
}

// Same-origin in production; in local dev the UI runs on :3000 while the
// signalling server (which hosts /api/lgm/*) runs elsewhere - derive the
// HTTP base from the signalling websocket URL.
const apiBase = LgmConfig.SIGNALLING_SERVER.replace(/^ws/, 'http');

const listUrl = (session: string) =>
    `${apiBase}/api/lgm/recordings?session=${encodeURIComponent(session)}`;
const fileUrl = (session: string, name: string) =>
    `${apiBase}/api/lgm/recordings/file?session=${encodeURIComponent(session)}&name=${encodeURIComponent(name)}`;

const formatSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
const formatDate = (iso: string) => new Date(iso).toLocaleString();

/**
 * Menu FAB (same style as the device-settings FAB) that opens a left drawer
 * listing all recordings stored for the current session secret, with
 * download and delete actions. Platform integration comes later.
 */
export const LgmRecordingsMenu = observer((props: { fabStyle?: CSSProperties }) => {
    const store = useContext(LgmStoreContext);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [recordings, setRecordings] = React.useState<RecordingEntry[]>([]);
    const [confirmDelete, setConfirmDelete] = React.useState<string | undefined>(undefined);

    const session = store?.sessionId;

    const refresh = React.useCallback(() => {
        if (!session) return;
        setLoading(true);
        setError(undefined);
        fetch(listUrl(session))
            .then(async (r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const data = await r.json();
                setRecordings(data.recordings ?? []);
            })
            .catch(() => setError('Failed to load recordings'))
            .finally(() => setLoading(false));
    }, [session]);

    const doDelete = (name: string) => {
        if (!session) return;
        fetch(fileUrl(session, name), { method: 'DELETE' })
            .then(() => refresh())
            .catch(() => setError('Failed to delete recording'));
        setConfirmDelete(undefined);
    };

    if (!session) return null;

    return <>
        <Fab
            size={'small'}
            style={props.fabStyle}
            onClick={() => {
                setOpen(true);
                refresh();
            }}>
            <MenuIcon fontSize={'small'} />
        </Fab>
        <Drawer
            anchor={'left'}
            open={open}
            onClose={() => setOpen(false)}
            sx={{ zIndex: 1450 }}>
            <div style={DrawerContentStyle}>
                <div style={HeaderStyle}>
                    <Typography variant={'h6'}>Recordings</Typography>
                    <IconButton onClick={refresh} disabled={loading}>
                        <Refresh />
                    </IconButton>
                </div>
                <Typography variant={'body2'} color={'text.secondary'}>
                    Session: {session}
                </Typography>
                {loading && <div style={CenterStyle}><CircularProgress size={24} /></div>}
                {error && <Typography color={'error'} style={{ marginTop: 16 }}>{error}</Typography>}
                {!loading && !error && recordings.length === 0 &&
                    <Typography color={'text.secondary'} style={{ marginTop: 16 }}>
                        No recordings for this session yet.
                    </Typography>}
                <List dense>
                    {recordings.map((r) => <ListItem
                        key={r.filename}
                        secondaryAction={<>
                            <IconButton
                                component={'a'}
                                href={fileUrl(session, r.filename)}
                                download={r.filename}>
                                <Download />
                            </IconButton>
                            <IconButton edge={'end'} onClick={() => setConfirmDelete(r.filename)}>
                                <Delete />
                            </IconButton>
                        </>}>
                        <ListItemText
                            primary={formatDate(r.modifiedAt)}
                            secondary={`${r.filename} · ${formatSize(r.sizeBytes)}`}
                            style={{ paddingRight: 48 }}
                        />
                    </ListItem>)}
                </List>
            </div>
        </Drawer>
        <Dialog
            open={confirmDelete !== undefined}
            onClose={() => setConfirmDelete(undefined)}
            sx={{ zIndex: 1500 }}>
            <DialogTitle>Delete recording {confirmDelete}?</DialogTitle>
            <DialogActions>
                <Button onClick={() => setConfirmDelete(undefined)}>Cancel</Button>
                <Button color={'error'} onClick={() => confirmDelete && doDelete(confirmDelete)}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </>;
});

const DrawerContentStyle: CSSProperties = {
    width: 360,
    maxWidth: '85vw',
    padding: 16,
    display: 'flex',
    flexDirection: 'column'
};

const HeaderStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
};

const CenterStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 24
};
