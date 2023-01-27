import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    uploading: false,
    streaming: false,
    fetchingInfo: false,
    interupted: false,
    videosInfo: new Map(),
    videoId: null,
    comments: [],
    error: null,
};

const videoUploadStart = (state) => {
    return updateObject(state, {
        uploading: true,
    });
};

const videoUploadFailed = (state, action) => {
    return updateObject(state, {
        uploading: false,
        error: action.error,
    });
};

const videoUploadSuccess = (state) => {
    return updateObject(state, {
        uploading: false,
    });
};

const videoFetchInfoStart = (state) => {
    return updateObject(state, {
        fetchingInfo: true,
    });
};

const videoFetchInfoFailed = (state, action) => {
    return updateObject(state, {
        fetchingInfo: false,
        error: action.error
    });
};

const videoFetchInfoSuccess = (state, action) => {
    return updateObject(state, {
        fetchingInfo: false,
        videosInfo: action.payload.data,
    });
};

const videoStreamStart = (state, action) => {
    return updateObject(state, {
        streaming: true,
        videoId: action.payload.videoId
    });
};

const videoStreamInterupt = (state, action) => {
    return updateObject(state, {
        streaming: true,
        videoId: action.payload.videoId,
    });
};

const videoUploadCommentsFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};

const videoFetchCommentsFailed = (state, action) => {
    return updateObject(state, {
        error: action.error,
    });
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.VIDEO_UPLOAD_START: return videoUploadStart(state);
        case actionTypes.VIDEO_UPLOAD_FAILED: return videoUploadFailed(state, action);
        case actionTypes.VIDEO_UPLOAD_SUCCESS: return videoUploadSuccess(state);
        case actionTypes.VIDEO_FETCH_INFO_START: return videoFetchInfoStart(state);
        case actionTypes.VIDEO_FETCH_INFO_FAILED: return videoFetchInfoFailed(state, action);
        case actionTypes.VIDEO_FETCH_INFO_SUCCESS: return videoFetchInfoSuccess(state, action);
        case actionTypes.VIDEO_STREAM_START: return videoStreamStart(state, action);
        case actionTypes.VIDEO_STREAM_INTERRUPT: return videoStreamInterupt(state, action);
        case actionTypes.VIDEO_UPLOAD_COMMENTS_FAILED: return videoUploadCommentsFailed(state, action);
        case actionTypes.VIDEO_FETCH_COMMENTS_FAILED: return videoFetchCommentsFailed(state, action);
        default: return state;
    }
};

export default reducer;