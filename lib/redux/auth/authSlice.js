"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLogOut: (state) => {
      state.accessToken = "";
      state.user = "";
      localStorage.clear();
    },
  },
});

export const { userLogIn, userLogOut } = authSlice.actions;
export default authSlice.reducer;
