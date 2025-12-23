export abstract class LgmConfig {
    // For local development (port 3000), connect to signalling server on 8443
    // For production, use the same host (assumes signalling is on same domain)
    static SIGNALLING_SERVER = (() => {
        const hostname = window.location.hostname;
        const isLocalDev = hostname === 'localhost' || hostname === '127.0.0.1';
        // Local dev uses port 8443, production uses default WSS port
        return isLocalDev ? `wss://${hostname}:8443` : `wss://${hostname}`;
    })();
}