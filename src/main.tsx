import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';

/**
 * Airtable extensions only run inside an Airtable Base.
 * We use dynamic imports to prevent the Airtable SDK from crashing the app
 * when running in non-Airtable environments like the AI Studio preview.
 */
async function startApp() {
    const rootElement = document.getElementById('root');

    // If #root exists, we are in the AI Studio preview or standard web environment
    if (rootElement) {
        console.log('Running in standard React mode (Preview)');
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            rootElement
        );
        return;
    }

    // If no #root, we assume we are in the Airtable extension frame
    try {
        console.log('Attempting to initialize Airtable Extension...');
        // Dynamically import the SDK to avoid environment checks on page load
        const { initializeBlock } = await import('@airtable/blocks/ui');
        initializeBlock(() => <App />);
    } catch (error) {
        console.error('Failed to initialize Airtable Extension:', error);
        
        // Fallback if initializeBlock fails and we still have no root
        // This shouldn't happen in a normal Airtable environment
        const fallbackRoot = document.createElement('div');
        fallbackRoot.id = 'fallback-root';
        document.body.appendChild(fallbackRoot);
        
        ReactDOM.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>,
            fallbackRoot
        );
    }
}

startApp();
