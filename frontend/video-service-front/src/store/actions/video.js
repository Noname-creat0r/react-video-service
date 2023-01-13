import axios from '../../axios-settings';

import * as actionTypes from './actionTypes';

export const videoUploadStart = () => {
    return {
        type: actionTypes.VIDEO_UPLOAD_START
    };
};

export const videoUploadFailed = (error) => {
    return {
        type: actionTypes.VIDEO_UPLOAD_FAILED,
        error: error
    };
};

export const videoUploadSuccess = () => {
    return {
        type: actionTypes.VIDEO_UPLOAD_SUCCESS,
    };
};

export const videoFetchInfoStart = () => {
    return {
        type: actionTypes.VIDEO_FETCH_INFO_START,
    };
};

export const videoFetchInfoFailed = (error) => {
    return {
        type: actionTypes.VIDEO_FETCH_INFO_FAILED,
        error: error.data,
    };
};

export const videoFetchInfoSuccess = (data) => {
    return {
        type: actionTypes.VIDEO_FETCH_INFO_SUCCESS,
        payload: {
            data: {...data}
        },
    };
}

export const uploadVideo = (videoData, userData) => {
    return dispatch => {
        dispatch(videoUploadStart());
        axios
            .post('/video', 
            {   ...videoData,
                userId: userData.userId },  
            { headers: { 
                'Authorization':  userData.token,
                'Content-Type': 'multipart/form-data',
            }})
            .then(response => {
                if (response.data)
                    dispatch(videoUploadSuccess());
            })
            .catch(error => {
                dispatch(videoUploadFailed(error.data));
            })
    };
};

export const fetchVideoInfo = (userId, videoId) => {
    return dispatch => {
        dispatch(videoFetchInfoStart());
        axios
            .get('/video/info', 
            {
                params: {
                    userId: userId
                },
            })
            .then(response => {
                const data = response.data;
                dispatch(videoFetchInfoSuccess(data));
            })
            .catch(error => {
                dispatch(videoFetchInfoFailed(error));
            });
    };
};