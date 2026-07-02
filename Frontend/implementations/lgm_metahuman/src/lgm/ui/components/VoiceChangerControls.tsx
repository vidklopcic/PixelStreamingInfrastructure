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

export const VoiceChangerControls = observer(() => {
    const store = useContext(LgmStoreContext);
    const vc = store.voiceChanger;

    useEffect(() => {
        vc.requestModels();
        vc.requestState();
    }, []);

    const hasModel = vc.selectedModel !== null;

    return (
        <Box sx={{ p: '12px 16px 20px', display: 'flex', flexDirection: 'column', gap: '12px', boxSizing: 'border-box' }}>
            {/* Enable toggle - segmented button */}
            <Box sx={{ display: 'flex', gap: 0, border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                <Button
                    size="small"
                    onClick={() => vc.setEnabled(false)}
                    sx={{
                        flex: 1,
                        textTransform: 'none',
                        fontSize: 13,
                        py: '4px',
                        borderRadius: 0,
                        backgroundColor: !vc.enabled ? '#fff' : 'transparent',
                        color: !vc.enabled ? '#1c1c1c' : 'rgba(255,255,255,0.5)',
                        '&:hover': {
                            backgroundColor: !vc.enabled ? '#e0e0e0' : 'rgba(255,255,255,0.05)',
                        },
                    }}
                >
                    Disabled
                </Button>
                <Button
                    size="small"
                    onClick={() => vc.setEnabled(true)}
                    sx={{
                        flex: 1,
                        textTransform: 'none',
                        fontSize: 13,
                        py: '4px',
                        borderRadius: 0,
                        borderLeft: '1px solid rgba(255,255,255,0.2)',
                        backgroundColor: vc.enabled ? '#fff' : 'transparent',
                        color: vc.enabled ? '#1c1c1c' : 'rgba(255,255,255,0.5)',
                        '&:hover': {
                            backgroundColor: vc.enabled ? '#e0e0e0' : 'rgba(255,255,255,0.05)',
                        },
                    }}
                >
                    Enabled
                </Button>
            </Box>

            {/* Model selector */}
            <Box>
                <Typography variant="caption" sx={{ color: '#ddd', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', mb: '4px', display: 'block' }}>
                    Model
                </Typography>
                <Box sx={{ position: 'relative' }}>
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
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#5b7cdb' },
                            '& .MuiSelect-select': { py: '6px' },
                            '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.5)' },
                        }}
                    >
                        {vc.models.map((model) => (
                            <MenuItem key={model.name} value={model.name}>
                                {model.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {vc.loading && (
                        <CircularProgress
                            size={16}
                            sx={{ position: 'absolute', right: 34, top: '50%', mt: '-8px', color: '#5b7cdb' }}
                        />
                    )}
                </Box>
                {vc.loading && (
                    <Typography variant="caption" sx={{ color: '#5b7cdb', fontSize: 11, mt: '4px', display: 'block' }}>
                        Loading voice model… original voice is heard until it is ready
                    </Typography>
                )}
                {vc.failed && !vc.loading && (
                    <Typography variant="caption" sx={{ color: '#e57373', fontSize: 11, mt: '4px', display: 'block' }}>
                        Voice model failed to load — voice changing is inactive
                    </Typography>
                )}
            </Box>

            {/* Pitch slider */}
            <Box sx={{ opacity: (!vc.enabled || !hasModel) ? 0.35 : 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '2px' }}>
                    <Typography variant="caption" sx={{ color: '#ddd', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
                        disabled={!vc.enabled || !hasModel}
                        size="small"
                        sx={{
                            color: '#5b7cdb',
                            '& .MuiSlider-markLabel': { fontSize: 11, color: '#888' },
                            '& .MuiSlider-thumb': { width: 14, height: 14 },
                            '& .MuiSlider-rail': { opacity: 0.2 },
                            '& .MuiSlider-mark': { backgroundColor: 'rgba(255,255,255,0.2)' },
                        }}
                    />
                </Box>
            </Box>

            {vc.models.length === 0 && (
                <Typography variant="caption" sx={{ color: '#666', textAlign: 'center', fontSize: 11 }}>
                    No models available
                </Typography>
            )}
        </Box>
    );
});
