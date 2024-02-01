import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "features/api/authSlice";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { RootState } from "app/store";

const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.MODE === "production"
      ? `${import.meta.env.VITE_SERVER_URL}/`
      : "http://localhost:5000/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      const state = api.getState() as RootState;
      const user = state.auth.user;

      const userData = refreshResult.data as Record<string, any>;
      // store the new token
      api.dispatch(
        setCredentials({
          user: userData.user,
          token: userData.accessToken,
        })
      );
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut({}));
    }
  }

  return result;
};

export const appApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Users", "Spaces", "Messages", "Chats", "Tasks", "Notes"],
  endpoints: () => ({}),
});
