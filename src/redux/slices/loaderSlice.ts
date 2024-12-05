import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoaderState {
    loading: boolean;
}

const initialState: LoaderState = {
    loading: true,
};

const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { setLoading } = loaderSlice.actions;
export default loaderSlice.reducer;