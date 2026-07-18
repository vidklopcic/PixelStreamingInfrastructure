import React, { CSSProperties } from 'react';
import { Mic, MicOff } from '@mui/icons-material';

/**
 * Live level indicator for a RECEIVED audio stream, meant to sit on a peer's
 * video tile. Unlike the instructor's AudioNormalizationControl (which meters
 * the local mic), this proves audio is actually arriving from the remote
 * side - during the 7/15 outage the local meter was mistaken for exactly
 * that. Analysing a received stream is safe; only the mic SEND path must
 * stay clear of WebAudio (see LgmAudioNormalizer).
 */
export const LgmSpeakingIndicator = ({ stream }: { stream?: MediaStream }) => {
    const [level, setLevel] = React.useState(0);

    React.useEffect(() => {
        if (!stream || stream.getAudioTracks().length === 0) {
            setLevel(0);
            return;
        }
        const ctx = new AudioContext();
        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);
        const buf = new Float32Array(analyser.fftSize);
        let raf = 0;
        let last = 0;
        const tick = (ts: number) => {
            raf = requestAnimationFrame(tick);
            if (ts - last < 100) return; // 10 Hz is plenty for a meter
            last = ts;
            analyser.getFloatTimeDomainData(buf);
            let peak = 0;
            for (let i = 0; i < buf.length; i++) {
                const v = Math.abs(buf[i]);
                if (v > peak) peak = v;
            }
            setLevel(peak);
        };
        raf = requestAnimationFrame(tick);
        return () => {
            cancelAnimationFrame(raf);
            source.disconnect();
            ctx.close();
        };
    }, [stream]);

    const hasAudio = !!stream && stream.getAudioTracks().length > 0;
    const active = level > 0.02;
    return <div style={ChipStyle} title={hasAudio ? 'Audio arriving from this participant' : 'No audio from this participant'}>
        {hasAudio
            ? <Mic sx={{ fontSize: 16, color: active ? '#7bc67e' : 'rgba(255,255,255,0.7)' }} />
            : <MicOff sx={{ fontSize: 16, color: '#e57373' }} />}
        <div style={BarTrackStyle}>
            <div style={{
                ...BarStyle,
                width: `${Math.min(level * 100, 100)}%`
            }} />
        </div>
    </div>;
};

const ChipStyle: CSSProperties = {
    position: 'absolute',
    bottom: 8,
    left: 8,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '4px 8px',
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    pointerEvents: 'none'
};

const BarTrackStyle: CSSProperties = {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.25)',
    overflow: 'hidden'
};

const BarStyle: CSSProperties = {
    height: '100%',
    borderRadius: 2,
    backgroundColor: '#7bc67e',
    transition: 'width 0.1s linear'
};
