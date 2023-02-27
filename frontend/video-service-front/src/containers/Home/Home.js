import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapVideoInfoToCards } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import * as modalModes from '../../shared/playlistModalModes';

import Container from 'react-bootstrap/Container';
import HomeVideoCard from '../../components/UI/Card/HomeVideoCard/HomeVideoCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from '../../components/UI/Modal/Modal';
import Image from 'react-bootstrap/Image';
import AddImage from '../../assets/images/plus-sign.svg';

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
        playlistEdit: (playlistId, actionType, videoId) =>
             dispatch(actions.playlistEdit(
                localStorage.getItem('token'),
                playlistId,
                actionType,
                videoId)
            ),
    };
}

class Home extends Component {
   
    state = {
        showPlaylists: false, 
    }

    showPlaylistsToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showPlaylists: !prevState.showPlaylists };
        });
    }

    homeVideoCardClickHandler = (event, id) => {
        this.props.videoStreamStart(id);
        localStorage.setItem('videoId', id);
    }

    homeAddToPlaylistClickHandler = async (event, id) => {
        if (!localStorage.getItem('userId'))
            this.props.notificationSend(
                'Sign in to manage playlists', 'warning');
        else {
            /*await this.props.fetchPlaylistsData(
                '/', { userId: localStorage.getItem('userId') });*/
            this.setState({ showPlaylists: true });
        }
    }


    async componentDidMount() {
        await this.props.fetchVideosInfo( 'info/home', { });
        if (this.props.isAuthenticated)
            await this.props.fetchPlaylistsData('/', { userId: localStorage.getItem('userId') });
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

        let playlistList = [];
        if (this.state.showPlaylists){
            const items = [];
            this.props.playlists.forEach((playlist) =>
                items.push(
                    <ListGroup.Item 
                        action
                        onClick={() => 
                            this.props.playlistEdit(
                            playlist._id,
                            modalModes.ADDING,
                            localStorage.getItem('videoId'))}>
                        {playlist.title} 
                    </ListGroup.Item>
                )
            );
            items.push(
                <ListGroup.Item 
                    action> 
                    <Image 
                        src={AddImage} 
                        className='mx-1'
                        width='15px'
                        height='15px'/> 
                        <b>Create new </b>
                </ListGroup.Item>
            );
            //console.log(this.props.playlists);
            playlistList = (
                <ListGroup>
                    {items}
                </ListGroup>);
        }

        return (
            <Container className='d-flex flex-wrap my-3'>
                <Modal
                    show={this.state.showPlaylists}
                    hide={this.showPlaylistsToggleHandler}
                    title="Add to playlist" 
                    body={playlistList}
                   />
                {content}
            </Container>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Home);