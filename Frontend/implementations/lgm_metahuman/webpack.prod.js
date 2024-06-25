// Copyright Epic Games, Inc. All Rights Reserved.

const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'), // Explicitly set output directory
        clean: true // This will clean the output directory before each build
    },
    optimization: {
        usedExports: true,
        minimize: true
    },
    stats: 'normal',
    performance: {
        hints: false
    }
});