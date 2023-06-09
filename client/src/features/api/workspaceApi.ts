import { SpaceProp } from "../../types";
import { appApi } from "./api";

const workspaceApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    createWorkSpace: build.mutation<SpaceProp, SpaceProp>({
      query: (body) => ({
        url: "/spaces/new-space",
        method: "post",
        body: body,
      }),
    }),

    getUserWorkSpaces: build.query({
      query: (userId) => ({ url: `/spaces/get-user-spaces/${userId}` }),
    }),

    addWorkSpaceMember: build.mutation({
      query: ({ user_id, workspace_id }) => ({
        url: `/spaces/${workspace_id}/add-member/${user_id}`,
        method: "PATCH",
      }),
    }),

    getWorkSpaceMembers: build.query({
      query: (spaceId) => ({ url: `/spaces/get-space-members/${spaceId}` }),
    }),
  }),
});

export const {
  useCreateWorkSpaceMutation,
  useAddWorkSpaceMemberMutation,
  useGetUserWorkSpacesQuery,
  useGetWorkSpaceMembersQuery,
} = workspaceApi;
