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
        message: "Uploaded new video successfully!"
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
    let message ;
    switch (error.response.status){
        case 401:
            message = "Sign In to post comments!"
            break; 
        default:
            message = "Can't post this comment.";
    }
    return {
        type: actionTypes.VIDEO_UPLOAD_COMMENTS_FAILED,
        error: message,
    };
};

export const videoUploadCommentSuccess = (comment) => {
    return {
        type: actionTypes.VIDEO_UPLOAD_COMMENTS_SUCCESS,
        comment: comment,
        notification: 'You posted a comment!',
    }
}

export const videoFetchComments = (videoId) => {
    return {
        type: actionTypes.VIDEO_FETCH_COMMENTS,
        videoId: videoId,
    };
};

export const videoFetchCommentsFailed = (error) => {
    return {
        type: actionTypes.VIDEO_FETCH_COMMENTS_FAILED,
        error: "Sorry, can't get the comments for this video :(",
    };
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
    return {
        type: actionTypes.VIDEO_RATE_START
    };
};

export const videoRateSuccess = (updatedVideo) => {
    return {
        type: actionTypes.VIDEO_RATE_SUCCESS,
        updatedVideo: updatedVideo,
    };
};

export const videoRateFailed = (error) => {
    return {
        type: actionTypes.VIDEO_RATE_FAILED,
        error: "Sign In to rate video!",
    };
};

export const videoClearNotification = (index) => {
    return {
        type: actionTypes.VIDEO_CLEAR_NOTIFICATION,
        index: index,
    }
}

export const videoClearNotifications = () => {
    return {
        type: actionTypes.VIDEO_CLEAR_NOTIFICATIONS,
    };
};