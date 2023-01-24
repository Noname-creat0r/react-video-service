import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import UserIcon from '../../assets/images/default-user-icon.svg'; // need to download it from db
import ProfileTabs from '../../components/UI/Profile/ProfileTabs/ProfileTabs';
import UploadVideoForm from '../Video/UploadVideoForm/UploadVideoForm';
import ProfileVideoCard from '../../components/UI/Card/ProfileVideoCard/ProfileVideoCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

import './Profile.css';

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

    profileVideoCardClickHandler = (event, key) => {
        this.props.videoStreamStart(key);
    };

    mapVideoInfoToCards = (videoInfo) => {
        const videoArr = [];
        for (const key of Object.keys(videoInfo))
            videoArr.push(videoInfo[key]);

        return videoArr.map(video => 
            <ProfileVideoCard
                key={video._id}
                title={video.title}
                thumbnail={'http://localhost:8080/video/thumbnail?id=' + video.thumbnail}
                clicked={event => this.profileVideoCardClickHandler(event, video._id)}
                />
        );
    };

    componentDidMount() {
        setTimeout( () => this.props.fetchVideosInfo(
            localStorage.getItem('userId'),
            null));
    };

    render(){
        
        if (this.props.fetchingData){
            return (
                <LoadingSpinner />
            );
        }

        else {
            const videos = this.mapVideoInfoToCards(this.props.videosInfo);
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
        }
    };
};

const mapStateToProps = state => {
    return {
        nickname: state.profile.data.name,
        fetchingData: state.profile.fetchingInfo,
        videosInfo: state.video.videosInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchVideosInfo: (userId, token) => dispatch(actions.fetchVideoInfo(userId, token)),
        videoStreamStart: (videoId) => dispatch(actions.videoStreamStart(videoId)),
    };
};

export default connect( mapStateToProps, mapDispatchToProps ) ( Profile );