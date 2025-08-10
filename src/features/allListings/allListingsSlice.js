import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../../api/posts";

export const loadListings = createAsyncThunk(
    "allListings/getAllListings",
    async () => {
        return await getPosts();
    }
);

const initialState = {
  listings: [],
  isLoading: false,
  hasError: false,
};


const allListingsSlice = createSlice({
    name: "allListings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadListings.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(loadListings.fulfilled, (state, action) => {
                state.listings = action.payload;
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(loadListings.rejected, (state) => {
                 state.isLoading = false;
                state.hasError = true;
            });
    }
});

export default allListingsSlice.reducer;