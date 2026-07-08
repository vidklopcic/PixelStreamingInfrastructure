import { makeAutoObservable, runInAction } from 'mobx';

/**
 * In-browser loudness normalization for received peer audio.
 *
 * All server-side adaptive gain is disabled (it fought the content: typing
 * pauses and quiet voice models made any backend AGC either pump or drift).
 * Instead, every peer audio stream is routed through a WebAudio GainNode
 * here, and in AUTO mode the gain is set so the maximum amplitude observed
 * so far maps to full scale (peak * gain = 1.0). The slider in the UI shows
 * the live gain; the moment the user drags it, auto mode stops and their
 * value is kept until they re-enable AUTO.
 */

const POLL_MS = 100;
const MAX_GAIN = 8;
const MIN_GAIN = 0.25;
// Running-peak decay per poll tick: lets the normalizer slowly forget an
// isolated pop (halflife ~2 min) without visibly pumping.
const PEAK_DECAY = 0.9994;
// Slew applied gain toward the target so corrections are inaudible.
const GAIN_SLEW = 0.15;

interface Engine {
    source: MediaStreamAudioSourceNode;
    gainNode: GainNode;
    destination: MediaStreamAudioDestinationNode;
    analyser: AnalyserNode;
    buffer: Float32Array;
}

export class LgmAudioNormalizer {
    auto = true;
    gain = 1;
    /** max |sample| observed since (re)start of auto mode */
    peak = 0;

    private ctx: AudioContext | null = null;
    private engines = new Map<string, Engine>();
    private timer: ReturnType<typeof setInterval> | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    /** Route a stream through the normalizer; returns the stream to play. */
    attach(stream: MediaStream): MediaStream {
        const ctx = this.ensureContext();
        const existing = this.engines.get(stream.id);
        if (existing) return existing.destination.stream;

        const source = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 2048;
        const gainNode = ctx.createGain();
        gainNode.gain.value = this.gain;
        const destination = ctx.createMediaStreamDestination();
        source.connect(analyser);
        analyser.connect(gainNode);
        gainNode.connect(destination);

        this.engines.set(stream.id, {
            source, gainNode, destination, analyser,
            buffer: new Float32Array(analyser.fftSize),
        });
        this.startPolling();
        return destination.stream;
    }

    detach(stream: MediaStream) {
        const engine = this.engines.get(stream.id);
        if (!engine) return;
        try {
            engine.source.disconnect();
            engine.analyser.disconnect();
            engine.gainNode.disconnect();
        } catch { /* already torn down */ }
        this.engines.delete(stream.id);
        if (this.engines.size === 0 && this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    setManualGain(gain: number) {
        this.auto = false;
        this.gain = Math.min(Math.max(gain, MIN_GAIN), MAX_GAIN);
        this.applyGain(true);
    }

    setAuto(auto: boolean) {
        this.auto = auto;
        if (auto) {
            // re-learn the peak from current material
            this.peak = 0;
        }
    }

    private ensureContext(): AudioContext {
        if (!this.ctx) {
            this.ctx = new AudioContext();
            // Autoplay policy can leave the context suspended until a user
            // gesture; resume opportunistically.
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
        let framePeak = 0;
        for (const engine of Array.from(this.engines.values())) {
            engine.analyser.getFloatTimeDomainData(engine.buffer);
            for (let i = 0; i < engine.buffer.length; i++) {
                const a = Math.abs(engine.buffer[i]);
                if (a > framePeak) framePeak = a;
            }
        }
        runInAction(() => {
            this.peak = Math.max(this.peak * PEAK_DECAY, framePeak);
            if (this.auto && this.peak > 0.01) {
                const target = Math.min(Math.max(1 / this.peak, MIN_GAIN), MAX_GAIN);
                this.gain += GAIN_SLEW * (target - this.gain);
            }
        });
        this.applyGain(false);
    }

    private applyGain(immediate: boolean) {
        for (const engine of Array.from(this.engines.values())) {
            if (immediate) {
                engine.gainNode.gain.value = this.gain;
            } else if (this.ctx) {
                engine.gainNode.gain.setTargetAtTime(this.gain, this.ctx.currentTime, 0.1);
            }
        }
    }
}

export const audioNormalizer = new LgmAudioNormalizer();
