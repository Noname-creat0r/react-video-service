import * as actionTypes from './actionTypes';

export const videoUploadStart = () => {
    return { type: actionTypes.VIDEO_UPLOAD_START, };
};

export const videoUploadFailed = (error) => {
    return { type: actionTypes.VIDEO_UPLOAD_FAILED, };
};

export const videoUploadSuccess = (video) => {
    return {
        type: actionTypes.VIDEO_UPLOAD_SUCCESS,
        video: video,
    };
};

export const videoFetchInfoStart = () => {
    return { type: actionTypes.VIDEO_FETCH_INFO_START, };
};

export const videoFetchInfoFailed = (error) => {
    return { type: actionTypes.VIDEO_FETCH_INFO_FAILED, };
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
    };
};

export const fetchVideoInfo = (endpoint, options) => {
    return {
        type: actionTypes.VIDEO_FETCH_INFO,
        endpoint: endpoint,
        options: options,
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

export const videoUploadComment = (videoId, userId, token, text) => {
    return {
        type: actionTypes.VIDEO_UPLOAD_COMMENTS,
        videoId: videoId,
        userId: userId,
        token: token,
        text: text, 
    };
};

export const videoUploadCommentFailed = (error) => {
    return { type: actionTypes.VIDEO_UPLOAD_COMMENTS_FAILED, };
};

export const videoUploadCommentSuccess = (comment) => {
    return {
        type: actionTypes.VIDEO_UPLOAD_COMMENTS_SUCCESS,
        comment: comment,
    };
};

export const videoFetchComments = (videoId) => {
    return {
        type: actionTypes.VIDEO_FETCH_COMMENTS,
        videoId: videoId,
    };
};

export const videoFetchCommentsFailed = (error) => {
    return { type: actionTypes.VIDEO_FETCH_COMMENTS_FAILED, };
};

export const videoFetchCommentsSuccess = (comments) => {
    return {
        type: actionTypes.VIDEO_FETCH_COMMENTS_SUCCESS,
        comments: comments,
    };
};

export const videoRate = (videoId, userId, token, actionType) => {
    return {
        type: actionTypes.VIDEO_RATE,
        videoId: videoId,
        userId: userId,
        token: token,
        actionType: actionType
    };
};

export const videoRateStart = () => {
    return { type: actionTypes.VIDEO_RATE_START };
};

export const videoRateSuccess = (updatedVideo) => {
    return {
        type: actionTypes.VIDEO_RATE_SUCCESS,
        updatedVideo: updatedVideo,
    };
};

export const videoRateFailed = (error) => {
    return { type: actionTypes.VIDEO_RATE_FAILED, };
};

export const videoAddView = (videoId) => {
    return {
        type: actionTypes.VIDEO_ADD_VIEW,
        videoId: videoId,
    };
};

export const videoAddViewSuccess = () => {
    return { type: actionTypes.VIDEO_ADD_VIEW_SUCCESS, };
};

export const videoAddViewFailed = () => {
    return { type: actionTypes.VIDEO_ADD_VIEW_FAILED, };
};

export const videoFetchCategoreis = () => {
    return { type: actionTypes.VIDEO_FETCH_CATEGOREIS };
};

export const videoFetchCategoreisSuccess = (categoreis) => {
    return { 
        type: actionTypes.VIDEO_FETCH_CATEGOREIS_SUCCESS,
        categories: categoreis,
    };
};

export const videoFetchCategoreisFailed = () => {
    return { type: actionTypes.VIDEO_FETCH_CATEGOREIS_FAILED};
};

export const videoEdit = () => {
    return {
        type: actionTypes.VIDEO_EDIT
    };
};