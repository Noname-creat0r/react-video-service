import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Container from 'react-bootstrap/Container';
import VideoPlayer from '../../components/Video/VideoPlayer/VideoPlayer';
import VideoInfo from '../../components/Video/VideoInfo/VideoInfo';
import VideoFooter from '../../components/Video/VideoFooter/VideoFooter';
import { updateObject } from '../../shared/utility';

function mapStateToProps(state) {
    return {
        videoId: state.video.videoId,
        videosInfo: state.video.videosInfo,
        comments: state.video.comments,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchVideoComments: (videoId) => dispatch(actions.videoFetchComments(videoId)),
        uploadVideoComment: (videoId, userId, token, text) => dispatch(actions.videoUploadComment(videoId, userId, token, text)),
    };
}

class Video extends Component {
    // 1. loading case -> spinner
   state = {
        commentary: {
            text: '',
            touched: false,
        },
   };

    componentDidMount() {
        this.props.fetchVideoComments(this.props.videoId);
    }

   typeCommentHandler = (event) => {
        const updatedComment = updateObject(this.state.commentary, {
            text: event.target.value,
            touched: true,
        });

        this.setState({ commentary: updatedComment });
   };
   
    postCommentHandler = (event) => {
        event.preventDefault();
        console.log(this.state.commentary.text);
        // POST (endpoint, options = { userId, videoId, commentary});
    }

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
                    dislikes={videoInfo.dislikes}
                    comments={this.props.comments}
                    typeCommentHandler={this.typeCommentHandler}
                    postCommentHandler={this.postCommentHandler}/>
                <VideoFooter />
            </Container>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Video);