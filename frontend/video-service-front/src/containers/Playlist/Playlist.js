import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import * as modalModes from '../../shared/playlistModalModes';

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
        fetchPlaylistData: (endpoint, options) => 
            dispatch(actions.playlistFetchData(endpoint, options)),
        playlistOn: () => dispatch(actions.playlistOn()),
        playlistOff: () => dispatch(actions.playlistOff())
    };
}

class Playlist extends Component {
    
    playlistOn = () => {
        this.props.playlistOn();
    };
    
    playlistEdit = () => {
        if (!localStorage.getItem('userId'))
            this.props.notificationSend(
                'Sign in to manage playlists', 'warning');
        else {
            // clear form state values and load there current playlist data shit
        }
        
    }

    componentDidMount() {
        this.props.fetchPlaylistData(
            '/', { userId: localStorage.getItem('userId') });
    };

    render() {
        if (this.props.fetching)
            return <LoadingSpinner />
        //console.log(localStorage.getItem('playlistId'));
        const playlist = this.props.playlists.get(localStorage.getItem('playlistId'));
        console.log(playlist.videos);
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
                    videosInfo={playlist}/>
            </Container>
        )
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Playlist);