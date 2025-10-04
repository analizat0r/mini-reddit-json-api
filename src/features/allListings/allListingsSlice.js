import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../../api/posts";

const initialState = {
  listings: [],
  isLoading: false,
  hasError: false,
  hasMore: true,
  after: null,
  currentSubreddit: null
};

export const loadListings = createAsyncThunk(
    "allListings/getAllListings",
    async ({ subreddit } = {}, { getState }) => {
        const state = getState();
        // if requesting a different subreddit, reset 'after' for a fresh fetch
        const current = state.allListings.currentSubreddit;
        const after = subreddit && subreddit !== current ? null : state.allListings.after;
        return await getPosts("", after, subreddit);
    }
);

const allListingsSlice = createSlice({
    name: "allListings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadListings.pending, (state, action) => { // <-- accept action
                state.isLoading = true;
                state.hasError = false;
                const requestedSubreddit = action.meta.arg?.subreddit;
                if (requestedSubreddit && requestedSubreddit !== state.currentSubreddit) {
                  state.listings = [];
                  state.after = null;
                  state.hasMore = true;
                  state.currentSubreddit = requestedSubreddit;
                }
            })
            .addCase(loadListings.fulfilled, (state, action) => {
                // append for same subreddit / feed, but replace if this was a fresh subreddit fetch
                const requestedSubreddit = action.meta.arg?.subreddit;
                if (requestedSubreddit && requestedSubreddit === state.currentSubreddit && state.listings.length === 0) {
                  state.listings = [...action.payload.posts];
                } else if (requestedSubreddit && requestedSubreddit !== null && state.currentSubreddit === requestedSubreddit && state.listings.length === 0) {
                  state.listings = [...action.payload.posts];
                } else if (!requestedSubreddit && state.listings.length === 0) {
                  state.listings = [...action.payload.posts];
                } else {
                  state.listings = [...state.listings, ...action.payload.posts];
                }

                state.isLoading = false;
                state.hasError = false;
                state.hasMore = action.payload.after !== null;
                state.after = action.payload.after;
            })
            .addCase(loadListings.rejected, (state) => {
                 state.isLoading = false;
                state.hasError = true;
            });
    }
});

export default allListingsSlice.reducer;