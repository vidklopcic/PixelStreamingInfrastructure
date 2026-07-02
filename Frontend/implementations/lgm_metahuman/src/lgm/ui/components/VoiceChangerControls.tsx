import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { LgmStoreContext } from '../../stores/LgmStore';
import {
    Box,
    Button,
    CircularProgress,
    Slider,
    Switch,
    Typography,
} from '@mui/material';

const ACCENT = '#5b7cdb';
const OK = '#7bc67e';
const ERR = '#e57373';

/** Small colored dot + label describing the current voice changer state. */
export const VoiceChangerStatus = observer(({ withLabel = true }: { withLabel?: boolean }) => {
    const store = useContext(LgmStoreContext);
    const vc = store.voiceChanger;

    let color = 'rgba(255,255,255,0.3)';
    let label = 'Off';
    if (vc.loading) {
        color = ACCENT;
        label = 'Loading…';
    } else if (vc.failed) {
        color = ERR;
        label = 'Failed';
    } else if (vc.enabled) {
        color = OK;
        label = 'Active';
    }

    return (
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            {vc.loading
                ? <CircularProgress size={10} thickness={6} sx={{ color }} />
                : <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />}
            {withLabel && (
                <Typography variant="caption" sx={{ color, fontSize: 12, fontWeight: 600 }}>
                    {label}
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

    const hasModels = vc.models.length > 0;

    return (
        <Box sx={{ p: '4px 16px 20px', width: 340, maxWidth: '100%', boxSizing: 'border-box' }}>
            {/* On/off + live status */}
            <Box sx={{ display: 'flex', alignItems: 'center', minHeight: 42 }}>
                <Switch
                    checked={vc.enabled}
                    onChange={(_, checked) => vc.setEnabled(checked)}
                    disabled={!hasModels}
                    sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: OK },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: OK },
                    }}
                />
                <Typography variant="subtitle1" sx={{ flex: 1 }}>
                    Voice changing
                </Typography>
                <VoiceChangerStatus />
            </Box>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, display: 'block', minHeight: 16, mb: '8px' }}>
                {!hasModels
                    ? 'No voice models available.'
                    : vc.loading
                        ? 'Students hear the original voice until the model is ready.'
                        : vc.failed
                            ? 'The voice model failed to load. Pick another voice or try again.'
                            : vc.enabled
                                ? 'Students hear the selected voice.'
                                : 'Students hear the original voice.'}
            </Typography>

            {/* Voice selection — same button-grid pattern as Character/Camera */}
            <Typography variant="subtitle1">Voice</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', mt: '4px', mb: '16px' }}>
                {vc.models.map((model) => {
                    const selected = vc.selectedModel === model.name;
                    return (
                        <Button
                            key={model.name}
                            variant="contained"
                            color={selected ? 'secondary' : undefined}
                            disabled={vc.loading && !selected}
                            onClick={() => vc.setModel(model.name)}
                            sx={{ textTransform: 'none', px: '12px' }}
                            startIcon={selected && vc.loading
                                ? <CircularProgress size={12} sx={{ color: 'inherit' }} />
                                : undefined}
                        >
                            {model.name}
                        </Button>
                    );
                })}
            </Box>

            {/* Pitch — always adjustable so it can be pre-set before enabling */}
            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">Pitch</Typography>
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
                    Applied when voice changing is turned on.
                </Typography>
            )}
        </Box>
    );
});
