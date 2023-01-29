import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions/index';

import Container from 'react-bootstrap/Container';
import VideoPlayer from '../../components/Video/VideoPlayer/VideoPlayer';
import VideoInfo from '../../components/Video/VideoInfo/VideoInfo';
import VideoFooter from '../../components/Video/VideoFooter/VideoFooter';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

function mapStateToProps(state) {
    return {
        videoId: localStorage.getItem('videoId'),
        videosInfo: state.video.videosInfo,
        comments: state.video.comments,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchVideoInfo: (videoId) => dispatch(actions.fetchVideoInfo(
            'info/one', { videoId: videoId }
        )),
        fetchVideoComments: (videoId) => dispatch(actions.videoFetchComments(videoId)),
        uploadVideoComment: (videoId, userId, token, text) => dispatch(actions.videoUploadComment(videoId, userId, token, text)),
        rateVideo: (videoId, userId, token, actionType ) => dispatch(actions.videoRate(videoId, userId, token, actionType)),

    };
}

class Video extends Component {
    // 1. loading case -> spinner
   state = {
        commentary: {
            text: '',
            touched: false,
        },
        rated: false,
   };

    componentDidMount() {
        //console.log('Did mount');
        if (this.props.videosInfo.size === 0) {
            this.props.fetchVideoInfo(localStorage.getItem('videoId'));
            //console.log('loading...');
        }
        this.props.fetchVideoComments(localStorage.getItem('videoId'));
    }

    componentDidUpdate() {
        console.log('Did update: '+ this.props.videosInfo.size);
        //if (this.state.rated){
            //this.props.fetchVideoInfo(localStorage.getItem('videoId'));
          // this.setState({ rated: false });
        //}
    }

    componentWillUnmount() {
        //console.log('Will unmount');
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
        this.props.uploadVideoComment(
            localStorage.getItem('videoId'),
            localStorage.getItem('userId'),
            localStorage.getItem('token'),
            this.state.commentary.text
        );
        this.props.fetchVideoComments(localStorage.getItem('videoId'));
        //console.log(this.state.commentary.text);
        // POST (endpoint, options = { userId, videoId, commentary});
    }

    rateVideoHandler = (action) => {
        this.props.rateVideo(
            localStorage.getItem('videoId'),
            localStorage.getItem('userId'),
            localStorage.getItem('token'),
            action
        );
       // this.setState({ rated: true });
    };

    render() {
        if (this.props.videosInfo.size === 0 ) {
            return <LoadingSpinner />
        }

        else {
            //console.log(this.props.videosInfo);
            const videoInfo = this.props.videosInfo.get(localStorage.getItem('videoId'));
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
                        rateVideoHandler={this.rateVideoHandler}
                        typeCommentHandler={this.typeCommentHandler}
                        postCommentHandler={this.postCommentHandler}/>
                    <VideoFooter />
                </Container>
            );
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Video);