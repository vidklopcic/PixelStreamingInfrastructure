export abstract class LgmConfig {
    // static SIGNALLING_SERVER = `wss://${window.location.hostname.includes('localhost') ? 'metka.ai' : window.location.hostname}`;
    static SIGNALLING_SERVER = `wss://${window.location.hostname}`;
}