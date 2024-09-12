import * as __WEBPACK_EXTERNAL_MODULE__epicgames_ps_lib_pixelstreamingfrontend_ue5_4_b200d8b9__ from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.4";
import * as __WEBPACK_EXTERNAL_MODULE_jss__ from "jss";
import * as __WEBPACK_EXTERNAL_MODULE_jss_plugin_camel_case_de113355__ from "jss-plugin-camel-case";
import * as __WEBPACK_EXTERNAL_MODULE_jss_plugin_global_ef86f421__ from "jss-plugin-global";
/******/ var __webpack_modules__ = ({

/***/ "./src/Application/Application.ts":
/*!****************************************!*\
  !*** ./src/Application/Application.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Application": () => (/* binding */ Application)
/* harmony export */ });
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.4 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.4");
/* harmony import */ var _Overlay_ConnectOverlay__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Overlay/ConnectOverlay */ "./src/Overlay/ConnectOverlay.ts");
/* harmony import */ var _Overlay_DisconnectOverlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Overlay/DisconnectOverlay */ "./src/Overlay/DisconnectOverlay.ts");
/* harmony import */ var _Overlay_PlayOverlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Overlay/PlayOverlay */ "./src/Overlay/PlayOverlay.ts");
/* harmony import */ var _Overlay_InfoOverlay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Overlay/InfoOverlay */ "./src/Overlay/InfoOverlay.ts");
/* harmony import */ var _Overlay_ErrorOverlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Overlay/ErrorOverlay */ "./src/Overlay/ErrorOverlay.ts");
/* harmony import */ var _Overlay_AFKOverlay__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Overlay/AFKOverlay */ "./src/Overlay/AFKOverlay.ts");
/* harmony import */ var _UI_Controls__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../UI/Controls */ "./src/UI/Controls.ts");
/* harmony import */ var _UI_LabelledButton__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../UI/LabelledButton */ "./src/UI/LabelledButton.ts");
/* harmony import */ var _UI_SettingsPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../UI/SettingsPanel */ "./src/UI/SettingsPanel.ts");
/* harmony import */ var _UI_StatsPanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../UI/StatsPanel */ "./src/UI/StatsPanel.ts");
/* harmony import */ var _UI_VideoQpIndicator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../UI/VideoQpIndicator */ "./src/UI/VideoQpIndicator.ts");
/* harmony import */ var _Config_ConfigUI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Config/ConfigUI */ "./src/Config/ConfigUI.ts");
/* harmony import */ var _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../UI/UIConfigurationTypes */ "./src/UI/UIConfigurationTypes.ts");
/* harmony import */ var _UI_FullscreenIcon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../UI/FullscreenIcon */ "./src/UI/FullscreenIcon.ts");
// Copyright Epic Games, Inc. All Rights Reserved.















/**
 * An Application is a combination of UI elements to display and manage a WebRTC Pixel Streaming
 * connection. It includes features for controlling a stream with mouse and keyboard,
 * managing connection endpoints, as well as displaying stats and other information about it.
 */
class Application {
    /**
     * @param options - Initialization options
     */
    constructor(options) {
        this._options = options;
        this.stream = options.stream;
        this.onColorModeChanged = options.onColorModeChanged;
        this.configUI = new _Config_ConfigUI__WEBPACK_IMPORTED_MODULE_1__.ConfigUI(this.stream.config);
        this.createOverlays();
        if ((0,_UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_2__.isPanelEnabled)(options.statsPanelConfig)) {
            // Add stats panel
            this.statsPanel = new _UI_StatsPanel__WEBPACK_IMPORTED_MODULE_3__.StatsPanel();
            this.uiFeaturesElement.appendChild(this.statsPanel.rootElement);
        }
        if ((0,_UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_2__.isPanelEnabled)(options.settingsPanelConfig)) {
            // Add settings panel
            this.settingsPanel = new _UI_SettingsPanel__WEBPACK_IMPORTED_MODULE_4__.SettingsPanel();
            this.uiFeaturesElement.appendChild(this.settingsPanel.rootElement);
            this.configureSettings();
        }
        if (!options.videoQpIndicatorConfig || !options.videoQpIndicatorConfig.disableIndicator) {
            // Add the video stream QP indicator
            this.videoQpIndicator = new _UI_VideoQpIndicator__WEBPACK_IMPORTED_MODULE_5__.VideoQpIndicator();
            this.uiFeaturesElement.appendChild(this.videoQpIndicator.rootElement);
        }
        this.createButtons();
        this.registerCallbacks();
        this.showConnectOrAutoConnectOverlays();
        this.setColorMode(this.configUI.isCustomFlagEnabled(_Config_ConfigUI__WEBPACK_IMPORTED_MODULE_1__.LightMode));
        this.stream.config._addOnSettingChangedListener(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.HideUI, (isEnabled) => {
            this._uiFeatureElement.style.visibility = isEnabled ? "hidden" : "visible";
        });
        if (this.stream.config.isFlagEnabled(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.HideUI)) {
            this._uiFeatureElement.style.visibility = "hidden";
        }
    }
    createOverlays() {
        // build all of the overlays
        this.disconnectOverlay = new _Overlay_DisconnectOverlay__WEBPACK_IMPORTED_MODULE_6__.DisconnectOverlay(this.stream.videoElementParent);
        this.connectOverlay = new _Overlay_ConnectOverlay__WEBPACK_IMPORTED_MODULE_7__.ConnectOverlay(this.stream.videoElementParent);
        this.playOverlay = new _Overlay_PlayOverlay__WEBPACK_IMPORTED_MODULE_8__.PlayOverlay(this.stream.videoElementParent);
        this.infoOverlay = new _Overlay_InfoOverlay__WEBPACK_IMPORTED_MODULE_9__.InfoOverlay(this.stream.videoElementParent);
        this.errorOverlay = new _Overlay_ErrorOverlay__WEBPACK_IMPORTED_MODULE_10__.ErrorOverlay(this.stream.videoElementParent);
        this.afkOverlay = new _Overlay_AFKOverlay__WEBPACK_IMPORTED_MODULE_11__.AFKOverlay(this.stream.videoElementParent);
        this.disconnectOverlay.onAction(() => this.stream.reconnect());
        // Build the webRtc connect overlay Event Listener and show the connect overlay
        this.connectOverlay.onAction(() => this.stream.connect());
        // set up the play overlays action
        this.playOverlay.onAction(() => this.stream.play());
    }
    /**
     * Set up button click functions and button functionality
     */
    createButtons() {
        const controlsUIConfig = {
            statsButtonType: !!this._options.statsPanelConfig
                ? this._options.statsPanelConfig.visibilityButtonConfig
                : undefined,
            settingsButtonType: !!this._options.settingsPanelConfig
                ? this._options.settingsPanelConfig.visibilityButtonConfig
                : undefined,
            fullscreenButtonType: this._options.fullScreenControlsConfig,
            xrIconType: this._options.xrControlsConfig
        };
        // Setup controls
        const controls = new _UI_Controls__WEBPACK_IMPORTED_MODULE_12__.Controls(controlsUIConfig);
        this.uiFeaturesElement.appendChild(controls.rootElement);
        // When we fullscreen we want this element to be the root
        const fullScreenButton = 
        // Depending on if we're creating an internal button, or using an external one
        (!!this._options.fullScreenControlsConfig
            && this._options.fullScreenControlsConfig.creationMode === _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_2__.UIElementCreationMode.UseCustomElement)
            // Either create a fullscreen class based on the external button
            ? new _UI_FullscreenIcon__WEBPACK_IMPORTED_MODULE_13__.FullScreenIconExternal(this._options.fullScreenControlsConfig.customElement)
            // Or use the one created by the Controls initializer earlier
            : controls.fullscreenIcon;
        if (fullScreenButton) {
            fullScreenButton.fullscreenElement = /iPad|iPhone|iPod/.test(navigator.userAgent) ? this.stream.videoElementParent.getElementsByTagName("video")[0] : this.rootElement;
        }
        // Add settings button to controls
        const settingsButton = !!controls.settingsIcon ? controls.settingsIcon.rootElement :
            this._options.settingsPanelConfig.visibilityButtonConfig.customElement;
        if (!!settingsButton)
            settingsButton.onclick = () => this.settingsClicked();
        if (!!this.settingsPanel)
            this.settingsPanel.settingsCloseButton.onclick = () => this.settingsClicked();
        // Add WebXR button to controls
        const xrButton = !!controls.xrIcon ? controls.xrIcon.rootElement :
            this._options.xrControlsConfig.creationMode === _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_2__.UIElementCreationMode.UseCustomElement ?
                this._options.xrControlsConfig.customElement : undefined;
        if (!!xrButton)
            xrButton.onclick = () => this.stream.toggleXR();
        // setup the stats/info button
        const statsButton = !!controls.statsIcon ? controls.statsIcon.rootElement :
            this._options.statsPanelConfig.visibilityButtonConfig.customElement;
        if (!!statsButton)
            statsButton.onclick = () => this.statsClicked();
        if (!!this.statsPanel) {
            this.statsPanel.statsCloseButton.onclick = () => this.statsClicked();
        }
        // Add command buttons (if we have somewhere to add them to)
        if (!!this.settingsPanel) {
            // Add button for toggle fps
            const showFPSButton = new _UI_LabelledButton__WEBPACK_IMPORTED_MODULE_14__.LabelledButton('Show FPS', 'Toggle');
            showFPSButton.addOnClickListener(() => {
                this.stream.requestShowFps();
            });
            // Add button for restart stream
            const restartStreamButton = new _UI_LabelledButton__WEBPACK_IMPORTED_MODULE_14__.LabelledButton('Restart Stream', 'Restart');
            restartStreamButton.addOnClickListener(() => {
                this.stream.reconnect();
            });
            // Add button for request keyframe
            const requestKeyframeButton = new _UI_LabelledButton__WEBPACK_IMPORTED_MODULE_14__.LabelledButton('Request keyframe', 'Request');
            requestKeyframeButton.addOnClickListener(() => {
                this.stream.requestIframe();
            });
            const commandsSectionElem = this.configUI.buildSectionWithHeading(this.settingsPanel.settingsContentElement, 'Commands');
            commandsSectionElem.appendChild(showFPSButton.rootElement);
            commandsSectionElem.appendChild(requestKeyframeButton.rootElement);
            commandsSectionElem.appendChild(restartStreamButton.rootElement);
        }
    }
    /**
     * Configure the settings with on change listeners and any additional per experience settings.
     */
    configureSettings() {
        // This builds all the settings sections and flags under this `settingsContent` element.
        this.configUI.populateSettingsElement(this.settingsPanel.settingsContentElement);
        this.configUI.addCustomFlagOnSettingChangedListener(_Config_ConfigUI__WEBPACK_IMPORTED_MODULE_1__.LightMode, (isLightMode) => {
            this.configUI.setCustomFlagLabel(_Config_ConfigUI__WEBPACK_IMPORTED_MODULE_1__.LightMode, `Color Scheme: ${isLightMode ? 'Light' : 'Dark'} Mode`);
            this.setColorMode(isLightMode);
        });
    }
    registerCallbacks() {
        this.stream.addEventListener('afkWarningActivate', ({ data: { countDown, dismissAfk } }) => this.showAfkOverlay(countDown, dismissAfk));
        this.stream.addEventListener('afkWarningUpdate', ({ data: { countDown } }) => this.afkOverlay.updateCountdown(countDown));
        this.stream.addEventListener('afkWarningDeactivate', () => this.afkOverlay.hide());
        this.stream.addEventListener('afkTimedOut', () => this.afkOverlay.hide());
        this.stream.addEventListener('videoEncoderAvgQP', ({ data: { avgQP } }) => this.onVideoEncoderAvgQP(avgQP));
        this.stream.addEventListener('webRtcSdp', () => this.onWebRtcSdp());
        this.stream.addEventListener('webRtcAutoConnect', () => this.onWebRtcAutoConnect());
        this.stream.addEventListener('webRtcConnecting', () => this.onWebRtcConnecting());
        this.stream.addEventListener('webRtcConnected', () => this.onWebRtcConnected());
        this.stream.addEventListener('webRtcFailed', () => this.onWebRtcFailed());
        this.stream.addEventListener('webRtcDisconnected', ({ data: { eventString, allowClickToReconnect } }) => this.onDisconnect(eventString, allowClickToReconnect));
        this.stream.addEventListener('videoInitialized', () => this.onVideoInitialized());
        this.stream.addEventListener('streamLoading', () => this.onStreamLoading());
        this.stream.addEventListener('playStreamError', ({ data: { message } }) => this.onPlayStreamError(message));
        this.stream.addEventListener('playStream', () => this.onPlayStream());
        this.stream.addEventListener('playStreamRejected', ({ data: { reason } }) => this.onPlayStreamRejected(reason));
        this.stream.addEventListener('loadFreezeFrame', ({ data: { shouldShowPlayOverlay } }) => this.onLoadFreezeFrame(shouldShowPlayOverlay));
        this.stream.addEventListener('statsReceived', ({ data: { aggregatedStats } }) => this.onStatsReceived(aggregatedStats));
        this.stream.addEventListener('latencyTestResult', ({ data: { latencyTimings } }) => this.onLatencyTestResults(latencyTimings));
        this.stream.addEventListener('dataChannelLatencyTestResult', ({ data: { result } }) => this.onDataChannelLatencyTestResults(result));
        this.stream.addEventListener('streamerListMessage', ({ data: { messageStreamerList, autoSelectedStreamerId, wantedStreamerId } }) => this.handleStreamerListMessage(messageStreamerList, autoSelectedStreamerId, wantedStreamerId));
        this.stream.addEventListener('settingsChanged', (event) => this.configUI.onSettingsChanged(event));
        this.stream.addEventListener('playerCount', ({ data: { count } }) => this.onPlayerCount(count));
        this.stream.addEventListener('webRtcTCPRelayDetected', ({}) => _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.Warning(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), `Stream quailty degraded due to network enviroment, stream is relayed over TCP.`));
    }
    /**
     * Gets the rootElement of the application, video stream and all UI are children of this element.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'playerUI';
            this._rootElement.classList.add('noselect');
            this._rootElement.appendChild(this.stream.videoElementParent);
            this._rootElement.appendChild(this.uiFeaturesElement);
        }
        return this._rootElement;
    }
    /**
     * Gets the element that contains all the UI features, like the stats and settings panels.
     */
    get uiFeaturesElement() {
        if (!this._uiFeatureElement) {
            this._uiFeatureElement = document.createElement('div');
            this._uiFeatureElement.id = 'uiFeatures';
        }
        return this._uiFeatureElement;
    }
    /**
     * Shows the disconnect overlay
     * @param updateText - the text that will be displayed in the overlay
     */
    showDisconnectOverlay(updateText) {
        this.hideCurrentOverlay();
        this.updateDisconnectOverlay(updateText);
        this.disconnectOverlay.show();
        this.currentOverlay = this.disconnectOverlay;
    }
    /**
     * Update the disconnect overlays span text
     * @param updateText - the new countdown number
     */
    updateDisconnectOverlay(updateText) {
        this.disconnectOverlay.update(updateText);
    }
    /**
     * Activates the disconnect overlays action
     */
    onDisconnectionAction() {
        this.disconnectOverlay.activate();
    }
    /**
     * Hides the current overlay
     */
    hideCurrentOverlay() {
        if (this.currentOverlay != null) {
            this.currentOverlay.hide();
            this.currentOverlay = null;
        }
    }
    /**
     * Shows the connect overlay
     */
    showConnectOverlay() {
        this.hideCurrentOverlay();
        this.connectOverlay.show();
        this.currentOverlay = this.connectOverlay;
    }
    /**
     * Shows the play overlay
     */
    showPlayOverlay() {
        this.hideCurrentOverlay();
        this.playOverlay.show();
        this.currentOverlay = this.playOverlay;
    }
    /**
     * Shows the text overlay
     * @param text - the text that will be shown in the overlay
     */
    showTextOverlay(text) {
        this.hideCurrentOverlay();
        this.infoOverlay.update(text);
        this.infoOverlay.show();
        this.currentOverlay = this.infoOverlay;
    }
    /**
     * Shows the error overlay
     * @param text - the text that will be shown in the overlay
     */
    showErrorOverlay(text) {
        this.hideCurrentOverlay();
        this.errorOverlay.update(text);
        this.errorOverlay.show();
        this.currentOverlay = this.errorOverlay;
    }
    /**
     * Shows or hides the settings panel if clicked
     */
    settingsClicked() {
        var _a;
        (_a = this.statsPanel) === null || _a === void 0 ? void 0 : _a.hide();
        this.settingsPanel.toggleVisibility();
    }
    /**
     * Shows or hides the stats panel if clicked
     */
    statsClicked() {
        var _a;
        (_a = this.settingsPanel) === null || _a === void 0 ? void 0 : _a.hide();
        this.statsPanel.toggleVisibility();
    }
    /**
     * Activates the connect overlays action
     */
    onConnectAction() {
        this.connectOverlay.activate();
    }
    /**
     * Activates the play overlays action
     */
    onPlayAction() {
        this.playOverlay.activate();
    }
    /**
     * Shows the afk overlay
     * @param countDown - the countdown number for the afk countdown
     */
    showAfkOverlay(countDown, dismissAfk) {
        this.hideCurrentOverlay();
        this.afkOverlay.updateCountdown(countDown);
        this.afkOverlay.onAction(() => dismissAfk());
        this.afkOverlay.show();
        this.currentOverlay = this.afkOverlay;
    }
    /**
     * Show the Connect Overlay or auto connect
     */
    showConnectOrAutoConnectOverlays() {
        // set up if the auto play will be used or regular click to start
        if (!this.stream.config.isFlagEnabled(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.AutoConnect)) {
            this.showConnectOverlay();
        }
    }
    /**
     * Show the webRtcAutoConnect Overlay and connect
     */
    onWebRtcAutoConnect() {
        this.showTextOverlay('Auto Connecting Now');
    }
    /**
     * Set up functionality to happen when receiving a webRTC answer
     */
    onWebRtcSdp() {
        this.showTextOverlay('WebRTC Connection Negotiated');
    }
    /**
     * Shows a text overlay to alert the user the stream is currently loading
     */
    onStreamLoading() {
        // build the spinner span
        const spinnerSpan = document.createElement('span');
        spinnerSpan.className = 'visually-hidden';
        spinnerSpan.innerHTML = 'Loading...';
        // build the spinner div
        const spinnerDiv = document.createElement('div');
        spinnerDiv.id = 'loading-spinner';
        spinnerDiv.className = 'spinner-border ms-2';
        spinnerDiv.setAttribute('role', 'status');
        // append the spinner to the element
        spinnerDiv.appendChild(spinnerSpan);
        this.showTextOverlay('Loading Stream ' + spinnerDiv.outerHTML);
    }
    /**
     * Event fired when the video is disconnected - displays the error overlay and resets the buttons stream tools upon disconnect
     * @param eventString - the event text that will be shown in the overlay
     * @param allowClickToReconnect - true if we want to allow the user to click to reconnect. Otherwise it's just a message.
     */
    onDisconnect(eventString, allowClickToReconnect) {
        var _a;
        const overlayMessage = 'Disconnected' + (eventString ? `: ${eventString}` : '');
        if (allowClickToReconnect) {
            this.showDisconnectOverlay(`${overlayMessage} Click To Restart.`);
        }
        else {
            this.showErrorOverlay(overlayMessage);
        }
        // disable starting a latency checks
        (_a = this.statsPanel) === null || _a === void 0 ? void 0 : _a.onDisconnect();
    }
    /**
     * Handles when Web Rtc is connecting
     */
    onWebRtcConnecting() {
        this.showTextOverlay('Starting connection to server, please wait');
    }
    /**
     * Handles when Web Rtc has connected
     */
    onWebRtcConnected() {
        this.showTextOverlay('WebRTC connected, waiting for video');
    }
    /**
     * Handles when Web Rtc fails to connect
     */
    onWebRtcFailed() {
        this.showErrorOverlay('Unable to setup video');
    }
    onLoadFreezeFrame(shouldShowPlayOverlay) {
        if (shouldShowPlayOverlay === true) {
            _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.Log(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), 'showing play overlay');
            this.showPlayOverlay();
        }
    }
    onPlayStream() {
        this.hideCurrentOverlay();
    }
    onPlayStreamError(message) {
        this.showErrorOverlay(message);
    }
    onPlayStreamRejected(onRejectedReason) {
        this.showPlayOverlay();
    }
    onVideoInitialized() {
        var _a;
        if (!this.stream.config.isFlagEnabled(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.AutoPlayVideo)) {
            this.showPlayOverlay();
        }
        (_a = this.statsPanel) === null || _a === void 0 ? void 0 : _a.onVideoInitialized(this.stream);
    }
    /**
     * Set up functionality to happen when calculating the average video encoder qp
     * @param QP - the quality number of the stream
     */
    onVideoEncoderAvgQP(QP) {
        // Update internal QP indicator if one is present
        if (!!this.videoQpIndicator) {
            this.videoQpIndicator.updateQpTooltip(QP);
        }
    }
    onInitialSettings(settings) {
        var _a;
        if (settings.PixelStreamingSettings) {
            (_a = this.statsPanel) === null || _a === void 0 ? void 0 : _a.configure(settings.PixelStreamingSettings);
        }
    }
    onStatsReceived(aggregatedStats) {
        var _a;
        // Grab all stats we can off the aggregated stats
        (_a = this.statsPanel) === null || _a === void 0 ? void 0 : _a.handleStats(aggregatedStats);
    }
    onLatencyTestResults(latencyTimings) {
        var _a;
        (_a = this.statsPanel) === null || _a === void 0 ? void 0 : _a.latencyTest.handleTestResult(latencyTimings);
    }
    onDataChannelLatencyTestResults(result) {
        var _a;
        (_a = this.statsPanel) === null || _a === void 0 ? void 0 : _a.dataChannelLatencyTest.handleTestResult(result);
    }
    onPlayerCount(playerCount) {
        var _a;
        (_a = this.statsPanel) === null || _a === void 0 ? void 0 : _a.handlePlayerCount(playerCount);
    }
    handleStreamerListMessage(messageStreamingList, autoSelectedStreamerId, wantedStreamerId) {
        const waitForStreamer = this.stream.config.isFlagEnabled(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.WaitForStreamer);
        const isReconnecting = this.stream.isReconnecting();
        let message = null;
        let allowRestart = true;
        if (!autoSelectedStreamerId) {
            if (waitForStreamer && wantedStreamerId) {
                if (isReconnecting) {
                    message = `Waiting for ${wantedStreamerId} to become available.`;
                    allowRestart = false;
                }
                else {
                    message = `Gave up waiting for ${wantedStreamerId} to become available. Click to try again`;
                    if (messageStreamingList.ids.length > 0) {
                        message += ` or select a streamer from the settings menu.`;
                    }
                    allowRestart = true;
                }
            }
            else if (messageStreamingList.ids.length == 0) {
                if (isReconnecting) {
                    message = `Waiting for a streamer to become available.`;
                    allowRestart = false;
                }
                else {
                    message = `No streamers available. Click to try again.`;
                    allowRestart = true;
                }
            }
            else {
                message = `Multiple streamers available. Select one from the settings menu.`;
                allowRestart = false;
            }
            if (allowRestart) {
                this.showDisconnectOverlay(message);
            }
            else {
                this.showTextOverlay(message);
            }
        }
    }
    /**
     * Set light/dark color mode
     * @param isLightMode - should we use a light or dark color scheme
     */
    setColorMode(isLightMode) {
        if (this.onColorModeChanged) {
            this.onColorModeChanged(isLightMode);
        }
    }
}


/***/ }),

/***/ "./src/Config/ConfigUI.ts":
/*!********************************!*\
  !*** ./src/Config/ConfigUI.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConfigUI": () => (/* binding */ ConfigUI),
/* harmony export */   "LightMode": () => (/* binding */ LightMode)
/* harmony export */ });
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.4 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.4");
/* harmony import */ var _SettingUIFlag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettingUIFlag */ "./src/Config/SettingUIFlag.ts");
/* harmony import */ var _SettingUINumber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SettingUINumber */ "./src/Config/SettingUINumber.ts");
/* harmony import */ var _SettingUIText__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SettingUIText */ "./src/Config/SettingUIText.ts");
/* harmony import */ var _SettingUIOption__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SettingUIOption */ "./src/Config/SettingUIOption.ts");
// Copyright Epic Games, Inc. All Rights Reserved.





const LightMode = 'LightMode';
class ConfigUI {
    // ------------ Settings -----------------
    constructor(config) {
        this.customFlags = new Map();
        /* A map of flags that can be toggled - options that can be set in the application - e.g. Use Mic? */
        this.flagsUi = new Map();
        /* A map of numerical settings - options that can be in the application - e.g. MinBitrate */
        this.numericParametersUi = new Map();
        /* A map of text settings - e.g. signalling server url */
        this.textParametersUi = new Map();
        /* A map of enum based settings - e.g. preferred codec */
        this.optionParametersUi = new Map();
        this.createCustomUISettings(config.useUrlParams);
        this.registerSettingsUIComponents(config);
    }
    /**
     * Create custom UI settings that are not provided by the Pixel Streaming library.
     */
    createCustomUISettings(useUrlParams) {
        this.customFlags.set(LightMode, new _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.SettingFlag(LightMode, 'Color Scheme: Dark Mode', 'Page styling will be either light or dark', false /*if want to use system pref: (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches)*/, useUrlParams, (isLightMode, setting) => {
            setting.label = `Color Scheme: ${isLightMode ? 'Light' : 'Dark'} Mode`;
        }));
    }
    /**
     * Creates UI wrapper components for each setting element in config.
     * @param config
     */
    registerSettingsUIComponents(config) {
        for (const setting of config.getFlags()) {
            this.flagsUi.set(setting.id, new _SettingUIFlag__WEBPACK_IMPORTED_MODULE_1__.SettingUIFlag(setting));
        }
        for (const setting of Array.from(this.customFlags.values())) {
            this.flagsUi.set(setting.id, new _SettingUIFlag__WEBPACK_IMPORTED_MODULE_1__.SettingUIFlag(setting));
        }
        for (const setting of config.getTextSettings()) {
            this.textParametersUi.set(setting.id, new _SettingUIText__WEBPACK_IMPORTED_MODULE_2__.SettingUIText(setting));
        }
        for (const setting of config.getNumericSettings()) {
            this.numericParametersUi.set(setting.id, new _SettingUINumber__WEBPACK_IMPORTED_MODULE_3__.SettingUINumber(setting));
        }
        for (const setting of config.getOptionSettings()) {
            this.optionParametersUi.set(setting.id, new _SettingUIOption__WEBPACK_IMPORTED_MODULE_4__.SettingUIOption(setting));
        }
    }
    /**
     * Make DOM elements for a settings section with a heading.
     * @param settingsElem The parent container for our DOM elements.
     * @param sectionHeading The heading element to go into the section.
     * @returns The constructed DOM element for the section.
     */
    buildSectionWithHeading(settingsElem, sectionHeading) {
        // make section element
        const sectionElem = document.createElement('section');
        sectionElem.classList.add('settingsContainer');
        // make section heading
        const psSettingsHeader = document.createElement('div');
        psSettingsHeader.classList.add('settingsHeader');
        psSettingsHeader.classList.add('settings-text');
        psSettingsHeader.textContent = sectionHeading;
        // add section and heading to parent settings element
        sectionElem.appendChild(psSettingsHeader);
        settingsElem.appendChild(sectionElem);
        return sectionElem;
    }
    /**
     * Setup flags with their default values and add them to the `Config.flags` map.
     * @param settingsElem - The element that contains all the individual settings sections, flags, and so on.
     */
    populateSettingsElement(settingsElem) {
        /* Setup all Pixel Streaming specific settings */
        const psSettingsSection = this.buildSectionWithHeading(settingsElem, 'Pixel Streaming');
        // make settings show up in DOM
        this.addSettingText(psSettingsSection, this.textParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.TextParameters.SignallingServerUrl));
        this.addSettingOption(psSettingsSection, this.optionParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.OptionParameters.StreamerId));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.AutoConnect));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.AutoPlayVideo));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.BrowserSendOffer));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.UseMic));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.StartVideoMuted));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.IsQualityController));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.ForceMonoAudio));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.ForceTURN));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.SuppressBrowserKeys));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.AFKDetection));
        this.addSettingFlag(psSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.WaitForStreamer));
        this.addSettingNumeric(psSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.AFKTimeoutSecs));
        this.addSettingNumeric(psSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.MaxReconnectAttempts));
        this.addSettingNumeric(psSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.StreamerAutoJoinInterval));
        /* Setup all view/ui related settings under this section */
        const viewSettingsSection = this.buildSectionWithHeading(settingsElem, 'UI');
        this.addSettingFlag(viewSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.MatchViewportResolution));
        this.addSettingFlag(viewSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.HoveringMouseMode));
        this.addSettingFlag(viewSettingsSection, this.flagsUi.get(LightMode));
        /* Setup all encoder related settings under this section */
        const inputSettingsSection = this.buildSectionWithHeading(settingsElem, 'Input');
        this.addSettingFlag(inputSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.KeyboardInput));
        this.addSettingFlag(inputSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.MouseInput));
        this.addSettingFlag(inputSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.TouchInput));
        this.addSettingFlag(inputSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.GamepadInput));
        this.addSettingFlag(inputSettingsSection, this.flagsUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Flags.XRControllerInput));
        /* Setup all encoder related settings under this section */
        const encoderSettingsSection = this.buildSectionWithHeading(settingsElem, 'Encoder');
        this.addSettingNumeric(encoderSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.MinQP));
        this.addSettingNumeric(encoderSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.MaxQP));
        const preferredCodecOption = this.optionParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.OptionParameters.PreferredCodec);
        this.addSettingOption(encoderSettingsSection, this.optionParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.OptionParameters.PreferredCodec));
        if (preferredCodecOption &&
            [...preferredCodecOption.selector.options]
                .map((o) => o.value)
                .includes('Only available on Chrome')) {
            preferredCodecOption.disable();
        }
        /* Setup all webrtc related settings under this section */
        const webrtcSettingsSection = this.buildSectionWithHeading(settingsElem, 'WebRTC');
        this.addSettingNumeric(webrtcSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.WebRTCFPS));
        this.addSettingNumeric(webrtcSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.WebRTCMinBitrate));
        this.addSettingNumeric(webrtcSettingsSection, this.numericParametersUi.get(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.NumericParameters.WebRTCMaxBitrate));
    }
    /**
     * Add a SettingText element to a particular settings section in the DOM and registers that text in the text settings map.
     * @param settingsSection The settings section HTML element.
     * @param settingText The textual settings object.
     */
    addSettingText(settingsSection, settingText) {
        if (settingText) {
            settingsSection.appendChild(settingText.rootElement);
            this.textParametersUi.set(settingText.setting.id, settingText);
        }
    }
    /**
     * Add a SettingFlag element to a particular settings section in the DOM and registers that flag in the Config.flag map.
     * @param settingsSection The settings section HTML element.
     * @param settingFlag The settings flag object.
     */
    addSettingFlag(settingsSection, settingFlag) {
        if (settingFlag) {
            settingsSection.appendChild(settingFlag.rootElement);
            this.flagsUi.set(settingFlag.setting.id, settingFlag);
        }
    }
    /**
     * Add a numeric setting element to a particular settings section in the DOM and registers that flag in the Config.numericParameters map.
     * @param settingsSection The settings section HTML element.
     * @param settingFlag The settings flag object.
     */
    addSettingNumeric(settingsSection, setting) {
        if (setting) {
            settingsSection.appendChild(setting.rootElement);
            this.numericParametersUi.set(setting.setting.id, setting);
        }
    }
    /**
     * Add an enum based settings element to a particular settings section in the DOM and registers that flag in the Config.enumParameters map.
     * @param settingsSection The settings section HTML element.
     * @param settingFlag The settings flag object.
     */
    addSettingOption(settingsSection, setting) {
        if (setting) {
            settingsSection.appendChild(setting.rootElement);
            this.optionParametersUi.set(setting.setting.id, setting);
        }
    }
    onSettingsChanged({ data: { id, target, type } }) {
        if (type === 'flag') {
            const _id = id;
            const _target = target;
            const setting = this.flagsUi.get(_id);
            if (setting) {
                if (setting.flag !== _target.flag) {
                    setting.flag = _target.flag;
                }
                if (setting.label !== _target.label) {
                    setting.label = _target.label;
                }
            }
        }
        else if (type === 'number') {
            const _id = id;
            const _target = target;
            const setting = this.numericParametersUi.get(_id);
            if (setting) {
                if (setting.number !== _target.number) {
                    setting.number = _target.number;
                }
                if (setting.label !== _target.label) {
                    setting.label = _target.label;
                }
            }
        }
        else if (type === 'text') {
            const _id = id;
            const _target = target;
            const setting = this.textParametersUi.get(_id);
            if (setting) {
                if (setting.text !== _target.text) {
                    setting.text = _target.text;
                }
                if (setting.label !== _target.label) {
                    setting.label = _target.label;
                }
            }
        }
        else if (type === 'option') {
            const _id = id;
            const _target = target;
            const setting = this.optionParametersUi.get(_id);
            if (setting) {
                const uiOptions = setting.options;
                const targetOptions = _target.options;
                if (uiOptions.length !== targetOptions.length ||
                    !uiOptions.every((value) => targetOptions.includes(value))) {
                    setting.options = _target.options;
                }
                if (setting.selected !== _target.selected) {
                    setting.selected = _target.selected;
                }
                if (setting.label !== _target.label) {
                    setting.label = _target.label;
                }
            }
        }
    }
    /**
     * Add a callback to fire when the flag is toggled.
     * @param id The id of the flag.
     * @param onChangeListener The callback to fire when the value changes.
     */
    addCustomFlagOnSettingChangedListener(id, onChangeListener) {
        if (this.customFlags.has(id)) {
            this.customFlags.get(id).onChange = onChangeListener;
        }
    }
    /**
     * Set the label for the flag.
     * @param id The id of the flag.
     * @param label The new label to use for the flag.
     */
    setCustomFlagLabel(id, label) {
        if (!this.customFlags.has(id)) {
            _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.Warning(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), `Cannot set label for flag called ${id} - it does not exist in the Config.flags map.`);
        }
        else {
            this.customFlags.get(id).label = label;
            this.flagsUi.get(id).label = label;
        }
    }
    /**
     * Get the value of the configuration flag which has the given id.
     * @param id The unique id for the flag.
     * @returns True if the flag is enabled.
     */
    isCustomFlagEnabled(id) {
        return this.customFlags.get(id).flag;
    }
}


/***/ }),

/***/ "./src/Config/SettingUIBase.ts":
/*!*************************************!*\
  !*** ./src/Config/SettingUIBase.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingUIBase": () => (/* binding */ SettingUIBase)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * Base class for a setting that has a text label, an arbitrary setting value it stores, an a HTML element that represents this setting.
 */
class SettingUIBase {
    constructor(setting) {
        this._setting = setting;
    }
    /**
     * @returns The setting component.
     */
    get setting() {
        return this._setting;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
        }
        return this._rootElement;
    }
}


/***/ }),

/***/ "./src/Config/SettingUIFlag.ts":
/*!*************************************!*\
  !*** ./src/Config/SettingUIFlag.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingUIFlag": () => (/* binding */ SettingUIFlag)
/* harmony export */ });
/* harmony import */ var _SettingUIBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingUIBase */ "./src/Config/SettingUIBase.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

class SettingUIFlag extends _SettingUIBase__WEBPACK_IMPORTED_MODULE_0__.SettingUIBase {
    constructor(setting) {
        super(setting);
        this.label = setting.label;
        this.flag = setting.flag;
    }
    /**
     * @returns The setting component.
     */
    get setting() {
        return this._setting;
    }
    get settingsTextElem() {
        if (!this._settingsTextElem) {
            this._settingsTextElem = document.createElement('div');
            this._settingsTextElem.innerText = this.setting._label;
            this._settingsTextElem.title = this.setting.description;
        }
        return this._settingsTextElem;
    }
    get checkbox() {
        if (!this._checkbox) {
            this._checkbox = document.createElement('input');
            this._checkbox.type = 'checkbox';
        }
        return this._checkbox;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            // create root div with "setting" css class
            this._rootElement = document.createElement('div');
            this._rootElement.id = this.setting.id;
            this._rootElement.classList.add('setting');
            // create div element to contain our setting's text
            this._rootElement.appendChild(this.settingsTextElem);
            // create label element to wrap out input type
            const wrapperLabel = document.createElement('label');
            wrapperLabel.classList.add('tgl-switch');
            this._rootElement.appendChild(wrapperLabel);
            // create input type=checkbox
            this.checkbox.title = this.setting.description;
            this.checkbox.classList.add('tgl');
            this.checkbox.classList.add('tgl-flat');
            const slider = document.createElement('div');
            slider.classList.add('tgl-slider');
            wrapperLabel.appendChild(this.checkbox);
            wrapperLabel.appendChild(slider);
            // setup on change from checkbox
            this.checkbox.addEventListener('change', () => {
                if (this.setting.flag !== this.checkbox.checked) {
                    this.setting.flag = this.checkbox.checked;
                    this.setting.updateURLParams();
                }
            });
        }
        return this._rootElement;
    }
    /**
     * Update the setting's stored value.
     * @param inValue The new value for the setting.
     */
    set flag(inValue) {
        this.checkbox.checked = inValue;
    }
    /**
     * Get value
     */
    get flag() {
        return this.checkbox.checked;
    }
    /**
     * Set the label text for the setting.
     * @param label setting label.
     */
    set label(inLabel) {
        this.settingsTextElem.innerText = inLabel;
    }
    /**
     * Get label
     */
    get label() {
        return this.settingsTextElem.innerText;
    }
}


/***/ }),

/***/ "./src/Config/SettingUINumber.ts":
/*!***************************************!*\
  !*** ./src/Config/SettingUINumber.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingUINumber": () => (/* binding */ SettingUINumber)
/* harmony export */ });
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.4 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.4");
/* harmony import */ var _SettingUIBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettingUIBase */ "./src/Config/SettingUIBase.ts");
// Copyright Epic Games, Inc. All Rights Reserved.


/**
 * A number spinner with a text label beside it.
 */
class SettingUINumber extends _SettingUIBase__WEBPACK_IMPORTED_MODULE_1__.SettingUIBase {
    constructor(setting) {
        super(setting);
        this.label = this.setting.label;
        this.number = this.setting.number;
    }
    /**
     * @returns The setting component.
     */
    get setting() {
        return this._setting;
    }
    get settingsTextElem() {
        if (!this._settingsTextElem) {
            this._settingsTextElem = document.createElement('label');
            this._settingsTextElem.innerText = this.setting.label;
            this._settingsTextElem.title = this.setting.description;
        }
        return this._settingsTextElem;
    }
    /**
     * Get the HTMLInputElement for the button.
     */
    get spinner() {
        if (!this._spinner) {
            this._spinner = document.createElement('input');
            this._spinner.type = 'number';
            this._spinner.min = this.setting.min.toString();
            this._spinner.max = this.setting.max.toString();
            this._spinner.value = this.setting.number.toString();
            this._spinner.title = this.setting.description;
            this._spinner.classList.add('form-control');
        }
        return this._spinner;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            // create root div with "setting" css class
            this._rootElement = document.createElement('div');
            this._rootElement.classList.add('setting');
            this._rootElement.classList.add('form-group');
            // create div element to contain our setting's text
            this._rootElement.appendChild(this.settingsTextElem);
            // create label element to wrap out input type
            this._rootElement.appendChild(this.spinner);
            // setup onchange
            this.spinner.onchange = (event) => {
                const inputElem = event.target;
                const parsedValue = Number.parseFloat(inputElem.value);
                if (Number.isNaN(parsedValue)) {
                    _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.Warning(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), `Could not parse value change into a valid number - value was ${inputElem.value}, resetting value to ${this.setting.min}`);
                    if (this.setting.number !== this.setting.min) {
                        this.setting.number = this.setting.min;
                    }
                }
                else {
                    if (this.setting.number !== parsedValue) {
                        this.setting.number = parsedValue;
                        this.setting.updateURLParams();
                    }
                }
            };
        }
        return this._rootElement;
    }
    /**
     * Set the number in the spinner (will be clamped within range).
     */
    set number(newNumber) {
        this.spinner.value = this.setting.clamp(newNumber).toString();
    }
    /**
     * Get value
     */
    get number() {
        return +this.spinner.value;
    }
    /**
     * Set the label text for the setting.
     * @param label setting label.
     */
    set label(inLabel) {
        this.settingsTextElem.innerText = inLabel;
    }
    /**
     * Get label
     */
    get label() {
        return this.settingsTextElem.innerText;
    }
}


/***/ }),

/***/ "./src/Config/SettingUIOption.ts":
/*!***************************************!*\
  !*** ./src/Config/SettingUIOption.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingUIOption": () => (/* binding */ SettingUIOption)
/* harmony export */ });
/* harmony import */ var _SettingUIBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingUIBase */ "./src/Config/SettingUIBase.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

class SettingUIOption extends _SettingUIBase__WEBPACK_IMPORTED_MODULE_0__.SettingUIBase {
    constructor(setting) {
        super(setting);
        this.label = this.setting.label;
        this.options = this.setting.options;
        this.selected = this.setting.selected;
    }
    /**
     * @returns The setting component.
     */
    get setting() {
        return this._setting;
    }
    get selector() {
        if (!this._selector) {
            this._selector = document.createElement('select');
            this._selector.classList.add('form-control');
            this._selector.classList.add('settings-option');
        }
        return this._selector;
    }
    get settingsTextElem() {
        if (!this._settingsTextElem) {
            this._settingsTextElem = document.createElement('div');
            this._settingsTextElem.innerText = this.setting.label;
            this._settingsTextElem.title = this.setting.description;
        }
        return this._settingsTextElem;
    }
    /**
     * Set the label text for the setting.
     * @param label setting label.
     */
    set label(inLabel) {
        this.settingsTextElem.innerText = inLabel;
    }
    /**
     * Get label
     */
    get label() {
        return this.settingsTextElem.innerText;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            // create root div with "setting" css class
            this._rootElement = document.createElement('div');
            this._rootElement.id = this.setting.id;
            this._rootElement.classList.add('setting');
            this._rootElement.classList.add('form-group');
            // create div element to contain our setting's text
            this._rootElement.appendChild(this.settingsTextElem);
            // create label element to wrap out input type
            const wrapperLabel = document.createElement('label');
            this._rootElement.appendChild(wrapperLabel);
            // create select element
            this.selector.title = this.setting.description;
            wrapperLabel.appendChild(this.selector);
            // setup on change from selector
            this.selector.onchange = () => {
                if (this.setting.selected !== this.selector.value) {
                    this.setting.selected = this.selector.value;
                    this.setting.updateURLParams();
                }
            };
        }
        return this._rootElement;
    }
    set options(values) {
        for (let i = this.selector.options.length - 1; i >= 0; i--) {
            this.selector.remove(i);
        }
        values.forEach((value) => {
            const opt = document.createElement('option');
            opt.value = value;
            opt.innerHTML = value;
            this.selector.appendChild(opt);
        });
    }
    get options() {
        return [...this.selector.options].map((o) => o.value);
    }
    set selected(value) {
        // A user may not specify the full possible value so we instead use the closest match.
        // eg ?xxx=H264 would select 'H264 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f'
        const filteredList = this.options.filter((option) => option.indexOf(value) !== -1);
        if (filteredList.length) {
            this.selector.value = filteredList[0];
        }
    }
    get selected() {
        return this.selector.value;
    }
    disable() {
        this.selector.disabled = true;
    }
    enable() {
        this.selector.disabled = false;
    }
}


/***/ }),

/***/ "./src/Config/SettingUIText.ts":
/*!*************************************!*\
  !*** ./src/Config/SettingUIText.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingUIText": () => (/* binding */ SettingUIText)
/* harmony export */ });
/* harmony import */ var _SettingUIBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingUIBase */ "./src/Config/SettingUIBase.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

class SettingUIText extends _SettingUIBase__WEBPACK_IMPORTED_MODULE_0__.SettingUIBase {
    constructor(setting) {
        super(setting);
        this.label = this.setting.label;
        this.text = this.setting.text;
    }
    /**
     * @returns The setting component.
     */
    get setting() {
        return this._setting;
    }
    get settingsTextElem() {
        if (!this._settingsTextElem) {
            this._settingsTextElem = document.createElement('div');
            this._settingsTextElem.innerText = this.setting.label;
            this._settingsTextElem.title = this.setting.description;
        }
        return this._settingsTextElem;
    }
    get textbox() {
        if (!this._textbox) {
            this._textbox = document.createElement('input');
            this._textbox.classList.add('form-control');
            this._textbox.type = 'textbox';
        }
        return this._textbox;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            // create root div with "setting" css class
            this._rootElement = document.createElement('div');
            this._rootElement.id = this.setting.id;
            this._rootElement.classList.add('setting');
            // create div element to contain our setting's text
            this._rootElement.appendChild(this.settingsTextElem);
            // create label element to wrap out input type
            const wrapperLabel = document.createElement('label');
            this._rootElement.appendChild(wrapperLabel);
            // create input type=checkbox
            this.textbox.title = this.setting.description;
            wrapperLabel.appendChild(this.textbox);
            // setup on change from checkbox
            this.textbox.addEventListener('input', () => {
                if (this.setting.text !== this.textbox.value) {
                    this.setting.text = this.textbox.value;
                    this.setting.updateURLParams();
                }
            });
        }
        return this._rootElement;
    }
    /**
     * Update the setting's stored value.
     * @param inValue The new value for the setting.
     */
    set text(inValue) {
        this.textbox.value = inValue;
    }
    /**
     * Get value
     */
    get text() {
        return this.textbox.value;
    }
    /**
     * Set the label text for the setting.
     * @param label setting label.
     */
    set label(inLabel) {
        this.settingsTextElem.innerText = inLabel;
    }
    /**
     * Get label
     */
    get label() {
        return this.settingsTextElem.innerText;
    }
}


/***/ }),

/***/ "./src/Overlay/AFKOverlay.ts":
/*!***********************************!*\
  !*** ./src/Overlay/AFKOverlay.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AFKOverlay": () => (/* binding */ AFKOverlay)
/* harmony export */ });
/* harmony import */ var _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionOverlay */ "./src/Overlay/ActionOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Show an overlay for when the session is unattended, it begins a countdown timer, which when elapsed will disconnect the stream.
 */
class AFKOverlay extends _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__.ActionOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const afkOverlayHtml = document.createElement('div');
        afkOverlayHtml.id = 'afkOverlay';
        afkOverlayHtml.className = 'clickableState';
        return afkOverlayHtml;
    }
    /**
     * @returns The created content element of this overlay, which contain some text for an afk count down.
     */
    static createContentElement() {
        const afkOverlayHtmlInner = document.createElement('div');
        afkOverlayHtmlInner.id = 'afkOverlayInner';
        afkOverlayHtmlInner.innerHTML =
            '<center>No activity detected<br>Disconnecting in <span id="afkCountDownNumber"></span> seconds<br>Click to continue<br></center>';
        return afkOverlayHtmlInner;
    }
    /**
     * Construct an Afk overlay
     * @param parentElement the element this overlay will be inserted into
     */
    constructor(rootDiv) {
        super(rootDiv, AFKOverlay.createRootElement(), AFKOverlay.createContentElement());
        this.rootElement.addEventListener('click', () => {
            this.activate();
        });
    }
    /**
     * Update the count down spans number for the overlay
     * @param countdown the count down number to be inserted into the span for updating
     */
    updateCountdown(countdown) {
        this.textElement.innerHTML = `<center>No activity detected<br>Disconnecting in <span id="afkCountDownNumber">${countdown}</span> seconds<br>Click to continue<br></center>`;
    }
}


/***/ }),

/***/ "./src/Overlay/ActionOverlay.ts":
/*!**************************************!*\
  !*** ./src/Overlay/ActionOverlay.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ActionOverlay": () => (/* binding */ ActionOverlay)
/* harmony export */ });
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.4 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.4");
/* harmony import */ var _BaseOverlay__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseOverlay */ "./src/Overlay/BaseOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.


/**
 * Class for the base action overlay structure
 */
class ActionOverlay extends _BaseOverlay__WEBPACK_IMPORTED_MODULE_1__.OverlayBase {
    /**
     * Construct an action overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     * @param contentElement an element that contains text for the action overlay
     */
    constructor(rootDiv, rootElement, contentElement) {
        super(rootDiv, rootElement, contentElement);
        this.onActionCallback = () => {
            /* do nothing */ _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.Info(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), 'Did you forget to set the onAction callback in your overlay?');
        };
    }
    /**
     * Update the text overlays inner text
     * @param text the update text to be inserted into the overlay
     */
    update(text) {
        if (text != null || text != undefined) {
            this.textElement.innerHTML = text;
        }
    }
    /**
     * Set a method as an event emitter callback
     * @param callBack the method that is to be called when the event is emitted
     */
    onAction(callBack) {
        this.onActionCallback = callBack;
    }
    /**
     * Activate an event that is attached to the event emitter
     */
    activate() {
        this.onActionCallback();
    }
}


/***/ }),

/***/ "./src/Overlay/BaseOverlay.ts":
/*!************************************!*\
  !*** ./src/Overlay/BaseOverlay.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OverlayBase": () => (/* binding */ OverlayBase)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * Class for the base overlay structure
 */
class OverlayBase {
    /**
     * Construct an overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     */
    constructor(rootDiv, rootElement, textElement) {
        this.rootDiv = rootDiv;
        this.rootElement = rootElement;
        this.textElement = textElement;
        this.rootElement.appendChild(this.textElement);
        this.hide();
        this.rootDiv.appendChild(this.rootElement);
    }
    /**
     * Show the overlay
     */
    show() {
        this.rootElement.classList.remove('hiddenState');
    }
    /**
     * Hide the overlay
     */
    hide() {
        this.rootElement.classList.add('hiddenState');
    }
}


/***/ }),

/***/ "./src/Overlay/ConnectOverlay.ts":
/*!***************************************!*\
  !*** ./src/Overlay/ConnectOverlay.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConnectOverlay": () => (/* binding */ ConnectOverlay)
/* harmony export */ });
/* harmony import */ var _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionOverlay */ "./src/Overlay/ActionOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Overlay shown during connection, has a button that can be clicked to initiate a connection.
 */
class ConnectOverlay extends _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__.ActionOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const connectElem = document.createElement('div');
        connectElem.id = 'connectOverlay';
        connectElem.className = 'clickableState';
        return connectElem;
    }
    /**
     * @returns The created content element of this overlay, which contain whatever content this element contains, like text or a button.
     */
    static createContentElement() {
        const connectContentElem = document.createElement('div');
        connectContentElem.id = 'connectButton';
        connectContentElem.innerHTML = 'Click to start';
        return connectContentElem;
    }
    /**
     * Construct a connect overlay with a connection button.
     * @param parentElem the parent element this overlay will be inserted into.
     */
    constructor(parentElem) {
        super(parentElem, ConnectOverlay.createRootElement(), ConnectOverlay.createContentElement());
        // add the new event listener
        this.rootElement.addEventListener('click', () => {
            this.activate();
        });
    }
}


/***/ }),

/***/ "./src/Overlay/DisconnectOverlay.ts":
/*!******************************************!*\
  !*** ./src/Overlay/DisconnectOverlay.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DisconnectOverlay": () => (/* binding */ DisconnectOverlay)
/* harmony export */ });
/* harmony import */ var _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionOverlay */ "./src/Overlay/ActionOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Overlay shown during disconnection, has a reconnection element that can be clicked to reconnect.
 */
class DisconnectOverlay extends _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__.ActionOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const disconnectOverlayHtml = document.createElement('div');
        disconnectOverlayHtml.id = 'disconnectOverlay';
        disconnectOverlayHtml.className = 'clickableState';
        return disconnectOverlayHtml;
    }
    /**
     * @returns The created content element of this overlay, which contain whatever content this element contains, like text or a button.
     */
    static createContentElement() {
        // build the inner html container
        const disconnectOverlayHtmlContainer = document.createElement('div');
        disconnectOverlayHtmlContainer.id = 'disconnectButton';
        disconnectOverlayHtmlContainer.innerHTML = 'Click To Restart';
        return disconnectOverlayHtmlContainer;
    }
    /**
     * Construct a disconnect overlay with a retry connection icon.
     * @param parentElem the parent element this overlay will be inserted into.
     */
    constructor(parentElem) {
        super(parentElem, DisconnectOverlay.createRootElement(), DisconnectOverlay.createContentElement());
        // add the new event listener
        this.rootElement.addEventListener('click', () => {
            this.activate();
        });
    }
}


/***/ }),

/***/ "./src/Overlay/ErrorOverlay.ts":
/*!*************************************!*\
  !*** ./src/Overlay/ErrorOverlay.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorOverlay": () => (/* binding */ ErrorOverlay)
/* harmony export */ });
/* harmony import */ var _TextOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextOverlay */ "./src/Overlay/TextOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Generic overlay used to show textual error info to the user.
 */
class ErrorOverlay extends _TextOverlay__WEBPACK_IMPORTED_MODULE_0__.TextOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const errorOverlayHtml = document.createElement('div');
        errorOverlayHtml.id = 'errorOverlay';
        errorOverlayHtml.className = 'textDisplayState';
        return errorOverlayHtml;
    }
    /**
     * @returns The created content element of this overlay, which contain whatever content this element contains, like text or a button.
     */
    static createContentElement() {
        const errorOverlayHtmlInner = document.createElement('div');
        errorOverlayHtmlInner.id = 'errorOverlayInner';
        return errorOverlayHtmlInner;
    }
    /**
     * Construct a connect overlay with a connection button.
     * @param parentElem the parent element this overlay will be inserted into.
     */
    constructor(parentElem) {
        super(parentElem, ErrorOverlay.createRootElement(), ErrorOverlay.createContentElement());
    }
}


/***/ }),

/***/ "./src/Overlay/InfoOverlay.ts":
/*!************************************!*\
  !*** ./src/Overlay/InfoOverlay.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InfoOverlay": () => (/* binding */ InfoOverlay)
/* harmony export */ });
/* harmony import */ var _TextOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextOverlay */ "./src/Overlay/TextOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Generic overlay used to show textual info to the user.
 */
class InfoOverlay extends _TextOverlay__WEBPACK_IMPORTED_MODULE_0__.TextOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const infoOverlayHtml = document.createElement('div');
        infoOverlayHtml.id = 'infoOverlay';
        infoOverlayHtml.className = 'textDisplayState';
        return infoOverlayHtml;
    }
    /**
     * @returns The created content element of this overlay, which contain whatever content this element contains, like text or a button.
     */
    static createContentElement() {
        const infoOverlayHtmlInner = document.createElement('div');
        infoOverlayHtmlInner.id = 'messageOverlayInner';
        return infoOverlayHtmlInner;
    }
    /**
     * Construct a connect overlay with a connection button.
     * @param parentElem the parent element this overlay will be inserted into.
     */
    constructor(parentElem) {
        super(parentElem, InfoOverlay.createRootElement(), InfoOverlay.createContentElement());
    }
}


/***/ }),

/***/ "./src/Overlay/PlayOverlay.ts":
/*!************************************!*\
  !*** ./src/Overlay/PlayOverlay.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayOverlay": () => (/* binding */ PlayOverlay)
/* harmony export */ });
/* harmony import */ var _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionOverlay */ "./src/Overlay/ActionOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Overlay shown when stream is ready to play.
 */
class PlayOverlay extends _ActionOverlay__WEBPACK_IMPORTED_MODULE_0__.ActionOverlay {
    /**
     * @returns The created root element of this overlay.
     */
    static createRootElement() {
        const playElem = document.createElement('div');
        playElem.id = 'playOverlay';
        playElem.className = 'clickableState';
        return playElem;
    }
    /**
     * @returns The created content element of this overlay, which contain whatever content this element contains, like text or a button.
     */
    static createContentElement() {
        // todo: change this to an svg
        const playOverlayHtmlInner = document.createElement('img');
        playOverlayHtmlInner.id = 'playButton';
        playOverlayHtmlInner.src =
            'data:image/png;base64,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';
        playOverlayHtmlInner.alt = 'Start Streaming';
        return playOverlayHtmlInner;
    }
    /**
     * Construct a connect overlay with a connection button.
     * @param parentElem the parent element this overlay will be inserted into.
     */
    constructor(parentElem) {
        super(parentElem, PlayOverlay.createRootElement(), PlayOverlay.createContentElement());
        // add the new event listener
        this.rootElement.addEventListener('click', () => {
            this.activate();
        });
    }
}


/***/ }),

/***/ "./src/Overlay/TextOverlay.ts":
/*!************************************!*\
  !*** ./src/Overlay/TextOverlay.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TextOverlay": () => (/* binding */ TextOverlay)
/* harmony export */ });
/* harmony import */ var _BaseOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseOverlay */ "./src/Overlay/BaseOverlay.ts");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Class for the text overlay base
 */
class TextOverlay extends _BaseOverlay__WEBPACK_IMPORTED_MODULE_0__.OverlayBase {
    /**
     * Construct a text overlay
     * @param rootDiv the root element this overlay will be inserted into
     * @param rootElement the root element that is the overlay
     * @param textElement an element that contains text for the action overlay
     */
    constructor(rootDiv, rootElement, textElement) {
        super(rootDiv, rootElement, textElement);
    }
    /**
     * Update the text overlays inner text
     * @param text the update text to be inserted into the overlay
     */
    update(text) {
        if (text != null || text != undefined) {
            this.textElement.innerHTML = text;
        }
    }
}


/***/ }),

/***/ "./src/Styles/PixelStreamingApplicationStyles.ts":
/*!*******************************************************!*\
  !*** ./src/Styles/PixelStreamingApplicationStyles.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PixelStreamingApplicationStyle": () => (/* binding */ PixelStreamingApplicationStyle)
/* harmony export */ });
/* harmony import */ var jss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jss */ "jss");
/* harmony import */ var jss_plugin_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jss-plugin-global */ "jss-plugin-global");
/* harmony import */ var jss_plugin_camel_case__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jss-plugin-camel-case */ "jss-plugin-camel-case");
/* Copyright Epic Games, Inc. All Rights Reserved. */



class PixelStreamingApplicationStyle {
    constructor(options) {
        this.defaultLightModePalette = {
            '--color0': '#e2e0dd80',
            '--color1': '#FFFFFF',
            '--color2': '#000000',
            '--color3': '#0585fe',
            '--color4': '#35b350',
            '--color5': '#ffab00',
            '--color6': '#e1e2dd',
            '--color7': '#c3c4bf'
        };
        this.defaultDarkModePalette = {
            '--color0': '#1D1F2280',
            '--color1': '#000000',
            '--color2': '#FFFFFF',
            '--color3': '#0585fe',
            '--color4': '#35b350',
            '--color5': '#ffab00',
            '--color6': '#1e1d22',
            '--color7': '#3c3b40'
        };
        this.defaultStyles = {
            ':root': {
                '--color0': '#1D1F2280',
                '--color1': '#000000',
                '--color2': '#FFFFFF',
                '--color3': '#0585fe',
                '--color4': '#35b350',
                '--color5': '#ffab00',
                '--color6': '#1e1d22',
                '--color7': '#3c3b40',
                '--color8': '#41008c',
                '--color9': '#3e0070',
                '--color10': '#2e0052',
                '--color11': 'rgba(65,0,139,1)'
            },
            '.noselect': {
                userSelect: 'none'
            },
            '#playerUI': {
                width: '100%',
                height: '100%',
                position: 'relative'
            },
            '#videoElementParent': {
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'var(--color1)'
            },
            '#uiFeatures': {
                width: '100%',
                height: '100%',
                zIndex: '30',
                position: 'relative',
                color: 'var(--color2)',
                pointerEvents: 'none',
                overflow: 'hidden'
            },
            '.UiTool .tooltiptext': {
                visibility: 'hidden',
                width: 'auto',
                color: 'var(--color2)',
                textAlign: 'center',
                borderRadius: '15px',
                padding: '0px 10px',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.75rem',
                letterSpacing: '0.75px',
                position: 'absolute',
                top: '0',
                transform: 'translateY(25%)',
                left: '125%',
                zIndex: '20'
            },
            '.UiTool:hover .tooltiptext': {
                visibility: 'visible',
                backgroundColor: 'var(--color7)'
            },
            '#connection .tooltiptext': {
                top: '125%',
                transform: 'translateX(-25%)',
                left: '0',
                zIndex: '20',
                padding: '5px 10px'
            },
            '#connection': {
                position: 'absolute',
                bottom: '8%',
                left: '5%',
                fontFamily: "'Michroma', sans-serif",
                height: '3rem',
                width: '3rem',
                pointerEvents: 'all'
            },
            '#settings-panel .tooltiptext': {
                display: 'block',
                top: '125%',
                transform: 'translateX(-50%)',
                left: '0',
                zIndex: '20',
                padding: '5px 10px',
                border: '3px solid var(--color3)',
                width: 'max-content',
                fallbacks: [
                    {
                        width: 'max-content'
                    },
                    {
                        border: '3px solid var(--color3)'
                    },
                    {
                        padding: '5px 10px'
                    },
                    {
                        zIndex: '20'
                    },
                    {
                        left: '0'
                    },
                    {
                        transform: 'translateX(-50%)'
                    },
                    {
                        top: '125%'
                    },
                    {
                        display: 'block'
                    }
                ]
            },
            '#controls': {
                position: 'absolute',
                top: '3%',
                left: '2%',
                fontFamily: "'Michroma', sans-serif",
                pointerEvents: 'all',
                display: 'block'
            },
            '#controls>*': {
                marginBottom: '0.5rem',
                borderRadius: '50%',
                display: 'block',
                height: '2rem',
                lineHeight: '1.75rem',
                padding: '0.5rem'
            },
            '#controls #additionalinfo': {
                textAlign: 'center',
                fontFamily: "'Montserrat', sans-serif"
            },
            '#fullscreen-btn': {
                padding: '0.6rem !important'
            },
            '#minimizeIcon': {
                display: 'none'
            },
            '#settingsBtn, #statsBtn': {
                cursor: 'pointer'
            },
            '#uiFeatures button': {
                backgroundColor: 'var(--color7)',
                border: '1px solid var(--color7)',
                color: 'var(--color2)',
                position: 'relative',
                width: '3rem',
                height: '3rem',
                padding: '0.5rem',
                textAlign: 'center'
            },
            '#uiFeatures button:hover': {
                backgroundColor: 'var(--color3)',
                border: '3px solid var(--color3)',
                transition: '0.25s ease',
                paddingLeft: '0.55rem',
                paddingTop: '0.55rem'
            },
            '#uiFeatures button:active': {
                border: '3px solid var(--color3)',
                backgroundColor: 'var(--color7)',
                paddingLeft: '0.55rem',
                paddingTop: '0.55rem'
            },
            '.btn-flat': {
                backgroundColor: 'transparent',
                color: 'var(--color2)',
                fontFamily: "'Montserrat'",
                fontWeight: 'bold',
                border: '3px solid var(--color3)',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem',
                cursor: 'pointer',
                textAlign: 'center'
            },
            '.btn-flat:hover': {
                backgroundColor: 'var(--color3)',
                transition: 'ease 0.3s'
            },
            '.btn-flat:disabled': {
                background: 'var(--color7)',
                borderColor: 'var(--color3)',
                color: 'var(--color3)',
                cursor: 'default'
            },
            '.btn-flat:active': {
                backgroundColor: 'transparent'
            },
            '.btn-flat:focus': {
                outline: 'none'
            },
            '#uiFeatures img': {
                width: '100%',
                height: '100%'
            },
            '.panel-wrap': {
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: '0',
                height: '100%',
                minWidth: '20vw',
                maxWidth: '90vw',
                transform: 'translateX(100%)',
                transition: '.3s ease-out',
                pointerEvents: 'all',
                backdropFilter: 'blur(10px)',
                '-webkit-backdrop-filter': 'blur(10px)',
                overflowY: 'auto',
                overflowX: 'hidden',
                backgroundColor: 'var(--color0)'
            },
            '.panel-wrap-visible': {
                transform: 'translateX(0%)'
            },
            '.panel': {
                overflowY: 'auto',
                padding: '1em'
            },
            '#settingsHeading, #statsHeading': {
                display: 'inline-block',
                fontSize: '2em',
                marginBlockStart: '0.67em',
                marginBlockEnd: '0.67em',
                marginInlineStart: '0px',
                marginInlineEnd: '0px',
                position: 'relative',
                padding: '0 0 0 2rem'
            },
            '#settingsClose, #statsClose': {
                margin: '0.5rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingRight: '0.5rem',
                fontSize: '2em',
                float: 'right'
            },
            '#settingsClose:after, #statsClose:after': {
                paddingLeft: '0.5rem',
                display: 'inline-block',
                content: '"\\00d7"'
            },
            '#settingsClose:hover, #statsClose:hover': {
                color: 'var(--color3)',
                transition: 'ease 0.3s'
            },
            '#settingsContent, #statsContent': {
                marginLeft: '2rem',
                marginRight: '2rem'
            },
            '.setting': {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '0.15rem 10px 0.15rem 10px'
            },
            '.settings-text': {
                color: 'var(--color2)',
                verticalAlign: 'middle',
                fontWeight: 'normal'
            },
            '.settings-option': {
                width: '100%',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
            },
            '#connectOverlay, #playOverlay, #infoOverlay, #errorOverlay, #afkOverlay, #disconnectOverlay': {
                zIndex: '30',
                position: 'absolute',
                color: 'var(--color2)',
                fontSize: '1.8em',
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--color1)',
                alignItems: 'center',
                justifyContent: 'center',
                textTransform: 'uppercase'
            },
            '.clickableState': {
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                cursor: 'pointer'
            },
            '.textDisplayState': {
                display: 'flex'
            },
            '.hiddenState': {
                display: 'none'
            },
            '#playButton, #connectButton': {
                display: 'inline-block',
                height: 'auto',
                zIndex: '30'
            },
            'img#playButton': {
                maxWidth: '241px',
                width: '10%'
            },
            '#uiInteraction': {
                position: 'fixed'
            },
            '#UIInteractionButtonBoundary': {
                padding: '2px'
            },
            '#UIInteractionButton': {
                cursor: 'pointer'
            },
            '#hiddenInput': {
                position: 'absolute',
                left: '-10%',
                width: '0px',
                opacity: '0'
            },
            '#editTextButton': {
                position: 'absolute',
                height: '40px',
                width: '40px'
            },
            '.btn-overlay': {
                verticalAlign: 'middle',
                display: 'inline-block'
            },
            '.tgl-switch': {
                verticalAlign: 'middle',
                display: 'inline-block'
            },
            '.tgl-switch .tgl': {
                display: 'none'
            },
            '.tgl, .tgl:after, .tgl:before, .tgl *, .tgl *:after, .tgl *:before, .tgl+.tgl-slider': {
                '-webkit-box-sizing': 'border-box',
                boxSizing: 'border-box'
            },
            '.tgl::-moz-selection, .tgl:after::-moz-selection, .tgl:before::-moz-selection, .tgl *::-moz-selection, .tgl *:after::-moz-selection, .tgl *:before::-moz-selection, .tgl+.tgl-slider::-moz-selection': {
                background: 'none'
            },
            '.tgl::selection, .tgl:after::selection, .tgl:before::selection, .tgl *::selection, .tgl *:after::selection, .tgl *:before::selection, .tgl+.tgl-slider::selection': {
                background: 'none'
            },
            '.tgl-slider': {},
            '.tgl+.tgl-slider': {
                outline: '0',
                display: 'block',
                width: '40px',
                height: '18px',
                position: 'relative',
                cursor: 'pointer',
                userSelect: 'none'
            },
            '.tgl+.tgl-slider:after, .tgl+.tgl-slider:before': {
                position: 'relative',
                display: 'block',
                content: '""',
                width: '50%',
                height: '100%'
            },
            '.tgl+.tgl-slider:after': {
                left: '0'
            },
            '.tgl+.tgl-slider:before': {
                display: 'none'
            },
            '.tgl-flat+.tgl-slider': {
                padding: '2px',
                '-webkit-transition': 'all .2s ease',
                transition: 'all .2s ease',
                background: 'var(--color6)',
                border: '3px solid var(--color7)',
                borderRadius: '2em'
            },
            '.tgl-flat+.tgl-slider:after': {
                '-webkit-transition': 'all .2s ease',
                transition: 'all .2s ease',
                background: 'var(--color7)',
                content: '""',
                borderRadius: '1em'
            },
            '.tgl-flat:checked+.tgl-slider': {
                border: '3px solid var(--color3)'
            },
            '.tgl-flat:checked+.tgl-slider:after': {
                left: '50%',
                background: 'var(--color3)'
            },
            '.btn-apply': {
                display: 'block !important',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '40%'
            },
            '.form-control': {
                backgroundColor: 'var(--color7)',
                border: '2px solid var(--color7)',
                borderRadius: '4px',
                color: 'var(--color2)',
                textAlign: 'right',
                fontFamily: 'inherit'
            },
            '.form-control:hover': {
                borderColor: 'var(--color7)'
            },
            '.form-group': {
                paddingTop: '4px',
                display: 'grid',
                gridTemplateColumns: '80% 20%',
                rowGap: '4px',
                paddingRight: '10px',
                paddingLeft: '10px'
            },
            '.form-group label': {
                verticalAlign: 'middle',
                fontWeight: 'normal'
            },
            '.settingsContainer': {
                display: 'flex',
                flexDirection: 'column',
                borderBottom: '1px solid var(--color7)',
                paddingTop: '10px',
                paddingBottom: '10px'
            },
            '.settingsContainer> :first-child': {
                marginTop: '4px',
                marginBottom: '4px',
                fontWeight: 'bold',
                justifyContent: 'space-between',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline'
            },
            '.collapse': {
                paddingLeft: '5%'
            },
            '#streamTools': {
                borderBottomRightRadius: '5px',
                borderBottomLeftRadius: '5px',
                userSelect: 'none',
                position: 'absolute',
                top: '0',
                right: '2%',
                zIndex: '100',
                border: '4px solid var(--colour8)',
                borderTopWidth: '0px'
            },
            '.settingsHeader': {
                fontStyle: 'italic'
            },
            '#streamToolsHeader': {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--colour8)',
                backgroundColor: 'var(--color7)'
            },
            '.streamTools': {
                backgroundColor: 'var(--color2)',
                fontFamily: 'var(--buttonFont)',
                fontWeight: 'lighter',
                color: 'var(--color7)'
            },
            '.streamTools-shown>#streamToolsSettings, .streamTools-shown>#streamToolsStats': {
                display: 'block'
            },
            '#streamToolsToggle': {
                width: '100%'
            },
            '#qualityStatus': {
                fontSize: '37px',
                paddingRight: '4px'
            },
            '.svgIcon': {
                fill: 'var(--color2)'
            }
        };
        const { customStyles, lightModePalette, darkModePalette, jssInsertionPoint } = options !== null && options !== void 0 ? options : {};
        // One time setup with default plugins and settings.
        const jssOptions = {
            // JSS has many interesting plugins we may wish to turn on
            //plugins: [functions(), template(), global(), extend(), nested(), compose(), camelCase(), defaultUnit(options.defaultUnit), expand(), vendorPrefixer(), propsSort()]
            plugins: [(0,jss_plugin_global__WEBPACK_IMPORTED_MODULE_1__["default"])(), (0,jss_plugin_camel_case__WEBPACK_IMPORTED_MODULE_2__["default"])()],
            insertionPoint: jssInsertionPoint
        };
        jss__WEBPACK_IMPORTED_MODULE_0__["default"].setup(jssOptions);
        this.customStyles = customStyles;
        this.lightModePalette =
            lightModePalette !== null && lightModePalette !== void 0 ? lightModePalette : this.defaultLightModePalette;
        this.darkModePalette = darkModePalette !== null && darkModePalette !== void 0 ? darkModePalette : this.defaultDarkModePalette;
    }
    applyStyleSheet() {
        // Todo: refactor codebase to use jss at a component level, classes can be grabbed like so:
        //const {pixelStreamingClasses} = jss.createStyleSheet(styles).attach();
        // attach generated style sheet to page
        jss__WEBPACK_IMPORTED_MODULE_0__["default"].createStyleSheet({
            '@global': Object.assign(Object.assign({}, this.defaultStyles), this.customStyles)
        }).attach();
    }
    applyPalette(palette) {
        const rootElement = document.querySelector(':root');
        rootElement.style.setProperty('--color0', palette['--color0']);
        rootElement.style.setProperty('--color1', palette['--color1']);
        rootElement.style.setProperty('--color2', palette['--color2']);
        rootElement.style.setProperty('--color3', palette['--color3']);
        rootElement.style.setProperty('--color4', palette['--color4']);
        rootElement.style.setProperty('--color5', palette['--color5']);
        rootElement.style.setProperty('--color6', palette['--color6']);
        rootElement.style.setProperty('--color7', palette['--color7']);
    }
    /**
     * Update the players color variables
     * @param isLightMode - should we use a light or dark color scheme
     */
    setColorMode(isLightMode) {
        if (isLightMode) {
            this.applyPalette(this.lightModePalette);
        }
        else {
            this.applyPalette(this.darkModePalette);
        }
    }
}


/***/ }),

/***/ "./src/UI/Controls.ts":
/*!****************************!*\
  !*** ./src/UI/Controls.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controls": () => (/* binding */ Controls)
/* harmony export */ });
/* harmony import */ var _FullscreenIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FullscreenIcon */ "./src/UI/FullscreenIcon.ts");
/* harmony import */ var _SettingsIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SettingsIcon */ "./src/UI/SettingsIcon.ts");
/* harmony import */ var _StatsIcon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StatsIcon */ "./src/UI/StatsIcon.ts");
/* harmony import */ var _XRIcon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./XRIcon */ "./src/UI/XRIcon.ts");
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.4 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.4");
/* harmony import */ var _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../UI/UIConfigurationTypes */ "./src/UI/UIConfigurationTypes.ts");
// Copyright Epic Games, Inc. All Rights Reserved.






// If there isn't a type provided, default behaviour is to create the element.
function shouldCreateButton(type) {
    return (type == undefined) ? true : (type.creationMode === _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_1__.UIElementCreationMode.CreateDefaultElement);
}
/**
 * Element containing various controls like stats, settings, fullscreen.
 */
class Controls {
    /**
     * Construct the controls
     */
    constructor(config) {
        if (!config || shouldCreateButton(config.statsButtonType)) {
            this.statsIcon = new _StatsIcon__WEBPACK_IMPORTED_MODULE_2__.StatsIcon();
        }
        if (!config || shouldCreateButton(config.settingsButtonType)) {
            this.settingsIcon = new _SettingsIcon__WEBPACK_IMPORTED_MODULE_3__.SettingsIcon();
        }
        if (!config || shouldCreateButton(config.fullscreenButtonType)) {
            this.fullscreenIcon = new _FullscreenIcon__WEBPACK_IMPORTED_MODULE_4__.FullScreenIcon();
        }
        if (!config || shouldCreateButton(config.xrIconType)) {
            this.xrIcon = new _XRIcon__WEBPACK_IMPORTED_MODULE_5__.XRIcon();
        }
    }
    /**
     * Get the element containing the controls.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'controls';
            if (!!this.fullscreenIcon) {
                this._rootElement.appendChild(this.fullscreenIcon.rootElement);
            }
            if (!!this.settingsIcon) {
                this._rootElement.appendChild(this.settingsIcon.rootElement);
            }
            if (!!this.statsIcon) {
                this._rootElement.appendChild(this.statsIcon.rootElement);
            }
            if (!!this.xrIcon) {
                _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.WebXRController.isSessionSupported('immersive-vr').then((supported) => {
                    if (supported) {
                        this._rootElement.appendChild(this.xrIcon.rootElement);
                    }
                });
            }
            ;
        }
        return this._rootElement;
    }
}


/***/ }),

/***/ "./src/UI/DataChannelLatencyTest.ts":
/*!******************************************!*\
  !*** ./src/UI/DataChannelLatencyTest.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DataChannelLatencyTest": () => (/* binding */ DataChannelLatencyTest)
/* harmony export */ });
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.4 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.4");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * DataChannel Latency test UI elements and results handling.
 */
class DataChannelLatencyTest {
    /**
     * Get the button containing the stats icon.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('section');
            this._rootElement.classList.add('settingsContainer');
            // make heading
            const heading = document.createElement('div');
            heading.id = 'dataChannelLatencyTestHeader';
            heading.classList.add('settings-text');
            heading.classList.add('settingsHeader');
            this._rootElement.appendChild(heading);
            const headingText = document.createElement('div');
            headingText.innerHTML = 'Data Channel Latency Test';
            heading.appendChild(headingText);
            heading.appendChild(this.latencyTestButton);
            // make test results element
            const resultsParentElem = document.createElement('div');
            resultsParentElem.id = 'dataChannelLatencyTestContainer';
            resultsParentElem.classList.add('d-none');
            this._rootElement.appendChild(resultsParentElem);
            resultsParentElem.appendChild(this.latencyTestResultsElement);
        }
        return this._rootElement;
    }
    get latencyTestResultsElement() {
        if (!this._latencyTestResultsElement) {
            this._latencyTestResultsElement = document.createElement('div');
            this._latencyTestResultsElement.id = 'dataChannelLatencyStatsResults';
            this._latencyTestResultsElement.classList.add('StatsResult');
        }
        return this._latencyTestResultsElement;
    }
    get latencyTestButton() {
        if (!this._latencyTestButton) {
            this._latencyTestButton = document.createElement('input');
            this._latencyTestButton.type = 'button';
            this._latencyTestButton.value = 'Run Test';
            this._latencyTestButton.id = 'btn-start-data-channel-latency-test';
            this._latencyTestButton.classList.add('streamTools-button');
            this._latencyTestButton.classList.add('btn-flat');
        }
        return this._latencyTestButton;
    }
    /**
     * Populate the UI based on the latency test's results.
     * @param result The latency test results.
     */
    handleTestResult(result) {
        _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.Log(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), result.toString(), 6);
        /**
         * Check we have results, NaN would mean that UE version we talk to doesn't support our test
         */
        if (isNaN(result.dataChannelRtt)) {
            this.latencyTestResultsElement.innerHTML = '<div>Not supported</div>';
            return;
        }
        let latencyStatsInnerHTML = '';
        latencyStatsInnerHTML +=
            '<div>Data channel RTT (ms): ' +
                result.dataChannelRtt +
                '</div>';
        /**
         * Separate path time discovery works only when UE and Player clocks have been synchronized.
         */
        if (result.playerToStreamerTime >= 0 && result.streamerToPlayerTime >= 0) {
            latencyStatsInnerHTML +=
                '<div>Player to Streamer path (ms): ' + result.playerToStreamerTime + '</div>';
            latencyStatsInnerHTML +=
                '<div>Streamer to Player path (ms): ' +
                    result.streamerToPlayerTime +
                    '</div>';
        }
        this.latencyTestResultsElement.innerHTML = latencyStatsInnerHTML;
        //setup button to download the detailed results
        let downloadButton = document.createElement('input');
        downloadButton.type = 'button';
        downloadButton.value = 'Download';
        downloadButton.classList.add('streamTools-button');
        downloadButton.classList.add('btn-flat');
        downloadButton.onclick = () => {
            let file = new Blob([result.exportLatencyAsCSV()], { type: 'text/plain' });
            let a = document.createElement("a"), url = URL.createObjectURL(file);
            a.href = url;
            a.download = "data_channel_latency_test_results.csv";
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        };
        this.latencyTestResultsElement.appendChild(downloadButton);
    }
    handleTestStart() {
        this.latencyTestResultsElement.innerHTML =
            '<div>Test in progress</div>';
    }
}


/***/ }),

/***/ "./src/UI/FullscreenIcon.ts":
/*!**********************************!*\
  !*** ./src/UI/FullscreenIcon.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FullScreenIcon": () => (/* binding */ FullScreenIcon),
/* harmony export */   "FullScreenIconBase": () => (/* binding */ FullScreenIconBase),
/* harmony export */   "FullScreenIconExternal": () => (/* binding */ FullScreenIconExternal)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * Base class for an element (i.e. button) that, when clicked, will toggle fullscreen of a given element.
 * Can be initialized with any HTMLElement, if it is set as rootElement in the constructor.
 */
class FullScreenIconBase {
    get rootElement() {
        return this._rootElement;
    }
    set rootElement(element) {
        element.onclick = () => this.toggleFullscreen();
        this._rootElement = element;
    }
    constructor() {
        this.isFullscreen = false;
        // set up the full screen events
        document.addEventListener('webkitfullscreenchange', () => this.onFullscreenChange(), false);
        document.addEventListener('mozfullscreenchange', () => this.onFullscreenChange(), false);
        document.addEventListener('fullscreenchange', () => this.onFullscreenChange(), false);
        document.addEventListener('MSFullscreenChange', () => this.onFullscreenChange(), false);
    }
    /**
     * Makes the document or fullscreenElement fullscreen.
     */
    toggleFullscreen() {
        // if already full screen; exit
        // else go fullscreen
        if (document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        else {
            const element = this.fullscreenElement;
            if (!element) {
                return;
            }
            if (element.requestFullscreen) {
                element.requestFullscreen();
            }
            else if (element.mozRequestFullscreen) {
                element.mozRequestFullscreen();
            }
            else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
            else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
            else if (element.webkitEnterFullscreen) {
                element.webkitEnterFullscreen(); //for iphone this code worked
            }
        }
        this.onFullscreenChange();
    }
    /**
     * Handles the fullscreen button on change
     */
    onFullscreenChange() {
        this.isFullscreen =
            document.webkitIsFullScreen ||
                document.mozFullScreen ||
                (document.msFullscreenElement &&
                    document.msFullscreenElement !== null) ||
                (document.fullscreenElement && document.fullscreenElement !== null);
    }
}
/**
 * An implementation of FullScreenIconBase that uses an externally
 * provided HTMLElement for toggling full screen.
 */
class FullScreenIconExternal extends FullScreenIconBase {
    constructor(externalButton) {
        super();
        this.rootElement = externalButton;
    }
}
/**
 * The default fullscreen icon that contains a button and svgs for each state.
 */
class FullScreenIcon extends FullScreenIconBase {
    constructor() {
        super();
        const createdButton = document.createElement('button');
        createdButton.type = 'button';
        createdButton.classList.add('UiTool');
        createdButton.id = 'fullscreen-btn';
        createdButton.appendChild(this.maximizeIcon);
        createdButton.appendChild(this.minimizeIcon);
        createdButton.appendChild(this.tooltipText);
        this.rootElement = createdButton;
    }
    get tooltipText() {
        if (!this._tooltipText) {
            this._tooltipText = document.createElement('span');
            this._tooltipText.classList.add('tooltiptext');
            this._tooltipText.innerHTML = 'Fullscreen';
        }
        return this._tooltipText;
    }
    get maximizeIcon() {
        if (!this._maximizeIcon) {
            this._maximizeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this._maximizeIcon.setAttributeNS(null, 'id', 'maximizeIcon');
            this._maximizeIcon.setAttributeNS(null, 'x', '0px');
            this._maximizeIcon.setAttributeNS(null, 'y', '0px');
            this._maximizeIcon.setAttributeNS(null, 'viewBox', '0 0 384.97 384.97');
            // create svg group for the paths
            const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgGroup.classList.add('svgIcon');
            this._maximizeIcon.appendChild(svgGroup);
            // create paths for the icon itself, one for each corner
            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttributeNS(null, 'd', 'M384.97,12.03c0-6.713-5.317-12.03-12.03-12.03H264.847c-6.833,0-11.922,5.39-11.934,12.223c0,6.821,5.101,11.838,11.934,11.838h96.062l-0.193,96.519c0,6.833,5.197,12.03,12.03,12.03c6.833-0.012,12.03-5.197,12.03-12.03l0.193-108.369c0-0.036-0.012-0.06-0.012-0.084C384.958,12.09,384.97,12.066,384.97,12.03z');
            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttributeNS(null, 'd', 'M120.496,0H12.403c-0.036,0-0.06,0.012-0.096,0.012C12.283,0.012,12.247,0,12.223,0C5.51,0,0.192,5.317,0.192,12.03L0,120.399c0,6.833,5.39,11.934,12.223,11.934c6.821,0,11.838-5.101,11.838-11.934l0.192-96.339h96.242c6.833,0,12.03-5.197,12.03-12.03C132.514,5.197,127.317,0,120.496,0z');
            const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path3.setAttributeNS(null, 'd', 'M120.123,360.909H24.061v-96.242c0-6.833-5.197-12.03-12.03-12.03S0,257.833,0,264.667v108.092c0,0.036,0.012,0.06,0.012,0.084c0,0.036-0.012,0.06-0.012,0.096c0,6.713,5.317,12.03,12.03,12.03h108.092c6.833,0,11.922-5.39,11.934-12.223C132.057,365.926,126.956,360.909,120.123,360.909z');
            const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path4.setAttributeNS(null, 'd', 'M372.747,252.913c-6.833,0-11.85,5.101-11.838,11.934v96.062h-96.242c-6.833,0-12.03,5.197-12.03,12.03s5.197,12.03,12.03,12.03h108.092c0.036,0,0.06-0.012,0.084-0.012c0.036-0.012,0.06,0.012,0.096,0.012c6.713,0,12.03-5.317,12.03-12.03V264.847C384.97,258.014,379.58,252.913,372.747,252.913z');
            svgGroup.appendChild(path1);
            svgGroup.appendChild(path2);
            svgGroup.appendChild(path3);
            svgGroup.appendChild(path4);
        }
        return this._maximizeIcon;
    }
    get minimizeIcon() {
        if (!this._minimizeIcon) {
            this._minimizeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this._minimizeIcon.setAttributeNS(null, 'id', 'minimizeIcon');
            this._minimizeIcon.setAttributeNS(null, 'x', '0px');
            this._minimizeIcon.setAttributeNS(null, 'y', '0px');
            this._minimizeIcon.setAttributeNS(null, 'viewBox', '0 0 385.331 385.331');
            // create svg group for the paths
            const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgGroup.classList.add('svgIcon');
            this._minimizeIcon.appendChild(svgGroup);
            // create paths for the icon itself, one for each corner
            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttributeNS(null, 'd', 'M264.943,156.665h108.273c6.833,0,11.934-5.39,11.934-12.211c0-6.833-5.101-11.85-11.934-11.838h-96.242V36.181c0-6.833-5.197-12.03-12.03-12.03s-12.03,5.197-12.03,12.03v108.273c0,0.036,0.012,0.06,0.012,0.084c0,0.036-0.012,0.06-0.012,0.096C252.913,151.347,258.23,156.677,264.943,156.665z');
            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttributeNS(null, 'd', 'M120.291,24.247c-6.821,0-11.838,5.113-11.838,11.934v96.242H12.03c-6.833,0-12.03,5.197-12.03,12.03c0,6.833,5.197,12.03,12.03,12.03h108.273c0.036,0,0.06-0.012,0.084-0.012c0.036,0,0.06,0.012,0.096,0.012c6.713,0,12.03-5.317,12.03-12.03V36.181C132.514,29.36,127.124,24.259,120.291,24.247z');
            const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path3.setAttributeNS(null, 'd', 'M120.387,228.666H12.115c-6.833,0.012-11.934,5.39-11.934,12.223c0,6.833,5.101,11.85,11.934,11.838h96.242v96.423c0,6.833,5.197,12.03,12.03,12.03c6.833,0,12.03-5.197,12.03-12.03V240.877c0-0.036-0.012-0.06-0.012-0.084c0-0.036,0.012-0.06,0.012-0.096C132.418,233.983,127.1,228.666,120.387,228.666z');
            const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path4.setAttributeNS(null, 'd', 'M373.3,228.666H265.028c-0.036,0-0.06,0.012-0.084,0.012c-0.036,0-0.06-0.012-0.096-0.012c-6.713,0-12.03,5.317-12.03,12.03v108.273c0,6.833,5.39,11.922,12.223,11.934c6.821,0.012,11.838-5.101,11.838-11.922v-96.242H373.3c6.833,0,12.03-5.197,12.03-12.03S380.134,228.678,373.3,228.666z');
            svgGroup.appendChild(path1);
            svgGroup.appendChild(path2);
            svgGroup.appendChild(path3);
            svgGroup.appendChild(path4);
        }
        return this._minimizeIcon;
    }
    onFullscreenChange() {
        super.onFullscreenChange();
        const minimize = this.minimizeIcon;
        const maximize = this.maximizeIcon;
        if (this.isFullscreen) {
            minimize.style.display = 'inline';
            //ios disappearing svg fix
            minimize.style.transform = 'translate(0, 0)';
            maximize.style.display = 'none';
        }
        else {
            minimize.style.display = 'none';
            maximize.style.display = 'inline';
            //ios disappearing svg fix
            maximize.style.transform = 'translate(0, 0)';
        }
    }
}


/***/ }),

/***/ "./src/UI/LabelledButton.ts":
/*!**********************************!*\
  !*** ./src/UI/LabelledButton.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LabelledButton": () => (/* binding */ LabelledButton)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * A button with a text label beside it.
 */
class LabelledButton {
    constructor(label, buttonText) {
        this._label = label;
        this._buttonText = buttonText;
    }
    /**
     * Add a click listener to the button element.
     */
    addOnClickListener(onClickFunc) {
        this.button.addEventListener('click', onClickFunc);
    }
    /**
     * Get the HTMLInputElement for the button.
     */
    get button() {
        if (!this._button) {
            this._button = document.createElement('input');
            this._button.type = 'button';
            this._button.value = this._buttonText;
            this._button.classList.add('overlay-button');
            this._button.classList.add('btn-flat');
        }
        return this._button;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            // create root div with "setting" css class
            this._rootElement = document.createElement('div');
            this._rootElement.classList.add('setting');
            // create div element to contain our setting's text
            const settingsTextElem = document.createElement('div');
            settingsTextElem.innerText = this._label;
            this._rootElement.appendChild(settingsTextElem);
            // create label element to wrap out input type
            const wrapperLabel = document.createElement('label');
            wrapperLabel.classList.add('btn-overlay');
            this._rootElement.appendChild(wrapperLabel);
            wrapperLabel.appendChild(this.button);
        }
        return this._rootElement;
    }
}


/***/ }),

/***/ "./src/UI/LatencyTest.ts":
/*!*******************************!*\
  !*** ./src/UI/LatencyTest.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LatencyTest": () => (/* binding */ LatencyTest)
/* harmony export */ });
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.4 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.4");
// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Latency test UI elements and results handling.
 */
class LatencyTest {
    /**
     * Get the the button containing the stats icon.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('section');
            this._rootElement.classList.add('settingsContainer');
            // make heading
            const heading = document.createElement('div');
            heading.id = 'latencyTestHeader';
            heading.classList.add('settings-text');
            heading.classList.add('settingsHeader');
            this._rootElement.appendChild(heading);
            const headingText = document.createElement('div');
            headingText.innerHTML = 'Latency Test';
            heading.appendChild(headingText);
            heading.appendChild(this.latencyTestButton);
            // make test results element
            const resultsParentElem = document.createElement('div');
            resultsParentElem.id = 'latencyTestContainer';
            resultsParentElem.classList.add('d-none');
            this._rootElement.appendChild(resultsParentElem);
            resultsParentElem.appendChild(this.latencyTestResultsElement);
        }
        return this._rootElement;
    }
    get latencyTestResultsElement() {
        if (!this._latencyTestResultsElement) {
            this._latencyTestResultsElement = document.createElement('div');
            this._latencyTestResultsElement.id = 'latencyStatsResults';
            this._latencyTestResultsElement.classList.add('StatsResult');
        }
        return this._latencyTestResultsElement;
    }
    get latencyTestButton() {
        if (!this._latencyTestButton) {
            this._latencyTestButton = document.createElement('input');
            this._latencyTestButton.type = 'button';
            this._latencyTestButton.value = 'Run Test';
            this._latencyTestButton.id = 'btn-start-latency-test';
            this._latencyTestButton.classList.add('streamTools-button');
            this._latencyTestButton.classList.add('btn-flat');
        }
        return this._latencyTestButton;
    }
    /**
     * Populate the UI based on the latency test's results.
     * @param latencyTimings The latency test results.
     */
    handleTestResult(latencyTimings) {
        _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.Log(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), latencyTimings.toString(), 6);
        let latencyStatsInnerHTML = '';
        latencyStatsInnerHTML +=
            '<div>Net latency RTT (ms): ' +
                latencyTimings.networkLatency +
                '</div>';
        latencyStatsInnerHTML +=
            '<div>UE Encode (ms): ' + latencyTimings.EncodeMs + '</div>';
        latencyStatsInnerHTML +=
            '<div>UE Capture (ms): ' +
                latencyTimings.CaptureToSendMs +
                '</div>';
        latencyStatsInnerHTML +=
            '<div>Browser send latency (ms): ' +
                latencyTimings.browserSendLatency +
                '</div>';
        latencyStatsInnerHTML +=
            latencyTimings.frameDisplayDeltaTimeMs &&
                latencyTimings.browserReceiptTimeMs
                ? '<div>Browser receive latency (ms): ' +
                    latencyTimings.frameDisplayDeltaTimeMs +
                    '</div>'
                : '';
        latencyStatsInnerHTML +=
            '<div>Total latency (excluding browser) (ms): ' +
                latencyTimings.latencyExcludingDecode +
                '</div>';
        latencyStatsInnerHTML += latencyTimings.endToEndLatency
            ? '<div>Total latency (ms): ' +
                latencyTimings.endToEndLatency +
                '</div>'
            : '';
        this.latencyTestResultsElement.innerHTML = latencyStatsInnerHTML;
    }
}


/***/ }),

/***/ "./src/UI/SettingsIcon.ts":
/*!********************************!*\
  !*** ./src/UI/SettingsIcon.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsIcon": () => (/* binding */ SettingsIcon)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * Settings icon that can be clicked.
 */
class SettingsIcon {
    /**
     * Get the the button containing the settings icon.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('button');
            this._rootElement.type = 'button';
            this._rootElement.classList.add('UiTool');
            this._rootElement.id = 'settingsBtn';
            this._rootElement.appendChild(this.settingsIcon);
            this._rootElement.appendChild(this.tooltipText);
        }
        return this._rootElement;
    }
    get tooltipText() {
        if (!this._tooltipText) {
            this._tooltipText = document.createElement('span');
            this._tooltipText.classList.add('tooltiptext');
            this._tooltipText.innerHTML = 'Settings';
        }
        return this._tooltipText;
    }
    get settingsIcon() {
        if (!this._settingsIcon) {
            this._settingsIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this._settingsIcon.setAttributeNS(null, 'id', 'settingsIcon');
            this._settingsIcon.setAttributeNS(null, 'x', '0px');
            this._settingsIcon.setAttributeNS(null, 'y', '0px');
            this._settingsIcon.setAttributeNS(null, 'viewBox', '0 0 478.703 478.703');
            // create svg group for the paths
            const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgGroup.classList.add('svgIcon');
            this._settingsIcon.appendChild(svgGroup);
            // create paths for the icon itself, the inner and out path of a cog
            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttributeNS(null, 'd', 'M454.2,189.101l-33.6-5.7c-3.5-11.3-8-22.2-13.5-32.6l19.8-27.7c8.4-11.8,7.1-27.9-3.2-38.1l-29.8-29.8\
			c-5.6-5.6-13-8.7-20.9-8.7c-6.2,0-12.1,1.9-17.1,5.5l-27.8,19.8c-10.8-5.7-22.1-10.4-33.8-13.9l-5.6-33.2\
			c-2.4-14.3-14.7-24.7-29.2-24.7h-42.1c-14.5,0-26.8,10.4-29.2,24.7l-5.8,34c-11.2,3.5-22.1,8.1-32.5,13.7l-27.5-19.8\
			c-5-3.6-11-5.5-17.2-5.5c-7.9,0-15.4,3.1-20.9,8.7l-29.9,29.8c-10.2,10.2-11.6,26.3-3.2,38.1l20,28.1\
			c-5.5,10.5-9.9,21.4-13.3,32.7l-33.2,5.6c-14.3,2.4-24.7,14.7-24.7,29.2v42.1c0,14.5,10.4,26.8,24.7,29.2l34,5.8\
			c3.5,11.2,8.1,22.1,13.7,32.5l-19.7,27.4c-8.4,11.8-7.1,27.9,3.2,38.1l29.8,29.8c5.6,5.6,13,8.7,20.9,8.7c6.2,0,12.1-1.9,17.1-5.5\
			l28.1-20c10.1,5.3,20.7,9.6,31.6,13l5.6,33.6c2.4,14.3,14.7,24.7,29.2,24.7h42.2c14.5,0,26.8-10.4,29.2-24.7l5.7-33.6\
			c11.3-3.5,22.2-8,32.6-13.5l27.7,19.8c5,3.6,11,5.5,17.2,5.5l0,0c7.9,0,15.3-3.1,20.9-8.7l29.8-29.8c10.2-10.2,11.6-26.3,3.2-38.1\
			l-19.8-27.8c5.5-10.5,10.1-21.4,13.5-32.6l33.6-5.6c14.3-2.4,24.7-14.7,24.7-29.2v-42.1\
			C478.9,203.801,468.5,191.501,454.2,189.101z M451.9,260.401c0,1.3-0.9,2.4-2.2,2.6l-42,7c-5.3,0.9-9.5,4.8-10.8,9.9\
			c-3.8,14.7-9.6,28.8-17.4,41.9c-2.7,4.6-2.5,10.3,0.6,14.7l24.7,34.8c0.7,1,0.6,2.5-0.3,3.4l-29.8,29.8c-0.7,0.7-1.4,0.8-1.9,0.8\
			c-0.6,0-1.1-0.2-1.5-0.5l-34.7-24.7c-4.3-3.1-10.1-3.3-14.7-0.6c-13.1,7.8-27.2,13.6-41.9,17.4c-5.2,1.3-9.1,5.6-9.9,10.8l-7.1,42\
			c-0.2,1.3-1.3,2.2-2.6,2.2h-42.1c-1.3,0-2.4-0.9-2.6-2.2l-7-42c-0.9-5.3-4.8-9.5-9.9-10.8c-14.3-3.7-28.1-9.4-41-16.8\
			c-2.1-1.2-4.5-1.8-6.8-1.8c-2.7,0-5.5,0.8-7.8,2.5l-35,24.9c-0.5,0.3-1,0.5-1.5,0.5c-0.4,0-1.2-0.1-1.9-0.8l-29.8-29.8\
			c-0.9-0.9-1-2.3-0.3-3.4l24.6-34.5c3.1-4.4,3.3-10.2,0.6-14.8c-7.8-13-13.8-27.1-17.6-41.8c-1.4-5.1-5.6-9-10.8-9.9l-42.3-7.2\
			c-1.3-0.2-2.2-1.3-2.2-2.6v-42.1c0-1.3,0.9-2.4,2.2-2.6l41.7-7c5.3-0.9,9.6-4.8,10.9-10c3.7-14.7,9.4-28.9,17.1-42\
			c2.7-4.6,2.4-10.3-0.7-14.6l-24.9-35c-0.7-1-0.6-2.5,0.3-3.4l29.8-29.8c0.7-0.7,1.4-0.8,1.9-0.8c0.6,0,1.1,0.2,1.5,0.5l34.5,24.6\
			c4.4,3.1,10.2,3.3,14.8,0.6c13-7.8,27.1-13.8,41.8-17.6c5.1-1.4,9-5.6,9.9-10.8l7.2-42.3c0.2-1.3,1.3-2.2,2.6-2.2h42.1\
			c1.3,0,2.4,0.9,2.6,2.2l7,41.7c0.9,5.3,4.8,9.6,10,10.9c15.1,3.8,29.5,9.7,42.9,17.6c4.6,2.7,10.3,2.5,14.7-0.6l34.5-24.8\
			c0.5-0.3,1-0.5,1.5-0.5c0.4,0,1.2,0.1,1.9,0.8l29.8,29.8c0.9,0.9,1,2.3,0.3,3.4l-24.7,34.7c-3.1,4.3-3.3,10.1-0.6,14.7\
			c7.8,13.1,13.6,27.2,17.4,41.9c1.3,5.2,5.6,9.1,10.8,9.9l42,7.1c1.3,0.2,2.2,1.3,2.2,2.6v42.1H451.9z');
            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttributeNS(null, 'd', 'M239.4,136.001c-57,0-103.3,46.3-103.3,103.3s46.3,103.3,103.3,103.3s103.3-46.3,103.3-103.3S296.4,136.001,239.4,136.001z M239.4,315.601c-42.1,0-76.3-34.2-76.3-76.3s34.2-76.3,76.3-76.3s76.3,34.2,76.3,76.3S281.5,315.601,239.4,315.601z');
            svgGroup.appendChild(path1);
            svgGroup.appendChild(path2);
        }
        return this._settingsIcon;
    }
}


/***/ }),

/***/ "./src/UI/SettingsPanel.ts":
/*!*********************************!*\
  !*** ./src/UI/SettingsPanel.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SettingsPanel": () => (/* binding */ SettingsPanel)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * A UI component containing all the settings for the application.
 */
class SettingsPanel {
    constructor() {
        this._rootElement = null;
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'settings-panel';
            this._rootElement.classList.add('panel-wrap');
            const panelElem = document.createElement('div');
            panelElem.classList.add('panel');
            this._rootElement.appendChild(panelElem);
            const settingsHeading = document.createElement('div');
            settingsHeading.id = 'settingsHeading';
            settingsHeading.textContent = 'Settings';
            panelElem.appendChild(settingsHeading);
            panelElem.appendChild(this.settingsCloseButton);
            panelElem.appendChild(this.settingsContentElement);
        }
        return this._rootElement;
    }
    get settingsContentElement() {
        if (!this._settingsContentElement) {
            this._settingsContentElement = document.createElement('div');
            this._settingsContentElement.id = 'settingsContent';
        }
        return this._settingsContentElement;
    }
    get settingsCloseButton() {
        if (!this._settingsCloseButton) {
            this._settingsCloseButton = document.createElement('div');
            this._settingsCloseButton.id = 'settingsClose';
        }
        return this._settingsCloseButton;
    }
    /**
     * Show settings panel.
     */
    show() {
        if (!this.rootElement.classList.contains('panel-wrap-visible')) {
            this.rootElement.classList.add('panel-wrap-visible');
        }
    }
    /**
     * Toggle the visibility of the settings panel.
     */
    toggleVisibility() {
        this.rootElement.classList.toggle('panel-wrap-visible');
    }
    /**
     * Hide settings panel.
     */
    hide() {
        if (this.rootElement.classList.contains('panel-wrap-visible')) {
            this.rootElement.classList.remove('panel-wrap-visible');
        }
    }
}


/***/ }),

/***/ "./src/UI/StatsIcon.ts":
/*!*****************************!*\
  !*** ./src/UI/StatsIcon.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StatsIcon": () => (/* binding */ StatsIcon)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * Stats icon that can be clicked.
 */
class StatsIcon {
    /**
     * Get the the button containing the stats icon.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('button');
            this._rootElement.type = 'button';
            this._rootElement.classList.add('UiTool');
            this._rootElement.id = 'statsBtn';
            this._rootElement.appendChild(this.statsIcon);
            this._rootElement.appendChild(this.tooltipText);
        }
        return this._rootElement;
    }
    get tooltipText() {
        if (!this._tooltipText) {
            this._tooltipText = document.createElement('span');
            this._tooltipText.classList.add('tooltiptext');
            this._tooltipText.innerHTML = 'Information';
        }
        return this._tooltipText;
    }
    get statsIcon() {
        if (!this._statsIcon) {
            this._statsIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this._statsIcon.setAttributeNS(null, 'id', 'statsIcon');
            this._statsIcon.setAttributeNS(null, 'x', '0px');
            this._statsIcon.setAttributeNS(null, 'y', '0px');
            this._statsIcon.setAttributeNS(null, 'viewBox', '0 0 330 330');
            // create svg group for the paths
            const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgGroup.classList.add('svgIcon');
            this._statsIcon.appendChild(svgGroup);
            // create paths for the icon itself, the inner and out path of a cog
            const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path1.setAttributeNS(null, 'd', 'M165,0.008C74.019,0.008,0,74.024,0,164.999c0,90.977,74.019,164.992,165,164.992s165-74.015,165-164.992C330,74.024,255.981,0.008,165,0.008z M165,299.992c-74.439,0-135-60.557-135-134.992S90.561,30.008,165,30.008s135,60.557,135,134.991C300,239.436,239.439,299.992,165,299.992z');
            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttributeNS(null, 'd', 'M165,130.008c-8.284,0-15,6.716-15,15v99.983c0,8.284,6.716,15,15,15s15-6.716,15-15v-99.983C180,136.725,173.284,130.008,165,130.008z');
            const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path3.setAttributeNS(null, 'd', 'M165,70.011c-3.95,0-7.811,1.6-10.61,4.39c-2.79,2.79-4.39,6.66-4.39,10.61s1.6,7.81,4.39,10.61c2.79,2.79,6.66,4.39,10.61,4.39s7.81-1.6,10.609-4.39c2.79-2.8,4.391-6.66,4.391-10.61s-1.601-7.82-4.391-10.61C172.81,71.61,168.95,70.011,165,70.011z');
            svgGroup.appendChild(path1);
            svgGroup.appendChild(path2);
            svgGroup.appendChild(path3);
        }
        return this._statsIcon;
    }
}


/***/ }),

/***/ "./src/UI/StatsPanel.ts":
/*!******************************!*\
  !*** ./src/UI/StatsPanel.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Stat": () => (/* binding */ Stat),
/* harmony export */   "StatsPanel": () => (/* binding */ StatsPanel)
/* harmony export */ });
/* harmony import */ var _LatencyTest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LatencyTest */ "./src/UI/LatencyTest.ts");
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @epicgames-ps/lib-pixelstreamingfrontend-ue5.4 */ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.4");
/* harmony import */ var _Util_MathUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Util/MathUtils */ "./src/Util/MathUtils.ts");
/* harmony import */ var _DataChannelLatencyTest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataChannelLatencyTest */ "./src/UI/DataChannelLatencyTest.ts");
// Copyright Epic Games, Inc. All Rights Reserved.




/**
 * A stat structure, an id, the stat string, and the element where it is rendered.
 */
class Stat {
}
/**
 * A UI component containing all the stats for the application.
 */
class StatsPanel {
    constructor() {
        /* A map stats we are storing/rendering */
        this.statsMap = new Map();
        this.latencyTest = new _LatencyTest__WEBPACK_IMPORTED_MODULE_1__.LatencyTest();
        this.dataChannelLatencyTest = new _DataChannelLatencyTest__WEBPACK_IMPORTED_MODULE_2__.DataChannelLatencyTest();
    }
    /**
     * @returns Return or creates a HTML element that represents this setting in the DOM.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'stats-panel';
            this._rootElement.classList.add('panel-wrap');
            const panelElem = document.createElement('div');
            panelElem.classList.add('panel');
            this._rootElement.appendChild(panelElem);
            const statsHeading = document.createElement('div');
            statsHeading.id = 'statsHeading';
            statsHeading.textContent = 'Information';
            panelElem.appendChild(statsHeading);
            panelElem.appendChild(this.statsCloseButton);
            panelElem.appendChild(this.statsContentElement);
        }
        return this._rootElement;
    }
    get statsContentElement() {
        if (!this._statsContentElement) {
            this._statsContentElement = document.createElement('div');
            this._statsContentElement.id = 'statsContent';
            const streamToolStats = document.createElement('div');
            streamToolStats.id = 'streamToolsStats';
            streamToolStats.classList.add('container');
            const controlStats = document.createElement('div');
            controlStats.id = 'ControlStats';
            controlStats.classList.add('row');
            const statistics = document.createElement('section');
            statistics.id = 'statistics';
            statistics.classList.add('settingsContainer');
            const statisticsHeader = document.createElement('div');
            statisticsHeader.id = 'statisticsHeader';
            statisticsHeader.classList.add('settings-text');
            statisticsHeader.classList.add('settingsHeader');
            const sessionStats = document.createElement('div');
            sessionStats.innerHTML = 'Session Stats';
            this._statsContentElement.appendChild(streamToolStats);
            streamToolStats.appendChild(controlStats);
            controlStats.appendChild(statistics);
            statistics.appendChild(statisticsHeader);
            statisticsHeader.appendChild(sessionStats);
            statistics.appendChild(this.statisticsContainer);
            controlStats.appendChild(this.latencyTest.rootElement);
            controlStats.appendChild(this.dataChannelLatencyTest.rootElement);
        }
        return this._statsContentElement;
    }
    get statisticsContainer() {
        if (!this._statisticsContainer) {
            this._statisticsContainer = document.createElement('div');
            this._statisticsContainer.id = 'statisticsContainer';
            this._statisticsContainer.classList.add('d-none');
            this._statisticsContainer.appendChild(this.statsResult);
        }
        return this._statisticsContainer;
    }
    get statsResult() {
        if (!this._statsResult) {
            this._statsResult = document.createElement('div');
            this._statsResult.id = 'statisticsResult';
            this._statsResult.classList.add('StatsResult');
        }
        return this._statsResult;
    }
    get statsCloseButton() {
        if (!this._statsCloseButton) {
            this._statsCloseButton = document.createElement('div');
            this._statsCloseButton.id = 'statsClose';
        }
        return this._statsCloseButton;
    }
    onDisconnect() {
        this.latencyTest.latencyTestButton.onclick = () => {
            // do nothing
        };
        this.dataChannelLatencyTest.latencyTestButton.onclick = () => {
            //do nothing
        };
    }
    onVideoInitialized(stream) {
        // starting a latency check
        this.latencyTest.latencyTestButton.onclick = () => {
            stream.requestLatencyTest();
        };
        this.dataChannelLatencyTest.latencyTestButton.onclick = () => {
            let started = stream.requestDataChannelLatencyTest({
                duration: 1000,
                rps: 10,
                requestSize: 200,
                responseSize: 200
            });
            if (started) {
                this.dataChannelLatencyTest.handleTestStart();
            }
        };
    }
    configure(settings) {
        if (settings.DisableLatencyTest) {
            this.latencyTest.latencyTestButton.disabled = true;
            this.latencyTest.latencyTestButton.title =
                'Disabled by -PixelStreamingDisableLatencyTester=true';
            this.dataChannelLatencyTest.latencyTestButton.disabled = true;
            this.dataChannelLatencyTest.latencyTestButton.title =
                'Disabled by -PixelStreamingDisableLatencyTester=true';
            _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.Info(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), '-PixelStreamingDisableLatencyTester=true, requesting latency report from the the browser to UE is disabled.');
        }
    }
    /**
     * Show stats panel.
     */
    show() {
        if (!this.rootElement.classList.contains('panel-wrap-visible')) {
            this.rootElement.classList.add('panel-wrap-visible');
        }
    }
    /**
     * Toggle the visibility of the stats panel.
     */
    toggleVisibility() {
        this.rootElement.classList.toggle('panel-wrap-visible');
    }
    /**
     * Hide the stats panel.
     */
    hide() {
        if (this.rootElement.classList.contains('panel-wrap-visible')) {
            this.rootElement.classList.remove('panel-wrap-visible');
        }
    }
    handlePlayerCount(playerCount) {
        this.addOrUpdateStat('PlayerCountStat', 'Players', playerCount.toString());
    }
    /**
     * Handle stats coming in from browser/UE
     * @param stats the stats structure
     */
    handleStats(stats) {
        var _a, _b, _c, _d, _e;
        // format numbering based on the browser language
        const numberFormat = new Intl.NumberFormat(window.navigator.language, {
            maximumFractionDigits: 0
        });
        // Inbound data
        const inboundData = _Util_MathUtils__WEBPACK_IMPORTED_MODULE_3__.MathUtils.formatBytes(stats.inboundVideoStats.bytesReceived, 2);
        this.addOrUpdateStat('InboundDataStat', 'Received', inboundData);
        // Packets lost
        const packetsLostStat = Object.prototype.hasOwnProperty.call(stats.inboundVideoStats, 'packetsLost')
            ? numberFormat.format(stats.inboundVideoStats.packetsLost)
            : 'Chrome only';
        this.addOrUpdateStat('PacketsLostStat', 'Packets Lost', packetsLostStat);
        // Bitrate
        if (stats.inboundVideoStats.bitrate) {
            this.addOrUpdateStat('VideoBitrateStat', 'Video Bitrate (kbps)', stats.inboundVideoStats.bitrate.toString());
        }
        if (stats.inboundAudioStats.bitrate) {
            this.addOrUpdateStat('AudioBitrateStat', 'Audio Bitrate (kbps)', stats.inboundAudioStats.bitrate.toString());
        }
        // Video resolution
        const resStat = Object.prototype.hasOwnProperty.call(stats.inboundVideoStats, 'frameWidth') &&
            stats.inboundVideoStats.frameWidth &&
            Object.prototype.hasOwnProperty.call(stats.inboundVideoStats, 'frameHeight') &&
            stats.inboundVideoStats.frameHeight
            ? stats.inboundVideoStats.frameWidth +
                'x' +
                stats.inboundVideoStats.frameHeight
            : 'Chrome only';
        this.addOrUpdateStat('VideoResStat', 'Video resolution', resStat);
        // Frames decoded
        const framesDecoded = Object.prototype.hasOwnProperty.call(stats.inboundVideoStats, 'framesDecoded')
            ? numberFormat.format(stats.inboundVideoStats.framesDecoded)
            : 'Chrome only';
        this.addOrUpdateStat('FramesDecodedStat', 'Frames Decoded', framesDecoded);
        // Framerate
        if (stats.inboundVideoStats.framesPerSecond) {
            this.addOrUpdateStat('FramerateStat', 'Framerate', stats.inboundVideoStats.framesPerSecond.toString());
        }
        // Frames dropped
        this.addOrUpdateStat('FramesDroppedStat', 'Frames dropped', (_a = stats.inboundVideoStats.framesDropped) === null || _a === void 0 ? void 0 : _a.toString());
        if (stats.inboundVideoStats.codecId) {
            this.addOrUpdateStat('VideoCodecStat', 'Video codec', 
            // Split the codec to remove the Fmtp line
            (_c = (_b = stats.codecs
                .get(stats.inboundVideoStats.codecId)) === null || _b === void 0 ? void 0 : _b.split(' ')[0]) !== null && _c !== void 0 ? _c : '');
        }
        if (stats.inboundAudioStats.codecId) {
            this.addOrUpdateStat('AudioCodecStat', 'Audio codec', 
            // Split the codec to remove the Fmtp line
            (_e = (_d = stats.codecs
                .get(stats.inboundAudioStats.codecId)) === null || _d === void 0 ? void 0 : _d.split(' ')[0]) !== null && _e !== void 0 ? _e : '');
        }
        // Store the active candidate pair return a new Candidate pair stat if getActiveCandidate is null
        let activeCandidatePair = stats.getActiveCandidatePair() != null ? stats.getActiveCandidatePair() : new _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.CandidatePairStats();
        // RTT
        const netRTT = Object.prototype.hasOwnProperty.call(activeCandidatePair, 'currentRoundTripTime') && stats.isNumber(activeCandidatePair.currentRoundTripTime)
            ? numberFormat.format(activeCandidatePair.currentRoundTripTime * 1000)
            : "Can't calculate";
        this.addOrUpdateStat('RTTStat', 'Net RTT (ms)', netRTT);
        this.addOrUpdateStat('DurationStat', 'Duration', stats.sessionStats.runTime);
        this.addOrUpdateStat('ControlsInputStat', 'Controls stream input', stats.sessionStats.controlsStreamInput);
        // QP
        this.addOrUpdateStat('QPStat', 'Video quantization parameter', stats.sessionStats.videoEncoderAvgQP.toString());
        // todo:
        //statsText += `<div>Browser receive to composite (ms): ${stats.inboundVideoStats.receiveToCompositeMs}</div>`;
        _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.Log(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__.Logger.GetStackTrace(), `--------- Stats ---------\n ${stats}\n------------------------`, 6);
    }
    /**
     * Adds a new stat to the stats results in the DOM or updates an exiting stat.
     * @param id The id of the stat to add/update.
     * @param stat The contents of the stat.
     */
    addOrUpdateStat(id, statLabel, stat) {
        const statHTML = `${statLabel}: ${stat}`;
        if (!this.statsMap.has(id)) {
            // create the stat
            const newStat = new Stat();
            newStat.id = id;
            newStat.stat = stat;
            newStat.title = statLabel;
            newStat.element = document.createElement('div');
            newStat.element.innerHTML = statHTML;
            // add the stat to the dom
            this.statsResult.appendChild(newStat.element);
            this.statsMap.set(id, newStat);
        }
        // update the existing stat
        else {
            const value = this.statsMap.get(id);
            if (value !== undefined) {
                value.element.innerHTML = statHTML;
            }
        }
    }
}


/***/ }),

/***/ "./src/UI/UIConfigurationTypes.ts":
/*!****************************************!*\
  !*** ./src/UI/UIConfigurationTypes.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UIElementCreationMode": () => (/* binding */ UIElementCreationMode),
/* harmony export */   "isPanelEnabled": () => (/* binding */ isPanelEnabled)
/* harmony export */ });
/** Whether a stream UI element is internally made, externally provided, or disabled. */
var UIElementCreationMode;
(function (UIElementCreationMode) {
    UIElementCreationMode[UIElementCreationMode["CreateDefaultElement"] = 0] = "CreateDefaultElement";
    UIElementCreationMode[UIElementCreationMode["UseCustomElement"] = 1] = "UseCustomElement";
    UIElementCreationMode[UIElementCreationMode["Disable"] = 2] = "Disable";
})(UIElementCreationMode || (UIElementCreationMode = {}));
function isPanelEnabled(config) {
    return !config || (!!config && config.isEnabled);
}


/***/ }),

/***/ "./src/UI/VideoQpIndicator.ts":
/*!************************************!*\
  !*** ./src/UI/VideoQpIndicator.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoQpIndicator": () => (/* binding */ VideoQpIndicator)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * A UI element showing the QP (quantization parameter) of the video stream at the last encoded frame (well, last transmitted QP really).
 * A blockier encoding will have a higher QP and this will make the indicator turn more red.
 * A non-blocky stream will have a lower QP and this will make the indicator turn more green.
 * The QP indicator is represented visually using a WiFi icon.
 */
class VideoQpIndicator {
    constructor() {
        this.videoEncoderAvgQP = -1;
        // non html elements
        this.statsText = '';
        this.color = '';
        // qp colors
        this.orangeQP = 26;
        this.redQP = 35;
    }
    /**
     * Get the root element of the QP indicator.
     */
    get rootElement() {
        if (!this._rootElement) {
            // make the root element that contains the svg for the connection
            this._rootElement = document.createElement('div');
            this._rootElement.id = 'connection';
            this._rootElement.classList.add('UiTool');
            // add svg icon for the connection strength
            this._rootElement.appendChild(this.qualityStatus);
            // add the text underneath the connection
            this._rootElement.appendChild(this.qualityText);
            // set colors to not connected initially
            this.updateQpTooltip(-1);
        }
        return this._rootElement;
    }
    /**
     * Get the text that displays under the icon.
     */
    get qualityText() {
        if (!this._qualityText) {
            this._qualityText = document.createElement('span');
            this._qualityText.id = 'qualityText';
            this._qualityText.classList.add('tooltiptext');
        }
        return this._qualityText;
    }
    /**
     * Get the icon.
     */
    get qualityStatus() {
        if (!this._qualityStatus) {
            this._qualityStatus = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this._qualityStatus.setAttributeNS(null, 'id', 'connectionStrength');
            this._qualityStatus.setAttributeNS(null, 'x', '0px');
            this._qualityStatus.setAttributeNS(null, 'y', '0px');
            this._qualityStatus.setAttributeNS(null, 'viewBox', '0 0 494.45 494.45');
            // build wifi icon
            this.qualityStatus.appendChild(this.dot);
            this.qualityStatus.appendChild(this.middle);
            this.qualityStatus.appendChild(this.outer);
            this.qualityStatus.appendChild(this.inner);
        }
        return this._qualityStatus;
    }
    /**
     * Get the dot at the bottom of the wifi icon.
     */
    get dot() {
        if (!this._dot) {
            this._dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            this._dot.setAttributeNS(null, 'id', 'dot');
            this._dot.setAttributeNS(null, 'cx', '247.125');
            this._dot.setAttributeNS(null, 'cy', '398.925');
            this._dot.setAttributeNS(null, 'r', '35.3');
        }
        return this._dot;
    }
    /**
     * Get the outer arc of the wifi icon.
     */
    get outer() {
        if (!this._outer) {
            this._outer = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this._outer.setAttributeNS(null, 'id', 'outer');
            this._outer.setAttributeNS(null, 'd', 'M467.925,204.625c-6.8,0-13.5-2.6-18.7-7.8c-111.5-111.4-292.7-111.4-404.1,0c-10.3,10.3-27.1,10.3-37.4,0s-10.3-27.1,0-37.4c64-64,149-99.2,239.5-99.2s175.5,35.2,239.5,99.2c10.3,10.3,10.3,27.1,0,37.4C481.425,202.025,474.625,204.625,467.925,204.625z');
        }
        return this._outer;
    }
    /**
     * Get the middle arc of the wifi icon.
     */
    get middle() {
        if (!this._middle) {
            this._middle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this._middle.setAttributeNS(null, 'id', 'middle');
            this._middle.setAttributeNS(null, 'd', 'M395.225,277.325c-6.8,0-13.5-2.6-18.7-7.8c-71.4-71.3-187.4-71.3-258.8,0c-10.3,10.3-27.1,10.3-37.4,0s-10.3-27.1,0-37.4c92-92,241.6-92,333.6,0c10.3,10.3,10.3,27.1,0,37.4C408.725,274.725,401.925,277.325,395.225,277.325z');
        }
        return this._middle;
    }
    /**
     * Get the inner arc of the wifi icon.
     */
    get inner() {
        if (!this._inner) {
            this._inner = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            this._inner.setAttributeNS(null, 'id', 'inner');
            this._inner.setAttributeNS(null, 'd', 'M323.625,348.825c-6.8,0-13.5-2.6-18.7-7.8c-15.4-15.4-36-23.9-57.8-23.9s-42.4,8.5-57.8,23.9c-10.3,10.3-27.1,10.3-37.4,0c-10.3-10.3-10.3-27.1,0-37.4c25.4-25.4,59.2-39.4,95.2-39.4s69.8,14,95.2,39.5c10.3,10.3,10.3,27.1,0,37.4C337.225,346.225,330.425,348.825,323.625,348.825z');
        }
        return this._inner;
    }
    /**
     * Used to set the speed of the status light.
     * @param speed - Set the speed of the blink, higher numbers make the status light blink faster.
     */
    blinkVideoQualityStatus(speed) {
        let iteration = speed;
        let opacity = 1;
        const tickID = setInterval(() => {
            opacity -= 0.1;
            this.qualityText.style.opacity = String(Math.abs((opacity - 0.5) * 2));
            if (opacity <= 0.1) {
                if (--iteration == 0) {
                    clearInterval(tickID);
                }
                else {
                    opacity = 1;
                }
            }
        }, 100 / speed);
    }
    /**
     * updates the QP tooltip by converting the Video Encoder QP to a color light
     * @param QP - The video encoder QP number needed to find the average
     */
    updateQpTooltip(QP) {
        this.videoEncoderAvgQP = QP;
        if (QP > this.redQP) {
            this.color = 'red';
            this.blinkVideoQualityStatus(2);
            this.statsText = `<div style="color: ${this.color}">Poor encoding quality</div>`;
            this.outer.setAttributeNS(null, 'fill', '#3c3b40');
            this.middle.setAttributeNS(null, 'fill', '#3c3b40');
            this.inner.setAttributeNS(null, 'fill', this.color);
            this.dot.setAttributeNS(null, 'fill', this.color);
        }
        else if (QP > this.orangeQP) {
            this.color = 'orange';
            this.blinkVideoQualityStatus(1);
            this.statsText = `<div style="color: ${this.color}">Blocky encoding quality</div>`;
            this.outer.setAttributeNS(null, 'fill', '#3c3b40');
            this.middle.setAttributeNS(null, 'fill', this.color);
            this.inner.setAttributeNS(null, 'fill', this.color);
            this.dot.setAttributeNS(null, 'fill', this.color);
        }
        else if (QP <= 0) {
            this.color = '#b0b0b0';
            this.outer.setAttributeNS(null, 'fill', '#3c3b40');
            this.middle.setAttributeNS(null, 'fill', '#3c3b40');
            this.inner.setAttributeNS(null, 'fill', '#3c3b40');
            this.dot.setAttributeNS(null, 'fill', '#3c3b40');
            this.statsText = `<div style="color: ${this.color}">Not connected</div>`;
        }
        else {
            this.color = 'lime';
            this.qualityStatus.style.opacity = '1';
            this.statsText = `<div style="color: ${this.color}">Clear encoding quality</div>`;
            this.outer.setAttributeNS(null, 'fill', this.color);
            this.middle.setAttributeNS(null, 'fill', this.color);
            this.inner.setAttributeNS(null, 'fill', this.color);
            this.dot.setAttributeNS(null, 'fill', this.color);
        }
        this.qualityText.innerHTML = this.statsText;
    }
}


/***/ }),

/***/ "./src/UI/XRIcon.ts":
/*!**************************!*\
  !*** ./src/UI/XRIcon.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XRIcon": () => (/* binding */ XRIcon)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * XR icon that can be clicked.
 */
class XRIcon {
    /**
     * Get the the button containing the XR icon.
     */
    get rootElement() {
        if (!this._rootElement) {
            this._rootElement = document.createElement('button');
            this._rootElement.type = 'button';
            this._rootElement.classList.add('UiTool');
            this._rootElement.id = 'xrBtn';
            this._rootElement.appendChild(this.xrIcon);
            this._rootElement.appendChild(this.tooltipText);
        }
        return this._rootElement;
    }
    get tooltipText() {
        if (!this._tooltipText) {
            this._tooltipText = document.createElement('span');
            this._tooltipText.classList.add('tooltiptext');
            this._tooltipText.innerHTML = 'XR';
        }
        return this._tooltipText;
    }
    get xrIcon() {
        if (!this._xrIcon) {
            this._xrIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this._xrIcon.setAttributeNS(null, 'id', 'xrIcon');
            this._xrIcon.setAttributeNS(null, 'x', '0px');
            this._xrIcon.setAttributeNS(null, 'y', '0px');
            this._xrIcon.setAttributeNS(null, 'viewBox', '0 0 100 100');
            // create svg group for the paths
            const svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            svgGroup.classList.add('svgIcon');
            this._xrIcon.appendChild(svgGroup);
            // create paths for the icon itself, the path of the xr headset
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttributeNS(null, 'd', 'M29 41c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 14c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm42-14c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 14c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm12-31H17c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h14.5c3.5 0 6.8-1.5 9-4.1l3.5-4c1.5-1.7 3.7-2.7 6-2.7s4.5 1 6 2.7l3.5 4c2.3 2.6 5.6 4.1 9 4.1H83c6.6 0 12-5.4 12-12V36c0-6.6-5.4-12-12-12zm8 40c0 4.4-3.6 8-8 8H68.5c-2.3 0-4.5-1-6-2.7l-3.5-4c-2.3-2.6-5.6-4.1-9-4.1-3.5 0-6.8 1.5-9 4.1l-3.5 4C36 71 33.8 72 31.5 72H17c-4.4 0-8-3.6-8-8V36c0-4.4 3.6-8 8-8h66c4.4 0 8 3.6 8 8v28z');
            svgGroup.appendChild(path);
        }
        return this._xrIcon;
    }
}


/***/ }),

/***/ "./src/Util/MathUtils.ts":
/*!*******************************!*\
  !*** ./src/Util/MathUtils.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MathUtils": () => (/* binding */ MathUtils)
/* harmony export */ });
// Copyright Epic Games, Inc. All Rights Reserved.
class MathUtils {
    /**
     * formats Bytes coming in for video stats
     * @param bytes number to convert
     * @param decimals number of decimal places
     */
    static formatBytes(bytes, decimals) {
        if (bytes === 0) {
            return '0';
        }
        const factor = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = [
            'Bytes',
            'KiB',
            'MiB',
            'GiB',
            'TiB',
            'PiB',
            'EiB',
            'ZiB',
            'YiB'
        ];
        const i = Math.floor(Math.log(bytes) / Math.log(factor));
        return (parseFloat((bytes / Math.pow(factor, i)).toFixed(dm)) +
            ' ' +
            sizes[i]);
    }
}


/***/ }),

/***/ "@epicgames-ps/lib-pixelstreamingfrontend-ue5.4":
/*!*****************************************************************!*\
  !*** external "@epicgames-ps/lib-pixelstreamingfrontend-ue5.4" ***!
  \*****************************************************************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE__epicgames_ps_lib_pixelstreamingfrontend_ue5_4_b200d8b9__;

/***/ }),

/***/ "jss":
/*!**********************!*\
  !*** external "jss" ***!
  \**********************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE_jss__;

/***/ }),

/***/ "jss-plugin-camel-case":
/*!****************************************!*\
  !*** external "jss-plugin-camel-case" ***!
  \****************************************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE_jss_plugin_camel_case_de113355__;

/***/ }),

/***/ "jss-plugin-global":
/*!************************************!*\
  !*** external "jss-plugin-global" ***!
  \************************************/
/***/ ((module) => {

var x = y => { var x = {}; __webpack_require__.d(x, y); return x; }
var y = x => () => x
module.exports = __WEBPACK_EXTERNAL_MODULE_jss_plugin_global_ef86f421__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************************!*\
  !*** ./src/pixelstreamingfrontend-ui.ts ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AFKOverlay": () => (/* reexport safe */ _Overlay_AFKOverlay__WEBPACK_IMPORTED_MODULE_2__.AFKOverlay),
/* harmony export */   "ActionOverlay": () => (/* reexport safe */ _Overlay_ActionOverlay__WEBPACK_IMPORTED_MODULE_3__.ActionOverlay),
/* harmony export */   "Application": () => (/* reexport safe */ _Application_Application__WEBPACK_IMPORTED_MODULE_0__.Application),
/* harmony export */   "ConfigUI": () => (/* reexport safe */ _Config_ConfigUI__WEBPACK_IMPORTED_MODULE_11__.ConfigUI),
/* harmony export */   "ConnectOverlay": () => (/* reexport safe */ _Overlay_ConnectOverlay__WEBPACK_IMPORTED_MODULE_5__.ConnectOverlay),
/* harmony export */   "DisconnectOverlay": () => (/* reexport safe */ _Overlay_DisconnectOverlay__WEBPACK_IMPORTED_MODULE_6__.DisconnectOverlay),
/* harmony export */   "ErrorOverlay": () => (/* reexport safe */ _Overlay_ErrorOverlay__WEBPACK_IMPORTED_MODULE_7__.ErrorOverlay),
/* harmony export */   "InfoOverlay": () => (/* reexport safe */ _Overlay_InfoOverlay__WEBPACK_IMPORTED_MODULE_8__.InfoOverlay),
/* harmony export */   "OverlayBase": () => (/* reexport safe */ _Overlay_BaseOverlay__WEBPACK_IMPORTED_MODULE_4__.OverlayBase),
/* harmony export */   "PixelStreamingApplicationStyle": () => (/* reexport safe */ _Styles_PixelStreamingApplicationStyles__WEBPACK_IMPORTED_MODULE_1__.PixelStreamingApplicationStyle),
/* harmony export */   "PlayOverlay": () => (/* reexport safe */ _Overlay_PlayOverlay__WEBPACK_IMPORTED_MODULE_9__.PlayOverlay),
/* harmony export */   "SettingUIBase": () => (/* reexport safe */ _Config_SettingUIBase__WEBPACK_IMPORTED_MODULE_12__.SettingUIBase),
/* harmony export */   "SettingUIFlag": () => (/* reexport safe */ _Config_SettingUIFlag__WEBPACK_IMPORTED_MODULE_13__.SettingUIFlag),
/* harmony export */   "SettingUINumber": () => (/* reexport safe */ _Config_SettingUINumber__WEBPACK_IMPORTED_MODULE_14__.SettingUINumber),
/* harmony export */   "SettingUIOption": () => (/* reexport safe */ _Config_SettingUIOption__WEBPACK_IMPORTED_MODULE_15__.SettingUIOption),
/* harmony export */   "SettingUIText": () => (/* reexport safe */ _Config_SettingUIText__WEBPACK_IMPORTED_MODULE_16__.SettingUIText),
/* harmony export */   "TextOverlay": () => (/* reexport safe */ _Overlay_TextOverlay__WEBPACK_IMPORTED_MODULE_10__.TextOverlay),
/* harmony export */   "UIElementCreationMode": () => (/* reexport safe */ _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_17__.UIElementCreationMode)
/* harmony export */ });
/* harmony import */ var _Application_Application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Application/Application */ "./src/Application/Application.ts");
/* harmony import */ var _Styles_PixelStreamingApplicationStyles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Styles/PixelStreamingApplicationStyles */ "./src/Styles/PixelStreamingApplicationStyles.ts");
/* harmony import */ var _Overlay_AFKOverlay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Overlay/AFKOverlay */ "./src/Overlay/AFKOverlay.ts");
/* harmony import */ var _Overlay_ActionOverlay__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Overlay/ActionOverlay */ "./src/Overlay/ActionOverlay.ts");
/* harmony import */ var _Overlay_BaseOverlay__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Overlay/BaseOverlay */ "./src/Overlay/BaseOverlay.ts");
/* harmony import */ var _Overlay_ConnectOverlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Overlay/ConnectOverlay */ "./src/Overlay/ConnectOverlay.ts");
/* harmony import */ var _Overlay_DisconnectOverlay__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Overlay/DisconnectOverlay */ "./src/Overlay/DisconnectOverlay.ts");
/* harmony import */ var _Overlay_ErrorOverlay__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Overlay/ErrorOverlay */ "./src/Overlay/ErrorOverlay.ts");
/* harmony import */ var _Overlay_InfoOverlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Overlay/InfoOverlay */ "./src/Overlay/InfoOverlay.ts");
/* harmony import */ var _Overlay_PlayOverlay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Overlay/PlayOverlay */ "./src/Overlay/PlayOverlay.ts");
/* harmony import */ var _Overlay_TextOverlay__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Overlay/TextOverlay */ "./src/Overlay/TextOverlay.ts");
/* harmony import */ var _Config_ConfigUI__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Config/ConfigUI */ "./src/Config/ConfigUI.ts");
/* harmony import */ var _Config_SettingUIBase__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Config/SettingUIBase */ "./src/Config/SettingUIBase.ts");
/* harmony import */ var _Config_SettingUIFlag__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Config/SettingUIFlag */ "./src/Config/SettingUIFlag.ts");
/* harmony import */ var _Config_SettingUINumber__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Config/SettingUINumber */ "./src/Config/SettingUINumber.ts");
/* harmony import */ var _Config_SettingUIOption__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Config/SettingUIOption */ "./src/Config/SettingUIOption.ts");
/* harmony import */ var _Config_SettingUIText__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Config/SettingUIText */ "./src/Config/SettingUIText.ts");
/* harmony import */ var _UI_UIConfigurationTypes__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./UI/UIConfigurationTypes */ "./src/UI/UIConfigurationTypes.ts");
// Copyright Epic Games, Inc. All Rights Reserved.



















})();

var __webpack_exports__AFKOverlay = __webpack_exports__.AFKOverlay;
var __webpack_exports__ActionOverlay = __webpack_exports__.ActionOverlay;
var __webpack_exports__Application = __webpack_exports__.Application;
var __webpack_exports__ConfigUI = __webpack_exports__.ConfigUI;
var __webpack_exports__ConnectOverlay = __webpack_exports__.ConnectOverlay;
var __webpack_exports__DisconnectOverlay = __webpack_exports__.DisconnectOverlay;
var __webpack_exports__ErrorOverlay = __webpack_exports__.ErrorOverlay;
var __webpack_exports__InfoOverlay = __webpack_exports__.InfoOverlay;
var __webpack_exports__OverlayBase = __webpack_exports__.OverlayBase;
var __webpack_exports__PixelStreamingApplicationStyle = __webpack_exports__.PixelStreamingApplicationStyle;
var __webpack_exports__PlayOverlay = __webpack_exports__.PlayOverlay;
var __webpack_exports__SettingUIBase = __webpack_exports__.SettingUIBase;
var __webpack_exports__SettingUIFlag = __webpack_exports__.SettingUIFlag;
var __webpack_exports__SettingUINumber = __webpack_exports__.SettingUINumber;
var __webpack_exports__SettingUIOption = __webpack_exports__.SettingUIOption;
var __webpack_exports__SettingUIText = __webpack_exports__.SettingUIText;
var __webpack_exports__TextOverlay = __webpack_exports__.TextOverlay;
var __webpack_exports__UIElementCreationMode = __webpack_exports__.UIElementCreationMode;
export { __webpack_exports__AFKOverlay as AFKOverlay, __webpack_exports__ActionOverlay as ActionOverlay, __webpack_exports__Application as Application, __webpack_exports__ConfigUI as ConfigUI, __webpack_exports__ConnectOverlay as ConnectOverlay, __webpack_exports__DisconnectOverlay as DisconnectOverlay, __webpack_exports__ErrorOverlay as ErrorOverlay, __webpack_exports__InfoOverlay as InfoOverlay, __webpack_exports__OverlayBase as OverlayBase, __webpack_exports__PixelStreamingApplicationStyle as PixelStreamingApplicationStyle, __webpack_exports__PlayOverlay as PlayOverlay, __webpack_exports__SettingUIBase as SettingUIBase, __webpack_exports__SettingUIFlag as SettingUIFlag, __webpack_exports__SettingUINumber as SettingUINumber, __webpack_exports__SettingUIOption as SettingUIOption, __webpack_exports__SettingUIText as SettingUIText, __webpack_exports__TextOverlay as TextOverlay, __webpack_exports__UIElementCreationMode as UIElementCreationMode };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyRCxHQUFHO1lBQ0gsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUNYLENBQUM7SUFDTixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7O0FDbkNELGVBQWUsWUFBWSw2QkFBNkI7QUFDeEQ7QUFDQTs7Ozs7Ozs7OztBQ0ZBLGVBQWUsWUFBWSw2QkFBNkI7QUFDeEQ7QUFDQTs7Ozs7Ozs7OztBQ0ZBLGVBQWUsWUFBWSw2QkFBNkI7QUFDeEQ7QUFDQTs7Ozs7Ozs7OztBQ0ZBLGVBQWUsWUFBWSw2QkFBNkI7QUFDeEQ7QUFDQTs7Ozs7O1NDRkE7U0FDQTs7U0FFQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTs7U0FFQTtTQUNBOztTQUVBO1NBQ0E7U0FDQTs7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0E7VUFDQSx5Q0FBeUMsd0NBQXdDO1VBQ2pGO1VBQ0E7VUFDQTs7Ozs7VUNQQTs7Ozs7VUNBQTtVQUNBO1VBQ0E7VUFDQSx1REFBdUQsaUJBQWlCO1VBQ3hFO1VBQ0EsZ0RBQWdELGFBQWE7VUFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQSxrREFBa0Q7QUFFeUM7QUFFRDtBQUV4QztBQUNNO0FBQ0o7QUFDTTtBQUNNO0FBQ1Y7QUFDRjtBQUNBO0FBQ0E7QUFDUDtBQUNVO0FBQ0E7QUFDSTtBQUNBO0FBQ0o7QUFDK0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS40Ly4vc3JjL0FwcGxpY2F0aW9uL0FwcGxpY2F0aW9uLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjQvLi9zcmMvQ29uZmlnL0NvbmZpZ1VJLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjQvLi9zcmMvQ29uZmlnL1NldHRpbmdVSUJhc2UudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC8uL3NyYy9Db25maWcvU2V0dGluZ1VJRmxhZy50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS40Ly4vc3JjL0NvbmZpZy9TZXR0aW5nVUlOdW1iZXIudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC8uL3NyYy9Db25maWcvU2V0dGluZ1VJT3B0aW9uLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjQvLi9zcmMvQ29uZmlnL1NldHRpbmdVSVRleHQudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC8uL3NyYy9PdmVybGF5L0FGS092ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC8uL3NyYy9PdmVybGF5L0FjdGlvbk92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC8uL3NyYy9PdmVybGF5L0Jhc2VPdmVybGF5LnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjQvLi9zcmMvT3ZlcmxheS9Db25uZWN0T3ZlcmxheS50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS40Ly4vc3JjL092ZXJsYXkvRGlzY29ubmVjdE92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC8uL3NyYy9PdmVybGF5L0Vycm9yT3ZlcmxheS50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS40Ly4vc3JjL092ZXJsYXkvSW5mb092ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC8uL3NyYy9PdmVybGF5L1BsYXlPdmVybGF5LnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjQvLi9zcmMvT3ZlcmxheS9UZXh0T3ZlcmxheS50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS40Ly4vc3JjL1N0eWxlcy9QaXhlbFN0cmVhbWluZ0FwcGxpY2F0aW9uU3R5bGVzLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjQvLi9zcmMvVUkvQ29udHJvbHMudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC8uL3NyYy9VSS9EYXRhQ2hhbm5lbExhdGVuY3lUZXN0LnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjQvLi9zcmMvVUkvRnVsbHNjcmVlbkljb24udHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC8uL3NyYy9VSS9MYWJlbGxlZEJ1dHRvbi50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS40Ly4vc3JjL1VJL0xhdGVuY3lUZXN0LnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjQvLi9zcmMvVUkvU2V0dGluZ3NJY29uLnRzIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjQvLi9zcmMvVUkvU2V0dGluZ3NQYW5lbC50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS40Ly4vc3JjL1VJL1N0YXRzSWNvbi50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS40Ly4vc3JjL1VJL1N0YXRzUGFuZWwudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC8uL3NyYy9VSS9VSUNvbmZpZ3VyYXRpb25UeXBlcy50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS40Ly4vc3JjL1VJL1ZpZGVvUXBJbmRpY2F0b3IudHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC8uL3NyYy9VSS9YUkljb24udHMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC8uL3NyYy9VdGlsL01hdGhVdGlscy50cyIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS40L2V4dGVybmFsIG1vZHVsZSBcIkBlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjRcIiIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS40L2V4dGVybmFsIG1vZHVsZSBcImpzc1wiIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjQvZXh0ZXJuYWwgbW9kdWxlIFwianNzLXBsdWdpbi1jYW1lbC1jYXNlXCIiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC9leHRlcm5hbCBtb2R1bGUgXCJqc3MtcGx1Z2luLWdsb2JhbFwiIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS11ZTUuNC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWktdWU1LjQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLXVlNS40Ly4vc3JjL3BpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHtcbiAgICBQaXhlbFN0cmVhbWluZyxcbiAgICBGbGFncyxcbiAgICBMb2dnZXIsXG4gICAgQWdncmVnYXRlZFN0YXRzLFxuICAgIExhdGVuY3lUZXN0UmVzdWx0cyxcbiAgICBJbml0aWFsU2V0dGluZ3MsXG4gICAgTWVzc2FnZVN0cmVhbWVyTGlzdFxufSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40JztcbmltcG9ydCB7IE92ZXJsYXlCYXNlIH0gZnJvbSAnLi4vT3ZlcmxheS9CYXNlT3ZlcmxheSc7XG5pbXBvcnQgeyBBY3Rpb25PdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9BY3Rpb25PdmVybGF5JztcbmltcG9ydCB7IFRleHRPdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9UZXh0T3ZlcmxheSc7XG5pbXBvcnQgeyBDb25uZWN0T3ZlcmxheSB9IGZyb20gJy4uL092ZXJsYXkvQ29ubmVjdE92ZXJsYXknO1xuaW1wb3J0IHsgRGlzY29ubmVjdE92ZXJsYXkgfSBmcm9tICcuLi9PdmVybGF5L0Rpc2Nvbm5lY3RPdmVybGF5JztcbmltcG9ydCB7IFBsYXlPdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9QbGF5T3ZlcmxheSc7XG5pbXBvcnQgeyBJbmZvT3ZlcmxheSB9IGZyb20gJy4uL092ZXJsYXkvSW5mb092ZXJsYXknO1xuaW1wb3J0IHsgRXJyb3JPdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9FcnJvck92ZXJsYXknO1xuaW1wb3J0IHsgQUZLT3ZlcmxheSB9IGZyb20gJy4uL092ZXJsYXkvQUZLT3ZlcmxheSc7XG5pbXBvcnQgeyBDb250cm9scywgQ29udHJvbHNVSUNvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9VSS9Db250cm9scyc7XG5pbXBvcnQgeyBMYWJlbGxlZEJ1dHRvbiB9IGZyb20gJy4uL1VJL0xhYmVsbGVkQnV0dG9uJztcbmltcG9ydCB7IFNldHRpbmdzUGFuZWwgfSBmcm9tICcuLi9VSS9TZXR0aW5nc1BhbmVsJztcbmltcG9ydCB7IFN0YXRzUGFuZWwgfSBmcm9tICcuLi9VSS9TdGF0c1BhbmVsJztcbmltcG9ydCB7IFZpZGVvUXBJbmRpY2F0b3IgfSBmcm9tICcuLi9VSS9WaWRlb1FwSW5kaWNhdG9yJztcbmltcG9ydCB7IENvbmZpZ1VJLCBMaWdodE1vZGUgfSBmcm9tICcuLi9Db25maWcvQ29uZmlnVUknO1xuaW1wb3J0IHsgXG4gICAgVUlFbGVtZW50Q3JlYXRpb25Nb2RlLCBcbiAgICBQYW5lbENvbmZpZ3VyYXRpb24sIFxuICAgIGlzUGFuZWxFbmFibGVkLFxuICAgIFVJRWxlbWVudENvbmZpZ1xufSBmcm9tICcuLi9VSS9VSUNvbmZpZ3VyYXRpb25UeXBlcydcbmltcG9ydCB7IEZ1bGxTY3JlZW5JY29uQmFzZSwgRnVsbFNjcmVlbkljb25FeHRlcm5hbCB9IGZyb20gJy4uL1VJL0Z1bGxzY3JlZW5JY29uJztcbmltcG9ydCB7XG4gICAgRGF0YUNoYW5uZWxMYXRlbmN5VGVzdFJlc3VsdFxufSBmcm9tIFwiQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuNC90eXBlcy9EYXRhQ2hhbm5lbC9EYXRhQ2hhbm5lbExhdGVuY3lUZXN0UmVzdWx0c1wiO1xuXG5cbi8qKiBcbiAqIENvbmZpZ3VyYXRpb24gb2YgdGhlIGludGVybmFsIHZpZGVvIFFQIGluZGljYXRvciBlbGVtZW50LlxuICogQnkgZGVmYXVsdCwgb25lIHdpbGwgYmUgbWFkZSwgYnV0IGlmIG5lZWRlZCB0aGlzIGNhbiBiZSBkaXNhYmxlZC5cbiAqIFxuICogTm90ZTogRm9yIGN1c3RvbSBVSSBlbGVtZW50cyB0byByZWFjdCB0byB0aGUgUVAgYmVpbmcgY2hhbmdlZCwgdXNlIGEgUGl4ZWxTdHJlYW1pbmcgXG4gKiBvYmplY3QncyBhZGRFdmVudExpc3RlbmVyKCd2aWRlb0VuY29kZXJBdmdRUCcsIC4uLikgb3IgcmVtb3ZlRXZlbnRMaXN0ZW5lciguLi4pLlxuICovXG5leHBvcnQgdHlwZSBWaWRlb1FQSW5kaWNhdG9yQ29uZmlnID0ge1xuICAgIGRpc2FibGVJbmRpY2F0b3I/OiBib29sZWFuXG59XG5cbi8qKlxuICogVUkgT3B0aW9ucyBjYW4gYmUgcHJvdmlkZWQgd2hlbiBjcmVhdGluZyBhbiBBcHBsaWNhdGlvbiwgdG8gY29uZmlndXJlIGl0J3MgaW50ZXJuYWxcbiAqIGFuZCBleHRlcm5hbCBiZWhhdmlvdXIsIGVuYWJsZS9kaXNhYmxlIGZlYXR1cmVzLCBhbmQgY29ubmVjdCB0byBleHRlcm5hbCBVSS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVSU9wdGlvbnMge1xuICAgIHN0cmVhbTogUGl4ZWxTdHJlYW1pbmc7XG4gICAgb25Db2xvck1vZGVDaGFuZ2VkPzogKGlzTGlnaHRNb2RlOiBib29sZWFuKSA9PiB2b2lkO1xuICAgIC8qKiBCeSBkZWZhdWx0LCBhIHNldHRpbmdzIHBhbmVsIGFuZCBhc3NvY2lhdGUgdmlzaWJpbGl0eSB0b2dnbGUgYnV0dG9uIHdpbGwgYmUgbWFkZS5cbiAgICAgICogSWYgbmVlZGVkLCB0aGlzIGJlaGF2aW91ciBjYW4gYmUgY29uZmlndXJlZC4gKi9cbiAgICBzZXR0aW5nc1BhbmVsQ29uZmlnPzogUGFuZWxDb25maWd1cmF0aW9uO1xuICAgIC8qKiBCeSBkZWZhdWx0LCBhIHN0YXRzIHBhbmVsIGFuZCBhc3NvY2lhdGUgdmlzaWJpbGl0eSB0b2dnbGUgYnV0dG9uIHdpbGwgYmUgbWFkZS5cbiAgICAgICogSWYgbmVlZGVkLCB0aGlzIGJlaGF2aW91ciBjYW4gYmUgY29uZmlndXJlZC4gKi9cbiAgICBzdGF0c1BhbmVsQ29uZmlnPzogUGFuZWxDb25maWd1cmF0aW9uO1xuICAgIC8qKiBJZiBuZWVkZWQsIHRoZSBmdWxsIHNjcmVlbiBidXR0b24gY2FuIGJlIGV4dGVybmFsIG9yIGRpc2FibGVkLiAqL1xuICAgIGZ1bGxTY3JlZW5Db250cm9sc0NvbmZpZz8gOiBVSUVsZW1lbnRDb25maWcsXG4gICAgLyoqIElmIG5lZWRlZCwgWFIgYnV0dG9uIGNhbiBiZSBleHRlcm5hbCBvciBkaXNhYmxlZC4gKi9cbiAgICB4ckNvbnRyb2xzQ29uZmlnPyA6IFVJRWxlbWVudENvbmZpZyxcbiAgICAvKiogQ29uZmlndXJhdGlvbiBvZiB0aGUgdmlkZW8gUVAgaW5kaWNhdG9yLiAqL1xuICAgIHZpZGVvUXBJbmRpY2F0b3JDb25maWc/IDogVmlkZW9RUEluZGljYXRvckNvbmZpZ1xufVxuXG4vKipcbiAqIEFuIEFwcGxpY2F0aW9uIGlzIGEgY29tYmluYXRpb24gb2YgVUkgZWxlbWVudHMgdG8gZGlzcGxheSBhbmQgbWFuYWdlIGEgV2ViUlRDIFBpeGVsIFN0cmVhbWluZ1xuICogY29ubmVjdGlvbi4gSXQgaW5jbHVkZXMgZmVhdHVyZXMgZm9yIGNvbnRyb2xsaW5nIGEgc3RyZWFtIHdpdGggbW91c2UgYW5kIGtleWJvYXJkLCBcbiAqIG1hbmFnaW5nIGNvbm5lY3Rpb24gZW5kcG9pbnRzLCBhcyB3ZWxsIGFzIGRpc3BsYXlpbmcgc3RhdHMgYW5kIG90aGVyIGluZm9ybWF0aW9uIGFib3V0IGl0LlxuICovXG5leHBvcnQgY2xhc3MgQXBwbGljYXRpb24ge1xuICAgIHN0cmVhbTogUGl4ZWxTdHJlYW1pbmc7XG5cbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIF91aUZlYXR1cmVFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIC8vIHNldCB0aGUgb3ZlcmxheSBwbGFjZWhvbGRlcnNcbiAgICBjdXJyZW50T3ZlcmxheTogT3ZlcmxheUJhc2UgfCBudWxsO1xuICAgIGRpc2Nvbm5lY3RPdmVybGF5OiBBY3Rpb25PdmVybGF5O1xuICAgIGNvbm5lY3RPdmVybGF5OiBBY3Rpb25PdmVybGF5O1xuICAgIHBsYXlPdmVybGF5OiBBY3Rpb25PdmVybGF5O1xuICAgIGluZm9PdmVybGF5OiBUZXh0T3ZlcmxheTtcbiAgICBlcnJvck92ZXJsYXk6IFRleHRPdmVybGF5O1xuICAgIGFma092ZXJsYXk6IEFGS092ZXJsYXk7XG5cbiAgICBjb250cm9sczogQ29udHJvbHM7XG5cbiAgICBzZXR0aW5nc1BhbmVsOiBTZXR0aW5nc1BhbmVsO1xuICAgIHN0YXRzUGFuZWw6IFN0YXRzUGFuZWw7XG4gICAgdmlkZW9RcEluZGljYXRvcjogVmlkZW9RcEluZGljYXRvcjtcblxuICAgIGNvbmZpZ1VJOiBDb25maWdVSTtcblxuICAgIG9uQ29sb3JNb2RlQ2hhbmdlZDogVUlPcHRpb25zW1wib25Db2xvck1vZGVDaGFuZ2VkXCJdO1xuXG4gICAgcHJvdGVjdGVkIF9vcHRpb25zIDogVUlPcHRpb25zO1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG9wdGlvbnMgLSBJbml0aWFsaXphdGlvbiBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogVUlPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5zdHJlYW0gPSBvcHRpb25zLnN0cmVhbTtcbiAgICAgICAgdGhpcy5vbkNvbG9yTW9kZUNoYW5nZWQgPSBvcHRpb25zLm9uQ29sb3JNb2RlQ2hhbmdlZDtcbiAgICAgICAgdGhpcy5jb25maWdVSSA9IG5ldyBDb25maWdVSSh0aGlzLnN0cmVhbS5jb25maWcpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlT3ZlcmxheXMoKTtcblxuICAgICAgICBpZiAoaXNQYW5lbEVuYWJsZWQob3B0aW9ucy5zdGF0c1BhbmVsQ29uZmlnKSkge1xuICAgICAgICAgICAgLy8gQWRkIHN0YXRzIHBhbmVsXG4gICAgICAgICAgICB0aGlzLnN0YXRzUGFuZWwgPSBuZXcgU3RhdHNQYW5lbCgpO1xuICAgICAgICAgICAgdGhpcy51aUZlYXR1cmVzRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzUGFuZWwucm9vdEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoaXNQYW5lbEVuYWJsZWQob3B0aW9ucy5zZXR0aW5nc1BhbmVsQ29uZmlnKSkge1xuICAgICAgICAgICAgLy8gQWRkIHNldHRpbmdzIHBhbmVsXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzUGFuZWwgPSBuZXcgU2V0dGluZ3NQYW5lbCgpO1xuICAgICAgICAgICAgdGhpcy51aUZlYXR1cmVzRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzUGFuZWwucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5jb25maWd1cmVTZXR0aW5ncygpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAoIW9wdGlvbnMudmlkZW9RcEluZGljYXRvckNvbmZpZyB8fCAhb3B0aW9ucy52aWRlb1FwSW5kaWNhdG9yQ29uZmlnLmRpc2FibGVJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgdmlkZW8gc3RyZWFtIFFQIGluZGljYXRvclxuICAgICAgICAgICAgdGhpcy52aWRlb1FwSW5kaWNhdG9yID0gbmV3IFZpZGVvUXBJbmRpY2F0b3IoKTtcbiAgICAgICAgICAgIHRoaXMudWlGZWF0dXJlc0VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy52aWRlb1FwSW5kaWNhdG9yLnJvb3RFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9ucygpO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJDYWxsYmFja3MoKTtcblxuICAgICAgICB0aGlzLnNob3dDb25uZWN0T3JBdXRvQ29ubmVjdE92ZXJsYXlzKCk7XG5cbiAgICAgICAgdGhpcy5zZXRDb2xvck1vZGUodGhpcy5jb25maWdVSS5pc0N1c3RvbUZsYWdFbmFibGVkKExpZ2h0TW9kZSkpO1xuXG4gICAgICAgIHRoaXMuc3RyZWFtLmNvbmZpZy5fYWRkT25TZXR0aW5nQ2hhbmdlZExpc3RlbmVyKFxuICAgICAgICAgICAgRmxhZ3MuSGlkZVVJLFxuICAgICAgICAgICAgKGlzRW5hYmxlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VpRmVhdHVyZUVsZW1lbnQuc3R5bGUudmlzaWJpbGl0eSA9IGlzRW5hYmxlZCA/IFwiaGlkZGVuXCIgOiBcInZpc2libGVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5zdHJlYW0uY29uZmlnLmlzRmxhZ0VuYWJsZWQoRmxhZ3MuSGlkZVVJKSkge1xuICAgICAgICAgICAgdGhpcy5fdWlGZWF0dXJlRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVPdmVybGF5cygpOiB2b2lkIHtcbiAgICAgICAgLy8gYnVpbGQgYWxsIG9mIHRoZSBvdmVybGF5c1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RPdmVybGF5ID0gbmV3IERpc2Nvbm5lY3RPdmVybGF5KFxuICAgICAgICAgICAgdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY29ubmVjdE92ZXJsYXkgPSBuZXcgQ29ubmVjdE92ZXJsYXkoXG4gICAgICAgICAgICB0aGlzLnN0cmVhbS52aWRlb0VsZW1lbnRQYXJlbnRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5wbGF5T3ZlcmxheSA9IG5ldyBQbGF5T3ZlcmxheShcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnZpZGVvRWxlbWVudFBhcmVudFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmluZm9PdmVybGF5ID0gbmV3IEluZm9PdmVybGF5KFxuICAgICAgICAgICAgdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZXJyb3JPdmVybGF5ID0gbmV3IEVycm9yT3ZlcmxheShcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnZpZGVvRWxlbWVudFBhcmVudFxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFma092ZXJsYXkgPSBuZXcgQUZLT3ZlcmxheShcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnZpZGVvRWxlbWVudFBhcmVudFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuZGlzY29ubmVjdE92ZXJsYXkub25BY3Rpb24oKCkgPT4gdGhpcy5zdHJlYW0ucmVjb25uZWN0KCkpO1xuXG4gICAgICAgIC8vIEJ1aWxkIHRoZSB3ZWJSdGMgY29ubmVjdCBvdmVybGF5IEV2ZW50IExpc3RlbmVyIGFuZCBzaG93IHRoZSBjb25uZWN0IG92ZXJsYXlcbiAgICAgICAgdGhpcy5jb25uZWN0T3ZlcmxheS5vbkFjdGlvbigoKSA9PiB0aGlzLnN0cmVhbS5jb25uZWN0KCkpO1xuXG4gICAgICAgIC8vIHNldCB1cCB0aGUgcGxheSBvdmVybGF5cyBhY3Rpb25cbiAgICAgICAgdGhpcy5wbGF5T3ZlcmxheS5vbkFjdGlvbigoKSA9PiB0aGlzLnN0cmVhbS5wbGF5KCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB1cCBidXR0b24gY2xpY2sgZnVuY3Rpb25zIGFuZCBidXR0b24gZnVuY3Rpb25hbGl0eVxuICAgICAqL1xuICAgIHB1YmxpYyBjcmVhdGVCdXR0b25zKCkge1xuICAgICAgICBjb25zdCBjb250cm9sc1VJQ29uZmlnIDogQ29udHJvbHNVSUNvbmZpZ3VyYXRpb24gPSB7XG4gICAgICAgICAgICBzdGF0c0J1dHRvblR5cGUgOiAhIXRoaXMuX29wdGlvbnMuc3RhdHNQYW5lbENvbmZpZ1xuICAgICAgICAgICAgICAgID8gdGhpcy5fb3B0aW9ucy5zdGF0c1BhbmVsQ29uZmlnLnZpc2liaWxpdHlCdXR0b25Db25maWdcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHNldHRpbmdzQnV0dG9uVHlwZTogISF0aGlzLl9vcHRpb25zLnNldHRpbmdzUGFuZWxDb25maWdcbiAgICAgICAgICAgICAgICA/IHRoaXMuX29wdGlvbnMuc2V0dGluZ3NQYW5lbENvbmZpZy52aXNpYmlsaXR5QnV0dG9uQ29uZmlnXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBmdWxsc2NyZWVuQnV0dG9uVHlwZTogdGhpcy5fb3B0aW9ucy5mdWxsU2NyZWVuQ29udHJvbHNDb25maWcsXG4gICAgICAgICAgICB4ckljb25UeXBlOiB0aGlzLl9vcHRpb25zLnhyQ29udHJvbHNDb25maWdcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXR1cCBjb250cm9sc1xuICAgICAgICBjb25zdCBjb250cm9scyA9IG5ldyBDb250cm9scyhjb250cm9sc1VJQ29uZmlnKTtcbiAgICAgICAgdGhpcy51aUZlYXR1cmVzRWxlbWVudC5hcHBlbmRDaGlsZChjb250cm9scy5yb290RWxlbWVudCk7XG5cbiAgICAgICAgLy8gV2hlbiB3ZSBmdWxsc2NyZWVuIHdlIHdhbnQgdGhpcyBlbGVtZW50IHRvIGJlIHRoZSByb290XG4gICAgICAgIGNvbnN0IGZ1bGxTY3JlZW5CdXR0b24gOiBGdWxsU2NyZWVuSWNvbkJhc2UgfCB1bmRlZmluZWQgPSBcbiAgICAgICAgICAgIC8vIERlcGVuZGluZyBvbiBpZiB3ZSdyZSBjcmVhdGluZyBhbiBpbnRlcm5hbCBidXR0b24sIG9yIHVzaW5nIGFuIGV4dGVybmFsIG9uZVxuICAgICAgICAgICAgKCEhdGhpcy5fb3B0aW9ucy5mdWxsU2NyZWVuQ29udHJvbHNDb25maWcgXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5fb3B0aW9ucy5mdWxsU2NyZWVuQ29udHJvbHNDb25maWcuY3JlYXRpb25Nb2RlID09PSBVSUVsZW1lbnRDcmVhdGlvbk1vZGUuVXNlQ3VzdG9tRWxlbWVudClcbiAgICAgICAgICAgIC8vIEVpdGhlciBjcmVhdGUgYSBmdWxsc2NyZWVuIGNsYXNzIGJhc2VkIG9uIHRoZSBleHRlcm5hbCBidXR0b25cbiAgICAgICAgICAgID8gbmV3IEZ1bGxTY3JlZW5JY29uRXh0ZXJuYWwodGhpcy5fb3B0aW9ucy5mdWxsU2NyZWVuQ29udHJvbHNDb25maWcuY3VzdG9tRWxlbWVudClcbiAgICAgICAgICAgIC8vIE9yIHVzZSB0aGUgb25lIGNyZWF0ZWQgYnkgdGhlIENvbnRyb2xzIGluaXRpYWxpemVyIGVhcmxpZXJcbiAgICAgICAgICAgIDogY29udHJvbHMuZnVsbHNjcmVlbkljb247XG4gICAgICAgIGlmIChmdWxsU2NyZWVuQnV0dG9uKSB7XG4gICAgICAgICAgICBmdWxsU2NyZWVuQnV0dG9uLmZ1bGxzY3JlZW5FbGVtZW50ID0gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgPyB0aGlzLnN0cmVhbS52aWRlb0VsZW1lbnRQYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJ2aWRlb1wiKVswXSA6IHRoaXMucm9vdEVsZW1lbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgc2V0dGluZ3MgYnV0dG9uIHRvIGNvbnRyb2xzXG4gICAgICAgIGNvbnN0IHNldHRpbmdzQnV0dG9uIDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQgPSBcbiAgICAgICAgICAgICEhY29udHJvbHMuc2V0dGluZ3NJY29uID8gY29udHJvbHMuc2V0dGluZ3NJY29uLnJvb3RFbGVtZW50IDogXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNldHRpbmdzUGFuZWxDb25maWcudmlzaWJpbGl0eUJ1dHRvbkNvbmZpZy5jdXN0b21FbGVtZW50O1xuICAgICAgICBpZiAoISFzZXR0aW5nc0J1dHRvbikgc2V0dGluZ3NCdXR0b24ub25jbGljayA9ICgpID0+XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzQ2xpY2tlZCgpO1xuICAgICAgICBpZiAoISF0aGlzLnNldHRpbmdzUGFuZWwpIHRoaXMuc2V0dGluZ3NQYW5lbC5zZXR0aW5nc0Nsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PlxuICAgICAgICAgICAgdGhpcy5zZXR0aW5nc0NsaWNrZWQoKTtcblxuICAgICAgICAvLyBBZGQgV2ViWFIgYnV0dG9uIHRvIGNvbnRyb2xzXG4gICAgICAgIGNvbnN0IHhyQnV0dG9uIDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQgPSBcbiAgICAgICAgICAgICEhY29udHJvbHMueHJJY29uID8gY29udHJvbHMueHJJY29uLnJvb3RFbGVtZW50IDogXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnhyQ29udHJvbHNDb25maWcuY3JlYXRpb25Nb2RlID09PSBVSUVsZW1lbnRDcmVhdGlvbk1vZGUuVXNlQ3VzdG9tRWxlbWVudCA/XG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnhyQ29udHJvbHNDb25maWcuY3VzdG9tRWxlbWVudCA6IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKCEheHJCdXR0b24pIHhyQnV0dG9uLm9uY2xpY2sgPSAoKSA9PlxuICAgICAgICAgICAgdGhpcy5zdHJlYW0udG9nZ2xlWFIoKTtcblxuICAgICAgICAvLyBzZXR1cCB0aGUgc3RhdHMvaW5mbyBidXR0b25cbiAgICAgICAgY29uc3Qgc3RhdHNCdXR0b24gOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCA9IFxuICAgICAgICAgICAgISFjb250cm9scy5zdGF0c0ljb24gPyBjb250cm9scy5zdGF0c0ljb24ucm9vdEVsZW1lbnQgOiBcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc3RhdHNQYW5lbENvbmZpZy52aXNpYmlsaXR5QnV0dG9uQ29uZmlnLmN1c3RvbUVsZW1lbnQ7XG4gICAgICAgIGlmICghIXN0YXRzQnV0dG9uKSBzdGF0c0J1dHRvbi5vbmNsaWNrID0gKCkgPT4gdGhpcy5zdGF0c0NsaWNrZWQoKVxuXG4gICAgICAgIGlmICghIXRoaXMuc3RhdHNQYW5lbCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0c1BhbmVsLnN0YXRzQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IHRoaXMuc3RhdHNDbGlja2VkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgY29tbWFuZCBidXR0b25zIChpZiB3ZSBoYXZlIHNvbWV3aGVyZSB0byBhZGQgdGhlbSB0bylcbiAgICAgICAgaWYgKCEhdGhpcy5zZXR0aW5nc1BhbmVsKSB7XG4gICAgICAgICAgICAvLyBBZGQgYnV0dG9uIGZvciB0b2dnbGUgZnBzXG4gICAgICAgICAgICBjb25zdCBzaG93RlBTQnV0dG9uID0gbmV3IExhYmVsbGVkQnV0dG9uKCdTaG93IEZQUycsICdUb2dnbGUnKTtcbiAgICAgICAgICAgIHNob3dGUFNCdXR0b24uYWRkT25DbGlja0xpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbS5yZXF1ZXN0U2hvd0ZwcygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBidXR0b24gZm9yIHJlc3RhcnQgc3RyZWFtXG4gICAgICAgICAgICBjb25zdCByZXN0YXJ0U3RyZWFtQnV0dG9uID0gbmV3IExhYmVsbGVkQnV0dG9uKFxuICAgICAgICAgICAgICAgICdSZXN0YXJ0IFN0cmVhbScsXG4gICAgICAgICAgICAgICAgJ1Jlc3RhcnQnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmVzdGFydFN0cmVhbUJ1dHRvbi5hZGRPbkNsaWNrTGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RyZWFtLnJlY29ubmVjdCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEFkZCBidXR0b24gZm9yIHJlcXVlc3Qga2V5ZnJhbWVcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RLZXlmcmFtZUJ1dHRvbiA9IG5ldyBMYWJlbGxlZEJ1dHRvbihcbiAgICAgICAgICAgICAgICAnUmVxdWVzdCBrZXlmcmFtZScsXG4gICAgICAgICAgICAgICAgJ1JlcXVlc3QnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmVxdWVzdEtleWZyYW1lQnV0dG9uLmFkZE9uQ2xpY2tMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJlYW0ucmVxdWVzdElmcmFtZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmRzU2VjdGlvbkVsZW0gPSB0aGlzLmNvbmZpZ1VJLmJ1aWxkU2VjdGlvbldpdGhIZWFkaW5nKFxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NQYW5lbC5zZXR0aW5nc0NvbnRlbnRFbGVtZW50LFxuICAgICAgICAgICAgICAgICdDb21tYW5kcydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb21tYW5kc1NlY3Rpb25FbGVtLmFwcGVuZENoaWxkKHNob3dGUFNCdXR0b24ucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgY29tbWFuZHNTZWN0aW9uRWxlbS5hcHBlbmRDaGlsZChyZXF1ZXN0S2V5ZnJhbWVCdXR0b24ucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgY29tbWFuZHNTZWN0aW9uRWxlbS5hcHBlbmRDaGlsZChyZXN0YXJ0U3RyZWFtQnV0dG9uLnJvb3RFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbmZpZ3VyZSB0aGUgc2V0dGluZ3Mgd2l0aCBvbiBjaGFuZ2UgbGlzdGVuZXJzIGFuZCBhbnkgYWRkaXRpb25hbCBwZXIgZXhwZXJpZW5jZSBzZXR0aW5ncy5cbiAgICAgKi9cbiAgICBjb25maWd1cmVTZXR0aW5ncygpOiB2b2lkIHtcbiAgICAgICAgLy8gVGhpcyBidWlsZHMgYWxsIHRoZSBzZXR0aW5ncyBzZWN0aW9ucyBhbmQgZmxhZ3MgdW5kZXIgdGhpcyBgc2V0dGluZ3NDb250ZW50YCBlbGVtZW50LlxuICAgICAgICB0aGlzLmNvbmZpZ1VJLnBvcHVsYXRlU2V0dGluZ3NFbGVtZW50KFxuICAgICAgICAgICAgdGhpcy5zZXR0aW5nc1BhbmVsLnNldHRpbmdzQ29udGVudEVsZW1lbnRcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNvbmZpZ1VJLmFkZEN1c3RvbUZsYWdPblNldHRpbmdDaGFuZ2VkTGlzdGVuZXIoXG4gICAgICAgICAgICBMaWdodE1vZGUsXG4gICAgICAgICAgICAoaXNMaWdodE1vZGU6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ1VJLnNldEN1c3RvbUZsYWdMYWJlbChcbiAgICAgICAgICAgICAgICAgICAgTGlnaHRNb2RlLFxuICAgICAgICAgICAgICAgICAgICBgQ29sb3IgU2NoZW1lOiAke2lzTGlnaHRNb2RlID8gJ0xpZ2h0JyA6ICdEYXJrJ30gTW9kZWBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29sb3JNb2RlKGlzTGlnaHRNb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZWdpc3RlckNhbGxiYWNrcygpIHtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdhZmtXYXJuaW5nQWN0aXZhdGUnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBjb3VudERvd24sIGRpc21pc3NBZmsgfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Fma092ZXJsYXkoY291bnREb3duLCBkaXNtaXNzQWZrKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2Fma1dhcm5pbmdVcGRhdGUnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBjb3VudERvd24gfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuYWZrT3ZlcmxheS51cGRhdGVDb3VudGRvd24oY291bnREb3duKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2Fma1dhcm5pbmdEZWFjdGl2YXRlJyxcbiAgICAgICAgICAgICgpID0+IHRoaXMuYWZrT3ZlcmxheS5oaWRlKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignYWZrVGltZWRPdXQnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5hZmtPdmVybGF5LmhpZGUoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3ZpZGVvRW5jb2RlckF2Z1FQJyxcbiAgICAgICAgICAgICh7IGRhdGE6IHsgYXZnUVAgfSB9KSA9PiB0aGlzLm9uVmlkZW9FbmNvZGVyQXZnUVAoYXZnUVApXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYlJ0Y1NkcCcsICgpID0+XG4gICAgICAgICAgICB0aGlzLm9uV2ViUnRjU2RwKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignd2ViUnRjQXV0b0Nvbm5lY3QnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5vbldlYlJ0Y0F1dG9Db25uZWN0KClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignd2ViUnRjQ29ubmVjdGluZycsICgpID0+XG4gICAgICAgICAgICB0aGlzLm9uV2ViUnRjQ29ubmVjdGluZygpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYlJ0Y0Nvbm5lY3RlZCcsICgpID0+XG4gICAgICAgICAgICB0aGlzLm9uV2ViUnRjQ29ubmVjdGVkKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignd2ViUnRjRmFpbGVkJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25XZWJSdGNGYWlsZWQoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3dlYlJ0Y0Rpc2Nvbm5lY3RlZCcsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IGV2ZW50U3RyaW5nLCBhbGxvd0NsaWNrVG9SZWNvbm5lY3QgfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMub25EaXNjb25uZWN0KGV2ZW50U3RyaW5nLCBhbGxvd0NsaWNrVG9SZWNvbm5lY3QpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3ZpZGVvSW5pdGlhbGl6ZWQnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5vblZpZGVvSW5pdGlhbGl6ZWQoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdzdHJlYW1Mb2FkaW5nJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25TdHJlYW1Mb2FkaW5nKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdwbGF5U3RyZWFtRXJyb3InLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBtZXNzYWdlIH0gfSkgPT4gdGhpcy5vblBsYXlTdHJlYW1FcnJvcihtZXNzYWdlKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdwbGF5U3RyZWFtJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25QbGF5U3RyZWFtKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdwbGF5U3RyZWFtUmVqZWN0ZWQnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyByZWFzb24gfSB9KSA9PiB0aGlzLm9uUGxheVN0cmVhbVJlamVjdGVkKHJlYXNvbilcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdsb2FkRnJlZXplRnJhbWUnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBzaG91bGRTaG93UGxheU92ZXJsYXkgfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkRnJlZXplRnJhbWUoc2hvdWxkU2hvd1BsYXlPdmVybGF5KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3N0YXRzUmVjZWl2ZWQnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBhZ2dyZWdhdGVkU3RhdHMgfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMub25TdGF0c1JlY2VpdmVkKGFnZ3JlZ2F0ZWRTdGF0cylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdsYXRlbmN5VGVzdFJlc3VsdCcsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IGxhdGVuY3lUaW1pbmdzIH0gfSkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLm9uTGF0ZW5jeVRlc3RSZXN1bHRzKGxhdGVuY3lUaW1pbmdzKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2RhdGFDaGFubmVsTGF0ZW5jeVRlc3RSZXN1bHQnLFxuICAgICAgICAgICAgKHtkYXRhOiB7IHJlc3VsdCB9IH0pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRhdGFDaGFubmVsTGF0ZW5jeVRlc3RSZXN1bHRzKHJlc3VsdClcbiAgICAgICAgKVxuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3N0cmVhbWVyTGlzdE1lc3NhZ2UnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBtZXNzYWdlU3RyZWFtZXJMaXN0LCBhdXRvU2VsZWN0ZWRTdHJlYW1lcklkLCB3YW50ZWRTdHJlYW1lcklkIH0gfSkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVN0cmVhbWVyTGlzdE1lc3NhZ2UobWVzc2FnZVN0cmVhbWVyTGlzdCwgYXV0b1NlbGVjdGVkU3RyZWFtZXJJZCwgd2FudGVkU3RyZWFtZXJJZClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdzZXR0aW5nc0NoYW5nZWQnLFxuICAgICAgICAgICAgKGV2ZW50KSA9PiB0aGlzLmNvbmZpZ1VJLm9uU2V0dGluZ3NDaGFuZ2VkKGV2ZW50KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3BsYXllckNvdW50JywgXG4gICAgICAgICAgICAoeyBkYXRhOiB7IGNvdW50IH19KSA9PiBcbiAgICAgICAgICAgICAgICB0aGlzLm9uUGxheWVyQ291bnQoY291bnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnd2ViUnRjVENQUmVsYXlEZXRlY3RlZCcsIFxuICAgICAgICAgICAgKHt9KSA9PiBcbiAgICAgICAgICAgICAgICBMb2dnZXIuV2FybmluZyhcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSxcbiAgICAgICAgICAgICAgICAgICAgYFN0cmVhbSBxdWFpbHR5IGRlZ3JhZGVkIGR1ZSB0byBuZXR3b3JrIGVudmlyb21lbnQsIHN0cmVhbSBpcyByZWxheWVkIG92ZXIgVENQLmBcbiAgICAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSByb290RWxlbWVudCBvZiB0aGUgYXBwbGljYXRpb24sIHZpZGVvIHN0cmVhbSBhbmQgYWxsIFVJIGFyZSBjaGlsZHJlbiBvZiB0aGlzIGVsZW1lbnQuXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9ICdwbGF5ZXJVSSc7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdub3NlbGVjdCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy51aUZlYXR1cmVzRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGVsZW1lbnQgdGhhdCBjb250YWlucyBhbGwgdGhlIFVJIGZlYXR1cmVzLCBsaWtlIHRoZSBzdGF0cyBhbmQgc2V0dGluZ3MgcGFuZWxzLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgdWlGZWF0dXJlc0VsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3VpRmVhdHVyZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3VpRmVhdHVyZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3VpRmVhdHVyZUVsZW1lbnQuaWQgPSAndWlGZWF0dXJlcyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3VpRmVhdHVyZUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIGRpc2Nvbm5lY3Qgb3ZlcmxheVxuICAgICAqIEBwYXJhbSB1cGRhdGVUZXh0IC0gdGhlIHRleHQgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBpbiB0aGUgb3ZlcmxheVxuICAgICAqL1xuICAgIHNob3dEaXNjb25uZWN0T3ZlcmxheSh1cGRhdGVUZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5oaWRlQ3VycmVudE92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy51cGRhdGVEaXNjb25uZWN0T3ZlcmxheSh1cGRhdGVUZXh0KTtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0T3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJsYXkgPSB0aGlzLmRpc2Nvbm5lY3RPdmVybGF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgZGlzY29ubmVjdCBvdmVybGF5cyBzcGFuIHRleHRcbiAgICAgKiBAcGFyYW0gdXBkYXRlVGV4dCAtIHRoZSBuZXcgY291bnRkb3duIG51bWJlclxuICAgICAqL1xuICAgIHVwZGF0ZURpc2Nvbm5lY3RPdmVybGF5KHVwZGF0ZVRleHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RPdmVybGF5LnVwZGF0ZSh1cGRhdGVUZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZXMgdGhlIGRpc2Nvbm5lY3Qgb3ZlcmxheXMgYWN0aW9uXG4gICAgICovXG4gICAgb25EaXNjb25uZWN0aW9uQWN0aW9uKCkge1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RPdmVybGF5LmFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZXMgdGhlIGN1cnJlbnQgb3ZlcmxheVxuICAgICAqL1xuICAgIGhpZGVDdXJyZW50T3ZlcmxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudE92ZXJsYXkgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheS5oaWRlKCk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBjb25uZWN0IG92ZXJsYXlcbiAgICAgKi9cbiAgICBzaG93Q29ubmVjdE92ZXJsYXkoKSB7XG4gICAgICAgIHRoaXMuaGlkZUN1cnJlbnRPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuY29ubmVjdE92ZXJsYXkuc2hvdygpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5ID0gdGhpcy5jb25uZWN0T3ZlcmxheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgcGxheSBvdmVybGF5XG4gICAgICovXG4gICAgc2hvd1BsYXlPdmVybGF5KCkge1xuICAgICAgICB0aGlzLmhpZGVDdXJyZW50T3ZlcmxheSgpO1xuICAgICAgICB0aGlzLnBsYXlPdmVybGF5LnNob3coKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheSA9IHRoaXMucGxheU92ZXJsYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIHRleHQgb3ZlcmxheVxuICAgICAqIEBwYXJhbSB0ZXh0IC0gdGhlIHRleHQgdGhhdCB3aWxsIGJlIHNob3duIGluIHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgc2hvd1RleHRPdmVybGF5KHRleHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmhpZGVDdXJyZW50T3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmluZm9PdmVybGF5LnVwZGF0ZSh0ZXh0KTtcbiAgICAgICAgdGhpcy5pbmZvT3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJsYXkgPSB0aGlzLmluZm9PdmVybGF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBlcnJvciBvdmVybGF5XG4gICAgICogQHBhcmFtIHRleHQgLSB0aGUgdGV4dCB0aGF0IHdpbGwgYmUgc2hvd24gaW4gdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBzaG93RXJyb3JPdmVybGF5KHRleHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmhpZGVDdXJyZW50T3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmVycm9yT3ZlcmxheS51cGRhdGUodGV4dCk7XG4gICAgICAgIHRoaXMuZXJyb3JPdmVybGF5LnNob3coKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheSA9IHRoaXMuZXJyb3JPdmVybGF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIG9yIGhpZGVzIHRoZSBzZXR0aW5ncyBwYW5lbCBpZiBjbGlja2VkXG4gICAgICovXG4gICAgc2V0dGluZ3NDbGlja2VkKCkge1xuICAgICAgICB0aGlzLnN0YXRzUGFuZWw/LmhpZGUoKTtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1BhbmVsLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyBvciBoaWRlcyB0aGUgc3RhdHMgcGFuZWwgaWYgY2xpY2tlZFxuICAgICAqL1xuICAgIHN0YXRzQ2xpY2tlZCgpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1BhbmVsPy5oaWRlKCk7XG4gICAgICAgIHRoaXMuc3RhdHNQYW5lbC50b2dnbGVWaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aXZhdGVzIHRoZSBjb25uZWN0IG92ZXJsYXlzIGFjdGlvblxuICAgICAqL1xuICAgIG9uQ29ubmVjdEFjdGlvbigpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0T3ZlcmxheS5hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlcyB0aGUgcGxheSBvdmVybGF5cyBhY3Rpb25cbiAgICAgKi9cbiAgICBvblBsYXlBY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucGxheU92ZXJsYXkuYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgYWZrIG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gY291bnREb3duIC0gdGhlIGNvdW50ZG93biBudW1iZXIgZm9yIHRoZSBhZmsgY291bnRkb3duXG4gICAgICovXG4gICAgc2hvd0Fma092ZXJsYXkoY291bnREb3duOiBudW1iZXIsIGRpc21pc3NBZms6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5oaWRlQ3VycmVudE92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy5hZmtPdmVybGF5LnVwZGF0ZUNvdW50ZG93bihjb3VudERvd24pO1xuICAgICAgICB0aGlzLmFma092ZXJsYXkub25BY3Rpb24oKCkgPT4gZGlzbWlzc0FmaygpKTtcbiAgICAgICAgdGhpcy5hZmtPdmVybGF5LnNob3coKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheSA9IHRoaXMuYWZrT3ZlcmxheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSBDb25uZWN0IE92ZXJsYXkgb3IgYXV0byBjb25uZWN0XG4gICAgICovXG4gICAgc2hvd0Nvbm5lY3RPckF1dG9Db25uZWN0T3ZlcmxheXMoKSB7XG4gICAgICAgIC8vIHNldCB1cCBpZiB0aGUgYXV0byBwbGF5IHdpbGwgYmUgdXNlZCBvciByZWd1bGFyIGNsaWNrIHRvIHN0YXJ0XG4gICAgICAgIGlmICghdGhpcy5zdHJlYW0uY29uZmlnLmlzRmxhZ0VuYWJsZWQoRmxhZ3MuQXV0b0Nvbm5lY3QpKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dDb25uZWN0T3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyB0aGUgd2ViUnRjQXV0b0Nvbm5lY3QgT3ZlcmxheSBhbmQgY29ubmVjdFxuICAgICAqL1xuICAgIG9uV2ViUnRjQXV0b0Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuc2hvd1RleHRPdmVybGF5KCdBdXRvIENvbm5lY3RpbmcgTm93Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIGZ1bmN0aW9uYWxpdHkgdG8gaGFwcGVuIHdoZW4gcmVjZWl2aW5nIGEgd2ViUlRDIGFuc3dlclxuICAgICAqL1xuICAgIG9uV2ViUnRjU2RwKCkge1xuICAgICAgICB0aGlzLnNob3dUZXh0T3ZlcmxheSgnV2ViUlRDIENvbm5lY3Rpb24gTmVnb3RpYXRlZCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIGEgdGV4dCBvdmVybGF5IHRvIGFsZXJ0IHRoZSB1c2VyIHRoZSBzdHJlYW0gaXMgY3VycmVudGx5IGxvYWRpbmdcbiAgICAgKi9cbiAgICBvblN0cmVhbUxvYWRpbmcoKSB7XG4gICAgICAgIC8vIGJ1aWxkIHRoZSBzcGlubmVyIHNwYW5cbiAgICAgICAgY29uc3Qgc3Bpbm5lclNwYW46IEhUTUxTcGFuRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3Bpbm5lclNwYW4uY2xhc3NOYW1lID0gJ3Zpc3VhbGx5LWhpZGRlbic7XG4gICAgICAgIHNwaW5uZXJTcGFuLmlubmVySFRNTCA9ICdMb2FkaW5nLi4uJztcblxuICAgICAgICAvLyBidWlsZCB0aGUgc3Bpbm5lciBkaXZcbiAgICAgICAgY29uc3Qgc3Bpbm5lckRpdjogSFRNTERpdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc3Bpbm5lckRpdi5pZCA9ICdsb2FkaW5nLXNwaW5uZXInO1xuICAgICAgICBzcGlubmVyRGl2LmNsYXNzTmFtZSA9ICdzcGlubmVyLWJvcmRlciBtcy0yJztcbiAgICAgICAgc3Bpbm5lckRpdi5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnc3RhdHVzJyk7XG5cbiAgICAgICAgLy8gYXBwZW5kIHRoZSBzcGlubmVyIHRvIHRoZSBlbGVtZW50XG4gICAgICAgIHNwaW5uZXJEaXYuYXBwZW5kQ2hpbGQoc3Bpbm5lclNwYW4pO1xuXG4gICAgICAgIHRoaXMuc2hvd1RleHRPdmVybGF5KCdMb2FkaW5nIFN0cmVhbSAnICsgc3Bpbm5lckRpdi5vdXRlckhUTUwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGZpcmVkIHdoZW4gdGhlIHZpZGVvIGlzIGRpc2Nvbm5lY3RlZCAtIGRpc3BsYXlzIHRoZSBlcnJvciBvdmVybGF5IGFuZCByZXNldHMgdGhlIGJ1dHRvbnMgc3RyZWFtIHRvb2xzIHVwb24gZGlzY29ubmVjdFxuICAgICAqIEBwYXJhbSBldmVudFN0cmluZyAtIHRoZSBldmVudCB0ZXh0IHRoYXQgd2lsbCBiZSBzaG93biBpbiB0aGUgb3ZlcmxheVxuICAgICAqIEBwYXJhbSBhbGxvd0NsaWNrVG9SZWNvbm5lY3QgLSB0cnVlIGlmIHdlIHdhbnQgdG8gYWxsb3cgdGhlIHVzZXIgdG8gY2xpY2sgdG8gcmVjb25uZWN0LiBPdGhlcndpc2UgaXQncyBqdXN0IGEgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBvbkRpc2Nvbm5lY3QoZXZlbnRTdHJpbmc6IHN0cmluZywgYWxsb3dDbGlja1RvUmVjb25uZWN0OiBib29sZWFuKSB7XG4gICAgICAgIGNvbnN0IG92ZXJsYXlNZXNzYWdlID0gJ0Rpc2Nvbm5lY3RlZCcgKyAoZXZlbnRTdHJpbmcgPyBgOiAke2V2ZW50U3RyaW5nfWAgOiAnJyk7XG4gICAgICAgIGlmIChhbGxvd0NsaWNrVG9SZWNvbm5lY3QpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Rpc2Nvbm5lY3RPdmVybGF5KGAke292ZXJsYXlNZXNzYWdlfSBDbGljayBUbyBSZXN0YXJ0LmApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93RXJyb3JPdmVybGF5KG92ZXJsYXlNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBkaXNhYmxlIHN0YXJ0aW5nIGEgbGF0ZW5jeSBjaGVja3NcbiAgICAgICAgdGhpcy5zdGF0c1BhbmVsPy5vbkRpc2Nvbm5lY3QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHdoZW4gV2ViIFJ0YyBpcyBjb25uZWN0aW5nXG4gICAgICovXG4gICAgb25XZWJSdGNDb25uZWN0aW5nKCkge1xuICAgICAgICB0aGlzLnNob3dUZXh0T3ZlcmxheSgnU3RhcnRpbmcgY29ubmVjdGlvbiB0byBzZXJ2ZXIsIHBsZWFzZSB3YWl0Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB3aGVuIFdlYiBSdGMgaGFzIGNvbm5lY3RlZFxuICAgICAqL1xuICAgIG9uV2ViUnRjQ29ubmVjdGVkKCkge1xuICAgICAgICB0aGlzLnNob3dUZXh0T3ZlcmxheSgnV2ViUlRDIGNvbm5lY3RlZCwgd2FpdGluZyBmb3IgdmlkZW8nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHdoZW4gV2ViIFJ0YyBmYWlscyB0byBjb25uZWN0XG4gICAgICovXG4gICAgb25XZWJSdGNGYWlsZWQoKSB7XG4gICAgICAgIHRoaXMuc2hvd0Vycm9yT3ZlcmxheSgnVW5hYmxlIHRvIHNldHVwIHZpZGVvJyk7XG4gICAgfVxuXG4gICAgb25Mb2FkRnJlZXplRnJhbWUoc2hvdWxkU2hvd1BsYXlPdmVybGF5OiBib29sZWFuKSB7XG4gICAgICAgIGlmIChzaG91bGRTaG93UGxheU92ZXJsYXkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIExvZ2dlci5Mb2coTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSwgJ3Nob3dpbmcgcGxheSBvdmVybGF5Jyk7XG4gICAgICAgICAgICB0aGlzLnNob3dQbGF5T3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QbGF5U3RyZWFtKCkge1xuICAgICAgICB0aGlzLmhpZGVDdXJyZW50T3ZlcmxheSgpO1xuICAgIH1cblxuICAgIG9uUGxheVN0cmVhbUVycm9yKG1lc3NhZ2U6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNob3dFcnJvck92ZXJsYXkobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgb25QbGF5U3RyZWFtUmVqZWN0ZWQob25SZWplY3RlZFJlYXNvbjogdW5rbm93bikge1xuICAgICAgICB0aGlzLnNob3dQbGF5T3ZlcmxheSgpO1xuICAgIH1cblxuICAgIG9uVmlkZW9Jbml0aWFsaXplZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0cmVhbS5jb25maWcuaXNGbGFnRW5hYmxlZChGbGFncy5BdXRvUGxheVZpZGVvKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93UGxheU92ZXJsYXkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0YXRzUGFuZWw/Lm9uVmlkZW9Jbml0aWFsaXplZCh0aGlzLnN0cmVhbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIGZ1bmN0aW9uYWxpdHkgdG8gaGFwcGVuIHdoZW4gY2FsY3VsYXRpbmcgdGhlIGF2ZXJhZ2UgdmlkZW8gZW5jb2RlciBxcFxuICAgICAqIEBwYXJhbSBRUCAtIHRoZSBxdWFsaXR5IG51bWJlciBvZiB0aGUgc3RyZWFtXG4gICAgICovXG4gICAgb25WaWRlb0VuY29kZXJBdmdRUChRUDogbnVtYmVyKSB7XG4gICAgICAgIC8vIFVwZGF0ZSBpbnRlcm5hbCBRUCBpbmRpY2F0b3IgaWYgb25lIGlzIHByZXNlbnRcbiAgICAgICAgaWYgKCEhdGhpcy52aWRlb1FwSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnZpZGVvUXBJbmRpY2F0b3IudXBkYXRlUXBUb29sdGlwKFFQKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSW5pdGlhbFNldHRpbmdzKHNldHRpbmdzOiBJbml0aWFsU2V0dGluZ3MpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLlBpeGVsU3RyZWFtaW5nU2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHNQYW5lbD8uY29uZmlndXJlKHNldHRpbmdzLlBpeGVsU3RyZWFtaW5nU2V0dGluZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TdGF0c1JlY2VpdmVkKGFnZ3JlZ2F0ZWRTdGF0czogQWdncmVnYXRlZFN0YXRzKSB7XG4gICAgICAgIC8vIEdyYWIgYWxsIHN0YXRzIHdlIGNhbiBvZmYgdGhlIGFnZ3JlZ2F0ZWQgc3RhdHNcbiAgICAgICAgdGhpcy5zdGF0c1BhbmVsPy5oYW5kbGVTdGF0cyhhZ2dyZWdhdGVkU3RhdHMpO1xuICAgIH1cblxuICAgIG9uTGF0ZW5jeVRlc3RSZXN1bHRzKGxhdGVuY3lUaW1pbmdzOiBMYXRlbmN5VGVzdFJlc3VsdHMpIHtcbiAgICAgICAgdGhpcy5zdGF0c1BhbmVsPy5sYXRlbmN5VGVzdC5oYW5kbGVUZXN0UmVzdWx0KGxhdGVuY3lUaW1pbmdzKTtcbiAgICB9XG5cbiAgICBvbkRhdGFDaGFubmVsTGF0ZW5jeVRlc3RSZXN1bHRzKHJlc3VsdDogRGF0YUNoYW5uZWxMYXRlbmN5VGVzdFJlc3VsdCkge1xuICAgICAgICB0aGlzLnN0YXRzUGFuZWw/LmRhdGFDaGFubmVsTGF0ZW5jeVRlc3QuaGFuZGxlVGVzdFJlc3VsdChyZXN1bHQpO1xuICAgIH1cblxuICAgIG9uUGxheWVyQ291bnQocGxheWVyQ291bnQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLnN0YXRzUGFuZWw/LmhhbmRsZVBsYXllckNvdW50KHBsYXllckNvdW50KTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdHJlYW1lckxpc3RNZXNzYWdlKG1lc3NhZ2VTdHJlYW1pbmdMaXN0OiBNZXNzYWdlU3RyZWFtZXJMaXN0LCBhdXRvU2VsZWN0ZWRTdHJlYW1lcklkOiBzdHJpbmcsIHdhbnRlZFN0cmVhbWVySWQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCB3YWl0Rm9yU3RyZWFtZXIgPSB0aGlzLnN0cmVhbS5jb25maWcuaXNGbGFnRW5hYmxlZChGbGFncy5XYWl0Rm9yU3RyZWFtZXIpO1xuICAgICAgICBjb25zdCBpc1JlY29ubmVjdGluZyA9IHRoaXMuc3RyZWFtLmlzUmVjb25uZWN0aW5nKCk7XG4gICAgICAgIGxldCBtZXNzYWdlOiBzdHJpbmcgPSBudWxsO1xuICAgICAgICBsZXQgYWxsb3dSZXN0YXJ0OiBib29sZWFuID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIWF1dG9TZWxlY3RlZFN0cmVhbWVySWQpIHtcbiAgICAgICAgICAgIGlmICh3YWl0Rm9yU3RyZWFtZXIgJiYgd2FudGVkU3RyZWFtZXJJZCkge1xuICAgICAgICAgICAgICAgIGlmIChpc1JlY29ubmVjdGluZykge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gYFdhaXRpbmcgZm9yICR7d2FudGVkU3RyZWFtZXJJZH0gdG8gYmVjb21lIGF2YWlsYWJsZS5gO1xuICAgICAgICAgICAgICAgICAgICBhbGxvd1Jlc3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gYEdhdmUgdXAgd2FpdGluZyBmb3IgJHt3YW50ZWRTdHJlYW1lcklkfSB0byBiZWNvbWUgYXZhaWxhYmxlLiBDbGljayB0byB0cnkgYWdhaW5gO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVzc2FnZVN0cmVhbWluZ0xpc3QuaWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gYCBvciBzZWxlY3QgYSBzdHJlYW1lciBmcm9tIHRoZSBzZXR0aW5ncyBtZW51LmA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYWxsb3dSZXN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2VTdHJlYW1pbmdMaXN0Lmlkcy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChpc1JlY29ubmVjdGluZykge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gYFdhaXRpbmcgZm9yIGEgc3RyZWFtZXIgdG8gYmVjb21lIGF2YWlsYWJsZS5gO1xuICAgICAgICAgICAgICAgICAgICBhbGxvd1Jlc3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID0gYE5vIHN0cmVhbWVycyBhdmFpbGFibGUuIENsaWNrIHRvIHRyeSBhZ2Fpbi5gO1xuICAgICAgICAgICAgICAgICAgICBhbGxvd1Jlc3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IGBNdWx0aXBsZSBzdHJlYW1lcnMgYXZhaWxhYmxlLiBTZWxlY3Qgb25lIGZyb20gdGhlIHNldHRpbmdzIG1lbnUuYDtcbiAgICAgICAgICAgICAgICBhbGxvd1Jlc3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFsbG93UmVzdGFydCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Rpc2Nvbm5lY3RPdmVybGF5KG1lc3NhZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dUZXh0T3ZlcmxheShtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBsaWdodC9kYXJrIGNvbG9yIG1vZGVcbiAgICAgKiBAcGFyYW0gaXNMaWdodE1vZGUgLSBzaG91bGQgd2UgdXNlIGEgbGlnaHQgb3IgZGFyayBjb2xvciBzY2hlbWVcbiAgICAgKi9cbiAgICBzZXRDb2xvck1vZGUoaXNMaWdodE1vZGU6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHRoaXMub25Db2xvck1vZGVDaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ29sb3JNb2RlQ2hhbmdlZChpc0xpZ2h0TW9kZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQge1xuICAgIENvbmZpZyxcbiAgICBGbGFnc0lkcyxcbiAgICBOdW1lcmljUGFyYW1ldGVyc0lkcyxcbiAgICBPcHRpb25QYXJhbWV0ZXJzSWRzLFxuICAgIFRleHRQYXJhbWV0ZXJzSWRzLFxuICAgIFRleHRQYXJhbWV0ZXJzLFxuICAgIE9wdGlvblBhcmFtZXRlcnMsXG4gICAgRmxhZ3MsXG4gICAgTnVtZXJpY1BhcmFtZXRlcnMsXG4gICAgU2V0dGluZ3NDaGFuZ2VkRXZlbnQsXG4gICAgU2V0dGluZ0ZsYWcsXG4gICAgU2V0dGluZ051bWJlcixcbiAgICBTZXR0aW5nVGV4dCxcbiAgICBTZXR0aW5nT3B0aW9uLFxuICAgIExvZ2dlcixcbiAgICBTZXR0aW5nQmFzZVxufSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40JztcbmltcG9ydCB7IFNldHRpbmdVSUZsYWcgfSBmcm9tICcuL1NldHRpbmdVSUZsYWcnO1xuaW1wb3J0IHsgU2V0dGluZ1VJTnVtYmVyIH0gZnJvbSAnLi9TZXR0aW5nVUlOdW1iZXInO1xuaW1wb3J0IHsgU2V0dGluZ1VJVGV4dCB9IGZyb20gJy4vU2V0dGluZ1VJVGV4dCc7XG5pbXBvcnQgeyBTZXR0aW5nVUlPcHRpb24gfSBmcm9tICcuL1NldHRpbmdVSU9wdGlvbic7XG5cbmV4cG9ydCBjb25zdCBMaWdodE1vZGUgPSAnTGlnaHRNb2RlJyBhcyBjb25zdDtcbnR5cGUgRXh0cmFGbGFncyA9IHR5cGVvZiBMaWdodE1vZGU7XG5leHBvcnQgdHlwZSBGbGFnc0lkc0V4dGVuZGVkID0gRmxhZ3NJZHMgfCBFeHRyYUZsYWdzO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnVUkge1xuICAgIHByaXZhdGUgY3VzdG9tRmxhZ3MgPSBuZXcgTWFwPFxuICAgICAgICBGbGFnc0lkc0V4dGVuZGVkLFxuICAgICAgICBTZXR0aW5nRmxhZzxGbGFnc0lkc0V4dGVuZGVkPlxuICAgID4oKTtcblxuICAgIC8qIEEgbWFwIG9mIGZsYWdzIHRoYXQgY2FuIGJlIHRvZ2dsZWQgLSBvcHRpb25zIHRoYXQgY2FuIGJlIHNldCBpbiB0aGUgYXBwbGljYXRpb24gLSBlLmcuIFVzZSBNaWM/ICovXG4gICAgcHJpdmF0ZSBmbGFnc1VpID0gbmV3IE1hcDxcbiAgICAgICAgRmxhZ3NJZHNFeHRlbmRlZCxcbiAgICAgICAgU2V0dGluZ1VJRmxhZzxGbGFnc0lkc0V4dGVuZGVkPlxuICAgID4oKTtcblxuICAgIC8qIEEgbWFwIG9mIG51bWVyaWNhbCBzZXR0aW5ncyAtIG9wdGlvbnMgdGhhdCBjYW4gYmUgaW4gdGhlIGFwcGxpY2F0aW9uIC0gZS5nLiBNaW5CaXRyYXRlICovXG4gICAgcHJpdmF0ZSBudW1lcmljUGFyYW1ldGVyc1VpID0gbmV3IE1hcDxcbiAgICAgICAgTnVtZXJpY1BhcmFtZXRlcnNJZHMsXG4gICAgICAgIFNldHRpbmdVSU51bWJlclxuICAgID4oKTtcblxuICAgIC8qIEEgbWFwIG9mIHRleHQgc2V0dGluZ3MgLSBlLmcuIHNpZ25hbGxpbmcgc2VydmVyIHVybCAqL1xuICAgIHByaXZhdGUgdGV4dFBhcmFtZXRlcnNVaSA9IG5ldyBNYXA8VGV4dFBhcmFtZXRlcnNJZHMsIFNldHRpbmdVSVRleHQ+KCk7XG5cbiAgICAvKiBBIG1hcCBvZiBlbnVtIGJhc2VkIHNldHRpbmdzIC0gZS5nLiBwcmVmZXJyZWQgY29kZWMgKi9cbiAgICBwcml2YXRlIG9wdGlvblBhcmFtZXRlcnNVaSA9IG5ldyBNYXA8XG4gICAgICAgIE9wdGlvblBhcmFtZXRlcnNJZHMsXG4gICAgICAgIFNldHRpbmdVSU9wdGlvblxuICAgID4oKTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLSBTZXR0aW5ncyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgY29uc3RydWN0b3IoY29uZmlnOiBDb25maWcpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVDdXN0b21VSVNldHRpbmdzKGNvbmZpZy51c2VVcmxQYXJhbXMpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVyU2V0dGluZ3NVSUNvbXBvbmVudHMoY29uZmlnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgY3VzdG9tIFVJIHNldHRpbmdzIHRoYXQgYXJlIG5vdCBwcm92aWRlZCBieSB0aGUgUGl4ZWwgU3RyZWFtaW5nIGxpYnJhcnkuXG4gICAgICovXG4gICAgY3JlYXRlQ3VzdG9tVUlTZXR0aW5ncyh1c2VVcmxQYXJhbXM6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5jdXN0b21GbGFncy5zZXQoXG4gICAgICAgICAgICBMaWdodE1vZGUsXG4gICAgICAgICAgICBuZXcgU2V0dGluZ0ZsYWc8RmxhZ3NJZHNFeHRlbmRlZD4oXG4gICAgICAgICAgICAgICAgTGlnaHRNb2RlLFxuICAgICAgICAgICAgICAgICdDb2xvciBTY2hlbWU6IERhcmsgTW9kZScsXG4gICAgICAgICAgICAgICAgJ1BhZ2Ugc3R5bGluZyB3aWxsIGJlIGVpdGhlciBsaWdodCBvciBkYXJrJyxcbiAgICAgICAgICAgICAgICBmYWxzZSAvKmlmIHdhbnQgdG8gdXNlIHN5c3RlbSBwcmVmOiAod2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpJykubWF0Y2hlcykqLyxcbiAgICAgICAgICAgICAgICB1c2VVcmxQYXJhbXMsXG4gICAgICAgICAgICAgICAgKGlzTGlnaHRNb2RlOiBib29sZWFuLCBzZXR0aW5nOiBTZXR0aW5nQmFzZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLmxhYmVsID0gYENvbG9yIFNjaGVtZTogJHtpc0xpZ2h0TW9kZSA/ICdMaWdodCcgOiAnRGFyayd9IE1vZGVgO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIFVJIHdyYXBwZXIgY29tcG9uZW50cyBmb3IgZWFjaCBzZXR0aW5nIGVsZW1lbnQgaW4gY29uZmlnLlxuICAgICAqIEBwYXJhbSBjb25maWdcbiAgICAgKi9cbiAgICByZWdpc3RlclNldHRpbmdzVUlDb21wb25lbnRzKGNvbmZpZzogQ29uZmlnKSB7XG4gICAgICAgIGZvciAoY29uc3Qgc2V0dGluZyBvZiBjb25maWcuZ2V0RmxhZ3MoKSkge1xuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLnNldChzZXR0aW5nLmlkLCBuZXcgU2V0dGluZ1VJRmxhZyhzZXR0aW5nKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBzZXR0aW5nIG9mIEFycmF5LmZyb20odGhpcy5jdXN0b21GbGFncy52YWx1ZXMoKSkpIHtcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5zZXQoXG4gICAgICAgICAgICAgICAgc2V0dGluZy5pZCxcbiAgICAgICAgICAgICAgICBuZXcgU2V0dGluZ1VJRmxhZzxGbGFnc0lkc0V4dGVuZGVkPihzZXR0aW5nKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHNldHRpbmcgb2YgY29uZmlnLmdldFRleHRTZXR0aW5ncygpKSB7XG4gICAgICAgICAgICB0aGlzLnRleHRQYXJhbWV0ZXJzVWkuc2V0KHNldHRpbmcuaWQsIG5ldyBTZXR0aW5nVUlUZXh0KHNldHRpbmcpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHNldHRpbmcgb2YgY29uZmlnLmdldE51bWVyaWNTZXR0aW5ncygpKSB7XG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuc2V0KFxuICAgICAgICAgICAgICAgIHNldHRpbmcuaWQsXG4gICAgICAgICAgICAgICAgbmV3IFNldHRpbmdVSU51bWJlcihzZXR0aW5nKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHNldHRpbmcgb2YgY29uZmlnLmdldE9wdGlvblNldHRpbmdzKCkpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uUGFyYW1ldGVyc1VpLnNldChcbiAgICAgICAgICAgICAgICBzZXR0aW5nLmlkLFxuICAgICAgICAgICAgICAgIG5ldyBTZXR0aW5nVUlPcHRpb24oc2V0dGluZylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlIERPTSBlbGVtZW50cyBmb3IgYSBzZXR0aW5ncyBzZWN0aW9uIHdpdGggYSBoZWFkaW5nLlxuICAgICAqIEBwYXJhbSBzZXR0aW5nc0VsZW0gVGhlIHBhcmVudCBjb250YWluZXIgZm9yIG91ciBET00gZWxlbWVudHMuXG4gICAgICogQHBhcmFtIHNlY3Rpb25IZWFkaW5nIFRoZSBoZWFkaW5nIGVsZW1lbnQgdG8gZ28gaW50byB0aGUgc2VjdGlvbi5cbiAgICAgKiBAcmV0dXJucyBUaGUgY29uc3RydWN0ZWQgRE9NIGVsZW1lbnQgZm9yIHRoZSBzZWN0aW9uLlxuICAgICAqL1xuICAgIGJ1aWxkU2VjdGlvbldpdGhIZWFkaW5nKHNldHRpbmdzRWxlbTogSFRNTEVsZW1lbnQsIHNlY3Rpb25IZWFkaW5nOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gbWFrZSBzZWN0aW9uIGVsZW1lbnRcbiAgICAgICAgY29uc3Qgc2VjdGlvbkVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgIHNlY3Rpb25FbGVtLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzQ29udGFpbmVyJyk7XG5cbiAgICAgICAgLy8gbWFrZSBzZWN0aW9uIGhlYWRpbmdcbiAgICAgICAgY29uc3QgcHNTZXR0aW5nc0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwc1NldHRpbmdzSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzSGVhZGVyJyk7XG4gICAgICAgIHBzU2V0dGluZ3NIZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3MtdGV4dCcpO1xuICAgICAgICBwc1NldHRpbmdzSGVhZGVyLnRleHRDb250ZW50ID0gc2VjdGlvbkhlYWRpbmc7XG5cbiAgICAgICAgLy8gYWRkIHNlY3Rpb24gYW5kIGhlYWRpbmcgdG8gcGFyZW50IHNldHRpbmdzIGVsZW1lbnRcbiAgICAgICAgc2VjdGlvbkVsZW0uYXBwZW5kQ2hpbGQocHNTZXR0aW5nc0hlYWRlcik7XG4gICAgICAgIHNldHRpbmdzRWxlbS5hcHBlbmRDaGlsZChzZWN0aW9uRWxlbSk7XG4gICAgICAgIHJldHVybiBzZWN0aW9uRWxlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCBmbGFncyB3aXRoIHRoZWlyIGRlZmF1bHQgdmFsdWVzIGFuZCBhZGQgdGhlbSB0byB0aGUgYENvbmZpZy5mbGFnc2AgbWFwLlxuICAgICAqIEBwYXJhbSBzZXR0aW5nc0VsZW0gLSBUaGUgZWxlbWVudCB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgaW5kaXZpZHVhbCBzZXR0aW5ncyBzZWN0aW9ucywgZmxhZ3MsIGFuZCBzbyBvbi5cbiAgICAgKi9cbiAgICBwb3B1bGF0ZVNldHRpbmdzRWxlbWVudChzZXR0aW5nc0VsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIC8qIFNldHVwIGFsbCBQaXhlbCBTdHJlYW1pbmcgc3BlY2lmaWMgc2V0dGluZ3MgKi9cbiAgICAgICAgY29uc3QgcHNTZXR0aW5nc1NlY3Rpb24gPSB0aGlzLmJ1aWxkU2VjdGlvbldpdGhIZWFkaW5nKFxuICAgICAgICAgICAgc2V0dGluZ3NFbGVtLFxuICAgICAgICAgICAgJ1BpeGVsIFN0cmVhbWluZydcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBtYWtlIHNldHRpbmdzIHNob3cgdXAgaW4gRE9NXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ1RleHQoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMudGV4dFBhcmFtZXRlcnNVaS5nZXQoVGV4dFBhcmFtZXRlcnMuU2lnbmFsbGluZ1NlcnZlclVybClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nT3B0aW9uKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm9wdGlvblBhcmFtZXRlcnNVaS5nZXQoT3B0aW9uUGFyYW1ldGVycy5TdHJlYW1lcklkKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkF1dG9Db25uZWN0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkF1dG9QbGF5VmlkZW8pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuQnJvd3NlclNlbmRPZmZlcilcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLCBcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuVXNlTWljKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLlN0YXJ0VmlkZW9NdXRlZClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5Jc1F1YWxpdHlDb250cm9sbGVyKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkZvcmNlTW9ub0F1ZGlvKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkZvcmNlVFVSTilcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5TdXBwcmVzc0Jyb3dzZXJLZXlzKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkFGS0RldGVjdGlvbilcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5XYWl0Rm9yU3RyZWFtZXIpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoTnVtZXJpY1BhcmFtZXRlcnMuQUZLVGltZW91dFNlY3MpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoTnVtZXJpY1BhcmFtZXRlcnMuTWF4UmVjb25uZWN0QXR0ZW1wdHMpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoTnVtZXJpY1BhcmFtZXRlcnMuU3RyZWFtZXJBdXRvSm9pbkludGVydmFsKVxuICAgICAgICApO1xuXG4gICAgICAgIC8qIFNldHVwIGFsbCB2aWV3L3VpIHJlbGF0ZWQgc2V0dGluZ3MgdW5kZXIgdGhpcyBzZWN0aW9uICovXG4gICAgICAgIGNvbnN0IHZpZXdTZXR0aW5nc1NlY3Rpb24gPSB0aGlzLmJ1aWxkU2VjdGlvbldpdGhIZWFkaW5nKFxuICAgICAgICAgICAgc2V0dGluZ3NFbGVtLFxuICAgICAgICAgICAgJ1VJJ1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgdmlld1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuTWF0Y2hWaWV3cG9ydFJlc29sdXRpb24pXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHZpZXdTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkhvdmVyaW5nTW91c2VNb2RlKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcodmlld1NldHRpbmdzU2VjdGlvbiwgdGhpcy5mbGFnc1VpLmdldChMaWdodE1vZGUpKTtcblxuICAgICAgICAvKiBTZXR1cCBhbGwgZW5jb2RlciByZWxhdGVkIHNldHRpbmdzIHVuZGVyIHRoaXMgc2VjdGlvbiAqL1xuICAgICAgICBjb25zdCBpbnB1dFNldHRpbmdzU2VjdGlvbiA9IHRoaXMuYnVpbGRTZWN0aW9uV2l0aEhlYWRpbmcoXG4gICAgICAgICAgICBzZXR0aW5nc0VsZW0sXG4gICAgICAgICAgICAnSW5wdXQnXG4gICAgICAgICk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgaW5wdXRTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLktleWJvYXJkSW5wdXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIGlucHV0U2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5Nb3VzZUlucHV0KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBpbnB1dFNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuVG91Y2hJbnB1dClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgaW5wdXRTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLkdhbWVwYWRJbnB1dClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgaW5wdXRTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLlhSQ29udHJvbGxlcklucHV0KVxuICAgICAgICApO1xuXG4gICAgICAgIC8qIFNldHVwIGFsbCBlbmNvZGVyIHJlbGF0ZWQgc2V0dGluZ3MgdW5kZXIgdGhpcyBzZWN0aW9uICovXG4gICAgICAgIGNvbnN0IGVuY29kZXJTZXR0aW5nc1NlY3Rpb24gPSB0aGlzLmJ1aWxkU2VjdGlvbldpdGhIZWFkaW5nKFxuICAgICAgICAgICAgc2V0dGluZ3NFbGVtLFxuICAgICAgICAgICAgJ0VuY29kZXInXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nTnVtZXJpYyhcbiAgICAgICAgICAgIGVuY29kZXJTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuZ2V0KE51bWVyaWNQYXJhbWV0ZXJzLk1pblFQKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICAgICAgZW5jb2RlclNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoTnVtZXJpY1BhcmFtZXRlcnMuTWF4UVApXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgcHJlZmVycmVkQ29kZWNPcHRpb24gPSB0aGlzLm9wdGlvblBhcmFtZXRlcnNVaS5nZXQoXG4gICAgICAgICAgICBPcHRpb25QYXJhbWV0ZXJzLlByZWZlcnJlZENvZGVjXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ09wdGlvbihcbiAgICAgICAgICAgIGVuY29kZXJTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm9wdGlvblBhcmFtZXRlcnNVaS5nZXQoT3B0aW9uUGFyYW1ldGVycy5QcmVmZXJyZWRDb2RlYylcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgcHJlZmVycmVkQ29kZWNPcHRpb24gJiZcbiAgICAgICAgICAgIFsuLi5wcmVmZXJyZWRDb2RlY09wdGlvbi5zZWxlY3Rvci5vcHRpb25zXVxuICAgICAgICAgICAgICAgIC5tYXAoKG8pID0+IG8udmFsdWUpXG4gICAgICAgICAgICAgICAgLmluY2x1ZGVzKCdPbmx5IGF2YWlsYWJsZSBvbiBDaHJvbWUnKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHByZWZlcnJlZENvZGVjT3B0aW9uLmRpc2FibGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIFNldHVwIGFsbCB3ZWJydGMgcmVsYXRlZCBzZXR0aW5ncyB1bmRlciB0aGlzIHNlY3Rpb24gKi9cbiAgICAgICAgY29uc3Qgd2VicnRjU2V0dGluZ3NTZWN0aW9uID0gdGhpcy5idWlsZFNlY3Rpb25XaXRoSGVhZGluZyhcbiAgICAgICAgICAgIHNldHRpbmdzRWxlbSxcbiAgICAgICAgICAgICdXZWJSVEMnXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nTnVtZXJpYyhcbiAgICAgICAgICAgIHdlYnJ0Y1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoTnVtZXJpY1BhcmFtZXRlcnMuV2ViUlRDRlBTKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICAgICAgd2VicnRjU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5XZWJSVENNaW5CaXRyYXRlKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICAgICAgd2VicnRjU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5XZWJSVENNYXhCaXRyYXRlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIFNldHRpbmdUZXh0IGVsZW1lbnQgdG8gYSBwYXJ0aWN1bGFyIHNldHRpbmdzIHNlY3Rpb24gaW4gdGhlIERPTSBhbmQgcmVnaXN0ZXJzIHRoYXQgdGV4dCBpbiB0aGUgdGV4dCBzZXR0aW5ncyBtYXAuXG4gICAgICogQHBhcmFtIHNldHRpbmdzU2VjdGlvbiBUaGUgc2V0dGluZ3Mgc2VjdGlvbiBIVE1MIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHNldHRpbmdUZXh0IFRoZSB0ZXh0dWFsIHNldHRpbmdzIG9iamVjdC5cbiAgICAgKi9cbiAgICBhZGRTZXR0aW5nVGV4dChcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uOiBIVE1MRWxlbWVudCxcbiAgICAgICAgc2V0dGluZ1RleHQ/OiBTZXR0aW5nVUlUZXh0XG4gICAgKTogdm9pZCB7XG4gICAgICAgIGlmIChzZXR0aW5nVGV4dCkge1xuICAgICAgICAgICAgc2V0dGluZ3NTZWN0aW9uLmFwcGVuZENoaWxkKHNldHRpbmdUZXh0LnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMudGV4dFBhcmFtZXRlcnNVaS5zZXQoc2V0dGluZ1RleHQuc2V0dGluZy5pZCwgc2V0dGluZ1RleHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgU2V0dGluZ0ZsYWcgZWxlbWVudCB0byBhIHBhcnRpY3VsYXIgc2V0dGluZ3Mgc2VjdGlvbiBpbiB0aGUgRE9NIGFuZCByZWdpc3RlcnMgdGhhdCBmbGFnIGluIHRoZSBDb25maWcuZmxhZyBtYXAuXG4gICAgICogQHBhcmFtIHNldHRpbmdzU2VjdGlvbiBUaGUgc2V0dGluZ3Mgc2VjdGlvbiBIVE1MIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHNldHRpbmdGbGFnIFRoZSBzZXR0aW5ncyBmbGFnIG9iamVjdC5cbiAgICAgKi9cbiAgICBhZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgc2V0dGluZ3NTZWN0aW9uOiBIVE1MRWxlbWVudCxcbiAgICAgICAgc2V0dGluZ0ZsYWc/OiBTZXR0aW5nVUlGbGFnPEZsYWdzSWRzRXh0ZW5kZWQ+XG4gICAgKTogdm9pZCB7XG4gICAgICAgIGlmIChzZXR0aW5nRmxhZykge1xuICAgICAgICAgICAgc2V0dGluZ3NTZWN0aW9uLmFwcGVuZENoaWxkKHNldHRpbmdGbGFnLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5zZXQoc2V0dGluZ0ZsYWcuc2V0dGluZy5pZCwgc2V0dGluZ0ZsYWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgbnVtZXJpYyBzZXR0aW5nIGVsZW1lbnQgdG8gYSBwYXJ0aWN1bGFyIHNldHRpbmdzIHNlY3Rpb24gaW4gdGhlIERPTSBhbmQgcmVnaXN0ZXJzIHRoYXQgZmxhZyBpbiB0aGUgQ29uZmlnLm51bWVyaWNQYXJhbWV0ZXJzIG1hcC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NTZWN0aW9uIFRoZSBzZXR0aW5ncyBzZWN0aW9uIEhUTUwgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ0ZsYWcgVGhlIHNldHRpbmdzIGZsYWcgb2JqZWN0LlxuICAgICAqL1xuICAgIGFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICBzZXR0aW5nc1NlY3Rpb246IEhUTUxFbGVtZW50LFxuICAgICAgICBzZXR0aW5nPzogU2V0dGluZ1VJTnVtYmVyXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGlmIChzZXR0aW5nKSB7XG4gICAgICAgICAgICBzZXR0aW5nc1NlY3Rpb24uYXBwZW5kQ2hpbGQoc2V0dGluZy5yb290RWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuc2V0KHNldHRpbmcuc2V0dGluZy5pZCwgc2V0dGluZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYW4gZW51bSBiYXNlZCBzZXR0aW5ncyBlbGVtZW50IHRvIGEgcGFydGljdWxhciBzZXR0aW5ncyBzZWN0aW9uIGluIHRoZSBET00gYW5kIHJlZ2lzdGVycyB0aGF0IGZsYWcgaW4gdGhlIENvbmZpZy5lbnVtUGFyYW1ldGVycyBtYXAuXG4gICAgICogQHBhcmFtIHNldHRpbmdzU2VjdGlvbiBUaGUgc2V0dGluZ3Mgc2VjdGlvbiBIVE1MIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHNldHRpbmdGbGFnIFRoZSBzZXR0aW5ncyBmbGFnIG9iamVjdC5cbiAgICAgKi9cbiAgICBhZGRTZXR0aW5nT3B0aW9uKFxuICAgICAgICBzZXR0aW5nc1NlY3Rpb246IEhUTUxFbGVtZW50LFxuICAgICAgICBzZXR0aW5nPzogU2V0dGluZ1VJT3B0aW9uXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGlmIChzZXR0aW5nKSB7XG4gICAgICAgICAgICBzZXR0aW5nc1NlY3Rpb24uYXBwZW5kQ2hpbGQoc2V0dGluZy5yb290RWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLm9wdGlvblBhcmFtZXRlcnNVaS5zZXQoc2V0dGluZy5zZXR0aW5nLmlkLCBzZXR0aW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU2V0dGluZ3NDaGFuZ2VkKHsgZGF0YTogeyBpZCwgdGFyZ2V0LCB0eXBlIH0gfTogU2V0dGluZ3NDaGFuZ2VkRXZlbnQpIHtcbiAgICAgICAgaWYgKHR5cGUgPT09ICdmbGFnJykge1xuICAgICAgICAgICAgY29uc3QgX2lkID0gaWQgYXMgRmxhZ3NJZHM7XG4gICAgICAgICAgICBjb25zdCBfdGFyZ2V0ID0gdGFyZ2V0IGFzIFNldHRpbmdGbGFnO1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZyA9IHRoaXMuZmxhZ3NVaS5nZXQoX2lkKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcuZmxhZyAhPT0gX3RhcmdldC5mbGFnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcuZmxhZyA9IF90YXJnZXQuZmxhZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcubGFiZWwgIT09IF90YXJnZXQubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5sYWJlbCA9IF90YXJnZXQubGFiZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBjb25zdCBfaWQgPSBpZCBhcyBOdW1lcmljUGFyYW1ldGVyc0lkcztcbiAgICAgICAgICAgIGNvbnN0IF90YXJnZXQgPSB0YXJnZXQgYXMgU2V0dGluZ051bWJlcjtcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmcgPSB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuZ2V0KF9pZCk7XG4gICAgICAgICAgICBpZiAoc2V0dGluZykge1xuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nLm51bWJlciAhPT0gX3RhcmdldC5udW1iZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5udW1iZXIgPSBfdGFyZ2V0Lm51bWJlcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcubGFiZWwgIT09IF90YXJnZXQubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5sYWJlbCA9IF90YXJnZXQubGFiZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgY29uc3QgX2lkID0gaWQgYXMgVGV4dFBhcmFtZXRlcnNJZHM7XG4gICAgICAgICAgICBjb25zdCBfdGFyZ2V0ID0gdGFyZ2V0IGFzIFNldHRpbmdUZXh0O1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZyA9IHRoaXMudGV4dFBhcmFtZXRlcnNVaS5nZXQoX2lkKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcudGV4dCAhPT0gX3RhcmdldC50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcudGV4dCA9IF90YXJnZXQudGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcubGFiZWwgIT09IF90YXJnZXQubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5sYWJlbCA9IF90YXJnZXQubGFiZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvcHRpb24nKSB7XG4gICAgICAgICAgICBjb25zdCBfaWQgPSBpZCBhcyBPcHRpb25QYXJhbWV0ZXJzSWRzO1xuICAgICAgICAgICAgY29uc3QgX3RhcmdldCA9IHRhcmdldCBhcyBTZXR0aW5nT3B0aW9uO1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZyA9IHRoaXMub3B0aW9uUGFyYW1ldGVyc1VpLmdldChfaWQpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB1aU9wdGlvbnMgPSBzZXR0aW5nLm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0T3B0aW9ucyA9IF90YXJnZXQub3B0aW9ucztcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHVpT3B0aW9ucy5sZW5ndGggIT09IHRhcmdldE9wdGlvbnMubGVuZ3RoIHx8XG4gICAgICAgICAgICAgICAgICAgICF1aU9wdGlvbnMuZXZlcnkoKHZhbHVlKSA9PiB0YXJnZXRPcHRpb25zLmluY2x1ZGVzKHZhbHVlKSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5vcHRpb25zID0gX3RhcmdldC5vcHRpb25zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy5zZWxlY3RlZCAhPT0gX3RhcmdldC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLnNlbGVjdGVkID0gX3RhcmdldC5zZWxlY3RlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcubGFiZWwgIT09IF90YXJnZXQubGFiZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5sYWJlbCA9IF90YXJnZXQubGFiZWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgY2FsbGJhY2sgdG8gZmlyZSB3aGVuIHRoZSBmbGFnIGlzIHRvZ2dsZWQuXG4gICAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgZmxhZy5cbiAgICAgKiBAcGFyYW0gb25DaGFuZ2VMaXN0ZW5lciBUaGUgY2FsbGJhY2sgdG8gZmlyZSB3aGVuIHRoZSB2YWx1ZSBjaGFuZ2VzLlxuICAgICAqL1xuICAgIGFkZEN1c3RvbUZsYWdPblNldHRpbmdDaGFuZ2VkTGlzdGVuZXIoXG4gICAgICAgIGlkOiBFeHRyYUZsYWdzLFxuICAgICAgICBvbkNoYW5nZUxpc3RlbmVyOiAobmV3RmxhZ1ZhbHVlOiBib29sZWFuKSA9PiB2b2lkXG4gICAgKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmN1c3RvbUZsYWdzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tRmxhZ3MuZ2V0KGlkKS5vbkNoYW5nZSA9IG9uQ2hhbmdlTGlzdGVuZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGxhYmVsIGZvciB0aGUgZmxhZy5cbiAgICAgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBmbGFnLlxuICAgICAqIEBwYXJhbSBsYWJlbCBUaGUgbmV3IGxhYmVsIHRvIHVzZSBmb3IgdGhlIGZsYWcuXG4gICAgICovXG4gICAgc2V0Q3VzdG9tRmxhZ0xhYmVsKGlkOiBFeHRyYUZsYWdzLCBsYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIGlmICghdGhpcy5jdXN0b21GbGFncy5oYXMoaWQpKSB7XG4gICAgICAgICAgICBMb2dnZXIuV2FybmluZyhcbiAgICAgICAgICAgICAgICBMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLFxuICAgICAgICAgICAgICAgIGBDYW5ub3Qgc2V0IGxhYmVsIGZvciBmbGFnIGNhbGxlZCAke2lkfSAtIGl0IGRvZXMgbm90IGV4aXN0IGluIHRoZSBDb25maWcuZmxhZ3MgbWFwLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbUZsYWdzLmdldChpZCkubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoaWQpLmxhYmVsID0gbGFiZWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHZhbHVlIG9mIHRoZSBjb25maWd1cmF0aW9uIGZsYWcgd2hpY2ggaGFzIHRoZSBnaXZlbiBpZC5cbiAgICAgKiBAcGFyYW0gaWQgVGhlIHVuaXF1ZSBpZCBmb3IgdGhlIGZsYWcuXG4gICAgICogQHJldHVybnMgVHJ1ZSBpZiB0aGUgZmxhZyBpcyBlbmFibGVkLlxuICAgICAqL1xuICAgIGlzQ3VzdG9tRmxhZ0VuYWJsZWQoaWQ6IEV4dHJhRmxhZ3MpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tRmxhZ3MuZ2V0KGlkKS5mbGFnIGFzIGJvb2xlYW47XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgU2V0dGluZ0Jhc2UgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40JztcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhIHNldHRpbmcgdGhhdCBoYXMgYSB0ZXh0IGxhYmVsLCBhbiBhcmJpdHJhcnkgc2V0dGluZyB2YWx1ZSBpdCBzdG9yZXMsIGFuIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXR0aW5nVUlCYXNlIHtcbiAgICBfc2V0dGluZzogU2V0dGluZ0Jhc2U7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmc6IFNldHRpbmdCYXNlKSB7XG4gICAgICAgIHRoaXMuX3NldHRpbmcgPSBzZXR0aW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBzZXR0aW5nIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmcoKTogU2V0dGluZ0Jhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB0eXBlIHtcbiAgICBGbGFnc0lkcyxcbiAgICBTZXR0aW5nRmxhZ1xufSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40JztcbmltcG9ydCB7IFNldHRpbmdVSUJhc2UgfSBmcm9tICcuL1NldHRpbmdVSUJhc2UnO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ1VJRmxhZzxcbiAgICBDdXN0b21JZHMgZXh0ZW5kcyBzdHJpbmcgPSBGbGFnc0lkc1xuPiBleHRlbmRzIFNldHRpbmdVSUJhc2Uge1xuICAgIC8qIFdlIHRvZ2dsZSB0aGlzIGNoZWNrYm94IHRvIHJlZmxlY3QgdGhlIHZhbHVlIG9mIG91ciBzZXR0aW5nJ3MgYm9vbGVhbiBmbGFnLiAqL1xuICAgIF9jaGVja2JveDogSFRNTElucHV0RWxlbWVudDsgLy8gaW5wdXQgdHlwZT1cImNoZWNrYm94XCJcblxuICAgIC8qIFRoaXMgZWxlbWVudCBjb250YWlucyBhIHRleHQgbm9kZSB0aGF0IHJlZmxlY3RzIHRoZSBzZXR0aW5nJ3MgdGV4dCBsYWJlbC4gKi9cbiAgICBfc2V0dGluZ3NUZXh0RWxlbTogSFRNTEVsZW1lbnQ7XG5cbiAgICBvbkNoYW5nZUVtaXQ6IChjaGFuZ2VkVmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5nOiBTZXR0aW5nRmxhZzxDdXN0b21JZHM+KSB7XG4gICAgICAgIHN1cGVyKHNldHRpbmcpO1xuXG4gICAgICAgIHRoaXMubGFiZWwgPSBzZXR0aW5nLmxhYmVsO1xuICAgICAgICB0aGlzLmZsYWcgPSBzZXR0aW5nLmZsYWc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIHNldHRpbmcgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2V0dGluZygpOiBTZXR0aW5nRmxhZzxDdXN0b21JZHM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmcgYXMgU2V0dGluZ0ZsYWc8Q3VzdG9tSWRzPjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzVGV4dEVsZW0oKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzVGV4dEVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gdGhpcy5zZXR0aW5nLl9sYWJlbDtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0udGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzVGV4dEVsZW07XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBjaGVja2JveCgpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9jaGVja2JveCkge1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgdGhpcy5fY2hlY2tib3gudHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2NoZWNrYm94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHJvb3QgZGl2IHdpdGggXCJzZXR0aW5nXCIgY3NzIGNsYXNzXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSB0aGlzLnNldHRpbmcuaWQ7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nJyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBkaXYgZWxlbWVudCB0byBjb250YWluIG91ciBzZXR0aW5nJ3MgdGV4dFxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc1RleHRFbGVtKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGxhYmVsIGVsZW1lbnQgdG8gd3JhcCBvdXQgaW5wdXQgdHlwZVxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlckxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIHdyYXBwZXJMYWJlbC5jbGFzc0xpc3QuYWRkKCd0Z2wtc3dpdGNoJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3cmFwcGVyTGFiZWwpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgaW5wdXQgdHlwZT1jaGVja2JveFxuICAgICAgICAgICAgdGhpcy5jaGVja2JveC50aXRsZSA9IHRoaXMuc2V0dGluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tib3guY2xhc3NMaXN0LmFkZCgndGdsJyk7XG4gICAgICAgICAgICB0aGlzLmNoZWNrYm94LmNsYXNzTGlzdC5hZGQoJ3RnbC1mbGF0Jyk7XG4gICAgICAgICAgICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKCd0Z2wtc2xpZGVyJyk7XG4gICAgICAgICAgICB3cmFwcGVyTGFiZWwuYXBwZW5kQ2hpbGQodGhpcy5jaGVja2JveCk7XG4gICAgICAgICAgICB3cmFwcGVyTGFiZWwuYXBwZW5kQ2hpbGQoc2xpZGVyKTtcblxuICAgICAgICAgICAgLy8gc2V0dXAgb24gY2hhbmdlIGZyb20gY2hlY2tib3hcbiAgICAgICAgICAgIHRoaXMuY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmcuZmxhZyAhPT0gdGhpcy5jaGVja2JveC5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy5mbGFnID0gdGhpcy5jaGVja2JveC5jaGVja2VkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcudXBkYXRlVVJMUGFyYW1zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgc2V0dGluZydzIHN0b3JlZCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gaW5WYWx1ZSBUaGUgbmV3IHZhbHVlIGZvciB0aGUgc2V0dGluZy5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IGZsYWcoaW5WYWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmNoZWNrYm94LmNoZWNrZWQgPSBpblZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgZmxhZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tib3guY2hlY2tlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGxhYmVsIHRleHQgZm9yIHRoZSBzZXR0aW5nLlxuICAgICAqIEBwYXJhbSBsYWJlbCBzZXR0aW5nIGxhYmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgbGFiZWwoaW5MYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQgPSBpbkxhYmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBsYWJlbFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgbGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0O1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB0eXBlIHtcbiAgICBOdW1lcmljUGFyYW1ldGVyc0lkcyxcbiAgICBTZXR0aW5nTnVtYmVyXG59IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjQnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuNCc7XG5pbXBvcnQgeyBTZXR0aW5nVUlCYXNlIH0gZnJvbSAnLi9TZXR0aW5nVUlCYXNlJztcblxuLyoqXG4gKiBBIG51bWJlciBzcGlubmVyIHdpdGggYSB0ZXh0IGxhYmVsIGJlc2lkZSBpdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNldHRpbmdVSU51bWJlcjxcbiAgICBDdXN0b21JZHMgZXh0ZW5kcyBzdHJpbmcgPSBOdW1lcmljUGFyYW1ldGVyc0lkc1xuPiBleHRlbmRzIFNldHRpbmdVSUJhc2Uge1xuICAgIF9zcGlubmVyOiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgLyogVGhpcyBlbGVtZW50IGNvbnRhaW5zIGEgdGV4dCBub2RlIHRoYXQgcmVmbGVjdHMgdGhlIHNldHRpbmcncyB0ZXh0IGxhYmVsLiAqL1xuICAgIF9zZXR0aW5nc1RleHRFbGVtOiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmc6IFNldHRpbmdOdW1iZXI8Q3VzdG9tSWRzPikge1xuICAgICAgICBzdXBlcihzZXR0aW5nKTtcblxuICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy5zZXR0aW5nLmxhYmVsO1xuICAgICAgICB0aGlzLm51bWJlciA9IHRoaXMuc2V0dGluZy5udW1iZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIHNldHRpbmcgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2V0dGluZygpOiBTZXR0aW5nTnVtYmVyPEN1c3RvbUlkcz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZyBhcyBTZXR0aW5nTnVtYmVyPEN1c3RvbUlkcz47XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZXR0aW5nc1RleHRFbGVtKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZXR0aW5nc1RleHRFbGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gdGhpcy5zZXR0aW5nLmxhYmVsO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS50aXRsZSA9IHRoaXMuc2V0dGluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NUZXh0RWxlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIEhUTUxJbnB1dEVsZW1lbnQgZm9yIHRoZSBidXR0b24uXG4gICAgICovXG4gICAgcHVibGljIGdldCBzcGlubmVyKCk6IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NwaW5uZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3NwaW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgdGhpcy5fc3Bpbm5lci50eXBlID0gJ251bWJlcic7XG4gICAgICAgICAgICB0aGlzLl9zcGlubmVyLm1pbiA9IHRoaXMuc2V0dGluZy5taW4udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuX3NwaW5uZXIubWF4ID0gdGhpcy5zZXR0aW5nLm1heC50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5fc3Bpbm5lci52YWx1ZSA9IHRoaXMuc2V0dGluZy5udW1iZXIudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuX3NwaW5uZXIudGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgICAgICB0aGlzLl9zcGlubmVyLmNsYXNzTGlzdC5hZGQoJ2Zvcm0tY29udHJvbCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zcGlubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHJvb3QgZGl2IHdpdGggXCJzZXR0aW5nXCIgY3NzIGNsYXNzXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZycpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZm9ybS1ncm91cCcpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgZGl2IGVsZW1lbnQgdG8gY29udGFpbiBvdXIgc2V0dGluZydzIHRleHRcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NUZXh0RWxlbSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsYWJlbCBlbGVtZW50IHRvIHdyYXAgb3V0IGlucHV0IHR5cGVcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc3Bpbm5lcik7XG5cbiAgICAgICAgICAgIC8vIHNldHVwIG9uY2hhbmdlXG4gICAgICAgICAgICB0aGlzLnNwaW5uZXIub25jaGFuZ2UgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXRFbGVtID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IE51bWJlci5wYXJzZUZsb2F0KGlucHV0RWxlbS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlZFZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuV2FybmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5HZXRTdGFja1RyYWNlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBgQ291bGQgbm90IHBhcnNlIHZhbHVlIGNoYW5nZSBpbnRvIGEgdmFsaWQgbnVtYmVyIC0gdmFsdWUgd2FzICR7aW5wdXRFbGVtLnZhbHVlfSwgcmVzZXR0aW5nIHZhbHVlIHRvICR7dGhpcy5zZXR0aW5nLm1pbn1gXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmcubnVtYmVyICE9PSB0aGlzLnNldHRpbmcubWluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcubnVtYmVyID0gdGhpcy5zZXR0aW5nLm1pbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmcubnVtYmVyICE9PSBwYXJzZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLm51bWJlciA9IHBhcnNlZFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLnVwZGF0ZVVSTFBhcmFtcygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBudW1iZXIgaW4gdGhlIHNwaW5uZXIgKHdpbGwgYmUgY2xhbXBlZCB3aXRoaW4gcmFuZ2UpLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgbnVtYmVyKG5ld051bWJlcjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc3Bpbm5lci52YWx1ZSA9IHRoaXMuc2V0dGluZy5jbGFtcChuZXdOdW1iZXIpLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIGdldCBudW1iZXIoKSB7XG4gICAgICAgIHJldHVybiArdGhpcy5zcGlubmVyLnZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbGFiZWwgdGV4dCBmb3IgdGhlIHNldHRpbmcuXG4gICAgICogQHBhcmFtIGxhYmVsIHNldHRpbmcgbGFiZWwuXG4gICAgICovXG4gICAgcHVibGljIHNldCBsYWJlbChpbkxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IGluTGFiZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGxhYmVsXG4gICAgICovXG4gICAgcHVibGljIGdldCBsYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQ7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHR5cGUge1xuICAgIE9wdGlvblBhcmFtZXRlcnNJZHMsXG4gICAgU2V0dGluZ09wdGlvblxufSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40JztcbmltcG9ydCB7IFNldHRpbmdVSUJhc2UgfSBmcm9tICcuL1NldHRpbmdVSUJhc2UnO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ1VJT3B0aW9uPFxuICAgIEN1c3RvbUlkcyBleHRlbmRzIHN0cmluZyA9IE9wdGlvblBhcmFtZXRlcnNJZHNcbj4gZXh0ZW5kcyBTZXR0aW5nVUlCYXNlIHtcbiAgICAvKiBBIHNlbGVjdCBlbGVtZW50IHRoYXQgcmVmbGVjdHMgdGhlIHZhbHVlIG9mIHRoaXMgc2V0dGluZy4gKi9cbiAgICBfc2VsZWN0b3I6IEhUTUxTZWxlY3RFbGVtZW50OyAvLyA8c2VsZWN0Pjwvc2VsZWN0PlxuXG4gICAgLyogVGhpcyBlbGVtZW50IGNvbnRhaW5zIGEgdGV4dCBub2RlIHRoYXQgcmVmbGVjdHMgdGhlIHNldHRpbmcncyB0ZXh0IGxhYmVsLiAqL1xuICAgIF9zZXR0aW5nc1RleHRFbGVtOiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmc6IFNldHRpbmdPcHRpb248Q3VzdG9tSWRzPikge1xuICAgICAgICBzdXBlcihzZXR0aW5nKTtcblxuICAgICAgICB0aGlzLmxhYmVsID0gdGhpcy5zZXR0aW5nLmxhYmVsO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLnNldHRpbmcub3B0aW9ucztcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuc2V0dGluZy5zZWxlY3RlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgc2V0dGluZyBjb21wb25lbnQuXG4gICAgICovXG4gICAgcHVibGljIGdldCBzZXR0aW5nKCk6IFNldHRpbmdPcHRpb248Q3VzdG9tSWRzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nIGFzIFNldHRpbmdPcHRpb248Q3VzdG9tSWRzPjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNlbGVjdG9yKCk6IEhUTUxTZWxlY3RFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZWxlY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdG9yLmNsYXNzTGlzdC5hZGQoJ2Zvcm0tY29udHJvbCcpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3Mtb3B0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdG9yO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2V0dGluZ3NUZXh0RWxlbSgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NUZXh0RWxlbSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQgPSB0aGlzLnNldHRpbmcubGFiZWw7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtLnRpdGxlID0gdGhpcy5zZXR0aW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nc1RleHRFbGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbGFiZWwgdGV4dCBmb3IgdGhlIHNldHRpbmcuXG4gICAgICogQHBhcmFtIGxhYmVsIHNldHRpbmcgbGFiZWwuXG4gICAgICovXG4gICAgcHVibGljIHNldCBsYWJlbChpbkxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IGluTGFiZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGxhYmVsXG4gICAgICovXG4gICAgcHVibGljIGdldCBsYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUmV0dXJuIG9yIGNyZWF0ZXMgYSBIVE1MIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoaXMgc2V0dGluZyBpbiB0aGUgRE9NLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgcm9vdCBkaXYgd2l0aCBcInNldHRpbmdcIiBjc3MgY2xhc3NcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9IHRoaXMuc2V0dGluZy5pZDtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmcnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Zvcm0tZ3JvdXAnKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGRpdiBlbGVtZW50IHRvIGNvbnRhaW4gb3VyIHNldHRpbmcncyB0ZXh0XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzVGV4dEVsZW0pO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgbGFiZWwgZWxlbWVudCB0byB3cmFwIG91dCBpbnB1dCB0eXBlXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod3JhcHBlckxhYmVsKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHNlbGVjdCBlbGVtZW50XG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yLnRpdGxlID0gdGhpcy5zZXR0aW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgd3JhcHBlckxhYmVsLmFwcGVuZENoaWxkKHRoaXMuc2VsZWN0b3IpO1xuXG4gICAgICAgICAgICAvLyBzZXR1cCBvbiBjaGFuZ2UgZnJvbSBzZWxlY3RvclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rvci5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5nLnNlbGVjdGVkICE9PSB0aGlzLnNlbGVjdG9yLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy5zZWxlY3RlZCA9IHRoaXMuc2VsZWN0b3IudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy51cGRhdGVVUkxQYXJhbXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IG9wdGlvbnModmFsdWVzOiBBcnJheTxzdHJpbmc+KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnNlbGVjdG9yLm9wdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IucmVtb3ZlKGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFsdWVzLmZvckVhY2goKHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgb3B0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICBvcHQuaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yLmFwcGVuZENoaWxkKG9wdCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgb3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLnNlbGVjdG9yLm9wdGlvbnNdLm1hcCgobykgPT4gby52YWx1ZSk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCBzZWxlY3RlZCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICAgIC8vIEEgdXNlciBtYXkgbm90IHNwZWNpZnkgdGhlIGZ1bGwgcG9zc2libGUgdmFsdWUgc28gd2UgaW5zdGVhZCB1c2UgdGhlIGNsb3Nlc3QgbWF0Y2guXG4gICAgICAgIC8vIGVnID94eHg9SDI2NCB3b3VsZCBzZWxlY3QgJ0gyNjQgbGV2ZWwtYXN5bW1ldHJ5LWFsbG93ZWQ9MTtwYWNrZXRpemF0aW9uLW1vZGU9MTtwcm9maWxlLWxldmVsLWlkPTQyMDAxZidcbiAgICAgICAgY29uc3QgZmlsdGVyZWRMaXN0ID0gdGhpcy5vcHRpb25zLmZpbHRlcihcbiAgICAgICAgICAgIChvcHRpb246IHN0cmluZykgPT4gb3B0aW9uLmluZGV4T2YodmFsdWUpICE9PSAtMVxuICAgICAgICApO1xuICAgICAgICBpZiAoZmlsdGVyZWRMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rvci52YWx1ZSA9IGZpbHRlcmVkTGlzdFswXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdG9yLnZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLnNlbGVjdG9yLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZW5hYmxlKCkge1xuICAgICAgICB0aGlzLnNlbGVjdG9yLmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHR5cGUge1xuICAgIFNldHRpbmdUZXh0LFxuICAgIFRleHRQYXJhbWV0ZXJzSWRzXG59IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjQnO1xuaW1wb3J0IHsgU2V0dGluZ1VJQmFzZSB9IGZyb20gJy4vU2V0dGluZ1VJQmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nVUlUZXh0PFxuICAgIEN1c3RvbUlkcyBleHRlbmRzIHN0cmluZyA9IFRleHRQYXJhbWV0ZXJzSWRzXG4+IGV4dGVuZHMgU2V0dGluZ1VJQmFzZSB7XG4gICAgLyogQSB0ZXh0IGJveCB0aGF0IHJlZmxlY3RzIHRoZSB2YWx1ZSBvZiB0aGlzIHNldHRpbmcuICovXG4gICAgX3RleHRib3g6IEhUTUxJbnB1dEVsZW1lbnQ7IC8vIGlucHV0IHR5cGU9XCJ0ZXh0XCJcblxuICAgIC8qIFRoaXMgZWxlbWVudCBjb250YWlucyBhIHRleHQgbm9kZSB0aGF0IHJlZmxlY3RzIHRoZSBzZXR0aW5nJ3MgdGV4dCBsYWJlbC4gKi9cbiAgICBfc2V0dGluZ3NUZXh0RWxlbTogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5nOiBTZXR0aW5nVGV4dDxDdXN0b21JZHM+KSB7XG4gICAgICAgIHN1cGVyKHNldHRpbmcpO1xuXG4gICAgICAgIHRoaXMubGFiZWwgPSB0aGlzLnNldHRpbmcubGFiZWw7XG4gICAgICAgIHRoaXMudGV4dCA9IHRoaXMuc2V0dGluZy50ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBzZXR0aW5nIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmcoKTogU2V0dGluZ1RleHQ8Q3VzdG9tSWRzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nIGFzIFNldHRpbmdUZXh0PEN1c3RvbUlkcz47XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZXR0aW5nc1RleHRFbGVtKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZXR0aW5nc1RleHRFbGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IHRoaXMuc2V0dGluZy5sYWJlbDtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0udGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzVGV4dEVsZW07XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB0ZXh0Ym94KCk6IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3RleHRib3gpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgdGhpcy5fdGV4dGJveC5jbGFzc0xpc3QuYWRkKCdmb3JtLWNvbnRyb2wnKTtcbiAgICAgICAgICAgIHRoaXMuX3RleHRib3gudHlwZSA9ICd0ZXh0Ym94JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdGV4dGJveDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSByb290IGRpdiB3aXRoIFwic2V0dGluZ1wiIGNzcyBjbGFzc1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gdGhpcy5zZXR0aW5nLmlkO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZycpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgZGl2IGVsZW1lbnQgdG8gY29udGFpbiBvdXIgc2V0dGluZydzIHRleHRcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NUZXh0RWxlbSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsYWJlbCBlbGVtZW50IHRvIHdyYXAgb3V0IGlucHV0IHR5cGVcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3cmFwcGVyTGFiZWwpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgaW5wdXQgdHlwZT1jaGVja2JveFxuICAgICAgICAgICAgdGhpcy50ZXh0Ym94LnRpdGxlID0gdGhpcy5zZXR0aW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgd3JhcHBlckxhYmVsLmFwcGVuZENoaWxkKHRoaXMudGV4dGJveCk7XG5cbiAgICAgICAgICAgIC8vIHNldHVwIG9uIGNoYW5nZSBmcm9tIGNoZWNrYm94XG4gICAgICAgICAgICB0aGlzLnRleHRib3guYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZy50ZXh0ICE9PSB0aGlzLnRleHRib3gudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLnRleHQgPSB0aGlzLnRleHRib3gudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy51cGRhdGVVUkxQYXJhbXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBzZXR0aW5nJ3Mgc3RvcmVkIHZhbHVlLlxuICAgICAqIEBwYXJhbSBpblZhbHVlIFRoZSBuZXcgdmFsdWUgZm9yIHRoZSBzZXR0aW5nLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgdGV4dChpblZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50ZXh0Ym94LnZhbHVlID0gaW5WYWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHRleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHRib3gudmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBsYWJlbCB0ZXh0IGZvciB0aGUgc2V0dGluZy5cbiAgICAgKiBAcGFyYW0gbGFiZWwgc2V0dGluZyBsYWJlbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IGxhYmVsKGluTGFiZWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gaW5MYWJlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbGFiZWxcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBBY3Rpb25PdmVybGF5IH0gZnJvbSAnLi9BY3Rpb25PdmVybGF5JztcblxuLyoqXG4gKiBTaG93IGFuIG92ZXJsYXkgZm9yIHdoZW4gdGhlIHNlc3Npb24gaXMgdW5hdHRlbmRlZCwgaXQgYmVnaW5zIGEgY291bnRkb3duIHRpbWVyLCB3aGljaCB3aGVuIGVsYXBzZWQgd2lsbCBkaXNjb25uZWN0IHRoZSBzdHJlYW0uXG4gKi9cbmV4cG9ydCBjbGFzcyBBRktPdmVybGF5IGV4dGVuZHMgQWN0aW9uT3ZlcmxheSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgcm9vdCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgYWZrT3ZlcmxheUh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWZrT3ZlcmxheUh0bWwuaWQgPSAnYWZrT3ZlcmxheSc7XG4gICAgICAgIGFma092ZXJsYXlIdG1sLmNsYXNzTmFtZSA9ICdjbGlja2FibGVTdGF0ZSc7XG4gICAgICAgIHJldHVybiBhZmtPdmVybGF5SHRtbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCBjb250ZW50IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LCB3aGljaCBjb250YWluIHNvbWUgdGV4dCBmb3IgYW4gYWZrIGNvdW50IGRvd24uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGFma092ZXJsYXlIdG1sSW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWZrT3ZlcmxheUh0bWxJbm5lci5pZCA9ICdhZmtPdmVybGF5SW5uZXInO1xuICAgICAgICBhZmtPdmVybGF5SHRtbElubmVyLmlubmVySFRNTCA9XG4gICAgICAgICAgICAnPGNlbnRlcj5ObyBhY3Rpdml0eSBkZXRlY3RlZDxicj5EaXNjb25uZWN0aW5nIGluIDxzcGFuIGlkPVwiYWZrQ291bnREb3duTnVtYmVyXCI+PC9zcGFuPiBzZWNvbmRzPGJyPkNsaWNrIHRvIGNvbnRpbnVlPGJyPjwvY2VudGVyPic7XG4gICAgICAgIHJldHVybiBhZmtPdmVybGF5SHRtbElubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhbiBBZmsgb3ZlcmxheVxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtZW50IHRoZSBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG9cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3Iocm9vdERpdjogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICByb290RGl2LFxuICAgICAgICAgICAgQUZLT3ZlcmxheS5jcmVhdGVSb290RWxlbWVudCgpLFxuICAgICAgICAgICAgQUZLT3ZlcmxheS5jcmVhdGVDb250ZW50RWxlbWVudCgpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBjb3VudCBkb3duIHNwYW5zIG51bWJlciBmb3IgdGhlIG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gY291bnRkb3duIHRoZSBjb3VudCBkb3duIG51bWJlciB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSBzcGFuIGZvciB1cGRhdGluZ1xuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVDb3VudGRvd24oY291bnRkb3duOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50ZXh0RWxlbWVudC5pbm5lckhUTUwgPSBgPGNlbnRlcj5ObyBhY3Rpdml0eSBkZXRlY3RlZDxicj5EaXNjb25uZWN0aW5nIGluIDxzcGFuIGlkPVwiYWZrQ291bnREb3duTnVtYmVyXCI+JHtjb3VudGRvd259PC9zcGFuPiBzZWNvbmRzPGJyPkNsaWNrIHRvIGNvbnRpbnVlPGJyPjwvY2VudGVyPmA7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuNCc7XG5cbmltcG9ydCB7IE92ZXJsYXlCYXNlIH0gZnJvbSAnLi9CYXNlT3ZlcmxheSc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHRoZSBiYXNlIGFjdGlvbiBvdmVybGF5IHN0cnVjdHVyZVxuICovXG5leHBvcnQgY2xhc3MgQWN0aW9uT3ZlcmxheSBleHRlbmRzIE92ZXJsYXlCYXNlIHtcbiAgICBvbkFjdGlvbkNhbGxiYWNrOiAoLi4uYXJnczogW10pID0+IHZvaWQ7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYW4gYWN0aW9uIG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gcm9vdERpdiB0aGUgcm9vdCBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG9cbiAgICAgKiBAcGFyYW0gcm9vdEVsZW1lbnQgdGhlIHJvb3QgZWxlbWVudCB0aGF0IGlzIHRoZSBvdmVybGF5XG4gICAgICogQHBhcmFtIGNvbnRlbnRFbGVtZW50IGFuIGVsZW1lbnQgdGhhdCBjb250YWlucyB0ZXh0IGZvciB0aGUgYWN0aW9uIG92ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHJvb3REaXY6IEhUTUxFbGVtZW50LFxuICAgICAgICByb290RWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIGNvbnRlbnRFbGVtZW50OiBIVE1MRWxlbWVudFxuICAgICkge1xuICAgICAgICBzdXBlcihyb290RGl2LCByb290RWxlbWVudCwgY29udGVudEVsZW1lbnQpO1xuICAgICAgICB0aGlzLm9uQWN0aW9uQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAvKiBkbyBub3RoaW5nICovIExvZ2dlci5JbmZvKFxuICAgICAgICAgICAgICAgIExvZ2dlci5HZXRTdGFja1RyYWNlKCksXG4gICAgICAgICAgICAgICAgJ0RpZCB5b3UgZm9yZ2V0IHRvIHNldCB0aGUgb25BY3Rpb24gY2FsbGJhY2sgaW4geW91ciBvdmVybGF5PydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSB0ZXh0IG92ZXJsYXlzIGlubmVyIHRleHRcbiAgICAgKiBAcGFyYW0gdGV4dCB0aGUgdXBkYXRlIHRleHQgdG8gYmUgaW5zZXJ0ZWQgaW50byB0aGUgb3ZlcmxheVxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGUodGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGlmICh0ZXh0ICE9IG51bGwgfHwgdGV4dCAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dEVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCBhIG1ldGhvZCBhcyBhbiBldmVudCBlbWl0dGVyIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIHRoZSBtZXRob2QgdGhhdCBpcyB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZFxuICAgICAqL1xuICAgIG9uQWN0aW9uKGNhbGxCYWNrOiAoLi4uYXJnczogW10pID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5vbkFjdGlvbkNhbGxiYWNrID0gY2FsbEJhY2s7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aXZhdGUgYW4gZXZlbnQgdGhhdCBpcyBhdHRhY2hlZCB0byB0aGUgZXZlbnQgZW1pdHRlclxuICAgICAqL1xuICAgIGFjdGl2YXRlKCkge1xuICAgICAgICB0aGlzLm9uQWN0aW9uQ2FsbGJhY2soKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIENsYXNzIGZvciB0aGUgYmFzZSBvdmVybGF5IHN0cnVjdHVyZVxuICovXG5leHBvcnQgY2xhc3MgT3ZlcmxheUJhc2Uge1xuICAgIHByb3RlY3RlZCByb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHJvb3REaXY6IEhUTUxFbGVtZW50O1xuICAgIHB1YmxpYyB0ZXh0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYW4gb3ZlcmxheVxuICAgICAqIEBwYXJhbSByb290RGl2IHRoZSByb290IGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50b1xuICAgICAqIEBwYXJhbSByb290RWxlbWVudCB0aGUgcm9vdCBlbGVtZW50IHRoYXQgaXMgdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoXG4gICAgICAgIHJvb3REaXY6IEhUTUxFbGVtZW50LFxuICAgICAgICByb290RWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIHRleHRFbGVtZW50OiBIVE1MRWxlbWVudFxuICAgICkge1xuICAgICAgICB0aGlzLnJvb3REaXYgPSByb290RGl2O1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50ID0gcm9vdEVsZW1lbnQ7XG4gICAgICAgIHRoaXMudGV4dEVsZW1lbnQgPSB0ZXh0RWxlbWVudDtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRleHRFbGVtZW50KTtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIHRoaXMucm9vdERpdi5hcHBlbmRDaGlsZCh0aGlzLnJvb3RFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgcHVibGljIHNob3coKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuU3RhdGUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuU3RhdGUnKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBBY3Rpb25PdmVybGF5IH0gZnJvbSAnLi9BY3Rpb25PdmVybGF5JztcblxuLyoqXG4gKiBPdmVybGF5IHNob3duIGR1cmluZyBjb25uZWN0aW9uLCBoYXMgYSBidXR0b24gdGhhdCBjYW4gYmUgY2xpY2tlZCB0byBpbml0aWF0ZSBhIGNvbm5lY3Rpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25uZWN0T3ZlcmxheSBleHRlbmRzIEFjdGlvbk92ZXJsYXkge1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIHJvb3QgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGNvbm5lY3RFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbm5lY3RFbGVtLmlkID0gJ2Nvbm5lY3RPdmVybGF5JztcbiAgICAgICAgY29ubmVjdEVsZW0uY2xhc3NOYW1lID0gJ2NsaWNrYWJsZVN0YXRlJztcbiAgICAgICAgcmV0dXJuIGNvbm5lY3RFbGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIGNvbnRlbnQgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXksIHdoaWNoIGNvbnRhaW4gd2hhdGV2ZXIgY29udGVudCB0aGlzIGVsZW1lbnQgY29udGFpbnMsIGxpa2UgdGV4dCBvciBhIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNvbnRlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgY29ubmVjdENvbnRlbnRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbm5lY3RDb250ZW50RWxlbS5pZCA9ICdjb25uZWN0QnV0dG9uJztcbiAgICAgICAgY29ubmVjdENvbnRlbnRFbGVtLmlubmVySFRNTCA9ICdDbGljayB0byBzdGFydCc7XG4gICAgICAgIHJldHVybiBjb25uZWN0Q29udGVudEVsZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgY29ubmVjdCBvdmVybGF5IHdpdGggYSBjb25uZWN0aW9uIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0gcGFyZW50RWxlbSB0aGUgcGFyZW50IGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50by5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocGFyZW50RWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBwYXJlbnRFbGVtLFxuICAgICAgICAgICAgQ29ubmVjdE92ZXJsYXkuY3JlYXRlUm9vdEVsZW1lbnQoKSxcbiAgICAgICAgICAgIENvbm5lY3RPdmVybGF5LmNyZWF0ZUNvbnRlbnRFbGVtZW50KClcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBhZGQgdGhlIG5ldyBldmVudCBsaXN0ZW5lclxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBBY3Rpb25PdmVybGF5IH0gZnJvbSAnLi9BY3Rpb25PdmVybGF5JztcblxuLyoqXG4gKiBPdmVybGF5IHNob3duIGR1cmluZyBkaXNjb25uZWN0aW9uLCBoYXMgYSByZWNvbm5lY3Rpb24gZWxlbWVudCB0aGF0IGNhbiBiZSBjbGlja2VkIHRvIHJlY29ubmVjdC5cbiAqL1xuZXhwb3J0IGNsYXNzIERpc2Nvbm5lY3RPdmVybGF5IGV4dGVuZHMgQWN0aW9uT3ZlcmxheSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgcm9vdCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgZGlzY29ubmVjdE92ZXJsYXlIdG1sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpc2Nvbm5lY3RPdmVybGF5SHRtbC5pZCA9ICdkaXNjb25uZWN0T3ZlcmxheSc7XG4gICAgICAgIGRpc2Nvbm5lY3RPdmVybGF5SHRtbC5jbGFzc05hbWUgPSAnY2xpY2thYmxlU3RhdGUnO1xuICAgICAgICByZXR1cm4gZGlzY29ubmVjdE92ZXJsYXlIdG1sO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIGNvbnRlbnQgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXksIHdoaWNoIGNvbnRhaW4gd2hhdGV2ZXIgY29udGVudCB0aGlzIGVsZW1lbnQgY29udGFpbnMsIGxpa2UgdGV4dCBvciBhIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNvbnRlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgLy8gYnVpbGQgdGhlIGlubmVyIGh0bWwgY29udGFpbmVyXG4gICAgICAgIGNvbnN0IGRpc2Nvbm5lY3RPdmVybGF5SHRtbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXNjb25uZWN0T3ZlcmxheUh0bWxDb250YWluZXIuaWQgPSAnZGlzY29ubmVjdEJ1dHRvbic7XG4gICAgICAgIGRpc2Nvbm5lY3RPdmVybGF5SHRtbENvbnRhaW5lci5pbm5lckhUTUwgPSAnQ2xpY2sgVG8gUmVzdGFydCc7XG5cbiAgICAgICAgcmV0dXJuIGRpc2Nvbm5lY3RPdmVybGF5SHRtbENvbnRhaW5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBkaXNjb25uZWN0IG92ZXJsYXkgd2l0aCBhIHJldHJ5IGNvbm5lY3Rpb24gaWNvbi5cbiAgICAgKiBAcGFyYW0gcGFyZW50RWxlbSB0aGUgcGFyZW50IGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50by5cbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IocGFyZW50RWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoXG4gICAgICAgICAgICBwYXJlbnRFbGVtLFxuICAgICAgICAgICAgRGlzY29ubmVjdE92ZXJsYXkuY3JlYXRlUm9vdEVsZW1lbnQoKSxcbiAgICAgICAgICAgIERpc2Nvbm5lY3RPdmVybGF5LmNyZWF0ZUNvbnRlbnRFbGVtZW50KClcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBhZGQgdGhlIG5ldyBldmVudCBsaXN0ZW5lclxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBUZXh0T3ZlcmxheSB9IGZyb20gJy4vVGV4dE92ZXJsYXknO1xuXG4vKipcbiAqIEdlbmVyaWMgb3ZlcmxheSB1c2VkIHRvIHNob3cgdGV4dHVhbCBlcnJvciBpbmZvIHRvIHRoZSB1c2VyLlxuICovXG5leHBvcnQgY2xhc3MgRXJyb3JPdmVybGF5IGV4dGVuZHMgVGV4dE92ZXJsYXkge1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIHJvb3QgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGVycm9yT3ZlcmxheUh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZXJyb3JPdmVybGF5SHRtbC5pZCA9ICdlcnJvck92ZXJsYXknO1xuICAgICAgICBlcnJvck92ZXJsYXlIdG1sLmNsYXNzTmFtZSA9ICd0ZXh0RGlzcGxheVN0YXRlJztcbiAgICAgICAgcmV0dXJuIGVycm9yT3ZlcmxheUh0bWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgY29udGVudCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheSwgd2hpY2ggY29udGFpbiB3aGF0ZXZlciBjb250ZW50IHRoaXMgZWxlbWVudCBjb250YWlucywgbGlrZSB0ZXh0IG9yIGEgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBlcnJvck92ZXJsYXlIdG1sSW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZXJyb3JPdmVybGF5SHRtbElubmVyLmlkID0gJ2Vycm9yT3ZlcmxheUlubmVyJztcbiAgICAgICAgcmV0dXJuIGVycm9yT3ZlcmxheUh0bWxJbm5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBjb25uZWN0IG92ZXJsYXkgd2l0aCBhIGNvbm5lY3Rpb24gYnV0dG9uLlxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtIHRoZSBwYXJlbnQgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHBhcmVudEVsZW0sXG4gICAgICAgICAgICBFcnJvck92ZXJsYXkuY3JlYXRlUm9vdEVsZW1lbnQoKSxcbiAgICAgICAgICAgIEVycm9yT3ZlcmxheS5jcmVhdGVDb250ZW50RWxlbWVudCgpXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgVGV4dE92ZXJsYXkgfSBmcm9tICcuL1RleHRPdmVybGF5JztcblxuLyoqXG4gKiBHZW5lcmljIG92ZXJsYXkgdXNlZCB0byBzaG93IHRleHR1YWwgaW5mbyB0byB0aGUgdXNlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEluZm9PdmVybGF5IGV4dGVuZHMgVGV4dE92ZXJsYXkge1xuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIHJvb3QgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXkuXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVSb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGluZm9PdmVybGF5SHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBpbmZvT3ZlcmxheUh0bWwuaWQgPSAnaW5mb092ZXJsYXknO1xuICAgICAgICBpbmZvT3ZlcmxheUh0bWwuY2xhc3NOYW1lID0gJ3RleHREaXNwbGF5U3RhdGUnO1xuICAgICAgICByZXR1cm4gaW5mb092ZXJsYXlIdG1sO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIGNvbnRlbnQgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXksIHdoaWNoIGNvbnRhaW4gd2hhdGV2ZXIgY29udGVudCB0aGlzIGVsZW1lbnQgY29udGFpbnMsIGxpa2UgdGV4dCBvciBhIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNvbnRlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgaW5mb092ZXJsYXlIdG1sSW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgaW5mb092ZXJsYXlIdG1sSW5uZXIuaWQgPSAnbWVzc2FnZU92ZXJsYXlJbm5lcic7XG4gICAgICAgIHJldHVybiBpbmZvT3ZlcmxheUh0bWxJbm5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBjb25uZWN0IG92ZXJsYXkgd2l0aCBhIGNvbm5lY3Rpb24gYnV0dG9uLlxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtIHRoZSBwYXJlbnQgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHBhcmVudEVsZW0sXG4gICAgICAgICAgICBJbmZvT3ZlcmxheS5jcmVhdGVSb290RWxlbWVudCgpLFxuICAgICAgICAgICAgSW5mb092ZXJsYXkuY3JlYXRlQ29udGVudEVsZW1lbnQoKVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IEFjdGlvbk92ZXJsYXkgfSBmcm9tICcuL0FjdGlvbk92ZXJsYXknO1xuXG4vKipcbiAqIE92ZXJsYXkgc2hvd24gd2hlbiBzdHJlYW0gaXMgcmVhZHkgdG8gcGxheS5cbiAqL1xuZXhwb3J0IGNsYXNzIFBsYXlPdmVybGF5IGV4dGVuZHMgQWN0aW9uT3ZlcmxheSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgcm9vdCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgcGxheUVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcGxheUVsZW0uaWQgPSAncGxheU92ZXJsYXknO1xuICAgICAgICBwbGF5RWxlbS5jbGFzc05hbWUgPSAnY2xpY2thYmxlU3RhdGUnO1xuICAgICAgICByZXR1cm4gcGxheUVsZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgY29udGVudCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheSwgd2hpY2ggY29udGFpbiB3aGF0ZXZlciBjb250ZW50IHRoaXMgZWxlbWVudCBjb250YWlucywgbGlrZSB0ZXh0IG9yIGEgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvLyB0b2RvOiBjaGFuZ2UgdGhpcyB0byBhbiBzdmdcbiAgICAgICAgY29uc3QgcGxheU92ZXJsYXlIdG1sSW5uZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgcGxheU92ZXJsYXlIdG1sSW5uZXIuaWQgPSAncGxheUJ1dHRvbic7XG4gICAgICAgIHBsYXlPdmVybGF5SHRtbElubmVyLnNyYyA9XG4gICAgICAgICAgICAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFQRUFBQUQ1Q0FZQUFBRDJtTk5rQUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBQUpjRWhaY3dBQURzTUFBQTdEQWNkdnFHUUFBQUFaZEVWWWRGTnZablIzWVhKbEFIQmhhVzUwTG01bGRDQTBMakF1TWpIeElHbVZBQUFTZ2tsRVFWUjRYdTJkQzdCZFZYMkhxVUNDSVJBU0NQakFGSVFSRUJSQkJTUlliRk90OGxJckZVV1JGcVhXc1Q1d2JJdFVxRldzMEtxSU1QS29ZRVdwUlMwNktEalMxQmVWRmtWUWJDdyt3Q2ZpQXdHaENLV1A5UHVadFUyNHVUZTU5enoyMlkvdm0vbkdrWHR6N2pscnI5K3NkZlplYS8wM1diMTY5UXR4R1c2MmlZaTBEOEw3TmJ3WWo4RWRjZFB5SXhGcEE0VDJQL0YvOFVhOENJL0doUG5YeXErSVNKTWhyQWx4eFg5aFJ1WUw4U2g4U1BrMUVXa3FCSFhkRUZmY2c2dnczZmhzM0tiOHVvZzBEUUk2WFlncjhyT3ZZc0o4T000di8weEVta0lKNm9iNFA4eklmQU5lZ0N2UU1JczBCUUs1c1JCWEpNeS93SXpNNStCeVhGQmVSa1FtQlVHY2JZalg1UzVNbU0vQUEzQ0w4bklpVWpjRWNKQVFWOXlCWDhhL3dTZWl6NWhGNm9iZ0RSUGlrR2ZNQ2ZPWDhEVGN1N3kwaU5RQm9SczJ4QlgvZzNkaXd2d20zS244Q1JFWko0UnRWQ0d1cU1LY3U5a240eEowOVpmSXVDQmdvdzV4eUozc1RMTnpBeXdyd0Y2SjI2TmhGaGsxQkdzY0lWNlhoUGx1dkE2UHh4M0tueGFSVVVDb3hoM2lpb1E1ejVuL0JZL0ZKZVV0aU1nd0VLYTZRbHlSTU4rSG44SG40WmJscllqSUlCQ2l1a01jOHAyNVdzNlpNRCt6dkIwUm1Tc0VhQklobmtyZXc1VjRFSHJDaU1oY0tBRnFDditObCtKK3VCQzlteTJ5TVFoS2swSmNrZS9NNzhHc3kwNllIMVRlcm9oTWhZQTBNY1FWUDhOejhVRGNDbDJiTFRJVmd0SGtFRmQ4RDgvRS9YRnJkR1FXcVNBUWJRaHh5S09wbS9CMDNBYzlNa2drRUlhMmhMZ2lONzhTNWxQeDBiZ0l2UUVtL1lVQXRDM0VGUW56emZnbnVEYzZ6WlorUXNkdmE0alg1U3Y0YXR3WEhabWxYOURodXhEaWtDMlFuOGRYWVVibVJlVWppblFiT250WFFseVJUUmFmd2xkZ3dyeFYrYWdpM1lSTzNyVVFWL3djVitMTDhESG95WnpTVGVqY1hRMXhSYzcvdWh5emwza3YzTHg4ZEpGdVFLZnVlb2hEbmpGblpQNG8vajdtMFpRSDRFczNvRFAzSWNRVjJmNllNRitDT1pqZ1VlaVoyZEp1Nk1SOUN2RzYzSUx2eDR6TUNmTzgwaVFpN1lMTzI5Y1FWM3diMzRzcHNyNHJ1bUJFMmdXZHR1OGhEbG45OVMxTVhlWVg0TTZsZVVTYUR4M1dFSzhsUmRZVDVsUi96UGxmbnN3cHpZZU9hb2pYSjRjU2ZCM1B3K2ZndHVnMFc1b0puZE1RVDAvdVpHZWFYWlZ5ZlRadVY1cE5wRG5RTVEzeHhzazBPOVVmejhaRGNkdlNmQ0tUaHc1cGlHZFAyaW9GNDk2SlQwYzNXY2prS1IxVDVrWVdqQ1RNNzhEZlFoZU15T1NnQXhyaXdjaDM1bFIvdkFiUHdPWG96UytwSHpxZUlSNk9hbDEyd3Z4MmZCeTZ5VUxxZ3c1bmlFZER3cHlSK1ZwTWtmWHNtSElwcDR3Zk9wb2hIajIzNFJmd0ZOd0RuV2JMK0tDREdlTHhrSkg1cDNnMXZnNTNLMDB1TWxyb1hJWjR2R1RCU01KOEZlWmt6bVdsNlVWR0E1M0tFTmZEL1ppeU5DbXludk8vRnBkTElESWNkQ1pEWEM4Wm1mT2QrZC93SmVqWlh6SWNkQ0pEWEQ5NXhwd2pkblArVjc0ekg0V3UvcExCb1BNWTRzbVNNTitGS2JKK0JCcG1tUnQwR2tQY0RCTG11L0ZqZUFpNmxGTm1CNTNGRURlSFRMUHphQ29qODBkd0JmcU1XVFlNbmNRUU41ZXNBUHN3N2xjdWw4ajYwRUVNY2ZQSkRiRDNZVTdsM0t4Y09wRTEwQ2tNY1R2SVZEdmZtYy9FM1hFTHRQcWpHT0tXa2hWZ3ArR2VtREQ3dmJuUDBBRU1jWHRKa2ZVMzRHTnhBVG95OXhFdXZDRnVQNnZ3Sk15T3FZWGwwa3BmNEtJYjRtNVFuY3laVFJhcFpHR1krd0lYMnhCM2kzdnhPc3dtaTEzUWFYYlg0UUliNG02U1kzYS9pTWRoN21ZYjVxN0NoVFhFM2FYYWFMRVNxN3JNVzVaTEwxMkJpMnFJKzhFOWVEa216THVoWWU0S1hFeEQzQjh5TXQrT2wrS0wwQ0xyWFlDTGFJajdSOEo4SzE2Q1I2UExPZHNNRjg4UTk1ZnNtUG9SWG96UHhkek5kdlZYMitDaUdXTEp6YStFT1hXWmo4U2QwQVB3MndJWHl4QkxxUFl5MzRMblk4SzhEQTF6MCtFaUdXS1pTZ0o5STc0TFUyUjlSM1NhM1ZTNE9JWllacUpheW5rV3BzajZ3MHUza1NiQmhUSEVzakh1d3hzd3BWd1B3NldsKzBnVDRJSVlZcGtObVdLbnIxeVBxZjU0S0c1VnVwRk1rbkpoUkdaTHdwelZYNm4rK0RaOEdycGphcEp3QVF5eERFTENuQjFUcVdUeDEvZ1VkR1NlQkRTOElaWkJTWkJqenY3NlBQNFZIb1NHdVU1b2NFTXNveUJoVHNHNFZIOThJeDZBODBzM2szRkNReHRpR1NWWk1QSVQvQ3dtelB1aHo1akhDUTFzaUdVY1pDbG53dnhwUEFYM0xGMU9SZzJOYTRobFhHU0tuUVVqQ2ZObjhQWDRDTnkwZEQ4WkJUU29JWlp4a3pCWEkvUG44QVRNdW16RFBBcG9TRU1zZFpFdzV6dnpEekhUN0pkand1elpYOE5BQXhwaW1RU1paaWZNbjhUajhhR2xTOHBjb2ZFTXNVeUtqTXc1bFRPbmpId2NjMlRRa3RJMVpiYlFhSVpZSmszQ25FMFdHWm12d09laCs1aG5DNDFsaUtVcFZDTnp3dndKUEJ5OStiVXhhQ1JETEUwalliNGZVLzB4MCt5RDhjR2x5OHBVYUJ4RExFMGtRYTdDZkNmbU1MOEQwU04ycDBLakdHSnBPZ2x6dFdna2gvazlDVDFpdDRMR01NVFNGaExtTEJySjNleHpjSi9TamZzTkRXR0lwWTBrMEQvQU0vR1JwVHYzRXhyQUVFdWJxVmFBblk1THNYOTNzL25RaGxpNlFMVUY4bldZSTNibllUK1djL0pCRGJGMGhlcU85amZ3bGZoSW5JL2REak1mMEJCTEYwbVlyOE5zc2tpTnFTMndtMkhtZ3hsaTZUSjV6cHdqZy80UWQ4YnVMUnJoUXhsaTZRTTVaamRIQmgySCtjN2NuVVVqZkJoRExIMGhVK3k3Y0NVK0g3T1hlVjZKUW52aFF4aGk2UnNKYzBibXkvQlorTXNiWUNVUzdZTTNiNGlscnlUTTJRTDVRVXpCdUh4bmJ0ODBtemR0aUVWV3I3NE5MOEtVY2syUjlmYU16THhaUXl5eWhvek1XY3A1SWY0dUpzek5QNXlBTjJtSVJSNUlWbi9kak9maEVkanN3L3g0YzRaWVpIcnlqUGttUEJzUHdZZVYyRFFMM3BnaEZwbVpUTEZ6WkZEQ25Mck16OER0c1RrYkxYZ3pobGhrNHlUTTJjdThDck5qS2lOendqejVPbE84Q1VNc01qY1M1cXpMZmd1bXlQcjJKVTZUZ1RkZ2lFVUdveXF5bnJyTXY0MlRPVE9iUDJ5SVJRWW4wK3dzNWJ3YVU4cjFOM0hyRXE5NjRBOGFZcEhoU1pqdndCU01TNWdQd25yV1pmT0hETEhJNk1nejVoeXhtNEp4ZjRrSDRIakR6Qjh3eENLakoySE9OUHVmOGM5eEh4elBYbVplMkJDTGpJZE1zV01xV2Z3VG5vaVB3ZEdPekx5Z0lSWVpQd2x6VldQcXRiZ1hqbWJCQ0M5a2lFWHFJOCtZczhuaWNud043bGFpT0RpOGlDRVdxWmVNeWxtWG5UQ25ZRnhPNXR5eFJITHU4SThOc2Noa1NKaXpMdnY3bUpINXBiZ1k1N1pqaW45Z2lFVW1TelV5Znc5VFpQMVkzTFpFZE9Qd3k0WllwQmtrektuKytCMzhLQjZGMjVXb3pneS9aSWhGbWtYQ25MTy92b3Nmd3B3eXNxaEVkbjM0b1NFV2FTWUo4eTh3MCt3UDRHRzQvb0lSL3FNaEZtazJWWmd6elU2WXMyTnE3VDVtL284aEZta0hDWE8yUHliTUYrTysrQ0JETE5JdUV1U3N5ODUzNWx2eFpFTXMwajZxV3N6WkpiWFVFSXUwaTF2d3JaaHFGWnY1blZpa1BXVHFmQTVtRjlRREQrZmpQeGhpa2VhUjc3N3hkcndBbjFBaXV6NzgwQkNMTkl2c2RNcUJBcWtOdFJ3M1hCZUtYekRFSXBNbm8yN0NlemRlaWsvR0JTV21HNFpmTk1RaWt5UGh6WHJwVkdYTTZSOHJjRzdsVmZrSGhsaWtmaExlN0Z6S282S1YrSHU0NW03elhPRWZHbUtSZXNrZTRvVDNrM2dNYmxuaU9CaThnQ0VXcVllTXZEL0dLL0Y0M0tIRWNEaDRJVU1zTWw1eXcrcEhtTE9vWDRhREg4VXpIYnlnSVJZWkQvbmVtNUgzS2p3QmQ4TFJWMUhrUlEyeHlHakozZWFjTloxaWF5ZmhyK1A0NmhuejRvWllaRFJrMnB6d3BoN1RYK0N1T1A3Nnhmd1JReXd5SE5sVlZJWDNWSHg4aVZjOThBY05zY2pnWkpGR3lwcStHZmZId1o3MURnTi8xQkNMekoyZjQ3L2lXekJsVElkNzFqc00vSEZETERJN2NyZjVIcndHMzRZSFk3MEZ4YWVETjJHSVJUWk13cHZqY0s3RmQrQlRjZkxocmVETkdHS1JtY25JZXoyK0V3L0ZoVGkzTWl2amhqZGtpRVhXSjBmRWZoWFB3bWZpNGhLWjVzR2JNOFFpYThuNjVsWDRMa3psaFllVnFEUVgzcVFoRmxuenJQYy84RnpNdHNCbDJLeHA4MHp3UmcyeDlKMGN4bjRlcG9CWmxralcvNngzR0hqRGhsajZTSlpJNWdUSjkrRHpNZUhkdk1TaVhmREdEYkgwaVdwYllNcWdKTHk3WUx0RzNxbndBUXl4OUlWc0M3d0VYNEM3NC9oMkZ0VUpIOFFRUzlmSlVUZzVRZkk0M0FQbmxlN2ZEZmhBaGxpNlNvNS8vUmkrR0JQZXlhMXZIaWQ4TUVNc1hTTUgwWDBDWDRKNzRjTFMzYnNKSDlBUVMxZklUYXZzNmYxVmVMRWR6M3FIZ1E5cGlLWHRaSE5DMWpmbkVMcGZUcHV4KytHdDRNTWFZbWtybVRaL0dWK0xDVyszcDgwendRYzN4Tkkyc2tUeUJzd2hkSHRpYzdZRlRnSWF3QkJMbTdnUlQ4SEg0ZGJZbjJuelROQUlobGphUUNya3Z3a1QzdHl3R3Y4cGttMkJ4akRFMGxSeW9rYk9zam9EVXlFL042d003MVJvRkVNc1RTUGh2UlBmalkvR0JlaTBlU1pvSEVNc1RlSjIvQUR1ZyszY1ZWUTNOSlFobGlhUWtmY2Y4U25vcURzWGFEQkRMSk1pajRydXhjdndhZWpJT3dnMG5DR1d1c255eUlUM0Nqd00rN2xJWTFUUWdJWlk2aUEzcXpMeVptZFJTbjBlaWMwOVFiSk4wSkNHV01aSndwdVI5dzc4RXI0UXU3a2xjRkxRb0laWXhrWHE5T1p1YzJvV1pYTkN2NWRIamdzYTFoRExxS25DbTJxQjJaencwTkxkWkJ6UXdJWllSa1dtelQvRGhQZEUzS1YwTXhrbk5MUWhsbUhKOTk2RU53WEhzamtocTZ4Y0hsa1hOTFlobGtGSmVIUERLaHZ5c3praDRXMzM4YTl0aEVZM3hESlg4cWdvR3hNUzN0VHBmU3pPTDExSzZvYkdOOFF5V3hMZUxJL010RG1sUHZkSHA4MlRob3RnaUdVMlpPU3R3cnNDWFNMWkZMZ1lobGcyeEYyWWM2ek94cWVqQ3pXYUJoZkZFTXQwcE1qMlZ6QjFlZy9CSmFYTFNOUGc0aGhpcWNqZDVpelVTSVg4bFBwOEZpNHRYVVdhQ2hmSkVFdEloZndVMmI0UVUyUjdPM1JmYnh2Z1FobmlmcE9EMTcrSkNXOUtmUzVGN3ppM0NTNllJZTRuT1hqOVcvaDNlQXcrdkhRSmFSdGNQRVBjTC9LczkyYThDSS9GWGRGcGM1dmhBaHJpL3ZCOS9IdjhBM3dVdWtTeUMzQWhEWEgzK1NuK0F4NlBxWkR2RXNrdXdRVTF4TjJrT2dvbkowaW0xR2MySjJ4UkxydDBDUzZzSWU0VzFjNmlqMk5HM2xST21GY3V0M1FSTHJBaDdnNEo3NVg0UjdnM0d0NCt3SVUyeE8wbjArWlA0YXN3QmNkYzM5d251T0NHdUwza1dlL244RFc0THk0cWwxWDZCQmZlRUxlVEwrQUorQVRjQm4zVzIxZTQrSWE0UGVTTzg5ZndUL0dKdUFoZEl0bDM2QVNHdVBsa1o5RzM4ZldZbzNBeThocGVXUU9kd1JBM2x4d0JleE8rR1ZQcTA3SW5zajUwREVQY1RMSysrZTJZYzZ3V285OTVaWHJvSElhNFdkeUtPUXBuT1diYXZHbTVWQ0xUUXljeHhNMGdwMGllajAvRzNMQXl2REk3NkN5R2VISlV4K0c4SHc5RXd5dHpoMDVqaUNkRERxSzdIQS9BaGVoM1hoa01PbzhocnBlMDk2ZnhkOUQ5dkRJOHBWUEorTGtYUDR2UFFhZk1NanJvVUlaNGZPUTdiOVkzWDRVNXg4b2kyeko2NkZpR2VQUmtlV1JPa2Z3aUhvZWUzU3pqZ3c1bWlFZERSdDE0RCtidzlaZmpEcVdaUmNZSEhjMFFEMDkxRkU2T2dQMHo5T0IxcVE4Nm15RWVuS3h0VG5nejhyNEJIWG1sZnVoNGhuanVKTHdwOVpscWdhZmg3cVU1UmVxSERtaUlaMCttelZrZWVRTytGUjlmbWxGa2N0QVJEZkhzU0ozZWY4ZHFaNUdIMEVrem9ETWE0cG5KM2VhMFQwN1RPQWV6dm5sQmFUcVJabEE2cVR5UWhEZHJtMWZoQlhnd0dsNXBKblJPUTd5VzZqbHZ3dnRlZkFadVhwcEtwSm1VVGl0cnA4MHA5Wm4xelE4dVRTVFNiT2lzZlE5eHBzMnBrSi93UGhlM0swMGowZzdvdEgwTjhmMzRkWHdmSG8wVzJaWjJRdWZ0WTRpelBES25hYndJSDRFZS95cnRoUTdjbHhCbmxkVVA4Qko4TVNhODd1dVY5a05IN25xSWM0WlZ3dnNoZkNrdVE4TXIzWUVPM2RVUVo0bmtEL0hEbUZLZmU1U1BMTkl0Nk54ZERISEMreEY4QmFic2lTT3ZkQmM2ZUpkQ2ZCdGVoZ2x2aW16N3JGZTZEeDI5Q3lIT1FvMHI4TldZT3IwVzJaYitRSWR2YTRpelJETFBlbGRpNnZTbTFPZkM4ckZFK2dNZHY0MGh6bnUrR2xNaGZ6L2NFajBPUi9vSm5iOU5JYzU3dlFaUHhDZWhJNjlJQ1ViVHlkbk4xK0xKbVBBdUtXOWZSQWhFazBPY1o3M1hZdzZoT3dnOXYxbGtLZ1NqcVNITzVvUlQ4VGR3S2JxK1dXUTZDRWVUUXB3N3psbW9jVHFtVG0vT2I3Ym9tTWlHSUNSTkNIR216VC9Cc3pDbFBqUHl1c3BLWkRZUWxrbUgrTWY0dDdnY3QwZW56U0p6Z2RCTUtzUUo3MFg0VkhUa0ZSa1V3bE4zaUZNNTRZTjRLRzZMSGtRbk1neUVxSzRRNTFudnBaandadVExdkNLamdERFZFZUlyOFhCTWVMM2JMREpLQ05XNFFweVI5em84QXJkQmIxaUpqQVBDTmVvUUo3eXBGbmdzemtjM0pvaU1FMEkycWhEbldXOEtqdjB4dWpGQnBDNEkzREFoemdxckhFU1hVcC9aMC91UThySWlVaGNFYjVBUUo3ejM0VGZ3Sk55NXZKeUkxQTBCbkcySUU5eVlzaWZmd1RmaXp1aDNYcEZKUWdobkUrSjgzMDE0djR1cGtMOHIrcWhJcEFrUXhnMkZPT0hOenpOdFBoZjNSRWRla1NaUlFqcVZUSnR6Z3VTTmVENGVXSDVkUkpvR0FaMGE0cnZ4bTNnaHJrQ256U0pOaHBCV0ljNy9wbHBnd3B1ZFJaN2RMTklHQ092dEpid1g0Mkc0dVB4SVJOb0FvVTJkM2lOeFVmbFBJdElhTnRuay93RUdCb01kcEVDR0hBQUFBQUJKUlU1RXJrSmdnZz09JztcbiAgICAgICAgcGxheU92ZXJsYXlIdG1sSW5uZXIuYWx0ID0gJ1N0YXJ0IFN0cmVhbWluZyc7XG4gICAgICAgIHJldHVybiBwbGF5T3ZlcmxheUh0bWxJbm5lcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBjb25uZWN0IG92ZXJsYXkgd2l0aCBhIGNvbm5lY3Rpb24gYnV0dG9uLlxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtIHRoZSBwYXJlbnQgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHBhcmVudEVsZW0sXG4gICAgICAgICAgICBQbGF5T3ZlcmxheS5jcmVhdGVSb290RWxlbWVudCgpLFxuICAgICAgICAgICAgUGxheU92ZXJsYXkuY3JlYXRlQ29udGVudEVsZW1lbnQoKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgbmV3IGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IE92ZXJsYXlCYXNlIH0gZnJvbSAnLi9CYXNlT3ZlcmxheSc7XG5cbi8qKlxuICogQ2xhc3MgZm9yIHRoZSB0ZXh0IG92ZXJsYXkgYmFzZVxuICovXG5leHBvcnQgY2xhc3MgVGV4dE92ZXJsYXkgZXh0ZW5kcyBPdmVybGF5QmFzZSB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGEgdGV4dCBvdmVybGF5XG4gICAgICogQHBhcmFtIHJvb3REaXYgdGhlIHJvb3QgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvXG4gICAgICogQHBhcmFtIHJvb3RFbGVtZW50IHRoZSByb290IGVsZW1lbnQgdGhhdCBpcyB0aGUgb3ZlcmxheVxuICAgICAqIEBwYXJhbSB0ZXh0RWxlbWVudCBhbiBlbGVtZW50IHRoYXQgY29udGFpbnMgdGV4dCBmb3IgdGhlIGFjdGlvbiBvdmVybGF5XG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxuICAgICAgICByb290RGl2OiBIVE1MRWxlbWVudCxcbiAgICAgICAgcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgICAgICB0ZXh0RWxlbWVudDogSFRNTEVsZW1lbnRcbiAgICApIHtcbiAgICAgICAgc3VwZXIocm9vdERpdiwgcm9vdEVsZW1lbnQsIHRleHRFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHRleHQgb3ZlcmxheXMgaW5uZXIgdGV4dFxuICAgICAqIEBwYXJhbSB0ZXh0IHRoZSB1cGRhdGUgdGV4dCB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZSh0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRleHQgIT0gbnVsbCB8fCB0ZXh0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy50ZXh0RWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyogQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC4gKi9cblxuaW1wb3J0IGpzcywgeyBTdHlsZXMgfSBmcm9tICdqc3MnO1xuaW1wb3J0IGdsb2JhbCBmcm9tICdqc3MtcGx1Z2luLWdsb2JhbCc7XG5pbXBvcnQgY2FtZWxDYXNlIGZyb20gJ2pzcy1wbHVnaW4tY2FtZWwtY2FzZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sb3JQYWxldHRlIHtcbiAgICAnLS1jb2xvcjAnOiBzdHJpbmc7XG4gICAgJy0tY29sb3IxJzogc3RyaW5nO1xuICAgICctLWNvbG9yMic6IHN0cmluZztcbiAgICAnLS1jb2xvcjMnOiBzdHJpbmc7XG4gICAgJy0tY29sb3I0Jzogc3RyaW5nO1xuICAgICctLWNvbG9yNSc6IHN0cmluZztcbiAgICAnLS1jb2xvcjYnOiBzdHJpbmc7XG4gICAgJy0tY29sb3I3Jzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgUGl4ZWxTdHJlYW1pbmdBcHBsaWNhdGlvblN0eWxlIHtcbiAgICBkZWZhdWx0TGlnaHRNb2RlUGFsZXR0ZTogQ29sb3JQYWxldHRlID0ge1xuICAgICAgICAnLS1jb2xvcjAnOiAnI2UyZTBkZDgwJyxcbiAgICAgICAgJy0tY29sb3IxJzogJyNGRkZGRkYnLFxuICAgICAgICAnLS1jb2xvcjInOiAnIzAwMDAwMCcsXG4gICAgICAgICctLWNvbG9yMyc6ICcjMDU4NWZlJyxcbiAgICAgICAgJy0tY29sb3I0JzogJyMzNWIzNTAnLFxuICAgICAgICAnLS1jb2xvcjUnOiAnI2ZmYWIwMCcsXG4gICAgICAgICctLWNvbG9yNic6ICcjZTFlMmRkJyxcbiAgICAgICAgJy0tY29sb3I3JzogJyNjM2M0YmYnXG4gICAgfTtcblxuICAgIGRlZmF1bHREYXJrTW9kZVBhbGV0dGU6IENvbG9yUGFsZXR0ZSA9IHtcbiAgICAgICAgJy0tY29sb3IwJzogJyMxRDFGMjI4MCcsXG4gICAgICAgICctLWNvbG9yMSc6ICcjMDAwMDAwJyxcbiAgICAgICAgJy0tY29sb3IyJzogJyNGRkZGRkYnLFxuICAgICAgICAnLS1jb2xvcjMnOiAnIzA1ODVmZScsXG4gICAgICAgICctLWNvbG9yNCc6ICcjMzViMzUwJyxcbiAgICAgICAgJy0tY29sb3I1JzogJyNmZmFiMDAnLFxuICAgICAgICAnLS1jb2xvcjYnOiAnIzFlMWQyMicsXG4gICAgICAgICctLWNvbG9yNyc6ICcjM2MzYjQwJ1xuICAgIH07XG5cbiAgICBkZWZhdWx0U3R5bGVzID0ge1xuICAgICAgICAnOnJvb3QnOiB7XG4gICAgICAgICAgICAnLS1jb2xvcjAnOiAnIzFEMUYyMjgwJyxcbiAgICAgICAgICAgICctLWNvbG9yMSc6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgICctLWNvbG9yMic6ICcjRkZGRkZGJyxcbiAgICAgICAgICAgICctLWNvbG9yMyc6ICcjMDU4NWZlJyxcbiAgICAgICAgICAgICctLWNvbG9yNCc6ICcjMzViMzUwJyxcbiAgICAgICAgICAgICctLWNvbG9yNSc6ICcjZmZhYjAwJyxcbiAgICAgICAgICAgICctLWNvbG9yNic6ICcjMWUxZDIyJyxcbiAgICAgICAgICAgICctLWNvbG9yNyc6ICcjM2MzYjQwJyxcbiAgICAgICAgICAgICctLWNvbG9yOCc6ICcjNDEwMDhjJyxcbiAgICAgICAgICAgICctLWNvbG9yOSc6ICcjM2UwMDcwJyxcbiAgICAgICAgICAgICctLWNvbG9yMTAnOiAnIzJlMDA1MicsXG4gICAgICAgICAgICAnLS1jb2xvcjExJzogJ3JnYmEoNjUsMCwxMzksMSknXG4gICAgICAgIH0sXG4gICAgICAgICcubm9zZWxlY3QnOiB7XG4gICAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNwbGF5ZXJVSSc6IHtcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnXG4gICAgICAgIH0sXG4gICAgICAgICcjdmlkZW9FbGVtZW50UGFyZW50Jzoge1xuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjEpJ1xuICAgICAgICB9LFxuICAgICAgICAnI3VpRmVhdHVyZXMnOiB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICB6SW5kZXg6ICczMCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IyKScsXG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbidcbiAgICAgICAgfSxcbiAgICAgICAgJy5VaVRvb2wgLnRvb2x0aXB0ZXh0Jzoge1xuICAgICAgICAgICAgdmlzaWJpbGl0eTogJ2hpZGRlbicsXG4gICAgICAgICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxNXB4JyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwcHggMTBweCcsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBcIidNb250c2VycmF0Jywgc2Fucy1zZXJpZlwiLFxuICAgICAgICAgICAgZm9udFNpemU6ICcwLjc1cmVtJyxcbiAgICAgICAgICAgIGxldHRlclNwYWNpbmc6ICcwLjc1cHgnLFxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICB0b3A6ICcwJyxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMjUlKScsXG4gICAgICAgICAgICBsZWZ0OiAnMTI1JScsXG4gICAgICAgICAgICB6SW5kZXg6ICcyMCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5VaVRvb2w6aG92ZXIgLnRvb2x0aXB0ZXh0Jzoge1xuICAgICAgICAgICAgdmlzaWJpbGl0eTogJ3Zpc2libGUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3I3KSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNjb25uZWN0aW9uIC50b29sdGlwdGV4dCc6IHtcbiAgICAgICAgICAgIHRvcDogJzEyNSUnLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtMjUlKScsXG4gICAgICAgICAgICBsZWZ0OiAnMCcsXG4gICAgICAgICAgICB6SW5kZXg6ICcyMCcsXG4gICAgICAgICAgICBwYWRkaW5nOiAnNXB4IDEwcHgnXG4gICAgICAgIH0sXG4gICAgICAgICcjY29ubmVjdGlvbic6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgYm90dG9tOiAnOCUnLFxuICAgICAgICAgICAgbGVmdDogJzUlJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IFwiJ01pY2hyb21hJywgc2Fucy1zZXJpZlwiLFxuICAgICAgICAgICAgaGVpZ2h0OiAnM3JlbScsXG4gICAgICAgICAgICB3aWR0aDogJzNyZW0nLFxuICAgICAgICAgICAgcG9pbnRlckV2ZW50czogJ2FsbCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNzZXR0aW5ncy1wYW5lbCAudG9vbHRpcHRleHQnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgdG9wOiAnMTI1JScsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcbiAgICAgICAgICAgIGxlZnQ6ICcwJyxcbiAgICAgICAgICAgIHpJbmRleDogJzIwJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc1cHggMTBweCcsXG4gICAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgdmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICB3aWR0aDogJ21heC1jb250ZW50JyxcbiAgICAgICAgICAgIGZhbGxiYWNrczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICdtYXgtY29udGVudCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnM3B4IHNvbGlkIHZhcigtLWNvbG9yMyknXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6ICc1cHggMTBweCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiAnMjAnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcwJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b3A6ICcxMjUlJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICAnI2NvbnRyb2xzJzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICB0b3A6ICczJScsXG4gICAgICAgICAgICBsZWZ0OiAnMiUnLFxuICAgICAgICAgICAgZm9udEZhbWlseTogXCInTWljaHJvbWEnLCBzYW5zLXNlcmlmXCIsXG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnYWxsJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcbiAgICAgICAgfSxcbiAgICAgICAgJyNjb250cm9scz4qJzoge1xuICAgICAgICAgICAgbWFyZ2luQm90dG9tOiAnMC41cmVtJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMnJlbScsXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiAnMS43NXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMC41cmVtJ1xuICAgICAgICB9LFxuICAgICAgICAnI2NvbnRyb2xzICNhZGRpdGlvbmFsaW5mbyc6IHtcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBcIidNb250c2VycmF0Jywgc2Fucy1zZXJpZlwiXG4gICAgICAgIH0sXG4gICAgICAgICcjZnVsbHNjcmVlbi1idG4nOiB7XG4gICAgICAgICAgICBwYWRkaW5nOiAnMC42cmVtICFpbXBvcnRhbnQnXG4gICAgICAgIH0sXG4gICAgICAgICcjbWluaW1pemVJY29uJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0sXG4gICAgICAgICcjc2V0dGluZ3NCdG4sICNzdGF0c0J0bic6IHtcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgICAgIH0sXG4gICAgICAgICcjdWlGZWF0dXJlcyBidXR0b24nOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCB2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IyKScsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIHdpZHRoOiAnM3JlbScsXG4gICAgICAgICAgICBoZWlnaHQ6ICczcmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwLjVyZW0nLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICAgICAgICB9LFxuICAgICAgICAnI3VpRmVhdHVyZXMgYnV0dG9uOmhvdmVyJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgdmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnMC4yNXMgZWFzZScsXG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogJzAuNTVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZ1RvcDogJzAuNTVyZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcjdWlGZWF0dXJlcyBidXR0b246YWN0aXZlJzoge1xuICAgICAgICAgICAgYm9yZGVyOiAnM3B4IHNvbGlkIHZhcigtLWNvbG9yMyknLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogJzAuNTVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZ1RvcDogJzAuNTVyZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcuYnRuLWZsYXQnOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMiknLFxuICAgICAgICAgICAgZm9udEZhbWlseTogXCInTW9udHNlcnJhdCdcIixcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzNweCBzb2xpZCB2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzFyZW0nLFxuICAgICAgICAgICAgZm9udFNpemU6ICcwLjc1cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMC41cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJzAuNXJlbScsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcidcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tZmxhdDpob3Zlcic6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yMyknLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2Vhc2UgMC4zcydcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tZmxhdDpkaXNhYmxlZCc6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAndmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMyknLFxuICAgICAgICAgICAgY3Vyc29yOiAnZGVmYXVsdCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tZmxhdDphY3RpdmUnOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tZmxhdDpmb2N1cyc6IHtcbiAgICAgICAgICAgIG91dGxpbmU6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICAnI3VpRmVhdHVyZXMgaW1nJzoge1xuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgICAgIH0sXG4gICAgICAgICcucGFuZWwtd3JhcCc6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgdG9wOiAnMCcsXG4gICAgICAgICAgICBib3R0b206ICcwJyxcbiAgICAgICAgICAgIHJpZ2h0OiAnMCcsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIG1pbldpZHRoOiAnMjB2dycsXG4gICAgICAgICAgICBtYXhXaWR0aDogJzkwdncnLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxMDAlKScsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnLjNzIGVhc2Utb3V0JyxcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdhbGwnLFxuICAgICAgICAgICAgYmFja2Ryb3BGaWx0ZXI6ICdibHVyKDEwcHgpJyxcbiAgICAgICAgICAgICctd2Via2l0LWJhY2tkcm9wLWZpbHRlcic6ICdibHVyKDEwcHgpJyxcbiAgICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgICAgICAgb3ZlcmZsb3dYOiAnaGlkZGVuJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yMCknXG4gICAgICAgIH0sXG4gICAgICAgICcucGFuZWwtd3JhcC12aXNpYmxlJzoge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwJSknXG4gICAgICAgIH0sXG4gICAgICAgICcucGFuZWwnOiB7XG4gICAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcxZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcjc2V0dGluZ3NIZWFkaW5nLCAjc3RhdHNIZWFkaW5nJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICBmb250U2l6ZTogJzJlbScsXG4gICAgICAgICAgICBtYXJnaW5CbG9ja1N0YXJ0OiAnMC42N2VtJyxcbiAgICAgICAgICAgIG1hcmdpbkJsb2NrRW5kOiAnMC42N2VtJyxcbiAgICAgICAgICAgIG1hcmdpbklubGluZVN0YXJ0OiAnMHB4JyxcbiAgICAgICAgICAgIG1hcmdpbklubGluZUVuZDogJzBweCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwIDAgMCAycmVtJ1xuICAgICAgICB9LFxuICAgICAgICAnI3NldHRpbmdzQ2xvc2UsICNzdGF0c0Nsb3NlJzoge1xuICAgICAgICAgICAgbWFyZ2luOiAnMC41cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmdUb3A6ICcwLjVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJzAuNXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcwLjVyZW0nLFxuICAgICAgICAgICAgZm9udFNpemU6ICcyZW0nLFxuICAgICAgICAgICAgZmxvYXQ6ICdyaWdodCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNzZXR0aW5nc0Nsb3NlOmFmdGVyLCAjc3RhdHNDbG9zZTphZnRlcic6IHtcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMC41cmVtJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgY29udGVudDogJ1wiXFxcXDAwZDdcIidcbiAgICAgICAgfSxcbiAgICAgICAgJyNzZXR0aW5nc0Nsb3NlOmhvdmVyLCAjc3RhdHNDbG9zZTpob3Zlcic6IHtcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnZWFzZSAwLjNzJ1xuICAgICAgICB9LFxuICAgICAgICAnI3NldHRpbmdzQ29udGVudCwgI3N0YXRzQ29udGVudCc6IHtcbiAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICcycmVtJyxcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnMnJlbSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zZXR0aW5nJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgcGFkZGluZzogJzAuMTVyZW0gMTBweCAwLjE1cmVtIDEwcHgnXG4gICAgICAgIH0sXG4gICAgICAgICcuc2V0dGluZ3MtdGV4dCc6IHtcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IyKScsXG4gICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnXG4gICAgICAgIH0sXG4gICAgICAgICcuc2V0dGluZ3Mtb3B0aW9uJzoge1xuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgICAgICAgICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnXG4gICAgICAgIH0sXG4gICAgICAgICcjY29ubmVjdE92ZXJsYXksICNwbGF5T3ZlcmxheSwgI2luZm9PdmVybGF5LCAjZXJyb3JPdmVybGF5LCAjYWZrT3ZlcmxheSwgI2Rpc2Nvbm5lY3RPdmVybGF5JzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB6SW5kZXg6ICczMCcsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzEuOGVtJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yMSknLFxuICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICB0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgJy5jbGlja2FibGVTdGF0ZSc6IHtcbiAgICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgfSxcbiAgICAgICAgJy50ZXh0RGlzcGxheVN0YXRlJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnXG4gICAgICAgIH0sXG4gICAgICAgICcuaGlkZGVuU3RhdGUnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNwbGF5QnV0dG9uLCAjY29ubmVjdEJ1dHRvbic6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgaGVpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICB6SW5kZXg6ICczMCdcbiAgICAgICAgfSxcbiAgICAgICAgJ2ltZyNwbGF5QnV0dG9uJzoge1xuICAgICAgICAgICAgbWF4V2lkdGg6ICcyNDFweCcsXG4gICAgICAgICAgICB3aWR0aDogJzEwJSdcbiAgICAgICAgfSxcbiAgICAgICAgJyN1aUludGVyYWN0aW9uJzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdmaXhlZCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNVSUludGVyYWN0aW9uQnV0dG9uQm91bmRhcnknOiB7XG4gICAgICAgICAgICBwYWRkaW5nOiAnMnB4J1xuICAgICAgICB9LFxuICAgICAgICAnI1VJSW50ZXJhY3Rpb25CdXR0b24nOiB7XG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICB9LFxuICAgICAgICAnI2hpZGRlbklucHV0Jzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBsZWZ0OiAnLTEwJScsXG4gICAgICAgICAgICB3aWR0aDogJzBweCcsXG4gICAgICAgICAgICBvcGFjaXR5OiAnMCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNlZGl0VGV4dEJ1dHRvbic6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnNDBweCcsXG4gICAgICAgICAgICB3aWR0aDogJzQwcHgnXG4gICAgICAgIH0sXG4gICAgICAgICcuYnRuLW92ZXJsYXknOiB7XG4gICAgICAgICAgICB2ZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsLXN3aXRjaCc6IHtcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wtc3dpdGNoIC50Z2wnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wsIC50Z2w6YWZ0ZXIsIC50Z2w6YmVmb3JlLCAudGdsICosIC50Z2wgKjphZnRlciwgLnRnbCAqOmJlZm9yZSwgLnRnbCsudGdsLXNsaWRlcic6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgJy13ZWJraXQtYm94LXNpemluZyc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgJy50Z2w6Oi1tb3otc2VsZWN0aW9uLCAudGdsOmFmdGVyOjotbW96LXNlbGVjdGlvbiwgLnRnbDpiZWZvcmU6Oi1tb3otc2VsZWN0aW9uLCAudGdsICo6Oi1tb3otc2VsZWN0aW9uLCAudGdsICo6YWZ0ZXI6Oi1tb3otc2VsZWN0aW9uLCAudGdsICo6YmVmb3JlOjotbW96LXNlbGVjdGlvbiwgLnRnbCsudGdsLXNsaWRlcjo6LW1vei1zZWxlY3Rpb24nOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgJy50Z2w6OnNlbGVjdGlvbiwgLnRnbDphZnRlcjo6c2VsZWN0aW9uLCAudGdsOmJlZm9yZTo6c2VsZWN0aW9uLCAudGdsICo6OnNlbGVjdGlvbiwgLnRnbCAqOmFmdGVyOjpzZWxlY3Rpb24sIC50Z2wgKjpiZWZvcmU6OnNlbGVjdGlvbiwgLnRnbCsudGdsLXNsaWRlcjo6c2VsZWN0aW9uJzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbm9uZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICcudGdsLXNsaWRlcic6IHt9LFxuICAgICAgICAnLnRnbCsudGdsLXNsaWRlcic6IHtcbiAgICAgICAgICAgIG91dGxpbmU6ICcwJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICB3aWR0aDogJzQwcHgnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMThweCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsKy50Z2wtc2xpZGVyOmFmdGVyLCAudGdsKy50Z2wtc2xpZGVyOmJlZm9yZSc6IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICdcIlwiJyxcbiAgICAgICAgICAgIHdpZHRoOiAnNTAlJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsKy50Z2wtc2xpZGVyOmFmdGVyJzoge1xuICAgICAgICAgICAgbGVmdDogJzAnXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsKy50Z2wtc2xpZGVyOmJlZm9yZSc6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbC1mbGF0Ky50Z2wtc2xpZGVyJzoge1xuICAgICAgICAgICAgcGFkZGluZzogJzJweCcsXG4gICAgICAgICAgICAnLXdlYmtpdC10cmFuc2l0aW9uJzogJ2FsbCAuMnMgZWFzZScsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnYWxsIC4ycyBlYXNlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1jb2xvcjYpJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzNweCBzb2xpZCB2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzJlbSdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wtZmxhdCsudGdsLXNsaWRlcjphZnRlcic6IHtcbiAgICAgICAgICAgICctd2Via2l0LXRyYW5zaXRpb24nOiAnYWxsIC4ycyBlYXNlJyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdhbGwgLjJzIGVhc2UnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgY29udGVudDogJ1wiXCInLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMWVtJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbC1mbGF0OmNoZWNrZWQrLnRnbC1zbGlkZXInOiB7XG4gICAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgdmFyKC0tY29sb3IzKSdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wtZmxhdDpjaGVja2VkKy50Z2wtc2xpZGVyOmFmdGVyJzoge1xuICAgICAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tY29sb3IzKSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tYXBwbHknOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2sgIWltcG9ydGFudCcsXG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICBtYXJnaW5SaWdodDogJ2F1dG8nLFxuICAgICAgICAgICAgd2lkdGg6ICc0MCUnXG4gICAgICAgIH0sXG4gICAgICAgICcuZm9ybS1jb250cm9sJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBib3JkZXI6ICcycHggc29saWQgdmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdpbmhlcml0J1xuICAgICAgICB9LFxuICAgICAgICAnLmZvcm0tY29udHJvbDpob3Zlcic6IHtcbiAgICAgICAgICAgIGJvcmRlckNvbG9yOiAndmFyKC0tY29sb3I3KSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5mb3JtLWdyb3VwJzoge1xuICAgICAgICAgICAgcGFkZGluZ1RvcDogJzRweCcsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZ3JpZCcsXG4gICAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiAnODAlIDIwJScsXG4gICAgICAgICAgICByb3dHYXA6ICc0cHgnLFxuICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnMTBweCcsXG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogJzEwcHgnXG4gICAgICAgIH0sXG4gICAgICAgICcuZm9ybS1ncm91cCBsYWJlbCc6IHtcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zZXR0aW5nc0NvbnRhaW5lcic6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgcGFkZGluZ1RvcDogJzEwcHgnLFxuICAgICAgICAgICAgcGFkZGluZ0JvdHRvbTogJzEwcHgnXG4gICAgICAgIH0sXG4gICAgICAgICcuc2V0dGluZ3NDb250YWluZXI+IDpmaXJzdC1jaGlsZCc6IHtcbiAgICAgICAgICAgIG1hcmdpblRvcDogJzRweCcsXG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICc0cHgnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2Jhc2VsaW5lJ1xuICAgICAgICB9LFxuICAgICAgICAnLmNvbGxhcHNlJzoge1xuICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICc1JSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNzdHJlYW1Ub29scyc6IHtcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiAnNXB4JyxcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbUxlZnRSYWRpdXM6ICc1cHgnLFxuICAgICAgICAgICAgdXNlclNlbGVjdDogJ25vbmUnLFxuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICB0b3A6ICcwJyxcbiAgICAgICAgICAgIHJpZ2h0OiAnMiUnLFxuICAgICAgICAgICAgekluZGV4OiAnMTAwJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzRweCBzb2xpZCB2YXIoLS1jb2xvdXI4KScsXG4gICAgICAgICAgICBib3JkZXJUb3BXaWR0aDogJzBweCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zZXR0aW5nc0hlYWRlcic6IHtcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ2l0YWxpYydcbiAgICAgICAgfSxcbiAgICAgICAgJyNzdHJlYW1Ub29sc0hlYWRlcic6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxuICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJyxcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCB2YXIoLS1jb2xvdXI4KScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjcpJ1xuICAgICAgICB9LFxuICAgICAgICAnLnN0cmVhbVRvb2xzJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3IyKScsXG4gICAgICAgICAgICBmb250RmFtaWx5OiAndmFyKC0tYnV0dG9uRm9udCknLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2xpZ2h0ZXInLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjcpJ1xuICAgICAgICB9LFxuICAgICAgICAnLnN0cmVhbVRvb2xzLXNob3duPiNzdHJlYW1Ub29sc1NldHRpbmdzLCAuc3RyZWFtVG9vbHMtc2hvd24+I3N0cmVhbVRvb2xzU3RhdHMnOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICcjc3RyZWFtVG9vbHNUb2dnbGUnOiB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnXG4gICAgICAgIH0sXG4gICAgICAgICcjcXVhbGl0eVN0YXR1cyc6IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMzdweCcsXG4gICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICc0cHgnXG4gICAgICAgIH0sXG4gICAgICAgICcuc3ZnSWNvbic6IHtcbiAgICAgICAgICAgIGZpbGw6ICd2YXIoLS1jb2xvcjIpJ1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGN1c3RvbVN0eWxlcz86IFBhcnRpYWw8U3R5bGVzPjtcbiAgICBsaWdodE1vZGVQYWxldHRlOiBDb2xvclBhbGV0dGU7XG4gICAgZGFya01vZGVQYWxldHRlOiBDb2xvclBhbGV0dGU7XG5cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zPzoge1xuICAgICAgICBjdXN0b21TdHlsZXM/OiBQYXJ0aWFsPFN0eWxlcz47XG4gICAgICAgIGxpZ2h0TW9kZVBhbGV0dGU/OiBDb2xvclBhbGV0dGU7XG4gICAgICAgIGRhcmtNb2RlUGFsZXR0ZT86IENvbG9yUGFsZXR0ZTtcbiAgICAgICAganNzSW5zZXJ0aW9uUG9pbnQ/OiBzdHJpbmcgfCBIVE1MRWxlbWVudDtcbiAgICB9KSB7XG4gICAgICAgIGNvbnN0IHsgY3VzdG9tU3R5bGVzLCBsaWdodE1vZGVQYWxldHRlLCBkYXJrTW9kZVBhbGV0dGUsIGpzc0luc2VydGlvblBvaW50IH0gPVxuICAgICAgICAgICAgb3B0aW9ucyA/PyB7fTtcbiAgICAgICAgLy8gT25lIHRpbWUgc2V0dXAgd2l0aCBkZWZhdWx0IHBsdWdpbnMgYW5kIHNldHRpbmdzLlxuICAgICAgICBjb25zdCBqc3NPcHRpb25zID0ge1xuICAgICAgICAgICAgLy8gSlNTIGhhcyBtYW55IGludGVyZXN0aW5nIHBsdWdpbnMgd2UgbWF5IHdpc2ggdG8gdHVybiBvblxuICAgICAgICAgICAgLy9wbHVnaW5zOiBbZnVuY3Rpb25zKCksIHRlbXBsYXRlKCksIGdsb2JhbCgpLCBleHRlbmQoKSwgbmVzdGVkKCksIGNvbXBvc2UoKSwgY2FtZWxDYXNlKCksIGRlZmF1bHRVbml0KG9wdGlvbnMuZGVmYXVsdFVuaXQpLCBleHBhbmQoKSwgdmVuZG9yUHJlZml4ZXIoKSwgcHJvcHNTb3J0KCldXG4gICAgICAgICAgICBwbHVnaW5zOiBbZ2xvYmFsKCksIGNhbWVsQ2FzZSgpXSxcbiAgICAgICAgICAgIGluc2VydGlvblBvaW50OiBqc3NJbnNlcnRpb25Qb2ludFxuICAgICAgICB9O1xuXG4gICAgICAgIGpzcy5zZXR1cChqc3NPcHRpb25zKTtcblxuICAgICAgICB0aGlzLmN1c3RvbVN0eWxlcyA9IGN1c3RvbVN0eWxlcztcbiAgICAgICAgdGhpcy5saWdodE1vZGVQYWxldHRlID1cbiAgICAgICAgICAgIGxpZ2h0TW9kZVBhbGV0dGUgPz8gdGhpcy5kZWZhdWx0TGlnaHRNb2RlUGFsZXR0ZTtcbiAgICAgICAgdGhpcy5kYXJrTW9kZVBhbGV0dGUgPSBkYXJrTW9kZVBhbGV0dGUgPz8gdGhpcy5kZWZhdWx0RGFya01vZGVQYWxldHRlO1xuICAgIH1cblxuICAgIGFwcGx5U3R5bGVTaGVldCgpIHtcbiAgICAgICAgLy8gVG9kbzogcmVmYWN0b3IgY29kZWJhc2UgdG8gdXNlIGpzcyBhdCBhIGNvbXBvbmVudCBsZXZlbCwgY2xhc3NlcyBjYW4gYmUgZ3JhYmJlZCBsaWtlIHNvOlxuICAgICAgICAvL2NvbnN0IHtwaXhlbFN0cmVhbWluZ0NsYXNzZXN9ID0ganNzLmNyZWF0ZVN0eWxlU2hlZXQoc3R5bGVzKS5hdHRhY2goKTtcblxuICAgICAgICAvLyBhdHRhY2ggZ2VuZXJhdGVkIHN0eWxlIHNoZWV0IHRvIHBhZ2VcbiAgICAgICAganNzLmNyZWF0ZVN0eWxlU2hlZXQoe1xuICAgICAgICAgICAgJ0BnbG9iYWwnOiB7XG4gICAgICAgICAgICAgICAgLi4udGhpcy5kZWZhdWx0U3R5bGVzLFxuICAgICAgICAgICAgICAgIC4uLnRoaXMuY3VzdG9tU3R5bGVzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmF0dGFjaCgpO1xuICAgIH1cblxuICAgIGFwcGx5UGFsZXR0ZShwYWxldHRlOiBDb2xvclBhbGV0dGUpIHtcbiAgICAgICAgY29uc3Qgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCc6cm9vdCcpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjAnLCBwYWxldHRlWyctLWNvbG9yMCddKTtcbiAgICAgICAgcm9vdEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3IxJywgcGFsZXR0ZVsnLS1jb2xvcjEnXSk7XG4gICAgICAgIHJvb3RFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yMicsIHBhbGV0dGVbJy0tY29sb3IyJ10pO1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjMnLCBwYWxldHRlWyctLWNvbG9yMyddKTtcbiAgICAgICAgcm9vdEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3I0JywgcGFsZXR0ZVsnLS1jb2xvcjQnXSk7XG4gICAgICAgIHJvb3RFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yNScsIHBhbGV0dGVbJy0tY29sb3I1J10pO1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjYnLCBwYWxldHRlWyctLWNvbG9yNiddKTtcbiAgICAgICAgcm9vdEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3I3JywgcGFsZXR0ZVsnLS1jb2xvcjcnXSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBwbGF5ZXJzIGNvbG9yIHZhcmlhYmxlc1xuICAgICAqIEBwYXJhbSBpc0xpZ2h0TW9kZSAtIHNob3VsZCB3ZSB1c2UgYSBsaWdodCBvciBkYXJrIGNvbG9yIHNjaGVtZVxuICAgICAqL1xuICAgIHNldENvbG9yTW9kZShpc0xpZ2h0TW9kZTogYm9vbGVhbikge1xuICAgICAgICBpZiAoaXNMaWdodE1vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQYWxldHRlKHRoaXMubGlnaHRNb2RlUGFsZXR0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5UGFsZXR0ZSh0aGlzLmRhcmtNb2RlUGFsZXR0ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBGdWxsU2NyZWVuSWNvbiB9IGZyb20gJy4vRnVsbHNjcmVlbkljb24nO1xuaW1wb3J0IHsgU2V0dGluZ3NJY29uIH0gZnJvbSAnLi9TZXR0aW5nc0ljb24nO1xuaW1wb3J0IHsgU3RhdHNJY29uIH0gZnJvbSAnLi9TdGF0c0ljb24nO1xuaW1wb3J0IHsgWFJJY29uIH0gZnJvbSAnLi9YUkljb24nO1xuaW1wb3J0IHsgV2ViWFJDb250cm9sbGVyIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuNCc7XG5pbXBvcnQgeyBVSUVsZW1lbnRDb25maWcsIFVJRWxlbWVudENyZWF0aW9uTW9kZSB9IGZyb20gJy4uL1VJL1VJQ29uZmlndXJhdGlvblR5cGVzJ1xuXG4vKipcbiAqIENvbmZpZ3VyZXMgaG93IFVJIGVsZW1lbnRzIHRvIGNvbnRyb2wgdGhlIHN0cmVhbSBhcmUgY3JlYXRlZC4gXG4gKiBCeSBkZWZhdWx0LCBhIGJ1dHRvbiB3aWxsIGJlIGNyZWF0ZWQgZm9yIGVhY2ggY29udHJvbC4gVGhhdCBjYW4gYmUgb3ZlcnJpZGVuIHBlci1jb250cm9sXG4gKiB0byB1c2UgYW4gZXh0ZXJuYWxseSBwcm92aWRlZCBlbGVtZW50LCBvciB0byBkaXNhYmxlIHRoZSBlbGVtZW50IGVudGlyZWx5LlxuICovXG5leHBvcnQgdHlwZSBDb250cm9sc1VJQ29uZmlndXJhdGlvbiA9IHtcbiAgICAvL1tQcm9wZXJ0eSBpbiBrZXlvZiBDb250cm9scyBhcyBgJHtQcm9wZXJ0eX1UeXBlYF0/IDogVUlFbGVtZW50VHlwZTtcbiAgICBzdGF0c0J1dHRvblR5cGU/IDogVUlFbGVtZW50Q29uZmlnLFxuICAgIGZ1bGxzY3JlZW5CdXR0b25UeXBlPyA6IFVJRWxlbWVudENvbmZpZyxcbiAgICBzZXR0aW5nc0J1dHRvblR5cGU/IDogVUlFbGVtZW50Q29uZmlnLFxuICAgIHhySWNvblR5cGU/IDogVUlFbGVtZW50Q29uZmlnXG59XG5cbi8vIElmIHRoZXJlIGlzbid0IGEgdHlwZSBwcm92aWRlZCwgZGVmYXVsdCBiZWhhdmlvdXIgaXMgdG8gY3JlYXRlIHRoZSBlbGVtZW50LlxuZnVuY3Rpb24gc2hvdWxkQ3JlYXRlQnV0dG9uKHR5cGUgOiBVSUVsZW1lbnRDb25maWcgfCB1bmRlZmluZWQpIDogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0eXBlID09IHVuZGVmaW5lZCkgPyB0cnVlIDogKHR5cGUuY3JlYXRpb25Nb2RlID09PSBVSUVsZW1lbnRDcmVhdGlvbk1vZGUuQ3JlYXRlRGVmYXVsdEVsZW1lbnQpO1xufVxuXG4vKipcbiAqIEVsZW1lbnQgY29udGFpbmluZyB2YXJpb3VzIGNvbnRyb2xzIGxpa2Ugc3RhdHMsIHNldHRpbmdzLCBmdWxsc2NyZWVuLlxuICovXG5leHBvcnQgY2xhc3MgQ29udHJvbHMge1xuICAgIHN0YXRzSWNvbjogU3RhdHNJY29uO1xuICAgIGZ1bGxzY3JlZW5JY29uOiBGdWxsU2NyZWVuSWNvbjtcbiAgICBzZXR0aW5nc0ljb246IFNldHRpbmdzSWNvbjtcbiAgICB4ckljb246IFhSSWNvbjtcblxuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgdGhlIGNvbnRyb2xzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29uZmlnPyA6IENvbnRyb2xzVUlDb25maWd1cmF0aW9uKSB7XG4gICAgICAgIGlmICghY29uZmlnIHx8IHNob3VsZENyZWF0ZUJ1dHRvbihjb25maWcuc3RhdHNCdXR0b25UeXBlKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0c0ljb24gPSBuZXcgU3RhdHNJY29uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25maWcgfHwgc2hvdWxkQ3JlYXRlQnV0dG9uKGNvbmZpZy5zZXR0aW5nc0J1dHRvblR5cGUpKXtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NJY29uID0gbmV3IFNldHRpbmdzSWNvbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29uZmlnIHx8IHNob3VsZENyZWF0ZUJ1dHRvbihjb25maWcuZnVsbHNjcmVlbkJ1dHRvblR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLmZ1bGxzY3JlZW5JY29uID0gbmV3IEZ1bGxTY3JlZW5JY29uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25maWcgfHwgc2hvdWxkQ3JlYXRlQnV0dG9uKGNvbmZpZy54ckljb25UeXBlKSl7XG4gICAgICAgICAgICB0aGlzLnhySWNvbiA9IG5ldyBYUkljb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZWxlbWVudCBjb250YWluaW5nIHRoZSBjb250cm9scy5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ2NvbnRyb2xzJztcbiAgICAgICAgICAgIGlmICghIXRoaXMuZnVsbHNjcmVlbkljb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmZ1bGxzY3JlZW5JY29uLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghIXRoaXMuc2V0dGluZ3NJY29uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc0ljb24ucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEhdGhpcy5zdGF0c0ljb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzSWNvbi5yb290RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoISF0aGlzLnhySWNvbikge1xuICAgICAgICAgICAgICAgIFdlYlhSQ29udHJvbGxlci5pc1Nlc3Npb25TdXBwb3J0ZWQoJ2ltbWVyc2l2ZS12cicpLnRoZW4oXG4gICAgICAgICAgICAgICAgKHN1cHBvcnRlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnhySWNvbi5yb290RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cbn0iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40JztcbmltcG9ydCB7XG4gICAgRGF0YUNoYW5uZWxMYXRlbmN5VGVzdFJlc3VsdFxufSBmcm9tIFwiQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuNC90eXBlcy9EYXRhQ2hhbm5lbC9EYXRhQ2hhbm5lbExhdGVuY3lUZXN0UmVzdWx0c1wiO1xuXG4vKipcbiAqIERhdGFDaGFubmVsIExhdGVuY3kgdGVzdCBVSSBlbGVtZW50cyBhbmQgcmVzdWx0cyBoYW5kbGluZy5cbiAqL1xuZXhwb3J0IGNsYXNzIERhdGFDaGFubmVsTGF0ZW5jeVRlc3Qge1xuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgX2xhdGVuY3lUZXN0QnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIF9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYnV0dG9uIGNvbnRhaW5pbmcgdGhlIHN0YXRzIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NDb250YWluZXInKTtcblxuICAgICAgICAgICAgLy8gbWFrZSBoZWFkaW5nXG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBoZWFkaW5nLmlkID0gJ2RhdGFDaGFubmVsTGF0ZW5jeVRlc3RIZWFkZXInO1xuICAgICAgICAgICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCdzZXR0aW5ncy10ZXh0Jyk7XG4gICAgICAgICAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzSGVhZGVyJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZChoZWFkaW5nKTtcblxuICAgICAgICAgICAgY29uc3QgaGVhZGluZ1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGhlYWRpbmdUZXh0LmlubmVySFRNTCA9ICdEYXRhIENoYW5uZWwgTGF0ZW5jeSBUZXN0JztcbiAgICAgICAgICAgIGhlYWRpbmcuYXBwZW5kQ2hpbGQoaGVhZGluZ1RleHQpO1xuICAgICAgICAgICAgaGVhZGluZy5hcHBlbmRDaGlsZCh0aGlzLmxhdGVuY3lUZXN0QnV0dG9uKTtcblxuICAgICAgICAgICAgLy8gbWFrZSB0ZXN0IHJlc3VsdHMgZWxlbWVudFxuICAgICAgICAgICAgY29uc3QgcmVzdWx0c1BhcmVudEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHJlc3VsdHNQYXJlbnRFbGVtLmlkID0gJ2RhdGFDaGFubmVsTGF0ZW5jeVRlc3RDb250YWluZXInO1xuICAgICAgICAgICAgcmVzdWx0c1BhcmVudEVsZW0uY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZChyZXN1bHRzUGFyZW50RWxlbSk7XG5cbiAgICAgICAgICAgIHJlc3VsdHNQYXJlbnRFbGVtLmFwcGVuZENoaWxkKHRoaXMubGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fbGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudC5pZCA9ICdkYXRhQ2hhbm5lbExhdGVuY3lTdGF0c1Jlc3VsdHMnO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTdGF0c1Jlc3VsdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbGF0ZW5jeVRlc3RCdXR0b24oKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLnZhbHVlID0gJ1J1biBUZXN0JztcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLmlkID0gJ2J0bi1zdGFydC1kYXRhLWNoYW5uZWwtbGF0ZW5jeS10ZXN0JztcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3N0cmVhbVRvb2xzLWJ1dHRvbicpO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuLWZsYXQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUG9wdWxhdGUgdGhlIFVJIGJhc2VkIG9uIHRoZSBsYXRlbmN5IHRlc3QncyByZXN1bHRzLlxuICAgICAqIEBwYXJhbSByZXN1bHQgVGhlIGxhdGVuY3kgdGVzdCByZXN1bHRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVUZXN0UmVzdWx0KHJlc3VsdDogRGF0YUNoYW5uZWxMYXRlbmN5VGVzdFJlc3VsdCkge1xuICAgICAgICBMb2dnZXIuTG9nKFxuICAgICAgICAgICAgTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSxcbiAgICAgICAgICAgIHJlc3VsdC50b1N0cmluZygpLFxuICAgICAgICAgICAgNlxuICAgICAgICApO1xuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgd2UgaGF2ZSByZXN1bHRzLCBOYU4gd291bGQgbWVhbiB0aGF0IFVFIHZlcnNpb24gd2UgdGFsayB0byBkb2Vzbid0IHN1cHBvcnQgb3VyIHRlc3RcbiAgICAgICAgICovXG4gICAgICAgIGlmIChpc05hTihyZXN1bHQuZGF0YUNoYW5uZWxSdHQpKSB7XG4gICAgICAgICAgICB0aGlzLmxhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQuaW5uZXJIVE1MID0gJzxkaXY+Tm90IHN1cHBvcnRlZDwvZGl2Pic7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxhdGVuY3lTdGF0c0lubmVySFRNTCA9ICcnO1xuICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgICc8ZGl2PkRhdGEgY2hhbm5lbCBSVFQgKG1zKTogJyArXG4gICAgICAgICAgICByZXN1bHQuZGF0YUNoYW5uZWxSdHQgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXBhcmF0ZSBwYXRoIHRpbWUgZGlzY292ZXJ5IHdvcmtzIG9ubHkgd2hlbiBVRSBhbmQgUGxheWVyIGNsb2NrcyBoYXZlIGJlZW4gc3luY2hyb25pemVkLlxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHJlc3VsdC5wbGF5ZXJUb1N0cmVhbWVyVGltZSA+PSAwICYmIHJlc3VsdC5zdHJlYW1lclRvUGxheWVyVGltZSA+PSAwKSB7XG4gICAgICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgICAgICAnPGRpdj5QbGF5ZXIgdG8gU3RyZWFtZXIgcGF0aCAobXMpOiAnICsgcmVzdWx0LnBsYXllclRvU3RyZWFtZXJUaW1lICsgJzwvZGl2Pic7XG4gICAgICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgICAgICAnPGRpdj5TdHJlYW1lciB0byBQbGF5ZXIgcGF0aCAobXMpOiAnICtcbiAgICAgICAgICAgICAgICByZXN1bHQuc3RyZWFtZXJUb1BsYXllclRpbWUgK1xuICAgICAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudC5pbm5lckhUTUwgPSBsYXRlbmN5U3RhdHNJbm5lckhUTUw7XG4gICAgICAgIC8vc2V0dXAgYnV0dG9uIHRvIGRvd25sb2FkIHRoZSBkZXRhaWxlZCByZXN1bHRzXG4gICAgICAgIGxldCBkb3dubG9hZEJ1dHRvbjogSFRNTElucHV0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGRvd25sb2FkQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgZG93bmxvYWRCdXR0b24udmFsdWUgPSAnRG93bmxvYWQnO1xuICAgICAgICBkb3dubG9hZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzdHJlYW1Ub29scy1idXR0b24nKTtcbiAgICAgICAgZG93bmxvYWRCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuLWZsYXQnKTtcbiAgICAgICAgZG93bmxvYWRCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBmaWxlID0gbmV3IEJsb2IoW3Jlc3VsdC5leHBvcnRMYXRlbmN5QXNDU1YoKV0sIHt0eXBlOiAndGV4dC9wbGFpbid9KTtcbiAgICAgICAgICAgIGxldCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIiksXG4gICAgICAgICAgICAgICAgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcbiAgICAgICAgICAgIGEuaHJlZiA9IHVybDtcbiAgICAgICAgICAgIGEuZG93bmxvYWQgPSBcImRhdGFfY2hhbm5lbF9sYXRlbmN5X3Rlc3RfcmVzdWx0cy5jc3ZcIjtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgICAgICAgICBhLmNsaWNrKCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gICAgICAgICAgICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudC5hcHBlbmRDaGlsZChkb3dubG9hZEJ1dHRvbik7XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZVRlc3RTdGFydCgpIHtcbiAgICAgICAgdGhpcy5sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50LmlubmVySFRNTCA9XG4gICAgICAgICAgICAnPGRpdj5UZXN0IGluIHByb2dyZXNzPC9kaXY+JztcbiAgICB9XG5cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogRGVjbGFyZSBhZGRpdGlvbnMgdG8gYmFzZSB0eXBlcyBmb3IgY3Jvc3MgYnJvd3NlciBmdWxsc2NyZWVuIGZ1bmN0aW9uYWxpdHkuXG4gKi9cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgICBpbnRlcmZhY2UgRG9jdW1lbnQge1xuICAgICAgICB3ZWJraXRJc0Z1bGxTY3JlZW4/OiBib29sZWFuO1xuICAgICAgICBtb3pGdWxsU2NyZWVuPzogYm9vbGVhbjtcbiAgICAgICAgd2Via2l0RnVsbHNjcmVlbkVuYWJsZWQ/OiBib29sZWFuO1xuICAgICAgICBtb3pDYW5jZWxGdWxsU2NyZWVuPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgICAgbXNFeGl0RnVsbHNjcmVlbj86ICgpID0+IFByb21pc2U8dm9pZD47XG4gICAgICAgIHdlYmtpdEV4aXRGdWxsc2NyZWVuPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgICAgbW96RnVsbFNjcmVlbkVsZW1lbnQ/OiBFbGVtZW50O1xuICAgICAgICBtc0Z1bGxzY3JlZW5FbGVtZW50PzogRWxlbWVudDtcbiAgICAgICAgd2Via2l0RnVsbHNjcmVlbkVsZW1lbnQ/OiBFbGVtZW50O1xuICAgIH1cblxuICAgIGludGVyZmFjZSBIVE1MRWxlbWVudCB7XG4gICAgICAgIG1zUmVxdWVzdEZ1bGxzY3JlZW4/OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgICAgICBtb3pSZXF1ZXN0RnVsbHNjcmVlbj86ICgpID0+IFByb21pc2U8dm9pZD47XG4gICAgICAgIHdlYmtpdFJlcXVlc3RGdWxsc2NyZWVuPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgICAgd2Via2l0RW50ZXJGdWxsc2NyZWVuPzogKCkgPT4gdm9pZDtcbiAgICB9XG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgYW4gZWxlbWVudCAoaS5lLiBidXR0b24pIHRoYXQsIHdoZW4gY2xpY2tlZCwgd2lsbCB0b2dnbGUgZnVsbHNjcmVlbiBvZiBhIGdpdmVuIGVsZW1lbnQuXG4gKiBDYW4gYmUgaW5pdGlhbGl6ZWQgd2l0aCBhbnkgSFRNTEVsZW1lbnQsIGlmIGl0IGlzIHNldCBhcyByb290RWxlbWVudCBpbiB0aGUgY29uc3RydWN0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdWxsU2NyZWVuSWNvbkJhc2Uge1xuICAgIGlzRnVsbHNjcmVlbiA9IGZhbHNlO1xuICAgIGZ1bGxzY3JlZW5FbGVtZW50OiBIVE1MRWxlbWVudCB8IEhUTUxWaWRlb0VsZW1lbnQ7XG5cbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgcm9vdEVsZW1lbnQoZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiB0aGlzLnRvZ2dsZUZ1bGxzY3JlZW4oKTtcbiAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBlbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCkgeyAgICAgICBcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBmdWxsIHNjcmVlbiBldmVudHNcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJyxcbiAgICAgICAgICAgICgpID0+IHRoaXMub25GdWxsc2NyZWVuQ2hhbmdlKCksXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5vbkZ1bGxzY3JlZW5DaGFuZ2UoKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnZnVsbHNjcmVlbmNoYW5nZScsXG4gICAgICAgICAgICAoKSA9PiB0aGlzLm9uRnVsbHNjcmVlbkNoYW5nZSgpLFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdNU0Z1bGxzY3JlZW5DaGFuZ2UnLFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5vbkZ1bGxzY3JlZW5DaGFuZ2UoKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZXMgdGhlIGRvY3VtZW50IG9yIGZ1bGxzY3JlZW5FbGVtZW50IGZ1bGxzY3JlZW4uXG4gICAgICovXG4gICAgdG9nZ2xlRnVsbHNjcmVlbigpIHtcbiAgICAgICAgLy8gaWYgYWxyZWFkeSBmdWxsIHNjcmVlbjsgZXhpdFxuICAgICAgICAvLyBlbHNlIGdvIGZ1bGxzY3JlZW5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgfHxcbiAgICAgICAgICAgIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8XG4gICAgICAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCB8fFxuICAgICAgICAgICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmZ1bGxzY3JlZW5FbGVtZW50O1xuXG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5tb3pSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQubW96UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQud2Via2l0RW50ZXJGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC53ZWJraXRFbnRlckZ1bGxzY3JlZW4oKTsgLy9mb3IgaXBob25lIHRoaXMgY29kZSB3b3JrZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9uRnVsbHNjcmVlbkNoYW5nZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGZ1bGxzY3JlZW4gYnV0dG9uIG9uIGNoYW5nZVxuICAgICAqL1xuICAgIG9uRnVsbHNjcmVlbkNoYW5nZSgpIHtcbiAgICAgICAgdGhpcy5pc0Z1bGxzY3JlZW4gPVxuICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0SXNGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuIHx8XG4gICAgICAgICAgICAoZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCAmJlxuICAgICAgICAgICAgICAgIGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQgIT09IG51bGwpIHx8XG4gICAgICAgICAgICAoZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgJiYgZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgIT09IG51bGwpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBbiBpbXBsZW1lbnRhdGlvbiBvZiBGdWxsU2NyZWVuSWNvbkJhc2UgdGhhdCB1c2VzIGFuIGV4dGVybmFsbHlcbiAqIHByb3ZpZGVkIEhUTUxFbGVtZW50IGZvciB0b2dnbGluZyBmdWxsIHNjcmVlbi5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1bGxTY3JlZW5JY29uRXh0ZXJuYWwgZXh0ZW5kcyBGdWxsU2NyZWVuSWNvbkJhc2Uge1xuXG4gICAgY29uc3RydWN0b3IoZXh0ZXJuYWxCdXR0b24gOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50ID0gZXh0ZXJuYWxCdXR0b247XG4gICAgfVxuXG59XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgZnVsbHNjcmVlbiBpY29uIHRoYXQgY29udGFpbnMgYSBidXR0b24gYW5kIHN2Z3MgZm9yIGVhY2ggc3RhdGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBGdWxsU2NyZWVuSWNvbiBleHRlbmRzIEZ1bGxTY3JlZW5JY29uQmFzZSB7XG4gICAgX21heGltaXplSWNvbjogU1ZHRWxlbWVudDtcbiAgICBfbWluaW1pemVJY29uOiBTVkdFbGVtZW50O1xuICAgIF90b29sdGlwVGV4dDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNyZWF0ZWRCdXR0b24gOiBIVE1MQnV0dG9uRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjcmVhdGVkQnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgY3JlYXRlZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdVaVRvb2wnKTtcbiAgICAgICAgY3JlYXRlZEJ1dHRvbi5pZCA9ICdmdWxsc2NyZWVuLWJ0bic7XG4gICAgICAgIGNyZWF0ZWRCdXR0b24uYXBwZW5kQ2hpbGQodGhpcy5tYXhpbWl6ZUljb24pO1xuICAgICAgICBjcmVhdGVkQnV0dG9uLmFwcGVuZENoaWxkKHRoaXMubWluaW1pemVJY29uKTtcbiAgICAgICAgY3JlYXRlZEJ1dHRvbi5hcHBlbmRDaGlsZCh0aGlzLnRvb2x0aXBUZXh0KTtcblxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50ID0gY3JlYXRlZEJ1dHRvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXBUZXh0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5jbGFzc0xpc3QuYWRkKCd0b29sdGlwdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQuaW5uZXJIVE1MID0gJ0Z1bGxzY3JlZW4nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwVGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1heGltaXplSWNvbigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9tYXhpbWl6ZUljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX21heGltaXplSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdtYXhpbWl6ZUljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX21heGltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX21heGltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX21heGltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICd2aWV3Qm94JyxcbiAgICAgICAgICAgICAgICAnMCAwIDM4NC45NyAzODQuOTcnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIG9uZSBmb3IgZWFjaCBjb3JuZXJcbiAgICAgICAgICAgIGNvbnN0IHBhdGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDEuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00zODQuOTcsMTIuMDNjMC02LjcxMy01LjMxNy0xMi4wMy0xMi4wMy0xMi4wM0gyNjQuODQ3Yy02LjgzMywwLTExLjkyMiw1LjM5LTExLjkzNCwxMi4yMjNjMCw2LjgyMSw1LjEwMSwxMS44MzgsMTEuOTM0LDExLjgzOGg5Ni4wNjJsLTAuMTkzLDk2LjUxOWMwLDYuODMzLDUuMTk3LDEyLjAzLDEyLjAzLDEyLjAzYzYuODMzLTAuMDEyLDEyLjAzLTUuMTk3LDEyLjAzLTEyLjAzbDAuMTkzLTEwOC4zNjljMC0wLjAzNi0wLjAxMi0wLjA2LTAuMDEyLTAuMDg0QzM4NC45NTgsMTIuMDksMzg0Ljk3LDEyLjA2NiwzODQuOTcsMTIuMDN6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTEyMC40OTYsMEgxMi40MDNjLTAuMDM2LDAtMC4wNiwwLjAxMi0wLjA5NiwwLjAxMkMxMi4yODMsMC4wMTIsMTIuMjQ3LDAsMTIuMjIzLDBDNS41MSwwLDAuMTkyLDUuMzE3LDAuMTkyLDEyLjAzTDAsMTIwLjM5OWMwLDYuODMzLDUuMzksMTEuOTM0LDEyLjIyMywxMS45MzRjNi44MjEsMCwxMS44MzgtNS4xMDEsMTEuODM4LTExLjkzNGwwLjE5Mi05Ni4zMzloOTYuMjQyYzYuODMzLDAsMTIuMDMtNS4xOTcsMTIuMDMtMTIuMDNDMTMyLjUxNCw1LjE5NywxMjcuMzE3LDAsMTIwLjQ5NiwweidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGgzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDMuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xMjAuMTIzLDM2MC45MDlIMjQuMDYxdi05Ni4yNDJjMC02LjgzMy01LjE5Ny0xMi4wMy0xMi4wMy0xMi4wM1MwLDI1Ny44MzMsMCwyNjQuNjY3djEwOC4wOTJjMCwwLjAzNiwwLjAxMiwwLjA2LDAuMDEyLDAuMDg0YzAsMC4wMzYtMC4wMTIsMC4wNi0wLjAxMiwwLjA5NmMwLDYuNzEzLDUuMzE3LDEyLjAzLDEyLjAzLDEyLjAzaDEwOC4wOTJjNi44MzMsMCwxMS45MjItNS4zOSwxMS45MzQtMTIuMjIzQzEzMi4wNTcsMzY1LjkyNiwxMjYuOTU2LDM2MC45MDksMTIwLjEyMywzNjAuOTA5eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGg0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDQuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00zNzIuNzQ3LDI1Mi45MTNjLTYuODMzLDAtMTEuODUsNS4xMDEtMTEuODM4LDExLjkzNHY5Ni4wNjJoLTk2LjI0MmMtNi44MzMsMC0xMi4wMyw1LjE5Ny0xMi4wMywxMi4wM3M1LjE5NywxMi4wMywxMi4wMywxMi4wM2gxMDguMDkyYzAuMDM2LDAsMC4wNi0wLjAxMiwwLjA4NC0wLjAxMmMwLjAzNi0wLjAxMiwwLjA2LDAuMDEyLDAuMDk2LDAuMDEyYzYuNzEzLDAsMTIuMDMtNS4zMTcsMTIuMDMtMTIuMDNWMjY0Ljg0N0MzODQuOTcsMjU4LjAxNCwzNzkuNTgsMjUyLjkxMywzNzIuNzQ3LDI1Mi45MTN6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDEpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDIpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDMpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXhpbWl6ZUljb247XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBtaW5pbWl6ZUljb24oKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fbWluaW1pemVJY29uKSB7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnc3ZnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX21pbmltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnbWluaW1pemVJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24uc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAndmlld0JveCcsXG4gICAgICAgICAgICAgICAgJzAgMCAzODUuMzMxIDM4NS4zMzEnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fbWluaW1pemVJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIG9uZSBmb3IgZWFjaCBjb3JuZXJcbiAgICAgICAgICAgIGNvbnN0IHBhdGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDEuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00yNjQuOTQzLDE1Ni42NjVoMTA4LjI3M2M2LjgzMywwLDExLjkzNC01LjM5LDExLjkzNC0xMi4yMTFjMC02LjgzMy01LjEwMS0xMS44NS0xMS45MzQtMTEuODM4aC05Ni4yNDJWMzYuMTgxYzAtNi44MzMtNS4xOTctMTIuMDMtMTIuMDMtMTIuMDNzLTEyLjAzLDUuMTk3LTEyLjAzLDEyLjAzdjEwOC4yNzNjMCwwLjAzNiwwLjAxMiwwLjA2LDAuMDEyLDAuMDg0YzAsMC4wMzYtMC4wMTIsMC4wNi0wLjAxMiwwLjA5NkMyNTIuOTEzLDE1MS4zNDcsMjU4LjIzLDE1Ni42NzcsMjY0Ljk0MywxNTYuNjY1eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGgyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDIuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xMjAuMjkxLDI0LjI0N2MtNi44MjEsMC0xMS44MzgsNS4xMTMtMTEuODM4LDExLjkzNHY5Ni4yNDJIMTIuMDNjLTYuODMzLDAtMTIuMDMsNS4xOTctMTIuMDMsMTIuMDNjMCw2LjgzMyw1LjE5NywxMi4wMywxMi4wMywxMi4wM2gxMDguMjczYzAuMDM2LDAsMC4wNi0wLjAxMiwwLjA4NC0wLjAxMmMwLjAzNiwwLDAuMDYsMC4wMTIsMC4wOTYsMC4wMTJjNi43MTMsMCwxMi4wMy01LjMxNywxMi4wMy0xMi4wM1YzNi4xODFDMTMyLjUxNCwyOS4zNiwxMjcuMTI0LDI0LjI1OSwxMjAuMjkxLDI0LjI0N3onXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoMyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBhdGgzLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMTIwLjM4NywyMjguNjY2SDEyLjExNWMtNi44MzMsMC4wMTItMTEuOTM0LDUuMzktMTEuOTM0LDEyLjIyM2MwLDYuODMzLDUuMTAxLDExLjg1LDExLjkzNCwxMS44MzhoOTYuMjQydjk2LjQyM2MwLDYuODMzLDUuMTk3LDEyLjAzLDEyLjAzLDEyLjAzYzYuODMzLDAsMTIuMDMtNS4xOTcsMTIuMDMtMTIuMDNWMjQwLjg3N2MwLTAuMDM2LTAuMDEyLTAuMDYtMC4wMTItMC4wODRjMC0wLjAzNiwwLjAxMi0wLjA2LDAuMDEyLTAuMDk2QzEzMi40MTgsMjMzLjk4MywxMjcuMSwyMjguNjY2LDEyMC4zODcsMjI4LjY2NnonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoNCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBhdGg0LnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMzczLjMsMjI4LjY2NkgyNjUuMDI4Yy0wLjAzNiwwLTAuMDYsMC4wMTItMC4wODQsMC4wMTJjLTAuMDM2LDAtMC4wNi0wLjAxMi0wLjA5Ni0wLjAxMmMtNi43MTMsMC0xMi4wMyw1LjMxNy0xMi4wMywxMi4wM3YxMDguMjczYzAsNi44MzMsNS4zOSwxMS45MjIsMTIuMjIzLDExLjkzNGM2LjgyMSwwLjAxMiwxMS44MzgtNS4xMDEsMTEuODM4LTExLjkyMnYtOTYuMjQySDM3My4zYzYuODMzLDAsMTIuMDMtNS4xOTcsMTIuMDMtMTIuMDNTMzgwLjEzNCwyMjguNjc4LDM3My4zLDIyOC42NjZ6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDEpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDIpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDMpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9taW5pbWl6ZUljb247XG4gICAgfVxuXG4gICAgb25GdWxsc2NyZWVuQ2hhbmdlKCkge1xuICAgICAgICBzdXBlci5vbkZ1bGxzY3JlZW5DaGFuZ2UoKTtcblxuICAgICAgICBjb25zdCBtaW5pbWl6ZSA9IHRoaXMubWluaW1pemVJY29uO1xuICAgICAgICBjb25zdCBtYXhpbWl6ZSA9IHRoaXMubWF4aW1pemVJY29uO1xuXG4gICAgICAgIGlmICh0aGlzLmlzRnVsbHNjcmVlbikge1xuICAgICAgICAgICAgbWluaW1pemUuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xuICAgICAgICAgICAgLy9pb3MgZGlzYXBwZWFyaW5nIHN2ZyBmaXhcbiAgICAgICAgICAgIG1pbmltaXplLnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoMCwgMCknO1xuICAgICAgICAgICAgbWF4aW1pemUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1pbmltaXplLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBtYXhpbWl6ZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICAgICAgICAvL2lvcyBkaXNhcHBlYXJpbmcgc3ZnIGZpeFxuICAgICAgICAgICAgbWF4aW1pemUuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwLCAwKSc7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogQSBidXR0b24gd2l0aCBhIHRleHQgbGFiZWwgYmVzaWRlIGl0LlxuICovXG5leHBvcnQgY2xhc3MgTGFiZWxsZWRCdXR0b24ge1xuICAgIF9sYWJlbDogc3RyaW5nO1xuICAgIF9idXR0b25UZXh0OiBzdHJpbmc7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfYnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IobGFiZWw6IHN0cmluZywgYnV0dG9uVGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2xhYmVsID0gbGFiZWw7XG4gICAgICAgIHRoaXMuX2J1dHRvblRleHQgPSBidXR0b25UZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIGNsaWNrIGxpc3RlbmVyIHRvIHRoZSBidXR0b24gZWxlbWVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkT25DbGlja0xpc3RlbmVyKG9uQ2xpY2tGdW5jOiAoKSA9PiB2b2lkKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGlja0Z1bmMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgSFRNTElucHV0RWxlbWVudCBmb3IgdGhlIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGJ1dHRvbigpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9idXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0aGlzLl9idXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgdGhpcy5fYnV0dG9uLnZhbHVlID0gdGhpcy5fYnV0dG9uVGV4dDtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbi5jbGFzc0xpc3QuYWRkKCdvdmVybGF5LWJ1dHRvbicpO1xuICAgICAgICAgICAgdGhpcy5fYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bi1mbGF0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSByb290IGRpdiB3aXRoIFwic2V0dGluZ1wiIGNzcyBjbGFzc1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmcnKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGRpdiBlbGVtZW50IHRvIGNvbnRhaW4gb3VyIHNldHRpbmcncyB0ZXh0XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nc1RleHRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IHRoaXMuX2xhYmVsO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoc2V0dGluZ3NUZXh0RWxlbSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsYWJlbCBlbGVtZW50IHRvIHdyYXAgb3V0IGlucHV0IHR5cGVcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICB3cmFwcGVyTGFiZWwuY2xhc3NMaXN0LmFkZCgnYnRuLW92ZXJsYXknKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdyYXBwZXJMYWJlbCk7XG5cbiAgICAgICAgICAgIHdyYXBwZXJMYWJlbC5hcHBlbmRDaGlsZCh0aGlzLmJ1dHRvbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IExhdGVuY3lUZXN0UmVzdWx0cyB9IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjQnO1xuaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuNCc7XG5cbi8qKlxuICogTGF0ZW5jeSB0ZXN0IFVJIGVsZW1lbnRzIGFuZCByZXN1bHRzIGhhbmRsaW5nLlxuICovXG5leHBvcnQgY2xhc3MgTGF0ZW5jeVRlc3Qge1xuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgX2xhdGVuY3lUZXN0QnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIF9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGhlIGJ1dHRvbiBjb250YWluaW5nIHRoZSBzdGF0cyBpY29uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzQ29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIC8vIG1ha2UgaGVhZGluZ1xuICAgICAgICAgICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaGVhZGluZy5pZCA9ICdsYXRlbmN5VGVzdEhlYWRlcic7XG4gICAgICAgICAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzLXRleHQnKTtcbiAgICAgICAgICAgIGhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NIZWFkZXInKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuXG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaGVhZGluZ1RleHQuaW5uZXJIVE1MID0gJ0xhdGVuY3kgVGVzdCc7XG4gICAgICAgICAgICBoZWFkaW5nLmFwcGVuZENoaWxkKGhlYWRpbmdUZXh0KTtcbiAgICAgICAgICAgIGhlYWRpbmcuYXBwZW5kQ2hpbGQodGhpcy5sYXRlbmN5VGVzdEJ1dHRvbik7XG5cbiAgICAgICAgICAgIC8vIG1ha2UgdGVzdCByZXN1bHRzIGVsZW1lbnRcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHNQYXJlbnRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICByZXN1bHRzUGFyZW50RWxlbS5pZCA9ICdsYXRlbmN5VGVzdENvbnRhaW5lcic7XG4gICAgICAgICAgICByZXN1bHRzUGFyZW50RWxlbS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHJlc3VsdHNQYXJlbnRFbGVtKTtcblxuICAgICAgICAgICAgcmVzdWx0c1BhcmVudEVsZW0uYXBwZW5kQ2hpbGQodGhpcy5sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50LmlkID0gJ2xhdGVuY3lTdGF0c1Jlc3VsdHMnO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdTdGF0c1Jlc3VsdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbGF0ZW5jeVRlc3RCdXR0b24oKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLnZhbHVlID0gJ1J1biBUZXN0JztcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLmlkID0gJ2J0bi1zdGFydC1sYXRlbmN5LXRlc3QnO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnc3RyZWFtVG9vbHMtYnV0dG9uJyk7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4tZmxhdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXRlbmN5VGVzdEJ1dHRvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZSB0aGUgVUkgYmFzZWQgb24gdGhlIGxhdGVuY3kgdGVzdCdzIHJlc3VsdHMuXG4gICAgICogQHBhcmFtIGxhdGVuY3lUaW1pbmdzIFRoZSBsYXRlbmN5IHRlc3QgcmVzdWx0cy5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlVGVzdFJlc3VsdChsYXRlbmN5VGltaW5nczogTGF0ZW5jeVRlc3RSZXN1bHRzKSB7XG4gICAgICAgIExvZ2dlci5Mb2coTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSwgbGF0ZW5jeVRpbWluZ3MudG9TdHJpbmcoKSwgNik7XG4gICAgICAgIGxldCBsYXRlbmN5U3RhdHNJbm5lckhUTUwgPSAnJztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICAnPGRpdj5OZXQgbGF0ZW5jeSBSVFQgKG1zKTogJyArXG4gICAgICAgICAgICBsYXRlbmN5VGltaW5ncy5uZXR3b3JrTGF0ZW5jeSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICAnPGRpdj5VRSBFbmNvZGUgKG1zKTogJyArIGxhdGVuY3lUaW1pbmdzLkVuY29kZU1zICsgJzwvZGl2Pic7XG4gICAgICAgIGxhdGVuY3lTdGF0c0lubmVySFRNTCArPVxuICAgICAgICAgICAgJzxkaXY+VUUgQ2FwdHVyZSAobXMpOiAnICtcbiAgICAgICAgICAgIGxhdGVuY3lUaW1pbmdzLkNhcHR1cmVUb1NlbmRNcyArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICAnPGRpdj5Ccm93c2VyIHNlbmQgbGF0ZW5jeSAobXMpOiAnICtcbiAgICAgICAgICAgIGxhdGVuY3lUaW1pbmdzLmJyb3dzZXJTZW5kTGF0ZW5jeSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICBsYXRlbmN5VGltaW5ncy5mcmFtZURpc3BsYXlEZWx0YVRpbWVNcyAmJlxuICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MuYnJvd3NlclJlY2VpcHRUaW1lTXNcbiAgICAgICAgICAgICAgICA/ICc8ZGl2PkJyb3dzZXIgcmVjZWl2ZSBsYXRlbmN5IChtcyk6ICcgK1xuICAgICAgICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MuZnJhbWVEaXNwbGF5RGVsdGFUaW1lTXMgK1xuICAgICAgICAgICAgICAgICAgJzwvZGl2PidcbiAgICAgICAgICAgICAgICA6ICcnO1xuICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgICc8ZGl2PlRvdGFsIGxhdGVuY3kgKGV4Y2x1ZGluZyBicm93c2VyKSAobXMpOiAnICtcbiAgICAgICAgICAgIGxhdGVuY3lUaW1pbmdzLmxhdGVuY3lFeGNsdWRpbmdEZWNvZGUgK1xuICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIGxhdGVuY3lTdGF0c0lubmVySFRNTCArPSBsYXRlbmN5VGltaW5ncy5lbmRUb0VuZExhdGVuY3lcbiAgICAgICAgICAgID8gJzxkaXY+VG90YWwgbGF0ZW5jeSAobXMpOiAnICtcbiAgICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MuZW5kVG9FbmRMYXRlbmN5ICtcbiAgICAgICAgICAgICAgJzwvZGl2PidcbiAgICAgICAgICAgIDogJyc7XG4gICAgICAgIHRoaXMubGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudC5pbm5lckhUTUwgPSBsYXRlbmN5U3RhdHNJbm5lckhUTUw7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuLyoqXG4gKiBTZXR0aW5ncyBpY29uIHRoYXQgY2FuIGJlIGNsaWNrZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc0ljb24ge1xuICAgIF9yb290RWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgX3NldHRpbmdzSWNvbjogU1ZHRWxlbWVudDtcbiAgICBfdG9vbHRpcFRleHQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aGUgYnV0dG9uIGNvbnRhaW5pbmcgdGhlIHNldHRpbmdzIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MQnV0dG9uRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdVaVRvb2wnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ3NldHRpbmdzQnRuJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NJY29uKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcFRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXBUZXh0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5jbGFzc0xpc3QuYWRkKCd0b29sdGlwdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQuaW5uZXJIVE1MID0gJ1NldHRpbmdzJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcFRleHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZXR0aW5nc0ljb24oKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NJY29uKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnc3ZnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnc2V0dGluZ3NJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24uc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAndmlld0JveCcsXG4gICAgICAgICAgICAgICAgJzAgMCA0NzguNzAzIDQ3OC43MDMnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIHRoZSBpbm5lciBhbmQgb3V0IHBhdGggb2YgYSBjb2dcbiAgICAgICAgICAgIGNvbnN0IHBhdGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDEuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ000NTQuMiwxODkuMTAxbC0zMy42LTUuN2MtMy41LTExLjMtOC0yMi4yLTEzLjUtMzIuNmwxOS44LTI3LjdjOC40LTExLjgsNy4xLTI3LjktMy4yLTM4LjFsLTI5LjgtMjkuOFxcXG5cdFx0XHRjLTUuNi01LjYtMTMtOC43LTIwLjktOC43Yy02LjIsMC0xMi4xLDEuOS0xNy4xLDUuNWwtMjcuOCwxOS44Yy0xMC44LTUuNy0yMi4xLTEwLjQtMzMuOC0xMy45bC01LjYtMzMuMlxcXG5cdFx0XHRjLTIuNC0xNC4zLTE0LjctMjQuNy0yOS4yLTI0LjdoLTQyLjFjLTE0LjUsMC0yNi44LDEwLjQtMjkuMiwyNC43bC01LjgsMzRjLTExLjIsMy41LTIyLjEsOC4xLTMyLjUsMTMuN2wtMjcuNS0xOS44XFxcblx0XHRcdGMtNS0zLjYtMTEtNS41LTE3LjItNS41Yy03LjksMC0xNS40LDMuMS0yMC45LDguN2wtMjkuOSwyOS44Yy0xMC4yLDEwLjItMTEuNiwyNi4zLTMuMiwzOC4xbDIwLDI4LjFcXFxuXHRcdFx0Yy01LjUsMTAuNS05LjksMjEuNC0xMy4zLDMyLjdsLTMzLjIsNS42Yy0xNC4zLDIuNC0yNC43LDE0LjctMjQuNywyOS4ydjQyLjFjMCwxNC41LDEwLjQsMjYuOCwyNC43LDI5LjJsMzQsNS44XFxcblx0XHRcdGMzLjUsMTEuMiw4LjEsMjIuMSwxMy43LDMyLjVsLTE5LjcsMjcuNGMtOC40LDExLjgtNy4xLDI3LjksMy4yLDM4LjFsMjkuOCwyOS44YzUuNiw1LjYsMTMsOC43LDIwLjksOC43YzYuMiwwLDEyLjEtMS45LDE3LjEtNS41XFxcblx0XHRcdGwyOC4xLTIwYzEwLjEsNS4zLDIwLjcsOS42LDMxLjYsMTNsNS42LDMzLjZjMi40LDE0LjMsMTQuNywyNC43LDI5LjIsMjQuN2g0Mi4yYzE0LjUsMCwyNi44LTEwLjQsMjkuMi0yNC43bDUuNy0zMy42XFxcblx0XHRcdGMxMS4zLTMuNSwyMi4yLTgsMzIuNi0xMy41bDI3LjcsMTkuOGM1LDMuNiwxMSw1LjUsMTcuMiw1LjVsMCwwYzcuOSwwLDE1LjMtMy4xLDIwLjktOC43bDI5LjgtMjkuOGMxMC4yLTEwLjIsMTEuNi0yNi4zLDMuMi0zOC4xXFxcblx0XHRcdGwtMTkuOC0yNy44YzUuNS0xMC41LDEwLjEtMjEuNCwxMy41LTMyLjZsMzMuNi01LjZjMTQuMy0yLjQsMjQuNy0xNC43LDI0LjctMjkuMnYtNDIuMVxcXG5cdFx0XHRDNDc4LjksMjAzLjgwMSw0NjguNSwxOTEuNTAxLDQ1NC4yLDE4OS4xMDF6IE00NTEuOSwyNjAuNDAxYzAsMS4zLTAuOSwyLjQtMi4yLDIuNmwtNDIsN2MtNS4zLDAuOS05LjUsNC44LTEwLjgsOS45XFxcblx0XHRcdGMtMy44LDE0LjctOS42LDI4LjgtMTcuNCw0MS45Yy0yLjcsNC42LTIuNSwxMC4zLDAuNiwxNC43bDI0LjcsMzQuOGMwLjcsMSwwLjYsMi41LTAuMywzLjRsLTI5LjgsMjkuOGMtMC43LDAuNy0xLjQsMC44LTEuOSwwLjhcXFxuXHRcdFx0Yy0wLjYsMC0xLjEtMC4yLTEuNS0wLjVsLTM0LjctMjQuN2MtNC4zLTMuMS0xMC4xLTMuMy0xNC43LTAuNmMtMTMuMSw3LjgtMjcuMiwxMy42LTQxLjksMTcuNGMtNS4yLDEuMy05LjEsNS42LTkuOSwxMC44bC03LjEsNDJcXFxuXHRcdFx0Yy0wLjIsMS4zLTEuMywyLjItMi42LDIuMmgtNDIuMWMtMS4zLDAtMi40LTAuOS0yLjYtMi4ybC03LTQyYy0wLjktNS4zLTQuOC05LjUtOS45LTEwLjhjLTE0LjMtMy43LTI4LjEtOS40LTQxLTE2LjhcXFxuXHRcdFx0Yy0yLjEtMS4yLTQuNS0xLjgtNi44LTEuOGMtMi43LDAtNS41LDAuOC03LjgsMi41bC0zNSwyNC45Yy0wLjUsMC4zLTEsMC41LTEuNSwwLjVjLTAuNCwwLTEuMi0wLjEtMS45LTAuOGwtMjkuOC0yOS44XFxcblx0XHRcdGMtMC45LTAuOS0xLTIuMy0wLjMtMy40bDI0LjYtMzQuNWMzLjEtNC40LDMuMy0xMC4yLDAuNi0xNC44Yy03LjgtMTMtMTMuOC0yNy4xLTE3LjYtNDEuOGMtMS40LTUuMS01LjYtOS0xMC44LTkuOWwtNDIuMy03LjJcXFxuXHRcdFx0Yy0xLjMtMC4yLTIuMi0xLjMtMi4yLTIuNnYtNDIuMWMwLTEuMywwLjktMi40LDIuMi0yLjZsNDEuNy03YzUuMy0wLjksOS42LTQuOCwxMC45LTEwYzMuNy0xNC43LDkuNC0yOC45LDE3LjEtNDJcXFxuXHRcdFx0YzIuNy00LjYsMi40LTEwLjMtMC43LTE0LjZsLTI0LjktMzVjLTAuNy0xLTAuNi0yLjUsMC4zLTMuNGwyOS44LTI5LjhjMC43LTAuNywxLjQtMC44LDEuOS0wLjhjMC42LDAsMS4xLDAuMiwxLjUsMC41bDM0LjUsMjQuNlxcXG5cdFx0XHRjNC40LDMuMSwxMC4yLDMuMywxNC44LDAuNmMxMy03LjgsMjcuMS0xMy44LDQxLjgtMTcuNmM1LjEtMS40LDktNS42LDkuOS0xMC44bDcuMi00Mi4zYzAuMi0xLjMsMS4zLTIuMiwyLjYtMi4yaDQyLjFcXFxuXHRcdFx0YzEuMywwLDIuNCwwLjksMi42LDIuMmw3LDQxLjdjMC45LDUuMyw0LjgsOS42LDEwLDEwLjljMTUuMSwzLjgsMjkuNSw5LjcsNDIuOSwxNy42YzQuNiwyLjcsMTAuMywyLjUsMTQuNy0wLjZsMzQuNS0yNC44XFxcblx0XHRcdGMwLjUtMC4zLDEtMC41LDEuNS0wLjVjMC40LDAsMS4yLDAuMSwxLjksMC44bDI5LjgsMjkuOGMwLjksMC45LDEsMi4zLDAuMywzLjRsLTI0LjcsMzQuN2MtMy4xLDQuMy0zLjMsMTAuMS0wLjYsMTQuN1xcXG5cdFx0XHRjNy44LDEzLjEsMTMuNiwyNy4yLDE3LjQsNDEuOWMxLjMsNS4yLDUuNiw5LjEsMTAuOCw5LjlsNDIsNy4xYzEuMywwLjIsMi4yLDEuMywyLjIsMi42djQyLjFINDUxLjl6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTIzOS40LDEzNi4wMDFjLTU3LDAtMTAzLjMsNDYuMy0xMDMuMywxMDMuM3M0Ni4zLDEwMy4zLDEwMy4zLDEwMy4zczEwMy4zLTQ2LjMsMTAzLjMtMTAzLjNTMjk2LjQsMTM2LjAwMSwyMzkuNCwxMzYuMDAxeiBNMjM5LjQsMzE1LjYwMWMtNDIuMSwwLTc2LjMtMzQuMi03Ni4zLTc2LjNzMzQuMi03Ni4zLDc2LjMtNzYuM3M3Ni4zLDM0LjIsNzYuMyw3Ni4zUzI4MS41LDMxNS42MDEsMjM5LjQsMzE1LjYwMXonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMSk7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzSWNvbjtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIEEgVUkgY29tcG9uZW50IGNvbnRhaW5pbmcgYWxsIHRoZSBzZXR0aW5ncyBmb3IgdGhlIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NQYW5lbCB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfc2V0dGluZ3NDbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQ7XG4gICAgX3NldHRpbmdzQ29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9ICdzZXR0aW5ncy1wYW5lbCc7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwYW5lbC13cmFwJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhbmVsRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmNsYXNzTGlzdC5hZGQoJ3BhbmVsJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZChwYW5lbEVsZW0pO1xuXG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nc0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNldHRpbmdzSGVhZGluZy5pZCA9ICdzZXR0aW5nc0hlYWRpbmcnO1xuICAgICAgICAgICAgc2V0dGluZ3NIZWFkaW5nLnRleHRDb250ZW50ID0gJ1NldHRpbmdzJztcbiAgICAgICAgICAgIHBhbmVsRWxlbS5hcHBlbmRDaGlsZChzZXR0aW5nc0hlYWRpbmcpO1xuXG4gICAgICAgICAgICBwYW5lbEVsZW0uYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc0Nsb3NlQnV0dG9uKTtcbiAgICAgICAgICAgIHBhbmVsRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzQ29udGVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzQ29udGVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzQ29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzQ29udGVudEVsZW1lbnQuaWQgPSAnc2V0dGluZ3NDb250ZW50JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NDb250ZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzQ2xvc2VCdXR0b24oKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzQ2xvc2VCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzQ2xvc2VCdXR0b24uaWQgPSAnc2V0dGluZ3NDbG9zZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzQ2xvc2VCdXR0b247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyBzZXR0aW5ncyBwYW5lbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygncGFuZWwtd3JhcC12aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGFuZWwtd3JhcC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHNldHRpbmdzIHBhbmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3BhbmVsLXdyYXAtdmlzaWJsZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgc2V0dGluZ3MgcGFuZWwuXG4gICAgICovXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygncGFuZWwtd3JhcC12aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgncGFuZWwtd3JhcC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIFN0YXRzIGljb24gdGhhdCBjYW4gYmUgY2xpY2tlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXRzSWNvbiB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBfc3RhdHNJY29uOiBTVkdFbGVtZW50O1xuICAgIF90b29sdGlwVGV4dDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRoZSBidXR0b24gY29udGFpbmluZyB0aGUgc3RhdHMgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxCdXR0b25FbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1VpVG9vbCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAnc3RhdHNCdG4nO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zdGF0c0ljb24pO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50b29sdGlwVGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdG9vbHRpcFRleHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rvb2x0aXB0ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5pbm5lckhUTUwgPSAnSW5mb3JtYXRpb24nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwVGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YXRzSWNvbigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zdGF0c0ljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdzdGF0c0ljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndmlld0JveCcsICcwIDAgMzMwIDMzMCcpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIHRoZSBpbm5lciBhbmQgb3V0IHBhdGggb2YgYSBjb2dcbiAgICAgICAgICAgIGNvbnN0IHBhdGgxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDEuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xNjUsMC4wMDhDNzQuMDE5LDAuMDA4LDAsNzQuMDI0LDAsMTY0Ljk5OWMwLDkwLjk3Nyw3NC4wMTksMTY0Ljk5MiwxNjUsMTY0Ljk5MnMxNjUtNzQuMDE1LDE2NS0xNjQuOTkyQzMzMCw3NC4wMjQsMjU1Ljk4MSwwLjAwOCwxNjUsMC4wMDh6IE0xNjUsMjk5Ljk5MmMtNzQuNDM5LDAtMTM1LTYwLjU1Ny0xMzUtMTM0Ljk5MlM5MC41NjEsMzAuMDA4LDE2NSwzMC4wMDhzMTM1LDYwLjU1NywxMzUsMTM0Ljk5MUMzMDAsMjM5LjQzNiwyMzkuNDM5LDI5OS45OTIsMTY1LDI5OS45OTJ6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTE2NSwxMzAuMDA4Yy04LjI4NCwwLTE1LDYuNzE2LTE1LDE1djk5Ljk4M2MwLDguMjg0LDYuNzE2LDE1LDE1LDE1czE1LTYuNzE2LDE1LTE1di05OS45ODNDMTgwLDEzNi43MjUsMTczLjI4NCwxMzAuMDA4LDE2NSwxMzAuMDA4eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGgzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDMuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xNjUsNzAuMDExYy0zLjk1LDAtNy44MTEsMS42LTEwLjYxLDQuMzljLTIuNzksMi43OS00LjM5LDYuNjYtNC4zOSwxMC42MXMxLjYsNy44MSw0LjM5LDEwLjYxYzIuNzksMi43OSw2LjY2LDQuMzksMTAuNjEsNC4zOXM3LjgxLTEuNiwxMC42MDktNC4zOWMyLjc5LTIuOCw0LjM5MS02LjY2LDQuMzkxLTEwLjYxcy0xLjYwMS03LjgyLTQuMzkxLTEwLjYxQzE3Mi44MSw3MS42MSwxNjguOTUsNzAuMDExLDE2NSw3MC4wMTF6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDEpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDIpO1xuICAgICAgICAgICAgc3ZnR3JvdXAuYXBwZW5kQ2hpbGQocGF0aDMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0c0ljb247XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgTGF0ZW5jeVRlc3QgfSBmcm9tICcuL0xhdGVuY3lUZXN0JztcbmltcG9ydCB7IENhbmRpZGF0ZVBhaXJTdGF0cywgSW5pdGlhbFNldHRpbmdzLCBMb2dnZXIsIFBpeGVsU3RyZWFtaW5nIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuNCc7XG5pbXBvcnQgeyBBZ2dyZWdhdGVkU3RhdHMgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40JztcbmltcG9ydCB7IE1hdGhVdGlscyB9IGZyb20gJy4uL1V0aWwvTWF0aFV0aWxzJztcbmltcG9ydCB7RGF0YUNoYW5uZWxMYXRlbmN5VGVzdH0gZnJvbSBcIi4vRGF0YUNoYW5uZWxMYXRlbmN5VGVzdFwiO1xuaW1wb3J0IHtQaXhlbFN0cmVhbWluZ1NldHRpbmdzfSBmcm9tIFwiQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuNC90eXBlcy9EYXRhQ2hhbm5lbC9Jbml0aWFsU2V0dGluZ3NcIjtcblxuLyoqXG4gKiBBIHN0YXQgc3RydWN0dXJlLCBhbiBpZCwgdGhlIHN0YXQgc3RyaW5nLCBhbmQgdGhlIGVsZW1lbnQgd2hlcmUgaXQgaXMgcmVuZGVyZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgc3RhdDogc3RyaW5nO1xuICAgIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xufVxuXG4vKipcbiAqIEEgVUkgY29tcG9uZW50IGNvbnRhaW5pbmcgYWxsIHRoZSBzdGF0cyBmb3IgdGhlIGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgU3RhdHNQYW5lbCB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfc3RhdHNDbG9zZUJ1dHRvbjogSFRNTEVsZW1lbnQ7XG4gICAgX3N0YXRzQ29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIF9zdGF0aXN0aWNzQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgICBfc3RhdHNSZXN1bHQ6IEhUTUxFbGVtZW50O1xuXG4gICAgbGF0ZW5jeVRlc3Q6IExhdGVuY3lUZXN0O1xuICAgIGRhdGFDaGFubmVsTGF0ZW5jeVRlc3Q6IERhdGFDaGFubmVsTGF0ZW5jeVRlc3Q7XG5cbiAgICAvKiBBIG1hcCBzdGF0cyB3ZSBhcmUgc3RvcmluZy9yZW5kZXJpbmcgKi9cbiAgICBzdGF0c01hcCA9IG5ldyBNYXA8c3RyaW5nLCBTdGF0PigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubGF0ZW5jeVRlc3QgPSBuZXcgTGF0ZW5jeVRlc3QoKTtcbiAgICAgICAgdGhpcy5kYXRhQ2hhbm5lbExhdGVuY3lUZXN0ID0gbmV3IERhdGFDaGFubmVsTGF0ZW5jeVRlc3QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9ICdzdGF0cy1wYW5lbCc7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwYW5lbC13cmFwJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhbmVsRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmNsYXNzTGlzdC5hZGQoJ3BhbmVsJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZChwYW5lbEVsZW0pO1xuXG4gICAgICAgICAgICBjb25zdCBzdGF0c0hlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHN0YXRzSGVhZGluZy5pZCA9ICdzdGF0c0hlYWRpbmcnO1xuICAgICAgICAgICAgc3RhdHNIZWFkaW5nLnRleHRDb250ZW50ID0gJ0luZm9ybWF0aW9uJztcbiAgICAgICAgICAgIHBhbmVsRWxlbS5hcHBlbmRDaGlsZChzdGF0c0hlYWRpbmcpO1xuXG4gICAgICAgICAgICBwYW5lbEVsZW0uYXBwZW5kQ2hpbGQodGhpcy5zdGF0c0Nsb3NlQnV0dG9uKTtcbiAgICAgICAgICAgIHBhbmVsRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzQ29udGVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YXRzQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3N0YXRzQ29udGVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzQ29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzQ29udGVudEVsZW1lbnQuaWQgPSAnc3RhdHNDb250ZW50JztcblxuICAgICAgICAgICAgY29uc3Qgc3RyZWFtVG9vbFN0YXRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzdHJlYW1Ub29sU3RhdHMuaWQgPSAnc3RyZWFtVG9vbHNTdGF0cyc7XG4gICAgICAgICAgICBzdHJlYW1Ub29sU3RhdHMuY2xhc3NMaXN0LmFkZCgnY29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbnRyb2xTdGF0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgY29udHJvbFN0YXRzLmlkID0gJ0NvbnRyb2xTdGF0cyc7XG4gICAgICAgICAgICBjb250cm9sU3RhdHMuY2xhc3NMaXN0LmFkZCgncm93Jyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXRpc3RpY3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICBzdGF0aXN0aWNzLmlkID0gJ3N0YXRpc3RpY3MnO1xuICAgICAgICAgICAgc3RhdGlzdGljcy5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc0NvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICBjb25zdCBzdGF0aXN0aWNzSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzdGF0aXN0aWNzSGVhZGVyLmlkID0gJ3N0YXRpc3RpY3NIZWFkZXInO1xuICAgICAgICAgICAgc3RhdGlzdGljc0hlYWRlci5jbGFzc0xpc3QuYWRkKCdzZXR0aW5ncy10ZXh0Jyk7XG4gICAgICAgICAgICBzdGF0aXN0aWNzSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzSGVhZGVyJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNlc3Npb25TdGF0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc2Vzc2lvblN0YXRzLmlubmVySFRNTCA9ICdTZXNzaW9uIFN0YXRzJztcblxuICAgICAgICAgICAgdGhpcy5fc3RhdHNDb250ZW50RWxlbWVudC5hcHBlbmRDaGlsZChzdHJlYW1Ub29sU3RhdHMpO1xuICAgICAgICAgICAgc3RyZWFtVG9vbFN0YXRzLmFwcGVuZENoaWxkKGNvbnRyb2xTdGF0cyk7XG4gICAgICAgICAgICBjb250cm9sU3RhdHMuYXBwZW5kQ2hpbGQoc3RhdGlzdGljcyk7XG4gICAgICAgICAgICBzdGF0aXN0aWNzLmFwcGVuZENoaWxkKHN0YXRpc3RpY3NIZWFkZXIpO1xuICAgICAgICAgICAgc3RhdGlzdGljc0hlYWRlci5hcHBlbmRDaGlsZChzZXNzaW9uU3RhdHMpO1xuICAgICAgICAgICAgc3RhdGlzdGljcy5hcHBlbmRDaGlsZCh0aGlzLnN0YXRpc3RpY3NDb250YWluZXIpO1xuXG4gICAgICAgICAgICBjb250cm9sU3RhdHMuYXBwZW5kQ2hpbGQodGhpcy5sYXRlbmN5VGVzdC5yb290RWxlbWVudCk7XG4gICAgICAgICAgICBjb250cm9sU3RhdHMuYXBwZW5kQ2hpbGQodGhpcy5kYXRhQ2hhbm5lbExhdGVuY3lUZXN0LnJvb3RFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHNDb250ZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YXRpc3RpY3NDb250YWluZXIoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3N0YXRpc3RpY3NDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpc3RpY3NDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpc3RpY3NDb250YWluZXIuaWQgPSAnc3RhdGlzdGljc0NvbnRhaW5lcic7XG4gICAgICAgICAgICB0aGlzLl9zdGF0aXN0aWNzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGlzdGljc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzUmVzdWx0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGlzdGljc0NvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YXRzUmVzdWx0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zdGF0c1Jlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNSZXN1bHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzUmVzdWx0LmlkID0gJ3N0YXRpc3RpY3NSZXN1bHQnO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNSZXN1bHQuY2xhc3NMaXN0LmFkZCgnU3RhdHNSZXN1bHQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHNSZXN1bHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzdGF0c0Nsb3NlQnV0dG9uKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zdGF0c0Nsb3NlQnV0dG9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c0Nsb3NlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c0Nsb3NlQnV0dG9uLmlkID0gJ3N0YXRzQ2xvc2UnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0c0Nsb3NlQnV0dG9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkRpc2Nvbm5lY3QoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGF0ZW5jeVRlc3QubGF0ZW5jeVRlc3RCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGFDaGFubmVsTGF0ZW5jeVRlc3QubGF0ZW5jeVRlc3RCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vZG8gbm90aGluZ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIG9uVmlkZW9Jbml0aWFsaXplZChzdHJlYW06IFBpeGVsU3RyZWFtaW5nKTogdm9pZCB7XG4gICAgICAgIC8vIHN0YXJ0aW5nIGEgbGF0ZW5jeSBjaGVja1xuICAgICAgICB0aGlzLmxhdGVuY3lUZXN0LmxhdGVuY3lUZXN0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBzdHJlYW0ucmVxdWVzdExhdGVuY3lUZXN0KCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGF0YUNoYW5uZWxMYXRlbmN5VGVzdC5sYXRlbmN5VGVzdEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHN0YXJ0ZWQgPSBzdHJlYW0ucmVxdWVzdERhdGFDaGFubmVsTGF0ZW5jeVRlc3Qoe1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgICAgICAgICAgICAgIHJwczogMTAsXG4gICAgICAgICAgICAgICAgcmVxdWVzdFNpemU6IDIwMCxcbiAgICAgICAgICAgICAgICByZXNwb25zZVNpemU6IDIwMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoc3RhcnRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YUNoYW5uZWxMYXRlbmN5VGVzdC5oYW5kbGVUZXN0U3RhcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY29uZmlndXJlKHNldHRpbmdzOiBQaXhlbFN0cmVhbWluZ1NldHRpbmdzKTogdm9pZCB7XG4gICAgICAgIGlmIChzZXR0aW5ncy5EaXNhYmxlTGF0ZW5jeVRlc3QpIHtcbiAgICAgICAgICAgIHRoaXMubGF0ZW5jeVRlc3QubGF0ZW5jeVRlc3RCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sYXRlbmN5VGVzdC5sYXRlbmN5VGVzdEJ1dHRvbi50aXRsZSA9XG4gICAgICAgICAgICAgICAgJ0Rpc2FibGVkIGJ5IC1QaXhlbFN0cmVhbWluZ0Rpc2FibGVMYXRlbmN5VGVzdGVyPXRydWUnO1xuICAgICAgICAgICAgdGhpcy5kYXRhQ2hhbm5lbExhdGVuY3lUZXN0LmxhdGVuY3lUZXN0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YUNoYW5uZWxMYXRlbmN5VGVzdC5sYXRlbmN5VGVzdEJ1dHRvbi50aXRsZSA9XG4gICAgICAgICAgICAgICAgJ0Rpc2FibGVkIGJ5IC1QaXhlbFN0cmVhbWluZ0Rpc2FibGVMYXRlbmN5VGVzdGVyPXRydWUnO1xuICAgICAgICAgICAgTG9nZ2VyLkluZm8oXG4gICAgICAgICAgICAgICAgTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSxcbiAgICAgICAgICAgICAgICAnLVBpeGVsU3RyZWFtaW5nRGlzYWJsZUxhdGVuY3lUZXN0ZXI9dHJ1ZSwgcmVxdWVzdGluZyBsYXRlbmN5IHJlcG9ydCBmcm9tIHRoZSB0aGUgYnJvd3NlciB0byBVRSBpcyBkaXNhYmxlZC4nXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyBzdGF0cyBwYW5lbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygncGFuZWwtd3JhcC12aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGFuZWwtd3JhcC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHN0YXRzIHBhbmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyB0b2dnbGVWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ3BhbmVsLXdyYXAtdmlzaWJsZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgdGhlIHN0YXRzIHBhbmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3BhbmVsLXdyYXAtdmlzaWJsZScpKSB7XG4gICAgICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3BhbmVsLXdyYXAtdmlzaWJsZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGhhbmRsZVBsYXllckNvdW50KHBsYXllckNvdW50OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAnUGxheWVyQ291bnRTdGF0JyxcbiAgICAgICAgICAgICdQbGF5ZXJzJyxcbiAgICAgICAgICAgIHBsYXllckNvdW50LnRvU3RyaW5nKClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgc3RhdHMgY29taW5nIGluIGZyb20gYnJvd3Nlci9VRVxuICAgICAqIEBwYXJhbSBzdGF0cyB0aGUgc3RhdHMgc3RydWN0dXJlXG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZVN0YXRzKHN0YXRzOiBBZ2dyZWdhdGVkU3RhdHMpIHtcbiAgICAgICAgLy8gZm9ybWF0IG51bWJlcmluZyBiYXNlZCBvbiB0aGUgYnJvd3NlciBsYW5ndWFnZVxuICAgICAgICBjb25zdCBudW1iZXJGb3JtYXQgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQod2luZG93Lm5hdmlnYXRvci5sYW5ndWFnZSwge1xuICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAwXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEluYm91bmQgZGF0YVxuICAgICAgICBjb25zdCBpbmJvdW5kRGF0YSA9IE1hdGhVdGlscy5mb3JtYXRCeXRlcyhcbiAgICAgICAgICAgIHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmJ5dGVzUmVjZWl2ZWQsXG4gICAgICAgICAgICAyXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KCdJbmJvdW5kRGF0YVN0YXQnLCAnUmVjZWl2ZWQnLCBpbmJvdW5kRGF0YSk7XG5cbiAgICAgICAgLy8gUGFja2V0cyBsb3N0XG4gICAgICAgIGNvbnN0IHBhY2tldHNMb3N0U3RhdCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiAgICAgICAgICAgIHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLFxuICAgICAgICAgICAgJ3BhY2tldHNMb3N0J1xuICAgICAgICApXG4gICAgICAgICAgICA/IG51bWJlckZvcm1hdC5mb3JtYXQoc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMucGFja2V0c0xvc3QpXG4gICAgICAgICAgICA6ICdDaHJvbWUgb25seSc7XG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgJ1BhY2tldHNMb3N0U3RhdCcsXG4gICAgICAgICAgICAnUGFja2V0cyBMb3N0JyxcbiAgICAgICAgICAgIHBhY2tldHNMb3N0U3RhdFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEJpdHJhdGVcbiAgICAgICAgaWYgKHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmJpdHJhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgICAgICdWaWRlb0JpdHJhdGVTdGF0JyxcbiAgICAgICAgICAgICAgICAnVmlkZW8gQml0cmF0ZSAoa2JwcyknLFxuICAgICAgICAgICAgICAgIHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmJpdHJhdGUudG9TdHJpbmcoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0cy5pbmJvdW5kQXVkaW9TdGF0cy5iaXRyYXRlKSB7XG4gICAgICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICAgICAnQXVkaW9CaXRyYXRlU3RhdCcsXG4gICAgICAgICAgICAgICAgJ0F1ZGlvIEJpdHJhdGUgKGticHMpJyxcbiAgICAgICAgICAgICAgICBzdGF0cy5pbmJvdW5kQXVkaW9TdGF0cy5iaXRyYXRlLnRvU3RyaW5nKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBWaWRlbyByZXNvbHV0aW9uXG4gICAgICAgIGNvbnN0IHJlc1N0YXQgPVxuICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgICAgICAgICAgICAgIHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLFxuICAgICAgICAgICAgICAgICdmcmFtZVdpZHRoJ1xuICAgICAgICAgICAgKSAmJlxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuZnJhbWVXaWR0aCAmJlxuICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgICAgICAgICAgICAgIHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLFxuICAgICAgICAgICAgICAgICdmcmFtZUhlaWdodCdcbiAgICAgICAgICAgICkgJiZcbiAgICAgICAgICAgIHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lSGVpZ2h0XG4gICAgICAgICAgICAgICAgPyBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZVdpZHRoICtcbiAgICAgICAgICAgICAgICAgICd4JyArXG4gICAgICAgICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZUhlaWdodFxuICAgICAgICAgICAgICAgIDogJ0Nocm9tZSBvbmx5JztcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoJ1ZpZGVvUmVzU3RhdCcsICdWaWRlbyByZXNvbHV0aW9uJywgcmVzU3RhdCk7XG5cbiAgICAgICAgLy8gRnJhbWVzIGRlY29kZWRcbiAgICAgICAgY29uc3QgZnJhbWVzRGVjb2RlZCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiAgICAgICAgICAgIHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLFxuICAgICAgICAgICAgJ2ZyYW1lc0RlY29kZWQnXG4gICAgICAgIClcbiAgICAgICAgICAgID8gbnVtYmVyRm9ybWF0LmZvcm1hdChzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZXNEZWNvZGVkKVxuICAgICAgICAgICAgOiAnQ2hyb21lIG9ubHknO1xuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICdGcmFtZXNEZWNvZGVkU3RhdCcsXG4gICAgICAgICAgICAnRnJhbWVzIERlY29kZWQnLFxuICAgICAgICAgICAgZnJhbWVzRGVjb2RlZFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEZyYW1lcmF0ZVxuICAgICAgICBpZiAoc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuZnJhbWVzUGVyU2Vjb25kKSB7XG4gICAgICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICAgICAnRnJhbWVyYXRlU3RhdCcsXG4gICAgICAgICAgICAgICAgJ0ZyYW1lcmF0ZScsXG4gICAgICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuZnJhbWVzUGVyU2Vjb25kLnRvU3RyaW5nKClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGcmFtZXMgZHJvcHBlZFxuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICdGcmFtZXNEcm9wcGVkU3RhdCcsXG4gICAgICAgICAgICAnRnJhbWVzIGRyb3BwZWQnLFxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuZnJhbWVzRHJvcHBlZD8udG9TdHJpbmcoKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5jb2RlY0lkKSB7XG4gICAgICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICAgICAnVmlkZW9Db2RlY1N0YXQnLFxuICAgICAgICAgICAgICAgICdWaWRlbyBjb2RlYycsXG4gICAgICAgICAgICAgICAgLy8gU3BsaXQgdGhlIGNvZGVjIHRvIHJlbW92ZSB0aGUgRm10cCBsaW5lXG4gICAgICAgICAgICAgICAgc3RhdHMuY29kZWNzXG4gICAgICAgICAgICAgICAgICAgIC5nZXQoc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuY29kZWNJZClcbiAgICAgICAgICAgICAgICAgICAgPy5zcGxpdCgnICcpWzBdID8/ICcnXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRzLmluYm91bmRBdWRpb1N0YXRzLmNvZGVjSWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgICAgICdBdWRpb0NvZGVjU3RhdCcsXG4gICAgICAgICAgICAgICAgJ0F1ZGlvIGNvZGVjJyxcbiAgICAgICAgICAgICAgICAvLyBTcGxpdCB0aGUgY29kZWMgdG8gcmVtb3ZlIHRoZSBGbXRwIGxpbmVcbiAgICAgICAgICAgICAgICBzdGF0cy5jb2RlY3NcbiAgICAgICAgICAgICAgICAgICAgLmdldChzdGF0cy5pbmJvdW5kQXVkaW9TdGF0cy5jb2RlY0lkKVxuICAgICAgICAgICAgICAgICAgICA/LnNwbGl0KCcgJylbMF0gPz8gJydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdG9yZSB0aGUgYWN0aXZlIGNhbmRpZGF0ZSBwYWlyIHJldHVybiBhIG5ldyBDYW5kaWRhdGUgcGFpciBzdGF0IGlmIGdldEFjdGl2ZUNhbmRpZGF0ZSBpcyBudWxsXG4gICAgICAgIGxldCBhY3RpdmVDYW5kaWRhdGVQYWlyID0gc3RhdHMuZ2V0QWN0aXZlQ2FuZGlkYXRlUGFpcigpICE9IG51bGwgPyBzdGF0cy5nZXRBY3RpdmVDYW5kaWRhdGVQYWlyKCkgOiBuZXcgQ2FuZGlkYXRlUGFpclN0YXRzKCk7XG5cbiAgICAgICAgLy8gUlRUXG4gICAgICAgIGNvbnN0IG5ldFJUVCA9XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gICAgICAgICAgICAgICAgYWN0aXZlQ2FuZGlkYXRlUGFpcixcbiAgICAgICAgICAgICAgICAnY3VycmVudFJvdW5kVHJpcFRpbWUnXG4gICAgICAgICAgICApICYmIHN0YXRzLmlzTnVtYmVyKGFjdGl2ZUNhbmRpZGF0ZVBhaXIuY3VycmVudFJvdW5kVHJpcFRpbWUpXG4gICAgICAgICAgICAgICAgPyBudW1iZXJGb3JtYXQuZm9ybWF0KFxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVDYW5kaWRhdGVQYWlyLmN1cnJlbnRSb3VuZFRyaXBUaW1lICogMTAwMFxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogXCJDYW4ndCBjYWxjdWxhdGVcIjtcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoJ1JUVFN0YXQnLCAnTmV0IFJUVCAobXMpJywgbmV0UlRUKTtcblxuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICdEdXJhdGlvblN0YXQnLFxuICAgICAgICAgICAgJ0R1cmF0aW9uJyxcbiAgICAgICAgICAgIHN0YXRzLnNlc3Npb25TdGF0cy5ydW5UaW1lXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAnQ29udHJvbHNJbnB1dFN0YXQnLFxuICAgICAgICAgICAgJ0NvbnRyb2xzIHN0cmVhbSBpbnB1dCcsXG4gICAgICAgICAgICBzdGF0cy5zZXNzaW9uU3RhdHMuY29udHJvbHNTdHJlYW1JbnB1dFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIFFQXG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgJ1FQU3RhdCcsXG4gICAgICAgICAgICAnVmlkZW8gcXVhbnRpemF0aW9uIHBhcmFtZXRlcicsXG4gICAgICAgICAgICBzdGF0cy5zZXNzaW9uU3RhdHMudmlkZW9FbmNvZGVyQXZnUVAudG9TdHJpbmcoKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIHRvZG86XG4gICAgICAgIC8vc3RhdHNUZXh0ICs9IGA8ZGl2PkJyb3dzZXIgcmVjZWl2ZSB0byBjb21wb3NpdGUgKG1zKTogJHtzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5yZWNlaXZlVG9Db21wb3NpdGVNc308L2Rpdj5gO1xuXG4gICAgICAgIExvZ2dlci5Mb2coXG4gICAgICAgICAgICBMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLFxuICAgICAgICAgICAgYC0tLS0tLS0tLSBTdGF0cyAtLS0tLS0tLS1cXG4gJHtzdGF0c31cXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1gLFxuICAgICAgICAgICAgNlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBuZXcgc3RhdCB0byB0aGUgc3RhdHMgcmVzdWx0cyBpbiB0aGUgRE9NIG9yIHVwZGF0ZXMgYW4gZXhpdGluZyBzdGF0LlxuICAgICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIHN0YXQgdG8gYWRkL3VwZGF0ZS5cbiAgICAgKiBAcGFyYW0gc3RhdCBUaGUgY29udGVudHMgb2YgdGhlIHN0YXQuXG4gICAgICovXG4gICAgcHVibGljIGFkZE9yVXBkYXRlU3RhdChpZDogc3RyaW5nLCBzdGF0TGFiZWw6IHN0cmluZywgc3RhdDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHN0YXRIVE1MID0gYCR7c3RhdExhYmVsfTogJHtzdGF0fWA7XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXRzTWFwLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgc3RhdFxuICAgICAgICAgICAgY29uc3QgbmV3U3RhdCA9IG5ldyBTdGF0KCk7XG4gICAgICAgICAgICBuZXdTdGF0LmlkID0gaWQ7XG4gICAgICAgICAgICBuZXdTdGF0LnN0YXQgPSBzdGF0O1xuICAgICAgICAgICAgbmV3U3RhdC50aXRsZSA9IHN0YXRMYWJlbDtcbiAgICAgICAgICAgIG5ld1N0YXQuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbmV3U3RhdC5lbGVtZW50LmlubmVySFRNTCA9IHN0YXRIVE1MO1xuICAgICAgICAgICAgLy8gYWRkIHRoZSBzdGF0IHRvIHRoZSBkb21cbiAgICAgICAgICAgIHRoaXMuc3RhdHNSZXN1bHQuYXBwZW5kQ2hpbGQobmV3U3RhdC5lbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdHNNYXAuc2V0KGlkLCBuZXdTdGF0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgdGhlIGV4aXN0aW5nIHN0YXRcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc3RhdHNNYXAuZ2V0KGlkKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuZWxlbWVudC5pbm5lckhUTUwgPSBzdGF0SFRNTDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qKiBXaGV0aGVyIGEgc3RyZWFtIFVJIGVsZW1lbnQgaXMgaW50ZXJuYWxseSBtYWRlLCBleHRlcm5hbGx5IHByb3ZpZGVkLCBvciBkaXNhYmxlZC4gKi9cbmV4cG9ydCBlbnVtIFVJRWxlbWVudENyZWF0aW9uTW9kZSB7XG4gICAgQ3JlYXRlRGVmYXVsdEVsZW1lbnQsXG4gICAgVXNlQ3VzdG9tRWxlbWVudCxcbiAgICBEaXNhYmxlXG59XG5cbi8qKiBBIGNvbmZpZ3VyYXRpb24gZm9yIGRpZmZlcmVudCBVSSBlbGVtZW50cyB3aGljaCBjb250cm9sL2Rpc3BsYXkgaW5mbyByZWxhdGVkIHRvIHRoZSBzdHJlYW0uICovXG5leHBvcnQgdHlwZSBVSUVsZW1lbnRDb25maWcgPSB7XG4gICAgLy8gSW4gd2hpY2ggd2F5IGlzIHRoaXMgZWxlbWVudCBjcmVhdGVkP1xuICAgIGNyZWF0aW9uTW9kZSA6IFVJRWxlbWVudENyZWF0aW9uTW9kZSxcbiAgICAvLyAoT25seSByZWxldmFudCBpZiB3aGVuIG1vZGUgaXMgQ3JlYXRlQ3VzdG9tRWxlbWVudCkgVmlzdWFsaXppbmcgZWxlbWVudFxuICAgIGN1c3RvbUVsZW1lbnQ/IDogSFRNTEVsZW1lbnRcbn1cblxuLyoqXG4gKiBDb25maWd1cmVzIGEgZ2VuZXJhbCBzdHJlYW0tcmVsYXRlZCBVSSBwYW5lbC4gXG4gKiBGb3IgZXhhbXBsZTogaXMgaXQgY3JlYXRlZCwgYW5kIGlmIGl0IGlzLCB3aGF0IGtpbmQgb2YgYnV0dG9uIGlzIHVzZWQgdG8gc2hvdy9oaWRlIGl0LlxuICogVGhpcyBjb25maWd1cmF0aW9uIGlzIHVzZWQgZm9yIHRoZSBzZXR0aW5ncyBwYW5lbCBhbmQgc3RhdHMgcGFuZWwgYnkgZGVmYXVsdC5cbiAqIFxuICogTm90ZTogRm9yIGNhc2VzIHdoZXJlIHRoZSBwYW5lbCBuZWVkcyB0byBiZSBjcmVhdGVkLCBidXQgYSBidXR0b24gaXNuJ3QgbmVlZGVkLCBcbiAqIHRoZSBwYW5lbCBlbGVtZW50IGNhbiBiZSBwbGFjZWQgYW55d2hlcmUgaW4gdGhlIERPTSBhcyBuZWVkZWQgKHNlZSBBcHBsaWNhdGlvbiBjbGFzcykuIFxuICovXG5leHBvcnQgdHlwZSBQYW5lbENvbmZpZ3VyYXRpb24gPSB7XG4gICAgLy8gSWYgcGFuZWwgaXMgZW5hYmxlZCwgSFRNTCBlbGVtZW50cyBmb3IgaXQgd2lsbCBiZSBjcmVhdGVkLCBhbmQgZnVudGlvbmFsaXR5IGJvdW5kXG4gICAgaXNFbmFibGVkIDogYm9vbGVhbixcbiAgICAvLyAoT25seSByZWxldmFudCBpZiBpc0VuYWJsZWQpIFRoZSB0eXBlIG9mIHRoZSBidXR0b24gdG8gc2hvdy9oaWRlIHRoaXMgcGFuZWxcbiAgICB2aXNpYmlsaXR5QnV0dG9uQ29uZmlnPyA6IFVJRWxlbWVudENvbmZpZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQYW5lbEVuYWJsZWQoY29uZmlnIDogUGFuZWxDb25maWd1cmF0aW9uIHwgdW5kZWZpbmVkKSA6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhY29uZmlnIHx8ICghIWNvbmZpZyAmJiBjb25maWcuaXNFbmFibGVkKTtcbn0iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIEEgVUkgZWxlbWVudCBzaG93aW5nIHRoZSBRUCAocXVhbnRpemF0aW9uIHBhcmFtZXRlcikgb2YgdGhlIHZpZGVvIHN0cmVhbSBhdCB0aGUgbGFzdCBlbmNvZGVkIGZyYW1lICh3ZWxsLCBsYXN0IHRyYW5zbWl0dGVkIFFQIHJlYWxseSkuXG4gKiBBIGJsb2NraWVyIGVuY29kaW5nIHdpbGwgaGF2ZSBhIGhpZ2hlciBRUCBhbmQgdGhpcyB3aWxsIG1ha2UgdGhlIGluZGljYXRvciB0dXJuIG1vcmUgcmVkLlxuICogQSBub24tYmxvY2t5IHN0cmVhbSB3aWxsIGhhdmUgYSBsb3dlciBRUCBhbmQgdGhpcyB3aWxsIG1ha2UgdGhlIGluZGljYXRvciB0dXJuIG1vcmUgZ3JlZW4uXG4gKiBUaGUgUVAgaW5kaWNhdG9yIGlzIHJlcHJlc2VudGVkIHZpc3VhbGx5IHVzaW5nIGEgV2lGaSBpY29uLlxuICovXG5leHBvcnQgY2xhc3MgVmlkZW9RcEluZGljYXRvciB7XG4gICAgdmlkZW9FbmNvZGVyQXZnUVAgPSAtMTtcblxuICAgIC8vIG5vbiBodG1sIGVsZW1lbnRzXG4gICAgc3RhdHNUZXh0ID0gJyc7XG4gICAgY29sb3IgPSAnJztcblxuICAgIC8vIHFwIGNvbG9yc1xuICAgIHJlYWRvbmx5IG9yYW5nZVFQID0gMjY7XG4gICAgcmVhZG9ubHkgcmVkUVAgPSAzNTtcblxuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgX3F1YWxpdHlUZXh0OiBIVE1MRWxlbWVudDtcbiAgICBfcXVhbGl0eVN0YXR1czogU1ZHRWxlbWVudDtcbiAgICBfZG90OiBTVkdFbGVtZW50O1xuICAgIF9vdXRlcjogU1ZHRWxlbWVudDtcbiAgICBfbWlkZGxlOiBTVkdFbGVtZW50O1xuICAgIF9pbm5lcjogU1ZHRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgcm9vdCBlbGVtZW50IG9mIHRoZSBRUCBpbmRpY2F0b3IuXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJvb3QgZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRoZSBzdmcgZm9yIHRoZSBjb25uZWN0aW9uXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAnY29ubmVjdGlvbic7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdVaVRvb2wnKTtcblxuICAgICAgICAgICAgLy8gYWRkIHN2ZyBpY29uIGZvciB0aGUgY29ubmVjdGlvbiBzdHJlbmd0aFxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5xdWFsaXR5U3RhdHVzKTtcblxuICAgICAgICAgICAgLy8gYWRkIHRoZSB0ZXh0IHVuZGVybmVhdGggdGhlIGNvbm5lY3Rpb25cbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMucXVhbGl0eVRleHQpO1xuXG4gICAgICAgICAgICAvLyBzZXQgY29sb3JzIHRvIG5vdCBjb25uZWN0ZWQgaW5pdGlhbGx5XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVFwVG9vbHRpcCgtMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGV4dCB0aGF0IGRpc3BsYXlzIHVuZGVyIHRoZSBpY29uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcXVhbGl0eVRleHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3F1YWxpdHlUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl9xdWFsaXR5VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3F1YWxpdHlUZXh0LmlkID0gJ3F1YWxpdHlUZXh0JztcbiAgICAgICAgICAgIHRoaXMuX3F1YWxpdHlUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rvb2x0aXB0ZXh0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1YWxpdHlUZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHF1YWxpdHlTdGF0dXMoKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcXVhbGl0eVN0YXR1cykge1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVN0YXR1cy5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdpZCcsXG4gICAgICAgICAgICAgICAgJ2Nvbm5lY3Rpb25TdHJlbmd0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9xdWFsaXR5U3RhdHVzLnNldEF0dHJpYnV0ZU5TKG51bGwsICd4JywgJzBweCcpO1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVN0YXR1cy5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3F1YWxpdHlTdGF0dXMuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAndmlld0JveCcsXG4gICAgICAgICAgICAgICAgJzAgMCA0OTQuNDUgNDk0LjQ1J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gYnVpbGQgd2lmaSBpY29uXG4gICAgICAgICAgICB0aGlzLnF1YWxpdHlTdGF0dXMuYXBwZW5kQ2hpbGQodGhpcy5kb3QpO1xuICAgICAgICAgICAgdGhpcy5xdWFsaXR5U3RhdHVzLmFwcGVuZENoaWxkKHRoaXMubWlkZGxlKTtcbiAgICAgICAgICAgIHRoaXMucXVhbGl0eVN0YXR1cy5hcHBlbmRDaGlsZCh0aGlzLm91dGVyKTtcbiAgICAgICAgICAgIHRoaXMucXVhbGl0eVN0YXR1cy5hcHBlbmRDaGlsZCh0aGlzLmlubmVyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcXVhbGl0eVN0YXR1cztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGRvdCBhdCB0aGUgYm90dG9tIG9mIHRoZSB3aWZpIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCBkb3QoKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fZG90KSB7XG4gICAgICAgICAgICB0aGlzLl9kb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnY2lyY2xlJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX2RvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnZG90Jyk7XG4gICAgICAgICAgICB0aGlzLl9kb3Quc2V0QXR0cmlidXRlTlMobnVsbCwgJ2N4JywgJzI0Ny4xMjUnKTtcbiAgICAgICAgICAgIHRoaXMuX2RvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY3knLCAnMzk4LjkyNScpO1xuICAgICAgICAgICAgdGhpcy5fZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdyJywgJzM1LjMnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZG90O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgb3V0ZXIgYXJjIG9mIHRoZSB3aWZpIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCBvdXRlcigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9vdXRlcikge1xuICAgICAgICAgICAgdGhpcy5fb3V0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9vdXRlci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnb3V0ZXInKTtcbiAgICAgICAgICAgIHRoaXMuX291dGVyLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNNDY3LjkyNSwyMDQuNjI1Yy02LjgsMC0xMy41LTIuNi0xOC43LTcuOGMtMTExLjUtMTExLjQtMjkyLjctMTExLjQtNDA0LjEsMGMtMTAuMywxMC4zLTI3LjEsMTAuMy0zNy40LDBzLTEwLjMtMjcuMSwwLTM3LjRjNjQtNjQsMTQ5LTk5LjIsMjM5LjUtOTkuMnMxNzUuNSwzNS4yLDIzOS41LDk5LjJjMTAuMywxMC4zLDEwLjMsMjcuMSwwLDM3LjRDNDgxLjQyNSwyMDIuMDI1LDQ3NC42MjUsMjA0LjYyNSw0NjcuOTI1LDIwNC42MjV6J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fb3V0ZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBtaWRkbGUgYXJjIG9mIHRoZSB3aWZpIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCBtaWRkbGUoKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fbWlkZGxlKSB7XG4gICAgICAgICAgICB0aGlzLl9taWRkbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9taWRkbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2lkJywgJ21pZGRsZScpO1xuICAgICAgICAgICAgdGhpcy5fbWlkZGxlLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMzk1LjIyNSwyNzcuMzI1Yy02LjgsMC0xMy41LTIuNi0xOC43LTcuOGMtNzEuNC03MS4zLTE4Ny40LTcxLjMtMjU4LjgsMGMtMTAuMywxMC4zLTI3LjEsMTAuMy0zNy40LDBzLTEwLjMtMjcuMSwwLTM3LjRjOTItOTIsMjQxLjYtOTIsMzMzLjYsMGMxMC4zLDEwLjMsMTAuMywyNy4xLDAsMzcuNEM0MDguNzI1LDI3NC43MjUsNDAxLjkyNSwyNzcuMzI1LDM5NS4yMjUsMjc3LjMyNXonXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9taWRkbGU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpbm5lciBhcmMgb2YgdGhlIHdpZmkgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGlubmVyKCk6IFNWR0VsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX2lubmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9pbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX2lubmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdpbm5lcicpO1xuICAgICAgICAgICAgdGhpcy5faW5uZXIuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00zMjMuNjI1LDM0OC44MjVjLTYuOCwwLTEzLjUtMi42LTE4LjctNy44Yy0xNS40LTE1LjQtMzYtMjMuOS01Ny44LTIzLjlzLTQyLjQsOC41LTU3LjgsMjMuOWMtMTAuMywxMC4zLTI3LjEsMTAuMy0zNy40LDBjLTEwLjMtMTAuMy0xMC4zLTI3LjEsMC0zNy40YzI1LjQtMjUuNCw1OS4yLTM5LjQsOTUuMi0zOS40czY5LjgsMTQsOTUuMiwzOS41YzEwLjMsMTAuMywxMC4zLDI3LjEsMCwzNy40QzMzNy4yMjUsMzQ2LjIyNSwzMzAuNDI1LDM0OC44MjUsMzIzLjYyNSwzNDguODI1eidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2lubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVzZWQgdG8gc2V0IHRoZSBzcGVlZCBvZiB0aGUgc3RhdHVzIGxpZ2h0LlxuICAgICAqIEBwYXJhbSBzcGVlZCAtIFNldCB0aGUgc3BlZWQgb2YgdGhlIGJsaW5rLCBoaWdoZXIgbnVtYmVycyBtYWtlIHRoZSBzdGF0dXMgbGlnaHQgYmxpbmsgZmFzdGVyLlxuICAgICAqL1xuICAgIGJsaW5rVmlkZW9RdWFsaXR5U3RhdHVzKHNwZWVkOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGl0ZXJhdGlvbiA9IHNwZWVkO1xuICAgICAgICBsZXQgb3BhY2l0eSA9IDE7XG4gICAgICAgIGNvbnN0IHRpY2tJRCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIG9wYWNpdHkgLT0gMC4xO1xuICAgICAgICAgICAgdGhpcy5xdWFsaXR5VGV4dC5zdHlsZS5vcGFjaXR5ID0gU3RyaW5nKFxuICAgICAgICAgICAgICAgIE1hdGguYWJzKChvcGFjaXR5IC0gMC41KSAqIDIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKG9wYWNpdHkgPD0gMC4xKSB7XG4gICAgICAgICAgICAgICAgaWYgKC0taXRlcmF0aW9uID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aWNrSUQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwIC8gc3BlZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVwZGF0ZXMgdGhlIFFQIHRvb2x0aXAgYnkgY29udmVydGluZyB0aGUgVmlkZW8gRW5jb2RlciBRUCB0byBhIGNvbG9yIGxpZ2h0XG4gICAgICogQHBhcmFtIFFQIC0gVGhlIHZpZGVvIGVuY29kZXIgUVAgbnVtYmVyIG5lZWRlZCB0byBmaW5kIHRoZSBhdmVyYWdlXG4gICAgICovXG4gICAgdXBkYXRlUXBUb29sdGlwKFFQOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy52aWRlb0VuY29kZXJBdmdRUCA9IFFQO1xuICAgICAgICBpZiAoUVAgPiB0aGlzLnJlZFFQKSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gJ3JlZCc7XG4gICAgICAgICAgICB0aGlzLmJsaW5rVmlkZW9RdWFsaXR5U3RhdHVzKDIpO1xuICAgICAgICAgICAgdGhpcy5zdGF0c1RleHQgPSBgPGRpdiBzdHlsZT1cImNvbG9yOiAke3RoaXMuY29sb3J9XCI+UG9vciBlbmNvZGluZyBxdWFsaXR5PC9kaXY+YDtcbiAgICAgICAgICAgIHRoaXMub3V0ZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5taWRkbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5pbm5lci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIHRoaXMuY29sb3IpO1xuICAgICAgICAgICAgdGhpcy5kb3Quc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChRUCA+IHRoaXMub3JhbmdlUVApIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSAnb3JhbmdlJztcbiAgICAgICAgICAgIHRoaXMuYmxpbmtWaWRlb1F1YWxpdHlTdGF0dXMoMSk7XG4gICAgICAgICAgICB0aGlzLnN0YXRzVGV4dCA9IGA8ZGl2IHN0eWxlPVwiY29sb3I6ICR7dGhpcy5jb2xvcn1cIj5CbG9ja3kgZW5jb2RpbmcgcXVhbGl0eTwvZGl2PmA7XG4gICAgICAgICAgICB0aGlzLm91dGVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgJyMzYzNiNDAnKTtcbiAgICAgICAgICAgIHRoaXMubWlkZGxlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmlubmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIHRoaXMuY29sb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKFFQIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSAnI2IwYjBiMCc7XG4gICAgICAgICAgICB0aGlzLm91dGVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgJyMzYzNiNDAnKTtcbiAgICAgICAgICAgIHRoaXMubWlkZGxlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgJyMzYzNiNDAnKTtcbiAgICAgICAgICAgIHRoaXMuaW5uZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5kb3Quc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5zdGF0c1RleHQgPSBgPGRpdiBzdHlsZT1cImNvbG9yOiAke3RoaXMuY29sb3J9XCI+Tm90IGNvbm5lY3RlZDwvZGl2PmA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbG9yID0gJ2xpbWUnO1xuICAgICAgICAgICAgdGhpcy5xdWFsaXR5U3RhdHVzLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgICAgICB0aGlzLnN0YXRzVGV4dCA9IGA8ZGl2IHN0eWxlPVwiY29sb3I6ICR7dGhpcy5jb2xvcn1cIj5DbGVhciBlbmNvZGluZyBxdWFsaXR5PC9kaXY+YDtcbiAgICAgICAgICAgIHRoaXMub3V0ZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMubWlkZGxlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmlubmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIHRoaXMuY29sb3IpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVhbGl0eVRleHQuaW5uZXJIVE1MID0gdGhpcy5zdGF0c1RleHQ7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuLyoqXG4gKiBYUiBpY29uIHRoYXQgY2FuIGJlIGNsaWNrZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBYUkljb24ge1xuICAgIF9yb290RWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgX3hySWNvbjogU1ZHRWxlbWVudDtcbiAgICBfdG9vbHRpcFRleHQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aGUgYnV0dG9uIGNvbnRhaW5pbmcgdGhlIFhSIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MQnV0dG9uRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdVaVRvb2wnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ3hyQnRuJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMueHJJY29uKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcFRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRvb2x0aXBUZXh0KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl90b29sdGlwVGV4dCkge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5jbGFzc0xpc3QuYWRkKCd0b29sdGlwdGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQuaW5uZXJIVE1MID0gJ1hSJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbHRpcFRleHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB4ckljb24oKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5feHJJY29uKSB7XG4gICAgICAgICAgICB0aGlzLl94ckljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnc3ZnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAneHJJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl94ckljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl94ckljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl94ckljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ3ZpZXdCb3gnLCAnMCAwIDEwMCAxMDAnKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHN2ZyBncm91cCBmb3IgdGhlIHBhdGhzXG4gICAgICAgICAgICBjb25zdCBzdmdHcm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHN2Z0dyb3VwLmNsYXNzTGlzdC5hZGQoJ3N2Z0ljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbi5hcHBlbmRDaGlsZChzdmdHcm91cCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBwYXRocyBmb3IgdGhlIGljb24gaXRzZWxmLCB0aGUgcGF0aCBvZiB0aGUgeHIgaGVhZHNldFxuICAgICAgICAgICAgY29uc3QgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTI5IDQxYy01IDAtOSA0LTkgOXM0IDkgOSA5IDktNCA5LTktNC05LTktOXptMCAxNGMtMi44IDAtNS0yLjItNS01czIuMi01IDUtNSA1IDIuMiA1IDUtMi4yIDUtNSA1em00Mi0xNGMtNSAwLTkgNC05IDlzNCA5IDkgOSA5LTQgOS05LTQtOS05LTl6bTAgMTRjLTIuOCAwLTUtMi4yLTUtNXMyLjItNSA1LTUgNSAyLjIgNSA1LTIuMiA1LTUgNXptMTItMzFIMTdjLTYuNiAwLTEyIDUuNC0xMiAxMnYyOGMwIDYuNiA1LjQgMTIgMTIgMTJoMTQuNWMzLjUgMCA2LjgtMS41IDktNC4xbDMuNS00YzEuNS0xLjcgMy43LTIuNyA2LTIuN3M0LjUgMSA2IDIuN2wzLjUgNGMyLjMgMi42IDUuNiA0LjEgOSA0LjFIODNjNi42IDAgMTItNS40IDEyLTEyVjM2YzAtNi42LTUuNC0xMi0xMi0xMnptOCA0MGMwIDQuNC0zLjYgOC04IDhINjguNWMtMi4zIDAtNC41LTEtNi0yLjdsLTMuNS00Yy0yLjMtMi42LTUuNi00LjEtOS00LjEtMy41IDAtNi44IDEuNS05IDQuMWwtMy41IDRDMzYgNzEgMzMuOCA3MiAzMS41IDcySDE3Yy00LjQgMC04LTMuNi04LThWMzZjMC00LjQgMy42LTggOC04aDY2YzQuNCAwIDggMy42IDggOHYyOHonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5feHJJY29uO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmV4cG9ydCBjbGFzcyBNYXRoVXRpbHMge1xuICAgIC8qKlxuICAgICAqIGZvcm1hdHMgQnl0ZXMgY29taW5nIGluIGZvciB2aWRlbyBzdGF0c1xuICAgICAqIEBwYXJhbSBieXRlcyBudW1iZXIgdG8gY29udmVydFxuICAgICAqIEBwYXJhbSBkZWNpbWFscyBudW1iZXIgb2YgZGVjaW1hbCBwbGFjZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgZm9ybWF0Qnl0ZXMoYnl0ZXM6IG51bWJlciwgZGVjaW1hbHM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGlmIChieXRlcyA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuICcwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZhY3RvciA9IDEwMjQ7XG4gICAgICAgIGNvbnN0IGRtID0gZGVjaW1hbHMgPCAwID8gMCA6IGRlY2ltYWxzO1xuICAgICAgICBjb25zdCBzaXplcyA9IFtcbiAgICAgICAgICAgICdCeXRlcycsXG4gICAgICAgICAgICAnS2lCJyxcbiAgICAgICAgICAgICdNaUInLFxuICAgICAgICAgICAgJ0dpQicsXG4gICAgICAgICAgICAnVGlCJyxcbiAgICAgICAgICAgICdQaUInLFxuICAgICAgICAgICAgJ0VpQicsXG4gICAgICAgICAgICAnWmlCJyxcbiAgICAgICAgICAgICdZaUInXG4gICAgICAgIF07XG5cbiAgICAgICAgY29uc3QgaSA9IE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coZmFjdG9yKSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHBhcnNlRmxvYXQoKGJ5dGVzIC8gTWF0aC5wb3coZmFjdG9yLCBpKSkudG9GaXhlZChkbSkpICtcbiAgICAgICAgICAgICcgJyArXG4gICAgICAgICAgICBzaXplc1tpXVxuICAgICAgICApO1xuICAgIH1cbn1cbiIsInZhciB4ID0geSA9PiB7IHZhciB4ID0ge307IF9fd2VicGFja19yZXF1aXJlX18uZCh4LCB5KTsgcmV0dXJuIHg7IH1cbnZhciB5ID0geCA9PiAoKSA9PiB4XG5tb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfX2VwaWNnYW1lc19wc19saWJfcGl4ZWxzdHJlYW1pbmdmcm9udGVuZF91ZTVfNF9iMjAwZDhiOV9fOyIsInZhciB4ID0geSA9PiB7IHZhciB4ID0ge307IF9fd2VicGFja19yZXF1aXJlX18uZCh4LCB5KTsgcmV0dXJuIHg7IH1cbnZhciB5ID0geCA9PiAoKSA9PiB4XG5tb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfanNzX187IiwidmFyIHggPSB5ID0+IHsgdmFyIHggPSB7fTsgX193ZWJwYWNrX3JlcXVpcmVfXy5kKHgsIHkpOyByZXR1cm4geDsgfVxudmFyIHkgPSB4ID0+ICgpID0+IHhcbm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9qc3NfcGx1Z2luX2NhbWVsX2Nhc2VfZGUxMTMzNTVfXzsiLCJ2YXIgeCA9IHkgPT4geyB2YXIgeCA9IHt9OyBfX3dlYnBhY2tfcmVxdWlyZV9fLmQoeCwgeSk7IHJldHVybiB4OyB9XG52YXIgeSA9IHggPT4gKCkgPT4geFxubW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2pzc19wbHVnaW5fZ2xvYmFsX2VmODZmNDIxX187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5leHBvcnQgeyBBcHBsaWNhdGlvbiwgVUlPcHRpb25zLCBWaWRlb1FQSW5kaWNhdG9yQ29uZmlnIH0gZnJvbSAnLi9BcHBsaWNhdGlvbi9BcHBsaWNhdGlvbic7XG5cbmV4cG9ydCB7IFBpeGVsU3RyZWFtaW5nQXBwbGljYXRpb25TdHlsZSB9IGZyb20gJy4vU3R5bGVzL1BpeGVsU3RyZWFtaW5nQXBwbGljYXRpb25TdHlsZXMnO1xuXG5leHBvcnQgeyBBRktPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0FGS092ZXJsYXknO1xuZXhwb3J0IHsgQWN0aW9uT3ZlcmxheSB9IGZyb20gJy4vT3ZlcmxheS9BY3Rpb25PdmVybGF5JztcbmV4cG9ydCB7IE92ZXJsYXlCYXNlIH0gZnJvbSAnLi9PdmVybGF5L0Jhc2VPdmVybGF5JztcbmV4cG9ydCB7IENvbm5lY3RPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0Nvbm5lY3RPdmVybGF5JztcbmV4cG9ydCB7IERpc2Nvbm5lY3RPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0Rpc2Nvbm5lY3RPdmVybGF5JztcbmV4cG9ydCB7IEVycm9yT3ZlcmxheSB9IGZyb20gJy4vT3ZlcmxheS9FcnJvck92ZXJsYXknO1xuZXhwb3J0IHsgSW5mb092ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvSW5mb092ZXJsYXknO1xuZXhwb3J0IHsgUGxheU92ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvUGxheU92ZXJsYXknO1xuZXhwb3J0IHsgVGV4dE92ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvVGV4dE92ZXJsYXknO1xuZXhwb3J0IHsgQ29uZmlnVUkgfSBmcm9tICcuL0NvbmZpZy9Db25maWdVSSc7XG5leHBvcnQgeyBTZXR0aW5nVUlCYXNlIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJQmFzZSc7XG5leHBvcnQgeyBTZXR0aW5nVUlGbGFnIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJRmxhZyc7XG5leHBvcnQgeyBTZXR0aW5nVUlOdW1iZXIgfSBmcm9tICcuL0NvbmZpZy9TZXR0aW5nVUlOdW1iZXInO1xuZXhwb3J0IHsgU2V0dGluZ1VJT3B0aW9uIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJT3B0aW9uJztcbmV4cG9ydCB7IFNldHRpbmdVSVRleHQgfSBmcm9tICcuL0NvbmZpZy9TZXR0aW5nVUlUZXh0JztcbmV4cG9ydCB7IFBhbmVsQ29uZmlndXJhdGlvbiwgVUlFbGVtZW50Q29uZmlnLCBVSUVsZW1lbnRDcmVhdGlvbk1vZGUgfSBmcm9tICcuL1VJL1VJQ29uZmlndXJhdGlvblR5cGVzJ1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9