import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
    isOpen: boolean;
    heading: string;
    bodyContent: React.ReactNode;
}

const initialState: NotificationState = {
    isOpen: false,
    heading: "",
    bodyContent: "",
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification: (state, action: PayloadAction<{ heading: string, bodyContent: React.ReactNode }>) => {
            state.isOpen = true;
            state.heading = action.payload.heading;
            state.bodyContent = action.payload.bodyContent;
        },
        hideNotification: (state) => {
            state.isOpen = false;
            state.heading = "";
            state.bodyContent = "";
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
