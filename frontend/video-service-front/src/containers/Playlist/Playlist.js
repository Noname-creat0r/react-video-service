import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import PlaylistItems from '../../components/Playlist/PlaylistItems/PlaylistItems';
import PlaylistControls from '../../components/Playlist/PlaylistControls/PlaylistControls';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

import './Playlist.css';

function mapStateToProps(state) {
    return {
        playlists: state.playlist.playlists,
        fetching: state.playlist.fetching,
        fetchingProfile: state.profile.fetching
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPlaylistVideoInfo: (playlistId) => 
            dispatch(actions.playlistFetchVideoInfo(playlistId)),
    };
}

class Playlist extends Component {

    componentDidMount() {
         this.props.fetchPlaylistVideoInfo(localStorage.getItem('playlistId'));
    }

    videoAddToPlaylistHandler = () => {

    }

    render() {
        if (this.props.fetching)
            return <LoadingSpinner />
        else {
            console.log(this.props.fetching);
            const playlist = this.props.playlists.get(localStorage.getItem('playlistId'));
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
                <PlaylistControls />
                <PlaylistItems 
                    videosInfo={playlist.videos}/>
                <hr />
            </Container>
        );}
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Playlist);