import { observer } from 'mobx-react-lite';
import { LgmDialog } from './LgmDialog';
import { LgmStoreContext } from '../../../stores/LgmStore';
import React, { useContext } from 'react';
import { List, ListItem, ListItemText, Typography, ListItemAvatar, Avatar } from '@mui/material';

export const LgmSessionParticipantsDialog = observer(({ onClose }: { onClose: () => any }) => {
    const store = useContext(LgmStoreContext);

    return (
        <LgmDialog onClose={onClose} title={'Participants'}>
            {/* Material-UI List of participants with styled avatar */}
            <List>
                <ListItem key={store.user.id}>
                    <ListItemAvatar>
                        <Avatar
                            alt={store.user.name}
                            src={undefined}
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                border: '1px solid #666666',
                                color: '#ffffff' // Text color to contrast with the background
                            }}
                        >
                            {store.user.name.charAt(0)} {/* Fallback to first letter if no avatar image */}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={store.user.name + ' (you)'}
                        secondary={
                            <Typography variant={'caption'} style={{ color: 'rgba(255,255,255, 0.6)' }}>
                                {store.user.role}
                            </Typography>
                        }
                    />
                </ListItem>

                {Array.from(store.peers.values()).map((p) => (
                    <ListItem key={p.user.id}>
                        <ListItemAvatar>
                            <Avatar
                                alt={p.user.name}
                                src={undefined}
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid #666666',
                                    color: '#ffffff' // Text color to contrast with the background
                                }}
                            >
                                {p.user.name.charAt(0)} {/* Fallback to first letter if no avatar image */}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={p.user.name}
                            secondary={
                                <Typography variant={'caption'} style={{ color: 'rgba(255,255,255, 0.6)' }}>
                                    {p.user.role}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </LgmDialog>
    );
});
