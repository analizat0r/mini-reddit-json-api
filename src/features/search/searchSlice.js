import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: "",
    reducers: {
        setSearchTerm: "",
        clearSearchTerm: ""
    }
});


// create a function which would search in reddit json api. Probably need to extend post.js or create new one, not sure yet.