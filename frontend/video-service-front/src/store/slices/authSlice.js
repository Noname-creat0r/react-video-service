import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { apiSlice } from "../api/apiSlice"
import axios from "../../axios-settings"

const initialState = {
   token: null,
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
      },
      logOut(state) {
         state.token = null
         state.userId = null
      },
   },
})

export const { setCredentials, logOut } = authSlice.actions

export const selectCurrentUserId = state => state.auth.user
export const selectCurrentToken = state => state.auth.token

export default authSlice.reducer
