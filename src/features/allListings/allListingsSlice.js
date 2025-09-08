import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../../api/posts";

const initialState = {
  listings: [],
  isLoading: false,
  hasError: false,
  hasMore: true
};

export const loadListings = createAsyncThunk(
    "allListings/getAllListings",
    async (_, { getState }) => {
        const state = getState();
        if (!state.allListings.hasMore) return { posts: [], after: null };
        return await getPosts();
    }
);

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
                state.listings = [...state.listings, ...action.payload.posts];
                state.isLoading = false;
                state.hasError = false;
                state.hasMore = action.payload.after !== null;
            })
            .addCase(loadListings.rejected, (state) => {
                 state.isLoading = false;
                state.hasError = true;
            });
    }
});

export default allListingsSlice.reducer;