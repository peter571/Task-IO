import { appApi } from "./api";

const taskApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    newTask: build.mutation({
      query: (body) => ({ url: "/tasks/new-task", method: "POST", body: body }),
      invalidatesTags: ["Tasks"],
    }),

    getWorkSpaceTasks: build.query({
      query: ({ workspace_id, status_type }) =>
        `/tasks/${workspace_id}?status_type=${status_type}`,
      providesTags: ["Tasks"],
    }),

    getUserTasks: build.query({
      query: ({ workspace_id, userId }) => ({
        url: `/tasks/user/${workspace_id}/${userId}`
      }),
      providesTags: ["Tasks"]
    }),

    updateTaskStatus: build.mutation({
      query: ({ taskId, status }) => ({
        url: `/tasks/update-task-status/${taskId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useNewTaskMutation,
  useGetWorkSpaceTasksQuery,
  useUpdateTaskStatusMutation,
  useGetUserTasksQuery,
  useLazyGetWorkSpaceTasksQuery
} = taskApi;
