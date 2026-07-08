import { makeAutoObservable, runInAction } from 'mobx';

/**
 * In-browser microphone normalization for the instructor's outgoing audio.
 *
 * All server-side adaptive gain is disabled (every backend scheme pumped or
 * drifted against real content: typing pauses, quiet voice models). Instead
 * the instructor's captured mic - the only input the voice changer ever
 * sees - is scaled here, before it is produced to the SFU.
 *
 * AUTO mode tracks the loudest amplitude recorded so far and sets the gain
 * so that peak maps to full scale (peak * gain = 1.0). The peak decays
 * slowly, so one door slam does not permanently duck the voice. Dragging
 * the slider switches to manual and keeps the chosen gain until AUTO is
 * re-enabled (which re-learns the peak from fresh audio).
 */

const POLL_MS = 100;
const MAX_GAIN = 8;
const MIN_GAIN = 0.25;
// Peak decay per poll tick (~halflife 2 min at 10 Hz).
const PEAK_DECAY = 0.9994;
// Slew of the applied gain toward the target: corrections stay inaudible.
const GAIN_SLEW = 0.15;
// Leave a little headroom so transients above the learned peak do not clip.
const HEADROOM = 0.89;  // ~-1 dBFS

export class LgmAudioNormalizer {
    auto = true;
    gain = 1;
    /** loudest |sample| recorded since auto mode (re)started */
    peak = 0;
    /** live input level, for the UI meter */
    level = 0;
    active = false;

    private ctx: AudioContext | null = null;
    private source: MediaStreamAudioSourceNode | null = null;
    private analyser: AnalyserNode | null = null;
    private gainNode: GainNode | null = null;
    private destination: MediaStreamAudioDestinationNode | null = null;
    private buffer = new Float32Array(2048);
    private timer: ReturnType<typeof setInterval> | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    /**
     * Route a captured mic stream through the normalizer.
     * Returns the audio track to publish (falls back to the raw track if
     * WebAudio is unavailable - never leaves the instructor silent).
     */
    processMicTrack(stream: MediaStream): MediaStreamTrack {
        const raw = stream.getAudioTracks()[0];
        if (!raw) return raw;
        try {
            this.teardown();
            const ctx = this.ensureContext();
            // A stream containing only the mic track: video must not enter
            // the audio graph.
            const micOnly = new MediaStream([raw]);
            this.source = ctx.createMediaStreamSource(micOnly);
            this.analyser = ctx.createAnalyser();
            this.analyser.fftSize = 2048;
            this.buffer = new Float32Array(this.analyser.fftSize);
            this.gainNode = ctx.createGain();
            this.gainNode.gain.value = this.gain;
            this.destination = ctx.createMediaStreamDestination();

            // Measure BEFORE the gain: the peak we learn from must be the
            // raw recorded amplitude, or the loop chases its own output.
            this.source.connect(this.analyser);
            this.source.connect(this.gainNode);
            this.gainNode.connect(this.destination);

            const processed = this.destination.stream.getAudioTracks()[0];
            if (!processed) throw new Error('no processed track');
            this.startPolling();
            runInAction(() => (this.active = true));
            return processed;
        } catch (e) {
            console.error('Audio normalizer unavailable, publishing raw mic:', e);
            this.teardown();
            return raw;
        }
    }

    setManualGain(gain: number) {
        this.auto = false;
        this.gain = Math.min(Math.max(gain, MIN_GAIN), MAX_GAIN);
        this.applyGain(true);
    }

    setAuto(auto: boolean) {
        this.auto = auto;
        if (auto) this.peak = 0;  // re-learn from current material
    }

    teardown() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        try {
            this.source?.disconnect();
            this.analyser?.disconnect();
            this.gainNode?.disconnect();
        } catch { /* already torn down */ }
        this.source = this.analyser = this.gainNode = null;
        this.destination = null;
        this.active = false;
    }

    private ensureContext(): AudioContext {
        if (!this.ctx) {
            this.ctx = new AudioContext();
            const resume = () => this.ctx?.resume().catch(() => undefined);
            document.addEventListener('pointerdown', resume, { passive: true });
            resume();
        }
        if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => undefined);
        return this.ctx;
    }

    private startPolling() {
        if (this.timer) return;
        this.timer = setInterval(() => this.poll(), POLL_MS);
    }

    private poll() {
        const analyser = this.analyser;
        if (!analyser) return;
        analyser.getFloatTimeDomainData(this.buffer);
        let framePeak = 0;
        for (let i = 0; i < this.buffer.length; i++) {
            const a = Math.abs(this.buffer[i]);
            if (a > framePeak) framePeak = a;
        }
        runInAction(() => {
            this.level = framePeak;
            this.peak = Math.max(this.peak * PEAK_DECAY, framePeak);
            if (this.auto && this.peak > 0.01) {
                const target = Math.min(Math.max(HEADROOM / this.peak, MIN_GAIN), MAX_GAIN);
                this.gain += GAIN_SLEW * (target - this.gain);
            }
        });
        this.applyGain(false);
    }

    private applyGain(immediate: boolean) {
        const node = this.gainNode;
        if (!node) return;
        if (immediate || !this.ctx) {
            node.gain.value = this.gain;
        } else {
            node.gain.setTargetAtTime(this.gain, this.ctx.currentTime, 0.1);
        }
    }
}

export const audioNormalizer = new LgmAudioNormalizer();
