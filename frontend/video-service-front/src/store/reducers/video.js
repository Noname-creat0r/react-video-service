import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    uploading: false,
    streaming: false,
    fetchingInfo: false,
    interupted: false,
    //watchedVideos: 2,
    videosInfo: new Map(),
    videoId: null,
    comments: [],
};

const videoUploadStart = (state) => {
    return updateObject(state, { uploading: true, });
};

const videoUploadFailed = (state, action) => {
    return updateObject(state, { uploading: false, });
};

const videoUploadSuccess = (state, action) => {
    return updateObject(state, {
        uploading: false,
        videosInfo: new Map([...state.videosInfo, [action.video._id, action.video]]),
    });
};

const videoFetchInfoStart = (state) => {
    return updateObject(state, { fetchingInfo: true, });
};

const videoFetchInfoFailed = (state, action) => {
    return updateObject(state, { fetchingInfo: false, });
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
    });
};

const videoUploadCommentsSuccess = (state, action) => {
    return updateObject(state, { comments:  [action.comment, ...state.comments],})
};

const videoFetchCommentsFailed = (state, action) => {
    return updateObject(state, {});
};

const videoFetchCommentsSuccess = (state, action) => {
    return updateObject(state, { comments: action.comments, });
};

const videoRateStart = (state) => {
    return updateObject(state, { });
};


const videoRateFailed = (state, action) => {
    return updateObject(state, { });
}

const videoRateSuccess = (state, action) => {
    return updateObject(state, {
        videosInfo: new Map([[action.updatedVideo._id, action.updatedVideo]]),
    });
};

const videoAddViewSuccess = (state, action) => {
    return updateObject(state, {
        //watchedVideos: number - number === 0 ? 0 : 1,
    });
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.VIDEO_UPLOAD_START: return videoUploadStart(state);
        case actionTypes.VIDEO_UPLOAD_FAILED: return videoUploadFailed(state, action);
        case actionTypes.VIDEO_UPLOAD_SUCCESS: return videoUploadSuccess(state, action);
        case actionTypes.VIDEO_FETCH_INFO_START: return videoFetchInfoStart(state);
        case actionTypes.VIDEO_FETCH_INFO_FAILED: return videoFetchInfoFailed(state, action);
        case actionTypes.VIDEO_FETCH_INFO_SUCCESS: return videoFetchInfoSuccess(state, action);
        case actionTypes.VIDEO_STREAM_START: return videoStreamStart(state, action);
        case actionTypes.VIDEO_STREAM_INTERRUPT: return videoStreamInterupt(state, action);
        case actionTypes.VIDEO_UPLOAD_COMMENTS_FAILED: return videoUploadCommentsFailed(state, action);
        case actionTypes.VIDEO_UPLOAD_COMMENTS_SUCCESS: return videoUploadCommentsSuccess(state, action);
        case actionTypes.VIDEO_FETCH_COMMENTS_FAILED: return videoFetchCommentsFailed(state, action);
        case actionTypes.VIDEO_FETCH_COMMENTS_SUCCESS: return videoFetchCommentsSuccess(state, action);
        case actionTypes.VIDEO_RATE_START: return videoRateStart(state);
        case actionTypes.VIDEO_RATE_SUCCESS: return videoRateSuccess(state, action);
        case actionTypes.VIDEO_RATE_FAILED: return videoRateFailed(state, action);
        case actionTypes.VIDEO_ADD_VIEW_SUCCESS: return videoAddViewSuccess(state, action);
        default: return state;
    }
};

export default reducer;