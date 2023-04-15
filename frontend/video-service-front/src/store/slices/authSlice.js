import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   token: localStorage.getItem('token'),
   error: null,
   loading: false,
   guest: false,
   userId: null,
}

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setCredentials: (state, action) => {
         state.token = action.payload.token
         state.userId = action.payload.userId
         localStorage.setItem('token', action.payload.token)
      },
      logOut(state) {
         state.token = null
         state.userId = null
         localStorage.removeItem('token')
      },
   },
})

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentUserId = state => state.auth.user
export const selectCurrentToken = state => state.auth.token

export default authSlice.reducer
