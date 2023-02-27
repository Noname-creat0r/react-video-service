import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import * as modalModes from '../../shared/playlistModalModes';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import PlaylistItems from '../../components/Playlist/PlaylistItems/PlaylistItems';
import PlaylistControls from '../../components/Playlist/PlaylistControls/PlaylistControls';
import PlaylistForm from '../Forms/PlaylistForm/PlaylistForm';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

import './Playlist.css';

function mapStateToProps(state) {
    return {
        userData: state.profile.data,
        playlists: state.playlist.playlists,
        pendingRequests: state.playlist.pendingRequests,
        currentVideoId: state.playlist.currentVideoId,
        fetchingProfile: state.profile.fetching
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPlaylistData: (endpoint, options) => 
            dispatch(actions.playlistFetchData(endpoint, options)),
        playlistOn: () => dispatch(actions.playlistOn()),
        playlistOff: () => dispatch(actions.playlistOff()),
        playlistSetCurrentVideo: (videoId) => dispatch(actions.playlistSetCurrentVideo(videoId)),
        playlistEdit: (playlistId, actionType, videoId) =>
             dispatch(actions.playlistEdit(
                localStorage.getItem('token'),
                playlistId,
                actionType,
                videoId)
            ),
        profilePutBookmark: (bookmarkData) => 
            dispatch(actions.profilePutBookmark({
                userId: localStorage.getItem('userId'),
                token: localStorage.getItem('token'),
            }, bookmarkData)),
        profileFetchData: (userId, token) => dispatch(actions.profileFetchData(userId, token)),
    };
}

class Playlist extends Component {
    
    state = {
        showEditPlaylistForm: false,
    }

    async componentDidMount() {
        await this.props.fetchPlaylistData(
            '/', { userId: localStorage.getItem('userId') });
        await this.props.profileFetchData(
            localStorage.getItem('userId'),
            localStorage.getItem('token')
        );
        const bookmark = this.props.userData.playlistBookmarks
            .find(bookmark => bookmark.playlist === localStorage.getItem('playlistId'))
        if (bookmark) this.props.playlistSetCurrentVideo(bookmark.video);
    };

    showEditPlaylistToggleHandler = () => {
        this.setState( (prevState)  => {
            return { showEditPlaylistForm: !prevState.showEditPlaylistForm };
        });
    }

    playlistOn = () => {
        this.props.playlistOn();
    };
    
    playlistSetCurrentVideo = async (videoId, playlistId) => {
        await this.props.profilePutBookmark({
            videoId: videoId,
            playlistId: playlistId,
        });
        this.props.playlistSetCurrentVideo(videoId)
        // set curplaylistvideoid
    }

    playlistEdit = () => {
        if (!localStorage.getItem('userId'))
            this.props.notificationSend(
                'Sign in to manage playlists', 'warning');
        else {
            this.setState({ showEditPlaylistForm: true });
        }
    }

    playlistRemoveVideo = (id) => {
        this.props.playlistEdit(
            localStorage.getItem('playlistId'),
            modalModes.ADDING,
            id
        )
    }

    render() {
        if (this.props.pendingRequests > 0)
            return <LoadingSpinner />
        //console.log(localStorage.getItem('playlistId'));
        const playlist = this.props.playlists.get(localStorage.getItem('playlistId'));
        //console.log(playlist.videos);
        return (
            <Container className='my-3 w-50'>
                <Container className='d-flex flex-direction-column'>
                    <Image
                        className='PlaylistThumbnail'  
                        width={'200px'}
                        height={'150px'}
                        src={'http://localhost:8080/video/thumbnail?id=' + playlist.thumbnail}
                        alt='PlaylistThumbnail' />
                    <strong className='PlaylistTitle mx-3'>{playlist.title}</strong>
                </Container>
                <PlaylistControls
                    playlistOn={this.playlistOn}
                    playlistEdit={this.playlistEdit} />
                <hr />
                <PlaylistItems 
                    videosInfo={playlist}
                    currentVideoId={this.props.currentVideoId}
                    setCurrent={this.playlistSetCurrentVideo}
                    removeItem={this.playlistRemoveVideo}/>
                <PlaylistForm 
                    show={this.state.showEditPlaylistForm}
                    hide={this.showEditPlaylistToggleHandler}
                    playlist={playlist}/>
            </Container>
        )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Playlist);