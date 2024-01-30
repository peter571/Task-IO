import { configureStore } from "@reduxjs/toolkit";
import { appApi } from "../features/api/api";
import authReducer from '../features/api/authSlice'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [appApi.reducerPath]: appApi.reducer,
    auth: authReducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
