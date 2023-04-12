import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, logOut } from "../slices/authSlice"

const baseQuery = fetchBaseQuery({
   baseUrl: process.env.REACT_APP_BASE_SERVER_URL,
   prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || localStorage.getItem("token")

      if (token) {
         headers.set("Authorization", `Bearer ${token}`)
      }

      return headers
   },
})

// kind of an interceptor
const baseQueryWithReauth = async (args, api, extraOptions) => {
   let result = await baseQuery(args, api, extraOptions)

   if (result?.error?.originalStatus === 403) {
      console.log("Sending refresh token...")
      const refreshResult = await baseQuery("/refresh", api, extraOptions)
      console.log("Refresh result: " + refreshResult)
      if (refreshResult?.data) {
         const userId = api.getState().auth.userId
         // data or what ?
         api.dispatch(setCredentials({ token: refreshResult.token, userId }))

         result = await baseQuery(args, api, extraOptions)
      } else {
         api.dispatch(logOut())
      }
   }

   return result
}

export const apiSlice = createApi({
   baseQuery: baseQueryWithReauth,
   endpoints: builder => ({}),
})
