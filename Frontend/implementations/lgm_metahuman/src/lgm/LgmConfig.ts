export abstract class LgmConfig {
    static LGM_SERVER = '';
    static MH_SERVER = '';

    static set(host: string) {
        LgmConfig.LGM_SERVER = `wss://xr.gamelab.si/ws/`;
        LgmConfig.MH_SERVER = `wss://${host}`;
    }
}