// Copyright Epic Games, Inc. All Rights Reserved.

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const fs = require('fs');

// SSL certificates for HTTPS (required for WebRTC camera/mic access)
const certsPath = path.resolve(__dirname, '../../../SignallingWebServer/certificates');
let serverOptions = {};

if (fs.existsSync(path.join(certsPath, 'client-key.pem'))) {
    serverOptions = {
        type: 'https',
        options: {
            key: fs.readFileSync(path.join(certsPath, 'client-key.pem')),
            cert: fs.readFileSync(path.join(certsPath, 'client-cert.pem')),
        },
    };
}

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
        server: serverOptions,
        // Proxy WebSocket connections to SignallingWebServer (HTTPS)
        proxy: [
            {
                context: ['/ws'],
                target: 'wss://localhost:443',
                ws: true,
                secure: false, // Accept self-signed certs
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
