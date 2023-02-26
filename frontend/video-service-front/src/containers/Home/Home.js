import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapVideoInfoToCards } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import * as modalModes from '../../shared/playlistModalModes';

import Container from 'react-bootstrap/Container';
import HomeVideoCard from '../../components/UI/Card/HomeVideoCard/HomeVideoCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

import './Home.css';

function mapStateToProps(state) {
    return {
        fetchingVideoData: state.video.pendingRequests > 0,
        fetchingPlaylistData: state.playlist.pendingRequests > 0,
        videosInfo: state.video.videosInfo,
        playlists: state.playlist.playlists,
        isAuthenticated: state.auth.token !== null
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchVideosInfo: (endpoint, options) => dispatch(actions.videoFetchInfo(endpoint, options)),
        fetchPlaylistsData: (endpoint, options) => dispatch(actions.playlistFetchData(endpoint, options)),
        videoStreamStart: (videoId) => dispatch(actions.videoStreamStart(videoId)),
        notificationSend: (message, type) => dispatch(actions.notificationSend(message, type)),
    };
}

class Home extends Component {
   
    homeVideoCardClickHandler = (event, id) => {
        this.props.videoStreamStart(id);
        localStorage.setItem('videoId', id);
    }

    homeAddToPlaylistClickHandler = (event, id) => {
        if (!localStorage.getItem('userId'))
            this.props.notificationSend(
                'Sign in to manage playlists', 'warning');
        else {
            this.props.fetchPlaylistsData(
                '/', { userId: localStorage.getItem('userId') })
        }
    }

    componentDidMount() {
        this.props.fetchVideosInfo( 'info/home', { });
    }

    render() {
       
        if (this.props.fetchingVideoData ||
            this.props.fetchingPlaylistData){
            return <LoadingSpinner />;
        }

        let content = mapVideoInfoToCards(
            { 
                videos: this.props.videosInfo,
                playlists: this.props.playlists,
            }, 
            {
                click: this.homeVideoCardClickHandler,
                playlist:  this.homeAddToPlaylistClickHandler,
            },
            HomeVideoCard
        );

        return (
            <Container className='d-flex flex-wrap my-3'>
                {content}
            </Container>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Home);