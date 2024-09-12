(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@epicgames-ps/lib-pixelstreamingfrontend-ue5.4"), require("jss"), require("jss-plugin-global"), require("jss-plugin-camel-case"));
	else if(typeof define === 'function' && define.amd)
		define(["@epicgames-ps/lib-pixelstreamingfrontend-ue5.4", "jss", "jss-plugin-global", "jss-plugin-camel-case"], factory);
	else if(typeof exports === 'object')
		exports["lib-pixelstreamingfrontend-ui"] = factory(require("@epicgames-ps/lib-pixelstreamingfrontend-ue5.4"), require("jss"), require("jss-plugin-global"), require("jss-plugin-camel-case"));
	else
		root["lib-pixelstreamingfrontend-ui"] = factory(root["@epicgames-ps/lib-pixelstreamingfrontend-ue5.4"], root["jss"], root["jss-plugin-global"], root["jss-plugin-camel-case"]);
})(this, (__WEBPACK_EXTERNAL_MODULE__epicgames_ps_lib_pixelstreamingfrontend_ue5_4__, __WEBPACK_EXTERNAL_MODULE_jss__, __WEBPACK_EXTERNAL_MODULE_jss_plugin_global__, __WEBPACK_EXTERNAL_MODULE_jss_plugin_camel_case__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var jss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jss_plugin_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jss-plugin-global */ "jss-plugin-global");
/* harmony import */ var jss_plugin_global__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jss_plugin_global__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jss_plugin_camel_case__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jss-plugin-camel-case */ "jss-plugin-camel-case");
/* harmony import */ var jss_plugin_camel_case__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jss_plugin_camel_case__WEBPACK_IMPORTED_MODULE_2__);
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
            plugins: [jss_plugin_global__WEBPACK_IMPORTED_MODULE_1___default()(), jss_plugin_camel_case__WEBPACK_IMPORTED_MODULE_2___default()()],
            insertionPoint: jssInsertionPoint
        };
        jss__WEBPACK_IMPORTED_MODULE_0___default().setup(jssOptions);
        this.customStyles = customStyles;
        this.lightModePalette =
            lightModePalette !== null && lightModePalette !== void 0 ? lightModePalette : this.defaultLightModePalette;
        this.darkModePalette = darkModePalette !== null && darkModePalette !== void 0 ? darkModePalette : this.defaultDarkModePalette;
    }
    applyStyleSheet() {
        // Todo: refactor codebase to use jss at a component level, classes can be grabbed like so:
        //const {pixelStreamingClasses} = jss.createStyleSheet(styles).attach();
        // attach generated style sheet to page
        jss__WEBPACK_IMPORTED_MODULE_0___default().createStyleSheet({
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
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var _epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_epicgames_ps_lib_pixelstreamingfrontend_ue5_4__WEBPACK_IMPORTED_MODULE_0__);
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

module.exports = __WEBPACK_EXTERNAL_MODULE__epicgames_ps_lib_pixelstreamingfrontend_ue5_4__;

/***/ }),

/***/ "jss":
/*!**********************!*\
  !*** external "jss" ***!
  \**********************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_jss__;

/***/ }),

/***/ "jss-plugin-camel-case":
/*!****************************************!*\
  !*** external "jss-plugin-camel-case" ***!
  \****************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_jss_plugin_camel_case__;

/***/ }),

