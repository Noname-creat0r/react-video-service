import axios from '../../axios-settings';
import { Buffer } from 'buffer';

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
            data: data
        },
    };
};


export const videoFetchThumbnailStart = () => {
    return {
        type: actionTypes.VIDEO_FETCH_THUMBNAIL_START,
    };
};

export const videoFetchThumbnailFailed = (error) => {
    return {
        type: actionTypes.VIDEO_FETCH_THUMBNAIL_FAILED,
        error: error.data
    };
};

export const videoFetchThumbnailSuccess = (imageUrl) => {
    return {
        type: actionTypes.VIDEO_FETCH_THUMBNAIL_SUCCESS,
        payload: {
            data: imageUrl
        }
    };
};

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

export const fetchVideoThumbnails = (videoInfoArr) => {
    return async dispatch => {
        for (const videoInfo of videoInfoArr){
            dispatch(videoFetchThumbnailStart());
            axios.get('/video/thumbnail', {
                responseType: 'blob',
                params: {
                    videoId: videoInfo.thumbnail,
                }
            })
            .then(response => {
                
                const reader = new FileReader();
                reader.readAsDataURL(response.data);
                reader.onload = event => {
                    dispatch(videoFetchThumbnailSuccess(event.target.result));
                    console.log(event.target.result);
                };
                //console.log(response.data);
                // push img buffer to the img state action (with promise maybe)
                // if state.img ? then convert to base64 image source
                // return promise resolve and repeat
                /*const base64 = String.fromCharCode(...Buffer.from(response.data));
                console.log(base64);
                const data = 'data:'+ response.headers.get('content-type') +';base64,'+ base64;*/
                //const buffer = Buffer.from(response.data, 'binary');
                //const imageUrl = buffer.toString('base64');
            })
            .catch(err => {
                console.log(err);
                dispatch(videoFetchThumbnailFailed(err));
            })
       }
    }
   
};

export const fetchVideoInfos = (userId, videoId) => {
    return async dispatch => {
        dispatch(videoFetchInfoStart());
        axios.get('/video/info', {
            params: {
                userId: userId
            },
        })
        .then(response => {
            const info = response.data.videos;
            dispatch(videoFetchInfoSuccess(info));
            fetchVideoThumbnails(info);
        })
        .catch(error => {
            dispatch(videoFetchInfoFailed(error));
        });
    };
};

