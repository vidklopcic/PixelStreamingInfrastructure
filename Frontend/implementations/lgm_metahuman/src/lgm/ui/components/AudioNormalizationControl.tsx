import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Chip, Slider, Typography } from '@mui/material';
import { VolumeUp } from '@mui/icons-material';
import { audioNormalizer } from '../../stores/LgmAudioNormalizer';

/**
 * Loudness normalization slider for received peer audio.
 *
 * In AUTO mode the slider follows the normalizer (peak amplitude observed
 * is scaled to full scale). Dragging it switches to manual and keeps the
 * chosen gain; the AUTO chip re-enables automatic tracking.
 */
export const AudioNormalizationControl = observer(({ compact = false }: { compact?: boolean }) => {
    const norm = audioNormalizer;

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: compact ? '4px 12px' : '8px 16px',
            borderRadius: '24px',
            backgroundColor: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
            minWidth: compact ? 180 : 240,
        }}>
            <VolumeUp sx={{ fontSize: 18, color: 'rgba(255,255,255,0.8)' }} />
            <Slider
                size="small"
                min={0.25}
                max={8}
                step={0.05}
                value={norm.gain}
                onChange={(_, value) => norm.setManualGain(value as number)}
                sx={{ flex: 1 }}
            />
            {!compact && (
                <Typography variant="caption" sx={{ width: 34, textAlign: 'right', color: 'rgba(255,255,255,0.8)' }}>
                    {norm.gain.toFixed(1)}x
                </Typography>
            )}
            <Chip
                label="AUTO"
                size="small"
                color={norm.auto ? 'primary' : 'default'}
                variant={norm.auto ? 'filled' : 'outlined'}
                onClick={() => norm.setAuto(!norm.auto)}
                sx={{ fontSize: 10, height: 20, cursor: 'pointer' }}
            />
        </Box>
    );
});
