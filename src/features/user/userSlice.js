import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../util/API";

export const loadUserData = createAsyncThunk("user/loadUserData", (user) =>
  API.getUserData(user)
);

export const loadAboutData = createAsyncThunk("user/loadAboutData", (user) =>
  API.getUserAboutData(user)
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    loadingUserData: false,
    hasErrors: false,

    userAboutData: [],
    loadingAboutData: false,
    hasErrorsAbout: false,
  },
  reducers: {
    reset: (state) =>
      (state = {
        ...state.initialState,
        userData: [],
        userAboutData: [],
      }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserData.pending, (state, action) => {
        state.loadingUserData = true;
        state.hasErrors = false;
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loadingUserData = false;
        state.hasErrors = false;
      })
      .addCase(loadUserData.rejected, (state, action) => {
        state.loadingUserData = false;
        state.hasErrors = true;
      })

      // load about data
      .addCase(loadAboutData.pending, (state, action) => {
        state.loadingUserData = true;
        state.hasErrors = false;
      })
      .addCase(loadAboutData.fulfilled, (state, action) => {
        state.userAboutData = action.payload;
        state.loadingUserData = false;
        state.hasErrors = false;
      })
      .addCase(loadAboutData.rejected, (state, action) => {
        state.loadingUserData = false;
        state.hasErrors = true;
      });
  },
});

export default userSlice.reducer;
export const selectUserData = (state) => state.user.userData;
export const isLoadingUserData = (state) => state.user.loadUserData;

export const selectAboutData = (state) => state.user.userAboutData;
export const isLoadingAboutData = (state) => state.user.loadingAboutData;

export const { reset } = userSlice.actions;