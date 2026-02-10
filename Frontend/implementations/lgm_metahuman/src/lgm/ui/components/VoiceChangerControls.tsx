import React, { CSSProperties, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { LgmStoreContext } from '../../stores/LgmStore';
import {
    Box,
    MenuItem,
    Select,
    Slider,
    Switch,
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
        <Box sx={ContainerStyle}>
            {/* Enable toggle row */}
            <Box sx={RowStyle}>
                <Typography variant="body2" sx={{ color: '#ccc' }}>Active</Typography>
                <Switch
                    checked={vc.enabled}
                    onChange={(e) => vc.setEnabled(e.target.checked)}
                    size="small"
                    sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#7c9aff' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#7c9aff' },
                    }}
                />
            </Box>

            {/* Divider */}
            <Box sx={DividerStyle} />

            {/* Model selector */}
            <Box sx={SectionStyle}>
                <Typography variant="caption" sx={LabelStyle}>Model</Typography>
                <Box sx={{ position: 'relative' }}>
                    <Select
                        value={vc.selectedModel || ''}
                        onChange={(e) => vc.setModel(e.target.value as string)}
                        size="small"
                        fullWidth
                        displayEmpty
                        disabled={!vc.enabled || vc.loading}
                        sx={SelectStyle}
                    >
                        <MenuItem value="" disabled>
                            <em>None</em>
                        </MenuItem>
                        {vc.models.map((model) => (
                            <MenuItem key={model.name} value={model.name}>
                                {model.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {vc.loading && (
                        <CircularProgress
                            size={18}
                            sx={{
                                position: 'absolute',
                                right: 36,
                                top: '50%',
                                marginTop: '-9px',
                                color: '#7c9aff',
                            }}
                        />
                    )}
                </Box>
            </Box>

            {/* Pitch slider */}
            <Box sx={{ ...SectionStyle, opacity: (!vc.enabled || !hasModel) ? 0.4 : 1 }}>
                <Box sx={RowStyle}>
                    <Typography variant="caption" sx={LabelStyle}>Pitch</Typography>
                    <Typography variant="caption" sx={{ color: '#999', fontFamily: 'monospace', fontSize: 12 }}>
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
                        { value: -12, label: '-12' },
                        { value: 0, label: '0' },
                        { value: 12, label: '+12' },
                        { value: 24, label: '+24' },
                    ]}
                    disabled={!vc.enabled || !hasModel}
                    size="small"
                    sx={SliderStyle}
                />
            </Box>

            {/* Status */}
            {vc.enabled && !hasModel && vc.models.length > 0 && (
                <Typography variant="caption" sx={{ color: '#aa8844', textAlign: 'center', mt: 0.5 }}>
                    Select a model to activate voice changer
                </Typography>
            )}
            {vc.models.length === 0 && (
                <Typography variant="caption" sx={{ color: '#888', textAlign: 'center', mt: 0.5 }}>
                    No models available
                </Typography>
            )}
        </Box>
    );
});

const ContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    minWidth: 280,
};

const RowStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const SectionStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
};

const DividerStyle: CSSProperties = {
    height: 1,
    background: 'rgba(255,255,255,0.08)',
};

const LabelStyle = {
    color: '#999',
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
};

const SelectStyle = {
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255,255,255,0.15)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255,255,255,0.3)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#7c9aff',
    },
    fontSize: 13,
};

const SliderStyle = {
    color: '#7c9aff',
    mt: 1,
    '& .MuiSlider-markLabel': {
        fontSize: 10,
        color: '#666',
    },
    '& .MuiSlider-thumb': {
        width: 14,
        height: 14,
    },
    '& .MuiSlider-rail': {
        opacity: 0.2,
    },
};
