import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../util/API";

export const loadPost = createAsyncThunk(
  "post/loadPost",
  async ({ reddit, id }) => {
    const post = await API.loadPost(reddit, id);
    return post;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: null,
    loadingPost: true,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPost.pending, (state) => {
        state.loadingPost = true;
        state.hasError = false;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        state.loadingPost = false;
        state.post = action.payload;
      })
      .addCase(loadPost.rejected, (state) => {
        state.loadingPost = false;
        state.hasError = true;
      });
  },
});

export default postSlice.reducer;
export const selectPost = (state) => state.post.post;
export const isLoadingPost = (state) => state.post.loadingPost;
