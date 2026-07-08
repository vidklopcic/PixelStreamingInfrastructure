import { makeAutoObservable, runInAction } from 'mobx';

/**
 * Microphone level control for the instructor - the only role feeding the
 * voice changer. All adaptation happens HERE in the browser; the resulting
 * gain is applied as a STATIC multiplier in the voice changer server (the
 * `sink` pushes it over the control channel). Routing the mic through a
 * WebAudio gain->MediaStreamDestination graph was tried first and corrupted
 * the outgoing audio on real machines - the analyser below is therefore a
 * measurement-only tap on the raw published track.
 *
 * AUTO mode tracks the loudest amplitude recorded so far and targets
 * peak * gain = 1.0 (with ~1 dB headroom). The peak decays slowly, so one
 * door slam does not permanently duck the voice. Dragging the slider
 * switches to manual and keeps the chosen gain until AUTO is re-enabled
 * (which re-learns the peak from fresh audio).
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

    /** Receives gain values to apply wherever the gain actually lives
     *  (the VC server - the WebAudio send path corrupted audio). */
    sink: ((gain: number) => void) | null = null;
    private lastSent = 1;
    private lastSentAt = 0;

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
            // ANALYSIS-ONLY tap: routing the mic through a WebAudio
            // gain->MediaStreamDestination graph corrupted the outgoing
            // audio on the instructor machine (robotic, breaking - even
            // with the voice changer off). Until the gain is applied
            // somewhere robust, the RAW capture track is what gets
            // published; the analyser only measures it for the UI meter
            // and cannot affect the signal.
            const micOnly = new MediaStream([raw]);
            this.source = ctx.createMediaStreamSource(micOnly);
            this.analyser = ctx.createAnalyser();
            this.analyser.fftSize = 2048;
            this.buffer = new Float32Array(this.analyser.fftSize);
            this.source.connect(this.analyser);
            this.startPolling();
            runInAction(() => (this.active = true));
        } catch (e) {
            console.error('Audio level analysis unavailable:', e);
            this.teardown();
        }
        return raw;
    }

    setManualGain(gain: number) {
        this.auto = false;
        this.gain = Math.min(Math.max(gain, MIN_GAIN), MAX_GAIN);
        this.pushGain();
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
        this.pushGain();
    }

    /** Send the gain to the sink, throttled and change-gated. */
    private pushGain() {
        if (!this.sink) return;
        const now = Date.now();
        if (Math.abs(this.gain - this.lastSent) < 0.02) return;
        if (now - this.lastSentAt < 250) return;
        this.lastSent = this.gain;
        this.lastSentAt = now;
        this.sink(this.gain);
    }

}

export const audioNormalizer = new LgmAudioNormalizer();
