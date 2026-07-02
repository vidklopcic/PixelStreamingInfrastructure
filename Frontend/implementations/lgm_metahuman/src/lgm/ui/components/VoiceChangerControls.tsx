import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { LgmStoreContext } from '../../stores/LgmStore';
import {
    Box,
    Button,
    MenuItem,
    Select,
    Slider,
    Typography,
    CircularProgress,
} from '@mui/material';

const ACCENT = '#5b7cdb';
const OK = '#7bc67e';
const ERR = '#e57373';

const sectionLabel = {
    color: '#ddd',
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
} as const;

/** One-line status under the model select — the panel's single live element. */
const StatusRow = observer(() => {
    const store = useContext(LgmStoreContext);
    const vc = store.voiceChanger;

    let dot: React.ReactNode = null;
    let text = '';
    let color = 'rgba(255,255,255,0.4)';
    let subtext = '';

    if (vc.loading) {
        dot = <CircularProgress size={10} thickness={6} sx={{ color: ACCENT }} />;
        text = 'Loading voice model…';
        color = ACCENT;
        subtext = 'Students hear the original voice until it is ready.';
    } else if (vc.failed) {
        dot = <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: ERR }} />;
        text = 'Voice model failed to load';
        color = ERR;
        subtext = 'Try again or pick another model.';
    } else if (vc.enabled && vc.status === 'ready') {
        dot = <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: OK }} />;
        text = 'Voice changing active';
        color = OK;
    } else if (!vc.enabled) {
        dot = <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.25)' }} />;
        text = 'Voice changing off — students hear the original voice';
    }

    if (!text) return null;

    return (
        <Box sx={{ mt: '8px', minHeight: 30 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {dot}
                <Typography variant="caption" sx={{ color, fontSize: 12, lineHeight: 1.3 }}>
                    {text}
                </Typography>
            </Box>
            {subtext && (
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, display: 'block', mt: '2px', ml: '16px' }}>
                    {subtext}
                </Typography>
            )}
        </Box>
    );
});

export const VoiceChangerControls = observer(() => {
    const store = useContext(LgmStoreContext);
    const vc = store.voiceChanger;

    useEffect(() => {
        vc.requestModels();
        vc.requestState();
    }, []);

    const segment = (active: boolean) => ({
        flex: 1,
        textTransform: 'none',
        fontSize: 13,
        py: '5px',
        borderRadius: 0,
        backgroundColor: active ? '#fff' : 'transparent',
        color: active ? '#1c1c1c' : 'rgba(255,255,255,0.5)',
        '&:hover': {
            backgroundColor: active ? '#e0e0e0' : 'rgba(255,255,255,0.05)',
        },
    });

    return (
        <Box
            sx={{
                p: '12px 16px 20px',
                width: 340,
                maxWidth: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
            }}
        >
            {/* Enable toggle */}
            <Box sx={{ display: 'flex', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', overflow: 'hidden' }}>
                <Button size="small" onClick={() => vc.setEnabled(false)} sx={segment(!vc.enabled)}>
                    Disabled
                </Button>
                <Button
                    size="small"
                    onClick={() => vc.setEnabled(true)}
                    sx={{ ...segment(vc.enabled), borderLeft: '1px solid rgba(255,255,255,0.2)' }}
                >
                    Enabled
                </Button>
            </Box>

            {/* Model */}
            <Box>
                <Typography variant="caption" sx={{ ...sectionLabel, mb: '6px', display: 'block' }}>
                    Model
                </Typography>
                <Select
                    value={vc.selectedModel || ''}
                    onChange={(e) => vc.setModel(e.target.value as string)}
                    size="small"
                    fullWidth
                    displayEmpty
                    disabled={vc.loading}
                    sx={{
                        backgroundColor: 'rgba(255,255,255,0.07)',
                        borderRadius: '6px',
                        fontSize: 13,
                        color: '#fff',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.12)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: ACCENT },
                        '& .MuiSelect-select': { py: '7px' },
                        '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.5)' },
                    }}
                >
                    {vc.models.length === 0 && (
                        <MenuItem value="" disabled>
                            No voice models available
                        </MenuItem>
                    )}
                    {vc.models.map((model) => (
                        <MenuItem key={model.name} value={model.name}>
                            {model.name}
                        </MenuItem>
                    ))}
                </Select>
                <StatusRow />
            </Box>

            {/* Pitch — always adjustable so it can be pre-set before enabling */}
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: '2px' }}>
                    <Typography variant="caption" sx={sectionLabel}>
                        Pitch
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#ccc', fontFamily: 'monospace', fontSize: 12 }}>
                        {vc.pitch > 0 ? '+' : ''}{vc.pitch} st
                    </Typography>
                </Box>
                <Box sx={{ px: '8px' }}>
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
                        size="small"
                        sx={{
                            color: ACCENT,
                            '& .MuiSlider-markLabel': { fontSize: 11, color: '#888' },
                            '& .MuiSlider-thumb': { width: 14, height: 14 },
                            '& .MuiSlider-rail': { opacity: 0.2 },
                            '& .MuiSlider-mark': { backgroundColor: 'rgba(255,255,255,0.2)' },
                        }}
                    />
                </Box>
                {!vc.enabled && vc.pitch !== 0 && (
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, display: 'block' }}>
                        Applied when voice changing is enabled.
                    </Typography>
                )}
            </Box>
        </Box>
    );
});
