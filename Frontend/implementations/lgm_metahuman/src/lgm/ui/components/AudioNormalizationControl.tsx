import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Chip, Slider, Tooltip, Typography } from '@mui/material';
import { Mic } from '@mui/icons-material';
import { audioNormalizer } from '../../stores/LgmAudioNormalizer';

/**
 * Microphone normalization for the instructor - the only role whose audio
 * feeds the voice changer (all server-side adaptive gain is off).
 *
 * AUTO scales the mic so the loudest amplitude recorded maps to full scale.
 * Dragging the slider switches to manual and keeps that gain; the AUTO chip
 * re-enables tracking. The bar under the slider is the live input level
 * AFTER gain - it should peak near the right edge while speaking.
 */
export const AudioNormalizationControl = observer(({ compact = false }: { compact?: boolean }) => {
    const norm = audioNormalizer;
    const postGain = Math.min(norm.level * norm.gain, 1);
    const clipping = postGain > 0.99;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            padding: compact ? '6px 14px' : '8px 16px',
            borderRadius: '16px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            minWidth: compact ? 200 : 260,
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Tooltip title="Microphone level sent to the voice changer">
                    <Mic sx={{ fontSize: 18, color: 'rgba(255,255,255,0.8)' }} />
                </Tooltip>
                <Slider
                    size="small"
                    min={0.25}
                    max={8}
                    step={0.05}
                    value={norm.gain}
                    onChange={(_, value) => norm.setManualGain(value as number)}
                    sx={{ flex: 1 }}
                />
                <Typography variant="caption" sx={{ width: 34, textAlign: 'right', color: 'rgba(255,255,255,0.8)' }}>
                    {norm.gain.toFixed(1)}x
                </Typography>
                <Chip
                    label="AUTO"
                    size="small"
                    color={norm.auto ? 'primary' : 'default'}
                    variant={norm.auto ? 'filled' : 'outlined'}
                    onClick={() => norm.setAuto(!norm.auto)}
                    sx={{ fontSize: 10, height: 20, cursor: 'pointer' }}
                />
            </Box>
            <Box sx={{ height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
                <Box sx={{
                    height: '100%',
                    width: `${postGain * 100}%`,
                    backgroundColor: clipping ? '#e57373' : '#7bc67e',
                    transition: 'width 0.1s linear',
                }} />
            </Box>
        </Box>
    );
});
