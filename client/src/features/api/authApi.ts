import { LoginValues, RegisterValues } from "../../types";
import { appApi } from "./api";

const authApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    
    //Register a User
    register: build.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: body,
      }),
    }),

    //Login an existing User
    login: build.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
    }),

    //send reset password email
    sendResetEmail: build.mutation({
      query: (email) => ({
        url: '/auth/forgot-password/' + email,
        method: "PATCH"
      })
    }),

    //Reset password
    resetPassword: build.mutation({
      query: (body) => ({
        url: '/auth/reset-password',
        method: "PATCH", 
        body
      })
    }),

    //Log out
    logout: build.mutation({
      query: () => ({
        url: '/auth/logout',
        method: "POST"
      })
    }),

    //Get user
    getUser: build.query({
      query: (email) => ({ url: "/auth/get-user?email=" + email }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useSendResetEmailMutation,
  useResetPasswordMutation,
  useLogoutMutation
} = authApi;
