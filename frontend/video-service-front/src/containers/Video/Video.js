import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import VideoPlayer from '../../components/Video/VideoPlayer/VideoPlayer';
import VideoInfo from '../../components/Video/VideoInfo/VideoInfo';
import VideoFooter from '../../components/Video/VideoFooter/VideoFooter';

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

class Video extends Component {
    // 1. loading case -> spinner
    
    render() {
        return (
            <Container >
                <VideoPlayer />
                <VideoInfo />
                <VideoFooter />
            </Container>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Video);