import { configureStore } from "@reduxjs/toolkit";
import allListingsReducer from "../features/allListings/allListingsSlice";
import searchReducer from "../features/search/searchSlice";

export const store = configureStore({
    reducer: {
        allListings: allListingsReducer,
        search: searchReducer
    }
});