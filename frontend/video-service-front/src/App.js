import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import CryptoJS from "crypto-js";
import * as actions from "./store/actions/index";
import axios from "./axios-settings";

import Layout from "./containers/Layout/Layout";
import ErrorBoundary from "./hoc/ErrorBoundary/ErrorBoundary";
import NotFound from "./components/Error/ErrorComponents/NotFound";
import Home from "./containers/Home/Home";
import Video from "./containers/Video/Video";
import Profile from "./containers/Profile/Profile";
import Logout from "./containers/Auth/Logout/Logout";
import Playlist from "./containers/Playlist/Playlist";
import Auth from "./containers/Auth/Auth";
import Admin from "./containers/Admin/Admin";

import "./App.css";

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        profileData: state.profile.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        tryAutoSignup: () => dispatch(actions.authCheckState()),
        fetchUserData: (userId, token) =>
            dispatch(actions.profileFetchData(userId, token)),
        fetchVideosInfo: (endpoint, options) =>
            dispatch(actions.videoFetchInfo(endpoint, options)),
        fetchCategoreis: () => dispatch(actions.categoryFetch()),
        fetchPlaylistsData: (endpoint, options) =>
            dispatch(actions.playlistFetchData(endpoint, options)),
    };
};

class App extends Component {
    state = {};

    async componentDidMount() {
        this.props.tryAutoSignup();
        await this.props.fetchVideosInfo("info/home", {});
        await this.props.fetchCategoreis();

        if (this.props.isAuthenticated) {
            await this.props.fetchUserData(
                localStorage.getItem("userId"),
                localStorage.getItem("token")
            );
            await this.props.fetchPlaylistsData("/", {
                userId: localStorage.getItem("userId"),
            });
        }

        if (!localStorage.getItem("views")) {
            localStorage.setItem(
                "views",
                Number(process.env.REACT_APP_UNAUTH_VIEWS)
            );
        }
    }

    render() {
        const basicRoutes = [
            <Route path="/video" element={<Video />} />,
            <Route path="/" element={<Home />} />,
            <Route path="*" element={<NotFound />} />,
        ];

        const authRoutes = [
            <Route path="/profile" element={<Profile />} />,
            <Route path="/playlist" element={<Playlist />} />,
            <Route path="/logout" element={<Logout />} />,
        ];

        const adminRoutes = [<Route path="/admin" element={<Admin />} />];

        let routes = [...basicRoutes];

        if (this.props.isAuthenticated) routes = [...routes, ...authRoutes];

        if (
            this.props.profileData.type === "Admin" &&
            this.props.isAuthenticated
        )
            routes = [...routes, ...adminRoutes];

        return (
            <div className="App">
                <ErrorBoundary>
                    <Layout>
                        <Routes>{routes}</Routes>
                    </Layout>
                </ErrorBoundary>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
