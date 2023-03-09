import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from '../../axios-settings';

export const videoStreamStart = (videoId) => ({
    type: actionTypes.VIDEO_STREAM_START,
    payload: { videoId: videoId, }
});

export const videoUpload = (videoData, userData) => {
    return dispatch => {
        dispatch({ type: actionTypes.VIDEO_UPLOAD_START });
        return axios
            .post(
                '/video',
                {...videoData},
                { headers: { 
                    'Authorization': userData.token,
                    'Content-Type': 'multipart/form-data'}}
            )
            .then(response => {
                console.log(response.data.video)
                dispatch({
                    type: actionTypes.VIDEO_UPLOAD_SUCCESS,
                    video: response.data.video,
                });
                dispatch(actions.notificationSend(
                    'You have uploaded a new video',
                    'info'));
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.VIDEO_UPLOAD_COMMENT_FAILED,
                    error: error.response.data.message,
                });
            });
    }
};

export const videoFetchInfo = (endpoint, options) => {
    return dispatch => {
        dispatch({ type: actionTypes.VIDEO_FETCH_INFO_START });
        return axios
            .get(
                `/video/${endpoint}`,
                { params: { ...options }}
            )
            .then(response => {
                const infos = new Map();
                response.data.videos.forEach( video => 
                    infos.set(video._id, video)
                );

                dispatch({
                    type: actionTypes.VIDEO_FETCH_INFO_SUCCESS,
                    info: infos,
                })
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.VIDEO_FETCH_INFO_FAILED,
                    error: error.response.data.message,
                });
            });
    }
};

export const videoUploadComment = (payload) => {
    return dispatch => {
        dispatch({ type: actionTypes.VIDEO_UPLOAD_COMMENT_START});
        return axios
            .post(
                '/video/comment',
                { 
                    videoId: payload.videoId,
                    userId: payload.userId,
                    text: payload.text ,
                },
                { headers: { 'Authorization': payload.token, }}
            )
            .then(response => {
                dispatch({
                    type: actionTypes.VIDEO_UPLOAD_COMMENT_SUCCESS,
                    comment: response.data.comment[0],
                });
                dispatch(actions.notificationSend(
                    'You have posted a new comment!',
                    'info'));
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.VIDEO_UPLOAD_COMMENT_FAILED,
                    error: error.response.data.message,
                });
                dispatch(actions.notificationSend(
                    'You can not post a comment because of this problem' + error.response.data.message,
                    'warning'));
            })
    }
};


export const videoFetchComments = (videoId) => {
    return dispatch => {
        dispatch({ type: actionTypes. VIDEO_FETCH_COMMENTS_START })
        return axios
            .get(
                '/video/comment',
                { params: { videoId: videoId }}
            )
            .then(response => {
                dispatch({
                    type: actionTypes.VIDEO_FETCH_COMMENTS_SUCCESS,
                    comments: response.data.comments,
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.VIDEO_FETCH_COMMENTS_FAILED,
                    error: error.response.data.message,
                })
            });
    }
};


export const videoRate = (payload) => {
    return dispatch => {
        dispatch({ type: actionTypes.VIDEO_RATE_START });
        return axios
            .post(
                `/video/${payload.actionType}`,
                { 
                    videoId: payload.videoId,
                    userId: payload.userId
                },
                { headers: { 'Authorization': payload.token, }}
            )
            .then(response => {
                dispatch({
                    type: actionTypes.VIDEO_RATE_SUCCESS,
                    updatedVideo: response.data.video[0]
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.VIDEO_RATE_FAILED,
                    error: error.response.data.message,
                });
                dispatch(actions.notificationSend(
                    'You can not rate a video because of this problem: ' + error.response.data.message,
                    'warning'));
            });
    }
};

export const videoAddView = (payload) => {
    return dispatch => {
        return axios
            .post(
                '/video/view',
                { 
                  videoId: payload.videoId,
                  token: payload.token,
                  trialVideos: payload.trialVideos
                }
            )
            .then(response => { 
                const trialVideos = response.data.trialVideos
                if (!payload.token) {
                  localStorage.setItem('views', Number(trialVideos))
                }

                dispatch({ type: actionTypes.VIDEO_ADD_VIEW_SUCCESS })
            })
            .catch(error => {
                dispatch({ type: actionTypes.VIDEO_ADD_VIEW_FAILED })
                dispatch(actions.notificationSend(error, 'warning'))
            });
    }
};

export const videoEdit = (payload) => {
    return dispatch => {
        return axios
            .put(
                '/video',
                { ...payload },
                { headers: {
                    'Authorization': payload.token,
                    'Content-Type': 'multipart/form-data'  }
                }
            )
            .then(response => {
                dispatch({
                    type: actionTypes.VIDEO_EDIT_SUCCESS,
                    video: response.data.video[0]
                })
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.VIDEO_EDIT_FAILED,
                    error: error.response.data.error,
                })
            });
    };
};

export const videoDelete = (payload) => {
    return dispatch => {
        return axios
            .delete(
                '/video',
                { 
                    params: { videoId: payload.videoId } ,
                    headers: {'Authorization': payload.token}
                }
            )
            .then(response => {
                dispatch({
                    type: actionTypes.VIDEO_DELETE_SUCCESS,
                    id: response.data.videoId,
                })
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: actionTypes.VIDEO_DELETE_FAILED,
                    //error: error.response.data.error,
                })
            });
    };
};
