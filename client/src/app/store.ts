import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { appApi } from "../features/api/api";
import authReducer from "../features/api/authSlice";

const rootReducer = combineReducers({
  [appApi.reducerPath]: appApi.reducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware),
 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
