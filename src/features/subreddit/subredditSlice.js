import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../util/API";

export const loadPostsBySubreddit = createAsyncThunk(
  "subreddit/loadPostsBySubreddit",
  async (subreddit) => await API.loadPosts(subreddit)
);

export const loadAboutDetailsBySubreddit = createAsyncThunk(
  "subreddit/loadAboutDetailsBySubreddit",
  (subreddit) => API.aboutSubreddit(subreddit)
);

export const subredditSlice = createSlice({
  name: "subreddit",
  initialState: {
    subredditPosts: [],
    loadingSubredditPosts: true,
    hasErrors: false,

    subredditAbout: [],
    loadingSubredditAbout: true,
    hasAboutErrors: false,
  },
  reducers: {
    reset: (state) =>
      (state = {
        ...state.initialState,
        subredditPosts: [],
        subredditAbout: [],
      }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPostsBySubreddit.pending, (state, action) => {
        state.loadingSubredditPosts = true;
        state.hasErrors = false;
      })
      .addCase(loadPostsBySubreddit.fulfilled, (state, action) => {
        state.loadingSubredditPosts = false;
        state.hasErrors = false;
        state.subredditPosts = action.payload;
      })
      .addCase(loadPostsBySubreddit.rejected, (state, action) => {
        state.loadingSubredditPosts = false;
        state.hasErrors = true;
      })

      // About Subreddit
      .addCase(loadAboutDetailsBySubreddit.pending, (state, action) => {
        state.loadingAbout = true;
        state.hasErrors = false;
      })
      .addCase(loadAboutDetailsBySubreddit.fulfilled, (state, action) => {
        state.subredditAbout = action.payload;
        state.loadingAbout = false;
        state.hasErrors = false;
      })
      .addCase(loadAboutDetailsBySubreddit.rejected, (state, action) => {
        state.loadingAbout = false;
        state.hasAboutErrors = true;
      });
  },
});

export default subredditSlice.reducer;
export const selectSubredditPosts = (state) => state.subreddit.subredditPosts;
export const isLoadingSubredditPosts = (state) =>
  state.subreddit.loadingSubredditPosts;

export const selectSubredditsAbouts = (state) => state.subreddit.subredditAbout;
export const isLoadingSubredditAbouts = (state) =>
  state.subreddit.loadingSubredditAbout;

export const { reset } = subredditSlice.actions;