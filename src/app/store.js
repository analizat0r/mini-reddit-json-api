import { configureStore } from "@reduxjs/toolkit";
import allListingsReducer from "../features/allListings/allListingsSlice";
import searchReducer from "../features/search/searchSlice";
import subredditsReducer from "../features/subreddits/subredditsSlice";
import commentsReducer from "../features/comment/commentSlice"

export const store = configureStore({
    reducer: {
        allListings: allListingsReducer,
        search: searchReducer,
        allSubreddits: subredditsReducer,
        comments: commentsReducer
    }
});