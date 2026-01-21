import { initBotId } from 'botid/client/core';

export function register() {
    if (typeof window !== 'undefined') {
        initBotId({
            protect: [
                // High Priority: AI Generation (Resource-Intensive)
                { path: '/api/generate', method: 'POST' },
                { path: '/api/demo/generate', method: 'POST' },

                // Medium Priority: Data Protection
                { path: '/api/history', method: 'GET' },
                { path: '/api/google/locations', method: 'GET' },
                { path: '/api/google/reviews', method: 'GET' },
            ],
        });
    }
}
