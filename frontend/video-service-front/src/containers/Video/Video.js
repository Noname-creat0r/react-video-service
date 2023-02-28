import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions/index';
import * as modalModes from '../../shared/playlistModalModes';

import Container from 'react-bootstrap/Container';
import VideoPlayer from '../../components/Video/VideoPlayer/VideoPlayer';
import VideoInfo from '../../components/Video/VideoInfo/VideoInfo';
import VideoFooter from '../../components/Video/VideoFooter/VideoFooter';
import VideoPlaylistModal from '../../components/Video/VideoInfo/VideoPlaylistModal/VideoPlaylistModal';
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner';

function mapStateToProps(state) {
    return {
        videoId: localStorage.getItem('videoId'),
        videosInfo: state.video.videosInfo,
        playlists: state.playlist.playlists,
        currentVideoId: state.playlist.currentVideoId,
        comments: state.video.comments,
        isAuthenticated: state.auth.token !== null,
        isPlaylist: state.playlist.playing,
        isFetching: state.video.pendingRequests > 0,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchVideoInfo: (videoId) => dispatch(actions.videoFetchInfo(
            'info/one', { videoId: videoId }
        )),
        fetchVideoComments: (videoId) => dispatch(actions.videoFetchComments(videoId)),
        fetchPlaylistsData: (endpoint, options) => dispatch(actions.playlistFetchData(endpoint, options)),
        uploadVideoComment: (videoId, userId, token, text) => dispatch(actions.videoUploadComment({
            videoId: videoId,
            userId: userId,
            token: token,
            text: text })
        ),
        rateVideo: (videoId, userId, token, actionType ) => dispatch(actions.videoRate({
            videoId: videoId,
            userId: userId,
            token: token,
            actionType: actionType})
        ),
        addView: (videoId) => dispatch(actions.videoAddView(videoId)),
        playlistSetCurrentVideo: (videoId) => dispatch(actions.playlistSetCurrentVideo(videoId)),
        profilePutBookmark: (bookmarkData) => 
            dispatch(actions.profilePutBookmark({
                userId: localStorage.getItem('userId'),
                token: localStorage.getItem('token'),
            }, bookmarkData)),
        notificationSend: (message, variant) => dispatch(actions.notificationSend(message, variant)),
        videoStreamStart: (videoId) => dispatch(actions.videoStreamStart(videoId)),
    };
}

class Video extends Component {
   state = {
        commentary: {
            text: '',
            touched: false,
        },
        playing: true,
        viewed: false,
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
        },
        showCurrentPlaylistModal: false,
   };

    async componentDidMount() {
        //await this.props.fetchVideoInfo(localStorage.getItem('videoId'))
        await this.props.fetchVideoComments(localStorage.getItem('videoId'));
        await this.props.addView(localStorage.getItem('videoId'));
    };

    videoPlaylistSetVideo = async (type) => {
        const playlist = this.props.playlists.get(localStorage.getItem('playlistId'));
        const videos = playlist.videos;
        if (!playlist || !videos ) return;

        const curVidPos = videos.findIndex(video => video._id === this.props.currentVideoId);
        let newCurVidId = null;

        if (type === 'next') {
            const isEnd = curVidPos + 1  === videos.length; 
            isEnd ? 
                this.props.notificationSend('This is the last video', 'warning') :
                newCurVidId = videos[curVidPos + 1]._id;
                console.log('IsEnd: ' + isEnd);
        } else if (type === 'previous') {
            const isStart = curVidPos === 0;
            isStart ? 
                this.props.notificationSend('This is the first video', 'warning') :
                newCurVidId = videos[curVidPos - 1]._id;
                console.log('IsStart: ' + isStart);
        }

        if (newCurVidId){
            await this.props.profilePutBookmark({
                videoId: newCurVidId,
                playlistId: localStorage.getItem('playlistId'),
            });

            this.props.playlistSetCurrentVideo(newCurVidId);
            localStorage.setItem('videoId', newCurVidId);
            //this.props.videoStreamStart(newCurVidId);
        }
    };


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

    videoAddToPlaylistClickHandler = () => {
        this.props.fetchPlaylistsData(
            '/', { userId: localStorage.getItem('userId') })
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

    addViewHandler = () => {
        this.setState({ viewed: true });
        this.props.addView(localStorage.getItem('videoId'));
    }

    playingStateSwitch = () => {
        this.setState( (prevState) => {
            return { playing: !prevState.playing}
        });
    };

    playingStateDisable = () => {
        this.setState({ playing: false});
    };

    showCurrentPlaylistModalToggle = () => {
        this.setState( (prevState) => {
            return { showCurrentPlaylistModal: !prevState.showCurrentPlaylistModal, }
        });
    };

   render() {
        const unauthViews = localStorage.getItem('views');
        if (this.props.videosInfo.size === 0) {
            return <LoadingSpinner />
        }

        if (!this.props.isAuthenticated && unauthViews <= 0){
            return <LoadingSpinner />
            //show auth form
        }

        if (this.props.isFetching)
            return <LoadingSpinner />

        const videoInfo = this.props.videosInfo.get(localStorage.getItem('videoId'));
        return (
            <Container >
                <VideoPlayer 
                    videoId={videoInfo._id}
                    //currentVideoId={this.props.currentVideoId}
                    playing={this.state.playing}
                    viewed={this.state.viewed}
                    addView={this.addViewHandler}
                    playSwitchHandler={this.playingStateSwitch}
                    playDisableHandler={this.playingStateDisable}/>
                <VideoInfo 
                    title={videoInfo.title}
                    views={videoInfo.views}
                    author={videoInfo.authorName}
                    avatarId={videoInfo.authorAvatar}
                    description={videoInfo.description}
                    likes={videoInfo.likes}
                    dislikes={videoInfo.dislikes}
                    interactionItems={this.state.interactionItems}
                    comments={this.props.comments}
                    isPlaylist={this.props.isPlaylist}
                    addToPlaylist={this.videoAddToPlaylistClickHandler}
                    playlistSetVideo={this.videoPlaylistSetVideo}
                    showCurrentPlaylist={this.showCurrentPlaylistModalToggle}
                    rateVideoHandler={this.rateVideoHandler}
                    typeCommentHandler={this.typeCommentHandler}
                    postCommentHandler={this.postCommentHandler}/>
                <VideoFooter />
                <VideoPlaylistModal 
                    show={this.state.showCurrentPlaylistModal}
                    hide={this.showCurrentPlaylistModalToggle}/>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Video);