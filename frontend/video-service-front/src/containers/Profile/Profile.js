import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import UserIcon from '../../assets/images/default-user-icon.svg';
import ProfileTabs from '../../components/Profile/ProfileTabs/ProfileTabs';
import UploadVideoForm from '../Video/UploadVideoForm/UploadVideoForm';
import ProfileVideoCard from '../../components/UI/Card/ProfileVideoCard/ProfileVideoCard';
import ProfilePlaylistCard from '../../components/UI/Card/ProfilePlaylistCard/ProfilePlaylistCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import NotifiactionContainer from '../../components/Notification/NotifiactionContainer';
import NotificationToast from '../../components/Notification/NotificationToast/NotificationToast';

import './Profile.css';
import { mapNotificationToasts, mapVideoInfoToCards,
    mapPlaylistsToCards } from '../../shared/utility';

const mapStateToProps = state => {
    return {
        nickname: state.profile.data.name,
        fetchingData: state.profile.fetchingInfo,
        videosInfo: state.video.videosInfo,
        playlists: state.playlist.playlists,
        videoNotifications: state.video.notifications,
        playlistNotifications: state.playlist.notifications,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchVideosInfo: (endpoint, options) => dispatch(actions.fetchVideoInfo(endpoint, options)),
        fetchPlaylistData: (endpoint, options) => dispatch(actions.playlistFetchData(endpoint, options)),
        videoStreamStart: (videoId) => dispatch(actions.videoStreamStart(videoId)),
        showPlaylistForm: () => dispatch(actions.playlistShowForm()),
        clearNotification: (event, index) => dispatch(actions.videoClearNotification(index)),
        clearNotifications: () => dispatch(actions.videoClearNotifications()),
    };
};

class Profile extends Component {

    state = {
        showUploadVideoFormModal: false,
        activeTab: 'Videos',
    };

    uploadVideoFormToggleHandler = () => {
        this.setState( (prevState)  => {
            return { showUploadVideoFormModal: !prevState.showUploadVideoFormModal };
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

    playlistCardClickHandler = (event, id) => {
        
    }

    notificationToastClickHandler = (event, key) => {
        this.props.clearNotification(key);
    };

    componentDidUpdate() {
        console.log('Profile update');
    }
    
    componentDidMount() {
        console.log('Profile mount');
        this.props.fetchVideosInfo(
            'info',{ userId: localStorage.getItem('userId')});
        this.props.fetchPlaylistData(
            '/', { userId: localStorage.getItem('userId') });
    };

    render(){
        if (this.props.fetchingData){
            return <LoadingSpinner />
        }

        const videoNotifications = this.props.videoNotifications;
        const playlistNotifications = this.props.playlistNotifications;

        let notifications = mapNotificationToasts(
            [...videoNotifications, ...playlistNotifications],
            NotificationToast,
            this.notificationToastClickHandler
        );

        const videos = mapVideoInfoToCards(
            this.props.videosInfo,
            this.profileVideoCardClickHandler,
            ProfileVideoCard,
        );

        const playlists = mapPlaylistsToCards(
            this.props.playlists,
            this.playlistCardClickHandler,
            ProfilePlaylistCard,
        );

        return (
            <Container className="my-2">
                <NotifiactionContainer toasts={notifications}/>
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
                    <UploadVideoForm 
                        show={this.state.showUploadVideoFormModal}
                        hide={this.uploadVideoFormToggleHandler}/>
                    <ProfileTabs 
                        videos={videos}
                        playlists={playlists}
                        uploadVideoCardClicked={this.uploadVideoFormToggleHandler}
                        uploadPlaylistCardClicked={this.props.showPlaylistForm}
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