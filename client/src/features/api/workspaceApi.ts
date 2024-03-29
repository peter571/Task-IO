import { SpaceProp } from "@/types";
import { appApi } from "features/api/api";

const workspaceApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    createWorkSpace: build.mutation<SpaceProp, SpaceProp>({
      query: (body) => ({
        url: "/spaces/new-space",
        method: "post",
        body: body,
      }),
      invalidatesTags: ["Spaces"]
    }),

    getUserWorkSpaces: build.query({
      query: ({ userId, user_email }) => ({
        url: `/spaces/get-user-spaces/${userId}?user_email=${user_email}`,
      }),
      providesTags: ["Spaces"]
    }),

    addWorkSpaceMember: build.mutation({
      query: ({ admin_id, workspace_id, email }) => ({
        url: `spaces/${workspace_id}/add-member`,
        method: "PATCH",
        body: { email, admin_id },
      }),
      invalidatesTags: ["Spaces"]
    }),

    getWorkSpaceMembers: build.query({
      query: (spaceId) => ({ url: `/spaces/get-space-members/${spaceId}` }),
    }),

    getWorkSpace: build.query({
      query: (spaceId) => '/spaces/space/' + spaceId 
    }),

    inviteMember: build.mutation({
      query: (body) => ({
        url: "/spaces/invite-member",
        method: "POST",
        body: body,
      }),
    }),

    validateMemberInvite: build.mutation({
      query: ({ token, userId }) => ({
        url: "/spaces/validate/add-member",
        method: "PATCH",
        body: { token, userId },
      }),
      invalidatesTags: ["Spaces"]
    }),
  }),
});

export const {
  useCreateWorkSpaceMutation,
  useAddWorkSpaceMemberMutation,
  useGetUserWorkSpacesQuery,
  useGetWorkSpaceMembersQuery,
  useInviteMemberMutation,
  useValidateMemberInviteMutation,
  useGetWorkSpaceQuery
} = workspaceApi;
