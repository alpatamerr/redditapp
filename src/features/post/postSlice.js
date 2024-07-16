import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../util/API";

export const loadPost = createAsyncThunk(
  "post/loadPost",
  async ({ reddit, id }) => await API.loadPost(reddit, id)
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
    loadingPost: false,
    hasErrors: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPost.pending, (state, action) => {
        state.loadingPost = true;
        state.hasErrors = false;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        state.loadingPost = false;
        state.hasErrors = false;
        state.post = action.payload;
      })
      .addCase(loadPost.rejected, (state, action) => {
        state.loadingPost = false;
        state.hasErrors = true;
      });
  },
});

export default postSlice.reducer;
export const selectPost = (state) => state.post.post;
export const isLoadingPost = (state) => state.post.loadingPost;