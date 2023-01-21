import axios from '../../axios-settings';

import * as actionTypes from './actionTypes';
import { updateObject } from '../../shared/utility';

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

export const fetchVideosData = (userId, videoId) => {
    return async dispatch => {
        try {
            dispatch(videoFetchInfoStart());
            const response = await axios.get('/video/info', {
                params: { userId: userId },
            });
            const infos = response.data.videos.map(video => 
                updateObject(video, { key: video._id, loading: true })
            );

            const reader = new FileReader();
            let i = -1;

            for (const videoInfo of infos){
                //  console.log(videoInfo);

                axios.get('/video/thumbnail', {
                    params: { videoId: videoInfo._id ,}, responseType: 'blob'
                }).then( res => {
                    reader.onload = event => {
                        dispatch(videoFetchThumbnailSuccess({
                            thumbnail: event.target.result,
                            videoId: videoInfo._id,
                            videoInfoId: ++i })) 
                    };
                    reader.readAsDataURL(res.data);
                })
                .catch(err  => console.log(err.config));
                //reader.readAsDataURL(thumbnailData.data);
            }
            dispatch(videoFetchInfoSuccess(infos));
        } catch (err) {
            throw new Error(err);
        }
    };
};
