import { appApi } from "features/api/api";

const chatApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    newChat: build.mutation({
      query: (body) => ({ url: "/chats/new-chat", method: "POST", body: body }),
      invalidatesTags: ["Chats"],
    }),

    getUserChats: build.query({
      query: ({ workspace_id, userId }) => `/chats/${workspace_id}/${userId}`,
      providesTags: ["Chats"]
    }),
  }),
});

export const { useNewChatMutation, useGetUserChatsQuery } = chatApi;
