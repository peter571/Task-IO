import { appApi } from "features/api/api";

const noteApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    newNote: build.mutation({
      query: (body) => ({ url: "/notes/new-note", method: "POST", body: body }),
      invalidatesTags: ["Notes"],
    }),

    getUserNotes: build.query({
      query: ({ workspace_id, userId }) =>
        `/notes/user-notes/${workspace_id}/${userId}`,
      providesTags: ["Notes"],
    }),

    updateNote: build.mutation({
      query: ({ title, text, note_id }) => ({
        url: `/notes/update-note/${note_id}`,
        method: "PATCH",
        body: { title, text },
      }),
      invalidatesTags: ["Notes"],
    }),

    deleteNote: build.mutation({
      query: (note_id) => ({
        url: `/notes/delete-note/${note_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useNewNoteMutation,
  useDeleteNoteMutation,
  useGetUserNotesQuery,
  useUpdateNoteMutation,
} = noteApi;
