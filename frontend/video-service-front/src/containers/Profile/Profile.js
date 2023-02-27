import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import UserIcon from '../../assets/images/default-user-icon.svg';
import ProfileTabs from '../../components/Profile/ProfileTabs/ProfileTabs';
import VideoForm from '../Forms/VideoForm/VideoForm';
import PlaylistForm from '../Forms/PlaylistForm/PlaylistForm';
import ProfileVideoCard from '../../components/UI/Card/ProfileVideoCard/ProfileVideoCard';
import ProfilePlaylistCard from '../../components/UI/Card/ProfilePlaylistCard/ProfilePlaylistCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

import './Profile.css';
import { mapVideoInfoToCards,
    mapPlaylistsToCards } from '../../shared/utility';

const mapStateToProps = state => {
    return {
        nickname: state.profile.data.name,
        fetchingVideoData: state.profile.fetchingInfo,
        fetchingPlaylistData: state.playlist.fetching,
        videosInfo: state.video.videosInfo,
        playlists: state.playlist.playlists,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchVideosInfo: (endpoint, options) => dispatch(actions.videoFetchInfo(endpoint, options)),
        fetchPlaylistData: (endpoint, options) => dispatch(actions.playlistFetchData(endpoint, options)),
        videoStreamStart: (videoId) => dispatch(actions.videoStreamStart(videoId)),
        deletePlaylist: (playlistId) => dispatch(actions.playlistDelete(
            playlistId,
            localStorage.getItem('token'),
            localStorage.getItem('userId') )),
    };
};

class Profile extends Component {

    state = {
        showVideoForm: false,
        showPlaylistForm: false,
        activeTab: 'Videos',
    };

    videoFormToggleHandler = () => {
        this.setState( (prevState)  => {
            return { showVideoForm: !prevState.showVideoForm };
        });
    };

    playlistFormToggleHandler = () => {
        this.setState( (prevState)  => {
            return { showPlaylistForm: !prevState.showPlaylistForm };
        });
    };

    tabSelectHandler = (eventKey) => {
        this.setState( (prevState) => {
            return { activeTab: eventKey };
        });
    };

    profileVideoCardClickHandler = (event, id) => {
        this.props.videoStreamStart(id);
        localStorage.setItem('videoId', id);
    };

    profileAddToPlaylistClickHandler = (event, id) => {

    };

    profileDeletePlaylistClickHandler = (event, id) => {
        this.props.deletePlaylist(id);
    };

    playlistCardClickHandler = (event, id) => {
        localStorage.setItem('playlistId', id);
    }

    componentDidMount() {
        /*this.props.fetchVideosInfo(
            'info',{ userId: localStorage.getItem('userId')});
        this.props.fetchPlaylistData(
            '/', { userId: localStorage.getItem('userId') });*/
    };

    render(){
        if (this.props.fetchingVideoData ||
            this.props.fetchingPlaylistData){
            return <LoadingSpinner />
        }   

        const videoData = new Map();
        this.props.videosInfo.forEach(video => {
            if (video.author === localStorage.getItem('userId')) 
                videoData.set(video._id, video);
        });
        
        const videos = mapVideoInfoToCards(
            { 
                videos: videoData,
                playlists: this.props.playlists,
            },
            {
                click: this.profileVideoCardClickHandler,
                playlist: this.profileAddToPlaylistClickHandler,
            },
            ProfileVideoCard,
        );

        const playlists = mapPlaylistsToCards(
            this.props.playlists,
            {
                click: this.playlistCardClickHandler,
                delete: this.profileDeletePlaylistClickHandler,
            },
            ProfilePlaylistCard,
        );

        return (
            <Container className="my-2">
                <Row> 
                    <Column className="col-3">
                        <Image 
                            src={UserIcon}
                            width={128}
                            height={128}
                            alt="UserIcon"
                            rounded/>
                    </Column>
                    <Column className="">
                        <span className="ProfileName">{ this.props.nickname }</span>
                    </Column>
                </Row>
                <Row>
                    <VideoForm 
                        show={this.state.showVideoForm}
                        hide={this.videoFormToggleHandler}/>
                    <PlaylistForm 
                        show={this.state.showPlaylistForm}
                        hide={this.playlistFormToggleHandler}/>

                    <ProfileTabs 
                        videos={videos}
                        playlists={playlists}
                        uploadVideoCardClicked={this.videoFormToggleHandler}
                        uploadPlaylistCardClicked={this.playlistFormToggleHandler}
                        tabSelectHandler={this.tabSelectHandler}
                        tabActiveKey={this.state.activeTab}/>
                </Row>
                <Row>
                    
                </Row>
            </Container>
        );
    };
};

export default connect( mapStateToProps, mapDispatchToProps ) ( Profile );