import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const sliceOptions = {
    name: "listings",
    initialState: {
        listings: [],
        isLoading: false,
        hasError: false
    },
    reducers: {}
};

export const allListingsSlice = createSlice(sliceOptions);