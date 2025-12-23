// Copyright Epic Games, Inc. All Rights Reserved.

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
        hot: true,
        liveReload: true,
        historyApiFallback: true,
        // Proxy WebSocket connections to SignallingWebServer
        proxy: [
            {
                context: ['/ws'],
                target: 'ws://localhost:80',
                ws: true,
                changeOrigin: true,
            },
        ],
        // Allow connections from any host (for LAN testing)
        allowedHosts: 'all',
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
            progress: true,
        },
    },
});
