import { autorun, makeAutoObservable, toJS } from 'mobx';
import { LgmStore } from './LgmStore';

export class LGMUeControl {
    base: LgmStore;
    state: LgmUeState = {
        level: undefined,
        camera: undefined,
        childIndex: undefined,
        child: {
            idle: undefined,
            upper_body: undefined,
            full_body: undefined,
            bias_type: undefined,
            bias_level: undefined
        }
    };

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

    async setUpperBodyAnimation(name: 'cry' | 'cut' | 'scratch' | 'slap' | 'yawn') {
        if (this.state.child.upper_body !== undefined) {
            this.cancelUpperBodyAnimation();
            if (this.state.child.upper_body === name) {
                return;
            }
            await new Promise(r => setTimeout(r, 100));
        }
        this.base.pixelStreaming?.emitUIInteraction({
            'namespace': 'animation',
            'action': 'setUpperBody',
            'value': name
        });
    }

    cancelUpperBodyAnimation() {
        console.log('cancelUpperBody');
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

    parseState(response: string) {
        const state = JSON.parse(response) as LgmUeState;
        const name2String = (name?: string, lower?: boolean) => {
            const result = name === 'None' ? undefined : name;
            if (lower) {
                return result?.toLowerCase();
            } else {
                return result;
            }
        };
        this.state.level = name2String(state.level);
        this.state.camera = name2String(state.camera);
        this.state.childIndex = state.childIndex;
        this.state.child.idle = state.child.idle;
        this.state.child.upper_body = name2String(state.child.upper_body, true);
        this.state.child.full_body = name2String(state.child.full_body);
        this.state.child.bias_type = state.child.bias_type;
        this.state.child.bias_level = state.child.bias_level;
        console.log(this.state.child.upper_body);
    }
}

export interface LgmUeState {
    level?: string;
    camera?: string;
    childIndex?: number;
    child: {
        idle?: number;
        upper_body?: string;
        full_body?: string;
        bias_type?: number;
        bias_level?: number;
    };
}