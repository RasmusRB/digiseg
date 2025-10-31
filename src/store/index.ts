import { configureStore } from "@reduxjs/toolkit";
import { digisegApi } from "./api/digisegApi";

export const store = configureStore({
  reducer: {
    [digisegApi.reducerPath]: digisegApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(digisegApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
