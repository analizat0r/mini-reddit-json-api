import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPosts } from "../../api/posts";

const initialState = {
    listings: [],
    isLoading: false,
    hasError: false,
    hasMore: true,
    after: null,
    searchTerm: ""
}

export const searchPosts = createAsyncThunk(
    "search/searchPosts",
    async (searchTerm, {getState}) => {
        const state = getState();
        if (!state.search.hasMore) return { posts: [], after: null };
        return await getPosts(searchTerm, state.search.after)
    }
);

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
            state.listings = [];
            state.hasMore = true;
        },
        clearSearchTerm(state) {
            state.searchTerm = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchPosts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(searchPosts.fulfilled, (state, action) => {
                state.listings = [...state.listings, ...action.payload.posts]
                state.isLoading = false;
                state.hasError = false;
                state.hasMore = action.payload.after !== null;
                state.after = action.payload.after;
            })
            .addCase(searchPosts.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            });
    }
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;