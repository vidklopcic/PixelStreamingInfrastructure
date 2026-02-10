import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { LgmStoreContext } from '../../stores/LgmStore';
import {
    Box,
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
        <Box sx={{ p: '12px 16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Enable toggle */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ color: '#bbb', fontSize: 13 }}>Active</Typography>
                <Box
                    onClick={() => vc.setEnabled(!vc.enabled)}
                    sx={{
                        width: 36,
                        height: 20,
                        borderRadius: '10px',
                        backgroundColor: vc.enabled ? '#5b7cdb' : 'rgba(255,255,255,0.15)',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'background-color 0.15s',
                        '&:hover': { backgroundColor: vc.enabled ? '#6b8ceb' : 'rgba(255,255,255,0.25)' },
                    }}
                >
                    <Box sx={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        position: 'absolute',
                        top: 3,
                        left: vc.enabled ? 19 : 3,
                        transition: 'left 0.15s',
                    }} />
                </Box>
            </Box>

            {/* Model selector */}
            <Box>
                <Typography variant="caption" sx={{ color: '#777', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', mb: '4px', display: 'block' }}>
                    Model
                </Typography>
                <Box sx={{ position: 'relative' }}>
                    <Select
                        value={vc.selectedModel || ''}
                        onChange={(e) => vc.setModel(e.target.value as string)}
                        size="small"
                        fullWidth
                        displayEmpty
                        disabled={!vc.enabled || vc.loading}
                        sx={{
                            backgroundColor: 'rgba(255,255,255,0.07)',
                            borderRadius: '6px',
                            fontSize: 13,
                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.12)' },
                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#5b7cdb' },
                            '& .MuiSelect-select': { py: '6px' },
                        }}
                    >
                        <MenuItem value="" disabled>
                            <em style={{ color: '#666' }}>None</em>
                        </MenuItem>
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
            </Box>

            {/* Pitch slider */}
            <Box sx={{ opacity: (!vc.enabled || !hasModel) ? 0.35 : 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '2px' }}>
                    <Typography variant="caption" sx={{ color: '#777', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Pitch
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#aaa', fontFamily: 'monospace', fontSize: 11 }}>
                        {vc.pitch > 0 ? '+' : ''}{vc.pitch} st
                    </Typography>
                </Box>
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
                        px: '4px',
                        '& .MuiSlider-markLabel': { fontSize: 9, color: '#555' },
                        '& .MuiSlider-thumb': { width: 12, height: 12 },
                        '& .MuiSlider-rail': { opacity: 0.2 },
                        '& .MuiSlider-mark': { backgroundColor: 'rgba(255,255,255,0.2)' },
                    }}
                />
            </Box>

            {/* Status hints */}
            {vc.enabled && !hasModel && vc.models.length > 0 && (
                <Typography variant="caption" sx={{ color: '#887744', textAlign: 'center', fontSize: 11 }}>
                    Select a model to activate
                </Typography>
            )}
            {vc.models.length === 0 && (
                <Typography variant="caption" sx={{ color: '#666', textAlign: 'center', fontSize: 11 }}>
                    No models available
                </Typography>
            )}
        </Box>
    );
});
