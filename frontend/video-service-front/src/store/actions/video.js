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

export const uploadVideo = (videoData, userData) => {
    return {
        type: actionTypes.VIDEO_UPLOAD,
        videoData: videoData,
        userData: userData,
    }
};

export const fetchVideoInfo = (userId, videoId) => {
    return {
        type: actionTypes.VIDEO_FETCH_INFO,
        userId: userId,
        videoId: videoId,
    }
};

export const videoStreamStart = (videoId) => {
    return {
        type: actionTypes.VIDEO_STREAM_START,
        payload: {
            videoId: videoId,
        }
    };
};

export const videoStreamInterupt = (videoId) => {
    return {
        type: actionTypes.VIDEO_STREAM_INTERRUPT,
        payload: {
            videoId: videoId,
        }
    };
};