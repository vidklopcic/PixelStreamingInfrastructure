import { observer } from 'mobx-react-lite';
import React, { CSSProperties, useContext } from 'react';
import { Alert } from '@mui/material';
import { LgmStoreContext } from '../../stores/LgmStore';

/**
 * Persistent warning shown when the media pipeline keeps failing to connect
 * (LgmWebRTCStore.mediaBlocked). Retries continue in the background; this
 * banner exists so a hostile network reads as "network problem" instead of
 * silently missing audio/video.
 */
export const LgmConnectionBanner = observer(() => {
    const store = useContext(LgmStoreContext);
    if (!store.webrtc.mediaBlocked) return null;
    return <div style={BannerStyle}>
        <Alert severity={'error'} variant={'filled'}>
            Audio/video connection keeps failing. Your network is likely blocking it —
            check firewall/VPN or switch to another network. Retrying in the background…
        </Alert>
    </div>;
});

const BannerStyle: CSSProperties = {
    position: 'fixed',
    top: 8,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 2000,
    pointerEvents: 'none'
};
