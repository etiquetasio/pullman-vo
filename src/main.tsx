import {initializeBlock} from '@airtable/blocks/ui';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';

/**
 * Airtable extensions only run inside an Airtable Base.
 * We add a check to allow the app to render in the AI Studio preview
 * or for local development without crashing.
 */
function run() {
    // Simple check to see if we are likely in Airtable
    // Airtable extensions are served via localhost:9000 or a specific airtable domain in production
    const isAirtableEnv = window.location.hostname === 'localhost' || 
                         window.location.hostname.includes('airtable.com') ||
                         window.parent !== window.self;

    try {
        // We attempt to initialize as an Airtable block
        initializeBlock(() => <App />);
    } catch (error) {
        // If it fails (likely due to environment misconfiguration), we fallback to standard React
        console.warn('Airtable context not found, falling back to standard render:', error);
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            document.getElementById('root')
        );
    }
}

run();
