import React, { useContext } from 'react';
import { Typography, Box, Link, Button, Paper } from '@mui/material';
import { LgmStoreContext } from '../lgm/stores/LgmStore';

// Custom circled number component
const CircledNumber = ({ number }: { number: number }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                backgroundColor: '#333',
                borderRadius: '50%',
                border: '1px solid #555',
                fontSize: 14,
                width: 24,
                height: 24,
                minWidth: 24,
                mr: 2,
                mt: 0.5
            }}
        >
            {number}
        </Box>
    );
};

export const LiveLinkTutorial = ({ onClose }: { onClose: () => any }) => {
    const store = useContext(LgmStoreContext);
    let number = 1;
    return (
        <Box sx={{ p: 3, bgcolor: '#121212', color: 'white' }}>
            <Paper elevation={0} sx={{ bgcolor: '#1e1e1e', p: 2, mb: 3, borderRadius: 2, border: '1px solid #333' }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CircledNumber number={number++} />
                    <Box>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Download LiveLink Face app from App Store (<Link
                            href="https://apps.apple.com/us/app/live-link-face/id1495370836" target="_blank"
                            rel="noopener" sx={{ color: '#90caf9' }}>Download</Link>)
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>
                            Install the app on your iPhone to begin the connection process.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CircledNumber number={number++} />
                    <Box>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Open the app and select Live Link (ARKit) Capture Mode
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>
                            Check "Don't ask again" and tap "Continue".
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CircledNumber number={number++} />
                    <Box>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Click settings icon in the top left corner
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>
                            This will open the configuration menu.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CircledNumber number={number++} />
                    <Box>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Under STREAMING, click on Live Link button
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>
                            This allows you to manage connection targets.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CircledNumber number={number++} />
                    <Box>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Under TARGETS, click on Add Target
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>
                            This will allow you to add our server as a connection point.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CircledNumber number={number++} />
                    <Box>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Under IP Address field, enter <b>{store.session?.liveLinkIp ?? '[waiting for ip info]'}</b>
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>
                            This is the server address to stream your facial expressions to.
                        </Typography>
                    </Box>
                </Box>

                {store.session.liveLinkPort !== '11111' &&
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <CircledNumber number={number++} />
                        <Box>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                                Under Port field, enter <b>{store.session?.liveLinkPort ?? '[waiting for port info]'}</b>
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#aaa' }}>
                                This is the port number to stream your facial expressions to.
                            </Typography>
                        </Box>
                    </Box>}

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CircledNumber number={number++} />
                    <Box>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Click Add in the upper right corner
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>
                            This will save the connection target.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CircledNumber number={number++} />
                    <Box>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Click back (← Settings) in the top left corner
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>
                            Return to the main settings menu.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <CircledNumber number={number++} />
                    <Box>
                        <Typography variant="body1" sx={{ color: 'white' }}>
                            Click Done in the top right corner
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#aaa' }}>
                            This will return you to the camera view and establish the connection.
                        </Typography>
                    </Box>
                </Box>
            </Paper>

            <Box sx={{ bgcolor: '#2d2d2d', p: 2, borderRadius: 2, mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#aaa' }}>
                    The avatar's face should now be controlled by your iPhone camera. Make sure your iPhone is on the
                    same network as the computer running the application.
                </Typography>
            </Box>
        </Box>
    );
};