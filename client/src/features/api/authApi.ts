import { LoginValues, RegisterValues } from "../../types";
import { appApi } from "./api";

const authApi = appApi.injectEndpoints({
  endpoints: (build) => ({
    //Register a User
    register: build.mutation({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body: body,
      }),
      
    }),
    //Login an existing User
    login: build.mutation({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body: body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation } = authApi;
