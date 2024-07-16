import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../util/API";

export const loadSubreddits = createAsyncThunk(
  "subreddits/loadSubreddits",
  () => {
    return API.loadSubreddits();
  }
);

export const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: {
    subreddits: [],
    loadingSubreddits: true,
    hasErrors: false,
  },
  reducers: {
    reset: (state) =>
      (state = {
        ...state.initialState,
        subreddits: [],
      }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSubreddits.pending, (state, action) => {
        state.loadingSubreddits = true;
        state.hasErrors = false;
      })
      .addCase(loadSubreddits.fulfilled, (state, action) => {
        state.subreddits = action.payload;
        state.loadingSubreddits = false;
        state.hasErrors = false;
      })
      .addCase(loadSubreddits.rejected, (state, action) => {
        state.loadingSubreddits = false;
        state.hasErrors = true;
      });
  },
});

export default subredditsSlice.reducer;
export const selectSubreddits = (state) => state.subreddits.subreddits;
export const isLoadingSubreddits = (state) =>
  state.subreddits.loadingSubreddits;
export const { reset } = subredditsSlice.actions;