import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSubreddits } from "../../api/subreddits";

const initialState = {
    subreddits: [],
    isLoading: false,
    hasError: false
};

export const loadSubreddits = createAsyncThunk(
    "allSubreddits/loadSubreddits",
    async () => {
        return await getSubreddits();
    }
);

const allSubredditsSlice = createSlice({
    name: "allSubreddits",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadSubreddits.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadSubreddits.fulfilled, (state, action) => {
                state.subreddits = [...state.subreddits, action.payload];
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadSubreddits.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    }
});

export default allSubredditsSlice.reducer;