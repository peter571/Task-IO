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
        url: `/tasks/user/${workspace_id}/${userId}`,
      }),
      providesTags: ["Tasks"],
    }),

    updateTask: build.mutation({
      query: ({ task_id, title, description, completion_date }) => ({
        url: `/tasks/update-task/${task_id}`,
        method: "PATCH",
        body: { title, description, completion_date },
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTaskStatus: build.mutation({
      query: ({ taskId, status }) => ({
        url: `/tasks/update-task-status/${taskId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Tasks"],
    }),

    deleteTask: build.mutation({
      query: (id) => ({ url: `/tasks/delete-task/${id}`, method: "DELETE"}),
      invalidatesTags: ["Tasks"]
    })
  }),
});

export const {
  useNewTaskMutation,
  useGetWorkSpaceTasksQuery,
  useUpdateTaskStatusMutation,
  useGetUserTasksQuery,
  useLazyGetWorkSpaceTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} = taskApi;
