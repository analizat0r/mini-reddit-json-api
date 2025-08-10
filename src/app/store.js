import { configureStore } from "@reduxjs/toolkit";
import allListingsReducer from "../features/allListings/allListingsSlice"

export const store = configureStore({
    reducer: {
        allListings: allListingsReducer
    }
});