import { configureStore } from "@reduxjs/toolkit";
import allListingsSlice from "../features/allListings/allListingsSlice"

export default configureStore({
    reducer: {
        allListings: allListingsSlice
    }
})