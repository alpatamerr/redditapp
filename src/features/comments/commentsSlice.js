import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../util/API";

export const loadCommentsForPostId = createAsyncThunk(
  "comments/loadCommentsForPostId",
  ({ reddit, id }) => API.loadComments(reddit, id)
);

export const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loadingComments: true,
    hasError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCommentsForPostId.pending, (state) => {
        state.loadingComments = true;
        state.hasError = false;
      })
      .addCase(loadCommentsForPostId.fulfilled, (state, action) => {
        state.loadingComments = false;
        state.hasError = false;
        state.comments = action.payload;
        console.log('Comments loaded:', action.payload);
      })
      
      .addCase(loadCommentsForPostId.rejected, (state) => {
        state.loadingComments = false;
        state.hasError = true;
      });
  },
});

export default commentsSlice.reducer;
export const selectComments = (state) => state.comments.comments;
export const isLoadingComments = (state) => state.comments.loadingComments;
