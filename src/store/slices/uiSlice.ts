import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
    isSidebarOpen: boolean;
    isSidebarCollapsed: boolean;
    isFeedbackModalOpen: boolean;
}

const initialState: UiState = {
    isSidebarOpen: true,
    isSidebarCollapsed: false,
    isFeedbackModalOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        toggleCollapsed: (state) => {
            state.isSidebarCollapsed = !state.isSidebarCollapsed;
        },
        setSidebarOpen: (state, action: PayloadAction<boolean>) => {
            state.isSidebarOpen = action.payload;
        },
        setFeedbackModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isFeedbackModalOpen = action.payload;
        },
    },
});

export const { toggleSidebar, toggleCollapsed, setSidebarOpen, setFeedbackModalOpen } = uiSlice.actions;

export default uiSlice.reducer;
