import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { LgmStoreContext } from '../../stores/LgmStore';
import {
    Box,
    Button,
    CircularProgress,
    Slider,
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
        <Box sx={{ p: '8px 20px 20px', width: '100%', boxSizing: 'border-box' }}>
            {/* On/off — one obvious full-width action */}
            <Button
                fullWidth
                disableElevation
                disabled={!hasModels}
                onClick={() => vc.setEnabled(!vc.enabled)}
                sx={{
                    mt: '10px',
                    py: '10px',
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    border: '1px solid',
                    ...(vc.enabled
                        ? {
                            backgroundColor: 'rgba(123,198,126,0.12)',
                            color: OK,
                            borderColor: 'rgba(123,198,126,0.5)',
                            '&:hover': { backgroundColor: 'rgba(123,198,126,0.22)' },
                        }
                        : {
                            backgroundColor: '#fff',
                            color: '#1c1c1c',
                            borderColor: '#fff',
                            '&:hover': { backgroundColor: '#e8e8e8' },
                        }),
                    '&.Mui-disabled': {
                        backgroundColor: 'rgba(255,255,255,0.06)',
                        color: 'rgba(255,255,255,0.3)',
                        borderColor: 'rgba(255,255,255,0.1)',
                    },
                }}
            >
                {vc.enabled ? 'Turn off voice changing' : 'Turn on voice changing'}
            </Button>

            {/* Live status: what students hear right now */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mt: '10px', mb: '14px', minHeight: 18 }}>
                <VoiceChangerStatus withLabel={false} />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 12 }}>
                    {!hasModels
                        ? 'No voice models available.'
                        : vc.loading
                            ? 'Loading voice model — students still hear the original voice.'
                            : vc.failed
                                ? 'Voice model failed to load — pick another voice or try again.'
                                : vc.enabled
                                    ? 'Active — students hear the selected voice.'
                                    : 'Off — students hear the original voice.'}
                </Typography>
            </Box>

            {/* Voice selection — quiet chips, white = selected (same as dialog toggles) */}
            <Typography variant="subtitle1">Voice</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', mt: '6px', mb: '18px' }}>
                {vc.models.map((model) => {
                    const selected = vc.selectedModel === model.name;
                    return (
                        <Button
                            key={model.name}
                            disableElevation
                            disabled={vc.loading && !selected}
                            onClick={() => vc.setModel(model.name)}
                            sx={{
                                textTransform: 'none',
                                fontSize: 13,
                                py: '7px',
                                minWidth: 0,
                                borderRadius: '8px',
                                backgroundColor: selected ? '#fff' : 'rgba(255,255,255,0.07)',
                                color: selected ? '#1c1c1c' : '#ddd',
                                border: '1px solid',
                                borderColor: selected ? '#fff' : 'rgba(255,255,255,0.15)',
                                '&:hover': {
                                    backgroundColor: selected ? '#e8e8e8' : 'rgba(255,255,255,0.14)',
                                },
                                '&.Mui-disabled': {
                                    color: 'rgba(255,255,255,0.3)',
                                    backgroundColor: 'rgba(255,255,255,0.04)',
                                    borderColor: 'rgba(255,255,255,0.08)',
                                },
                            }}
                        >
                            {selected && vc.loading && (
                                <CircularProgress size={13} sx={{ color: '#1c1c1c', mr: '6px' }} />
                            )}
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
