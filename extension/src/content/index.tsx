import React from 'react';
import { createRoot } from 'react-dom/client';
import AmazonOverlay from './AmazonOverlay';
import './content.css';

const ROOT_ID = 'reviewai-extension-root';

const mountOverlay = () => {
    if (!document.body) {
        return;
    }

    const existingRoot = document.getElementById(ROOT_ID);
    if (existingRoot) {
        return;
    }

    const container = document.createElement('div');
    container.id = ROOT_ID;
    document.body.appendChild(container);

    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <AmazonOverlay />
        </React.StrictMode>
    );
};

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', mountOverlay, { once: true });
} else {
    mountOverlay();
}
