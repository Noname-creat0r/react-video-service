import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapVideoInfoToCards } from '../../shared/utility';
import * as actions from '../../store/actions/index';

import Container from 'react-bootstrap/Container';
import HomeVideoCard from '../../components/UI/Card/HomeVideoCard/HomeVideoCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';


import './Home.css';

function mapStateToProps(state) {
    return {
        fetchingData: state.video.fetchingInfo,
        videosInfo: state.video.videosInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchVideosInfo: (endpoint, options) => dispatch(actions.fetchVideoInfo(endpoint, options)),
        videoStreamStart: (videoId) => dispatch(actions.videoStreamStart(videoId)),
    };
}

class Home extends Component {
   
    homeVideoCardClickHandler = (event, id) => {
        this.props.videoStreamStart(id);
    }

    componentDidMount() {
        this.props.fetchVideosInfo(
            'info/home', { });
    }

    render() {
        let content = mapVideoInfoToCards(
            this.props.videosInfo, 
            this.homeVideoCardClickHandler,
            HomeVideoCard
        );

        if (this.props.fetchingData){
            content = <LoadingSpinner />;
        }

        return (
            <Container className='d-flex my-3'>
                {content}
            </Container>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Home);