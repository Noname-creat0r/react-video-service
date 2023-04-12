import { configureStore } from "@reduxjs/toolkit"

import { apiSlice } from "./api/apiSlice"

import authSlice from "./slices/authSlice"
import profileReducer from "./reducers/profile"
import videoReducer from "./reducers/video"
import playlistReducer from "./reducers/playlist"
import categoryReducer from "./reducers/category"
import notificationReducer from "./reducers/notification"
import adminReducer from "./reducers/admin"

export default configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authSlice,
      profile: profileReducer,
      video: videoReducer,
      playlist: playlistReducer,
      category: categoryReducer,
      notification: notificationReducer,
      admin: adminReducer,
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
   devTools: true,
})
