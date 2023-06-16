import { appApi } from "./api";

const messageApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    newMessage: build.mutation({
      query: (body) => ({
        url: "/messages/new-message",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Messages"],
    }),
    getMessages: build.query({
      query: (chat_id) => `/messages/${chat_id}`,
      providesTags: ["Messages"],
    }),
  }),
});

export const { useNewMessageMutation, useGetMessagesQuery } = messageApi;
