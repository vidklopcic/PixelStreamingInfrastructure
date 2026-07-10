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
import { Delete, Download, FiberManualRecord, Menu as MenuIcon } from '@mui/icons-material';

interface RecordingEntry {
    filename: string;
    sizeBytes: number;
    modifiedAt: string;
}

interface ActiveRecording {
    status: 'recording' | 'compositing' | 'done' | 'error';
    startTime: number;
    error?: string;
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

const SecondaryTextColor = 'rgba(255, 255, 255, 0.6)';
const REFRESH_INTERVAL_MS = 4000;

/**
 * Auto-refreshing list of the current session's recordings: shows an
 * in-flight recording as a pending row (capturing / processing) that
 * resolves into a downloadable file, plus download/delete per file.
 */
export const LgmRecordingsList = observer(() => {
    const store = useContext(LgmStoreContext);
    const session = store?.sessionId;
    const [loaded, setLoaded] = React.useState(false);
    const [error, setError] = React.useState<string | undefined>(undefined);
    const [recordings, setRecordings] = React.useState<RecordingEntry[]>([]);
    const [active, setActive] = React.useState<ActiveRecording | null>(null);
    const [confirmDelete, setConfirmDelete] = React.useState<string | undefined>(undefined);

    const refresh = React.useCallback(() => {
        if (!session) return;
        fetch(listUrl(session))
            .then(async (r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const data = await r.json();
                setRecordings(data.recordings ?? []);
                setActive(data.active ?? null);
                setError(undefined);
            })
            .catch(() => setError('Failed to load recordings'))
            .finally(() => setLoaded(true));
    }, [session]);

    React.useEffect(() => {
        refresh();
        const timer = setInterval(refresh, REFRESH_INTERVAL_MS);
        return () => clearInterval(timer);
    }, [refresh]);

    const doDelete = (name: string) => {
        if (!session) return;
        fetch(fileUrl(session, name), { method: 'DELETE' })
            .then(() => refresh())
            .catch(() => setError('Failed to delete recording'));
        setConfirmDelete(undefined);
    };

    if (!session) return null;

    const pending = active && (active.status === 'recording' || active.status === 'compositing');

    return <>
        {!loaded && <div style={CenterStyle}><CircularProgress size={24} color={'secondary'} /></div>}
        {error && <Typography color={'error'} style={{ marginTop: 8 }}>{error}</Typography>}
        {loaded && !error && recordings.length === 0 && !pending &&
            <Typography sx={{ color: SecondaryTextColor, marginTop: 1 }}>
                No recordings for this session yet.
            </Typography>}
        <List dense>
            {pending && <ListItem>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {active!.status === 'recording'
                        ? <FiberManualRecord color={'error'} fontSize={'small'} />
                        : <CircularProgress size={16} color={'secondary'} />}
                    <ListItemText
                        primary={active!.status === 'recording' ? 'Recording…' : 'Processing…'}
                        secondary={`started ${new Date(active!.startTime).toLocaleTimeString()}`}
                        secondaryTypographyProps={{ sx: { color: SecondaryTextColor } }}
                    />
                </div>
            </ListItem>}
            {recordings.map((r) => <ListItem
                key={r.filename}
                secondaryAction={<>
                    <IconButton
                        component={'a'}
                        href={fileUrl(session, r.filename)}
                        download={r.filename}
                        sx={{ color: 'white' }}>
                        <Download />
                    </IconButton>
                    <IconButton
                        edge={'end'}
                        onClick={() => setConfirmDelete(r.filename)}
                        sx={{ color: 'white' }}>
                        <Delete />
                    </IconButton>
                </>}>
                <ListItemText
                    primary={formatDate(r.modifiedAt)}
                    secondary={`${r.filename} · ${formatSize(r.sizeBytes)}`}
                    secondaryTypographyProps={{ sx: { color: SecondaryTextColor } }}
                    style={{ paddingRight: 48 }}
                />
            </ListItem>)}
        </List>
        <Dialog
            open={confirmDelete !== undefined}
            onClose={() => setConfirmDelete(undefined)}
            sx={{ zIndex: 1500 }}
            PaperProps={{
                // the app theme makes dialog paper transparent (session-ended
                // screen relies on it) - this dialog needs a real surface
                sx: {
                    backgroundColor: '#1e1e1e',
                    color: 'white',
                    boxShadow: '0 0 24px rgba(0, 0, 0, 0.8)',
                    borderRadius: 2,
                    padding: 1
                }
            }}>
            <DialogTitle>Delete recording {confirmDelete}?</DialogTitle>
            <DialogActions>
                <Button sx={{ color: 'white' }} onClick={() => setConfirmDelete(undefined)}>Cancel</Button>
                <Button color={'error'} onClick={() => confirmDelete && doDelete(confirmDelete)}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    </>;
});

/**
 * Menu FAB (same style as the device-settings FAB) opening a left drawer
 * with the session's recordings - used in the live instructor UI.
 */
export const LgmRecordingsMenu = observer((props: { fabStyle?: CSSProperties }) => {
    const store = useContext(LgmStoreContext);
    const [open, setOpen] = React.useState(false);

    if (!store?.sessionId) return null;

    return <>
        <Fab
            size={'small'}
            style={props.fabStyle}
            onClick={() => setOpen(true)}>
            <MenuIcon fontSize={'small'} />
        </Fab>
        <Drawer
            anchor={'left'}
            open={open}
            onClose={() => setOpen(false)}
            sx={{ zIndex: 1450 }}
            PaperProps={{
                sx: {
                    backgroundColor: '#141414',
                    backgroundImage: 'none',
                    color: 'white'
                }
            }}>
            <div style={DrawerContentStyle}>
                <Typography variant={'h6'}>Recordings</Typography>
                <Typography variant={'body2'} sx={{ color: SecondaryTextColor }}>
                    Session: {store.sessionId}
                </Typography>
                <LgmRecordingsList />
            </div>
        </Drawer>
    </>;
});

const DrawerContentStyle: CSSProperties = {
    width: 360,
    maxWidth: '85vw',
    padding: 16,
    display: 'flex',
    flexDirection: 'column'
};

const CenterStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 24
};
