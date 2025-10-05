import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getComments } from "../../api/comments";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (permalink) => {
    const comments = await getComments(permalink);
    return { permalink, comments };
  }
);

const initialState = {
  byPermalink: {},
  loading: {},
  error: {}
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments(state, action) {
      delete state.byPermalink[action.payload];
      delete state.loading[action.payload];
      delete state.error[action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state, action) => {
        const p = action.meta.arg;
        console.log(p);
        state.loading[p] = true;
        state.error[p] = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { permalink, comments } = action.payload;
        state.loading[permalink] = false;
        state.byPermalink[permalink] = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        const p = action.meta.arg;
        state.loading[p] = false;
        state.error[p] = action.error?.message || true;
      });
  }
});

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer;