import React, { CSSProperties, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { LgmStoreContext } from '../../stores/LgmStore';
import {
    Box,
    FormControlLabel,
    MenuItem,
    Select,
    Slider,
    Switch,
    Typography,
} from '@mui/material';
import { RecordVoiceOver } from '@mui/icons-material';

export const VoiceChangerControls = observer(() => {
    const store = useContext(LgmStoreContext);
    const vc = store.voiceChanger;

    useEffect(() => {
        vc.requestModels();
    }, []);

    return (
        <Box sx={ContainerStyle}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <RecordVoiceOver fontSize="small" />
                <Typography variant="subtitle2">Voice Changer</Typography>
            </Box>

            <FormControlLabel
                control={
                    <Switch
                        checked={vc.enabled}
                        onChange={(e) => vc.setEnabled(e.target.checked)}
                        size="small"
                    />
                }
                label="Enabled"
            />

            {vc.models.length > 0 && (
                <Select
                    value={vc.selectedModel || ''}
                    onChange={(e) => vc.setModel(e.target.value as string)}
                    size="small"
                    fullWidth
                    displayEmpty
                    disabled={!vc.enabled || vc.loading}
                    sx={{ mb: 1 }}
                >
                    <MenuItem value="" disabled>
                        Select model
                    </MenuItem>
                    {vc.models.map((model) => (
                        <MenuItem key={model.name} value={model.name}>
                            {model.name}
                        </MenuItem>
                    ))}
                </Select>
            )}

            <Typography variant="caption" gutterBottom>
                Pitch: {vc.pitch > 0 ? '+' : ''}{vc.pitch} semitones
            </Typography>
            <Slider
                value={vc.pitch}
                onChange={(_, value) => vc.setPitch(value as number)}
                onChangeCommitted={(_, value) => vc.setPitch(value as number)}
                min={-24}
                max={24}
                step={1}
                marks={[
                    { value: -24, label: '-24' },
                    { value: 0, label: '0' },
                    { value: 24, label: '+24' },
                ]}
                disabled={!vc.enabled}
                size="small"
            />
        </Box>
    );
});

const ContainerStyle: CSSProperties = {
    padding: 12,
    borderRadius: 8,
    background: 'rgba(255,255,255,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
};
