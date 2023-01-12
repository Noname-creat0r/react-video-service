import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-settings';
import * as actions from '../../store/actions/index';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Column from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';

import UserIcon from '../../assets/images/default-user-icon.svg'; // need to download it from db
import ProfileTabs from '../../components/UI/Profile/ProfileTabs/ProfileTabs';
import UploadVideoForm from '../Video/UploadVideoForm/UploadVideoForm';
import ProfileVideoCard from '../../components/UI/Card/ProfileVideoCard/ProfileVideoCard';

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
        if (eventKey === 'Videos') {

        };

        this.setState( (prevState) => {
            return { activeTab: eventKey };
        });
    };

    profileVideoCardClickHandler = (event) => {
        alert(event.target.key);
    };

    mapVideoInfoToCards = (videoInfo) => {
        if (videoInfo.length > 0)
            return videoInfo.map(video => {
                <ProfileVideoCard
                    key={video._id}
                    title={video.title}
                    clicked={this.profileVideoCardClickHandler}/>
            });
        else 
            return <span>User hasn't uploaded any video yet...</span>;
    };
  

    componentDidMount() {
        this.props.fetchUserData(
            localStorage.getItem('userId'),
            localStorage.getItem('token')
        );

        this.props.fetchUserVideosInfo(
            localStorage.getItem('userId'),
            null
        );
    };

    render(){
        let videos = this.mapVideoInfoToCards(this.props.videosInfo);
        let content = (
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

        if (this.props.fetchingData){
            const spinner = (
                <Container className="my-2">
                    Loading... <Spinner animation='border' size='lg' style={{textAlign: 'center'}}/>
                </Container>);
            content = spinner
            videos = spinner;
        };

        return (
            {...content}
        );
    };
};

const mapStateToProps = state => {
    return {
        nickname: state.profile.data.name,
        fetchingData : state.profile.fetching || state.video.fetchingInfo,
        videosInfo: state.video.videosInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserData: (userId, token) => dispatch(actions.fetchData(userId, token)),
        fetchUserVideosInfo: (userId, videoId) => dispatch(actions.fetchVideoInfo(userId, videoId)),
    };
};

export default connect( mapStateToProps, mapDispatchToProps ) ( Profile );