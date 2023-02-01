import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import UserIcon from '../../assets/images/default-user-icon.svg';
import ProfileTabs from '../../components/UI/Profile/ProfileTabs/ProfileTabs';
import UploadVideoForm from '../Video/UploadVideoForm/UploadVideoForm';
import ProfileVideoCard from '../../components/UI/Card/ProfileVideoCard/ProfileVideoCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';
import NotifiactionContainer from '../../components/Notification/NotifiactionContainer';
import NotificationToast from '../../components/Notification/NotificationToast/NotificationToast';

import './Profile.css';
import { mapNotificationToasts } from '../../shared/utility';

const mapStateToProps = state => {
    return {
        nickname: state.profile.data.name,
        fetchingData: state.profile.fetchingInfo,
        videosInfo: state.video.videosInfo,
        notifications: state.video.notifications,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchVideosInfo: (endpoint, options) => dispatch(actions.fetchVideoInfo(endpoint, options)),
        videoStreamStart: (videoId) => dispatch(actions.videoStreamStart(videoId)),
        clearNotification: (event, index) => dispatch(actions.videoClearNotification(index)),
        clearNotifications: () => dispatch(actions.videoClearNotifications()),
    };
};

class Profile extends Component {
      /*
        1. Avatar + Username on a random background
        2. Profile tabs (Videos, Playlists, About)
        3. Content of the tabs
        4. footer

        - ProfileTabs component
       */

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

    mapVideoInfoToCards = (videoInfo) => {
        const videoArr = [];
        videoInfo.forEach((video, id) => {
            videoArr.push(
                <ProfileVideoCard
                    key={id}
                    title={video.title}
                    thumbnail={'http://localhost:8080/video/thumbnail?id=' + video.thumbnail}
                    clicked={event => this.profileVideoCardClickHandler(event, id)}
                />);
        });

        return videoArr;
    };

    notificationToastClickHandler = (event, key) => {
        this.props.clearNotification(key);
    };

    componentDidMount() {
        setTimeout( () => 
            this.props.fetchVideosInfo(
                'info',{ userId: localStorage.getItem('userId')}));
    };

    render(){
        if (this.props.fetchingData){
            return <LoadingSpinner />
        }

        let notifications = mapNotificationToasts(
            this.props.notifications,
            NotificationToast,
            this.notificationToastClickHandler);

        const videos = this.mapVideoInfoToCards(this.props.videosInfo);
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
                        uploadVideoCardClicked={this.uploadVideoFormToggleHandler}
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