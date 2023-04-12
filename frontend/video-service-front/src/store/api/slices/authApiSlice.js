import { apiSlice } from "../apiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
      signin: builder.mutation({
         query: credentials => ({
            url: `/auth/signin/`,
            method: "POST",
            body: { ...credentials },
         }),
         providesTags: ["User"],
      }),
      signup: builder.mutation({
         query: userData => ({
            url: `/auth/signup/`,
            method: "POST",
            body: userData,
         }),
      }),
   }),
})

export const { useSigninMutation, useSignupMutation } = authApiSlice