/***/ "jss-plugin-global":
/*!************************************!*\
  !*** external "jss-plugin-global" ***!
  \************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_jss_plugin_global__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
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

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFekQsT0FBTyxDQUNILFVBQVUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyRCxHQUFHO1lBQ0gsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUNYLENBQUM7SUFDTixDQUFDO0NBQ0o7Ozs7Ozs7Ozs7O0FDbkNEOzs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BLGtEQUFrRDtBQUV5QztBQUVEO0FBRXhDO0FBQ007QUFDSjtBQUNNO0FBQ007QUFDVjtBQUNGO0FBQ0E7QUFDQTtBQUNQO0FBQ1U7QUFDQTtBQUNJO0FBQ0E7QUFDSjtBQUMrQyIsInNvdXJjZXMiOlsid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9BcHBsaWNhdGlvbi9BcHBsaWNhdGlvbi50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9Db25maWcvQ29uZmlnVUkudHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvQ29uZmlnL1NldHRpbmdVSUJhc2UudHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvQ29uZmlnL1NldHRpbmdVSUZsYWcudHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvQ29uZmlnL1NldHRpbmdVSU51bWJlci50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9Db25maWcvU2V0dGluZ1VJT3B0aW9uLnRzIiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL0NvbmZpZy9TZXR0aW5nVUlUZXh0LnRzIiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL092ZXJsYXkvQUZLT3ZlcmxheS50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9PdmVybGF5L0FjdGlvbk92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvT3ZlcmxheS9CYXNlT3ZlcmxheS50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9PdmVybGF5L0Nvbm5lY3RPdmVybGF5LnRzIiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL092ZXJsYXkvRGlzY29ubmVjdE92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvT3ZlcmxheS9FcnJvck92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvT3ZlcmxheS9JbmZvT3ZlcmxheS50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9PdmVybGF5L1BsYXlPdmVybGF5LnRzIiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL092ZXJsYXkvVGV4dE92ZXJsYXkudHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvU3R5bGVzL1BpeGVsU3RyZWFtaW5nQXBwbGljYXRpb25TdHlsZXMudHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvVUkvQ29udHJvbHMudHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvVUkvRGF0YUNoYW5uZWxMYXRlbmN5VGVzdC50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9GdWxsc2NyZWVuSWNvbi50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9MYWJlbGxlZEJ1dHRvbi50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9MYXRlbmN5VGVzdC50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9TZXR0aW5nc0ljb24udHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvVUkvU2V0dGluZ3NQYW5lbC50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9TdGF0c0ljb24udHMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvLi9zcmMvVUkvU3RhdHNQYW5lbC50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9VSUNvbmZpZ3VyYXRpb25UeXBlcy50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VSS9WaWRlb1FwSW5kaWNhdG9yLnRzIiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL1VJL1hSSWNvbi50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS8uL3NyYy9VdGlsL01hdGhVdGlscy50cyIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS9leHRlcm5hbCB1bWQgXCJAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40XCIiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvZXh0ZXJuYWwgdW1kIFwianNzXCIiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvZXh0ZXJuYWwgdW1kIFwianNzLXBsdWdpbi1jYW1lbC1jYXNlXCIiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvZXh0ZXJuYWwgdW1kIFwianNzLXBsdWdpbi1nbG9iYWxcIiIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVpLy4vc3JjL3BpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuNFwiKSwgcmVxdWlyZShcImpzc1wiKSwgcmVxdWlyZShcImpzcy1wbHVnaW4tZ2xvYmFsXCIpLCByZXF1aXJlKFwianNzLXBsdWdpbi1jYW1lbC1jYXNlXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcIkBlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjRcIiwgXCJqc3NcIiwgXCJqc3MtcGx1Z2luLWdsb2JhbFwiLCBcImpzcy1wbHVnaW4tY2FtZWwtY2FzZVwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJsaWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11aVwiXSA9IGZhY3RvcnkocmVxdWlyZShcIkBlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjRcIiksIHJlcXVpcmUoXCJqc3NcIiksIHJlcXVpcmUoXCJqc3MtcGx1Z2luLWdsb2JhbFwiKSwgcmVxdWlyZShcImpzcy1wbHVnaW4tY2FtZWwtY2FzZVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWlcIl0gPSBmYWN0b3J5KHJvb3RbXCJAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40XCJdLCByb290W1wianNzXCJdLCByb290W1wianNzLXBsdWdpbi1nbG9iYWxcIl0sIHJvb3RbXCJqc3MtcGx1Z2luLWNhbWVsLWNhc2VcIl0pO1xufSkodGhpcywgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfX2VwaWNnYW1lc19wc19saWJfcGl4ZWxzdHJlYW1pbmdmcm9udGVuZF91ZTVfNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2pzc19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2pzc19wbHVnaW5fZ2xvYmFsX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfanNzX3BsdWdpbl9jYW1lbF9jYXNlX18pID0+IHtcbnJldHVybiAiLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQge1xuICAgIFBpeGVsU3RyZWFtaW5nLFxuICAgIEZsYWdzLFxuICAgIExvZ2dlcixcbiAgICBBZ2dyZWdhdGVkU3RhdHMsXG4gICAgTGF0ZW5jeVRlc3RSZXN1bHRzLFxuICAgIEluaXRpYWxTZXR0aW5ncyxcbiAgICBNZXNzYWdlU3RyZWFtZXJMaXN0XG59IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjQnO1xuaW1wb3J0IHsgT3ZlcmxheUJhc2UgfSBmcm9tICcuLi9PdmVybGF5L0Jhc2VPdmVybGF5JztcbmltcG9ydCB7IEFjdGlvbk92ZXJsYXkgfSBmcm9tICcuLi9PdmVybGF5L0FjdGlvbk92ZXJsYXknO1xuaW1wb3J0IHsgVGV4dE92ZXJsYXkgfSBmcm9tICcuLi9PdmVybGF5L1RleHRPdmVybGF5JztcbmltcG9ydCB7IENvbm5lY3RPdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9Db25uZWN0T3ZlcmxheSc7XG5pbXBvcnQgeyBEaXNjb25uZWN0T3ZlcmxheSB9IGZyb20gJy4uL092ZXJsYXkvRGlzY29ubmVjdE92ZXJsYXknO1xuaW1wb3J0IHsgUGxheU92ZXJsYXkgfSBmcm9tICcuLi9PdmVybGF5L1BsYXlPdmVybGF5JztcbmltcG9ydCB7IEluZm9PdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9JbmZvT3ZlcmxheSc7XG5pbXBvcnQgeyBFcnJvck92ZXJsYXkgfSBmcm9tICcuLi9PdmVybGF5L0Vycm9yT3ZlcmxheSc7XG5pbXBvcnQgeyBBRktPdmVybGF5IH0gZnJvbSAnLi4vT3ZlcmxheS9BRktPdmVybGF5JztcbmltcG9ydCB7IENvbnRyb2xzLCBDb250cm9sc1VJQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL1VJL0NvbnRyb2xzJztcbmltcG9ydCB7IExhYmVsbGVkQnV0dG9uIH0gZnJvbSAnLi4vVUkvTGFiZWxsZWRCdXR0b24nO1xuaW1wb3J0IHsgU2V0dGluZ3NQYW5lbCB9IGZyb20gJy4uL1VJL1NldHRpbmdzUGFuZWwnO1xuaW1wb3J0IHsgU3RhdHNQYW5lbCB9IGZyb20gJy4uL1VJL1N0YXRzUGFuZWwnO1xuaW1wb3J0IHsgVmlkZW9RcEluZGljYXRvciB9IGZyb20gJy4uL1VJL1ZpZGVvUXBJbmRpY2F0b3InO1xuaW1wb3J0IHsgQ29uZmlnVUksIExpZ2h0TW9kZSB9IGZyb20gJy4uL0NvbmZpZy9Db25maWdVSSc7XG5pbXBvcnQgeyBcbiAgICBVSUVsZW1lbnRDcmVhdGlvbk1vZGUsIFxuICAgIFBhbmVsQ29uZmlndXJhdGlvbiwgXG4gICAgaXNQYW5lbEVuYWJsZWQsXG4gICAgVUlFbGVtZW50Q29uZmlnXG59IGZyb20gJy4uL1VJL1VJQ29uZmlndXJhdGlvblR5cGVzJ1xuaW1wb3J0IHsgRnVsbFNjcmVlbkljb25CYXNlLCBGdWxsU2NyZWVuSWNvbkV4dGVybmFsIH0gZnJvbSAnLi4vVUkvRnVsbHNjcmVlbkljb24nO1xuaW1wb3J0IHtcbiAgICBEYXRhQ2hhbm5lbExhdGVuY3lUZXN0UmVzdWx0XG59IGZyb20gXCJAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40L3R5cGVzL0RhdGFDaGFubmVsL0RhdGFDaGFubmVsTGF0ZW5jeVRlc3RSZXN1bHRzXCI7XG5cblxuLyoqIFxuICogQ29uZmlndXJhdGlvbiBvZiB0aGUgaW50ZXJuYWwgdmlkZW8gUVAgaW5kaWNhdG9yIGVsZW1lbnQuXG4gKiBCeSBkZWZhdWx0LCBvbmUgd2lsbCBiZSBtYWRlLCBidXQgaWYgbmVlZGVkIHRoaXMgY2FuIGJlIGRpc2FibGVkLlxuICogXG4gKiBOb3RlOiBGb3IgY3VzdG9tIFVJIGVsZW1lbnRzIHRvIHJlYWN0IHRvIHRoZSBRUCBiZWluZyBjaGFuZ2VkLCB1c2UgYSBQaXhlbFN0cmVhbWluZyBcbiAqIG9iamVjdCdzIGFkZEV2ZW50TGlzdGVuZXIoJ3ZpZGVvRW5jb2RlckF2Z1FQJywgLi4uKSBvciByZW1vdmVFdmVudExpc3RlbmVyKC4uLikuXG4gKi9cbmV4cG9ydCB0eXBlIFZpZGVvUVBJbmRpY2F0b3JDb25maWcgPSB7XG4gICAgZGlzYWJsZUluZGljYXRvcj86IGJvb2xlYW5cbn1cblxuLyoqXG4gKiBVSSBPcHRpb25zIGNhbiBiZSBwcm92aWRlZCB3aGVuIGNyZWF0aW5nIGFuIEFwcGxpY2F0aW9uLCB0byBjb25maWd1cmUgaXQncyBpbnRlcm5hbFxuICogYW5kIGV4dGVybmFsIGJlaGF2aW91ciwgZW5hYmxlL2Rpc2FibGUgZmVhdHVyZXMsIGFuZCBjb25uZWN0IHRvIGV4dGVybmFsIFVJLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVJT3B0aW9ucyB7XG4gICAgc3RyZWFtOiBQaXhlbFN0cmVhbWluZztcbiAgICBvbkNvbG9yTW9kZUNoYW5nZWQ/OiAoaXNMaWdodE1vZGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gICAgLyoqIEJ5IGRlZmF1bHQsIGEgc2V0dGluZ3MgcGFuZWwgYW5kIGFzc29jaWF0ZSB2aXNpYmlsaXR5IHRvZ2dsZSBidXR0b24gd2lsbCBiZSBtYWRlLlxuICAgICAgKiBJZiBuZWVkZWQsIHRoaXMgYmVoYXZpb3VyIGNhbiBiZSBjb25maWd1cmVkLiAqL1xuICAgIHNldHRpbmdzUGFuZWxDb25maWc/OiBQYW5lbENvbmZpZ3VyYXRpb247XG4gICAgLyoqIEJ5IGRlZmF1bHQsIGEgc3RhdHMgcGFuZWwgYW5kIGFzc29jaWF0ZSB2aXNpYmlsaXR5IHRvZ2dsZSBidXR0b24gd2lsbCBiZSBtYWRlLlxuICAgICAgKiBJZiBuZWVkZWQsIHRoaXMgYmVoYXZpb3VyIGNhbiBiZSBjb25maWd1cmVkLiAqL1xuICAgIHN0YXRzUGFuZWxDb25maWc/OiBQYW5lbENvbmZpZ3VyYXRpb247XG4gICAgLyoqIElmIG5lZWRlZCwgdGhlIGZ1bGwgc2NyZWVuIGJ1dHRvbiBjYW4gYmUgZXh0ZXJuYWwgb3IgZGlzYWJsZWQuICovXG4gICAgZnVsbFNjcmVlbkNvbnRyb2xzQ29uZmlnPyA6IFVJRWxlbWVudENvbmZpZyxcbiAgICAvKiogSWYgbmVlZGVkLCBYUiBidXR0b24gY2FuIGJlIGV4dGVybmFsIG9yIGRpc2FibGVkLiAqL1xuICAgIHhyQ29udHJvbHNDb25maWc/IDogVUlFbGVtZW50Q29uZmlnLFxuICAgIC8qKiBDb25maWd1cmF0aW9uIG9mIHRoZSB2aWRlbyBRUCBpbmRpY2F0b3IuICovXG4gICAgdmlkZW9RcEluZGljYXRvckNvbmZpZz8gOiBWaWRlb1FQSW5kaWNhdG9yQ29uZmlnXG59XG5cbi8qKlxuICogQW4gQXBwbGljYXRpb24gaXMgYSBjb21iaW5hdGlvbiBvZiBVSSBlbGVtZW50cyB0byBkaXNwbGF5IGFuZCBtYW5hZ2UgYSBXZWJSVEMgUGl4ZWwgU3RyZWFtaW5nXG4gKiBjb25uZWN0aW9uLiBJdCBpbmNsdWRlcyBmZWF0dXJlcyBmb3IgY29udHJvbGxpbmcgYSBzdHJlYW0gd2l0aCBtb3VzZSBhbmQga2V5Ym9hcmQsIFxuICogbWFuYWdpbmcgY29ubmVjdGlvbiBlbmRwb2ludHMsIGFzIHdlbGwgYXMgZGlzcGxheWluZyBzdGF0cyBhbmQgb3RoZXIgaW5mb3JtYXRpb24gYWJvdXQgaXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHBsaWNhdGlvbiB7XG4gICAgc3RyZWFtOiBQaXhlbFN0cmVhbWluZztcblxuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgX3VpRmVhdHVyZUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLy8gc2V0IHRoZSBvdmVybGF5IHBsYWNlaG9sZGVyc1xuICAgIGN1cnJlbnRPdmVybGF5OiBPdmVybGF5QmFzZSB8IG51bGw7XG4gICAgZGlzY29ubmVjdE92ZXJsYXk6IEFjdGlvbk92ZXJsYXk7XG4gICAgY29ubmVjdE92ZXJsYXk6IEFjdGlvbk92ZXJsYXk7XG4gICAgcGxheU92ZXJsYXk6IEFjdGlvbk92ZXJsYXk7XG4gICAgaW5mb092ZXJsYXk6IFRleHRPdmVybGF5O1xuICAgIGVycm9yT3ZlcmxheTogVGV4dE92ZXJsYXk7XG4gICAgYWZrT3ZlcmxheTogQUZLT3ZlcmxheTtcblxuICAgIGNvbnRyb2xzOiBDb250cm9scztcblxuICAgIHNldHRpbmdzUGFuZWw6IFNldHRpbmdzUGFuZWw7XG4gICAgc3RhdHNQYW5lbDogU3RhdHNQYW5lbDtcbiAgICB2aWRlb1FwSW5kaWNhdG9yOiBWaWRlb1FwSW5kaWNhdG9yO1xuXG4gICAgY29uZmlnVUk6IENvbmZpZ1VJO1xuXG4gICAgb25Db2xvck1vZGVDaGFuZ2VkOiBVSU9wdGlvbnNbXCJvbkNvbG9yTW9kZUNoYW5nZWRcIl07XG5cbiAgICBwcm90ZWN0ZWQgX29wdGlvbnMgOiBVSU9wdGlvbnM7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gb3B0aW9ucyAtIEluaXRpYWxpemF0aW9uIG9wdGlvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBVSU9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnN0cmVhbSA9IG9wdGlvbnMuc3RyZWFtO1xuICAgICAgICB0aGlzLm9uQ29sb3JNb2RlQ2hhbmdlZCA9IG9wdGlvbnMub25Db2xvck1vZGVDaGFuZ2VkO1xuICAgICAgICB0aGlzLmNvbmZpZ1VJID0gbmV3IENvbmZpZ1VJKHRoaXMuc3RyZWFtLmNvbmZpZyk7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVPdmVybGF5cygpO1xuXG4gICAgICAgIGlmIChpc1BhbmVsRW5hYmxlZChvcHRpb25zLnN0YXRzUGFuZWxDb25maWcpKSB7XG4gICAgICAgICAgICAvLyBBZGQgc3RhdHMgcGFuZWxcbiAgICAgICAgICAgIHRoaXMuc3RhdHNQYW5lbCA9IG5ldyBTdGF0c1BhbmVsKCk7XG4gICAgICAgICAgICB0aGlzLnVpRmVhdHVyZXNFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc3RhdHNQYW5lbC5yb290RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChpc1BhbmVsRW5hYmxlZChvcHRpb25zLnNldHRpbmdzUGFuZWxDb25maWcpKSB7XG4gICAgICAgICAgICAvLyBBZGQgc2V0dGluZ3MgcGFuZWxcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NQYW5lbCA9IG5ldyBTZXR0aW5nc1BhbmVsKCk7XG4gICAgICAgICAgICB0aGlzLnVpRmVhdHVyZXNFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NQYW5lbC5yb290RWxlbWVudCk7XG4gICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZVNldHRpbmdzKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICghb3B0aW9ucy52aWRlb1FwSW5kaWNhdG9yQ29uZmlnIHx8ICFvcHRpb25zLnZpZGVvUXBJbmRpY2F0b3JDb25maWcuZGlzYWJsZUluZGljYXRvcikge1xuICAgICAgICAgICAgLy8gQWRkIHRoZSB2aWRlbyBzdHJlYW0gUVAgaW5kaWNhdG9yXG4gICAgICAgICAgICB0aGlzLnZpZGVvUXBJbmRpY2F0b3IgPSBuZXcgVmlkZW9RcEluZGljYXRvcigpO1xuICAgICAgICAgICAgdGhpcy51aUZlYXR1cmVzRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnZpZGVvUXBJbmRpY2F0b3Iucm9vdEVsZW1lbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25zKCk7XG5cbiAgICAgICAgdGhpcy5yZWdpc3RlckNhbGxiYWNrcygpO1xuXG4gICAgICAgIHRoaXMuc2hvd0Nvbm5lY3RPckF1dG9Db25uZWN0T3ZlcmxheXMoKTtcblxuICAgICAgICB0aGlzLnNldENvbG9yTW9kZSh0aGlzLmNvbmZpZ1VJLmlzQ3VzdG9tRmxhZ0VuYWJsZWQoTGlnaHRNb2RlKSk7XG5cbiAgICAgICAgdGhpcy5zdHJlYW0uY29uZmlnLl9hZGRPblNldHRpbmdDaGFuZ2VkTGlzdGVuZXIoXG4gICAgICAgICAgICBGbGFncy5IaWRlVUksXG4gICAgICAgICAgICAoaXNFbmFibGVkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdWlGZWF0dXJlRWxlbWVudC5zdHlsZS52aXNpYmlsaXR5ID0gaXNFbmFibGVkID8gXCJoaWRkZW5cIiA6IFwidmlzaWJsZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0aGlzLnN0cmVhbS5jb25maWcuaXNGbGFnRW5hYmxlZChGbGFncy5IaWRlVUkpKSB7XG4gICAgICAgICAgICB0aGlzLl91aUZlYXR1cmVFbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGNyZWF0ZU92ZXJsYXlzKCk6IHZvaWQge1xuICAgICAgICAvLyBidWlsZCBhbGwgb2YgdGhlIG92ZXJsYXlzXG4gICAgICAgIHRoaXMuZGlzY29ubmVjdE92ZXJsYXkgPSBuZXcgRGlzY29ubmVjdE92ZXJsYXkoXG4gICAgICAgICAgICB0aGlzLnN0cmVhbS52aWRlb0VsZW1lbnRQYXJlbnRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5jb25uZWN0T3ZlcmxheSA9IG5ldyBDb25uZWN0T3ZlcmxheShcbiAgICAgICAgICAgIHRoaXMuc3RyZWFtLnZpZGVvRWxlbWVudFBhcmVudFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnBsYXlPdmVybGF5ID0gbmV3IFBsYXlPdmVybGF5KFxuICAgICAgICAgICAgdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaW5mb092ZXJsYXkgPSBuZXcgSW5mb092ZXJsYXkoXG4gICAgICAgICAgICB0aGlzLnN0cmVhbS52aWRlb0VsZW1lbnRQYXJlbnRcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5lcnJvck92ZXJsYXkgPSBuZXcgRXJyb3JPdmVybGF5KFxuICAgICAgICAgICAgdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50XG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWZrT3ZlcmxheSA9IG5ldyBBRktPdmVybGF5KFxuICAgICAgICAgICAgdGhpcy5zdHJlYW0udmlkZW9FbGVtZW50UGFyZW50XG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5kaXNjb25uZWN0T3ZlcmxheS5vbkFjdGlvbigoKSA9PiB0aGlzLnN0cmVhbS5yZWNvbm5lY3QoKSk7XG5cbiAgICAgICAgLy8gQnVpbGQgdGhlIHdlYlJ0YyBjb25uZWN0IG92ZXJsYXkgRXZlbnQgTGlzdGVuZXIgYW5kIHNob3cgdGhlIGNvbm5lY3Qgb3ZlcmxheVxuICAgICAgICB0aGlzLmNvbm5lY3RPdmVybGF5Lm9uQWN0aW9uKCgpID0+IHRoaXMuc3RyZWFtLmNvbm5lY3QoKSk7XG5cbiAgICAgICAgLy8gc2V0IHVwIHRoZSBwbGF5IG92ZXJsYXlzIGFjdGlvblxuICAgICAgICB0aGlzLnBsYXlPdmVybGF5Lm9uQWN0aW9uKCgpID0+IHRoaXMuc3RyZWFtLnBsYXkoKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHVwIGJ1dHRvbiBjbGljayBmdW5jdGlvbnMgYW5kIGJ1dHRvbiBmdW5jdGlvbmFsaXR5XG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZUJ1dHRvbnMoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2xzVUlDb25maWcgOiBDb250cm9sc1VJQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgICAgIHN0YXRzQnV0dG9uVHlwZSA6ICEhdGhpcy5fb3B0aW9ucy5zdGF0c1BhbmVsQ29uZmlnXG4gICAgICAgICAgICAgICAgPyB0aGlzLl9vcHRpb25zLnN0YXRzUGFuZWxDb25maWcudmlzaWJpbGl0eUJ1dHRvbkNvbmZpZ1xuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc2V0dGluZ3NCdXR0b25UeXBlOiAhIXRoaXMuX29wdGlvbnMuc2V0dGluZ3NQYW5lbENvbmZpZ1xuICAgICAgICAgICAgICAgID8gdGhpcy5fb3B0aW9ucy5zZXR0aW5nc1BhbmVsQ29uZmlnLnZpc2liaWxpdHlCdXR0b25Db25maWdcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5CdXR0b25UeXBlOiB0aGlzLl9vcHRpb25zLmZ1bGxTY3JlZW5Db250cm9sc0NvbmZpZyxcbiAgICAgICAgICAgIHhySWNvblR5cGU6IHRoaXMuX29wdGlvbnMueHJDb250cm9sc0NvbmZpZ1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldHVwIGNvbnRyb2xzXG4gICAgICAgIGNvbnN0IGNvbnRyb2xzID0gbmV3IENvbnRyb2xzKGNvbnRyb2xzVUlDb25maWcpO1xuICAgICAgICB0aGlzLnVpRmVhdHVyZXNFbGVtZW50LmFwcGVuZENoaWxkKGNvbnRyb2xzLnJvb3RFbGVtZW50KTtcblxuICAgICAgICAvLyBXaGVuIHdlIGZ1bGxzY3JlZW4gd2Ugd2FudCB0aGlzIGVsZW1lbnQgdG8gYmUgdGhlIHJvb3RcbiAgICAgICAgY29uc3QgZnVsbFNjcmVlbkJ1dHRvbiA6IEZ1bGxTY3JlZW5JY29uQmFzZSB8IHVuZGVmaW5lZCA9IFxuICAgICAgICAgICAgLy8gRGVwZW5kaW5nIG9uIGlmIHdlJ3JlIGNyZWF0aW5nIGFuIGludGVybmFsIGJ1dHRvbiwgb3IgdXNpbmcgYW4gZXh0ZXJuYWwgb25lXG4gICAgICAgICAgICAoISF0aGlzLl9vcHRpb25zLmZ1bGxTY3JlZW5Db250cm9sc0NvbmZpZyBcbiAgICAgICAgICAgICAgICAmJiB0aGlzLl9vcHRpb25zLmZ1bGxTY3JlZW5Db250cm9sc0NvbmZpZy5jcmVhdGlvbk1vZGUgPT09IFVJRWxlbWVudENyZWF0aW9uTW9kZS5Vc2VDdXN0b21FbGVtZW50KVxuICAgICAgICAgICAgLy8gRWl0aGVyIGNyZWF0ZSBhIGZ1bGxzY3JlZW4gY2xhc3MgYmFzZWQgb24gdGhlIGV4dGVybmFsIGJ1dHRvblxuICAgICAgICAgICAgPyBuZXcgRnVsbFNjcmVlbkljb25FeHRlcm5hbCh0aGlzLl9vcHRpb25zLmZ1bGxTY3JlZW5Db250cm9sc0NvbmZpZy5jdXN0b21FbGVtZW50KVxuICAgICAgICAgICAgLy8gT3IgdXNlIHRoZSBvbmUgY3JlYXRlZCBieSB0aGUgQ29udHJvbHMgaW5pdGlhbGl6ZXIgZWFybGllclxuICAgICAgICAgICAgOiBjb250cm9scy5mdWxsc2NyZWVuSWNvbjtcbiAgICAgICAgaWYgKGZ1bGxTY3JlZW5CdXR0b24pIHtcbiAgICAgICAgICAgIGZ1bGxTY3JlZW5CdXR0b24uZnVsbHNjcmVlbkVsZW1lbnQgPSAvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSA/IHRoaXMuc3RyZWFtLnZpZGVvRWxlbWVudFBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInZpZGVvXCIpWzBdIDogdGhpcy5yb290RWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBzZXR0aW5ncyBidXR0b24gdG8gY29udHJvbHNcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NCdXR0b24gOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCA9IFxuICAgICAgICAgICAgISFjb250cm9scy5zZXR0aW5nc0ljb24gPyBjb250cm9scy5zZXR0aW5nc0ljb24ucm9vdEVsZW1lbnQgOiBcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2V0dGluZ3NQYW5lbENvbmZpZy52aXNpYmlsaXR5QnV0dG9uQ29uZmlnLmN1c3RvbUVsZW1lbnQ7XG4gICAgICAgIGlmICghIXNldHRpbmdzQnV0dG9uKSBzZXR0aW5nc0J1dHRvbi5vbmNsaWNrID0gKCkgPT5cbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3NDbGlja2VkKCk7XG4gICAgICAgIGlmICghIXRoaXMuc2V0dGluZ3NQYW5lbCkgdGhpcy5zZXR0aW5nc1BhbmVsLnNldHRpbmdzQ2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzQ2xpY2tlZCgpO1xuXG4gICAgICAgIC8vIEFkZCBXZWJYUiBidXR0b24gdG8gY29udHJvbHNcbiAgICAgICAgY29uc3QgeHJCdXR0b24gOiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCA9IFxuICAgICAgICAgICAgISFjb250cm9scy54ckljb24gPyBjb250cm9scy54ckljb24ucm9vdEVsZW1lbnQgOiBcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMueHJDb250cm9sc0NvbmZpZy5jcmVhdGlvbk1vZGUgPT09IFVJRWxlbWVudENyZWF0aW9uTW9kZS5Vc2VDdXN0b21FbGVtZW50ID9cbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMueHJDb250cm9sc0NvbmZpZy5jdXN0b21FbGVtZW50IDogdW5kZWZpbmVkO1xuICAgICAgICBpZiAoISF4ckJ1dHRvbikgeHJCdXR0b24ub25jbGljayA9ICgpID0+XG4gICAgICAgICAgICB0aGlzLnN0cmVhbS50b2dnbGVYUigpO1xuXG4gICAgICAgIC8vIHNldHVwIHRoZSBzdGF0cy9pbmZvIGJ1dHRvblxuICAgICAgICBjb25zdCBzdGF0c0J1dHRvbiA6IEhUTUxFbGVtZW50IHwgdW5kZWZpbmVkID0gXG4gICAgICAgICAgICAhIWNvbnRyb2xzLnN0YXRzSWNvbiA/IGNvbnRyb2xzLnN0YXRzSWNvbi5yb290RWxlbWVudCA6IFxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zdGF0c1BhbmVsQ29uZmlnLnZpc2liaWxpdHlCdXR0b25Db25maWcuY3VzdG9tRWxlbWVudDtcbiAgICAgICAgaWYgKCEhc3RhdHNCdXR0b24pIHN0YXRzQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB0aGlzLnN0YXRzQ2xpY2tlZCgpXG5cbiAgICAgICAgaWYgKCEhdGhpcy5zdGF0c1BhbmVsKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRzUGFuZWwuc3RhdHNDbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gdGhpcy5zdGF0c0NsaWNrZWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBjb21tYW5kIGJ1dHRvbnMgKGlmIHdlIGhhdmUgc29tZXdoZXJlIHRvIGFkZCB0aGVtIHRvKVxuICAgICAgICBpZiAoISF0aGlzLnNldHRpbmdzUGFuZWwpIHtcbiAgICAgICAgICAgIC8vIEFkZCBidXR0b24gZm9yIHRvZ2dsZSBmcHNcbiAgICAgICAgICAgIGNvbnN0IHNob3dGUFNCdXR0b24gPSBuZXcgTGFiZWxsZWRCdXR0b24oJ1Nob3cgRlBTJywgJ1RvZ2dsZScpO1xuICAgICAgICAgICAgc2hvd0ZQU0J1dHRvbi5hZGRPbkNsaWNrTGlzdGVuZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RyZWFtLnJlcXVlc3RTaG93RnBzKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQWRkIGJ1dHRvbiBmb3IgcmVzdGFydCBzdHJlYW1cbiAgICAgICAgICAgIGNvbnN0IHJlc3RhcnRTdHJlYW1CdXR0b24gPSBuZXcgTGFiZWxsZWRCdXR0b24oXG4gICAgICAgICAgICAgICAgJ1Jlc3RhcnQgU3RyZWFtJyxcbiAgICAgICAgICAgICAgICAnUmVzdGFydCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXN0YXJ0U3RyZWFtQnV0dG9uLmFkZE9uQ2xpY2tMaXN0ZW5lcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdHJlYW0ucmVjb25uZWN0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQWRkIGJ1dHRvbiBmb3IgcmVxdWVzdCBrZXlmcmFtZVxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdEtleWZyYW1lQnV0dG9uID0gbmV3IExhYmVsbGVkQnV0dG9uKFxuICAgICAgICAgICAgICAgICdSZXF1ZXN0IGtleWZyYW1lJyxcbiAgICAgICAgICAgICAgICAnUmVxdWVzdCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXF1ZXN0S2V5ZnJhbWVCdXR0b24uYWRkT25DbGlja0xpc3RlbmVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbS5yZXF1ZXN0SWZyYW1lKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29uc3QgY29tbWFuZHNTZWN0aW9uRWxlbSA9IHRoaXMuY29uZmlnVUkuYnVpbGRTZWN0aW9uV2l0aEhlYWRpbmcoXG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nc1BhbmVsLnNldHRpbmdzQ29udGVudEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgJ0NvbW1hbmRzJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbW1hbmRzU2VjdGlvbkVsZW0uYXBwZW5kQ2hpbGQoc2hvd0ZQU0J1dHRvbi5yb290RWxlbWVudCk7XG4gICAgICAgICAgICBjb21tYW5kc1NlY3Rpb25FbGVtLmFwcGVuZENoaWxkKHJlcXVlc3RLZXlmcmFtZUJ1dHRvbi5yb290RWxlbWVudCk7XG4gICAgICAgICAgICBjb21tYW5kc1NlY3Rpb25FbGVtLmFwcGVuZENoaWxkKHJlc3RhcnRTdHJlYW1CdXR0b24ucm9vdEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uZmlndXJlIHRoZSBzZXR0aW5ncyB3aXRoIG9uIGNoYW5nZSBsaXN0ZW5lcnMgYW5kIGFueSBhZGRpdGlvbmFsIHBlciBleHBlcmllbmNlIHNldHRpbmdzLlxuICAgICAqL1xuICAgIGNvbmZpZ3VyZVNldHRpbmdzKCk6IHZvaWQge1xuICAgICAgICAvLyBUaGlzIGJ1aWxkcyBhbGwgdGhlIHNldHRpbmdzIHNlY3Rpb25zIGFuZCBmbGFncyB1bmRlciB0aGlzIGBzZXR0aW5nc0NvbnRlbnRgIGVsZW1lbnQuXG4gICAgICAgIHRoaXMuY29uZmlnVUkucG9wdWxhdGVTZXR0aW5nc0VsZW1lbnQoXG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzUGFuZWwuc2V0dGluZ3NDb250ZW50RWxlbWVudFxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuY29uZmlnVUkuYWRkQ3VzdG9tRmxhZ09uU2V0dGluZ0NoYW5nZWRMaXN0ZW5lcihcbiAgICAgICAgICAgIExpZ2h0TW9kZSxcbiAgICAgICAgICAgIChpc0xpZ2h0TW9kZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnVUkuc2V0Q3VzdG9tRmxhZ0xhYmVsKFxuICAgICAgICAgICAgICAgICAgICBMaWdodE1vZGUsXG4gICAgICAgICAgICAgICAgICAgIGBDb2xvciBTY2hlbWU6ICR7aXNMaWdodE1vZGUgPyAnTGlnaHQnIDogJ0RhcmsnfSBNb2RlYFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb2xvck1vZGUoaXNMaWdodE1vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyQ2FsbGJhY2tzKCkge1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2Fma1dhcm5pbmdBY3RpdmF0ZScsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IGNvdW50RG93biwgZGlzbWlzc0FmayB9IH0pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QWZrT3ZlcmxheShjb3VudERvd24sIGRpc21pc3NBZmspXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnYWZrV2FybmluZ1VwZGF0ZScsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IGNvdW50RG93biB9IH0pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5hZmtPdmVybGF5LnVwZGF0ZUNvdW50ZG93bihjb3VudERvd24pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnYWZrV2FybmluZ0RlYWN0aXZhdGUnLFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5hZmtPdmVybGF5LmhpZGUoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCdhZmtUaW1lZE91dCcsICgpID0+XG4gICAgICAgICAgICB0aGlzLmFma092ZXJsYXkuaGlkZSgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAndmlkZW9FbmNvZGVyQXZnUVAnLFxuICAgICAgICAgICAgKHsgZGF0YTogeyBhdmdRUCB9IH0pID0+IHRoaXMub25WaWRlb0VuY29kZXJBdmdRUChhdmdRUClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignd2ViUnRjU2RwJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25XZWJSdGNTZHAoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCd3ZWJSdGNBdXRvQ29ubmVjdCcsICgpID0+XG4gICAgICAgICAgICB0aGlzLm9uV2ViUnRjQXV0b0Nvbm5lY3QoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCd3ZWJSdGNDb25uZWN0aW5nJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25XZWJSdGNDb25uZWN0aW5nKClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcignd2ViUnRjQ29ubmVjdGVkJywgKCkgPT5cbiAgICAgICAgICAgIHRoaXMub25XZWJSdGNDb25uZWN0ZWQoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKCd3ZWJSdGNGYWlsZWQnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5vbldlYlJ0Y0ZhaWxlZCgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnd2ViUnRjRGlzY29ubmVjdGVkJyxcbiAgICAgICAgICAgICh7IGRhdGE6IHsgZXZlbnRTdHJpbmcsIGFsbG93Q2xpY2tUb1JlY29ubmVjdCB9IH0pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRpc2Nvbm5lY3QoZXZlbnRTdHJpbmcsIGFsbG93Q2xpY2tUb1JlY29ubmVjdClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcigndmlkZW9Jbml0aWFsaXplZCcsICgpID0+XG4gICAgICAgICAgICB0aGlzLm9uVmlkZW9Jbml0aWFsaXplZCgpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3N0cmVhbUxvYWRpbmcnLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5vblN0cmVhbUxvYWRpbmcoKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3BsYXlTdHJlYW1FcnJvcicsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IG1lc3NhZ2UgfSB9KSA9PiB0aGlzLm9uUGxheVN0cmVhbUVycm9yKG1lc3NhZ2UpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlTdHJlYW0nLCAoKSA9PlxuICAgICAgICAgICAgdGhpcy5vblBsYXlTdHJlYW0oKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3BsYXlTdHJlYW1SZWplY3RlZCcsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IHJlYXNvbiB9IH0pID0+IHRoaXMub25QbGF5U3RyZWFtUmVqZWN0ZWQocmVhc29uKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2xvYWRGcmVlemVGcmFtZScsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IHNob3VsZFNob3dQbGF5T3ZlcmxheSB9IH0pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvYWRGcmVlemVGcmFtZShzaG91bGRTaG93UGxheU92ZXJsYXkpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnc3RhdHNSZWNlaXZlZCcsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IGFnZ3JlZ2F0ZWRTdGF0cyB9IH0pID0+XG4gICAgICAgICAgICAgICAgdGhpcy5vblN0YXRzUmVjZWl2ZWQoYWdncmVnYXRlZFN0YXRzKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2xhdGVuY3lUZXN0UmVzdWx0JyxcbiAgICAgICAgICAgICh7IGRhdGE6IHsgbGF0ZW5jeVRpbWluZ3MgfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMub25MYXRlbmN5VGVzdFJlc3VsdHMobGF0ZW5jeVRpbWluZ3MpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnZGF0YUNoYW5uZWxMYXRlbmN5VGVzdFJlc3VsdCcsXG4gICAgICAgICAgICAoe2RhdGE6IHsgcmVzdWx0IH0gfSkgPT5cbiAgICAgICAgICAgICAgICB0aGlzLm9uRGF0YUNoYW5uZWxMYXRlbmN5VGVzdFJlc3VsdHMocmVzdWx0KVxuICAgICAgICApXG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnc3RyZWFtZXJMaXN0TWVzc2FnZScsXG4gICAgICAgICAgICAoeyBkYXRhOiB7IG1lc3NhZ2VTdHJlYW1lckxpc3QsIGF1dG9TZWxlY3RlZFN0cmVhbWVySWQsIHdhbnRlZFN0cmVhbWVySWQgfSB9KSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3RyZWFtZXJMaXN0TWVzc2FnZShtZXNzYWdlU3RyZWFtZXJMaXN0LCBhdXRvU2VsZWN0ZWRTdHJlYW1lcklkLCB3YW50ZWRTdHJlYW1lcklkKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0cmVhbS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3NldHRpbmdzQ2hhbmdlZCcsXG4gICAgICAgICAgICAoZXZlbnQpID0+IHRoaXMuY29uZmlnVUkub25TZXR0aW5nc0NoYW5nZWQoZXZlbnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3RyZWFtLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAncGxheWVyQ291bnQnLCBcbiAgICAgICAgICAgICh7IGRhdGE6IHsgY291bnQgfX0pID0+IFxuICAgICAgICAgICAgICAgIHRoaXMub25QbGF5ZXJDb3VudChjb3VudClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zdHJlYW0uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICd3ZWJSdGNUQ1BSZWxheURldGVjdGVkJywgXG4gICAgICAgICAgICAoe30pID0+IFxuICAgICAgICAgICAgICAgIExvZ2dlci5XYXJuaW5nKFxuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLFxuICAgICAgICAgICAgICAgICAgICBgU3RyZWFtIHF1YWlsdHkgZGVncmFkZWQgZHVlIHRvIG5ldHdvcmsgZW52aXJvbWVudCwgc3RyZWFtIGlzIHJlbGF5ZWQgb3ZlciBUQ1AuYFxuICAgICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIHJvb3RFbGVtZW50IG9mIHRoZSBhcHBsaWNhdGlvbiwgdmlkZW8gc3RyZWFtIGFuZCBhbGwgVUkgYXJlIGNoaWxkcmVuIG9mIHRoaXMgZWxlbWVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ3BsYXllclVJJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ25vc2VsZWN0Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbS52aWRlb0VsZW1lbnRQYXJlbnRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnVpRmVhdHVyZXNFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgZWxlbWVudCB0aGF0IGNvbnRhaW5zIGFsbCB0aGUgVUkgZmVhdHVyZXMsIGxpa2UgdGhlIHN0YXRzIGFuZCBzZXR0aW5ncyBwYW5lbHMuXG4gICAgICovXG4gICAgcHVibGljIGdldCB1aUZlYXR1cmVzRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fdWlGZWF0dXJlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fdWlGZWF0dXJlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fdWlGZWF0dXJlRWxlbWVudC5pZCA9ICd1aUZlYXR1cmVzJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fdWlGZWF0dXJlRWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgZGlzY29ubmVjdCBvdmVybGF5XG4gICAgICogQHBhcmFtIHVwZGF0ZVRleHQgLSB0aGUgdGV4dCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGluIHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgc2hvd0Rpc2Nvbm5lY3RPdmVybGF5KHVwZGF0ZVRleHQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLmhpZGVDdXJyZW50T3ZlcmxheSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURpc2Nvbm5lY3RPdmVybGF5KHVwZGF0ZVRleHQpO1xuICAgICAgICB0aGlzLmRpc2Nvbm5lY3RPdmVybGF5LnNob3coKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheSA9IHRoaXMuZGlzY29ubmVjdE92ZXJsYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBkaXNjb25uZWN0IG92ZXJsYXlzIHNwYW4gdGV4dFxuICAgICAqIEBwYXJhbSB1cGRhdGVUZXh0IC0gdGhlIG5ldyBjb3VudGRvd24gbnVtYmVyXG4gICAgICovXG4gICAgdXBkYXRlRGlzY29ubmVjdE92ZXJsYXkodXBkYXRlVGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdE92ZXJsYXkudXBkYXRlKHVwZGF0ZVRleHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFjdGl2YXRlcyB0aGUgZGlzY29ubmVjdCBvdmVybGF5cyBhY3Rpb25cbiAgICAgKi9cbiAgICBvbkRpc2Nvbm5lY3Rpb25BY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdE92ZXJsYXkuYWN0aXZhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgY3VycmVudCBvdmVybGF5XG4gICAgICovXG4gICAgaGlkZUN1cnJlbnRPdmVybGF5KCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50T3ZlcmxheSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5LmhpZGUoKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE92ZXJsYXkgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIGNvbm5lY3Qgb3ZlcmxheVxuICAgICAqL1xuICAgIHNob3dDb25uZWN0T3ZlcmxheSgpIHtcbiAgICAgICAgdGhpcy5oaWRlQ3VycmVudE92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy5jb25uZWN0T3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHRoaXMuY3VycmVudE92ZXJsYXkgPSB0aGlzLmNvbm5lY3RPdmVybGF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBwbGF5IG92ZXJsYXlcbiAgICAgKi9cbiAgICBzaG93UGxheU92ZXJsYXkoKSB7XG4gICAgICAgIHRoaXMuaGlkZUN1cnJlbnRPdmVybGF5KCk7XG4gICAgICAgIHRoaXMucGxheU92ZXJsYXkuc2hvdygpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5ID0gdGhpcy5wbGF5T3ZlcmxheTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgdGV4dCBvdmVybGF5XG4gICAgICogQHBhcmFtIHRleHQgLSB0aGUgdGV4dCB0aGF0IHdpbGwgYmUgc2hvd24gaW4gdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBzaG93VGV4dE92ZXJsYXkodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaGlkZUN1cnJlbnRPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuaW5mb092ZXJsYXkudXBkYXRlKHRleHQpO1xuICAgICAgICB0aGlzLmluZm9PdmVybGF5LnNob3coKTtcbiAgICAgICAgdGhpcy5jdXJyZW50T3ZlcmxheSA9IHRoaXMuaW5mb092ZXJsYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIGVycm9yIG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gdGV4dCAtIHRoZSB0ZXh0IHRoYXQgd2lsbCBiZSBzaG93biBpbiB0aGUgb3ZlcmxheVxuICAgICAqL1xuICAgIHNob3dFcnJvck92ZXJsYXkodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuaGlkZUN1cnJlbnRPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuZXJyb3JPdmVybGF5LnVwZGF0ZSh0ZXh0KTtcbiAgICAgICAgdGhpcy5lcnJvck92ZXJsYXkuc2hvdygpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5ID0gdGhpcy5lcnJvck92ZXJsYXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3Mgb3IgaGlkZXMgdGhlIHNldHRpbmdzIHBhbmVsIGlmIGNsaWNrZWRcbiAgICAgKi9cbiAgICBzZXR0aW5nc0NsaWNrZWQoKSB7XG4gICAgICAgIHRoaXMuc3RhdHNQYW5lbD8uaGlkZSgpO1xuICAgICAgICB0aGlzLnNldHRpbmdzUGFuZWwudG9nZ2xlVmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIG9yIGhpZGVzIHRoZSBzdGF0cyBwYW5lbCBpZiBjbGlja2VkXG4gICAgICovXG4gICAgc3RhdHNDbGlja2VkKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzUGFuZWw/LmhpZGUoKTtcbiAgICAgICAgdGhpcy5zdGF0c1BhbmVsLnRvZ2dsZVZpc2liaWxpdHkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZXMgdGhlIGNvbm5lY3Qgb3ZlcmxheXMgYWN0aW9uXG4gICAgICovXG4gICAgb25Db25uZWN0QWN0aW9uKCkge1xuICAgICAgICB0aGlzLmNvbm5lY3RPdmVybGF5LmFjdGl2YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWN0aXZhdGVzIHRoZSBwbGF5IG92ZXJsYXlzIGFjdGlvblxuICAgICAqL1xuICAgIG9uUGxheUFjdGlvbigpIHtcbiAgICAgICAgdGhpcy5wbGF5T3ZlcmxheS5hY3RpdmF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3dzIHRoZSBhZmsgb3ZlcmxheVxuICAgICAqIEBwYXJhbSBjb3VudERvd24gLSB0aGUgY291bnRkb3duIG51bWJlciBmb3IgdGhlIGFmayBjb3VudGRvd25cbiAgICAgKi9cbiAgICBzaG93QWZrT3ZlcmxheShjb3VudERvd246IG51bWJlciwgZGlzbWlzc0FmazogKCkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLmhpZGVDdXJyZW50T3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmFma092ZXJsYXkudXBkYXRlQ291bnRkb3duKGNvdW50RG93bik7XG4gICAgICAgIHRoaXMuYWZrT3ZlcmxheS5vbkFjdGlvbigoKSA9PiBkaXNtaXNzQWZrKCkpO1xuICAgICAgICB0aGlzLmFma092ZXJsYXkuc2hvdygpO1xuICAgICAgICB0aGlzLmN1cnJlbnRPdmVybGF5ID0gdGhpcy5hZmtPdmVybGF5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3cgdGhlIENvbm5lY3QgT3ZlcmxheSBvciBhdXRvIGNvbm5lY3RcbiAgICAgKi9cbiAgICBzaG93Q29ubmVjdE9yQXV0b0Nvbm5lY3RPdmVybGF5cygpIHtcbiAgICAgICAgLy8gc2V0IHVwIGlmIHRoZSBhdXRvIHBsYXkgd2lsbCBiZSB1c2VkIG9yIHJlZ3VsYXIgY2xpY2sgdG8gc3RhcnRcbiAgICAgICAgaWYgKCF0aGlzLnN0cmVhbS5jb25maWcuaXNGbGFnRW5hYmxlZChGbGFncy5BdXRvQ29ubmVjdCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Nvbm5lY3RPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSB3ZWJSdGNBdXRvQ29ubmVjdCBPdmVybGF5IGFuZCBjb25uZWN0XG4gICAgICovXG4gICAgb25XZWJSdGNBdXRvQ29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5zaG93VGV4dE92ZXJsYXkoJ0F1dG8gQ29ubmVjdGluZyBOb3cnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgZnVuY3Rpb25hbGl0eSB0byBoYXBwZW4gd2hlbiByZWNlaXZpbmcgYSB3ZWJSVEMgYW5zd2VyXG4gICAgICovXG4gICAgb25XZWJSdGNTZHAoKSB7XG4gICAgICAgIHRoaXMuc2hvd1RleHRPdmVybGF5KCdXZWJSVEMgQ29ubmVjdGlvbiBOZWdvdGlhdGVkJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgYSB0ZXh0IG92ZXJsYXkgdG8gYWxlcnQgdGhlIHVzZXIgdGhlIHN0cmVhbSBpcyBjdXJyZW50bHkgbG9hZGluZ1xuICAgICAqL1xuICAgIG9uU3RyZWFtTG9hZGluZygpIHtcbiAgICAgICAgLy8gYnVpbGQgdGhlIHNwaW5uZXIgc3BhblxuICAgICAgICBjb25zdCBzcGlubmVyU3BhbjogSFRNTFNwYW5FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzcGlubmVyU3Bhbi5jbGFzc05hbWUgPSAndmlzdWFsbHktaGlkZGVuJztcbiAgICAgICAgc3Bpbm5lclNwYW4uaW5uZXJIVE1MID0gJ0xvYWRpbmcuLi4nO1xuXG4gICAgICAgIC8vIGJ1aWxkIHRoZSBzcGlubmVyIGRpdlxuICAgICAgICBjb25zdCBzcGlubmVyRGl2OiBIVE1MRGl2RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzcGlubmVyRGl2LmlkID0gJ2xvYWRpbmctc3Bpbm5lcic7XG4gICAgICAgIHNwaW5uZXJEaXYuY2xhc3NOYW1lID0gJ3NwaW5uZXItYm9yZGVyIG1zLTInO1xuICAgICAgICBzcGlubmVyRGl2LnNldEF0dHJpYnV0ZSgncm9sZScsICdzdGF0dXMnKTtcblxuICAgICAgICAvLyBhcHBlbmQgdGhlIHNwaW5uZXIgdG8gdGhlIGVsZW1lbnRcbiAgICAgICAgc3Bpbm5lckRpdi5hcHBlbmRDaGlsZChzcGlubmVyU3Bhbik7XG5cbiAgICAgICAgdGhpcy5zaG93VGV4dE92ZXJsYXkoJ0xvYWRpbmcgU3RyZWFtICcgKyBzcGlubmVyRGl2Lm91dGVySFRNTCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXZlbnQgZmlyZWQgd2hlbiB0aGUgdmlkZW8gaXMgZGlzY29ubmVjdGVkIC0gZGlzcGxheXMgdGhlIGVycm9yIG92ZXJsYXkgYW5kIHJlc2V0cyB0aGUgYnV0dG9ucyBzdHJlYW0gdG9vbHMgdXBvbiBkaXNjb25uZWN0XG4gICAgICogQHBhcmFtIGV2ZW50U3RyaW5nIC0gdGhlIGV2ZW50IHRleHQgdGhhdCB3aWxsIGJlIHNob3duIGluIHRoZSBvdmVybGF5XG4gICAgICogQHBhcmFtIGFsbG93Q2xpY2tUb1JlY29ubmVjdCAtIHRydWUgaWYgd2Ugd2FudCB0byBhbGxvdyB0aGUgdXNlciB0byBjbGljayB0byByZWNvbm5lY3QuIE90aGVyd2lzZSBpdCdzIGp1c3QgYSBtZXNzYWdlLlxuICAgICAqL1xuICAgIG9uRGlzY29ubmVjdChldmVudFN0cmluZzogc3RyaW5nLCBhbGxvd0NsaWNrVG9SZWNvbm5lY3Q6IGJvb2xlYW4pIHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheU1lc3NhZ2UgPSAnRGlzY29ubmVjdGVkJyArIChldmVudFN0cmluZyA/IGA6ICR7ZXZlbnRTdHJpbmd9YCA6ICcnKTtcbiAgICAgICAgaWYgKGFsbG93Q2xpY2tUb1JlY29ubmVjdCkge1xuICAgICAgICAgICAgdGhpcy5zaG93RGlzY29ubmVjdE92ZXJsYXkoYCR7b3ZlcmxheU1lc3NhZ2V9IENsaWNrIFRvIFJlc3RhcnQuYCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvck92ZXJsYXkob3ZlcmxheU1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRpc2FibGUgc3RhcnRpbmcgYSBsYXRlbmN5IGNoZWNrc1xuICAgICAgICB0aGlzLnN0YXRzUGFuZWw/Lm9uRGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgd2hlbiBXZWIgUnRjIGlzIGNvbm5lY3RpbmdcbiAgICAgKi9cbiAgICBvbldlYlJ0Y0Nvbm5lY3RpbmcoKSB7XG4gICAgICAgIHRoaXMuc2hvd1RleHRPdmVybGF5KCdTdGFydGluZyBjb25uZWN0aW9uIHRvIHNlcnZlciwgcGxlYXNlIHdhaXQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIHdoZW4gV2ViIFJ0YyBoYXMgY29ubmVjdGVkXG4gICAgICovXG4gICAgb25XZWJSdGNDb25uZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuc2hvd1RleHRPdmVybGF5KCdXZWJSVEMgY29ubmVjdGVkLCB3YWl0aW5nIGZvciB2aWRlbycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgd2hlbiBXZWIgUnRjIGZhaWxzIHRvIGNvbm5lY3RcbiAgICAgKi9cbiAgICBvbldlYlJ0Y0ZhaWxlZCgpIHtcbiAgICAgICAgdGhpcy5zaG93RXJyb3JPdmVybGF5KCdVbmFibGUgdG8gc2V0dXAgdmlkZW8nKTtcbiAgICB9XG5cbiAgICBvbkxvYWRGcmVlemVGcmFtZShzaG91bGRTaG93UGxheU92ZXJsYXk6IGJvb2xlYW4pIHtcbiAgICAgICAgaWYgKHNob3VsZFNob3dQbGF5T3ZlcmxheSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgTG9nZ2VyLkxvZyhMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLCAnc2hvd2luZyBwbGF5IG92ZXJsYXknKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1BsYXlPdmVybGF5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblBsYXlTdHJlYW0oKSB7XG4gICAgICAgIHRoaXMuaGlkZUN1cnJlbnRPdmVybGF5KCk7XG4gICAgfVxuXG4gICAgb25QbGF5U3RyZWFtRXJyb3IobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2hvd0Vycm9yT3ZlcmxheShtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBvblBsYXlTdHJlYW1SZWplY3RlZChvblJlamVjdGVkUmVhc29uOiB1bmtub3duKSB7XG4gICAgICAgIHRoaXMuc2hvd1BsYXlPdmVybGF5KCk7XG4gICAgfVxuXG4gICAgb25WaWRlb0luaXRpYWxpemVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuc3RyZWFtLmNvbmZpZy5pc0ZsYWdFbmFibGVkKEZsYWdzLkF1dG9QbGF5VmlkZW8pKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dQbGF5T3ZlcmxheSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhdHNQYW5lbD8ub25WaWRlb0luaXRpYWxpemVkKHRoaXMuc3RyZWFtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdXAgZnVuY3Rpb25hbGl0eSB0byBoYXBwZW4gd2hlbiBjYWxjdWxhdGluZyB0aGUgYXZlcmFnZSB2aWRlbyBlbmNvZGVyIHFwXG4gICAgICogQHBhcmFtIFFQIC0gdGhlIHF1YWxpdHkgbnVtYmVyIG9mIHRoZSBzdHJlYW1cbiAgICAgKi9cbiAgICBvblZpZGVvRW5jb2RlckF2Z1FQKFFQOiBudW1iZXIpIHtcbiAgICAgICAgLy8gVXBkYXRlIGludGVybmFsIFFQIGluZGljYXRvciBpZiBvbmUgaXMgcHJlc2VudFxuICAgICAgICBpZiAoISF0aGlzLnZpZGVvUXBJbmRpY2F0b3IpIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9RcEluZGljYXRvci51cGRhdGVRcFRvb2x0aXAoUVApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Jbml0aWFsU2V0dGluZ3Moc2V0dGluZ3M6IEluaXRpYWxTZXR0aW5ncykge1xuICAgICAgICBpZiAoc2V0dGluZ3MuUGl4ZWxTdHJlYW1pbmdTZXR0aW5ncykge1xuICAgICAgICAgICAgdGhpcy5zdGF0c1BhbmVsPy5jb25maWd1cmUoc2V0dGluZ3MuUGl4ZWxTdHJlYW1pbmdTZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblN0YXRzUmVjZWl2ZWQoYWdncmVnYXRlZFN0YXRzOiBBZ2dyZWdhdGVkU3RhdHMpIHtcbiAgICAgICAgLy8gR3JhYiBhbGwgc3RhdHMgd2UgY2FuIG9mZiB0aGUgYWdncmVnYXRlZCBzdGF0c1xuICAgICAgICB0aGlzLnN0YXRzUGFuZWw/LmhhbmRsZVN0YXRzKGFnZ3JlZ2F0ZWRTdGF0cyk7XG4gICAgfVxuXG4gICAgb25MYXRlbmN5VGVzdFJlc3VsdHMobGF0ZW5jeVRpbWluZ3M6IExhdGVuY3lUZXN0UmVzdWx0cykge1xuICAgICAgICB0aGlzLnN0YXRzUGFuZWw/LmxhdGVuY3lUZXN0LmhhbmRsZVRlc3RSZXN1bHQobGF0ZW5jeVRpbWluZ3MpO1xuICAgIH1cblxuICAgIG9uRGF0YUNoYW5uZWxMYXRlbmN5VGVzdFJlc3VsdHMocmVzdWx0OiBEYXRhQ2hhbm5lbExhdGVuY3lUZXN0UmVzdWx0KSB7XG4gICAgICAgIHRoaXMuc3RhdHNQYW5lbD8uZGF0YUNoYW5uZWxMYXRlbmN5VGVzdC5oYW5kbGVUZXN0UmVzdWx0KHJlc3VsdCk7XG4gICAgfVxuXG4gICAgb25QbGF5ZXJDb3VudChwbGF5ZXJDb3VudDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuc3RhdHNQYW5lbD8uaGFuZGxlUGxheWVyQ291bnQocGxheWVyQ291bnQpO1xuICAgIH1cblxuICAgIGhhbmRsZVN0cmVhbWVyTGlzdE1lc3NhZ2UobWVzc2FnZVN0cmVhbWluZ0xpc3Q6IE1lc3NhZ2VTdHJlYW1lckxpc3QsIGF1dG9TZWxlY3RlZFN0cmVhbWVySWQ6IHN0cmluZywgd2FudGVkU3RyZWFtZXJJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IHdhaXRGb3JTdHJlYW1lciA9IHRoaXMuc3RyZWFtLmNvbmZpZy5pc0ZsYWdFbmFibGVkKEZsYWdzLldhaXRGb3JTdHJlYW1lcik7XG4gICAgICAgIGNvbnN0IGlzUmVjb25uZWN0aW5nID0gdGhpcy5zdHJlYW0uaXNSZWNvbm5lY3RpbmcoKTtcbiAgICAgICAgbGV0IG1lc3NhZ2U6IHN0cmluZyA9IG51bGw7XG4gICAgICAgIGxldCBhbGxvd1Jlc3RhcnQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgICAgIGlmICghYXV0b1NlbGVjdGVkU3RyZWFtZXJJZCkge1xuICAgICAgICAgICAgaWYgKHdhaXRGb3JTdHJlYW1lciAmJiB3YW50ZWRTdHJlYW1lcklkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUmVjb25uZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgV2FpdGluZyBmb3IgJHt3YW50ZWRTdHJlYW1lcklkfSB0byBiZWNvbWUgYXZhaWxhYmxlLmA7XG4gICAgICAgICAgICAgICAgICAgIGFsbG93UmVzdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgR2F2ZSB1cCB3YWl0aW5nIGZvciAke3dhbnRlZFN0cmVhbWVySWR9IHRvIGJlY29tZSBhdmFpbGFibGUuIENsaWNrIHRvIHRyeSBhZ2FpbmA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlU3RyZWFtaW5nTGlzdC5pZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSArPSBgIG9yIHNlbGVjdCBhIHN0cmVhbWVyIGZyb20gdGhlIHNldHRpbmdzIG1lbnUuYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhbGxvd1Jlc3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZVN0cmVhbWluZ0xpc3QuaWRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUmVjb25uZWN0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgV2FpdGluZyBmb3IgYSBzdHJlYW1lciB0byBiZWNvbWUgYXZhaWxhYmxlLmA7XG4gICAgICAgICAgICAgICAgICAgIGFsbG93UmVzdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSBgTm8gc3RyZWFtZXJzIGF2YWlsYWJsZS4gQ2xpY2sgdG8gdHJ5IGFnYWluLmA7XG4gICAgICAgICAgICAgICAgICAgIGFsbG93UmVzdGFydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gYE11bHRpcGxlIHN0cmVhbWVycyBhdmFpbGFibGUuIFNlbGVjdCBvbmUgZnJvbSB0aGUgc2V0dGluZ3MgbWVudS5gO1xuICAgICAgICAgICAgICAgIGFsbG93UmVzdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWxsb3dSZXN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RGlzY29ubmVjdE92ZXJsYXkobWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1RleHRPdmVybGF5KG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGxpZ2h0L2RhcmsgY29sb3IgbW9kZVxuICAgICAqIEBwYXJhbSBpc0xpZ2h0TW9kZSAtIHNob3VsZCB3ZSB1c2UgYSBsaWdodCBvciBkYXJrIGNvbG9yIHNjaGVtZVxuICAgICAqL1xuICAgIHNldENvbG9yTW9kZShpc0xpZ2h0TW9kZTogYm9vbGVhbikge1xuICAgICAgICBpZiAodGhpcy5vbkNvbG9yTW9kZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMub25Db2xvck1vZGVDaGFuZ2VkKGlzTGlnaHRNb2RlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7XG4gICAgQ29uZmlnLFxuICAgIEZsYWdzSWRzLFxuICAgIE51bWVyaWNQYXJhbWV0ZXJzSWRzLFxuICAgIE9wdGlvblBhcmFtZXRlcnNJZHMsXG4gICAgVGV4dFBhcmFtZXRlcnNJZHMsXG4gICAgVGV4dFBhcmFtZXRlcnMsXG4gICAgT3B0aW9uUGFyYW1ldGVycyxcbiAgICBGbGFncyxcbiAgICBOdW1lcmljUGFyYW1ldGVycyxcbiAgICBTZXR0aW5nc0NoYW5nZWRFdmVudCxcbiAgICBTZXR0aW5nRmxhZyxcbiAgICBTZXR0aW5nTnVtYmVyLFxuICAgIFNldHRpbmdUZXh0LFxuICAgIFNldHRpbmdPcHRpb24sXG4gICAgTG9nZ2VyLFxuICAgIFNldHRpbmdCYXNlXG59IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjQnO1xuaW1wb3J0IHsgU2V0dGluZ1VJRmxhZyB9IGZyb20gJy4vU2V0dGluZ1VJRmxhZyc7XG5pbXBvcnQgeyBTZXR0aW5nVUlOdW1iZXIgfSBmcm9tICcuL1NldHRpbmdVSU51bWJlcic7XG5pbXBvcnQgeyBTZXR0aW5nVUlUZXh0IH0gZnJvbSAnLi9TZXR0aW5nVUlUZXh0JztcbmltcG9ydCB7IFNldHRpbmdVSU9wdGlvbiB9IGZyb20gJy4vU2V0dGluZ1VJT3B0aW9uJztcblxuZXhwb3J0IGNvbnN0IExpZ2h0TW9kZSA9ICdMaWdodE1vZGUnIGFzIGNvbnN0O1xudHlwZSBFeHRyYUZsYWdzID0gdHlwZW9mIExpZ2h0TW9kZTtcbmV4cG9ydCB0eXBlIEZsYWdzSWRzRXh0ZW5kZWQgPSBGbGFnc0lkcyB8IEV4dHJhRmxhZ3M7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdVSSB7XG4gICAgcHJpdmF0ZSBjdXN0b21GbGFncyA9IG5ldyBNYXA8XG4gICAgICAgIEZsYWdzSWRzRXh0ZW5kZWQsXG4gICAgICAgIFNldHRpbmdGbGFnPEZsYWdzSWRzRXh0ZW5kZWQ+XG4gICAgPigpO1xuXG4gICAgLyogQSBtYXAgb2YgZmxhZ3MgdGhhdCBjYW4gYmUgdG9nZ2xlZCAtIG9wdGlvbnMgdGhhdCBjYW4gYmUgc2V0IGluIHRoZSBhcHBsaWNhdGlvbiAtIGUuZy4gVXNlIE1pYz8gKi9cbiAgICBwcml2YXRlIGZsYWdzVWkgPSBuZXcgTWFwPFxuICAgICAgICBGbGFnc0lkc0V4dGVuZGVkLFxuICAgICAgICBTZXR0aW5nVUlGbGFnPEZsYWdzSWRzRXh0ZW5kZWQ+XG4gICAgPigpO1xuXG4gICAgLyogQSBtYXAgb2YgbnVtZXJpY2FsIHNldHRpbmdzIC0gb3B0aW9ucyB0aGF0IGNhbiBiZSBpbiB0aGUgYXBwbGljYXRpb24gLSBlLmcuIE1pbkJpdHJhdGUgKi9cbiAgICBwcml2YXRlIG51bWVyaWNQYXJhbWV0ZXJzVWkgPSBuZXcgTWFwPFxuICAgICAgICBOdW1lcmljUGFyYW1ldGVyc0lkcyxcbiAgICAgICAgU2V0dGluZ1VJTnVtYmVyXG4gICAgPigpO1xuXG4gICAgLyogQSBtYXAgb2YgdGV4dCBzZXR0aW5ncyAtIGUuZy4gc2lnbmFsbGluZyBzZXJ2ZXIgdXJsICovXG4gICAgcHJpdmF0ZSB0ZXh0UGFyYW1ldGVyc1VpID0gbmV3IE1hcDxUZXh0UGFyYW1ldGVyc0lkcywgU2V0dGluZ1VJVGV4dD4oKTtcblxuICAgIC8qIEEgbWFwIG9mIGVudW0gYmFzZWQgc2V0dGluZ3MgLSBlLmcuIHByZWZlcnJlZCBjb2RlYyAqL1xuICAgIHByaXZhdGUgb3B0aW9uUGFyYW1ldGVyc1VpID0gbmV3IE1hcDxcbiAgICAgICAgT3B0aW9uUGFyYW1ldGVyc0lkcyxcbiAgICAgICAgU2V0dGluZ1VJT3B0aW9uXG4gICAgPigpO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tIFNldHRpbmdzIC0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc6IENvbmZpZykge1xuICAgICAgICB0aGlzLmNyZWF0ZUN1c3RvbVVJU2V0dGluZ3MoY29uZmlnLnVzZVVybFBhcmFtcyk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJTZXR0aW5nc1VJQ29tcG9uZW50cyhjb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBjdXN0b20gVUkgc2V0dGluZ3MgdGhhdCBhcmUgbm90IHByb3ZpZGVkIGJ5IHRoZSBQaXhlbCBTdHJlYW1pbmcgbGlicmFyeS5cbiAgICAgKi9cbiAgICBjcmVhdGVDdXN0b21VSVNldHRpbmdzKHVzZVVybFBhcmFtczogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmN1c3RvbUZsYWdzLnNldChcbiAgICAgICAgICAgIExpZ2h0TW9kZSxcbiAgICAgICAgICAgIG5ldyBTZXR0aW5nRmxhZzxGbGFnc0lkc0V4dGVuZGVkPihcbiAgICAgICAgICAgICAgICBMaWdodE1vZGUsXG4gICAgICAgICAgICAgICAgJ0NvbG9yIFNjaGVtZTogRGFyayBNb2RlJyxcbiAgICAgICAgICAgICAgICAnUGFnZSBzdHlsaW5nIHdpbGwgYmUgZWl0aGVyIGxpZ2h0IG9yIGRhcmsnLFxuICAgICAgICAgICAgICAgIGZhbHNlIC8qaWYgd2FudCB0byB1c2Ugc3lzdGVtIHByZWY6ICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCknKS5tYXRjaGVzKSovLFxuICAgICAgICAgICAgICAgIHVzZVVybFBhcmFtcyxcbiAgICAgICAgICAgICAgICAoaXNMaWdodE1vZGU6IGJvb2xlYW4sIHNldHRpbmc6IFNldHRpbmdCYXNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcubGFiZWwgPSBgQ29sb3IgU2NoZW1lOiAke2lzTGlnaHRNb2RlID8gJ0xpZ2h0JyA6ICdEYXJrJ30gTW9kZWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgVUkgd3JhcHBlciBjb21wb25lbnRzIGZvciBlYWNoIHNldHRpbmcgZWxlbWVudCBpbiBjb25maWcuXG4gICAgICogQHBhcmFtIGNvbmZpZ1xuICAgICAqL1xuICAgIHJlZ2lzdGVyU2V0dGluZ3NVSUNvbXBvbmVudHMoY29uZmlnOiBDb25maWcpIHtcbiAgICAgICAgZm9yIChjb25zdCBzZXR0aW5nIG9mIGNvbmZpZy5nZXRGbGFncygpKSB7XG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuc2V0KHNldHRpbmcuaWQsIG5ldyBTZXR0aW5nVUlGbGFnKHNldHRpbmcpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IHNldHRpbmcgb2YgQXJyYXkuZnJvbSh0aGlzLmN1c3RvbUZsYWdzLnZhbHVlcygpKSkge1xuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLnNldChcbiAgICAgICAgICAgICAgICBzZXR0aW5nLmlkLFxuICAgICAgICAgICAgICAgIG5ldyBTZXR0aW5nVUlGbGFnPEZsYWdzSWRzRXh0ZW5kZWQ+KHNldHRpbmcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgc2V0dGluZyBvZiBjb25maWcuZ2V0VGV4dFNldHRpbmdzKCkpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dFBhcmFtZXRlcnNVaS5zZXQoc2V0dGluZy5pZCwgbmV3IFNldHRpbmdVSVRleHQoc2V0dGluZykpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgc2V0dGluZyBvZiBjb25maWcuZ2V0TnVtZXJpY1NldHRpbmdzKCkpIHtcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5zZXQoXG4gICAgICAgICAgICAgICAgc2V0dGluZy5pZCxcbiAgICAgICAgICAgICAgICBuZXcgU2V0dGluZ1VJTnVtYmVyKHNldHRpbmcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qgc2V0dGluZyBvZiBjb25maWcuZ2V0T3B0aW9uU2V0dGluZ3MoKSkge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25QYXJhbWV0ZXJzVWkuc2V0KFxuICAgICAgICAgICAgICAgIHNldHRpbmcuaWQsXG4gICAgICAgICAgICAgICAgbmV3IFNldHRpbmdVSU9wdGlvbihzZXR0aW5nKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2UgRE9NIGVsZW1lbnRzIGZvciBhIHNldHRpbmdzIHNlY3Rpb24gd2l0aCBhIGhlYWRpbmcuXG4gICAgICogQHBhcmFtIHNldHRpbmdzRWxlbSBUaGUgcGFyZW50IGNvbnRhaW5lciBmb3Igb3VyIERPTSBlbGVtZW50cy5cbiAgICAgKiBAcGFyYW0gc2VjdGlvbkhlYWRpbmcgVGhlIGhlYWRpbmcgZWxlbWVudCB0byBnbyBpbnRvIHRoZSBzZWN0aW9uLlxuICAgICAqIEByZXR1cm5zIFRoZSBjb25zdHJ1Y3RlZCBET00gZWxlbWVudCBmb3IgdGhlIHNlY3Rpb24uXG4gICAgICovXG4gICAgYnVpbGRTZWN0aW9uV2l0aEhlYWRpbmcoc2V0dGluZ3NFbGVtOiBIVE1MRWxlbWVudCwgc2VjdGlvbkhlYWRpbmc6IHN0cmluZykge1xuICAgICAgICAvLyBtYWtlIHNlY3Rpb24gZWxlbWVudFxuICAgICAgICBjb25zdCBzZWN0aW9uRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgc2VjdGlvbkVsZW0uY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NDb250YWluZXInKTtcblxuICAgICAgICAvLyBtYWtlIHNlY3Rpb24gaGVhZGluZ1xuICAgICAgICBjb25zdCBwc1NldHRpbmdzSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBzU2V0dGluZ3NIZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NIZWFkZXInKTtcbiAgICAgICAgcHNTZXR0aW5nc0hlYWRlci5jbGFzc0xpc3QuYWRkKCdzZXR0aW5ncy10ZXh0Jyk7XG4gICAgICAgIHBzU2V0dGluZ3NIZWFkZXIudGV4dENvbnRlbnQgPSBzZWN0aW9uSGVhZGluZztcblxuICAgICAgICAvLyBhZGQgc2VjdGlvbiBhbmQgaGVhZGluZyB0byBwYXJlbnQgc2V0dGluZ3MgZWxlbWVudFxuICAgICAgICBzZWN0aW9uRWxlbS5hcHBlbmRDaGlsZChwc1NldHRpbmdzSGVhZGVyKTtcbiAgICAgICAgc2V0dGluZ3NFbGVtLmFwcGVuZENoaWxkKHNlY3Rpb25FbGVtKTtcbiAgICAgICAgcmV0dXJuIHNlY3Rpb25FbGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHVwIGZsYWdzIHdpdGggdGhlaXIgZGVmYXVsdCB2YWx1ZXMgYW5kIGFkZCB0aGVtIHRvIHRoZSBgQ29uZmlnLmZsYWdzYCBtYXAuXG4gICAgICogQHBhcmFtIHNldHRpbmdzRWxlbSAtIFRoZSBlbGVtZW50IHRoYXQgY29udGFpbnMgYWxsIHRoZSBpbmRpdmlkdWFsIHNldHRpbmdzIHNlY3Rpb25zLCBmbGFncywgYW5kIHNvIG9uLlxuICAgICAqL1xuICAgIHBvcHVsYXRlU2V0dGluZ3NFbGVtZW50KHNldHRpbmdzRWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgLyogU2V0dXAgYWxsIFBpeGVsIFN0cmVhbWluZyBzcGVjaWZpYyBzZXR0aW5ncyAqL1xuICAgICAgICBjb25zdCBwc1NldHRpbmdzU2VjdGlvbiA9IHRoaXMuYnVpbGRTZWN0aW9uV2l0aEhlYWRpbmcoXG4gICAgICAgICAgICBzZXR0aW5nc0VsZW0sXG4gICAgICAgICAgICAnUGl4ZWwgU3RyZWFtaW5nJ1xuICAgICAgICApO1xuXG4gICAgICAgIC8vIG1ha2Ugc2V0dGluZ3Mgc2hvdyB1cCBpbiBET01cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nVGV4dChcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy50ZXh0UGFyYW1ldGVyc1VpLmdldChUZXh0UGFyYW1ldGVycy5TaWduYWxsaW5nU2VydmVyVXJsKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdPcHRpb24oXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMub3B0aW9uUGFyYW1ldGVyc1VpLmdldChPcHRpb25QYXJhbWV0ZXJzLlN0cmVhbWVySWQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuQXV0b0Nvbm5lY3QpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuQXV0b1BsYXlWaWRlbylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5Ccm93c2VyU2VuZE9mZmVyKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sIFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5Vc2VNaWMpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuU3RhcnRWaWRlb011dGVkKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLklzUXVhbGl0eUNvbnRyb2xsZXIpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuRm9yY2VNb25vQXVkaW8pXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuRm9yY2VUVVJOKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLlN1cHByZXNzQnJvd3NlcktleXMpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBwc1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuQUZLRGV0ZWN0aW9uKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgcHNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLldhaXRGb3JTdHJlYW1lcilcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nTnVtZXJpYyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5BRktUaW1lb3V0U2VjcylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nTnVtZXJpYyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5NYXhSZWNvbm5lY3RBdHRlbXB0cylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nTnVtZXJpYyhcbiAgICAgICAgICAgIHBzU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5TdHJlYW1lckF1dG9Kb2luSW50ZXJ2YWwpXG4gICAgICAgICk7XG5cbiAgICAgICAgLyogU2V0dXAgYWxsIHZpZXcvdWkgcmVsYXRlZCBzZXR0aW5ncyB1bmRlciB0aGlzIHNlY3Rpb24gKi9cbiAgICAgICAgY29uc3Qgdmlld1NldHRpbmdzU2VjdGlvbiA9IHRoaXMuYnVpbGRTZWN0aW9uV2l0aEhlYWRpbmcoXG4gICAgICAgICAgICBzZXR0aW5nc0VsZW0sXG4gICAgICAgICAgICAnVUknXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICB2aWV3U2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5NYXRjaFZpZXdwb3J0UmVzb2x1dGlvbilcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgdmlld1NldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuSG92ZXJpbmdNb3VzZU1vZGUpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyh2aWV3U2V0dGluZ3NTZWN0aW9uLCB0aGlzLmZsYWdzVWkuZ2V0KExpZ2h0TW9kZSkpO1xuXG4gICAgICAgIC8qIFNldHVwIGFsbCBlbmNvZGVyIHJlbGF0ZWQgc2V0dGluZ3MgdW5kZXIgdGhpcyBzZWN0aW9uICovXG4gICAgICAgIGNvbnN0IGlucHV0U2V0dGluZ3NTZWN0aW9uID0gdGhpcy5idWlsZFNlY3Rpb25XaXRoSGVhZGluZyhcbiAgICAgICAgICAgIHNldHRpbmdzRWxlbSxcbiAgICAgICAgICAgICdJbnB1dCdcbiAgICAgICAgKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBpbnB1dFNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuS2V5Ym9hcmRJbnB1dClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdGbGFnKFxuICAgICAgICAgICAgaW5wdXRTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLmZsYWdzVWkuZ2V0KEZsYWdzLk1vdXNlSW5wdXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nRmxhZyhcbiAgICAgICAgICAgIGlucHV0U2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChGbGFncy5Ub3VjaElucHV0KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBpbnB1dFNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuR2FtZXBhZElucHV0KVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ0ZsYWcoXG4gICAgICAgICAgICBpbnB1dFNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMuZmxhZ3NVaS5nZXQoRmxhZ3MuWFJDb250cm9sbGVySW5wdXQpXG4gICAgICAgICk7XG5cbiAgICAgICAgLyogU2V0dXAgYWxsIGVuY29kZXIgcmVsYXRlZCBzZXR0aW5ncyB1bmRlciB0aGlzIHNlY3Rpb24gKi9cbiAgICAgICAgY29uc3QgZW5jb2RlclNldHRpbmdzU2VjdGlvbiA9IHRoaXMuYnVpbGRTZWN0aW9uV2l0aEhlYWRpbmcoXG4gICAgICAgICAgICBzZXR0aW5nc0VsZW0sXG4gICAgICAgICAgICAnRW5jb2RlcidcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICAgICAgZW5jb2RlclNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoTnVtZXJpY1BhcmFtZXRlcnMuTWluUVApXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgICAgICBlbmNvZGVyU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5NYXhRUClcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBwcmVmZXJyZWRDb2RlY09wdGlvbiA9IHRoaXMub3B0aW9uUGFyYW1ldGVyc1VpLmdldChcbiAgICAgICAgICAgIE9wdGlvblBhcmFtZXRlcnMuUHJlZmVycmVkQ29kZWNcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRTZXR0aW5nT3B0aW9uKFxuICAgICAgICAgICAgZW5jb2RlclNldHRpbmdzU2VjdGlvbixcbiAgICAgICAgICAgIHRoaXMub3B0aW9uUGFyYW1ldGVyc1VpLmdldChPcHRpb25QYXJhbWV0ZXJzLlByZWZlcnJlZENvZGVjKVxuICAgICAgICApO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBwcmVmZXJyZWRDb2RlY09wdGlvbiAmJlxuICAgICAgICAgICAgWy4uLnByZWZlcnJlZENvZGVjT3B0aW9uLnNlbGVjdG9yLm9wdGlvbnNdXG4gICAgICAgICAgICAgICAgLm1hcCgobykgPT4gby52YWx1ZSlcbiAgICAgICAgICAgICAgICAuaW5jbHVkZXMoJ09ubHkgYXZhaWxhYmxlIG9uIENocm9tZScpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcHJlZmVycmVkQ29kZWNPcHRpb24uZGlzYWJsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyogU2V0dXAgYWxsIHdlYnJ0YyByZWxhdGVkIHNldHRpbmdzIHVuZGVyIHRoaXMgc2VjdGlvbiAqL1xuICAgICAgICBjb25zdCB3ZWJydGNTZXR0aW5nc1NlY3Rpb24gPSB0aGlzLmJ1aWxkU2VjdGlvbldpdGhIZWFkaW5nKFxuICAgICAgICAgICAgc2V0dGluZ3NFbGVtLFxuICAgICAgICAgICAgJ1dlYlJUQydcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdOdW1lcmljKFxuICAgICAgICAgICAgd2VicnRjU2V0dGluZ3NTZWN0aW9uLFxuICAgICAgICAgICAgdGhpcy5udW1lcmljUGFyYW1ldGVyc1VpLmdldChOdW1lcmljUGFyYW1ldGVycy5XZWJSVENGUFMpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgICAgICB3ZWJydGNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuZ2V0KE51bWVyaWNQYXJhbWV0ZXJzLldlYlJUQ01pbkJpdHJhdGUpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgICAgICB3ZWJydGNTZXR0aW5nc1NlY3Rpb24sXG4gICAgICAgICAgICB0aGlzLm51bWVyaWNQYXJhbWV0ZXJzVWkuZ2V0KE51bWVyaWNQYXJhbWV0ZXJzLldlYlJUQ01heEJpdHJhdGUpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgU2V0dGluZ1RleHQgZWxlbWVudCB0byBhIHBhcnRpY3VsYXIgc2V0dGluZ3Mgc2VjdGlvbiBpbiB0aGUgRE9NIGFuZCByZWdpc3RlcnMgdGhhdCB0ZXh0IGluIHRoZSB0ZXh0IHNldHRpbmdzIG1hcC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NTZWN0aW9uIFRoZSBzZXR0aW5ncyBzZWN0aW9uIEhUTUwgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ1RleHQgVGhlIHRleHR1YWwgc2V0dGluZ3Mgb2JqZWN0LlxuICAgICAqL1xuICAgIGFkZFNldHRpbmdUZXh0KFxuICAgICAgICBzZXR0aW5nc1NlY3Rpb246IEhUTUxFbGVtZW50LFxuICAgICAgICBzZXR0aW5nVGV4dD86IFNldHRpbmdVSVRleHRcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHNldHRpbmdUZXh0KSB7XG4gICAgICAgICAgICBzZXR0aW5nc1NlY3Rpb24uYXBwZW5kQ2hpbGQoc2V0dGluZ1RleHQucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy50ZXh0UGFyYW1ldGVyc1VpLnNldChzZXR0aW5nVGV4dC5zZXR0aW5nLmlkLCBzZXR0aW5nVGV4dCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBTZXR0aW5nRmxhZyBlbGVtZW50IHRvIGEgcGFydGljdWxhciBzZXR0aW5ncyBzZWN0aW9uIGluIHRoZSBET00gYW5kIHJlZ2lzdGVycyB0aGF0IGZsYWcgaW4gdGhlIENvbmZpZy5mbGFnIG1hcC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NTZWN0aW9uIFRoZSBzZXR0aW5ncyBzZWN0aW9uIEhUTUwgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ0ZsYWcgVGhlIHNldHRpbmdzIGZsYWcgb2JqZWN0LlxuICAgICAqL1xuICAgIGFkZFNldHRpbmdGbGFnKFxuICAgICAgICBzZXR0aW5nc1NlY3Rpb246IEhUTUxFbGVtZW50LFxuICAgICAgICBzZXR0aW5nRmxhZz86IFNldHRpbmdVSUZsYWc8RmxhZ3NJZHNFeHRlbmRlZD5cbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHNldHRpbmdGbGFnKSB7XG4gICAgICAgICAgICBzZXR0aW5nc1NlY3Rpb24uYXBwZW5kQ2hpbGQoc2V0dGluZ0ZsYWcucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLnNldChzZXR0aW5nRmxhZy5zZXR0aW5nLmlkLCBzZXR0aW5nRmxhZyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBudW1lcmljIHNldHRpbmcgZWxlbWVudCB0byBhIHBhcnRpY3VsYXIgc2V0dGluZ3Mgc2VjdGlvbiBpbiB0aGUgRE9NIGFuZCByZWdpc3RlcnMgdGhhdCBmbGFnIGluIHRoZSBDb25maWcubnVtZXJpY1BhcmFtZXRlcnMgbWFwLlxuICAgICAqIEBwYXJhbSBzZXR0aW5nc1NlY3Rpb24gVGhlIHNldHRpbmdzIHNlY3Rpb24gSFRNTCBlbGVtZW50LlxuICAgICAqIEBwYXJhbSBzZXR0aW5nRmxhZyBUaGUgc2V0dGluZ3MgZmxhZyBvYmplY3QuXG4gICAgICovXG4gICAgYWRkU2V0dGluZ051bWVyaWMoXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbjogSFRNTEVsZW1lbnQsXG4gICAgICAgIHNldHRpbmc/OiBTZXR0aW5nVUlOdW1iZXJcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHNldHRpbmcpIHtcbiAgICAgICAgICAgIHNldHRpbmdzU2VjdGlvbi5hcHBlbmRDaGlsZChzZXR0aW5nLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5zZXQoc2V0dGluZy5zZXR0aW5nLmlkLCBzZXR0aW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhbiBlbnVtIGJhc2VkIHNldHRpbmdzIGVsZW1lbnQgdG8gYSBwYXJ0aWN1bGFyIHNldHRpbmdzIHNlY3Rpb24gaW4gdGhlIERPTSBhbmQgcmVnaXN0ZXJzIHRoYXQgZmxhZyBpbiB0aGUgQ29uZmlnLmVudW1QYXJhbWV0ZXJzIG1hcC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NTZWN0aW9uIFRoZSBzZXR0aW5ncyBzZWN0aW9uIEhUTUwgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gc2V0dGluZ0ZsYWcgVGhlIHNldHRpbmdzIGZsYWcgb2JqZWN0LlxuICAgICAqL1xuICAgIGFkZFNldHRpbmdPcHRpb24oXG4gICAgICAgIHNldHRpbmdzU2VjdGlvbjogSFRNTEVsZW1lbnQsXG4gICAgICAgIHNldHRpbmc/OiBTZXR0aW5nVUlPcHRpb25cbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHNldHRpbmcpIHtcbiAgICAgICAgICAgIHNldHRpbmdzU2VjdGlvbi5hcHBlbmRDaGlsZChzZXR0aW5nLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uUGFyYW1ldGVyc1VpLnNldChzZXR0aW5nLnNldHRpbmcuaWQsIHNldHRpbmcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25TZXR0aW5nc0NoYW5nZWQoeyBkYXRhOiB7IGlkLCB0YXJnZXQsIHR5cGUgfSB9OiBTZXR0aW5nc0NoYW5nZWRFdmVudCkge1xuICAgICAgICBpZiAodHlwZSA9PT0gJ2ZsYWcnKSB7XG4gICAgICAgICAgICBjb25zdCBfaWQgPSBpZCBhcyBGbGFnc0lkcztcbiAgICAgICAgICAgIGNvbnN0IF90YXJnZXQgPSB0YXJnZXQgYXMgU2V0dGluZ0ZsYWc7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nID0gdGhpcy5mbGFnc1VpLmdldChfaWQpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy5mbGFnICE9PSBfdGFyZ2V0LmZsYWcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy5mbGFnID0gX3RhcmdldC5mbGFnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy5sYWJlbCAhPT0gX3RhcmdldC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLmxhYmVsID0gX3RhcmdldC5sYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGNvbnN0IF9pZCA9IGlkIGFzIE51bWVyaWNQYXJhbWV0ZXJzSWRzO1xuICAgICAgICAgICAgY29uc3QgX3RhcmdldCA9IHRhcmdldCBhcyBTZXR0aW5nTnVtYmVyO1xuICAgICAgICAgICAgY29uc3Qgc2V0dGluZyA9IHRoaXMubnVtZXJpY1BhcmFtZXRlcnNVaS5nZXQoX2lkKTtcbiAgICAgICAgICAgIGlmIChzZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNldHRpbmcubnVtYmVyICE9PSBfdGFyZ2V0Lm51bWJlcikge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLm51bWJlciA9IF90YXJnZXQubnVtYmVyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy5sYWJlbCAhPT0gX3RhcmdldC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLmxhYmVsID0gX3RhcmdldC5sYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgICBjb25zdCBfaWQgPSBpZCBhcyBUZXh0UGFyYW1ldGVyc0lkcztcbiAgICAgICAgICAgIGNvbnN0IF90YXJnZXQgPSB0YXJnZXQgYXMgU2V0dGluZ1RleHQ7XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nID0gdGhpcy50ZXh0UGFyYW1ldGVyc1VpLmdldChfaWQpO1xuICAgICAgICAgICAgaWYgKHNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy50ZXh0ICE9PSBfdGFyZ2V0LnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZy50ZXh0ID0gX3RhcmdldC50ZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy5sYWJlbCAhPT0gX3RhcmdldC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLmxhYmVsID0gX3RhcmdldC5sYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29wdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnN0IF9pZCA9IGlkIGFzIE9wdGlvblBhcmFtZXRlcnNJZHM7XG4gICAgICAgICAgICBjb25zdCBfdGFyZ2V0ID0gdGFyZ2V0IGFzIFNldHRpbmdPcHRpb247XG4gICAgICAgICAgICBjb25zdCBzZXR0aW5nID0gdGhpcy5vcHRpb25QYXJhbWV0ZXJzVWkuZ2V0KF9pZCk7XG4gICAgICAgICAgICBpZiAoc2V0dGluZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVpT3B0aW9ucyA9IHNldHRpbmcub3B0aW9ucztcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRPcHRpb25zID0gX3RhcmdldC5vcHRpb25zO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgdWlPcHRpb25zLmxlbmd0aCAhPT0gdGFyZ2V0T3B0aW9ucy5sZW5ndGggfHxcbiAgICAgICAgICAgICAgICAgICAgIXVpT3B0aW9ucy5ldmVyeSgodmFsdWUpID0+IHRhcmdldE9wdGlvbnMuaW5jbHVkZXModmFsdWUpKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLm9wdGlvbnMgPSBfdGFyZ2V0Lm9wdGlvbnM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nLnNlbGVjdGVkICE9PSBfdGFyZ2V0LnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmcuc2VsZWN0ZWQgPSBfdGFyZ2V0LnNlbGVjdGVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZy5sYWJlbCAhPT0gX3RhcmdldC5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nLmxhYmVsID0gX3RhcmdldC5sYWJlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBjYWxsYmFjayB0byBmaXJlIHdoZW4gdGhlIGZsYWcgaXMgdG9nZ2xlZC5cbiAgICAgKiBAcGFyYW0gaWQgVGhlIGlkIG9mIHRoZSBmbGFnLlxuICAgICAqIEBwYXJhbSBvbkNoYW5nZUxpc3RlbmVyIFRoZSBjYWxsYmFjayB0byBmaXJlIHdoZW4gdGhlIHZhbHVlIGNoYW5nZXMuXG4gICAgICovXG4gICAgYWRkQ3VzdG9tRmxhZ09uU2V0dGluZ0NoYW5nZWRMaXN0ZW5lcihcbiAgICAgICAgaWQ6IEV4dHJhRmxhZ3MsXG4gICAgICAgIG9uQ2hhbmdlTGlzdGVuZXI6IChuZXdGbGFnVmFsdWU6IGJvb2xlYW4pID0+IHZvaWRcbiAgICApOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tRmxhZ3MuaGFzKGlkKSkge1xuICAgICAgICAgICAgdGhpcy5jdXN0b21GbGFncy5nZXQoaWQpLm9uQ2hhbmdlID0gb25DaGFuZ2VMaXN0ZW5lcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbGFiZWwgZm9yIHRoZSBmbGFnLlxuICAgICAqIEBwYXJhbSBpZCBUaGUgaWQgb2YgdGhlIGZsYWcuXG4gICAgICogQHBhcmFtIGxhYmVsIFRoZSBuZXcgbGFiZWwgdG8gdXNlIGZvciB0aGUgZmxhZy5cbiAgICAgKi9cbiAgICBzZXRDdXN0b21GbGFnTGFiZWwoaWQ6IEV4dHJhRmxhZ3MsIGxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKCF0aGlzLmN1c3RvbUZsYWdzLmhhcyhpZCkpIHtcbiAgICAgICAgICAgIExvZ2dlci5XYXJuaW5nKFxuICAgICAgICAgICAgICAgIExvZ2dlci5HZXRTdGFja1RyYWNlKCksXG4gICAgICAgICAgICAgICAgYENhbm5vdCBzZXQgbGFiZWwgZm9yIGZsYWcgY2FsbGVkICR7aWR9IC0gaXQgZG9lcyBub3QgZXhpc3QgaW4gdGhlIENvbmZpZy5mbGFncyBtYXAuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tRmxhZ3MuZ2V0KGlkKS5sYWJlbCA9IGxhYmVsO1xuICAgICAgICAgICAgdGhpcy5mbGFnc1VpLmdldChpZCkubGFiZWwgPSBsYWJlbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdmFsdWUgb2YgdGhlIGNvbmZpZ3VyYXRpb24gZmxhZyB3aGljaCBoYXMgdGhlIGdpdmVuIGlkLlxuICAgICAqIEBwYXJhbSBpZCBUaGUgdW5pcXVlIGlkIGZvciB0aGUgZmxhZy5cbiAgICAgKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBmbGFnIGlzIGVuYWJsZWQuXG4gICAgICovXG4gICAgaXNDdXN0b21GbGFnRW5hYmxlZChpZDogRXh0cmFGbGFncyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXN0b21GbGFncy5nZXQoaWQpLmZsYWcgYXMgYm9vbGVhbjtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBTZXR0aW5nQmFzZSB9IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjQnO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGEgc2V0dGluZyB0aGF0IGhhcyBhIHRleHQgbGFiZWwsIGFuIGFyYml0cmFyeSBzZXR0aW5nIHZhbHVlIGl0IHN0b3JlcywgYW4gYSBIVE1MIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoaXMgc2V0dGluZy5cbiAqL1xuZXhwb3J0IGNsYXNzIFNldHRpbmdVSUJhc2Uge1xuICAgIF9zZXR0aW5nOiBTZXR0aW5nQmFzZTtcbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZzogU2V0dGluZ0Jhc2UpIHtcbiAgICAgICAgdGhpcy5fc2V0dGluZyA9IHNldHRpbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIHNldHRpbmcgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2V0dGluZygpOiBTZXR0aW5nQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHR5cGUge1xuICAgIEZsYWdzSWRzLFxuICAgIFNldHRpbmdGbGFnXG59IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjQnO1xuaW1wb3J0IHsgU2V0dGluZ1VJQmFzZSB9IGZyb20gJy4vU2V0dGluZ1VJQmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nVUlGbGFnPFxuICAgIEN1c3RvbUlkcyBleHRlbmRzIHN0cmluZyA9IEZsYWdzSWRzXG4+IGV4dGVuZHMgU2V0dGluZ1VJQmFzZSB7XG4gICAgLyogV2UgdG9nZ2xlIHRoaXMgY2hlY2tib3ggdG8gcmVmbGVjdCB0aGUgdmFsdWUgb2Ygb3VyIHNldHRpbmcncyBib29sZWFuIGZsYWcuICovXG4gICAgX2NoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50OyAvLyBpbnB1dCB0eXBlPVwiY2hlY2tib3hcIlxuXG4gICAgLyogVGhpcyBlbGVtZW50IGNvbnRhaW5zIGEgdGV4dCBub2RlIHRoYXQgcmVmbGVjdHMgdGhlIHNldHRpbmcncyB0ZXh0IGxhYmVsLiAqL1xuICAgIF9zZXR0aW5nc1RleHRFbGVtOiBIVE1MRWxlbWVudDtcblxuICAgIG9uQ2hhbmdlRW1pdDogKGNoYW5nZWRWYWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcblxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmc6IFNldHRpbmdGbGFnPEN1c3RvbUlkcz4pIHtcbiAgICAgICAgc3VwZXIoc2V0dGluZyk7XG5cbiAgICAgICAgdGhpcy5sYWJlbCA9IHNldHRpbmcubGFiZWw7XG4gICAgICAgIHRoaXMuZmxhZyA9IHNldHRpbmcuZmxhZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgc2V0dGluZyBjb21wb25lbnQuXG4gICAgICovXG4gICAgcHVibGljIGdldCBzZXR0aW5nKCk6IFNldHRpbmdGbGFnPEN1c3RvbUlkcz4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZyBhcyBTZXR0aW5nRmxhZzxDdXN0b21JZHM+O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2V0dGluZ3NUZXh0RWxlbSgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NUZXh0RWxlbSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQgPSB0aGlzLnNldHRpbmcuX2xhYmVsO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS50aXRsZSA9IHRoaXMuc2V0dGluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NUZXh0RWxlbTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNoZWNrYm94KCk6IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX2NoZWNrYm94KSB7XG4gICAgICAgICAgICB0aGlzLl9jaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0aGlzLl9jaGVja2JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fY2hlY2tib3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUmV0dXJuIG9yIGNyZWF0ZXMgYSBIVE1MIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoaXMgc2V0dGluZyBpbiB0aGUgRE9NLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgcm9vdCBkaXYgd2l0aCBcInNldHRpbmdcIiBjc3MgY2xhc3NcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9IHRoaXMuc2V0dGluZy5pZDtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmcnKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGRpdiBlbGVtZW50IHRvIGNvbnRhaW4gb3VyIHNldHRpbmcncyB0ZXh0XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzVGV4dEVsZW0pO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgbGFiZWwgZWxlbWVudCB0byB3cmFwIG91dCBpbnB1dCB0eXBlXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgd3JhcHBlckxhYmVsLmNsYXNzTGlzdC5hZGQoJ3RnbC1zd2l0Y2gnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdyYXBwZXJMYWJlbCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBpbnB1dCB0eXBlPWNoZWNrYm94XG4gICAgICAgICAgICB0aGlzLmNoZWNrYm94LnRpdGxlID0gdGhpcy5zZXR0aW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICAgICAgdGhpcy5jaGVja2JveC5jbGFzc0xpc3QuYWRkKCd0Z2wnKTtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tib3guY2xhc3NMaXN0LmFkZCgndGdsLWZsYXQnKTtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ3RnbC1zbGlkZXInKTtcbiAgICAgICAgICAgIHdyYXBwZXJMYWJlbC5hcHBlbmRDaGlsZCh0aGlzLmNoZWNrYm94KTtcbiAgICAgICAgICAgIHdyYXBwZXJMYWJlbC5hcHBlbmRDaGlsZChzbGlkZXIpO1xuXG4gICAgICAgICAgICAvLyBzZXR1cCBvbiBjaGFuZ2UgZnJvbSBjaGVja2JveFxuICAgICAgICAgICAgdGhpcy5jaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZy5mbGFnICE9PSB0aGlzLmNoZWNrYm94LmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLmZsYWcgPSB0aGlzLmNoZWNrYm94LmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy51cGRhdGVVUkxQYXJhbXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBzZXR0aW5nJ3Mgc3RvcmVkIHZhbHVlLlxuICAgICAqIEBwYXJhbSBpblZhbHVlIFRoZSBuZXcgdmFsdWUgZm9yIHRoZSBzZXR0aW5nLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgZmxhZyhpblZhbHVlOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuY2hlY2tib3guY2hlY2tlZCA9IGluVmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHZhbHVlXG4gICAgICovXG4gICAgcHVibGljIGdldCBmbGFnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGVja2JveC5jaGVja2VkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgbGFiZWwgdGV4dCBmb3IgdGhlIHNldHRpbmcuXG4gICAgICogQHBhcmFtIGxhYmVsIHNldHRpbmcgbGFiZWwuXG4gICAgICovXG4gICAgcHVibGljIHNldCBsYWJlbChpbkxhYmVsOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IGluTGFiZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGxhYmVsXG4gICAgICovXG4gICAgcHVibGljIGdldCBsYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQ7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHR5cGUge1xuICAgIE51bWVyaWNQYXJhbWV0ZXJzSWRzLFxuICAgIFNldHRpbmdOdW1iZXJcbn0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuNCc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40JztcbmltcG9ydCB7IFNldHRpbmdVSUJhc2UgfSBmcm9tICcuL1NldHRpbmdVSUJhc2UnO1xuXG4vKipcbiAqIEEgbnVtYmVyIHNwaW5uZXIgd2l0aCBhIHRleHQgbGFiZWwgYmVzaWRlIGl0LlxuICovXG5leHBvcnQgY2xhc3MgU2V0dGluZ1VJTnVtYmVyPFxuICAgIEN1c3RvbUlkcyBleHRlbmRzIHN0cmluZyA9IE51bWVyaWNQYXJhbWV0ZXJzSWRzXG4+IGV4dGVuZHMgU2V0dGluZ1VJQmFzZSB7XG4gICAgX3NwaW5uZXI6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAvKiBUaGlzIGVsZW1lbnQgY29udGFpbnMgYSB0ZXh0IG5vZGUgdGhhdCByZWZsZWN0cyB0aGUgc2V0dGluZydzIHRleHQgbGFiZWwuICovXG4gICAgX3NldHRpbmdzVGV4dEVsZW06IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZzogU2V0dGluZ051bWJlcjxDdXN0b21JZHM+KSB7XG4gICAgICAgIHN1cGVyKHNldHRpbmcpO1xuXG4gICAgICAgIHRoaXMubGFiZWwgPSB0aGlzLnNldHRpbmcubGFiZWw7XG4gICAgICAgIHRoaXMubnVtYmVyID0gdGhpcy5zZXR0aW5nLm51bWJlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgc2V0dGluZyBjb21wb25lbnQuXG4gICAgICovXG4gICAgcHVibGljIGdldCBzZXR0aW5nKCk6IFNldHRpbmdOdW1iZXI8Q3VzdG9tSWRzPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nIGFzIFNldHRpbmdOdW1iZXI8Q3VzdG9tSWRzPjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzVGV4dEVsZW0oKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzVGV4dEVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQgPSB0aGlzLnNldHRpbmcubGFiZWw7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtLnRpdGxlID0gdGhpcy5zZXR0aW5nLmRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nc1RleHRFbGVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgSFRNTElucHV0RWxlbWVudCBmb3IgdGhlIGJ1dHRvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHNwaW5uZXIoKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc3Bpbm5lcikge1xuICAgICAgICAgICAgdGhpcy5fc3Bpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0aGlzLl9zcGlubmVyLnR5cGUgPSAnbnVtYmVyJztcbiAgICAgICAgICAgIHRoaXMuX3NwaW5uZXIubWluID0gdGhpcy5zZXR0aW5nLm1pbi50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5fc3Bpbm5lci5tYXggPSB0aGlzLnNldHRpbmcubWF4LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLl9zcGlubmVyLnZhbHVlID0gdGhpcy5zZXR0aW5nLm51bWJlci50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5fc3Bpbm5lci50aXRsZSA9IHRoaXMuc2V0dGluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHRoaXMuX3NwaW5uZXIuY2xhc3NMaXN0LmFkZCgnZm9ybS1jb250cm9sJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwaW5uZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgUmV0dXJuIG9yIGNyZWF0ZXMgYSBIVE1MIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoaXMgc2V0dGluZyBpbiB0aGUgRE9NLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgcm9vdCBkaXYgd2l0aCBcInNldHRpbmdcIiBjc3MgY2xhc3NcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmb3JtLWdyb3VwJyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBkaXYgZWxlbWVudCB0byBjb250YWluIG91ciBzZXR0aW5nJ3MgdGV4dFxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc1RleHRFbGVtKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGxhYmVsIGVsZW1lbnQgdG8gd3JhcCBvdXQgaW5wdXQgdHlwZVxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zcGlubmVyKTtcblxuICAgICAgICAgICAgLy8gc2V0dXAgb25jaGFuZ2VcbiAgICAgICAgICAgIHRoaXMuc3Bpbm5lci5vbmNoYW5nZSA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dEVsZW0gPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gTnVtYmVyLnBhcnNlRmxvYXQoaW5wdXRFbGVtLnZhbHVlKTtcblxuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIuaXNOYU4ocGFyc2VkVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5XYXJuaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGBDb3VsZCBub3QgcGFyc2UgdmFsdWUgY2hhbmdlIGludG8gYSB2YWxpZCBudW1iZXIgLSB2YWx1ZSB3YXMgJHtpbnB1dEVsZW0udmFsdWV9LCByZXNldHRpbmcgdmFsdWUgdG8gJHt0aGlzLnNldHRpbmcubWlufWBcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZy5udW1iZXIgIT09IHRoaXMuc2V0dGluZy5taW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZy5udW1iZXIgPSB0aGlzLnNldHRpbmcubWluO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZy5udW1iZXIgIT09IHBhcnNlZFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcubnVtYmVyID0gcGFyc2VkVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcudXBkYXRlVVJMUGFyYW1zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIG51bWJlciBpbiB0aGUgc3Bpbm5lciAod2lsbCBiZSBjbGFtcGVkIHdpdGhpbiByYW5nZSkuXG4gICAgICovXG4gICAgcHVibGljIHNldCBudW1iZXIobmV3TnVtYmVyOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zcGlubmVyLnZhbHVlID0gdGhpcy5zZXR0aW5nLmNsYW1wKG5ld051bWJlcikudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmFsdWVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IG51bWJlcigpIHtcbiAgICAgICAgcmV0dXJuICt0aGlzLnNwaW5uZXIudmFsdWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBsYWJlbCB0ZXh0IGZvciB0aGUgc2V0dGluZy5cbiAgICAgKiBAcGFyYW0gbGFiZWwgc2V0dGluZyBsYWJlbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IGxhYmVsKGluTGFiZWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gaW5MYWJlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbGFiZWxcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgdHlwZSB7XG4gICAgT3B0aW9uUGFyYW1ldGVyc0lkcyxcbiAgICBTZXR0aW5nT3B0aW9uXG59IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjQnO1xuaW1wb3J0IHsgU2V0dGluZ1VJQmFzZSB9IGZyb20gJy4vU2V0dGluZ1VJQmFzZSc7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nVUlPcHRpb248XG4gICAgQ3VzdG9tSWRzIGV4dGVuZHMgc3RyaW5nID0gT3B0aW9uUGFyYW1ldGVyc0lkc1xuPiBleHRlbmRzIFNldHRpbmdVSUJhc2Uge1xuICAgIC8qIEEgc2VsZWN0IGVsZW1lbnQgdGhhdCByZWZsZWN0cyB0aGUgdmFsdWUgb2YgdGhpcyBzZXR0aW5nLiAqL1xuICAgIF9zZWxlY3RvcjogSFRNTFNlbGVjdEVsZW1lbnQ7IC8vIDxzZWxlY3Q+PC9zZWxlY3Q+XG5cbiAgICAvKiBUaGlzIGVsZW1lbnQgY29udGFpbnMgYSB0ZXh0IG5vZGUgdGhhdCByZWZsZWN0cyB0aGUgc2V0dGluZydzIHRleHQgbGFiZWwuICovXG4gICAgX3NldHRpbmdzVGV4dEVsZW06IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZzogU2V0dGluZ09wdGlvbjxDdXN0b21JZHM+KSB7XG4gICAgICAgIHN1cGVyKHNldHRpbmcpO1xuXG4gICAgICAgIHRoaXMubGFiZWwgPSB0aGlzLnNldHRpbmcubGFiZWw7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuc2V0dGluZy5vcHRpb25zO1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5zZXR0aW5nLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBzZXR0aW5nIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmcoKTogU2V0dGluZ09wdGlvbjxDdXN0b21JZHM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmcgYXMgU2V0dGluZ09wdGlvbjxDdXN0b21JZHM+O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2VsZWN0b3IoKTogSFRNTFNlbGVjdEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0b3IuY2xhc3NMaXN0LmFkZCgnZm9ybS1jb250cm9sJyk7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rvci5jbGFzc0xpc3QuYWRkKCdzZXR0aW5ncy1vcHRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0b3I7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZXR0aW5nc1RleHRFbGVtKCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZXR0aW5nc1RleHRFbGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dCA9IHRoaXMuc2V0dGluZy5sYWJlbDtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0udGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzVGV4dEVsZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBsYWJlbCB0ZXh0IGZvciB0aGUgc2V0dGluZy5cbiAgICAgKiBAcGFyYW0gbGFiZWwgc2V0dGluZyBsYWJlbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2V0IGxhYmVsKGluTGFiZWw6IHN0cmluZykge1xuICAgICAgICB0aGlzLnNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gaW5MYWJlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgbGFiZWxcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5nc1RleHRFbGVtLmlubmVyVGV4dDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBSZXR1cm4gb3IgY3JlYXRlcyBhIEhUTUwgZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhpcyBzZXR0aW5nIGluIHRoZSBET00uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSByb290IGRpdiB3aXRoIFwic2V0dGluZ1wiIGNzcyBjbGFzc1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gdGhpcy5zZXR0aW5nLmlkO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZycpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZm9ybS1ncm91cCcpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgZGl2IGVsZW1lbnQgdG8gY29udGFpbiBvdXIgc2V0dGluZydzIHRleHRcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NUZXh0RWxlbSk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBsYWJlbCBlbGVtZW50IHRvIHdyYXAgb3V0IGlucHV0IHR5cGVcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3cmFwcGVyTGFiZWwpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc2VsZWN0IGVsZW1lbnRcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IudGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgICAgICB3cmFwcGVyTGFiZWwuYXBwZW5kQ2hpbGQodGhpcy5zZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIC8vIHNldHVwIG9uIGNoYW5nZSBmcm9tIHNlbGVjdG9yXG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yLm9uY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmcuc2VsZWN0ZWQgIT09IHRoaXMuc2VsZWN0b3IudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLnNlbGVjdGVkID0gdGhpcy5zZWxlY3Rvci52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLnVwZGF0ZVVSTFBhcmFtcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgb3B0aW9ucyh2YWx1ZXM6IEFycmF5PHN0cmluZz4pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IHRoaXMuc2VsZWN0b3Iub3B0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rvci5yZW1vdmUoaSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBvcHQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIG9wdC5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IuYXBwZW5kQ2hpbGQob3B0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMuc2VsZWN0b3Iub3B0aW9uc10ubWFwKChvKSA9PiBvLnZhbHVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0IHNlbGVjdGVkKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgLy8gQSB1c2VyIG1heSBub3Qgc3BlY2lmeSB0aGUgZnVsbCBwb3NzaWJsZSB2YWx1ZSBzbyB3ZSBpbnN0ZWFkIHVzZSB0aGUgY2xvc2VzdCBtYXRjaC5cbiAgICAgICAgLy8gZWcgP3h4eD1IMjY0IHdvdWxkIHNlbGVjdCAnSDI2NCBsZXZlbC1hc3ltbWV0cnktYWxsb3dlZD0xO3BhY2tldGl6YXRpb24tbW9kZT0xO3Byb2ZpbGUtbGV2ZWwtaWQ9NDIwMDFmJ1xuICAgICAgICBjb25zdCBmaWx0ZXJlZExpc3QgPSB0aGlzLm9wdGlvbnMuZmlsdGVyKFxuICAgICAgICAgICAgKG9wdGlvbjogc3RyaW5nKSA9PiBvcHRpb24uaW5kZXhPZih2YWx1ZSkgIT09IC0xXG4gICAgICAgICk7XG4gICAgICAgIGlmIChmaWx0ZXJlZExpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yLnZhbHVlID0gZmlsdGVyZWRMaXN0WzBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzZWxlY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0b3IudmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBlbmFibGUoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgdHlwZSB7XG4gICAgU2V0dGluZ1RleHQsXG4gICAgVGV4dFBhcmFtZXRlcnNJZHNcbn0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuNCc7XG5pbXBvcnQgeyBTZXR0aW5nVUlCYXNlIH0gZnJvbSAnLi9TZXR0aW5nVUlCYXNlJztcblxuZXhwb3J0IGNsYXNzIFNldHRpbmdVSVRleHQ8XG4gICAgQ3VzdG9tSWRzIGV4dGVuZHMgc3RyaW5nID0gVGV4dFBhcmFtZXRlcnNJZHNcbj4gZXh0ZW5kcyBTZXR0aW5nVUlCYXNlIHtcbiAgICAvKiBBIHRleHQgYm94IHRoYXQgcmVmbGVjdHMgdGhlIHZhbHVlIG9mIHRoaXMgc2V0dGluZy4gKi9cbiAgICBfdGV4dGJveDogSFRNTElucHV0RWxlbWVudDsgLy8gaW5wdXQgdHlwZT1cInRleHRcIlxuXG4gICAgLyogVGhpcyBlbGVtZW50IGNvbnRhaW5zIGEgdGV4dCBub2RlIHRoYXQgcmVmbGVjdHMgdGhlIHNldHRpbmcncyB0ZXh0IGxhYmVsLiAqL1xuICAgIF9zZXR0aW5nc1RleHRFbGVtOiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKHNldHRpbmc6IFNldHRpbmdUZXh0PEN1c3RvbUlkcz4pIHtcbiAgICAgICAgc3VwZXIoc2V0dGluZyk7XG5cbiAgICAgICAgdGhpcy5sYWJlbCA9IHRoaXMuc2V0dGluZy5sYWJlbDtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGhpcy5zZXR0aW5nLnRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIHNldHRpbmcgY29tcG9uZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgc2V0dGluZygpOiBTZXR0aW5nVGV4dDxDdXN0b21JZHM+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmcgYXMgU2V0dGluZ1RleHQ8Q3VzdG9tSWRzPjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzVGV4dEVsZW0oKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3NldHRpbmdzVGV4dEVsZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gdGhpcy5zZXR0aW5nLmxhYmVsO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NUZXh0RWxlbS50aXRsZSA9IHRoaXMuc2V0dGluZy5kZXNjcmlwdGlvbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NUZXh0RWxlbTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHRleHRib3goKTogSFRNTElucHV0RWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fdGV4dGJveCkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICB0aGlzLl90ZXh0Ym94LmNsYXNzTGlzdC5hZGQoJ2Zvcm0tY29udHJvbCcpO1xuICAgICAgICAgICAgdGhpcy5fdGV4dGJveC50eXBlID0gJ3RleHRib3gnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0Ym94O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHJvb3QgZGl2IHdpdGggXCJzZXR0aW5nXCIgY3NzIGNsYXNzXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSB0aGlzLnNldHRpbmcuaWQ7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nJyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBkaXYgZWxlbWVudCB0byBjb250YWluIG91ciBzZXR0aW5nJ3MgdGV4dFxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc1RleHRFbGVtKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGxhYmVsIGVsZW1lbnQgdG8gd3JhcCBvdXQgaW5wdXQgdHlwZVxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlckxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHdyYXBwZXJMYWJlbCk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBpbnB1dCB0eXBlPWNoZWNrYm94XG4gICAgICAgICAgICB0aGlzLnRleHRib3gudGl0bGUgPSB0aGlzLnNldHRpbmcuZGVzY3JpcHRpb247XG4gICAgICAgICAgICB3cmFwcGVyTGFiZWwuYXBwZW5kQ2hpbGQodGhpcy50ZXh0Ym94KTtcblxuICAgICAgICAgICAgLy8gc2V0dXAgb24gY2hhbmdlIGZyb20gY2hlY2tib3hcbiAgICAgICAgICAgIHRoaXMudGV4dGJveC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5nLnRleHQgIT09IHRoaXMudGV4dGJveC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmcudGV4dCA9IHRoaXMudGV4dGJveC52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5nLnVwZGF0ZVVSTFBhcmFtcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHNldHRpbmcncyBzdG9yZWQgdmFsdWUuXG4gICAgICogQHBhcmFtIGluVmFsdWUgVGhlIG5ldyB2YWx1ZSBmb3IgdGhlIHNldHRpbmcuXG4gICAgICovXG4gICAgcHVibGljIHNldCB0ZXh0KGluVmFsdWU6IHN0cmluZykge1xuICAgICAgICB0aGlzLnRleHRib3gudmFsdWUgPSBpblZhbHVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB2YWx1ZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgdGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dGJveC52YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGxhYmVsIHRleHQgZm9yIHRoZSBzZXR0aW5nLlxuICAgICAqIEBwYXJhbSBsYWJlbCBzZXR0aW5nIGxhYmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyBzZXQgbGFiZWwoaW5MYWJlbDogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3NUZXh0RWxlbS5pbm5lclRleHQgPSBpbkxhYmVsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBsYWJlbFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgbGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0O1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IEFjdGlvbk92ZXJsYXkgfSBmcm9tICcuL0FjdGlvbk92ZXJsYXknO1xuXG4vKipcbiAqIFNob3cgYW4gb3ZlcmxheSBmb3Igd2hlbiB0aGUgc2Vzc2lvbiBpcyB1bmF0dGVuZGVkLCBpdCBiZWdpbnMgYSBjb3VudGRvd24gdGltZXIsIHdoaWNoIHdoZW4gZWxhcHNlZCB3aWxsIGRpc2Nvbm5lY3QgdGhlIHN0cmVhbS5cbiAqL1xuZXhwb3J0IGNsYXNzIEFGS092ZXJsYXkgZXh0ZW5kcyBBY3Rpb25PdmVybGF5IHtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCByb290IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBhZmtPdmVybGF5SHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZmtPdmVybGF5SHRtbC5pZCA9ICdhZmtPdmVybGF5JztcbiAgICAgICAgYWZrT3ZlcmxheUh0bWwuY2xhc3NOYW1lID0gJ2NsaWNrYWJsZVN0YXRlJztcbiAgICAgICAgcmV0dXJuIGFma092ZXJsYXlIdG1sO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFRoZSBjcmVhdGVkIGNvbnRlbnQgZWxlbWVudCBvZiB0aGlzIG92ZXJsYXksIHdoaWNoIGNvbnRhaW4gc29tZSB0ZXh0IGZvciBhbiBhZmsgY291bnQgZG93bi5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNvbnRlbnRFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgYWZrT3ZlcmxheUh0bWxJbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBhZmtPdmVybGF5SHRtbElubmVyLmlkID0gJ2Fma092ZXJsYXlJbm5lcic7XG4gICAgICAgIGFma092ZXJsYXlIdG1sSW5uZXIuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICc8Y2VudGVyPk5vIGFjdGl2aXR5IGRldGVjdGVkPGJyPkRpc2Nvbm5lY3RpbmcgaW4gPHNwYW4gaWQ9XCJhZmtDb3VudERvd25OdW1iZXJcIj48L3NwYW4+IHNlY29uZHM8YnI+Q2xpY2sgdG8gY29udGludWU8YnI+PC9jZW50ZXI+JztcbiAgICAgICAgcmV0dXJuIGFma092ZXJsYXlIdG1sSW5uZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0IGFuIEFmayBvdmVybGF5XG4gICAgICogQHBhcmFtIHBhcmVudEVsZW1lbnQgdGhlIGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50b1xuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihyb290RGl2OiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHJvb3REaXYsXG4gICAgICAgICAgICBBRktPdmVybGF5LmNyZWF0ZVJvb3RFbGVtZW50KCksXG4gICAgICAgICAgICBBRktPdmVybGF5LmNyZWF0ZUNvbnRlbnRFbGVtZW50KClcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIGNvdW50IGRvd24gc3BhbnMgbnVtYmVyIGZvciB0aGUgb3ZlcmxheVxuICAgICAqIEBwYXJhbSBjb3VudGRvd24gdGhlIGNvdW50IGRvd24gbnVtYmVyIHRvIGJlIGluc2VydGVkIGludG8gdGhlIHNwYW4gZm9yIHVwZGF0aW5nXG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZUNvdW50ZG93bihjb3VudGRvd246IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IGA8Y2VudGVyPk5vIGFjdGl2aXR5IGRldGVjdGVkPGJyPkRpc2Nvbm5lY3RpbmcgaW4gPHNwYW4gaWQ9XCJhZmtDb3VudERvd25OdW1iZXJcIj4ke2NvdW50ZG93bn08L3NwYW4+IHNlY29uZHM8YnI+Q2xpY2sgdG8gY29udGludWU8YnI+PC9jZW50ZXI+YDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40JztcblxuaW1wb3J0IHsgT3ZlcmxheUJhc2UgfSBmcm9tICcuL0Jhc2VPdmVybGF5JztcblxuLyoqXG4gKiBDbGFzcyBmb3IgdGhlIGJhc2UgYWN0aW9uIG92ZXJsYXkgc3RydWN0dXJlXG4gKi9cbmV4cG9ydCBjbGFzcyBBY3Rpb25PdmVybGF5IGV4dGVuZHMgT3ZlcmxheUJhc2Uge1xuICAgIG9uQWN0aW9uQ2FsbGJhY2s6ICguLi5hcmdzOiBbXSkgPT4gdm9pZDtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhbiBhY3Rpb24gb3ZlcmxheVxuICAgICAqIEBwYXJhbSByb290RGl2IHRoZSByb290IGVsZW1lbnQgdGhpcyBvdmVybGF5IHdpbGwgYmUgaW5zZXJ0ZWQgaW50b1xuICAgICAqIEBwYXJhbSByb290RWxlbWVudCB0aGUgcm9vdCBlbGVtZW50IHRoYXQgaXMgdGhlIG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gY29udGVudEVsZW1lbnQgYW4gZWxlbWVudCB0aGF0IGNvbnRhaW5zIHRleHQgZm9yIHRoZSBhY3Rpb24gb3ZlcmxheVxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm9vdERpdjogSFRNTEVsZW1lbnQsXG4gICAgICAgIHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgY29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHJvb3REaXYsIHJvb3RFbGVtZW50LCBjb250ZW50RWxlbWVudCk7XG4gICAgICAgIHRoaXMub25BY3Rpb25DYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgICAgIC8qIGRvIG5vdGhpbmcgKi8gTG9nZ2VyLkluZm8oXG4gICAgICAgICAgICAgICAgTG9nZ2VyLkdldFN0YWNrVHJhY2UoKSxcbiAgICAgICAgICAgICAgICAnRGlkIHlvdSBmb3JnZXQgdG8gc2V0IHRoZSBvbkFjdGlvbiBjYWxsYmFjayBpbiB5b3VyIG92ZXJsYXk/J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHRleHQgb3ZlcmxheXMgaW5uZXIgdGV4dFxuICAgICAqIEBwYXJhbSB0ZXh0IHRoZSB1cGRhdGUgdGV4dCB0byBiZSBpbnNlcnRlZCBpbnRvIHRoZSBvdmVybGF5XG4gICAgICovXG4gICAgcHVibGljIHVwZGF0ZSh0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRleHQgIT0gbnVsbCB8fCB0ZXh0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy50ZXh0RWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IGEgbWV0aG9kIGFzIGFuIGV2ZW50IGVtaXR0ZXIgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sgdGhlIG1ldGhvZCB0aGF0IGlzIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkXG4gICAgICovXG4gICAgb25BY3Rpb24oY2FsbEJhY2s6ICguLi5hcmdzOiBbXSkgPT4gdm9pZCkge1xuICAgICAgICB0aGlzLm9uQWN0aW9uQ2FsbGJhY2sgPSBjYWxsQmFjaztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBY3RpdmF0ZSBhbiBldmVudCB0aGF0IGlzIGF0dGFjaGVkIHRvIHRoZSBldmVudCBlbWl0dGVyXG4gICAgICovXG4gICAgYWN0aXZhdGUoKSB7XG4gICAgICAgIHRoaXMub25BY3Rpb25DYWxsYmFjaygpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogQ2xhc3MgZm9yIHRoZSBiYXNlIG92ZXJsYXkgc3RydWN0dXJlXG4gKi9cbmV4cG9ydCBjbGFzcyBPdmVybGF5QmFzZSB7XG4gICAgcHJvdGVjdGVkIHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcm9vdERpdjogSFRNTEVsZW1lbnQ7XG4gICAgcHVibGljIHRleHRFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhbiBvdmVybGF5XG4gICAgICogQHBhcmFtIHJvb3REaXYgdGhlIHJvb3QgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvXG4gICAgICogQHBhcmFtIHJvb3RFbGVtZW50IHRoZSByb290IGVsZW1lbnQgdGhhdCBpcyB0aGUgb3ZlcmxheVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihcbiAgICAgICAgcm9vdERpdjogSFRNTEVsZW1lbnQsXG4gICAgICAgIHJvb3RFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICAgICAgdGV4dEVsZW1lbnQ6IEhUTUxFbGVtZW50XG4gICAgKSB7XG4gICAgICAgIHRoaXMucm9vdERpdiA9IHJvb3REaXY7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQgPSByb290RWxlbWVudDtcbiAgICAgICAgdGhpcy50ZXh0RWxlbWVudCA9IHRleHRFbGVtZW50O1xuICAgICAgICB0aGlzLnJvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMudGV4dEVsZW1lbnQpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgdGhpcy5yb290RGl2LmFwcGVuZENoaWxkKHRoaXMucm9vdEVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3cgdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW5TdGF0ZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWRkZW5TdGF0ZScpO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IEFjdGlvbk92ZXJsYXkgfSBmcm9tICcuL0FjdGlvbk92ZXJsYXknO1xuXG4vKipcbiAqIE92ZXJsYXkgc2hvd24gZHVyaW5nIGNvbm5lY3Rpb24sIGhhcyBhIGJ1dHRvbiB0aGF0IGNhbiBiZSBjbGlja2VkIHRvIGluaXRpYXRlIGEgY29ubmVjdGlvbi5cbiAqL1xuZXhwb3J0IGNsYXNzIENvbm5lY3RPdmVybGF5IGV4dGVuZHMgQWN0aW9uT3ZlcmxheSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgcm9vdCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgY29ubmVjdEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29ubmVjdEVsZW0uaWQgPSAnY29ubmVjdE92ZXJsYXknO1xuICAgICAgICBjb25uZWN0RWxlbS5jbGFzc05hbWUgPSAnY2xpY2thYmxlU3RhdGUnO1xuICAgICAgICByZXR1cm4gY29ubmVjdEVsZW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgY29udGVudCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheSwgd2hpY2ggY29udGFpbiB3aGF0ZXZlciBjb250ZW50IHRoaXMgZWxlbWVudCBjb250YWlucywgbGlrZSB0ZXh0IG9yIGEgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBjb25uZWN0Q29udGVudEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29ubmVjdENvbnRlbnRFbGVtLmlkID0gJ2Nvbm5lY3RCdXR0b24nO1xuICAgICAgICBjb25uZWN0Q29udGVudEVsZW0uaW5uZXJIVE1MID0gJ0NsaWNrIHRvIHN0YXJ0JztcbiAgICAgICAgcmV0dXJuIGNvbm5lY3RDb250ZW50RWxlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSBjb25uZWN0IG92ZXJsYXkgd2l0aCBhIGNvbm5lY3Rpb24gYnV0dG9uLlxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtIHRoZSBwYXJlbnQgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHBhcmVudEVsZW0sXG4gICAgICAgICAgICBDb25uZWN0T3ZlcmxheS5jcmVhdGVSb290RWxlbWVudCgpLFxuICAgICAgICAgICAgQ29ubmVjdE92ZXJsYXkuY3JlYXRlQ29udGVudEVsZW1lbnQoKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgbmV3IGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IEFjdGlvbk92ZXJsYXkgfSBmcm9tICcuL0FjdGlvbk92ZXJsYXknO1xuXG4vKipcbiAqIE92ZXJsYXkgc2hvd24gZHVyaW5nIGRpc2Nvbm5lY3Rpb24sIGhhcyBhIHJlY29ubmVjdGlvbiBlbGVtZW50IHRoYXQgY2FuIGJlIGNsaWNrZWQgdG8gcmVjb25uZWN0LlxuICovXG5leHBvcnQgY2xhc3MgRGlzY29ubmVjdE92ZXJsYXkgZXh0ZW5kcyBBY3Rpb25PdmVybGF5IHtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCByb290IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBkaXNjb25uZWN0T3ZlcmxheUh0bWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGlzY29ubmVjdE92ZXJsYXlIdG1sLmlkID0gJ2Rpc2Nvbm5lY3RPdmVybGF5JztcbiAgICAgICAgZGlzY29ubmVjdE92ZXJsYXlIdG1sLmNsYXNzTmFtZSA9ICdjbGlja2FibGVTdGF0ZSc7XG4gICAgICAgIHJldHVybiBkaXNjb25uZWN0T3ZlcmxheUh0bWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgY29udGVudCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheSwgd2hpY2ggY29udGFpbiB3aGF0ZXZlciBjb250ZW50IHRoaXMgZWxlbWVudCBjb250YWlucywgbGlrZSB0ZXh0IG9yIGEgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICAvLyBidWlsZCB0aGUgaW5uZXIgaHRtbCBjb250YWluZXJcbiAgICAgICAgY29uc3QgZGlzY29ubmVjdE92ZXJsYXlIdG1sQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpc2Nvbm5lY3RPdmVybGF5SHRtbENvbnRhaW5lci5pZCA9ICdkaXNjb25uZWN0QnV0dG9uJztcbiAgICAgICAgZGlzY29ubmVjdE92ZXJsYXlIdG1sQ29udGFpbmVyLmlubmVySFRNTCA9ICdDbGljayBUbyBSZXN0YXJ0JztcblxuICAgICAgICByZXR1cm4gZGlzY29ubmVjdE92ZXJsYXlIdG1sQ29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIGRpc2Nvbm5lY3Qgb3ZlcmxheSB3aXRoIGEgcmV0cnkgY29ubmVjdGlvbiBpY29uLlxuICAgICAqIEBwYXJhbSBwYXJlbnRFbGVtIHRoZSBwYXJlbnQgZWxlbWVudCB0aGlzIG92ZXJsYXkgd2lsbCBiZSBpbnNlcnRlZCBpbnRvLlxuICAgICAqL1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihwYXJlbnRFbGVtOiBIVE1MRWxlbWVudCkge1xuICAgICAgICBzdXBlcihcbiAgICAgICAgICAgIHBhcmVudEVsZW0sXG4gICAgICAgICAgICBEaXNjb25uZWN0T3ZlcmxheS5jcmVhdGVSb290RWxlbWVudCgpLFxuICAgICAgICAgICAgRGlzY29ubmVjdE92ZXJsYXkuY3JlYXRlQ29udGVudEVsZW1lbnQoKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgbmV3IGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IFRleHRPdmVybGF5IH0gZnJvbSAnLi9UZXh0T3ZlcmxheSc7XG5cbi8qKlxuICogR2VuZXJpYyBvdmVybGF5IHVzZWQgdG8gc2hvdyB0ZXh0dWFsIGVycm9yIGluZm8gdG8gdGhlIHVzZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBFcnJvck92ZXJsYXkgZXh0ZW5kcyBUZXh0T3ZlcmxheSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgcm9vdCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgZXJyb3JPdmVybGF5SHRtbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlcnJvck92ZXJsYXlIdG1sLmlkID0gJ2Vycm9yT3ZlcmxheSc7XG4gICAgICAgIGVycm9yT3ZlcmxheUh0bWwuY2xhc3NOYW1lID0gJ3RleHREaXNwbGF5U3RhdGUnO1xuICAgICAgICByZXR1cm4gZXJyb3JPdmVybGF5SHRtbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCBjb250ZW50IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LCB3aGljaCBjb250YWluIHdoYXRldmVyIGNvbnRlbnQgdGhpcyBlbGVtZW50IGNvbnRhaW5zLCBsaWtlIHRleHQgb3IgYSBidXR0b24uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGVycm9yT3ZlcmxheUh0bWxJbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlcnJvck92ZXJsYXlIdG1sSW5uZXIuaWQgPSAnZXJyb3JPdmVybGF5SW5uZXInO1xuICAgICAgICByZXR1cm4gZXJyb3JPdmVybGF5SHRtbElubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIGNvbm5lY3Qgb3ZlcmxheSB3aXRoIGEgY29ubmVjdGlvbiBidXR0b24uXG4gICAgICogQHBhcmFtIHBhcmVudEVsZW0gdGhlIHBhcmVudCBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG8uXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmVudEVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcGFyZW50RWxlbSxcbiAgICAgICAgICAgIEVycm9yT3ZlcmxheS5jcmVhdGVSb290RWxlbWVudCgpLFxuICAgICAgICAgICAgRXJyb3JPdmVybGF5LmNyZWF0ZUNvbnRlbnRFbGVtZW50KClcbiAgICAgICAgKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBUZXh0T3ZlcmxheSB9IGZyb20gJy4vVGV4dE92ZXJsYXknO1xuXG4vKipcbiAqIEdlbmVyaWMgb3ZlcmxheSB1c2VkIHRvIHNob3cgdGV4dHVhbCBpbmZvIHRvIHRoZSB1c2VyLlxuICovXG5leHBvcnQgY2xhc3MgSW5mb092ZXJsYXkgZXh0ZW5kcyBUZXh0T3ZlcmxheSB7XG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgcm9vdCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgY29uc3QgaW5mb092ZXJsYXlIdG1sID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGluZm9PdmVybGF5SHRtbC5pZCA9ICdpbmZvT3ZlcmxheSc7XG4gICAgICAgIGluZm9PdmVybGF5SHRtbC5jbGFzc05hbWUgPSAndGV4dERpc3BsYXlTdGF0ZSc7XG4gICAgICAgIHJldHVybiBpbmZvT3ZlcmxheUh0bWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMgVGhlIGNyZWF0ZWQgY29udGVudCBlbGVtZW50IG9mIHRoaXMgb3ZlcmxheSwgd2hpY2ggY29udGFpbiB3aGF0ZXZlciBjb250ZW50IHRoaXMgZWxlbWVudCBjb250YWlucywgbGlrZSB0ZXh0IG9yIGEgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBpbmZvT3ZlcmxheUh0bWxJbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBpbmZvT3ZlcmxheUh0bWxJbm5lci5pZCA9ICdtZXNzYWdlT3ZlcmxheUlubmVyJztcbiAgICAgICAgcmV0dXJuIGluZm9PdmVybGF5SHRtbElubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIGNvbm5lY3Qgb3ZlcmxheSB3aXRoIGEgY29ubmVjdGlvbiBidXR0b24uXG4gICAgICogQHBhcmFtIHBhcmVudEVsZW0gdGhlIHBhcmVudCBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG8uXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmVudEVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcGFyZW50RWxlbSxcbiAgICAgICAgICAgIEluZm9PdmVybGF5LmNyZWF0ZVJvb3RFbGVtZW50KCksXG4gICAgICAgICAgICBJbmZvT3ZlcmxheS5jcmVhdGVDb250ZW50RWxlbWVudCgpXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgQWN0aW9uT3ZlcmxheSB9IGZyb20gJy4vQWN0aW9uT3ZlcmxheSc7XG5cbi8qKlxuICogT3ZlcmxheSBzaG93biB3aGVuIHN0cmVhbSBpcyByZWFkeSB0byBwbGF5LlxuICovXG5leHBvcnQgY2xhc3MgUGxheU92ZXJsYXkgZXh0ZW5kcyBBY3Rpb25PdmVybGF5IHtcbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCByb290IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlUm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdCBwbGF5RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwbGF5RWxlbS5pZCA9ICdwbGF5T3ZlcmxheSc7XG4gICAgICAgIHBsYXlFbGVtLmNsYXNzTmFtZSA9ICdjbGlja2FibGVTdGF0ZSc7XG4gICAgICAgIHJldHVybiBwbGF5RWxlbTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyBUaGUgY3JlYXRlZCBjb250ZW50IGVsZW1lbnQgb2YgdGhpcyBvdmVybGF5LCB3aGljaCBjb250YWluIHdoYXRldmVyIGNvbnRlbnQgdGhpcyBlbGVtZW50IGNvbnRhaW5zLCBsaWtlIHRleHQgb3IgYSBidXR0b24uXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIC8vIHRvZG86IGNoYW5nZSB0aGlzIHRvIGFuIHN2Z1xuICAgICAgICBjb25zdCBwbGF5T3ZlcmxheUh0bWxJbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBwbGF5T3ZlcmxheUh0bWxJbm5lci5pZCA9ICdwbGF5QnV0dG9uJztcbiAgICAgICAgcGxheU92ZXJsYXlIdG1sSW5uZXIuc3JjID1cbiAgICAgICAgICAgICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQVBFQUFBRDVDQVlBQUFEMm1OTmtBQUFBQVhOU1IwSUFyczRjNlFBQUFBUm5RVTFCQUFDeGp3djhZUVVBQUFBSmNFaFpjd0FBRHNNQUFBN0RBY2R2cUdRQUFBQVpkRVZZZEZOdlpuUjNZWEpsQUhCaGFXNTBMbTVsZENBMExqQXVNakh4SUdtVkFBQVNna2xFUVZSNFh1MmRDN0JkVlgySHFVQ0NJUkFTQ1BqQUZJUVJFQlJCQlNSWWJGT3Q4bElyRlVXUkZxWFdzVDV3Ykl0VXFGV3MwS3FJTVBLb1lFV3BSUzA2S0RqUzFCZVZGa1ZRYkN3K3dDZmlBd0doQ0tXUDlQdVp0VTI0dVRlNTl6ejIyWS92bS9uR2tYdHo3amxycjkrc2RmWmVhLzAzV2IxNjlRdHhHVzYyaVlpMEQ4TDdOYndZajhFZGNkUHlJeEZwQTRUMlAvRi84VWE4Q0kvR2hQblh5cStJU0pNaHJBbHh4WDloUnVZTDhTaDhTUGsxRVdrcUJIWGRFRmZjZzZ2dzNmaHMzS2I4dW9nMERRSTZYWWdyOHJPdllzSjhPTTR2LzB4RW1rSUo2b2I0UDh6SWZBTmVnQ3ZRTUlzMEJRSzVzUkJYSk15L3dJek01K0J5WEZCZVJrUW1CVUdjYllqWDVTNU1tTS9BQTNDTDhuSWlVamNFY0pBUVY5eUJYOGEvd1NlaXo1aEY2b2JnRFJQaWtHZk1DZk9YOERUY3U3eTBpTlFCb1JzMnhCWC9nM2Rpd3Z3bTNLbjhDUkVaSjRSdFZDR3VxTUtjdTlrbjR4SjA5WmZJdUNCZ293NXh5SjNzVExOekF5d3J3RjZKMjZOaEZoazFCR3NjSVY2WGhQbHV2QTZQeHgzS254YVJVVUNveGgzaWlvUTV6NW4vQlkvRkplVXRpTWd3RUthNlFseVJNTitIbjhIbjRaYmxyWWpJSUJDaXVrTWM4cDI1V3M2Wk1EK3p2QjBSbVNzRWFCSWhua3JldzVWNEVIckNpTWhjS0FGcUN2K05sK0ordUJDOW15MnlNUWhLazBKY2tlL003OEdzeTA2WUgxVGVyb2hNaFlBME1jUVZQOE56OFVEY0NsMmJMVElWZ3RIa0VGZDhEOC9FL1hGcmRHUVdxU0FRYlFoeHlLT3BtL0IwM0FjOU1rZ2tFSWEyaExnaU43OFM1bFB4MGJnSXZRRW0vWVVBdEMzRUZRbnp6ZmdudURjNnpaWitRc2R2YTRqWDVTdjRhdHdYSFptbFg5RGh1eERpa0MyUW44ZFhZVWJtUmVVamluUWJPbnRYUWx5UlRSYWZ3bGRnd3J4VithZ2kzWVJPM3JVUVYvd2NWK0xMOERIb3laelNUZWpjWFExeFJjNy91aHl6bDNrdjNMeDhkSkZ1UUtmdWVvaERuakZuWlA0by9qN20wWlFINEVzM29EUDNJY1FWMmY2WU1GK0NPWmpnVWVpWjJkSnU2TVI5Q3ZHNjNJTHZ4NHpNQ2ZPODBpUWk3WUxPMjljUVYzd2IzNHNwc3I0cnVtQkUyZ1dkdHU4aERsbjk5UzFNWGVZWDRNNmxlVVNhRHgzV0VLOGxSZFlUNWxSL3pQbGZuc3dwelllT2FvalhKNGNTZkIzUHcrZmd0dWcwVzVvSm5kTVFUMC91WkdlYVhaVnlmVFp1VjVwTnBEblFNUTN4eHNrME85VWZ6OFpEY2R2U2ZDS1RodzVwaUdkUDJpb0Y0OTZKVDBjM1djamtLUjFUNWtZV2pDVE03OERmUWhlTXlPU2dBeHJpd2NoMzVsUi92QWJQd09Yb3pTK3BIenFlSVI2T2FsMTJ3dngyZkJ5NnlVTHFndzVuaUVkRHdweVIrVnBNa2ZYc21ISXBwNHdmT3BvaEhqMjM0UmZ3Rk53RG5XYkwrS0NER2VMeGtKSDVwM2cxdmc1M0swMHVNbHJvWElaNHZHVEJTTUo4RmVaa3ptV2w2VVZHQTUzS0VOZkQvWml5TkNteW52Ty9GcGRMSURJY2RDWkRYQzhabWZPZCtkL3dKZWpaWHpJY2RDSkRYRDk1eHB3amRuUCtWNzR6SDRXdS9wTEJvUE1ZNHNtU01OK0ZLYkorQkJwbW1SdDBHa1BjREJMbXUvRmplQWk2bEZObUI1M0ZFRGVIVExQemFDb2o4MGR3QmZxTVdUWU1uY1FRTjVlc0FQc3c3bGN1bDhqNjBFRU1jZlBKRGJEM1lVN2wzS3hjT3BFMTBDa01jVHZJVkR2Zm1jL0UzWEVMdFBxakdPS1draFZncCtHZW1ERDd2Ym5QMEFFTWNYdEprZlUzNEdOeEFUb3k5eEV1dkNGdVA2dndKTXlPcVlYbDBrcGY0S0liNG01UW5jeVpUUmFwWkdHWSt3SVgyeEIzaTN2eE9zd21pMTNRYVhiWDRRSWI0bTZTWTNhL2lNZGg3bVliNXE3Q2hUWEUzYVhhYUxFU3E3ck1XNVpMTDEyQmkycUkrOEU5ZURrbXpMdWhZZTRLWEV4RDNCOHlNdCtPbCtLTDBDTHJYWUNMYUlqN1I4SjhLMTZDUjZQTE9kc01GODhROTVmc21Qb1JYb3pQeGR6TmR2VlgyK0NpR1dMSnphK0VPWFdaajhTZDBBUHcyd0lYeXhCTHFQWXkzNExuWThLOERBMXowK0VpR1dLWlNnSjlJNzRMVTJSOVIzU2EzVlM0T0laWVpxSmF5bmtXcHNqNncwdTNrU2JCaFRIRXNqSHV3eHN3cFZ3UHc2V2wrMGdUNElJWVlwa05tV0tucjF5UHFmNTRLRzVWdXBGTWtuSmhSR1pMd3B6Vlg2bisrRFo4R3JwamFwSndBUXl4REVMQ25CMVRxV1R4MS9nVWRHU2VCRFM4SVpaQlNaQmp6djc2UFA0VkhvU0d1VTVvY0VNc295QmhUc0c0Vkg5OEl4NkE4MHMzazNGQ1F4dGlHU1ZaTVBJVC9Dd216UHVoejVqSENRMXNpR1VjWkNsbnd2eHBQQVgzTEYxT1JnMk5hNGhsWEdTS25RVWpDZk5uOFBYNENOeTBkRDhaQlRTb0laWnhrekJYSS9QbjhBVE11bXpEUEFwb1NFTXNkWkV3NXp2ekR6SFQ3SmRqd3V6Wlg4TkFBeHBpbVFTWlppZk1uOFRqOGFHbFM4cGNvZkVNc1V5S2pNdzVsVE9uakh3Y2MyVFFrdEkxWmJiUWFJWllKazNDbkUwV0dabXZ3T2VoKzVobkM0MWxpS1VwVkNOend2d0pQQnk5K2JVeGFDUkRMRTBqWWI0ZlUvMHgwK3lEOGNHbHk4cFVhQnhETEUwa1FhN0NmQ2ZtTUw4RDBTTjJwMEtqR0dKcE9nbHp0V2draC9rOUNUMWl0NExHTU1UU0ZoTG1MQnJKM2V4emNKL1NqZnNORFdHSXBZMGswRC9BTS9HUnBUdjNFeHJBRUV1YnFWYUFuWTVMc1g5M3MvblFobGk2UUxVRjhuV1lJM2JuWVQrV2MvSkJEYkYwaGVxTzlqZndsZmhJbkkvZERqTWYwQkJMRjBtWXI4TnNza2lOcVMyd20ySG1neGxpNlRKNXpwd2pnLzRRZDhidUxScmhReGxpNlFNNVpqZEhCaDJIK2M3Y25VVWpmQmhETEgwaFUreTdjQ1UrSDdPWGVWNkpRbnZoUXhoaTZSc0pjMGJteS9CWitNc2JZQ1VTN1lNM2I0aWxyeVRNMlFMNVFVekJ1SHhuYnQ4MG16ZHRpRVZXcjc0Tkw4S1VjazJSOWZhTXpMeFpReXl5aG96TVdjcDVJZjR1SnN6TlA1eUFOMm1JUlI1SVZuL2RqT2ZoRWRqc3cveDRjNFpZWkhyeWpQa21QQnNQd1llVjJEUUwzcGdoRnBtWlRMRnpaRkRDbkxyTXo4RHRzVGtiTFhnemhsaGs0eVRNMmN1OENyTmpLaU56d2p6NU9sTzhDVU1zTWpjUzVxekxmZ3VteVByMkpVNlRnVGRnaUVVR295cXlucnJNdjQyVE9UT2JQMnlJUlFZbjArd3M1YndhVThyMU4zSHJFcTk2NEE4YVlwSGhTWmp2d0JTTVM1Z1B3bnJXWmZPSERMSEk2TWd6NWh5eG00SnhmNGtINEhqRHpCOHd4Q0tqSjJIT05QdWY4Yzl4SHh6UFhtWmUyQkNMaklkTXNXTXFXZndUbm9pUHdkR096THlnSVJZWlB3bHpWV1BxdGJnWGptYkJDQzlraUVYcUk4K1lzOG5pY253TjdsYWlPRGk4aUNFV3FaZU15bG1YblRDbllGeE81dHl4UkhMdThJOE5zY2hrU0ppekx2djdtSkg1cGJnWTU3WmppbjlnaUVVbVN6VXlmdzlUWlAxWTNMWkVkT1B3eTRaWXBCa2t6S24rK0IzOEtCNkYyNVdvemd5L1pJaEZta1hDbkxPL3Zvc2Z3cHd5c3FoRWRuMzRvU0VXYVNZSjh5OHcwK3dQNEdHNC9vSVIvcU1oRm1rMlZaZ3p6VTZZczJOcTdUNW0vbzhoRm1rSENYTzJQeWJNRitPKytDQkRMTkl1RXVTc3k4NTM1bHZ4WkVNczBqNnFXc3paSmJYVUVJdTBpMXZ3clpocUZadjVuVmlrUFdUcWZBNW1GOVFERCtmalB4aGlrZWFSNzc3eGRyd0FuMUFpdXo3ODBCQ0xOSXZzZE1xQkFxa050UnczWEJlS1h6REVJcE1ubzI3Q2V6ZGVpay9HQlNXbUc0WmZOTVFpa3lQaHpYcnBWR1hNNlI4cmNHN2xWZmtIaGxpa2ZoTGU3RnpLbzZLVitIdTQ1bTd6WE9FZkdtS1Jlc2tlNG9UM2szZ01ibG5pT0JpOGdDRVdxWWVNdkQvR0svRjQzS0hFY0RoNElVTXNNbDV5dytwSG1MT29YNGFESDhVekhieWdJUllaRC9uZW01SDNLandCZDhMUlYxSGtSUTJ4eUdqSjNlYWNOWjFpYXlmaHIrUDQ2aG56NG9aWVpEUmsycHp3cGg3VFgrQ3VPUDc2eGZ3UlF5d3lITmxWVklYM1ZIeDhpVmM5OEFjTnNjamdaSkZHeXBxK0dmZkh3WjcxRGdOLzFCQ0x6SjJmNDcvaVd6QmxUSWQ3MWpzTS9IRkRMREk3Y3JmNUhyd0czNFlIWTcwRnhhZUROMkdJUlRaTXdwdmpjSzdGZCtCVGNmTGhyZUROR0dLUm1jbkllejIrRXcvRmhUaTNNaXZqaGpka2lFWFdKMGZFZmhYUHdtZmk0aEtaNXNHYk04UWlhOG42NWxYNExremxoWWVWcURRWDNxUWhGbG56clBjLzhGek10c0JsMkt4cDgwendSZzJ4OUowY3huNGVwb0JabGtqVy82eDNHSGpEaGxqNlNKWkk1Z1RKOStEek1lSGR2TVNpWGZER0RiSDBpV3BiWU1xZ0pMeTdZTHRHM3Fud0FReXg5SVZzQzd3RVg0Qzc0L2gyRnRVSkg4UVFTOWZKVVRnNVFmSTQzQVBubGU3ZkRmaEFobGk2U281Ly9SaStHQlBleWExdkhpZDhNRU1zWFNNSDBYMENYNEo3NGNMUzNic0pIOUFRUzFmSVRhdnM2ZjFWZUxFZHozcUhnUTlwaUtYdFpITkMxamZuRUxwZlRwdXgrK0d0NE1NYVlta3JtVFovR1YrTENXKzNwODB6d1FjM3hOSTJza1R5QnN3aGRIdGljN1lGVGdJYXdCQkxtN2dSVDhISDRkYlluMm56VE5BSWhsamFRQ3JrdndrVDN0eXdHdjhwa20yQnhqREUwbFJ5b2tiT3Nqb0RVeUUvTjZ3TTcxUm9GRU1zVFNQaHZSUGZqWS9HQmVpMGVTWm9IRU1zVGVKMi9BRHVnKzNjVlZRM05KUWhsaWFRa2ZjZjhTbm9xRHNYYURCRExKTWlqNHJ1eGN2d2FlaklPd2cwbkNHV3Vzbnl5SVQzQ2p3TSs3bElZMVRRZ0laWTZpQTNxekx5Wm1kUlNuMGVpYzA5UWJKTjBKQ0dXTVpKd3B1Ujl3NzhFcjRRdTdrbGNGTFFvSVpZeGtYcTlPWnVjMm9XWlhOQ3Y1ZEhqZ3NhMWhETHFLbkNtMnFCMlp6dzBOTGRaQnpRd0laWVJrV216VC9EaFBkRTNLVjBNeGtuTkxRaGxtSEo5OTZFTndYSHNqa2hxNnhjSGxrWE5MWWhsa0ZKZUhQREtodnlzemtoNFczMzhhOXRoRVkzeERKWDhxZ29HeE1TM3RUcGZTek9MMTFLNm9iR044UXlXeExlTEkvTXREbWxQdmRIcDgyVGhvdGdpR1UyWk9TdHdyc0NYU0xaRkxnWWhsZzJ4RjJZYzZ6T3hxZWpDeldhQmhmRkVNdDBwTWoyVnpCMWVnL0JKYVhMU05QZzRoaGlxY2pkNWl6VVNJWDhsUHA4Rmk0dFhVV2FDaGZKRUV0SWhmd1UyYjRRVTJSN08zUmZieHZnUWhuaWZwT0QxNytKQ1c5S2ZTNUY3emkzQ1M2WUllNG5PWGo5Vy9oM2VBdyt2SFFKYVJ0Y1BFUGNML0tzOTJhOENJL0ZYZEZwYzV2aEFocmkvdkI5L0h2OEEzd1V1a1N5QzNBaERYSDMrU24rQXg2UHFaRHZFc2t1d1FVMXhOMmtPZ29uSjBpbTFHYzJKMnhSTHJ0MENTNnNJZTRXMWM2aWoyTkczbFJPbUZjdXQzUVJMckFoN2c0Sjc1WDRSN2czR3Q0K3dJVTJ4TzBuMCtaUDRhc3dCY2RjMzl3bnVPQ0d1TDNrV2UvbjhEVzRMeTRxbDFYNkJCZmVFTGVUTCtBSitBVGNCbjNXMjFlNCtJYTRQZVNPODlmd1QvR0p1QWhkSXRsMzZBU0d1UGxrWjlHMzhmV1lvM0F5OGhwZVdRT2R3UkEzbHh3QmV4TytHVlBxMDdJbnNqNTBERVBjVExLKytlMlljNndXbzk5NVpYcm9ISWE0V2R5S09RcG5PV2JhdkdtNVZDTFRReWN4eE0wZ3AwaWVqMC9HM0xBeXZESTc2Q3lHZUhKVXgrRzhIdzlFd3l0emgwNWppQ2RERHFLN0hBL0FoZWgzWGhrTU9vOGhycGUwOTZmeGQ5RDl2REk4cFZQSitMa1hQNHZQUWFmTU1qcm9VSVo0Zk9RN2I5WTNYNFU1eDhvaTJ6SjY2RmlHZVBSa2VXUk9rZndpSG9lZTNTempndzVtaUVkRFJ0MTREK2J3OVpmakRxV1pSY1lISGMwUUQwOTFGRTZPZ1AwejlPQjFxUTg2bXlFZW5LeHRUbmd6OHI0QkhYbWxmdWg0aG5qdUpMd3A5WmxxZ2FmaDdxVTVSZXFIRG1pSVowK216VmtlZVFPK0ZSOWZtbEZrY3RBUkRmSHNTSjNlZjhkcVo1R0gwRWt6b0RNYTRwbkozZWEwVDA3VE9BZXp2bmxCYVRxUlpsQTZxVHlRaERkcm0xZmhCWGd3R2w1cEpuUk9RN3lXNmpsdnd2dGVmQVp1WHBwS3BKbVVUaXRycDgwcDlabjF6UTh1VFNUU2JPaXNmUTl4cHMycGtKL3dQaGUzSzAwajBnN290SDBOOGYzNGRYd2ZIbzBXMlpaMlF1ZnRZNGl6UERLbmFid0lINEVlL3lydGhRN2NseEJubGRVUDhCSjhNU2E4N3V1VjlrTkg3bnFJYzRaVnd2c2hmQ2t1UThNcjNZRU8zZFVRWjRua0QvSERtRktmZTVTUExOSXQ2TnhkREhIQyt4RjhCYWJzaVNPdmRCYzZlSmRDZkJ0ZWhnbHZpbXo3ckZlNkR4MjlDeUhPUW8wcjhOV1lPcjBXMlpiK1FJZHZhNGl6UkRMUGVsZGk2dlNtMU9mQzhyRkUrZ01kdjQwaHpudStHbE1oZnovY0VqME9SL29KbmI5TkljNTd2UVpQeENlaEk2OUlDVWJUeWRuTjErTEptUEF1S1c5ZlJBaEVrME9jWjczWFl3NmhPd2c5djFsa0tnU2pxU0hPNW9SVDhUZHdLYnErV1dRNkNFZVRRcHc3emxtb2NUcW1UbS9PYjdib21NaUdJQ1JOQ0hHbXpUL0JzekNsUGpQeXVzcEtaRFlRbGttSCtNZjR0N2djdDBlbnpTSnpnZEJNS3NRSjcwWDRWSFRrRlJrVXdsTjNpRk01NFlONEtHNkxIa1FuTWd5RXFLNFE1MW52cFpqd1p1UTF2Q0tqZ0REVkVlSXI4WEJNZUwzYkxESktDTlc0UXB5Ujl6bzhBcmRCYjFpSmpBUENOZW9RSjd5cEZuZ3N6a2MzSm9pTUUwSTJxaERuV1c4S2p2MHh1akZCcEM0STNEQWh6Z3FySEVTWFVwL1owL3VROHJJaVVoY0ViNUFRSjd6MzRUZndKTnk1dkp5STFBMEJuRzJJRTl5WXNpZmZ3VGZpenVoM1hwRkpRZ2huRStKODMwMTR2NHVwa0w4citxaElwQWtReGcyRk9PSE56ek50UGhmM1JFZGVrU1pSUWpxVlRKdHpndVNOZUQ0ZVdINWRSSm9HQVowYTRydnhtM2docmtDbnpTSk5ocEJXSWM3L3BscGd3cHVkUlo3ZExOSUdDT3Z0SmJ3WDQyRzR1UHhJUk5vQW9VMmQzaU54VWZsUEl0SWFOdG5rL3dFR0JvTWRwRUNHSEFBQUFBQkpSVTVFcmtKZ2dnPT0nO1xuICAgICAgICBwbGF5T3ZlcmxheUh0bWxJbm5lci5hbHQgPSAnU3RhcnQgU3RyZWFtaW5nJztcbiAgICAgICAgcmV0dXJuIHBsYXlPdmVybGF5SHRtbElubmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCBhIGNvbm5lY3Qgb3ZlcmxheSB3aXRoIGEgY29ubmVjdGlvbiBidXR0b24uXG4gICAgICogQHBhcmFtIHBhcmVudEVsZW0gdGhlIHBhcmVudCBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG8uXG4gICAgICovXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHBhcmVudEVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKFxuICAgICAgICAgICAgcGFyZW50RWxlbSxcbiAgICAgICAgICAgIFBsYXlPdmVybGF5LmNyZWF0ZVJvb3RFbGVtZW50KCksXG4gICAgICAgICAgICBQbGF5T3ZlcmxheS5jcmVhdGVDb250ZW50RWxlbWVudCgpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBuZXcgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgdGhpcy5yb290RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgT3ZlcmxheUJhc2UgfSBmcm9tICcuL0Jhc2VPdmVybGF5JztcblxuLyoqXG4gKiBDbGFzcyBmb3IgdGhlIHRleHQgb3ZlcmxheSBiYXNlXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXh0T3ZlcmxheSBleHRlbmRzIE92ZXJsYXlCYXNlIHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3QgYSB0ZXh0IG92ZXJsYXlcbiAgICAgKiBAcGFyYW0gcm9vdERpdiB0aGUgcm9vdCBlbGVtZW50IHRoaXMgb3ZlcmxheSB3aWxsIGJlIGluc2VydGVkIGludG9cbiAgICAgKiBAcGFyYW0gcm9vdEVsZW1lbnQgdGhlIHJvb3QgZWxlbWVudCB0aGF0IGlzIHRoZSBvdmVybGF5XG4gICAgICogQHBhcmFtIHRleHRFbGVtZW50IGFuIGVsZW1lbnQgdGhhdCBjb250YWlucyB0ZXh0IGZvciB0aGUgYWN0aW9uIG92ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXG4gICAgICAgIHJvb3REaXY6IEhUTUxFbGVtZW50LFxuICAgICAgICByb290RWxlbWVudDogSFRNTEVsZW1lbnQsXG4gICAgICAgIHRleHRFbGVtZW50OiBIVE1MRWxlbWVudFxuICAgICkge1xuICAgICAgICBzdXBlcihyb290RGl2LCByb290RWxlbWVudCwgdGV4dEVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgdGV4dCBvdmVybGF5cyBpbm5lciB0ZXh0XG4gICAgICogQHBhcmFtIHRleHQgdGhlIHVwZGF0ZSB0ZXh0IHRvIGJlIGluc2VydGVkIGludG8gdGhlIG92ZXJsYXlcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlKHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGV4dCAhPSBudWxsIHx8IHRleHQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnRleHRFbGVtZW50LmlubmVySFRNTCA9IHRleHQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKiBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLiAqL1xuXG5pbXBvcnQganNzLCB7IFN0eWxlcyB9IGZyb20gJ2pzcyc7XG5pbXBvcnQgZ2xvYmFsIGZyb20gJ2pzcy1wbHVnaW4tZ2xvYmFsJztcbmltcG9ydCBjYW1lbENhc2UgZnJvbSAnanNzLXBsdWdpbi1jYW1lbC1jYXNlJztcblxuZXhwb3J0IGludGVyZmFjZSBDb2xvclBhbGV0dGUge1xuICAgICctLWNvbG9yMCc6IHN0cmluZztcbiAgICAnLS1jb2xvcjEnOiBzdHJpbmc7XG4gICAgJy0tY29sb3IyJzogc3RyaW5nO1xuICAgICctLWNvbG9yMyc6IHN0cmluZztcbiAgICAnLS1jb2xvcjQnOiBzdHJpbmc7XG4gICAgJy0tY29sb3I1Jzogc3RyaW5nO1xuICAgICctLWNvbG9yNic6IHN0cmluZztcbiAgICAnLS1jb2xvcjcnOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBQaXhlbFN0cmVhbWluZ0FwcGxpY2F0aW9uU3R5bGUge1xuICAgIGRlZmF1bHRMaWdodE1vZGVQYWxldHRlOiBDb2xvclBhbGV0dGUgPSB7XG4gICAgICAgICctLWNvbG9yMCc6ICcjZTJlMGRkODAnLFxuICAgICAgICAnLS1jb2xvcjEnOiAnI0ZGRkZGRicsXG4gICAgICAgICctLWNvbG9yMic6ICcjMDAwMDAwJyxcbiAgICAgICAgJy0tY29sb3IzJzogJyMwNTg1ZmUnLFxuICAgICAgICAnLS1jb2xvcjQnOiAnIzM1YjM1MCcsXG4gICAgICAgICctLWNvbG9yNSc6ICcjZmZhYjAwJyxcbiAgICAgICAgJy0tY29sb3I2JzogJyNlMWUyZGQnLFxuICAgICAgICAnLS1jb2xvcjcnOiAnI2MzYzRiZidcbiAgICB9O1xuXG4gICAgZGVmYXVsdERhcmtNb2RlUGFsZXR0ZTogQ29sb3JQYWxldHRlID0ge1xuICAgICAgICAnLS1jb2xvcjAnOiAnIzFEMUYyMjgwJyxcbiAgICAgICAgJy0tY29sb3IxJzogJyMwMDAwMDAnLFxuICAgICAgICAnLS1jb2xvcjInOiAnI0ZGRkZGRicsXG4gICAgICAgICctLWNvbG9yMyc6ICcjMDU4NWZlJyxcbiAgICAgICAgJy0tY29sb3I0JzogJyMzNWIzNTAnLFxuICAgICAgICAnLS1jb2xvcjUnOiAnI2ZmYWIwMCcsXG4gICAgICAgICctLWNvbG9yNic6ICcjMWUxZDIyJyxcbiAgICAgICAgJy0tY29sb3I3JzogJyMzYzNiNDAnXG4gICAgfTtcblxuICAgIGRlZmF1bHRTdHlsZXMgPSB7XG4gICAgICAgICc6cm9vdCc6IHtcbiAgICAgICAgICAgICctLWNvbG9yMCc6ICcjMUQxRjIyODAnLFxuICAgICAgICAgICAgJy0tY29sb3IxJzogJyMwMDAwMDAnLFxuICAgICAgICAgICAgJy0tY29sb3IyJzogJyNGRkZGRkYnLFxuICAgICAgICAgICAgJy0tY29sb3IzJzogJyMwNTg1ZmUnLFxuICAgICAgICAgICAgJy0tY29sb3I0JzogJyMzNWIzNTAnLFxuICAgICAgICAgICAgJy0tY29sb3I1JzogJyNmZmFiMDAnLFxuICAgICAgICAgICAgJy0tY29sb3I2JzogJyMxZTFkMjInLFxuICAgICAgICAgICAgJy0tY29sb3I3JzogJyMzYzNiNDAnLFxuICAgICAgICAgICAgJy0tY29sb3I4JzogJyM0MTAwOGMnLFxuICAgICAgICAgICAgJy0tY29sb3I5JzogJyMzZTAwNzAnLFxuICAgICAgICAgICAgJy0tY29sb3IxMCc6ICcjMmUwMDUyJyxcbiAgICAgICAgICAgICctLWNvbG9yMTEnOiAncmdiYSg2NSwwLDEzOSwxKSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5ub3NlbGVjdCc6IHtcbiAgICAgICAgICAgIHVzZXJTZWxlY3Q6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICAnI3BsYXllclVJJzoge1xuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICAgICAgfSxcbiAgICAgICAgJyN2aWRlb0VsZW1lbnRQYXJlbnQnOiB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yMSknXG4gICAgICAgIH0sXG4gICAgICAgICcjdWlGZWF0dXJlcyc6IHtcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIHpJbmRleDogJzMwJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJ1xuICAgICAgICB9LFxuICAgICAgICAnLlVpVG9vbCAudG9vbHRpcHRleHQnOiB7XG4gICAgICAgICAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICAgICAgICAgIHdpZHRoOiAnYXV0bycsXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMiknLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzE1cHgnLFxuICAgICAgICAgICAgcGFkZGluZzogJzBweCAxMHB4JyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IFwiJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmXCIsXG4gICAgICAgICAgICBmb250U2l6ZTogJzAuNzVyZW0nLFxuICAgICAgICAgICAgbGV0dGVyU3BhY2luZzogJzAuNzVweCcsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHRvcDogJzAnLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgyNSUpJyxcbiAgICAgICAgICAgIGxlZnQ6ICcxMjUlJyxcbiAgICAgICAgICAgIHpJbmRleDogJzIwJ1xuICAgICAgICB9LFxuICAgICAgICAnLlVpVG9vbDpob3ZlciAudG9vbHRpcHRleHQnOiB7XG4gICAgICAgICAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjcpJ1xuICAgICAgICB9LFxuICAgICAgICAnI2Nvbm5lY3Rpb24gLnRvb2x0aXB0ZXh0Jzoge1xuICAgICAgICAgICAgdG9wOiAnMTI1JScsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC0yNSUpJyxcbiAgICAgICAgICAgIGxlZnQ6ICcwJyxcbiAgICAgICAgICAgIHpJbmRleDogJzIwJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICc1cHggMTBweCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNjb25uZWN0aW9uJzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBib3R0b206ICc4JScsXG4gICAgICAgICAgICBsZWZ0OiAnNSUnLFxuICAgICAgICAgICAgZm9udEZhbWlseTogXCInTWljaHJvbWEnLCBzYW5zLXNlcmlmXCIsXG4gICAgICAgICAgICBoZWlnaHQ6ICczcmVtJyxcbiAgICAgICAgICAgIHdpZHRoOiAnM3JlbScsXG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiAnYWxsJ1xuICAgICAgICB9LFxuICAgICAgICAnI3NldHRpbmdzLXBhbmVsIC50b29sdGlwdGV4dCc6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICB0b3A6ICcxMjUlJyxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxuICAgICAgICAgICAgbGVmdDogJzAnLFxuICAgICAgICAgICAgekluZGV4OiAnMjAnLFxuICAgICAgICAgICAgcGFkZGluZzogJzVweCAxMHB4JyxcbiAgICAgICAgICAgIGJvcmRlcjogJzNweCBzb2xpZCB2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIHdpZHRoOiAnbWF4LWNvbnRlbnQnLFxuICAgICAgICAgICAgZmFsbGJhY2tzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogJ21heC1jb250ZW50J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgdmFyKC0tY29sb3IzKSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzVweCAxMHB4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6ICcyMCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogJzAnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogJzEyNSUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgICcjY29udHJvbHMnOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHRvcDogJzMlJyxcbiAgICAgICAgICAgIGxlZnQ6ICcyJScsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBcIidNaWNocm9tYScsIHNhbnMtc2VyaWZcIixcbiAgICAgICAgICAgIHBvaW50ZXJFdmVudHM6ICdhbGwnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgICAgICB9LFxuICAgICAgICAnI2NvbnRyb2xzPionOiB7XG4gICAgICAgICAgICBtYXJnaW5Cb3R0b206ICcwLjVyZW0nLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICBoZWlnaHQ6ICcycmVtJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6ICcxLjc1cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwLjVyZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcjY29udHJvbHMgI2FkZGl0aW9uYWxpbmZvJzoge1xuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6IFwiJ01vbnRzZXJyYXQnLCBzYW5zLXNlcmlmXCJcbiAgICAgICAgfSxcbiAgICAgICAgJyNmdWxsc2NyZWVuLWJ0bic6IHtcbiAgICAgICAgICAgIHBhZGRpbmc6ICcwLjZyZW0gIWltcG9ydGFudCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNtaW5pbWl6ZUljb24nOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNzZXR0aW5nc0J0biwgI3N0YXRzQnRuJzoge1xuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgfSxcbiAgICAgICAgJyN1aUZlYXR1cmVzIGJ1dHRvbic6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIHZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgd2lkdGg6ICczcmVtJyxcbiAgICAgICAgICAgIGhlaWdodDogJzNyZW0nLFxuICAgICAgICAgICAgcGFkZGluZzogJzAuNXJlbScsXG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInXG4gICAgICAgIH0sXG4gICAgICAgICcjdWlGZWF0dXJlcyBidXR0b246aG92ZXInOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzNweCBzb2xpZCB2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICcwLjI1cyBlYXNlJyxcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMC41NXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnMC41NXJlbSdcbiAgICAgICAgfSxcbiAgICAgICAgJyN1aUZlYXR1cmVzIGJ1dHRvbjphY3RpdmUnOiB7XG4gICAgICAgICAgICBib3JkZXI6ICczcHggc29saWQgdmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMC41NXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnMC41NXJlbSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tZmxhdCc6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IyKScsXG4gICAgICAgICAgICBmb250RmFtaWx5OiBcIidNb250c2VycmF0J1wiLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgYm9yZGVyOiAnM3B4IHNvbGlkIHZhcigtLWNvbG9yMyknLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMXJlbScsXG4gICAgICAgICAgICBmb250U2l6ZTogJzAuNzVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICcwLjVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiAnMC41cmVtJyxcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICAgICAgICB9LFxuICAgICAgICAnLmJ0bi1mbGF0OmhvdmVyJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnZWFzZSAwLjNzJ1xuICAgICAgICB9LFxuICAgICAgICAnLmJ0bi1mbGF0OmRpc2FibGVkJzoge1xuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICd2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIGNvbG9yOiAndmFyKC0tY29sb3IzKScsXG4gICAgICAgICAgICBjdXJzb3I6ICdkZWZhdWx0J1xuICAgICAgICB9LFxuICAgICAgICAnLmJ0bi1mbGF0OmFjdGl2ZSc6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50J1xuICAgICAgICB9LFxuICAgICAgICAnLmJ0bi1mbGF0OmZvY3VzJzoge1xuICAgICAgICAgICAgb3V0bGluZTogJ25vbmUnXG4gICAgICAgIH0sXG4gICAgICAgICcjdWlGZWF0dXJlcyBpbWcnOiB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5wYW5lbC13cmFwJzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICB0b3A6ICcwJyxcbiAgICAgICAgICAgIGJvdHRvbTogJzAnLFxuICAgICAgICAgICAgcmlnaHQ6ICcwJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgICAgICAgbWluV2lkdGg6ICcyMHZ3JyxcbiAgICAgICAgICAgIG1heFdpZHRoOiAnOTB2dycsXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEwMCUpJyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICcuM3MgZWFzZS1vdXQnLFxuICAgICAgICAgICAgcG9pbnRlckV2ZW50czogJ2FsbCcsXG4gICAgICAgICAgICBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoMTBweCknLFxuICAgICAgICAgICAgJy13ZWJraXQtYmFja2Ryb3AtZmlsdGVyJzogJ2JsdXIoMTBweCknLFxuICAgICAgICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICAgICAgICBvdmVyZmxvd1g6ICdoaWRkZW4nLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3IwKSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5wYW5lbC13cmFwLXZpc2libGUnOiB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDAlKSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5wYW5lbCc6IHtcbiAgICAgICAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgICAgICAgcGFkZGluZzogJzFlbSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNzZXR0aW5nc0hlYWRpbmcsICNzdGF0c0hlYWRpbmcnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMmVtJyxcbiAgICAgICAgICAgIG1hcmdpbkJsb2NrU3RhcnQ6ICcwLjY3ZW0nLFxuICAgICAgICAgICAgbWFyZ2luQmxvY2tFbmQ6ICcwLjY3ZW0nLFxuICAgICAgICAgICAgbWFyZ2luSW5saW5lU3RhcnQ6ICcwcHgnLFxuICAgICAgICAgICAgbWFyZ2luSW5saW5lRW5kOiAnMHB4JyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgcGFkZGluZzogJzAgMCAwIDJyZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcjc2V0dGluZ3NDbG9zZSwgI3N0YXRzQ2xvc2UnOiB7XG4gICAgICAgICAgICBtYXJnaW46ICcwLjVyZW0nLFxuICAgICAgICAgICAgcGFkZGluZ1RvcDogJzAuNXJlbScsXG4gICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAnMC41cmVtJyxcbiAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJzAuNXJlbScsXG4gICAgICAgICAgICBmb250U2l6ZTogJzJlbScsXG4gICAgICAgICAgICBmbG9hdDogJ3JpZ2h0J1xuICAgICAgICB9LFxuICAgICAgICAnI3NldHRpbmdzQ2xvc2U6YWZ0ZXIsICNzdGF0c0Nsb3NlOmFmdGVyJzoge1xuICAgICAgICAgICAgcGFkZGluZ0xlZnQ6ICcwLjVyZW0nLFxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICBjb250ZW50OiAnXCJcXFxcMDBkN1wiJ1xuICAgICAgICB9LFxuICAgICAgICAnI3NldHRpbmdzQ2xvc2U6aG92ZXIsICNzdGF0c0Nsb3NlOmhvdmVyJzoge1xuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjMpJyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdlYXNlIDAuM3MnXG4gICAgICAgIH0sXG4gICAgICAgICcjc2V0dGluZ3NDb250ZW50LCAjc3RhdHNDb250ZW50Jzoge1xuICAgICAgICAgICAgbWFyZ2luTGVmdDogJzJyZW0nLFxuICAgICAgICAgICAgbWFyZ2luUmlnaHQ6ICcycmVtJ1xuICAgICAgICB9LFxuICAgICAgICAnLnNldHRpbmcnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcbiAgICAgICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMC4xNXJlbSAxMHB4IDAuMTVyZW0gMTBweCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zZXR0aW5ncy10ZXh0Jzoge1xuICAgICAgICAgICAgY29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zZXR0aW5ncy1vcHRpb24nOiB7XG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxuICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCdcbiAgICAgICAgfSxcbiAgICAgICAgJyNjb25uZWN0T3ZlcmxheSwgI3BsYXlPdmVybGF5LCAjaW5mb092ZXJsYXksICNlcnJvck92ZXJsYXksICNhZmtPdmVybGF5LCAjZGlzY29ubmVjdE92ZXJsYXknOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHpJbmRleDogJzMwJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMiknLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMS44ZW0nLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAndmFyKC0tY29sb3IxKScsXG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICAgIHRleHRUcmFuc2Zvcm06ICd1cHBlcmNhc2UnXG4gICAgICAgICAgICB9LFxuICAgICAgICAnLmNsaWNrYWJsZVN0YXRlJzoge1xuICAgICAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRleHREaXNwbGF5U3RhdGUnOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5oaWRkZW5TdGF0ZSc6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICAnI3BsYXlCdXR0b24sICNjb25uZWN0QnV0dG9uJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgICAgICAgICAgIHpJbmRleDogJzMwJ1xuICAgICAgICB9LFxuICAgICAgICAnaW1nI3BsYXlCdXR0b24nOiB7XG4gICAgICAgICAgICBtYXhXaWR0aDogJzI0MXB4JyxcbiAgICAgICAgICAgIHdpZHRoOiAnMTAlJ1xuICAgICAgICB9LFxuICAgICAgICAnI3VpSW50ZXJhY3Rpb24nOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2ZpeGVkJ1xuICAgICAgICB9LFxuICAgICAgICAnI1VJSW50ZXJhY3Rpb25CdXR0b25Cb3VuZGFyeSc6IHtcbiAgICAgICAgICAgIHBhZGRpbmc6ICcycHgnXG4gICAgICAgIH0sXG4gICAgICAgICcjVUlJbnRlcmFjdGlvbkJ1dHRvbic6IHtcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgICAgIH0sXG4gICAgICAgICcjaGlkZGVuSW5wdXQnOiB7XG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIGxlZnQ6ICctMTAlJyxcbiAgICAgICAgICAgIHdpZHRoOiAnMHB4JyxcbiAgICAgICAgICAgIG9wYWNpdHk6ICcwJ1xuICAgICAgICB9LFxuICAgICAgICAnI2VkaXRUZXh0QnV0dG9uJzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICBoZWlnaHQ6ICc0MHB4JyxcbiAgICAgICAgICAgIHdpZHRoOiAnNDBweCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5idG4tb3ZlcmxheSc6IHtcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246ICdtaWRkbGUnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wtc3dpdGNoJzoge1xuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbC1zd2l0Y2ggLnRnbCc6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbCwgLnRnbDphZnRlciwgLnRnbDpiZWZvcmUsIC50Z2wgKiwgLnRnbCAqOmFmdGVyLCAudGdsICo6YmVmb3JlLCAudGdsKy50Z2wtc2xpZGVyJzpcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAnLXdlYmtpdC1ib3gtc2l6aW5nJzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnXG4gICAgICAgICAgICB9LFxuICAgICAgICAnLnRnbDo6LW1vei1zZWxlY3Rpb24sIC50Z2w6YWZ0ZXI6Oi1tb3otc2VsZWN0aW9uLCAudGdsOmJlZm9yZTo6LW1vei1zZWxlY3Rpb24sIC50Z2wgKjo6LW1vei1zZWxlY3Rpb24sIC50Z2wgKjphZnRlcjo6LW1vei1zZWxlY3Rpb24sIC50Z2wgKjpiZWZvcmU6Oi1tb3otc2VsZWN0aW9uLCAudGdsKy50Z2wtc2xpZGVyOjotbW96LXNlbGVjdGlvbic6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ25vbmUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAnLnRnbDo6c2VsZWN0aW9uLCAudGdsOmFmdGVyOjpzZWxlY3Rpb24sIC50Z2w6YmVmb3JlOjpzZWxlY3Rpb24sIC50Z2wgKjo6c2VsZWN0aW9uLCAudGdsICo6YWZ0ZXI6OnNlbGVjdGlvbiwgLnRnbCAqOmJlZm9yZTo6c2VsZWN0aW9uLCAudGdsKy50Z2wtc2xpZGVyOjpzZWxlY3Rpb24nOlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdub25lJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgJy50Z2wtc2xpZGVyJzoge30sXG4gICAgICAgICcudGdsKy50Z2wtc2xpZGVyJzoge1xuICAgICAgICAgICAgb3V0bGluZTogJzAnLFxuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIHdpZHRoOiAnNDBweCcsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxOHB4JyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wrLnRnbC1zbGlkZXI6YWZ0ZXIsIC50Z2wrLnRnbC1zbGlkZXI6YmVmb3JlJzoge1xuICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgY29udGVudDogJ1wiXCInLFxuICAgICAgICAgICAgd2lkdGg6ICc1MCUnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJSdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wrLnRnbC1zbGlkZXI6YWZ0ZXInOiB7XG4gICAgICAgICAgICBsZWZ0OiAnMCdcbiAgICAgICAgfSxcbiAgICAgICAgJy50Z2wrLnRnbC1zbGlkZXI6YmVmb3JlJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsLWZsYXQrLnRnbC1zbGlkZXInOiB7XG4gICAgICAgICAgICBwYWRkaW5nOiAnMnB4JyxcbiAgICAgICAgICAgICctd2Via2l0LXRyYW5zaXRpb24nOiAnYWxsIC4ycyBlYXNlJyxcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICdhbGwgLjJzIGVhc2UnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWNvbG9yNiknLFxuICAgICAgICAgICAgYm9yZGVyOiAnM3B4IHNvbGlkIHZhcigtLWNvbG9yNyknLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMmVtJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbC1mbGF0Ky50Z2wtc2xpZGVyOmFmdGVyJzoge1xuICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNpdGlvbic6ICdhbGwgLjJzIGVhc2UnLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ2FsbCAuMnMgZWFzZScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBjb250ZW50OiAnXCJcIicsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxZW0nXG4gICAgICAgIH0sXG4gICAgICAgICcudGdsLWZsYXQ6Y2hlY2tlZCsudGdsLXNsaWRlcic6IHtcbiAgICAgICAgICAgIGJvcmRlcjogJzNweCBzb2xpZCB2YXIoLS1jb2xvcjMpJ1xuICAgICAgICB9LFxuICAgICAgICAnLnRnbC1mbGF0OmNoZWNrZWQrLnRnbC1zbGlkZXI6YWZ0ZXInOiB7XG4gICAgICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1jb2xvcjMpJ1xuICAgICAgICB9LFxuICAgICAgICAnLmJ0bi1hcHBseSc6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jayAhaW1wb3J0YW50JyxcbiAgICAgICAgICAgIG1hcmdpbkxlZnQ6ICdhdXRvJyxcbiAgICAgICAgICAgIG1hcmdpblJpZ2h0OiAnYXV0bycsXG4gICAgICAgICAgICB3aWR0aDogJzQwJSdcbiAgICAgICAgfSxcbiAgICAgICAgJy5mb3JtLWNvbnRyb2wnOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIGJvcmRlcjogJzJweCBzb2xpZCB2YXIoLS1jb2xvcjcpJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yMiknLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAncmlnaHQnLFxuICAgICAgICAgICAgZm9udEZhbWlseTogJ2luaGVyaXQnXG4gICAgICAgIH0sXG4gICAgICAgICcuZm9ybS1jb250cm9sOmhvdmVyJzoge1xuICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICd2YXIoLS1jb2xvcjcpJ1xuICAgICAgICB9LFxuICAgICAgICAnLmZvcm0tZ3JvdXAnOiB7XG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnNHB4JyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdncmlkJyxcbiAgICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6ICc4MCUgMjAlJyxcbiAgICAgICAgICAgIHJvd0dhcDogJzRweCcsXG4gICAgICAgICAgICBwYWRkaW5nUmlnaHQ6ICcxMHB4JyxcbiAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiAnMTBweCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5mb3JtLWdyb3VwIGxhYmVsJzoge1xuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogJ21pZGRsZScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJ1xuICAgICAgICB9LFxuICAgICAgICAnLnNldHRpbmdzQ29udGFpbmVyJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gICAgICAgICAgICBib3JkZXJCb3R0b206ICcxcHggc29saWQgdmFyKC0tY29sb3I3KScsXG4gICAgICAgICAgICBwYWRkaW5nVG9wOiAnMTBweCcsXG4gICAgICAgICAgICBwYWRkaW5nQm90dG9tOiAnMTBweCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zZXR0aW5nc0NvbnRhaW5lcj4gOmZpcnN0LWNoaWxkJzoge1xuICAgICAgICAgICAgbWFyZ2luVG9wOiAnNHB4JyxcbiAgICAgICAgICAgIG1hcmdpbkJvdHRvbTogJzRweCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiAnYmFzZWxpbmUnXG4gICAgICAgIH0sXG4gICAgICAgICcuY29sbGFwc2UnOiB7XG4gICAgICAgICAgICBwYWRkaW5nTGVmdDogJzUlJ1xuICAgICAgICB9LFxuICAgICAgICAnI3N0cmVhbVRvb2xzJzoge1xuICAgICAgICAgICAgYm9yZGVyQm90dG9tUmlnaHRSYWRpdXM6ICc1cHgnLFxuICAgICAgICAgICAgYm9yZGVyQm90dG9tTGVmdFJhZGl1czogJzVweCcsXG4gICAgICAgICAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHRvcDogJzAnLFxuICAgICAgICAgICAgcmlnaHQ6ICcyJScsXG4gICAgICAgICAgICB6SW5kZXg6ICcxMDAnLFxuICAgICAgICAgICAgYm9yZGVyOiAnNHB4IHNvbGlkIHZhcigtLWNvbG91cjgpJyxcbiAgICAgICAgICAgIGJvcmRlclRvcFdpZHRoOiAnMHB4J1xuICAgICAgICB9LFxuICAgICAgICAnLnNldHRpbmdzSGVhZGVyJzoge1xuICAgICAgICAgICAgZm9udFN0eWxlOiAnaXRhbGljJ1xuICAgICAgICB9LFxuICAgICAgICAnI3N0cmVhbVRvb2xzSGVhZGVyJzoge1xuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICAgICAgZmxleERpcmVjdGlvbjogJ3JvdycsXG4gICAgICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxuICAgICAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHZhcigtLWNvbG91cjgpJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3ZhcigtLWNvbG9yNyknXG4gICAgICAgIH0sXG4gICAgICAgICcuc3RyZWFtVG9vbHMnOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd2YXIoLS1jb2xvcjIpJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICd2YXIoLS1idXR0b25Gb250KScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbGlnaHRlcicsXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLWNvbG9yNyknXG4gICAgICAgIH0sXG4gICAgICAgICcuc3RyZWFtVG9vbHMtc2hvd24+I3N0cmVhbVRvb2xzU2V0dGluZ3MsIC5zdHJlYW1Ub29scy1zaG93bj4jc3RyZWFtVG9vbHNTdGF0cyc6XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgJyNzdHJlYW1Ub29sc1RvZ2dsZSc6IHtcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJSdcbiAgICAgICAgfSxcbiAgICAgICAgJyNxdWFsaXR5U3RhdHVzJzoge1xuICAgICAgICAgICAgZm9udFNpemU6ICczN3B4JyxcbiAgICAgICAgICAgIHBhZGRpbmdSaWdodDogJzRweCdcbiAgICAgICAgfSxcbiAgICAgICAgJy5zdmdJY29uJzoge1xuICAgICAgICAgICAgZmlsbDogJ3ZhcigtLWNvbG9yMiknXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY3VzdG9tU3R5bGVzPzogUGFydGlhbDxTdHlsZXM+O1xuICAgIGxpZ2h0TW9kZVBhbGV0dGU6IENvbG9yUGFsZXR0ZTtcbiAgICBkYXJrTW9kZVBhbGV0dGU6IENvbG9yUGFsZXR0ZTtcblxuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiB7XG4gICAgICAgIGN1c3RvbVN0eWxlcz86IFBhcnRpYWw8U3R5bGVzPjtcbiAgICAgICAgbGlnaHRNb2RlUGFsZXR0ZT86IENvbG9yUGFsZXR0ZTtcbiAgICAgICAgZGFya01vZGVQYWxldHRlPzogQ29sb3JQYWxldHRlO1xuICAgICAgICBqc3NJbnNlcnRpb25Qb2ludD86IHN0cmluZyB8IEhUTUxFbGVtZW50O1xuICAgIH0pIHtcbiAgICAgICAgY29uc3QgeyBjdXN0b21TdHlsZXMsIGxpZ2h0TW9kZVBhbGV0dGUsIGRhcmtNb2RlUGFsZXR0ZSwganNzSW5zZXJ0aW9uUG9pbnQgfSA9XG4gICAgICAgICAgICBvcHRpb25zID8/IHt9O1xuICAgICAgICAvLyBPbmUgdGltZSBzZXR1cCB3aXRoIGRlZmF1bHQgcGx1Z2lucyBhbmQgc2V0dGluZ3MuXG4gICAgICAgIGNvbnN0IGpzc09wdGlvbnMgPSB7XG4gICAgICAgICAgICAvLyBKU1MgaGFzIG1hbnkgaW50ZXJlc3RpbmcgcGx1Z2lucyB3ZSBtYXkgd2lzaCB0byB0dXJuIG9uXG4gICAgICAgICAgICAvL3BsdWdpbnM6IFtmdW5jdGlvbnMoKSwgdGVtcGxhdGUoKSwgZ2xvYmFsKCksIGV4dGVuZCgpLCBuZXN0ZWQoKSwgY29tcG9zZSgpLCBjYW1lbENhc2UoKSwgZGVmYXVsdFVuaXQob3B0aW9ucy5kZWZhdWx0VW5pdCksIGV4cGFuZCgpLCB2ZW5kb3JQcmVmaXhlcigpLCBwcm9wc1NvcnQoKV1cbiAgICAgICAgICAgIHBsdWdpbnM6IFtnbG9iYWwoKSwgY2FtZWxDYXNlKCldLFxuICAgICAgICAgICAgaW5zZXJ0aW9uUG9pbnQ6IGpzc0luc2VydGlvblBvaW50XG4gICAgICAgIH07XG5cbiAgICAgICAganNzLnNldHVwKGpzc09wdGlvbnMpO1xuXG4gICAgICAgIHRoaXMuY3VzdG9tU3R5bGVzID0gY3VzdG9tU3R5bGVzO1xuICAgICAgICB0aGlzLmxpZ2h0TW9kZVBhbGV0dGUgPVxuICAgICAgICAgICAgbGlnaHRNb2RlUGFsZXR0ZSA/PyB0aGlzLmRlZmF1bHRMaWdodE1vZGVQYWxldHRlO1xuICAgICAgICB0aGlzLmRhcmtNb2RlUGFsZXR0ZSA9IGRhcmtNb2RlUGFsZXR0ZSA/PyB0aGlzLmRlZmF1bHREYXJrTW9kZVBhbGV0dGU7XG4gICAgfVxuXG4gICAgYXBwbHlTdHlsZVNoZWV0KCkge1xuICAgICAgICAvLyBUb2RvOiByZWZhY3RvciBjb2RlYmFzZSB0byB1c2UganNzIGF0IGEgY29tcG9uZW50IGxldmVsLCBjbGFzc2VzIGNhbiBiZSBncmFiYmVkIGxpa2Ugc286XG4gICAgICAgIC8vY29uc3Qge3BpeGVsU3RyZWFtaW5nQ2xhc3Nlc30gPSBqc3MuY3JlYXRlU3R5bGVTaGVldChzdHlsZXMpLmF0dGFjaCgpO1xuXG4gICAgICAgIC8vIGF0dGFjaCBnZW5lcmF0ZWQgc3R5bGUgc2hlZXQgdG8gcGFnZVxuICAgICAgICBqc3MuY3JlYXRlU3R5bGVTaGVldCh7XG4gICAgICAgICAgICAnQGdsb2JhbCc6IHtcbiAgICAgICAgICAgICAgICAuLi50aGlzLmRlZmF1bHRTdHlsZXMsXG4gICAgICAgICAgICAgICAgLi4udGhpcy5jdXN0b21TdHlsZXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuYXR0YWNoKCk7XG4gICAgfVxuXG4gICAgYXBwbHlQYWxldHRlKHBhbGV0dGU6IENvbG9yUGFsZXR0ZSkge1xuICAgICAgICBjb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJzpyb290JykgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHJvb3RFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yMCcsIHBhbGV0dGVbJy0tY29sb3IwJ10pO1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjEnLCBwYWxldHRlWyctLWNvbG9yMSddKTtcbiAgICAgICAgcm9vdEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3IyJywgcGFsZXR0ZVsnLS1jb2xvcjInXSk7XG4gICAgICAgIHJvb3RFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yMycsIHBhbGV0dGVbJy0tY29sb3IzJ10pO1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjQnLCBwYWxldHRlWyctLWNvbG9yNCddKTtcbiAgICAgICAgcm9vdEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tY29sb3I1JywgcGFsZXR0ZVsnLS1jb2xvcjUnXSk7XG4gICAgICAgIHJvb3RFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLWNvbG9yNicsIHBhbGV0dGVbJy0tY29sb3I2J10pO1xuICAgICAgICByb290RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1jb2xvcjcnLCBwYWxldHRlWyctLWNvbG9yNyddKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHBsYXllcnMgY29sb3IgdmFyaWFibGVzXG4gICAgICogQHBhcmFtIGlzTGlnaHRNb2RlIC0gc2hvdWxkIHdlIHVzZSBhIGxpZ2h0IG9yIGRhcmsgY29sb3Igc2NoZW1lXG4gICAgICovXG4gICAgc2V0Q29sb3JNb2RlKGlzTGlnaHRNb2RlOiBib29sZWFuKSB7XG4gICAgICAgIGlmIChpc0xpZ2h0TW9kZSkge1xuICAgICAgICAgICAgdGhpcy5hcHBseVBhbGV0dGUodGhpcy5saWdodE1vZGVQYWxldHRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQYWxldHRlKHRoaXMuZGFya01vZGVQYWxldHRlKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IEZ1bGxTY3JlZW5JY29uIH0gZnJvbSAnLi9GdWxsc2NyZWVuSWNvbic7XG5pbXBvcnQgeyBTZXR0aW5nc0ljb24gfSBmcm9tICcuL1NldHRpbmdzSWNvbic7XG5pbXBvcnQgeyBTdGF0c0ljb24gfSBmcm9tICcuL1N0YXRzSWNvbic7XG5pbXBvcnQgeyBYUkljb24gfSBmcm9tICcuL1hSSWNvbic7XG5pbXBvcnQgeyBXZWJYUkNvbnRyb2xsZXIgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40JztcbmltcG9ydCB7IFVJRWxlbWVudENvbmZpZywgVUlFbGVtZW50Q3JlYXRpb25Nb2RlIH0gZnJvbSAnLi4vVUkvVUlDb25maWd1cmF0aW9uVHlwZXMnXG5cbi8qKlxuICogQ29uZmlndXJlcyBob3cgVUkgZWxlbWVudHMgdG8gY29udHJvbCB0aGUgc3RyZWFtIGFyZSBjcmVhdGVkLiBcbiAqIEJ5IGRlZmF1bHQsIGEgYnV0dG9uIHdpbGwgYmUgY3JlYXRlZCBmb3IgZWFjaCBjb250cm9sLiBUaGF0IGNhbiBiZSBvdmVycmlkZW4gcGVyLWNvbnRyb2xcbiAqIHRvIHVzZSBhbiBleHRlcm5hbGx5IHByb3ZpZGVkIGVsZW1lbnQsIG9yIHRvIGRpc2FibGUgdGhlIGVsZW1lbnQgZW50aXJlbHkuXG4gKi9cbmV4cG9ydCB0eXBlIENvbnRyb2xzVUlDb25maWd1cmF0aW9uID0ge1xuICAgIC8vW1Byb3BlcnR5IGluIGtleW9mIENvbnRyb2xzIGFzIGAke1Byb3BlcnR5fVR5cGVgXT8gOiBVSUVsZW1lbnRUeXBlO1xuICAgIHN0YXRzQnV0dG9uVHlwZT8gOiBVSUVsZW1lbnRDb25maWcsXG4gICAgZnVsbHNjcmVlbkJ1dHRvblR5cGU/IDogVUlFbGVtZW50Q29uZmlnLFxuICAgIHNldHRpbmdzQnV0dG9uVHlwZT8gOiBVSUVsZW1lbnRDb25maWcsXG4gICAgeHJJY29uVHlwZT8gOiBVSUVsZW1lbnRDb25maWdcbn1cblxuLy8gSWYgdGhlcmUgaXNuJ3QgYSB0eXBlIHByb3ZpZGVkLCBkZWZhdWx0IGJlaGF2aW91ciBpcyB0byBjcmVhdGUgdGhlIGVsZW1lbnQuXG5mdW5jdGlvbiBzaG91bGRDcmVhdGVCdXR0b24odHlwZSA6IFVJRWxlbWVudENvbmZpZyB8IHVuZGVmaW5lZCkgOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHR5cGUgPT0gdW5kZWZpbmVkKSA/IHRydWUgOiAodHlwZS5jcmVhdGlvbk1vZGUgPT09IFVJRWxlbWVudENyZWF0aW9uTW9kZS5DcmVhdGVEZWZhdWx0RWxlbWVudCk7XG59XG5cbi8qKlxuICogRWxlbWVudCBjb250YWluaW5nIHZhcmlvdXMgY29udHJvbHMgbGlrZSBzdGF0cywgc2V0dGluZ3MsIGZ1bGxzY3JlZW4uXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250cm9scyB7XG4gICAgc3RhdHNJY29uOiBTdGF0c0ljb247XG4gICAgZnVsbHNjcmVlbkljb246IEZ1bGxTY3JlZW5JY29uO1xuICAgIHNldHRpbmdzSWNvbjogU2V0dGluZ3NJY29uO1xuICAgIHhySWNvbjogWFJJY29uO1xuXG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdCB0aGUgY29udHJvbHNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb25maWc/IDogQ29udHJvbHNVSUNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgaWYgKCFjb25maWcgfHwgc2hvdWxkQ3JlYXRlQnV0dG9uKGNvbmZpZy5zdGF0c0J1dHRvblR5cGUpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRzSWNvbiA9IG5ldyBTdGF0c0ljb24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbmZpZyB8fCBzaG91bGRDcmVhdGVCdXR0b24oY29uZmlnLnNldHRpbmdzQnV0dG9uVHlwZSkpe1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5nc0ljb24gPSBuZXcgU2V0dGluZ3NJY29uKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb25maWcgfHwgc2hvdWxkQ3JlYXRlQnV0dG9uKGNvbmZpZy5mdWxsc2NyZWVuQnV0dG9uVHlwZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZnVsbHNjcmVlbkljb24gPSBuZXcgRnVsbFNjcmVlbkljb24oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbmZpZyB8fCBzaG91bGRDcmVhdGVCdXR0b24oY29uZmlnLnhySWNvblR5cGUpKXtcbiAgICAgICAgICAgIHRoaXMueHJJY29uID0gbmV3IFhSSWNvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBlbGVtZW50IGNvbnRhaW5pbmcgdGhlIGNvbnRyb2xzLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAnY29udHJvbHMnO1xuICAgICAgICAgICAgaWYgKCEhdGhpcy5mdWxsc2NyZWVuSWNvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZnVsbHNjcmVlbkljb24ucm9vdEVsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEhdGhpcy5zZXR0aW5nc0ljb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzSWNvbi5yb290RWxlbWVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoISF0aGlzLnN0YXRzSWNvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuc3RhdHNJY29uLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghIXRoaXMueHJJY29uKSB7XG4gICAgICAgICAgICAgICAgV2ViWFJDb250cm9sbGVyLmlzU2Vzc2lvblN1cHBvcnRlZCgnaW1tZXJzaXZlLXZyJykudGhlbihcbiAgICAgICAgICAgICAgICAoc3VwcG9ydGVkOiBib29sZWFuKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMueHJJY29uLnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxufSIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbmltcG9ydCB7IExvZ2dlciB9IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjQnO1xuaW1wb3J0IHtcbiAgICBEYXRhQ2hhbm5lbExhdGVuY3lUZXN0UmVzdWx0XG59IGZyb20gXCJAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40L3R5cGVzL0RhdGFDaGFubmVsL0RhdGFDaGFubmVsTGF0ZW5jeVRlc3RSZXN1bHRzXCI7XG5cbi8qKlxuICogRGF0YUNoYW5uZWwgTGF0ZW5jeSB0ZXN0IFVJIGVsZW1lbnRzIGFuZCByZXN1bHRzIGhhbmRsaW5nLlxuICovXG5leHBvcnQgY2xhc3MgRGF0YUNoYW5uZWxMYXRlbmN5VGVzdCB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfbGF0ZW5jeVRlc3RCdXR0b246IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgX2xhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBidXR0b24gY29udGFpbmluZyB0aGUgc3RhdHMgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc0NvbnRhaW5lcicpO1xuXG4gICAgICAgICAgICAvLyBtYWtlIGhlYWRpbmdcbiAgICAgICAgICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGhlYWRpbmcuaWQgPSAnZGF0YUNoYW5uZWxMYXRlbmN5VGVzdEhlYWRlcic7XG4gICAgICAgICAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzLXRleHQnKTtcbiAgICAgICAgICAgIGhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NIZWFkZXInKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuXG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgaGVhZGluZ1RleHQuaW5uZXJIVE1MID0gJ0RhdGEgQ2hhbm5lbCBMYXRlbmN5IFRlc3QnO1xuICAgICAgICAgICAgaGVhZGluZy5hcHBlbmRDaGlsZChoZWFkaW5nVGV4dCk7XG4gICAgICAgICAgICBoZWFkaW5nLmFwcGVuZENoaWxkKHRoaXMubGF0ZW5jeVRlc3RCdXR0b24pO1xuXG4gICAgICAgICAgICAvLyBtYWtlIHRlc3QgcmVzdWx0cyBlbGVtZW50XG4gICAgICAgICAgICBjb25zdCByZXN1bHRzUGFyZW50RWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcmVzdWx0c1BhcmVudEVsZW0uaWQgPSAnZGF0YUNoYW5uZWxMYXRlbmN5VGVzdENvbnRhaW5lcic7XG4gICAgICAgICAgICByZXN1bHRzUGFyZW50RWxlbS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHJlc3VsdHNQYXJlbnRFbGVtKTtcblxuICAgICAgICAgICAgcmVzdWx0c1BhcmVudEVsZW0uYXBwZW5kQ2hpbGQodGhpcy5sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50LmlkID0gJ2RhdGFDaGFubmVsTGF0ZW5jeVN0YXRzUmVzdWx0cyc7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1N0YXRzUmVzdWx0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsYXRlbmN5VGVzdEJ1dHRvbigpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9sYXRlbmN5VGVzdEJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24udmFsdWUgPSAnUnVuIFRlc3QnO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24uaWQgPSAnYnRuLXN0YXJ0LWRhdGEtY2hhbm5lbC1sYXRlbmN5LXRlc3QnO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24uY2xhc3NMaXN0LmFkZCgnc3RyZWFtVG9vbHMtYnV0dG9uJyk7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4tZmxhdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXRlbmN5VGVzdEJ1dHRvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3B1bGF0ZSB0aGUgVUkgYmFzZWQgb24gdGhlIGxhdGVuY3kgdGVzdCdzIHJlc3VsdHMuXG4gICAgICogQHBhcmFtIHJlc3VsdCBUaGUgbGF0ZW5jeSB0ZXN0IHJlc3VsdHMuXG4gICAgICovXG4gICAgcHVibGljIGhhbmRsZVRlc3RSZXN1bHQocmVzdWx0OiBEYXRhQ2hhbm5lbExhdGVuY3lUZXN0UmVzdWx0KSB7XG4gICAgICAgIExvZ2dlci5Mb2coXG4gICAgICAgICAgICBMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLFxuICAgICAgICAgICAgcmVzdWx0LnRvU3RyaW5nKCksXG4gICAgICAgICAgICA2XG4gICAgICAgICk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayB3ZSBoYXZlIHJlc3VsdHMsIE5hTiB3b3VsZCBtZWFuIHRoYXQgVUUgdmVyc2lvbiB3ZSB0YWxrIHRvIGRvZXNuJ3Qgc3VwcG9ydCBvdXIgdGVzdFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGlzTmFOKHJlc3VsdC5kYXRhQ2hhbm5lbFJ0dCkpIHtcbiAgICAgICAgICAgIHRoaXMubGF0ZW5jeVRlc3RSZXN1bHRzRWxlbWVudC5pbm5lckhUTUwgPSAnPGRpdj5Ob3Qgc3VwcG9ydGVkPC9kaXY+JztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGxhdGVuY3lTdGF0c0lubmVySFRNTCArPVxuICAgICAgICAgICAgJzxkaXY+RGF0YSBjaGFubmVsIFJUVCAobXMpOiAnICtcbiAgICAgICAgICAgIHJlc3VsdC5kYXRhQ2hhbm5lbFJ0dCArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNlcGFyYXRlIHBhdGggdGltZSBkaXNjb3Zlcnkgd29ya3Mgb25seSB3aGVuIFVFIGFuZCBQbGF5ZXIgY2xvY2tzIGhhdmUgYmVlbiBzeW5jaHJvbml6ZWQuXG4gICAgICAgICAqL1xuICAgICAgICBpZiAocmVzdWx0LnBsYXllclRvU3RyZWFtZXJUaW1lID49IDAgJiYgcmVzdWx0LnN0cmVhbWVyVG9QbGF5ZXJUaW1lID49IDApIHtcbiAgICAgICAgICAgIGxhdGVuY3lTdGF0c0lubmVySFRNTCArPVxuICAgICAgICAgICAgICAgICc8ZGl2PlBsYXllciB0byBTdHJlYW1lciBwYXRoIChtcyk6ICcgKyByZXN1bHQucGxheWVyVG9TdHJlYW1lclRpbWUgKyAnPC9kaXY+JztcbiAgICAgICAgICAgIGxhdGVuY3lTdGF0c0lubmVySFRNTCArPVxuICAgICAgICAgICAgICAgICc8ZGl2PlN0cmVhbWVyIHRvIFBsYXllciBwYXRoIChtcyk6ICcgK1xuICAgICAgICAgICAgICAgIHJlc3VsdC5zdHJlYW1lclRvUGxheWVyVGltZSArXG4gICAgICAgICAgICAgICAgJzwvZGl2Pic7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50LmlubmVySFRNTCA9IGxhdGVuY3lTdGF0c0lubmVySFRNTDtcbiAgICAgICAgLy9zZXR1cCBidXR0b24gdG8gZG93bmxvYWQgdGhlIGRldGFpbGVkIHJlc3VsdHNcbiAgICAgICAgbGV0IGRvd25sb2FkQnV0dG9uOiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgZG93bmxvYWRCdXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICBkb3dubG9hZEJ1dHRvbi52YWx1ZSA9ICdEb3dubG9hZCc7XG4gICAgICAgIGRvd25sb2FkQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3N0cmVhbVRvb2xzLWJ1dHRvbicpO1xuICAgICAgICBkb3dubG9hZEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdidG4tZmxhdCcpO1xuICAgICAgICBkb3dubG9hZEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGZpbGUgPSBuZXcgQmxvYihbcmVzdWx0LmV4cG9ydExhdGVuY3lBc0NTVigpXSwge3R5cGU6ICd0ZXh0L3BsYWluJ30pO1xuICAgICAgICAgICAgbGV0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKSxcbiAgICAgICAgICAgICAgICB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICAgICAgICAgICAgYS5ocmVmID0gdXJsO1xuICAgICAgICAgICAgYS5kb3dubG9hZCA9IFwiZGF0YV9jaGFubmVsX2xhdGVuY3lfdGVzdF9yZXN1bHRzLmNzdlwiO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICAgICAgICAgIGEuY2xpY2soKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50LmFwcGVuZENoaWxkKGRvd25sb2FkQnV0dG9uKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlVGVzdFN0YXJ0KCkge1xuICAgICAgICB0aGlzLmxhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICc8ZGl2PlRlc3QgaW4gcHJvZ3Jlc3M8L2Rpdj4nO1xuICAgIH1cblxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuLyoqXG4gKiBEZWNsYXJlIGFkZGl0aW9ucyB0byBiYXNlIHR5cGVzIGZvciBjcm9zcyBicm93c2VyIGZ1bGxzY3JlZW4gZnVuY3Rpb25hbGl0eS5cbiAqL1xuZGVjbGFyZSBnbG9iYWwge1xuICAgIGludGVyZmFjZSBEb2N1bWVudCB7XG4gICAgICAgIHdlYmtpdElzRnVsbFNjcmVlbj86IGJvb2xlYW47XG4gICAgICAgIG1vekZ1bGxTY3JlZW4/OiBib29sZWFuO1xuICAgICAgICB3ZWJraXRGdWxsc2NyZWVuRW5hYmxlZD86IGJvb2xlYW47XG4gICAgICAgIG1vekNhbmNlbEZ1bGxTY3JlZW4/OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgICAgICBtc0V4aXRGdWxsc2NyZWVuPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgICAgd2Via2l0RXhpdEZ1bGxzY3JlZW4/OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgICAgICBtb3pGdWxsU2NyZWVuRWxlbWVudD86IEVsZW1lbnQ7XG4gICAgICAgIG1zRnVsbHNjcmVlbkVsZW1lbnQ/OiBFbGVtZW50O1xuICAgICAgICB3ZWJraXRGdWxsc2NyZWVuRWxlbWVudD86IEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaW50ZXJmYWNlIEhUTUxFbGVtZW50IHtcbiAgICAgICAgbXNSZXF1ZXN0RnVsbHNjcmVlbj86ICgpID0+IFByb21pc2U8dm9pZD47XG4gICAgICAgIG1velJlcXVlc3RGdWxsc2NyZWVuPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgICAgICAgd2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4/OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuICAgICAgICB3ZWJraXRFbnRlckZ1bGxzY3JlZW4/OiAoKSA9PiB2b2lkO1xuICAgIH1cbn1cblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBhbiBlbGVtZW50IChpLmUuIGJ1dHRvbikgdGhhdCwgd2hlbiBjbGlja2VkLCB3aWxsIHRvZ2dsZSBmdWxsc2NyZWVuIG9mIGEgZ2l2ZW4gZWxlbWVudC5cbiAqIENhbiBiZSBpbml0aWFsaXplZCB3aXRoIGFueSBIVE1MRWxlbWVudCwgaWYgaXQgaXMgc2V0IGFzIHJvb3RFbGVtZW50IGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1bGxTY3JlZW5JY29uQmFzZSB7XG4gICAgaXNGdWxsc2NyZWVuID0gZmFsc2U7XG4gICAgZnVsbHNjcmVlbkVsZW1lbnQ6IEhUTUxFbGVtZW50IHwgSFRNTFZpZGVvRWxlbWVudDtcblxuICAgIF9yb290RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCByb290RWxlbWVudChlbGVtZW50KSB7XG4gICAgICAgIGVsZW1lbnQub25jbGljayA9ICgpID0+IHRoaXMudG9nZ2xlRnVsbHNjcmVlbigpO1xuICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7ICAgICAgIFxuICAgICAgICAvLyBzZXQgdXAgdGhlIGZ1bGwgc2NyZWVuIGV2ZW50c1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLFxuICAgICAgICAgICAgKCkgPT4gdGhpcy5vbkZ1bGxzY3JlZW5DaGFuZ2UoKSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnbW96ZnVsbHNjcmVlbmNoYW5nZScsXG4gICAgICAgICAgICAoKSA9PiB0aGlzLm9uRnVsbHNjcmVlbkNoYW5nZSgpLFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdmdWxsc2NyZWVuY2hhbmdlJyxcbiAgICAgICAgICAgICgpID0+IHRoaXMub25GdWxsc2NyZWVuQ2hhbmdlKCksXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ01TRnVsbHNjcmVlbkNoYW5nZScsXG4gICAgICAgICAgICAoKSA9PiB0aGlzLm9uRnVsbHNjcmVlbkNoYW5nZSgpLFxuICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyB0aGUgZG9jdW1lbnQgb3IgZnVsbHNjcmVlbkVsZW1lbnQgZnVsbHNjcmVlbi5cbiAgICAgKi9cbiAgICB0b2dnbGVGdWxsc2NyZWVuKCkge1xuICAgICAgICAvLyBpZiBhbHJlYWR5IGZ1bGwgc2NyZWVuOyBleGl0XG4gICAgICAgIC8vIGVsc2UgZ28gZnVsbHNjcmVlblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCB8fFxuICAgICAgICAgICAgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgfHxcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8XG4gICAgICAgICAgICBkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZnVsbHNjcmVlbkVsZW1lbnQ7XG5cbiAgICAgICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbGVtZW50LnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50Lm1velJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5tb3pSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudC53ZWJraXRFbnRlckZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LndlYmtpdEVudGVyRnVsbHNjcmVlbigpOyAvL2ZvciBpcGhvbmUgdGhpcyBjb2RlIHdvcmtlZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMub25GdWxsc2NyZWVuQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyB0aGUgZnVsbHNjcmVlbiBidXR0b24gb24gY2hhbmdlXG4gICAgICovXG4gICAgb25GdWxsc2NyZWVuQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLmlzRnVsbHNjcmVlbiA9XG4gICAgICAgICAgICBkb2N1bWVudC53ZWJraXRJc0Z1bGxTY3JlZW4gfHxcbiAgICAgICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICAgIChkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCAhPT0gbnVsbCkgfHxcbiAgICAgICAgICAgIChkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCAmJiBkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCAhPT0gbnVsbCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEFuIGltcGxlbWVudGF0aW9uIG9mIEZ1bGxTY3JlZW5JY29uQmFzZSB0aGF0IHVzZXMgYW4gZXh0ZXJuYWxseVxuICogcHJvdmlkZWQgSFRNTEVsZW1lbnQgZm9yIHRvZ2dsaW5nIGZ1bGwgc2NyZWVuLlxuICovXG5leHBvcnQgY2xhc3MgRnVsbFNjcmVlbkljb25FeHRlcm5hbCBleHRlbmRzIEZ1bGxTY3JlZW5JY29uQmFzZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihleHRlcm5hbEJ1dHRvbiA6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQgPSBleHRlcm5hbEJ1dHRvbjtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBUaGUgZGVmYXVsdCBmdWxsc2NyZWVuIGljb24gdGhhdCBjb250YWlucyBhIGJ1dHRvbiBhbmQgc3ZncyBmb3IgZWFjaCBzdGF0ZS5cbiAqL1xuZXhwb3J0IGNsYXNzIEZ1bGxTY3JlZW5JY29uIGV4dGVuZHMgRnVsbFNjcmVlbkljb25CYXNlIHtcbiAgICBfbWF4aW1pemVJY29uOiBTVkdFbGVtZW50O1xuICAgIF9taW5pbWl6ZUljb246IFNWR0VsZW1lbnQ7XG4gICAgX3Rvb2x0aXBUZXh0OiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY3JlYXRlZEJ1dHRvbiA6IEhUTUxCdXR0b25FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNyZWF0ZWRCdXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICBjcmVhdGVkQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ1VpVG9vbCcpO1xuICAgICAgICBjcmVhdGVkQnV0dG9uLmlkID0gJ2Z1bGxzY3JlZW4tYnRuJztcbiAgICAgICAgY3JlYXRlZEJ1dHRvbi5hcHBlbmRDaGlsZCh0aGlzLm1heGltaXplSWNvbik7XG4gICAgICAgIGNyZWF0ZWRCdXR0b24uYXBwZW5kQ2hpbGQodGhpcy5taW5pbWl6ZUljb24pO1xuICAgICAgICBjcmVhdGVkQnV0dG9uLmFwcGVuZENoaWxkKHRoaXMudG9vbHRpcFRleHQpO1xuXG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQgPSBjcmVhdGVkQnV0dG9uO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdG9vbHRpcFRleHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rvb2x0aXB0ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5pbm5lckhUTUwgPSAnRnVsbHNjcmVlbic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXBUZXh0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgbWF4aW1pemVJY29uKCk6IFNWR0VsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX21heGltaXplSWNvbikge1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3N2ZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9tYXhpbWl6ZUljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ2lkJywgJ21heGltaXplSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICd4JywgJzBweCcpO1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICd5JywgJzBweCcpO1xuICAgICAgICAgICAgdGhpcy5fbWF4aW1pemVJY29uLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ3ZpZXdCb3gnLFxuICAgICAgICAgICAgICAgICcwIDAgMzg0Ljk3IDM4NC45NydcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzdmcgZ3JvdXAgZm9yIHRoZSBwYXRoc1xuICAgICAgICAgICAgY29uc3Qgc3ZnR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzdmdHcm91cC5jbGFzc0xpc3QuYWRkKCdzdmdJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9tYXhpbWl6ZUljb24uYXBwZW5kQ2hpbGQoc3ZnR3JvdXApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgcGF0aHMgZm9yIHRoZSBpY29uIGl0c2VsZiwgb25lIGZvciBlYWNoIGNvcm5lclxuICAgICAgICAgICAgY29uc3QgcGF0aDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMS5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTM4NC45NywxMi4wM2MwLTYuNzEzLTUuMzE3LTEyLjAzLTEyLjAzLTEyLjAzSDI2NC44NDdjLTYuODMzLDAtMTEuOTIyLDUuMzktMTEuOTM0LDEyLjIyM2MwLDYuODIxLDUuMTAxLDExLjgzOCwxMS45MzQsMTEuODM4aDk2LjA2MmwtMC4xOTMsOTYuNTE5YzAsNi44MzMsNS4xOTcsMTIuMDMsMTIuMDMsMTIuMDNjNi44MzMtMC4wMTIsMTIuMDMtNS4xOTcsMTIuMDMtMTIuMDNsMC4xOTMtMTA4LjM2OWMwLTAuMDM2LTAuMDEyLTAuMDYtMC4wMTItMC4wODRDMzg0Ljk1OCwxMi4wOSwzODQuOTcsMTIuMDY2LDM4NC45NywxMi4wM3onXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBhdGgyLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMTIwLjQ5NiwwSDEyLjQwM2MtMC4wMzYsMC0wLjA2LDAuMDEyLTAuMDk2LDAuMDEyQzEyLjI4MywwLjAxMiwxMi4yNDcsMCwxMi4yMjMsMEM1LjUxLDAsMC4xOTIsNS4zMTcsMC4xOTIsMTIuMDNMMCwxMjAuMzk5YzAsNi44MzMsNS4zOSwxMS45MzQsMTIuMjIzLDExLjkzNGM2LjgyMSwwLDExLjgzOC01LjEwMSwxMS44MzgtMTEuOTM0bDAuMTkyLTk2LjMzOWg5Ni4yNDJjNi44MzMsMCwxMi4wMy01LjE5NywxMi4wMy0xMi4wM0MxMzIuNTE0LDUuMTk3LDEyNy4zMTcsMCwxMjAuNDk2LDB6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMy5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTEyMC4xMjMsMzYwLjkwOUgyNC4wNjF2LTk2LjI0MmMwLTYuODMzLTUuMTk3LTEyLjAzLTEyLjAzLTEyLjAzUzAsMjU3LjgzMywwLDI2NC42Njd2MTA4LjA5MmMwLDAuMDM2LDAuMDEyLDAuMDYsMC4wMTIsMC4wODRjMCwwLjAzNi0wLjAxMiwwLjA2LTAuMDEyLDAuMDk2YzAsNi43MTMsNS4zMTcsMTIuMDMsMTIuMDMsMTIuMDNoMTA4LjA5MmM2LjgzMywwLDExLjkyMi01LjM5LDExLjkzNC0xMi4yMjNDMTMyLjA1NywzNjUuOTI2LDEyNi45NTYsMzYwLjkwOSwxMjAuMTIzLDM2MC45MDl6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoNC5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTM3Mi43NDcsMjUyLjkxM2MtNi44MzMsMC0xMS44NSw1LjEwMS0xMS44MzgsMTEuOTM0djk2LjA2MmgtOTYuMjQyYy02LjgzMywwLTEyLjAzLDUuMTk3LTEyLjAzLDEyLjAzczUuMTk3LDEyLjAzLDEyLjAzLDEyLjAzaDEwOC4wOTJjMC4wMzYsMCwwLjA2LTAuMDEyLDAuMDg0LTAuMDEyYzAuMDM2LTAuMDEyLDAuMDYsMC4wMTIsMC4wOTYsMC4wMTJjNi43MTMsMCwxMi4wMy01LjMxNywxMi4wMy0xMi4wM1YyNjQuODQ3QzM4NC45NywyNTguMDE0LDM3OS41OCwyNTIuOTEzLDM3Mi43NDcsMjUyLjkxM3onXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMSk7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMik7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMyk7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoNCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21heGltaXplSWNvbjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IG1pbmltaXplSWNvbigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9taW5pbWl6ZUljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX21pbmltaXplSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fbWluaW1pemVJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdtaW5pbWl6ZUljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX21pbmltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX21pbmltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX21pbmltaXplSWNvbi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICd2aWV3Qm94JyxcbiAgICAgICAgICAgICAgICAnMCAwIDM4NS4zMzEgMzg1LjMzMSdcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzdmcgZ3JvdXAgZm9yIHRoZSBwYXRoc1xuICAgICAgICAgICAgY29uc3Qgc3ZnR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzdmdHcm91cC5jbGFzc0xpc3QuYWRkKCdzdmdJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9taW5pbWl6ZUljb24uYXBwZW5kQ2hpbGQoc3ZnR3JvdXApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgcGF0aHMgZm9yIHRoZSBpY29uIGl0c2VsZiwgb25lIGZvciBlYWNoIGNvcm5lclxuICAgICAgICAgICAgY29uc3QgcGF0aDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMS5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTI2NC45NDMsMTU2LjY2NWgxMDguMjczYzYuODMzLDAsMTEuOTM0LTUuMzksMTEuOTM0LTEyLjIxMWMwLTYuODMzLTUuMTAxLTExLjg1LTExLjkzNC0xMS44MzhoLTk2LjI0MlYzNi4xODFjMC02LjgzMy01LjE5Ny0xMi4wMy0xMi4wMy0xMi4wM3MtMTIuMDMsNS4xOTctMTIuMDMsMTIuMDN2MTA4LjI3M2MwLDAuMDM2LDAuMDEyLDAuMDYsMC4wMTIsMC4wODRjMCwwLjAzNi0wLjAxMiwwLjA2LTAuMDEyLDAuMDk2QzI1Mi45MTMsMTUxLjM0NywyNTguMjMsMTU2LjY3NywyNjQuOTQzLDE1Ni42NjV6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTEyMC4yOTEsMjQuMjQ3Yy02LjgyMSwwLTExLjgzOCw1LjExMy0xMS44MzgsMTEuOTM0djk2LjI0MkgxMi4wM2MtNi44MzMsMC0xMi4wMyw1LjE5Ny0xMi4wMywxMi4wM2MwLDYuODMzLDUuMTk3LDEyLjAzLDEyLjAzLDEyLjAzaDEwOC4yNzNjMC4wMzYsMCwwLjA2LTAuMDEyLDAuMDg0LTAuMDEyYzAuMDM2LDAsMC4wNiwwLjAxMiwwLjA5NiwwLjAxMmM2LjcxMywwLDEyLjAzLTUuMzE3LDEyLjAzLTEyLjAzVjM2LjE4MUMxMzIuNTE0LDI5LjM2LDEyNy4xMjQsMjQuMjU5LDEyMC4yOTEsMjQuMjQ3eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGgzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDMuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00xMjAuMzg3LDIyOC42NjZIMTIuMTE1Yy02LjgzMywwLjAxMi0xMS45MzQsNS4zOS0xMS45MzQsMTIuMjIzYzAsNi44MzMsNS4xMDEsMTEuODUsMTEuOTM0LDExLjgzOGg5Ni4yNDJ2OTYuNDIzYzAsNi44MzMsNS4xOTcsMTIuMDMsMTIuMDMsMTIuMDNjNi44MzMsMCwxMi4wMy01LjE5NywxMi4wMy0xMi4wM1YyNDAuODc3YzAtMC4wMzYtMC4wMTItMC4wNi0wLjAxMi0wLjA4NGMwLTAuMDM2LDAuMDEyLTAuMDYsMC4wMTItMC4wOTZDMTMyLjQxOCwyMzMuOTgzLDEyNy4xLDIyOC42NjYsMTIwLjM4NywyMjguNjY2eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGNvbnN0IHBhdGg0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcGF0aDQuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00zNzMuMywyMjguNjY2SDI2NS4wMjhjLTAuMDM2LDAtMC4wNiwwLjAxMi0wLjA4NCwwLjAxMmMtMC4wMzYsMC0wLjA2LTAuMDEyLTAuMDk2LTAuMDEyYy02LjcxMywwLTEyLjAzLDUuMzE3LTEyLjAzLDEyLjAzdjEwOC4yNzNjMCw2LjgzMyw1LjM5LDExLjkyMiwxMi4yMjMsMTEuOTM0YzYuODIxLDAuMDEyLDExLjgzOC01LjEwMSwxMS44MzgtMTEuOTIydi05Ni4yNDJIMzczLjNjNi44MzMsMCwxMi4wMy01LjE5NywxMi4wMy0xMi4wM1MzODAuMTM0LDIyOC42NzgsMzczLjMsMjI4LjY2NnonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMSk7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMik7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMyk7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoNCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21pbmltaXplSWNvbjtcbiAgICB9XG5cbiAgICBvbkZ1bGxzY3JlZW5DaGFuZ2UoKSB7XG4gICAgICAgIHN1cGVyLm9uRnVsbHNjcmVlbkNoYW5nZSgpO1xuXG4gICAgICAgIGNvbnN0IG1pbmltaXplID0gdGhpcy5taW5pbWl6ZUljb247XG4gICAgICAgIGNvbnN0IG1heGltaXplID0gdGhpcy5tYXhpbWl6ZUljb247XG5cbiAgICAgICAgaWYgKHRoaXMuaXNGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICBtaW5pbWl6ZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XG4gICAgICAgICAgICAvL2lvcyBkaXNhcHBlYXJpbmcgc3ZnIGZpeFxuICAgICAgICAgICAgbWluaW1pemUuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgwLCAwKSc7XG4gICAgICAgICAgICBtYXhpbWl6ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWluaW1pemUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIG1heGltaXplLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcbiAgICAgICAgICAgIC8vaW9zIGRpc2FwcGVhcmluZyBzdmcgZml4XG4gICAgICAgICAgICBtYXhpbWl6ZS5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKDAsIDApJztcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuLyoqXG4gKiBBIGJ1dHRvbiB3aXRoIGEgdGV4dCBsYWJlbCBiZXNpZGUgaXQuXG4gKi9cbmV4cG9ydCBjbGFzcyBMYWJlbGxlZEJ1dHRvbiB7XG4gICAgX2xhYmVsOiBzdHJpbmc7XG4gICAgX2J1dHRvblRleHQ6IHN0cmluZztcbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIF9idXR0b246IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcihsYWJlbDogc3RyaW5nLCBidXR0b25UZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbGFiZWwgPSBsYWJlbDtcbiAgICAgICAgdGhpcy5fYnV0dG9uVGV4dCA9IGJ1dHRvblRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgY2xpY2sgbGlzdGVuZXIgdG8gdGhlIGJ1dHRvbiBlbGVtZW50LlxuICAgICAqL1xuICAgIHB1YmxpYyBhZGRPbkNsaWNrTGlzdGVuZXIob25DbGlja0Z1bmM6ICgpID0+IHZvaWQpIHtcbiAgICAgICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrRnVuYyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBIVE1MSW5wdXRFbGVtZW50IGZvciB0aGUgYnV0dG9uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgYnV0dG9uKCk6IEhUTUxJbnB1dEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX2J1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5fYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbi50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgICAgICB0aGlzLl9idXR0b24udmFsdWUgPSB0aGlzLl9idXR0b25UZXh0O1xuICAgICAgICAgICAgdGhpcy5fYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ292ZXJsYXktYnV0dG9uJyk7XG4gICAgICAgICAgICB0aGlzLl9idXR0b24uY2xhc3NMaXN0LmFkZCgnYnRuLWZsYXQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fYnV0dG9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHJvb3QgZGl2IHdpdGggXCJzZXR0aW5nXCIgY3NzIGNsYXNzXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZycpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgZGl2IGVsZW1lbnQgdG8gY29udGFpbiBvdXIgc2V0dGluZydzIHRleHRcbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzVGV4dEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNldHRpbmdzVGV4dEVsZW0uaW5uZXJUZXh0ID0gdGhpcy5fbGFiZWw7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZChzZXR0aW5nc1RleHRFbGVtKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGxhYmVsIGVsZW1lbnQgdG8gd3JhcCBvdXQgaW5wdXQgdHlwZVxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlckxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIHdyYXBwZXJMYWJlbC5jbGFzc0xpc3QuYWRkKCdidG4tb3ZlcmxheScpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod3JhcHBlckxhYmVsKTtcblxuICAgICAgICAgICAgd3JhcHBlckxhYmVsLmFwcGVuZENoaWxkKHRoaXMuYnV0dG9uKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuaW1wb3J0IHsgTGF0ZW5jeVRlc3RSZXN1bHRzIH0gZnJvbSAnQGVwaWNnYW1lcy1wcy9saWItcGl4ZWxzdHJlYW1pbmdmcm9udGVuZC11ZTUuNCc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40JztcblxuLyoqXG4gKiBMYXRlbmN5IHRlc3QgVUkgZWxlbWVudHMgYW5kIHJlc3VsdHMgaGFuZGxpbmcuXG4gKi9cbmV4cG9ydCBjbGFzcyBMYXRlbmN5VGVzdCB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfbGF0ZW5jeVRlc3RCdXR0b246IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgX2xhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aGUgYnV0dG9uIGNvbnRhaW5pbmcgdGhlIHN0YXRzIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCByb290RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VjdGlvbicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NDb250YWluZXInKTtcblxuICAgICAgICAgICAgLy8gbWFrZSBoZWFkaW5nXG4gICAgICAgICAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBoZWFkaW5nLmlkID0gJ2xhdGVuY3lUZXN0SGVhZGVyJztcbiAgICAgICAgICAgIGhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3MtdGV4dCcpO1xuICAgICAgICAgICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCdzZXR0aW5nc0hlYWRlcicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG5cbiAgICAgICAgICAgIGNvbnN0IGhlYWRpbmdUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBoZWFkaW5nVGV4dC5pbm5lckhUTUwgPSAnTGF0ZW5jeSBUZXN0JztcbiAgICAgICAgICAgIGhlYWRpbmcuYXBwZW5kQ2hpbGQoaGVhZGluZ1RleHQpO1xuICAgICAgICAgICAgaGVhZGluZy5hcHBlbmRDaGlsZCh0aGlzLmxhdGVuY3lUZXN0QnV0dG9uKTtcblxuICAgICAgICAgICAgLy8gbWFrZSB0ZXN0IHJlc3VsdHMgZWxlbWVudFxuICAgICAgICAgICAgY29uc3QgcmVzdWx0c1BhcmVudEVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHJlc3VsdHNQYXJlbnRFbGVtLmlkID0gJ2xhdGVuY3lUZXN0Q29udGFpbmVyJztcbiAgICAgICAgICAgIHJlc3VsdHNQYXJlbnRFbGVtLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQocmVzdWx0c1BhcmVudEVsZW0pO1xuXG4gICAgICAgICAgICByZXN1bHRzUGFyZW50RWxlbS5hcHBlbmRDaGlsZCh0aGlzLmxhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290RWxlbWVudDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGxhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX2xhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQuaWQgPSAnbGF0ZW5jeVN0YXRzUmVzdWx0cyc7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1N0YXRzUmVzdWx0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhdGVuY3lUZXN0UmVzdWx0c0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBsYXRlbmN5VGVzdEJ1dHRvbigpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9sYXRlbmN5VGVzdEJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24udHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24udmFsdWUgPSAnUnVuIFRlc3QnO1xuICAgICAgICAgICAgdGhpcy5fbGF0ZW5jeVRlc3RCdXR0b24uaWQgPSAnYnRuLXN0YXJ0LWxhdGVuY3ktdGVzdCc7XG4gICAgICAgICAgICB0aGlzLl9sYXRlbmN5VGVzdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzdHJlYW1Ub29scy1idXR0b24nKTtcbiAgICAgICAgICAgIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bi1mbGF0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2xhdGVuY3lUZXN0QnV0dG9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvcHVsYXRlIHRoZSBVSSBiYXNlZCBvbiB0aGUgbGF0ZW5jeSB0ZXN0J3MgcmVzdWx0cy5cbiAgICAgKiBAcGFyYW0gbGF0ZW5jeVRpbWluZ3MgVGhlIGxhdGVuY3kgdGVzdCByZXN1bHRzLlxuICAgICAqL1xuICAgIHB1YmxpYyBoYW5kbGVUZXN0UmVzdWx0KGxhdGVuY3lUaW1pbmdzOiBMYXRlbmN5VGVzdFJlc3VsdHMpIHtcbiAgICAgICAgTG9nZ2VyLkxvZyhMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLCBsYXRlbmN5VGltaW5ncy50b1N0cmluZygpLCA2KTtcbiAgICAgICAgbGV0IGxhdGVuY3lTdGF0c0lubmVySFRNTCA9ICcnO1xuICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgICc8ZGl2Pk5ldCBsYXRlbmN5IFJUVCAobXMpOiAnICtcbiAgICAgICAgICAgIGxhdGVuY3lUaW1pbmdzLm5ldHdvcmtMYXRlbmN5ICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgICc8ZGl2PlVFIEVuY29kZSAobXMpOiAnICsgbGF0ZW5jeVRpbWluZ3MuRW5jb2RlTXMgKyAnPC9kaXY+JztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9XG4gICAgICAgICAgICAnPGRpdj5VRSBDYXB0dXJlIChtcyk6ICcgK1xuICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MuQ2FwdHVyZVRvU2VuZE1zICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgICc8ZGl2PkJyb3dzZXIgc2VuZCBsYXRlbmN5IChtcyk6ICcgK1xuICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MuYnJvd3NlclNlbmRMYXRlbmN5ICtcbiAgICAgICAgICAgICc8L2Rpdj4nO1xuICAgICAgICBsYXRlbmN5U3RhdHNJbm5lckhUTUwgKz1cbiAgICAgICAgICAgIGxhdGVuY3lUaW1pbmdzLmZyYW1lRGlzcGxheURlbHRhVGltZU1zICYmXG4gICAgICAgICAgICBsYXRlbmN5VGltaW5ncy5icm93c2VyUmVjZWlwdFRpbWVNc1xuICAgICAgICAgICAgICAgID8gJzxkaXY+QnJvd3NlciByZWNlaXZlIGxhdGVuY3kgKG1zKTogJyArXG4gICAgICAgICAgICAgICAgICBsYXRlbmN5VGltaW5ncy5mcmFtZURpc3BsYXlEZWx0YVRpbWVNcyArXG4gICAgICAgICAgICAgICAgICAnPC9kaXY+J1xuICAgICAgICAgICAgICAgIDogJyc7XG4gICAgICAgIGxhdGVuY3lTdGF0c0lubmVySFRNTCArPVxuICAgICAgICAgICAgJzxkaXY+VG90YWwgbGF0ZW5jeSAoZXhjbHVkaW5nIGJyb3dzZXIpIChtcyk6ICcgK1xuICAgICAgICAgICAgbGF0ZW5jeVRpbWluZ3MubGF0ZW5jeUV4Y2x1ZGluZ0RlY29kZSArXG4gICAgICAgICAgICAnPC9kaXY+JztcbiAgICAgICAgbGF0ZW5jeVN0YXRzSW5uZXJIVE1MICs9IGxhdGVuY3lUaW1pbmdzLmVuZFRvRW5kTGF0ZW5jeVxuICAgICAgICAgICAgPyAnPGRpdj5Ub3RhbCBsYXRlbmN5IChtcyk6ICcgK1xuICAgICAgICAgICAgICBsYXRlbmN5VGltaW5ncy5lbmRUb0VuZExhdGVuY3kgK1xuICAgICAgICAgICAgICAnPC9kaXY+J1xuICAgICAgICAgICAgOiAnJztcbiAgICAgICAgdGhpcy5sYXRlbmN5VGVzdFJlc3VsdHNFbGVtZW50LmlubmVySFRNTCA9IGxhdGVuY3lTdGF0c0lubmVySFRNTDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIFNldHRpbmdzIGljb24gdGhhdCBjYW4gYmUgY2xpY2tlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFNldHRpbmdzSWNvbiB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBfc2V0dGluZ3NJY29uOiBTVkdFbGVtZW50O1xuICAgIF90b29sdGlwVGV4dDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRoZSBidXR0b24gY29udGFpbmluZyB0aGUgc2V0dGluZ3MgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxCdXR0b25FbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1VpVG9vbCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAnc2V0dGluZ3NCdG4nO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5zZXR0aW5nc0ljb24pO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50b29sdGlwVGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdG9vbHRpcFRleHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rvb2x0aXB0ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5pbm5lckhUTUwgPSAnU2V0dGluZ3MnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwVGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHNldHRpbmdzSWNvbigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9zZXR0aW5nc0ljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdzZXR0aW5nc0ljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzSWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3NldHRpbmdzSWNvbi5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICd2aWV3Qm94JyxcbiAgICAgICAgICAgICAgICAnMCAwIDQ3OC43MDMgNDc4LjcwMydcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzdmcgZ3JvdXAgZm9yIHRoZSBwYXRoc1xuICAgICAgICAgICAgY29uc3Qgc3ZnR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzdmdHcm91cC5jbGFzc0xpc3QuYWRkKCdzdmdJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc0ljb24uYXBwZW5kQ2hpbGQoc3ZnR3JvdXApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgcGF0aHMgZm9yIHRoZSBpY29uIGl0c2VsZiwgdGhlIGlubmVyIGFuZCBvdXQgcGF0aCBvZiBhIGNvZ1xuICAgICAgICAgICAgY29uc3QgcGF0aDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMS5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTQ1NC4yLDE4OS4xMDFsLTMzLjYtNS43Yy0zLjUtMTEuMy04LTIyLjItMTMuNS0zMi42bDE5LjgtMjcuN2M4LjQtMTEuOCw3LjEtMjcuOS0zLjItMzguMWwtMjkuOC0yOS44XFxcblx0XHRcdGMtNS42LTUuNi0xMy04LjctMjAuOS04LjdjLTYuMiwwLTEyLjEsMS45LTE3LjEsNS41bC0yNy44LDE5LjhjLTEwLjgtNS43LTIyLjEtMTAuNC0zMy44LTEzLjlsLTUuNi0zMy4yXFxcblx0XHRcdGMtMi40LTE0LjMtMTQuNy0yNC43LTI5LjItMjQuN2gtNDIuMWMtMTQuNSwwLTI2LjgsMTAuNC0yOS4yLDI0LjdsLTUuOCwzNGMtMTEuMiwzLjUtMjIuMSw4LjEtMzIuNSwxMy43bC0yNy41LTE5LjhcXFxuXHRcdFx0Yy01LTMuNi0xMS01LjUtMTcuMi01LjVjLTcuOSwwLTE1LjQsMy4xLTIwLjksOC43bC0yOS45LDI5LjhjLTEwLjIsMTAuMi0xMS42LDI2LjMtMy4yLDM4LjFsMjAsMjguMVxcXG5cdFx0XHRjLTUuNSwxMC41LTkuOSwyMS40LTEzLjMsMzIuN2wtMzMuMiw1LjZjLTE0LjMsMi40LTI0LjcsMTQuNy0yNC43LDI5LjJ2NDIuMWMwLDE0LjUsMTAuNCwyNi44LDI0LjcsMjkuMmwzNCw1LjhcXFxuXHRcdFx0YzMuNSwxMS4yLDguMSwyMi4xLDEzLjcsMzIuNWwtMTkuNywyNy40Yy04LjQsMTEuOC03LjEsMjcuOSwzLjIsMzguMWwyOS44LDI5LjhjNS42LDUuNiwxMyw4LjcsMjAuOSw4LjdjNi4yLDAsMTIuMS0xLjksMTcuMS01LjVcXFxuXHRcdFx0bDI4LjEtMjBjMTAuMSw1LjMsMjAuNyw5LjYsMzEuNiwxM2w1LjYsMzMuNmMyLjQsMTQuMywxNC43LDI0LjcsMjkuMiwyNC43aDQyLjJjMTQuNSwwLDI2LjgtMTAuNCwyOS4yLTI0LjdsNS43LTMzLjZcXFxuXHRcdFx0YzExLjMtMy41LDIyLjItOCwzMi42LTEzLjVsMjcuNywxOS44YzUsMy42LDExLDUuNSwxNy4yLDUuNWwwLDBjNy45LDAsMTUuMy0zLjEsMjAuOS04LjdsMjkuOC0yOS44YzEwLjItMTAuMiwxMS42LTI2LjMsMy4yLTM4LjFcXFxuXHRcdFx0bC0xOS44LTI3LjhjNS41LTEwLjUsMTAuMS0yMS40LDEzLjUtMzIuNmwzMy42LTUuNmMxNC4zLTIuNCwyNC43LTE0LjcsMjQuNy0yOS4ydi00Mi4xXFxcblx0XHRcdEM0NzguOSwyMDMuODAxLDQ2OC41LDE5MS41MDEsNDU0LjIsMTg5LjEwMXogTTQ1MS45LDI2MC40MDFjMCwxLjMtMC45LDIuNC0yLjIsMi42bC00Miw3Yy01LjMsMC45LTkuNSw0LjgtMTAuOCw5LjlcXFxuXHRcdFx0Yy0zLjgsMTQuNy05LjYsMjguOC0xNy40LDQxLjljLTIuNyw0LjYtMi41LDEwLjMsMC42LDE0LjdsMjQuNywzNC44YzAuNywxLDAuNiwyLjUtMC4zLDMuNGwtMjkuOCwyOS44Yy0wLjcsMC43LTEuNCwwLjgtMS45LDAuOFxcXG5cdFx0XHRjLTAuNiwwLTEuMS0wLjItMS41LTAuNWwtMzQuNy0yNC43Yy00LjMtMy4xLTEwLjEtMy4zLTE0LjctMC42Yy0xMy4xLDcuOC0yNy4yLDEzLjYtNDEuOSwxNy40Yy01LjIsMS4zLTkuMSw1LjYtOS45LDEwLjhsLTcuMSw0MlxcXG5cdFx0XHRjLTAuMiwxLjMtMS4zLDIuMi0yLjYsMi4yaC00Mi4xYy0xLjMsMC0yLjQtMC45LTIuNi0yLjJsLTctNDJjLTAuOS01LjMtNC44LTkuNS05LjktMTAuOGMtMTQuMy0zLjctMjguMS05LjQtNDEtMTYuOFxcXG5cdFx0XHRjLTIuMS0xLjItNC41LTEuOC02LjgtMS44Yy0yLjcsMC01LjUsMC44LTcuOCwyLjVsLTM1LDI0LjljLTAuNSwwLjMtMSwwLjUtMS41LDAuNWMtMC40LDAtMS4yLTAuMS0xLjktMC44bC0yOS44LTI5LjhcXFxuXHRcdFx0Yy0wLjktMC45LTEtMi4zLTAuMy0zLjRsMjQuNi0zNC41YzMuMS00LjQsMy4zLTEwLjIsMC42LTE0LjhjLTcuOC0xMy0xMy44LTI3LjEtMTcuNi00MS44Yy0xLjQtNS4xLTUuNi05LTEwLjgtOS45bC00Mi4zLTcuMlxcXG5cdFx0XHRjLTEuMy0wLjItMi4yLTEuMy0yLjItMi42di00Mi4xYzAtMS4zLDAuOS0yLjQsMi4yLTIuNmw0MS43LTdjNS4zLTAuOSw5LjYtNC44LDEwLjktMTBjMy43LTE0LjcsOS40LTI4LjksMTcuMS00MlxcXG5cdFx0XHRjMi43LTQuNiwyLjQtMTAuMy0wLjctMTQuNmwtMjQuOS0zNWMtMC43LTEtMC42LTIuNSwwLjMtMy40bDI5LjgtMjkuOGMwLjctMC43LDEuNC0wLjgsMS45LTAuOGMwLjYsMCwxLjEsMC4yLDEuNSwwLjVsMzQuNSwyNC42XFxcblx0XHRcdGM0LjQsMy4xLDEwLjIsMy4zLDE0LjgsMC42YzEzLTcuOCwyNy4xLTEzLjgsNDEuOC0xNy42YzUuMS0xLjQsOS01LjYsOS45LTEwLjhsNy4yLTQyLjNjMC4yLTEuMywxLjMtMi4yLDIuNi0yLjJoNDIuMVxcXG5cdFx0XHRjMS4zLDAsMi40LDAuOSwyLjYsMi4ybDcsNDEuN2MwLjksNS4zLDQuOCw5LjYsMTAsMTAuOWMxNS4xLDMuOCwyOS41LDkuNyw0Mi45LDE3LjZjNC42LDIuNywxMC4zLDIuNSwxNC43LTAuNmwzNC41LTI0LjhcXFxuXHRcdFx0YzAuNS0wLjMsMS0wLjUsMS41LTAuNWMwLjQsMCwxLjIsMC4xLDEuOSwwLjhsMjkuOCwyOS44YzAuOSwwLjksMSwyLjMsMC4zLDMuNGwtMjQuNywzNC43Yy0zLjEsNC4zLTMuMywxMC4xLTAuNiwxNC43XFxcblx0XHRcdGM3LjgsMTMuMSwxMy42LDI3LjIsMTcuNCw0MS45YzEuMyw1LjIsNS42LDkuMSwxMC44LDkuOWw0Miw3LjFjMS4zLDAuMiwyLjIsMS4zLDIuMiwyLjZ2NDIuMUg0NTEuOXonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBhdGgyLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMjM5LjQsMTM2LjAwMWMtNTcsMC0xMDMuMyw0Ni4zLTEwMy4zLDEwMy4zczQ2LjMsMTAzLjMsMTAzLjMsMTAzLjNzMTAzLjMtNDYuMywxMDMuMy0xMDMuM1MyOTYuNCwxMzYuMDAxLDIzOS40LDEzNi4wMDF6IE0yMzkuNCwzMTUuNjAxYy00Mi4xLDAtNzYuMy0zNC4yLTc2LjMtNzYuM3MzNC4yLTc2LjMsNzYuMy03Ni4zczc2LjMsMzQuMiw3Ni4zLDc2LjNTMjgxLjUsMzE1LjYwMSwyMzkuNCwzMTUuNjAxeidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHN2Z0dyb3VwLmFwcGVuZENoaWxkKHBhdGgxKTtcbiAgICAgICAgICAgIHN2Z0dyb3VwLmFwcGVuZENoaWxkKHBhdGgyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NJY29uO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogQSBVSSBjb21wb25lbnQgY29udGFpbmluZyBhbGwgdGhlIHNldHRpbmdzIGZvciB0aGUgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1BhbmVsIHtcbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIF9zZXR0aW5nc0Nsb3NlQnV0dG9uOiBIVE1MRWxlbWVudDtcbiAgICBfc2V0dGluZ3NDb250ZW50RWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ3NldHRpbmdzLXBhbmVsJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BhbmVsLXdyYXAnKTtcblxuICAgICAgICAgICAgY29uc3QgcGFuZWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBwYW5lbEVsZW0uY2xhc3NMaXN0LmFkZCgncGFuZWwnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHBhbmVsRWxlbSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHNldHRpbmdzSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc2V0dGluZ3NIZWFkaW5nLmlkID0gJ3NldHRpbmdzSGVhZGluZyc7XG4gICAgICAgICAgICBzZXR0aW5nc0hlYWRpbmcudGV4dENvbnRlbnQgPSAnU2V0dGluZ3MnO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmFwcGVuZENoaWxkKHNldHRpbmdzSGVhZGluZyk7XG5cbiAgICAgICAgICAgIHBhbmVsRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnNldHRpbmdzQ2xvc2VCdXR0b24pO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmFwcGVuZENoaWxkKHRoaXMuc2V0dGluZ3NDb250ZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2V0dGluZ3NDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NDb250ZW50RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NDb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NDb250ZW50RWxlbWVudC5pZCA9ICdzZXR0aW5nc0NvbnRlbnQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zZXR0aW5nc0NvbnRlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc2V0dGluZ3NDbG9zZUJ1dHRvbigpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc2V0dGluZ3NDbG9zZUJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NDbG9zZUJ1dHRvbi5pZCA9ICdzZXR0aW5nc0Nsb3NlJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3NDbG9zZUJ1dHRvbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IHNldHRpbmdzIHBhbmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYW5lbC13cmFwLXZpc2libGUnKSkge1xuICAgICAgICAgICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwYW5lbC13cmFwLXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgc2V0dGluZ3MgcGFuZWwuXG4gICAgICovXG4gICAgcHVibGljIHRvZ2dsZVZpc2liaWxpdHkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgncGFuZWwtd3JhcC12aXNpYmxlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSBzZXR0aW5ncyBwYW5lbC5cbiAgICAgKi9cbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYW5lbC13cmFwLXZpc2libGUnKSkge1xuICAgICAgICAgICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdwYW5lbC13cmFwLXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogU3RhdHMgaWNvbiB0aGF0IGNhbiBiZSBjbGlja2VkLlxuICovXG5leHBvcnQgY2xhc3MgU3RhdHNJY29uIHtcbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIF9zdGF0c0ljb246IFNWR0VsZW1lbnQ7XG4gICAgX3Rvb2x0aXBUZXh0OiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGhlIGJ1dHRvbiBjb250YWluaW5nIHRoZSBzdGF0cyBpY29uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcm9vdEVsZW1lbnQoKTogSFRNTEJ1dHRvbkVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Jvb3RFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQudHlwZSA9ICdidXR0b24nO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnVWlUb29sJyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9ICdzdGF0c0J0bic7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzSWNvbik7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnRvb2x0aXBUZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCB0b29sdGlwVGV4dCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fdG9vbHRpcFRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRleHQuY2xhc3NMaXN0LmFkZCgndG9vbHRpcHRleHQnKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUZXh0LmlubmVySFRNTCA9ICdJbmZvcm1hdGlvbic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Rvb2x0aXBUZXh0O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3RhdHNJY29uKCk6IFNWR0VsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3N0YXRzSWNvbikge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3N2ZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c0ljb24uc2V0QXR0cmlidXRlTlMobnVsbCwgJ2lkJywgJ3N0YXRzSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICd4JywgJzBweCcpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICd5JywgJzBweCcpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICd2aWV3Qm94JywgJzAgMCAzMzAgMzMwJyk7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBzdmcgZ3JvdXAgZm9yIHRoZSBwYXRoc1xuICAgICAgICAgICAgY29uc3Qgc3ZnR3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAnZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzdmdHcm91cC5jbGFzc0xpc3QuYWRkKCdzdmdJY29uJyk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c0ljb24uYXBwZW5kQ2hpbGQoc3ZnR3JvdXApO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgcGF0aHMgZm9yIHRoZSBpY29uIGl0c2VsZiwgdGhlIGlubmVyIGFuZCBvdXQgcGF0aCBvZiBhIGNvZ1xuICAgICAgICAgICAgY29uc3QgcGF0aDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMS5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTE2NSwwLjAwOEM3NC4wMTksMC4wMDgsMCw3NC4wMjQsMCwxNjQuOTk5YzAsOTAuOTc3LDc0LjAxOSwxNjQuOTkyLDE2NSwxNjQuOTkyczE2NS03NC4wMTUsMTY1LTE2NC45OTJDMzMwLDc0LjAyNCwyNTUuOTgxLDAuMDA4LDE2NSwwLjAwOHogTTE2NSwyOTkuOTkyYy03NC40MzksMC0xMzUtNjAuNTU3LTEzNS0xMzQuOTkyUzkwLjU2MSwzMC4wMDgsMTY1LDMwLjAwOHMxMzUsNjAuNTU3LDEzNSwxMzQuOTkxQzMwMCwyMzkuNDM2LDIzOS40MzksMjk5Ljk5MiwxNjUsMjk5Ljk5MnonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBwYXRoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHBhdGgyLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMTY1LDEzMC4wMDhjLTguMjg0LDAtMTUsNi43MTYtMTUsMTV2OTkuOTgzYzAsOC4yODQsNi43MTYsMTUsMTUsMTVzMTUtNi43MTYsMTUtMTV2LTk5Ljk4M0MxODAsMTM2LjcyNSwxNzMuMjg0LDEzMC4wMDgsMTY1LDEzMC4wMDh6J1xuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcGF0aDMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICAgICAncGF0aCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBwYXRoMy5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTE2NSw3MC4wMTFjLTMuOTUsMC03LjgxMSwxLjYtMTAuNjEsNC4zOWMtMi43OSwyLjc5LTQuMzksNi42Ni00LjM5LDEwLjYxczEuNiw3LjgxLDQuMzksMTAuNjFjMi43OSwyLjc5LDYuNjYsNC4zOSwxMC42MSw0LjM5czcuODEtMS42LDEwLjYwOS00LjM5YzIuNzktMi44LDQuMzkxLTYuNjYsNC4zOTEtMTAuNjFzLTEuNjAxLTcuODItNC4zOTEtMTAuNjFDMTcyLjgxLDcxLjYxLDE2OC45NSw3MC4wMTEsMTY1LDcwLjAxMXonXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMSk7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMik7XG4gICAgICAgICAgICBzdmdHcm91cC5hcHBlbmRDaGlsZChwYXRoMyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRzSWNvbjtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5pbXBvcnQgeyBMYXRlbmN5VGVzdCB9IGZyb20gJy4vTGF0ZW5jeVRlc3QnO1xuaW1wb3J0IHsgQ2FuZGlkYXRlUGFpclN0YXRzLCBJbml0aWFsU2V0dGluZ3MsIExvZ2dlciwgUGl4ZWxTdHJlYW1pbmcgfSBmcm9tICdAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40JztcbmltcG9ydCB7IEFnZ3JlZ2F0ZWRTdGF0cyB9IGZyb20gJ0BlcGljZ2FtZXMtcHMvbGliLXBpeGVsc3RyZWFtaW5nZnJvbnRlbmQtdWU1LjQnO1xuaW1wb3J0IHsgTWF0aFV0aWxzIH0gZnJvbSAnLi4vVXRpbC9NYXRoVXRpbHMnO1xuaW1wb3J0IHtEYXRhQ2hhbm5lbExhdGVuY3lUZXN0fSBmcm9tIFwiLi9EYXRhQ2hhbm5lbExhdGVuY3lUZXN0XCI7XG5pbXBvcnQge1BpeGVsU3RyZWFtaW5nU2V0dGluZ3N9IGZyb20gXCJAZXBpY2dhbWVzLXBzL2xpYi1waXhlbHN0cmVhbWluZ2Zyb250ZW5kLXVlNS40L3R5cGVzL0RhdGFDaGFubmVsL0luaXRpYWxTZXR0aW5nc1wiO1xuXG4vKipcbiAqIEEgc3RhdCBzdHJ1Y3R1cmUsIGFuIGlkLCB0aGUgc3RhdCBzdHJpbmcsIGFuZCB0aGUgZWxlbWVudCB3aGVyZSBpdCBpcyByZW5kZXJlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFN0YXQge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBzdGF0OiBzdHJpbmc7XG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG59XG5cbi8qKlxuICogQSBVSSBjb21wb25lbnQgY29udGFpbmluZyBhbGwgdGhlIHN0YXRzIGZvciB0aGUgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBTdGF0c1BhbmVsIHtcbiAgICBfcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIF9zdGF0c0Nsb3NlQnV0dG9uOiBIVE1MRWxlbWVudDtcbiAgICBfc3RhdHNDb250ZW50RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgX3N0YXRpc3RpY3NDb250YWluZXI6IEhUTUxFbGVtZW50O1xuICAgIF9zdGF0c1Jlc3VsdDogSFRNTEVsZW1lbnQ7XG5cbiAgICBsYXRlbmN5VGVzdDogTGF0ZW5jeVRlc3Q7XG4gICAgZGF0YUNoYW5uZWxMYXRlbmN5VGVzdDogRGF0YUNoYW5uZWxMYXRlbmN5VGVzdDtcblxuICAgIC8qIEEgbWFwIHN0YXRzIHdlIGFyZSBzdG9yaW5nL3JlbmRlcmluZyAqL1xuICAgIHN0YXRzTWFwID0gbmV3IE1hcDxzdHJpbmcsIFN0YXQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sYXRlbmN5VGVzdCA9IG5ldyBMYXRlbmN5VGVzdCgpO1xuICAgICAgICB0aGlzLmRhdGFDaGFubmVsTGF0ZW5jeVRlc3QgPSBuZXcgRGF0YUNoYW5uZWxMYXRlbmN5VGVzdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIFJldHVybiBvciBjcmVhdGVzIGEgSFRNTCBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGlzIHNldHRpbmcgaW4gdGhlIERPTS5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmlkID0gJ3N0YXRzLXBhbmVsJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BhbmVsLXdyYXAnKTtcblxuICAgICAgICAgICAgY29uc3QgcGFuZWxFbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBwYW5lbEVsZW0uY2xhc3NMaXN0LmFkZCgncGFuZWwnKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmFwcGVuZENoaWxkKHBhbmVsRWxlbSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXRzSGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc3RhdHNIZWFkaW5nLmlkID0gJ3N0YXRzSGVhZGluZyc7XG4gICAgICAgICAgICBzdGF0c0hlYWRpbmcudGV4dENvbnRlbnQgPSAnSW5mb3JtYXRpb24nO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmFwcGVuZENoaWxkKHN0YXRzSGVhZGluZyk7XG5cbiAgICAgICAgICAgIHBhbmVsRWxlbS5hcHBlbmRDaGlsZCh0aGlzLnN0YXRzQ2xvc2VCdXR0b24pO1xuICAgICAgICAgICAgcGFuZWxFbGVtLmFwcGVuZENoaWxkKHRoaXMuc3RhdHNDb250ZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3RhdHNDb250ZW50RWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc3RhdHNDb250ZW50RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNDb250ZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNDb250ZW50RWxlbWVudC5pZCA9ICdzdGF0c0NvbnRlbnQnO1xuXG4gICAgICAgICAgICBjb25zdCBzdHJlYW1Ub29sU3RhdHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHN0cmVhbVRvb2xTdGF0cy5pZCA9ICdzdHJlYW1Ub29sc1N0YXRzJztcbiAgICAgICAgICAgIHN0cmVhbVRvb2xTdGF0cy5jbGFzc0xpc3QuYWRkKCdjb250YWluZXInKTtcblxuICAgICAgICAgICAgY29uc3QgY29udHJvbFN0YXRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb250cm9sU3RhdHMuaWQgPSAnQ29udHJvbFN0YXRzJztcbiAgICAgICAgICAgIGNvbnRyb2xTdGF0cy5jbGFzc0xpc3QuYWRkKCdyb3cnKTtcblxuICAgICAgICAgICAgY29uc3Qgc3RhdGlzdGljcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3MuaWQgPSAnc3RhdGlzdGljcyc7XG4gICAgICAgICAgICBzdGF0aXN0aWNzLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzQ29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0YXRpc3RpY3NIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3NIZWFkZXIuaWQgPSAnc3RhdGlzdGljc0hlYWRlcic7XG4gICAgICAgICAgICBzdGF0aXN0aWNzSGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzLXRleHQnKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3NIZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2V0dGluZ3NIZWFkZXInKTtcblxuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblN0YXRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzZXNzaW9uU3RhdHMuaW5uZXJIVE1MID0gJ1Nlc3Npb24gU3RhdHMnO1xuXG4gICAgICAgICAgICB0aGlzLl9zdGF0c0NvbnRlbnRFbGVtZW50LmFwcGVuZENoaWxkKHN0cmVhbVRvb2xTdGF0cyk7XG4gICAgICAgICAgICBzdHJlYW1Ub29sU3RhdHMuYXBwZW5kQ2hpbGQoY29udHJvbFN0YXRzKTtcbiAgICAgICAgICAgIGNvbnRyb2xTdGF0cy5hcHBlbmRDaGlsZChzdGF0aXN0aWNzKTtcbiAgICAgICAgICAgIHN0YXRpc3RpY3MuYXBwZW5kQ2hpbGQoc3RhdGlzdGljc0hlYWRlcik7XG4gICAgICAgICAgICBzdGF0aXN0aWNzSGVhZGVyLmFwcGVuZENoaWxkKHNlc3Npb25TdGF0cyk7XG4gICAgICAgICAgICBzdGF0aXN0aWNzLmFwcGVuZENoaWxkKHRoaXMuc3RhdGlzdGljc0NvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIGNvbnRyb2xTdGF0cy5hcHBlbmRDaGlsZCh0aGlzLmxhdGVuY3lUZXN0LnJvb3RFbGVtZW50KTtcbiAgICAgICAgICAgIGNvbnRyb2xTdGF0cy5hcHBlbmRDaGlsZCh0aGlzLmRhdGFDaGFubmVsTGF0ZW5jeVRlc3Qucm9vdEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0c0NvbnRlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3RhdGlzdGljc0NvbnRhaW5lcigpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fc3RhdGlzdGljc0NvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGlzdGljc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdGlzdGljc0NvbnRhaW5lci5pZCA9ICdzdGF0aXN0aWNzQ29udGFpbmVyJztcbiAgICAgICAgICAgIHRoaXMuX3N0YXRpc3RpY3NDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XG4gICAgICAgICAgICB0aGlzLl9zdGF0aXN0aWNzQ29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuc3RhdHNSZXN1bHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0aXN0aWNzQ29udGFpbmVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgc3RhdHNSZXN1bHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3N0YXRzUmVzdWx0KSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c1Jlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgdGhpcy5fc3RhdHNSZXN1bHQuaWQgPSAnc3RhdGlzdGljc1Jlc3VsdCc7XG4gICAgICAgICAgICB0aGlzLl9zdGF0c1Jlc3VsdC5jbGFzc0xpc3QuYWRkKCdTdGF0c1Jlc3VsdCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0c1Jlc3VsdDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YXRzQ2xvc2VCdXR0b24oKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3N0YXRzQ2xvc2VCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzQ2xvc2VCdXR0b24uaWQgPSAnc3RhdHNDbG9zZSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRzQ2xvc2VCdXR0b247XG4gICAgfVxuXG4gICAgcHVibGljIG9uRGlzY29ubmVjdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5sYXRlbmN5VGVzdC5sYXRlbmN5VGVzdEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YUNoYW5uZWxMYXRlbmN5VGVzdC5sYXRlbmN5VGVzdEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgLy9kbyBub3RoaW5nXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgb25WaWRlb0luaXRpYWxpemVkKHN0cmVhbTogUGl4ZWxTdHJlYW1pbmcpOiB2b2lkIHtcbiAgICAgICAgLy8gc3RhcnRpbmcgYSBsYXRlbmN5IGNoZWNrXG4gICAgICAgIHRoaXMubGF0ZW5jeVRlc3QubGF0ZW5jeVRlc3RCdXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHN0cmVhbS5yZXF1ZXN0TGF0ZW5jeVRlc3QoKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kYXRhQ2hhbm5lbExhdGVuY3lUZXN0LmxhdGVuY3lUZXN0QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RhcnRlZCA9IHN0cmVhbS5yZXF1ZXN0RGF0YUNoYW5uZWxMYXRlbmN5VGVzdCh7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgICAgICAgICAgcnBzOiAxMCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0U2l6ZTogMjAwLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlU2l6ZTogMjAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChzdGFydGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhQ2hhbm5lbExhdGVuY3lUZXN0LmhhbmRsZVRlc3RTdGFydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25maWd1cmUoc2V0dGluZ3M6IFBpeGVsU3RyZWFtaW5nU2V0dGluZ3MpOiB2b2lkIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLkRpc2FibGVMYXRlbmN5VGVzdCkge1xuICAgICAgICAgICAgdGhpcy5sYXRlbmN5VGVzdC5sYXRlbmN5VGVzdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmxhdGVuY3lUZXN0LmxhdGVuY3lUZXN0QnV0dG9uLnRpdGxlID1cbiAgICAgICAgICAgICAgICAnRGlzYWJsZWQgYnkgLVBpeGVsU3RyZWFtaW5nRGlzYWJsZUxhdGVuY3lUZXN0ZXI9dHJ1ZSc7XG4gICAgICAgICAgICB0aGlzLmRhdGFDaGFubmVsTGF0ZW5jeVRlc3QubGF0ZW5jeVRlc3RCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5kYXRhQ2hhbm5lbExhdGVuY3lUZXN0LmxhdGVuY3lUZXN0QnV0dG9uLnRpdGxlID1cbiAgICAgICAgICAgICAgICAnRGlzYWJsZWQgYnkgLVBpeGVsU3RyZWFtaW5nRGlzYWJsZUxhdGVuY3lUZXN0ZXI9dHJ1ZSc7XG4gICAgICAgICAgICBMb2dnZXIuSW5mbyhcbiAgICAgICAgICAgICAgICBMb2dnZXIuR2V0U3RhY2tUcmFjZSgpLFxuICAgICAgICAgICAgICAgICctUGl4ZWxTdHJlYW1pbmdEaXNhYmxlTGF0ZW5jeVRlc3Rlcj10cnVlLCByZXF1ZXN0aW5nIGxhdGVuY3kgcmVwb3J0IGZyb20gdGhlIHRoZSBicm93c2VyIHRvIFVFIGlzIGRpc2FibGVkLidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IHN0YXRzIHBhbmVsLlxuICAgICAqL1xuICAgIHB1YmxpYyBzaG93KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYW5lbC13cmFwLXZpc2libGUnKSkge1xuICAgICAgICAgICAgdGhpcy5yb290RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwYW5lbC13cmFwLXZpc2libGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgc3RhdHMgcGFuZWwuXG4gICAgICovXG4gICAgcHVibGljIHRvZ2dsZVZpc2liaWxpdHkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgncGFuZWwtd3JhcC12aXNpYmxlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSB0aGUgc3RhdHMgcGFuZWwuXG4gICAgICovXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnJvb3RFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygncGFuZWwtd3JhcC12aXNpYmxlJykpIHtcbiAgICAgICAgICAgIHRoaXMucm9vdEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgncGFuZWwtd3JhcC12aXNpYmxlJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlUGxheWVyQ291bnQocGxheWVyQ291bnQ6IG51bWJlcikge1xuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICdQbGF5ZXJDb3VudFN0YXQnLFxuICAgICAgICAgICAgJ1BsYXllcnMnLFxuICAgICAgICAgICAgcGxheWVyQ291bnQudG9TdHJpbmcoKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBzdGF0cyBjb21pbmcgaW4gZnJvbSBicm93c2VyL1VFXG4gICAgICogQHBhcmFtIHN0YXRzIHRoZSBzdGF0cyBzdHJ1Y3R1cmVcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFuZGxlU3RhdHMoc3RhdHM6IEFnZ3JlZ2F0ZWRTdGF0cykge1xuICAgICAgICAvLyBmb3JtYXQgbnVtYmVyaW5nIGJhc2VkIG9uIHRoZSBicm93c2VyIGxhbmd1YWdlXG4gICAgICAgIGNvbnN0IG51bWJlckZvcm1hdCA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlLCB7XG4gICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gSW5ib3VuZCBkYXRhXG4gICAgICAgIGNvbnN0IGluYm91bmREYXRhID0gTWF0aFV0aWxzLmZvcm1hdEJ5dGVzKFxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuYnl0ZXNSZWNlaXZlZCxcbiAgICAgICAgICAgIDJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoJ0luYm91bmREYXRhU3RhdCcsICdSZWNlaXZlZCcsIGluYm91bmREYXRhKTtcblxuICAgICAgICAvLyBQYWNrZXRzIGxvc3RcbiAgICAgICAgY29uc3QgcGFja2V0c0xvc3RTdGF0ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMsXG4gICAgICAgICAgICAncGFja2V0c0xvc3QnXG4gICAgICAgIClcbiAgICAgICAgICAgID8gbnVtYmVyRm9ybWF0LmZvcm1hdChzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5wYWNrZXRzTG9zdClcbiAgICAgICAgICAgIDogJ0Nocm9tZSBvbmx5JztcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAnUGFja2V0c0xvc3RTdGF0JyxcbiAgICAgICAgICAgICdQYWNrZXRzIExvc3QnLFxuICAgICAgICAgICAgcGFja2V0c0xvc3RTdGF0XG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQml0cmF0ZVxuICAgICAgICBpZiAoc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuYml0cmF0ZSkge1xuICAgICAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAgICAgJ1ZpZGVvQml0cmF0ZVN0YXQnLFxuICAgICAgICAgICAgICAgICdWaWRlbyBCaXRyYXRlIChrYnBzKScsXG4gICAgICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuYml0cmF0ZS50b1N0cmluZygpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRzLmluYm91bmRBdWRpb1N0YXRzLmJpdHJhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgICAgICdBdWRpb0JpdHJhdGVTdGF0JyxcbiAgICAgICAgICAgICAgICAnQXVkaW8gQml0cmF0ZSAoa2JwcyknLFxuICAgICAgICAgICAgICAgIHN0YXRzLmluYm91bmRBdWRpb1N0YXRzLmJpdHJhdGUudG9TdHJpbmcoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFZpZGVvIHJlc29sdXRpb25cbiAgICAgICAgY29uc3QgcmVzU3RhdCA9XG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gICAgICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMsXG4gICAgICAgICAgICAgICAgJ2ZyYW1lV2lkdGgnXG4gICAgICAgICAgICApICYmXG4gICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZVdpZHRoICYmXG4gICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gICAgICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMsXG4gICAgICAgICAgICAgICAgJ2ZyYW1lSGVpZ2h0J1xuICAgICAgICAgICAgKSAmJlxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMuZnJhbWVIZWlnaHRcbiAgICAgICAgICAgICAgICA/IHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lV2lkdGggK1xuICAgICAgICAgICAgICAgICAgJ3gnICtcbiAgICAgICAgICAgICAgICAgIHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lSGVpZ2h0XG4gICAgICAgICAgICAgICAgOiAnQ2hyb21lIG9ubHknO1xuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdCgnVmlkZW9SZXNTdGF0JywgJ1ZpZGVvIHJlc29sdXRpb24nLCByZXNTdGF0KTtcblxuICAgICAgICAvLyBGcmFtZXMgZGVjb2RlZFxuICAgICAgICBjb25zdCBmcmFtZXNEZWNvZGVkID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKFxuICAgICAgICAgICAgc3RhdHMuaW5ib3VuZFZpZGVvU3RhdHMsXG4gICAgICAgICAgICAnZnJhbWVzRGVjb2RlZCdcbiAgICAgICAgKVxuICAgICAgICAgICAgPyBudW1iZXJGb3JtYXQuZm9ybWF0KHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmZyYW1lc0RlY29kZWQpXG4gICAgICAgICAgICA6ICdDaHJvbWUgb25seSc7XG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgJ0ZyYW1lc0RlY29kZWRTdGF0JyxcbiAgICAgICAgICAgICdGcmFtZXMgRGVjb2RlZCcsXG4gICAgICAgICAgICBmcmFtZXNEZWNvZGVkXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gRnJhbWVyYXRlXG4gICAgICAgIGlmIChzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZXNQZXJTZWNvbmQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgICAgICdGcmFtZXJhdGVTdGF0JyxcbiAgICAgICAgICAgICAgICAnRnJhbWVyYXRlJyxcbiAgICAgICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZXNQZXJTZWNvbmQudG9TdHJpbmcoKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZyYW1lcyBkcm9wcGVkXG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgJ0ZyYW1lc0Ryb3BwZWRTdGF0JyxcbiAgICAgICAgICAgICdGcmFtZXMgZHJvcHBlZCcsXG4gICAgICAgICAgICBzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5mcmFtZXNEcm9wcGVkPy50b1N0cmluZygpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHN0YXRzLmluYm91bmRWaWRlb1N0YXRzLmNvZGVjSWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgICAgICdWaWRlb0NvZGVjU3RhdCcsXG4gICAgICAgICAgICAgICAgJ1ZpZGVvIGNvZGVjJyxcbiAgICAgICAgICAgICAgICAvLyBTcGxpdCB0aGUgY29kZWMgdG8gcmVtb3ZlIHRoZSBGbXRwIGxpbmVcbiAgICAgICAgICAgICAgICBzdGF0cy5jb2RlY3NcbiAgICAgICAgICAgICAgICAgICAgLmdldChzdGF0cy5pbmJvdW5kVmlkZW9TdGF0cy5jb2RlY0lkKVxuICAgICAgICAgICAgICAgICAgICA/LnNwbGl0KCcgJylbMF0gPz8gJydcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdHMuaW5ib3VuZEF1ZGlvU3RhdHMuY29kZWNJZCkge1xuICAgICAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAgICAgJ0F1ZGlvQ29kZWNTdGF0JyxcbiAgICAgICAgICAgICAgICAnQXVkaW8gY29kZWMnLFxuICAgICAgICAgICAgICAgIC8vIFNwbGl0IHRoZSBjb2RlYyB0byByZW1vdmUgdGhlIEZtdHAgbGluZVxuICAgICAgICAgICAgICAgIHN0YXRzLmNvZGVjc1xuICAgICAgICAgICAgICAgICAgICAuZ2V0KHN0YXRzLmluYm91bmRBdWRpb1N0YXRzLmNvZGVjSWQpXG4gICAgICAgICAgICAgICAgICAgID8uc3BsaXQoJyAnKVswXSA/PyAnJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0b3JlIHRoZSBhY3RpdmUgY2FuZGlkYXRlIHBhaXIgcmV0dXJuIGEgbmV3IENhbmRpZGF0ZSBwYWlyIHN0YXQgaWYgZ2V0QWN0aXZlQ2FuZGlkYXRlIGlzIG51bGxcbiAgICAgICAgbGV0IGFjdGl2ZUNhbmRpZGF0ZVBhaXIgPSBzdGF0cy5nZXRBY3RpdmVDYW5kaWRhdGVQYWlyKCkgIT0gbnVsbCA/IHN0YXRzLmdldEFjdGl2ZUNhbmRpZGF0ZVBhaXIoKSA6IG5ldyBDYW5kaWRhdGVQYWlyU3RhdHMoKTtcblxuICAgICAgICAvLyBSVFRcbiAgICAgICAgY29uc3QgbmV0UlRUID1cbiAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiAgICAgICAgICAgICAgICBhY3RpdmVDYW5kaWRhdGVQYWlyLFxuICAgICAgICAgICAgICAgICdjdXJyZW50Um91bmRUcmlwVGltZSdcbiAgICAgICAgICAgICkgJiYgc3RhdHMuaXNOdW1iZXIoYWN0aXZlQ2FuZGlkYXRlUGFpci5jdXJyZW50Um91bmRUcmlwVGltZSlcbiAgICAgICAgICAgICAgICA/IG51bWJlckZvcm1hdC5mb3JtYXQoXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUNhbmRpZGF0ZVBhaXIuY3VycmVudFJvdW5kVHJpcFRpbWUgKiAxMDAwXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgOiBcIkNhbid0IGNhbGN1bGF0ZVwiO1xuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdCgnUlRUU3RhdCcsICdOZXQgUlRUIChtcyknLCBuZXRSVFQpO1xuXG4gICAgICAgIHRoaXMuYWRkT3JVcGRhdGVTdGF0KFxuICAgICAgICAgICAgJ0R1cmF0aW9uU3RhdCcsXG4gICAgICAgICAgICAnRHVyYXRpb24nLFxuICAgICAgICAgICAgc3RhdHMuc2Vzc2lvblN0YXRzLnJ1blRpbWVcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmFkZE9yVXBkYXRlU3RhdChcbiAgICAgICAgICAgICdDb250cm9sc0lucHV0U3RhdCcsXG4gICAgICAgICAgICAnQ29udHJvbHMgc3RyZWFtIGlucHV0JyxcbiAgICAgICAgICAgIHN0YXRzLnNlc3Npb25TdGF0cy5jb250cm9sc1N0cmVhbUlucHV0XG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gUVBcbiAgICAgICAgdGhpcy5hZGRPclVwZGF0ZVN0YXQoXG4gICAgICAgICAgICAnUVBTdGF0JyxcbiAgICAgICAgICAgICdWaWRlbyBxdWFudGl6YXRpb24gcGFyYW1ldGVyJyxcbiAgICAgICAgICAgIHN0YXRzLnNlc3Npb25TdGF0cy52aWRlb0VuY29kZXJBdmdRUC50b1N0cmluZygpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gdG9kbzpcbiAgICAgICAgLy9zdGF0c1RleHQgKz0gYDxkaXY+QnJvd3NlciByZWNlaXZlIHRvIGNvbXBvc2l0ZSAobXMpOiAke3N0YXRzLmluYm91bmRWaWRlb1N0YXRzLnJlY2VpdmVUb0NvbXBvc2l0ZU1zfTwvZGl2PmA7XG5cbiAgICAgICAgTG9nZ2VyLkxvZyhcbiAgICAgICAgICAgIExvZ2dlci5HZXRTdGFja1RyYWNlKCksXG4gICAgICAgICAgICBgLS0tLS0tLS0tIFN0YXRzIC0tLS0tLS0tLVxcbiAke3N0YXRzfVxcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWAsXG4gICAgICAgICAgICA2XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIG5ldyBzdGF0IHRvIHRoZSBzdGF0cyByZXN1bHRzIGluIHRoZSBET00gb3IgdXBkYXRlcyBhbiBleGl0aW5nIHN0YXQuXG4gICAgICogQHBhcmFtIGlkIFRoZSBpZCBvZiB0aGUgc3RhdCB0byBhZGQvdXBkYXRlLlxuICAgICAqIEBwYXJhbSBzdGF0IFRoZSBjb250ZW50cyBvZiB0aGUgc3RhdC5cbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkT3JVcGRhdGVTdGF0KGlkOiBzdHJpbmcsIHN0YXRMYWJlbDogc3RyaW5nLCBzdGF0OiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgc3RhdEhUTUwgPSBgJHtzdGF0TGFiZWx9OiAke3N0YXR9YDtcblxuICAgICAgICBpZiAoIXRoaXMuc3RhdHNNYXAuaGFzKGlkKSkge1xuICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBzdGF0XG4gICAgICAgICAgICBjb25zdCBuZXdTdGF0ID0gbmV3IFN0YXQoKTtcbiAgICAgICAgICAgIG5ld1N0YXQuaWQgPSBpZDtcbiAgICAgICAgICAgIG5ld1N0YXQuc3RhdCA9IHN0YXQ7XG4gICAgICAgICAgICBuZXdTdGF0LnRpdGxlID0gc3RhdExhYmVsO1xuICAgICAgICAgICAgbmV3U3RhdC5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBuZXdTdGF0LmVsZW1lbnQuaW5uZXJIVE1MID0gc3RhdEhUTUw7XG4gICAgICAgICAgICAvLyBhZGQgdGhlIHN0YXQgdG8gdGhlIGRvbVxuICAgICAgICAgICAgdGhpcy5zdGF0c1Jlc3VsdC5hcHBlbmRDaGlsZChuZXdTdGF0LmVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5zdGF0c01hcC5zZXQoaWQsIG5ld1N0YXQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgZXhpc3Rpbmcgc3RhdFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdGF0c01hcC5nZXQoaWQpO1xuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5lbGVtZW50LmlubmVySFRNTCA9IHN0YXRIVE1MO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyoqIFdoZXRoZXIgYSBzdHJlYW0gVUkgZWxlbWVudCBpcyBpbnRlcm5hbGx5IG1hZGUsIGV4dGVybmFsbHkgcHJvdmlkZWQsIG9yIGRpc2FibGVkLiAqL1xuZXhwb3J0IGVudW0gVUlFbGVtZW50Q3JlYXRpb25Nb2RlIHtcbiAgICBDcmVhdGVEZWZhdWx0RWxlbWVudCxcbiAgICBVc2VDdXN0b21FbGVtZW50LFxuICAgIERpc2FibGVcbn1cblxuLyoqIEEgY29uZmlndXJhdGlvbiBmb3IgZGlmZmVyZW50IFVJIGVsZW1lbnRzIHdoaWNoIGNvbnRyb2wvZGlzcGxheSBpbmZvIHJlbGF0ZWQgdG8gdGhlIHN0cmVhbS4gKi9cbmV4cG9ydCB0eXBlIFVJRWxlbWVudENvbmZpZyA9IHtcbiAgICAvLyBJbiB3aGljaCB3YXkgaXMgdGhpcyBlbGVtZW50IGNyZWF0ZWQ/XG4gICAgY3JlYXRpb25Nb2RlIDogVUlFbGVtZW50Q3JlYXRpb25Nb2RlLFxuICAgIC8vIChPbmx5IHJlbGV2YW50IGlmIHdoZW4gbW9kZSBpcyBDcmVhdGVDdXN0b21FbGVtZW50KSBWaXN1YWxpemluZyBlbGVtZW50XG4gICAgY3VzdG9tRWxlbWVudD8gOiBIVE1MRWxlbWVudFxufVxuXG4vKipcbiAqIENvbmZpZ3VyZXMgYSBnZW5lcmFsIHN0cmVhbS1yZWxhdGVkIFVJIHBhbmVsLiBcbiAqIEZvciBleGFtcGxlOiBpcyBpdCBjcmVhdGVkLCBhbmQgaWYgaXQgaXMsIHdoYXQga2luZCBvZiBidXR0b24gaXMgdXNlZCB0byBzaG93L2hpZGUgaXQuXG4gKiBUaGlzIGNvbmZpZ3VyYXRpb24gaXMgdXNlZCBmb3IgdGhlIHNldHRpbmdzIHBhbmVsIGFuZCBzdGF0cyBwYW5lbCBieSBkZWZhdWx0LlxuICogXG4gKiBOb3RlOiBGb3IgY2FzZXMgd2hlcmUgdGhlIHBhbmVsIG5lZWRzIHRvIGJlIGNyZWF0ZWQsIGJ1dCBhIGJ1dHRvbiBpc24ndCBuZWVkZWQsIFxuICogdGhlIHBhbmVsIGVsZW1lbnQgY2FuIGJlIHBsYWNlZCBhbnl3aGVyZSBpbiB0aGUgRE9NIGFzIG5lZWRlZCAoc2VlIEFwcGxpY2F0aW9uIGNsYXNzKS4gXG4gKi9cbmV4cG9ydCB0eXBlIFBhbmVsQ29uZmlndXJhdGlvbiA9IHtcbiAgICAvLyBJZiBwYW5lbCBpcyBlbmFibGVkLCBIVE1MIGVsZW1lbnRzIGZvciBpdCB3aWxsIGJlIGNyZWF0ZWQsIGFuZCBmdW50aW9uYWxpdHkgYm91bmRcbiAgICBpc0VuYWJsZWQgOiBib29sZWFuLFxuICAgIC8vIChPbmx5IHJlbGV2YW50IGlmIGlzRW5hYmxlZCkgVGhlIHR5cGUgb2YgdGhlIGJ1dHRvbiB0byBzaG93L2hpZGUgdGhpcyBwYW5lbFxuICAgIHZpc2liaWxpdHlCdXR0b25Db25maWc/IDogVUlFbGVtZW50Q29uZmlnXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BhbmVsRW5hYmxlZChjb25maWcgOiBQYW5lbENvbmZpZ3VyYXRpb24gfCB1bmRlZmluZWQpIDogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFjb25maWcgfHwgKCEhY29uZmlnICYmIGNvbmZpZy5pc0VuYWJsZWQpO1xufSIsIi8vIENvcHlyaWdodCBFcGljIEdhbWVzLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG5cbi8qKlxuICogQSBVSSBlbGVtZW50IHNob3dpbmcgdGhlIFFQIChxdWFudGl6YXRpb24gcGFyYW1ldGVyKSBvZiB0aGUgdmlkZW8gc3RyZWFtIGF0IHRoZSBsYXN0IGVuY29kZWQgZnJhbWUgKHdlbGwsIGxhc3QgdHJhbnNtaXR0ZWQgUVAgcmVhbGx5KS5cbiAqIEEgYmxvY2tpZXIgZW5jb2Rpbmcgd2lsbCBoYXZlIGEgaGlnaGVyIFFQIGFuZCB0aGlzIHdpbGwgbWFrZSB0aGUgaW5kaWNhdG9yIHR1cm4gbW9yZSByZWQuXG4gKiBBIG5vbi1ibG9ja3kgc3RyZWFtIHdpbGwgaGF2ZSBhIGxvd2VyIFFQIGFuZCB0aGlzIHdpbGwgbWFrZSB0aGUgaW5kaWNhdG9yIHR1cm4gbW9yZSBncmVlbi5cbiAqIFRoZSBRUCBpbmRpY2F0b3IgaXMgcmVwcmVzZW50ZWQgdmlzdWFsbHkgdXNpbmcgYSBXaUZpIGljb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBWaWRlb1FwSW5kaWNhdG9yIHtcbiAgICB2aWRlb0VuY29kZXJBdmdRUCA9IC0xO1xuXG4gICAgLy8gbm9uIGh0bWwgZWxlbWVudHNcbiAgICBzdGF0c1RleHQgPSAnJztcbiAgICBjb2xvciA9ICcnO1xuXG4gICAgLy8gcXAgY29sb3JzXG4gICAgcmVhZG9ubHkgb3JhbmdlUVAgPSAyNjtcbiAgICByZWFkb25seSByZWRRUCA9IDM1O1xuXG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBfcXVhbGl0eVRleHQ6IEhUTUxFbGVtZW50O1xuICAgIF9xdWFsaXR5U3RhdHVzOiBTVkdFbGVtZW50O1xuICAgIF9kb3Q6IFNWR0VsZW1lbnQ7XG4gICAgX291dGVyOiBTVkdFbGVtZW50O1xuICAgIF9taWRkbGU6IFNWR0VsZW1lbnQ7XG4gICAgX2lubmVyOiBTVkdFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSByb290IGVsZW1lbnQgb2YgdGhlIFFQIGluZGljYXRvci5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgLy8gbWFrZSB0aGUgcm9vdCBlbGVtZW50IHRoYXQgY29udGFpbnMgdGhlIHN2ZyBmb3IgdGhlIGNvbm5lY3Rpb25cbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5pZCA9ICdjb25uZWN0aW9uJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1VpVG9vbCcpO1xuXG4gICAgICAgICAgICAvLyBhZGQgc3ZnIGljb24gZm9yIHRoZSBjb25uZWN0aW9uIHN0cmVuZ3RoXG4gICAgICAgICAgICB0aGlzLl9yb290RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnF1YWxpdHlTdGF0dXMpO1xuXG4gICAgICAgICAgICAvLyBhZGQgdGhlIHRleHQgdW5kZXJuZWF0aCB0aGUgY29ubmVjdGlvblxuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5xdWFsaXR5VGV4dCk7XG5cbiAgICAgICAgICAgIC8vIHNldCBjb2xvcnMgdG8gbm90IGNvbm5lY3RlZCBpbml0aWFsbHlcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUXBUb29sdGlwKC0xKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcm9vdEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0ZXh0IHRoYXQgZGlzcGxheXMgdW5kZXIgdGhlIGljb24uXG4gICAgICovXG4gICAgcHVibGljIGdldCBxdWFsaXR5VGV4dCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5fcXVhbGl0eVRleHQpIHtcbiAgICAgICAgICAgIHRoaXMuX3F1YWxpdHlUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVRleHQuaWQgPSAncXVhbGl0eVRleHQnO1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVRleHQuY2xhc3NMaXN0LmFkZCgndG9vbHRpcHRleHQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcXVhbGl0eVRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBpY29uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgcXVhbGl0eVN0YXR1cygpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9xdWFsaXR5U3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLl9xdWFsaXR5U3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3N2ZydcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLl9xdWFsaXR5U3RhdHVzLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2lkJyxcbiAgICAgICAgICAgICAgICAnY29ubmVjdGlvblN0cmVuZ3RoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX3F1YWxpdHlTdGF0dXMuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCAnMHB4Jyk7XG4gICAgICAgICAgICB0aGlzLl9xdWFsaXR5U3RhdHVzLnNldEF0dHJpYnV0ZU5TKG51bGwsICd5JywgJzBweCcpO1xuICAgICAgICAgICAgdGhpcy5fcXVhbGl0eVN0YXR1cy5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICd2aWV3Qm94JyxcbiAgICAgICAgICAgICAgICAnMCAwIDQ5NC40NSA0OTQuNDUnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAvLyBidWlsZCB3aWZpIGljb25cbiAgICAgICAgICAgIHRoaXMucXVhbGl0eVN0YXR1cy5hcHBlbmRDaGlsZCh0aGlzLmRvdCk7XG4gICAgICAgICAgICB0aGlzLnF1YWxpdHlTdGF0dXMuYXBwZW5kQ2hpbGQodGhpcy5taWRkbGUpO1xuICAgICAgICAgICAgdGhpcy5xdWFsaXR5U3RhdHVzLmFwcGVuZENoaWxkKHRoaXMub3V0ZXIpO1xuICAgICAgICAgICAgdGhpcy5xdWFsaXR5U3RhdHVzLmFwcGVuZENoaWxkKHRoaXMuaW5uZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWFsaXR5U3RhdHVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZG90IGF0IHRoZSBib3R0b20gb2YgdGhlIHdpZmkgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGRvdCgpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9kb3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2RvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdjaXJjbGUnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5fZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdkb3QnKTtcbiAgICAgICAgICAgIHRoaXMuX2RvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY3gnLCAnMjQ3LjEyNScpO1xuICAgICAgICAgICAgdGhpcy5fZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdjeScsICczOTguOTI1Jyk7XG4gICAgICAgICAgICB0aGlzLl9kb3Quc2V0QXR0cmlidXRlTlMobnVsbCwgJ3InLCAnMzUuMycpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9kb3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBvdXRlciBhcmMgb2YgdGhlIHdpZmkgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IG91dGVyKCk6IFNWR0VsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX291dGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9vdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX291dGVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICdvdXRlcicpO1xuICAgICAgICAgICAgdGhpcy5fb3V0ZXIuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ000NjcuOTI1LDIwNC42MjVjLTYuOCwwLTEzLjUtMi42LTE4LjctNy44Yy0xMTEuNS0xMTEuNC0yOTIuNy0xMTEuNC00MDQuMSwwYy0xMC4zLDEwLjMtMjcuMSwxMC4zLTM3LjQsMHMtMTAuMy0yNy4xLDAtMzcuNGM2NC02NCwxNDktOTkuMiwyMzkuNS05OS4yczE3NS41LDM1LjIsMjM5LjUsOTkuMmMxMC4zLDEwLjMsMTAuMywyNy4xLDAsMzcuNEM0ODEuNDI1LDIwMi4wMjUsNDc0LjYyNSwyMDQuNjI1LDQ2Ny45MjUsMjA0LjYyNXonXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9vdXRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIG1pZGRsZSBhcmMgb2YgdGhlIHdpZmkgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IG1pZGRsZSgpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9taWRkbGUpIHtcbiAgICAgICAgICAgIHRoaXMuX21pZGRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuX21pZGRsZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnaWQnLCAnbWlkZGxlJyk7XG4gICAgICAgICAgICB0aGlzLl9taWRkbGUuc2V0QXR0cmlidXRlTlMoXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnZCcsXG4gICAgICAgICAgICAgICAgJ00zOTUuMjI1LDI3Ny4zMjVjLTYuOCwwLTEzLjUtMi42LTE4LjctNy44Yy03MS40LTcxLjMtMTg3LjQtNzEuMy0yNTguOCwwYy0xMC4zLDEwLjMtMjcuMSwxMC4zLTM3LjQsMHMtMTAuMy0yNy4xLDAtMzcuNGM5Mi05MiwyNDEuNi05MiwzMzMuNiwwYzEwLjMsMTAuMywxMC4zLDI3LjEsMCwzNy40QzQwOC43MjUsMjc0LjcyNSw0MDEuOTI1LDI3Ny4zMjUsMzk1LjIyNSwyNzcuMzI1eidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX21pZGRsZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGlubmVyIGFyYyBvZiB0aGUgd2lmaSBpY29uLlxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgaW5uZXIoKTogU1ZHRWxlbWVudCB7XG4gICAgICAgIGlmICghdGhpcy5faW5uZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2lubmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5faW5uZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2lkJywgJ2lubmVyJyk7XG4gICAgICAgICAgICB0aGlzLl9pbm5lci5zZXRBdHRyaWJ1dGVOUyhcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdkJyxcbiAgICAgICAgICAgICAgICAnTTMyMy42MjUsMzQ4LjgyNWMtNi44LDAtMTMuNS0yLjYtMTguNy03LjhjLTE1LjQtMTUuNC0zNi0yMy45LTU3LjgtMjMuOXMtNDIuNCw4LjUtNTcuOCwyMy45Yy0xMC4zLDEwLjMtMjcuMSwxMC4zLTM3LjQsMGMtMTAuMy0xMC4zLTEwLjMtMjcuMSwwLTM3LjRjMjUuNC0yNS40LDU5LjItMzkuNCw5NS4yLTM5LjRzNjkuOCwxNCw5NS4yLDM5LjVjMTAuMywxMC4zLDEwLjMsMjcuMSwwLDM3LjRDMzM3LjIyNSwzNDYuMjI1LDMzMC40MjUsMzQ4LjgyNSwzMjMuNjI1LDM0OC44MjV6J1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faW5uZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXNlZCB0byBzZXQgdGhlIHNwZWVkIG9mIHRoZSBzdGF0dXMgbGlnaHQuXG4gICAgICogQHBhcmFtIHNwZWVkIC0gU2V0IHRoZSBzcGVlZCBvZiB0aGUgYmxpbmssIGhpZ2hlciBudW1iZXJzIG1ha2UgdGhlIHN0YXR1cyBsaWdodCBibGluayBmYXN0ZXIuXG4gICAgICovXG4gICAgYmxpbmtWaWRlb1F1YWxpdHlTdGF0dXMoc3BlZWQ6IG51bWJlcikge1xuICAgICAgICBsZXQgaXRlcmF0aW9uID0gc3BlZWQ7XG4gICAgICAgIGxldCBvcGFjaXR5ID0gMTtcbiAgICAgICAgY29uc3QgdGlja0lEID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgb3BhY2l0eSAtPSAwLjE7XG4gICAgICAgICAgICB0aGlzLnF1YWxpdHlUZXh0LnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcoXG4gICAgICAgICAgICAgICAgTWF0aC5hYnMoKG9wYWNpdHkgLSAwLjUpICogMilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAob3BhY2l0eSA8PSAwLjEpIHtcbiAgICAgICAgICAgICAgICBpZiAoLS1pdGVyYXRpb24gPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpY2tJRCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAgLyBzcGVlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdXBkYXRlcyB0aGUgUVAgdG9vbHRpcCBieSBjb252ZXJ0aW5nIHRoZSBWaWRlbyBFbmNvZGVyIFFQIHRvIGEgY29sb3IgbGlnaHRcbiAgICAgKiBAcGFyYW0gUVAgLSBUaGUgdmlkZW8gZW5jb2RlciBRUCBudW1iZXIgbmVlZGVkIHRvIGZpbmQgdGhlIGF2ZXJhZ2VcbiAgICAgKi9cbiAgICB1cGRhdGVRcFRvb2x0aXAoUVA6IG51bWJlcikge1xuICAgICAgICB0aGlzLnZpZGVvRW5jb2RlckF2Z1FQID0gUVA7XG4gICAgICAgIGlmIChRUCA+IHRoaXMucmVkUVApIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSAncmVkJztcbiAgICAgICAgICAgIHRoaXMuYmxpbmtWaWRlb1F1YWxpdHlTdGF0dXMoMik7XG4gICAgICAgICAgICB0aGlzLnN0YXRzVGV4dCA9IGA8ZGl2IHN0eWxlPVwiY29sb3I6ICR7dGhpcy5jb2xvcn1cIj5Qb29yIGVuY29kaW5nIHF1YWxpdHk8L2Rpdj5gO1xuICAgICAgICAgICAgdGhpcy5vdXRlci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsICcjM2MzYjQwJyk7XG4gICAgICAgICAgICB0aGlzLm1pZGRsZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsICcjM2MzYjQwJyk7XG4gICAgICAgICAgICB0aGlzLmlubmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIHRoaXMuY29sb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKFFQID4gdGhpcy5vcmFuZ2VRUCkge1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9ICdvcmFuZ2UnO1xuICAgICAgICAgICAgdGhpcy5ibGlua1ZpZGVvUXVhbGl0eVN0YXR1cygxKTtcbiAgICAgICAgICAgIHRoaXMuc3RhdHNUZXh0ID0gYDxkaXYgc3R5bGU9XCJjb2xvcjogJHt0aGlzLmNvbG9yfVwiPkJsb2NreSBlbmNvZGluZyBxdWFsaXR5PC9kaXY+YDtcbiAgICAgICAgICAgIHRoaXMub3V0ZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5taWRkbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuaW5uZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoUVAgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5jb2xvciA9ICcjYjBiMGIwJztcbiAgICAgICAgICAgIHRoaXMub3V0ZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5taWRkbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCAnIzNjM2I0MCcpO1xuICAgICAgICAgICAgdGhpcy5pbm5lci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsICcjM2MzYjQwJyk7XG4gICAgICAgICAgICB0aGlzLmRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsICcjM2MzYjQwJyk7XG4gICAgICAgICAgICB0aGlzLnN0YXRzVGV4dCA9IGA8ZGl2IHN0eWxlPVwiY29sb3I6ICR7dGhpcy5jb2xvcn1cIj5Ob3QgY29ubmVjdGVkPC9kaXY+YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sb3IgPSAnbGltZSc7XG4gICAgICAgICAgICB0aGlzLnF1YWxpdHlTdGF0dXMuc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgICAgIHRoaXMuc3RhdHNUZXh0ID0gYDxkaXYgc3R5bGU9XCJjb2xvcjogJHt0aGlzLmNvbG9yfVwiPkNsZWFyIGVuY29kaW5nIHF1YWxpdHk8L2Rpdj5gO1xuICAgICAgICAgICAgdGhpcy5vdXRlci5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnZmlsbCcsIHRoaXMuY29sb3IpO1xuICAgICAgICAgICAgdGhpcy5taWRkbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuaW5uZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2ZpbGwnLCB0aGlzLmNvbG9yKTtcbiAgICAgICAgICAgIHRoaXMuZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdmaWxsJywgdGhpcy5jb2xvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5xdWFsaXR5VGV4dC5pbm5lckhUTUwgPSB0aGlzLnN0YXRzVGV4dDtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG4vKipcbiAqIFhSIGljb24gdGhhdCBjYW4gYmUgY2xpY2tlZC5cbiAqL1xuZXhwb3J0IGNsYXNzIFhSSWNvbiB7XG4gICAgX3Jvb3RFbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBfeHJJY29uOiBTVkdFbGVtZW50O1xuICAgIF90b29sdGlwVGV4dDogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRoZSBidXR0b24gY29udGFpbmluZyB0aGUgWFIgaWNvbi5cbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IHJvb3RFbGVtZW50KCk6IEhUTUxCdXR0b25FbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290RWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ1VpVG9vbCcpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuaWQgPSAneHJCdG4nO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy54ckljb24pO1xuICAgICAgICAgICAgdGhpcy5fcm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy50b29sdGlwVGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3RFbGVtZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdG9vbHRpcFRleHQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICBpZiAoIXRoaXMuX3Rvb2x0aXBUZXh0KSB7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgIHRoaXMuX3Rvb2x0aXBUZXh0LmNsYXNzTGlzdC5hZGQoJ3Rvb2x0aXB0ZXh0Jyk7XG4gICAgICAgICAgICB0aGlzLl90b29sdGlwVGV4dC5pbm5lckhUTUwgPSAnWFInO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl90b29sdGlwVGV4dDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHhySWNvbigpOiBTVkdFbGVtZW50IHtcbiAgICAgICAgaWYgKCF0aGlzLl94ckljb24pIHtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcbiAgICAgICAgICAgICAgICAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICAgICAgICAgICAgICAgICdzdmcnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5feHJJY29uLnNldEF0dHJpYnV0ZU5TKG51bGwsICdpZCcsICd4ckljb24nKTtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneCcsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAneScsICcwcHgnKTtcbiAgICAgICAgICAgIHRoaXMuX3hySWNvbi5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndmlld0JveCcsICcwIDAgMTAwIDEwMCcpO1xuXG4gICAgICAgICAgICAvLyBjcmVhdGUgc3ZnIGdyb3VwIGZvciB0aGUgcGF0aHNcbiAgICAgICAgICAgIGNvbnN0IHN2Z0dyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ2cnXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc3ZnR3JvdXAuY2xhc3NMaXN0LmFkZCgnc3ZnSWNvbicpO1xuICAgICAgICAgICAgdGhpcy5feHJJY29uLmFwcGVuZENoaWxkKHN2Z0dyb3VwKTtcblxuICAgICAgICAgICAgLy8gY3JlYXRlIHBhdGhzIGZvciB0aGUgaWNvbiBpdHNlbGYsIHRoZSBwYXRoIG9mIHRoZSB4ciBoZWFkc2V0XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICAgICAgICAgJ3BhdGgnXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZU5TKFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgICAgICdNMjkgNDFjLTUgMC05IDQtOSA5czQgOSA5IDkgOS00IDktOS00LTktOS05em0wIDE0Yy0yLjggMC01LTIuMi01LTVzMi4yLTUgNS01IDUgMi4yIDUgNS0yLjIgNS01IDV6bTQyLTE0Yy01IDAtOSA0LTkgOXM0IDkgOSA5IDktNCA5LTktNC05LTktOXptMCAxNGMtMi44IDAtNS0yLjItNS01czIuMi01IDUtNSA1IDIuMiA1IDUtMi4yIDUtNSA1em0xMi0zMUgxN2MtNi42IDAtMTIgNS40LTEyIDEydjI4YzAgNi42IDUuNCAxMiAxMiAxMmgxNC41YzMuNSAwIDYuOC0xLjUgOS00LjFsMy41LTRjMS41LTEuNyAzLjctMi43IDYtMi43czQuNSAxIDYgMi43bDMuNSA0YzIuMyAyLjYgNS42IDQuMSA5IDQuMUg4M2M2LjYgMCAxMi01LjQgMTItMTJWMzZjMC02LjYtNS40LTEyLTEyLTEyem04IDQwYzAgNC40LTMuNiA4LTggOEg2OC41Yy0yLjMgMC00LjUtMS02LTIuN2wtMy41LTRjLTIuMy0yLjYtNS42LTQuMS05LTQuMS0zLjUgMC02LjggMS41LTkgNC4xbC0zLjUgNEMzNiA3MSAzMy44IDcyIDMxLjUgNzJIMTdjLTQuNCAwLTgtMy42LTgtOFYzNmMwLTQuNCAzLjYtOCA4LThoNjZjNC40IDAgOCAzLjYgOCA4djI4eidcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHN2Z0dyb3VwLmFwcGVuZENoaWxkKHBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl94ckljb247XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IEVwaWMgR2FtZXMsIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cblxuZXhwb3J0IGNsYXNzIE1hdGhVdGlscyB7XG4gICAgLyoqXG4gICAgICogZm9ybWF0cyBCeXRlcyBjb21pbmcgaW4gZm9yIHZpZGVvIHN0YXRzXG4gICAgICogQHBhcmFtIGJ5dGVzIG51bWJlciB0byBjb252ZXJ0XG4gICAgICogQHBhcmFtIGRlY2ltYWxzIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlc1xuICAgICAqL1xuICAgIHN0YXRpYyBmb3JtYXRCeXRlcyhieXRlczogbnVtYmVyLCBkZWNpbWFsczogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKGJ5dGVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJzAnO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmFjdG9yID0gMTAyNDtcbiAgICAgICAgY29uc3QgZG0gPSBkZWNpbWFscyA8IDAgPyAwIDogZGVjaW1hbHM7XG4gICAgICAgIGNvbnN0IHNpemVzID0gW1xuICAgICAgICAgICAgJ0J5dGVzJyxcbiAgICAgICAgICAgICdLaUInLFxuICAgICAgICAgICAgJ01pQicsXG4gICAgICAgICAgICAnR2lCJyxcbiAgICAgICAgICAgICdUaUInLFxuICAgICAgICAgICAgJ1BpQicsXG4gICAgICAgICAgICAnRWlCJyxcbiAgICAgICAgICAgICdaaUInLFxuICAgICAgICAgICAgJ1lpQidcbiAgICAgICAgXTtcblxuICAgICAgICBjb25zdCBpID0gTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZyhmYWN0b3IpKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgcGFyc2VGbG9hdCgoYnl0ZXMgLyBNYXRoLnBvdyhmYWN0b3IsIGkpKS50b0ZpeGVkKGRtKSkgK1xuICAgICAgICAgICAgJyAnICtcbiAgICAgICAgICAgIHNpemVzW2ldXG4gICAgICAgICk7XG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX19lcGljZ2FtZXNfcHNfbGliX3BpeGVsc3RyZWFtaW5nZnJvbnRlbmRfdWU1XzRfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfanNzX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2pzc19wbHVnaW5fY2FtZWxfY2FzZV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9qc3NfcGx1Z2luX2dsb2JhbF9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBDb3B5cmlnaHQgRXBpYyBHYW1lcywgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuXG5leHBvcnQgeyBBcHBsaWNhdGlvbiwgVUlPcHRpb25zLCBWaWRlb1FQSW5kaWNhdG9yQ29uZmlnIH0gZnJvbSAnLi9BcHBsaWNhdGlvbi9BcHBsaWNhdGlvbic7XG5cbmV4cG9ydCB7IFBpeGVsU3RyZWFtaW5nQXBwbGljYXRpb25TdHlsZSB9IGZyb20gJy4vU3R5bGVzL1BpeGVsU3RyZWFtaW5nQXBwbGljYXRpb25TdHlsZXMnO1xuXG5leHBvcnQgeyBBRktPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0FGS092ZXJsYXknO1xuZXhwb3J0IHsgQWN0aW9uT3ZlcmxheSB9IGZyb20gJy4vT3ZlcmxheS9BY3Rpb25PdmVybGF5JztcbmV4cG9ydCB7IE92ZXJsYXlCYXNlIH0gZnJvbSAnLi9PdmVybGF5L0Jhc2VPdmVybGF5JztcbmV4cG9ydCB7IENvbm5lY3RPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0Nvbm5lY3RPdmVybGF5JztcbmV4cG9ydCB7IERpc2Nvbm5lY3RPdmVybGF5IH0gZnJvbSAnLi9PdmVybGF5L0Rpc2Nvbm5lY3RPdmVybGF5JztcbmV4cG9ydCB7IEVycm9yT3ZlcmxheSB9IGZyb20gJy4vT3ZlcmxheS9FcnJvck92ZXJsYXknO1xuZXhwb3J0IHsgSW5mb092ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvSW5mb092ZXJsYXknO1xuZXhwb3J0IHsgUGxheU92ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvUGxheU92ZXJsYXknO1xuZXhwb3J0IHsgVGV4dE92ZXJsYXkgfSBmcm9tICcuL092ZXJsYXkvVGV4dE92ZXJsYXknO1xuZXhwb3J0IHsgQ29uZmlnVUkgfSBmcm9tICcuL0NvbmZpZy9Db25maWdVSSc7XG5leHBvcnQgeyBTZXR0aW5nVUlCYXNlIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJQmFzZSc7XG5leHBvcnQgeyBTZXR0aW5nVUlGbGFnIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJRmxhZyc7XG5leHBvcnQgeyBTZXR0aW5nVUlOdW1iZXIgfSBmcm9tICcuL0NvbmZpZy9TZXR0aW5nVUlOdW1iZXInO1xuZXhwb3J0IHsgU2V0dGluZ1VJT3B0aW9uIH0gZnJvbSAnLi9Db25maWcvU2V0dGluZ1VJT3B0aW9uJztcbmV4cG9ydCB7IFNldHRpbmdVSVRleHQgfSBmcm9tICcuL0NvbmZpZy9TZXR0aW5nVUlUZXh0JztcbmV4cG9ydCB7IFBhbmVsQ29uZmlndXJhdGlvbiwgVUlFbGVtZW50Q29uZmlnLCBVSUVsZW1lbnRDcmVhdGlvbk1vZGUgfSBmcm9tICcuL1VJL1VJQ29uZmlndXJhdGlvblR5cGVzJ1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9