import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import { LgmStoreContext } from '../../stores/LgmStore';
import { Fab, ListSubheader, Menu, MenuItem } from '@mui/material';
import { Settings } from '@mui/icons-material';

/**
 * Small circular settings button that opens a microphone / sound output picker.
 * Speaker selection is applied via setSinkId on the peer <audio> elements
 * (see LgmAudioStream) and on the UE pixel streaming media elements (here).
 */
export const LgmDeviceSettings = observer(() => {
    const store = useContext(LgmStoreContext);
    const webrtc = store.webrtc;
    const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);

    // Route UE pixel streaming audio to the selected output device
    const speakerId = webrtc.speakerDeviceId;
    const psConnected = store.pixelStreamingConnected;
    useEffect(() => {
        const parent = store.pixelStreaming?.videoElementParent;
        if (!parent) return;
        parent.querySelectorAll('video, audio').forEach((el) => {
            const media = el as HTMLMediaElement & { setSinkId?: (id: string) => Promise<void> };
            media.setSinkId?.(speakerId).catch(() => undefined);
        });
    }, [speakerId, psConnected]);

    const micSelected = (deviceId: string) => deviceId === (webrtc.micDeviceId || 'default');
    const speakerSelected = (deviceId: string) => deviceId === (webrtc.speakerDeviceId || 'default');

    return <>
        <Fab
            size={'small'}
            onClick={(e) => {
                webrtc.refreshDevices();
                setAnchor(e.currentTarget);
            }}>
            <Settings fontSize={'small'} />
        </Fab>
        <Menu
            anchorEl={anchor}
            open={!!anchor}
            onClose={() => setAnchor(null)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <ListSubheader>Microphone</ListSubheader>
            {webrtc.audioInputDevices.length === 0 &&
                <MenuItem disabled>No microphones found</MenuItem>}
            {webrtc.audioInputDevices.map((d, i) => <MenuItem
                key={d.deviceId}
                selected={micSelected(d.deviceId)}
                onClick={() => {
                    webrtc.setMicDevice(d.deviceId);
                    setAnchor(null);
                }}>
                {d.label || `Microphone ${i + 1}`}
            </MenuItem>)}
            <ListSubheader>Sound output</ListSubheader>
            {webrtc.audioOutputDevices.length === 0 &&
                <MenuItem disabled>System default</MenuItem>}
            {webrtc.audioOutputDevices.map((d, i) => <MenuItem
                key={d.deviceId}
                selected={speakerSelected(d.deviceId)}
                onClick={() => {
                    webrtc.setSpeakerDevice(d.deviceId);
                    setAnchor(null);
                }}>
                {d.label || `Speaker ${i + 1}`}
            </MenuItem>)}
        </Menu>
    </>;
});
