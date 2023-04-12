import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import { reactivateGuest } from "./shared/utility"

import Layout from "./containers/Layout/Layout"
import ErrorBoundary from "./hoc/ErrorBoundary/ErrorBoundary"
import NotFound from "./components/Error/ErrorComponents/NotFound"
import Home from "./containers/Home/Home"
import Video from "./containers/Video/Video"
import Profile from "./containers/Profile/Profile"
import Logout from "./containers/Auth/Logout/Logout"
import Playlist from "./containers/Playlist/Playlist"
import Admin from "./containers/Admin/Admin"

import "./App.css"

/*tryAutoSignup: () => dispatch(actions.authCheckState()),
   fetchUserData: (userId, token) => dispatch(actions.profileFetchData(userId, token)),
   fetchVideosInfo: (endpoint, options) =>   
      dispatch(actions.videoFetchInfo(endpoint, options)),
   fetchCategoreis: () => dispatch(actions.categoryFetch()),
   fetchPlaylistsData: (endpoint, options) =>
      dispatch(actions.playlistFetchData(endpoint, options)),*/

export default function App() {
   const isAuthenticated = useSelector(state => state.auth.token)
   //const profileData = useSelector(state => state.profile.data)

   //tryAutoSignup()
   /*await fetchVideosInfo("info/home", {})
      await fetchCategoreis()*/

   if (isAuthenticated) {
      /*await fetchUserData(
            localStorage.getItem("userId"),
            localStorage.getItem("token")
         )
         await fetchPlaylistsData("/",
            userId: localStorage.getItem("userId"),
         })*/
   }

   /*if (!localStorage.getItem("views") && !isAuthenticated) {
         reactivateGuest()
      }*/

   const routes = () => {
      const basicRoutes = [
         <Route
            path="/video"
            element={<Video />}
         />,
         <Route
            path="/"
            element={<Home />}
         />,
         <Route
            path="*"
            element={<NotFound />}
         />,
      ]

      const authRoutes = [
         <Route
            path="/profile"
            element={<Profile />}
         />,
         <Route
            path="/playlist"
            element={<Playlist />}
         />,
         <Route
            path="/logout"
            element={<Logout />}
         />,
      ]

      const adminRoutes = [
         <Route
            path="/admin"
            element={<Admin />}
         />,
      ]

      let routes = [...basicRoutes]

      if (isAuthenticated) routes = [...routes, ...authRoutes]

      /*if (profileData.type === "Admin" && isAuthenticated)
         routes = [...routes, ...adminRoutes]*/

      return routes
   }

   return (
      <ErrorBoundary>
         <Layout>
            <Routes>{routes}</Routes>
         </Layout>
      </ErrorBoundary>
   )
}
