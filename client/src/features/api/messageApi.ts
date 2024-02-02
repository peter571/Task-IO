import { appApi } from "features/api/api";

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
    deleteMessage: build.mutation({
      query: ({ chatId, messageId }) => ({
        url: `/messages/delete-message/${chatId}/${messageId}`,
        method: "DELETE",
      }),
      onQueryStarted: ({ chatId, messageId }, { dispatch, queryFulfilled }) => {
        console.log({ chatId, messageId })
        // Optimistically update the cache
        const deleteResult = dispatch(
          messageApi.util.updateQueryData("getMessages", chatId, (draft) => {
            //

            console.log(chatId, draft)
          })
        );

        // Dispatch the deleteMessage action
        try {
          queryFulfilled.then(() => {
            dispatch(messageApi.util.invalidateTags(["Messages"]));
          });
        } catch (error) {
          deleteResult.undo();
        }
      },

      invalidatesTags: ["Messages"],
    }),
    editMessage: build.mutation({
      query: ({ chatId, messageId, textMsg }) => ({
        url: `/messages/edit-message/${chatId}/${messageId}`,
        method: "PATCH",
        body: { content: textMsg },
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useNewMessageMutation,
  useGetMessagesQuery,
  useLazyGetMessagesQuery,
  useDeleteMessageMutation,
  useEditMessageMutation,
} = messageApi;
