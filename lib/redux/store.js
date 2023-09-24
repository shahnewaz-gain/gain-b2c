"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/redux/auth/authSlice";
import { apiSlice } from "@/lib/redux/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
