import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../util/API";

export const loadPosts = createAsyncThunk(
  "posts/loadPosts",
  async (term, filter) => {
    return await API.loadPosts(term, filter);
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoadingPosts: false,
    hasError: false,
  },
  reducers: {
    reset: (state) =>
      (state = {
        ...state.initialState,
        posts: [],
      }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state, action) => {
        state.isLoadingPosts = true;
        state.hasError = false;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.isLoadingPosts = false;
        state.hasError = false;
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.isLoadingPosts = false;
        state.hasError = true;
      });
  },
});

export default postsSlice.reducer;
export const selectAllPosts = (state) => state.posts.posts;
export const isLoading = (state) => state.posts.isLoadingPosts;

export const { reset } = postsSlice.actions;