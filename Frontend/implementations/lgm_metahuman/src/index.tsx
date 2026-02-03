// Copyright Epic Games, Inc. All Rights Reserved.
import React from 'react';
import { createRoot } from 'react-dom/client';
import { configure } from 'mobx';
import { App } from './components/App';

configure({ enforceActions: 'never' });

document.body.onload = function () {
    // Attach the React app root component to document.body
    createRoot(document.getElementById('root')).render(<App />);
};
