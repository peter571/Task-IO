import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage } from "../../utils/getToken";

export const appApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
    prepareHeaders: (headers, { getState }) => {
      const token = getTokenFromLocalStorage(); // Token retrieval logic
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users', "Spaces", "Messages", "Chats", "Tasks"],
  endpoints: () => ({}),
});
