import { makeAutoObservable } from 'mobx';
import { LgmStore } from './LgmStore';

export class LGMUeControl {
    base: LgmStore;

    constructor(base: LgmStore) {
        this.base = base;
        makeAutoObservable(this);
    }

    setLevel(index: number) {
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'level',
            'index': index.toString()
        });
    }

    setChild(index: number) {
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'child',
            'index': index.toString()
        });
    }

    setCamera(index: number) {
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'camera',
            'index': index.toString()
        });
    }

    resetGame() {
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'game',
            'action': 'reset'
        });
    }

    setEmotion(emotion: string, intensity: number) {
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'animation',
            'action': 'setFaceBias',
            'type': emotion.toLowerCase(),
            'level': intensity.toString()
        });
    }

    setIdleAnimation(i: number) {
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'animation',
            'action': 'setIdleAnim',
            'value': i.toString()
        });
    }

    setFullBodyAnimation(name: 'walk') {
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'animation',
            'action': 'setFullBody',
            'value': name
        });
    }

    setUpperBodyAnimation(name: 'cry' | 'cut' | 'scratch' | 'slap' | 'yawn') {
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'animation',
            'action': 'setUpperBody',
            'value': name
        });
    }

    cancelUpperBodyAnimation() {
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'animation',
            'action': 'cancelUpperBody'
        });
    }

    cancelFullBodyAnimation() {
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'animation',
            'action': 'cancelFullBody'
        });
    }

    resetAllAnimation() {
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'animation',
            'action': 'resetAll'
        });
    }

    dispose() {

    }
}