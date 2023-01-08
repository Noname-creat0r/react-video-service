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

export const uploadVideo = (videoData, token,) => {
    return dispatch => {
        dispatch(videoUploadStart());
        axios
            .post('/video', 
            { ...videoData },  
            { headers: { 
                'Authorization':  token,
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