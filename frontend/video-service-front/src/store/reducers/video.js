import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { updateState } from './helpers/update';

const initialState = {
    uploading: false,
    streaming: false,
    fetching: false,
    pendingRequests: 0,
    videosInfo: new Map(),
    videoId: null,
    comments: [],
    categories: [],
};

const videoUploadStart = (state) => {
    return updateObject(state, { uploading: true, });
};

const videoUploadSuccess = (state, action) => {
    return updateObject(state, {
        uploading: false,
        //pendingRequests: state.pendingRequests - 1,
        videosInfo: new Map([...state.videosInfo, [action.video._id, action.video]]),
    });
};

const videoUploadFailed = (state, action) => {
    return updateObject(state, {
        pendingRequests: state.pendingRequests - 1,
    });
};

const videoFetchInfoStart = (state) => {
    return updateObject(state, { 
        fetching: true,
        pendingRequests: state.pendingRequests + 1
    });
};

const videoFetchInfoSuccess = (state, action) => {
    return updateObject(state, {
        fetching: false,
        pendingRequests: state.pendingRequests - 1,
        videosInfo: action.info,
    });
};

const videoFetchInfoFailed = (state, action) => {
    return updateObject(state, {
        fetching: false,
        pendingRequests: state.pendingRequests - 1
    });
}

const videoStreamStart = (state, action) => {
    return updateObject(state, {
        streaming: true,
        videoId: action.payload.videoId
    });
};

const videoUploadCommentSuccess = (state, action) => {
    return updateObject(state, { comments:  [action.comment, ...state.comments],})
};

const videoUploadCommentFailed = (state ) => {
    return updateObject(state, {
    });
}

const videoFetchCommentsStart = (state, action) => {
    return updateObject(state, {
        fetching: true,
        pendingRequests: state.pendingRequests + 1,
    })
}

const videoFetchCommentsSuccess = (state, action) => {
    return updateObject(state, { 
        pendingRequests: state.pendingRequests - 1,
        comments: action.comments,
    });
};

const videoFetchCommentsFailed = (state, action) => {
    return updateObject(state, {
        pendingRequests: state.pendingRequests - 1,
    });
}

const videoRateStart = (state) => {
    return updateObject(state, { });
};

const videoRateFailed = (state) => {
    return updateObject(state, {});
} 

const videoRateSuccess = (state, action) => {
    const updatedInfo = new Map([...state.videosInfo]);
    updatedInfo.set(action.updatedVideo._id, action.updatedVideo);
    return updateObject(state, {
        videosInfo: updatedInfo,
    });
};

const videoAddViewSuccess = (state, action) => {
    return updateObject(state, {});
};

const videoEditSuccess = (state, action) => {
    const updVideos = new Map([...state.videosInfo]);
    updVideos.set(action.video._id, action.video);
    return updateObject(state, { videosInfo: updVideos });
};

const videoDeleteSuccess = (state, action) => {
    const updVideos = new Map([...state.videosInfo]);
    updVideos.delete(action.id);
    return updateObject(state, { videosInfo: updVideos });
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.VIDEO_FETCH_INFO_START: return videoFetchInfoStart(state);
        case actionTypes.VIDEO_FETCH_INFO_FAILED: return videoFetchInfoFailed(state, action);
        case actionTypes.VIDEO_FETCH_INFO_SUCCESS: return videoFetchInfoSuccess(state, action);
        case actionTypes.VIDEO_FETCH_COMMENTS_START: return videoFetchCommentsStart(state, action);
        case actionTypes.VIDEO_FETCH_COMMENTS_FAILED: return videoFetchCommentsFailed(state, action);
        case actionTypes.VIDEO_FETCH_COMMENTS_SUCCESS: return videoFetchCommentsSuccess(state, action);
        case actionTypes.VIDEO_STREAM_START: return videoStreamStart(state, action);
        case actionTypes.VIDEO_UPLOAD_START: return videoUploadStart(state);
        case actionTypes.VIDEO_UPLOAD_FAILED: return videoUploadFailed(state, action);
        case actionTypes.VIDEO_UPLOAD_SUCCESS: return videoUploadSuccess(state, action);
        //case actionTypes.VIDEO_UPLOAD_COMMENT_START: return videoUploadCommentStart(state, action);
        case actionTypes.VIDEO_UPLOAD_COMMENT_FAILED: return videoUploadCommentFailed(state, action);
        case actionTypes.VIDEO_UPLOAD_COMMENT_SUCCESS: return videoUploadCommentSuccess(state, action);
        case actionTypes.VIDEO_RATE_START: return videoRateStart(state);
        case actionTypes.VIDEO_RATE_SUCCESS: return videoRateSuccess(state, action);
        case actionTypes.VIDEO_RATE_FAILED: return videoRateFailed(state, action);
        case actionTypes.VIDEO_ADD_VIEW_SUCCESS: return videoAddViewSuccess(state, action);
        case actionTypes.VIDEO_EDIT_SUCCESS: return videoEditSuccess(state, action);
        case actionTypes.VIDEO_EDIT_FAILED: return state;
        case actionTypes.VIDEO_DELETE_SUCCESS: return videoDeleteSuccess(state, action);
        case actionTypes.VIDEO_DELETE_FAILED: return state;
        default: return state;
    }
};

export default reducer;