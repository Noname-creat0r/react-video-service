import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container from 'react-bootstrap/Container';
import VideoPlayer from '../../components/Video/VideoPlayer/VideoPlayer';
import VideoInfo from '../../components/Video/VideoInfo/VideoInfo';
import VideoFooter from '../../components/Video/VideoFooter/VideoFooter';

function mapStateToProps(state) {
    return {
        videoId: state.video.videoId,
        videosInfo: state.video.videosInfo,
    };
}

function mapDispatchToProps(dispatch) {
    return {

    };
}

class Video extends Component {
    // 1. loading case -> spinner

    render() {
        /*const videosInfo = this.props.videosInfo;
        const id = this.props.videoId;*/
        const videoInfo = this.props.videosInfo.get(this.props.videoId);

        return (
            <Container >
                <VideoPlayer 
                    videoId={videoInfo._id}/>
                <VideoInfo 
                    title={videoInfo.title}
                    author={videoInfo.authorName}
                    description={videoInfo.description}
                    likes={videoInfo.likes}
                    dislikes={videoInfo.dislikes}/>
                <VideoFooter />
            </Container>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Video);