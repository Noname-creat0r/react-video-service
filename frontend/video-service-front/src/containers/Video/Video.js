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
    }
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
   state = {
        commentary: {
            text: '',
            touched: false,
        },
        playing: true,
        interactionItems: {
            'playlist': {
                clicked: false,
            },
            'like': {
                clicked: false,
            },
            'dislike': {
                clicked: false,
            }
        }
   };

    componentDidMount() {
        if (this.props.videosInfo.size === 0) {
            this.props.fetchVideoInfo(localStorage.getItem('videoId'));
        }
        this.props.fetchVideoComments(localStorage.getItem('videoId'));
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
    }

    interactionItemClickHandler = (itemName) => {
        const isClicked = this.state.interactionItems[itemName].clicked;
        const updatedState = updateObject( this.state.interactionItems, {
            [itemName]: { 
                clicked: !isClicked,
            }
        })
       
        this.setState({interactionItems: updatedState});
    };

    rateVideoHandler = (action) => {
        this.interactionItemClickHandler(action);
        this.props.rateVideo(
            localStorage.getItem('videoId'),
            localStorage.getItem('userId'),
            localStorage.getItem('token'),
            action
        );
    };

    playingStateSwitch = () => {
        this.setState( (prevState) => {
            return { playing: !prevState.playing}
        });
    };

    playingStateDisable = () => {
        this.setState({ playing: false});
    };

    render() {
        if (this.props.videosInfo.size === 0 ) {
            return <LoadingSpinner />
        }

        const videoInfo = this.props.videosInfo.get(localStorage.getItem('videoId'));
        return (
            <Container >
                <VideoPlayer 
                    videoId={videoInfo._id}
                    playing={this.state.playing}
                    playSwitchHandler={this.playingStateSwitch}
                    playDisableHandler={this.playingStateDisable}/>
                <VideoInfo 
                    title={videoInfo.title}
                    author={videoInfo.authorName}
                    description={videoInfo.description}
                    interactionItems={this.state.interactionItems}
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

export default connect(
    mapStateToProps, mapDispatchToProps
)(Video);