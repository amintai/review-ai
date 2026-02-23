import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import { createLogger } from 'redux-logger'

const logger = createLogger({
    collapsed: true,
    duration: true,
    timestamp: true,
    diff: true,
});

export const store = configureStore({
    reducer: {
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
