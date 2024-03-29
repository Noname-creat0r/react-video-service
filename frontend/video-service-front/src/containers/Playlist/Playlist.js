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
        isFetching: state.playlist.pendingRequests > 0 || state.profile.fetching,
        currentVideoId: state.playlist.currentVideoId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPlaylistData: (endpoint, options) => 
            dispatch(actions.playlistFetchData(endpoint, options)),
        playlistOn: () => dispatch(actions.playlistOn()),
        playlistOff: () => dispatch(actions.playlistOff()),
        playlistSetCurrentVideo: (videoId) => dispatch(actions.playlistSetCurrentVideo(videoId)),
        playlistEdit: (actionType, playlistInfo) => dispatch(actions.playlistEdit(
            localStorage.getItem('token'),
            actionType,
            playlistInfo)
        ),
        profilePutBookmark: (bookmarkData) => dispatch(actions.profilePutBookmark({
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
        }, bookmarkData)),
        profileFetchData: (userId, token) => dispatch(actions.profileFetchData(userId, token)),
        videoStreamStart: (videoId) => dispatch(actions.videoStreamStart(videoId)),
        notificationSend: (message, variant) => dispatch(actions.notificationSend(message, variant)),
    };
}

class Playlist extends Component {
    
    state = {
        showEditPlaylistForm: false,
    };

    showEditPlaylistToggleHandler = () => {
        this.setState( (prevState)  => {
            return { showEditPlaylistForm: !prevState.showEditPlaylistForm };
        });
    };

    playlistOn = () => {
        if (this.props.playlists.size > 0){
            const playlist = this.props.playlists
                .get(localStorage.getItem('playlistId'));
            const currentVideo = playlist['videos']
                .find( playlist => playlist._id === this.props.currentVideoId);
            const videoId = !currentVideo ? playlist.videos[0]._id : currentVideo._id;
            localStorage.setItem('videoId', videoId);
            this.props.playlistOn();
            this.props.videoStreamStart( videoId );
            this.playlistSetCurrentVideo(videoId, playlist._id);
        }
    };
    
    playlistOff = () => {
        this.props.playlistOff();
        this.props.notificationSend(
            'Playlist mode is off',
            'warning'
        );
    };

    playlistSetCurrentVideo = async (videoId, playlistId) => {
        await this.props.profilePutBookmark({
            videoId: videoId,
            playlistId: playlistId,
        });
        this.props.playlistSetCurrentVideo(videoId);
    };

    playlistEdit = () => {
        if (!localStorage.getItem('userId'))
            this.props.notificationSend(
                'Sign in to manage playlists', 'warning');
        else {
            this.setState({ showEditPlaylistForm: true });
        }
    };

    playlistRemoveVideo = (id) => {
        this.props.playlistEdit(
            modalModes.ADDING,
            {
                playlistId: localStorage.getItem('playlistId'),
                videoId: id,
            }
        )
    };

    render() {
        if (this.props.isFetching || !this.props.playlists || this.props.playlists.size === 0 )
            return <LoadingSpinner />;

        const playlist = this.props.playlists.get(localStorage.getItem('playlistId'));
        const bookmark = this.props.userData.playlistBookmarks
            .find(bookmark => bookmark.playlist === localStorage.getItem('playlistId'));

        return (
            <Container className='my-3 w-50'>
                <Container className='d-flex flex-direction-column'>
                    <Image
                        className='PlaylistThumbnail'  
                        width={'200px'}
                        height={'150px'}
                        src={process.env.REACT_APP_BASE_SERVER_URL + '/image/thumbnail?id=' + playlist.thumbnail}
                        alt='PlaylistThumbnail' />
                    <strong className='PlaylistTitle mx-3'>{playlist.title}</strong>
                </Container>
                <PlaylistControls
                    videosLength={playlist.videos.length}
                    playlistOn={this.playlistOn}
                    playlistOff={this.playlistOff}
                    playlistEdit={this.playlistEdit} />
                <hr />
                <PlaylistItems 
                    videosInfo={playlist}
                    bookmarkVideo={bookmark ? bookmark.video : ''}
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