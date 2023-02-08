import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import PlaylistItems from '../../components/Playlist/PlaylistItems/PlaylistItems';
import PlaylistControls from '../../components/Playlist/PlaylistControls/PlaylistControls';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

function mapStateToProps(state) {
    return {
        playlistId: state.playlist.playlistId,
        playlists: state.playlist.playlists,
        fetching: state.playlist.fetching,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

class Playlist extends Component {

    componentDidMount() {
       // const videoIds = this.props.playlists.get(this.props.playlistId);
        // download playlist + video of the playlist info
    }

    render() {
        if (this.props.fetching)
            return <LoadingSpinner />
        

        return (
            <Container className='my-3 w-50'>
                <Container className='d-flex'>
                    <Image  
                        src={'http://localhost:8080/video/thumbnail?id='}
                        alt='PlaylistThumbnail' />
                    <strong className='PlaylistTitle mx-3'>Title</strong>
                    <em className='PlaylistAuthor'>author</em>
                </Container>

                <PlaylistControls />
                <hr />
                <PlaylistItems/>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(Playlist);