import {initializeBlock} from '@airtable/blocks/ui';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';

/**
 * Airtable extensions only run inside an Airtable Base.
 * This logic handles the environment detection to avoid crashes in the preview.
 */
const rootElement = document.getElementById('root');

// Detect if we are running in an Airtable-like environment
// (Served via localhost:9000 or inside an airtable.com iframe)
const isAirtable = window.location.hostname === 'localhost' || 
                  window.location.hostname.includes('airtable.com');

if (isAirtable && !rootElement) {
    // We are likely in the Airtable frame (no #root element provided by Airtable)
    try {
        initializeBlock(() => <App />);
    } catch (e) {
        console.error('Failed to initialize Airtable block:', e);
    }
} else {
    // We are in the AI Studio preview or local development
    if (rootElement) {
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            rootElement
        );
    } else {
        // Last resort: try initializeBlock if no #root is found
        try {
            initializeBlock(() => <App />);
        } catch (e) {
            console.warn('Fallback initialization failed:', e);
        }
    }
}
