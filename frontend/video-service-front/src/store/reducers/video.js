import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    uploading: false,
    streaming: false,
    fetching: false,
    interupted: false,
    videosInfo: [],
    videoId: null,
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

const videoFetchThumbnailStart = (state) => {
    return updateObject(state, {
        fetchingThumbnail: true,
    });
};

const videoFetchThumbnailFailed = (state, action) => {
    return updateObject(state, {
        fetchingThumbnail: false,
        error: action.error,
        thumbnail: null, 
    });
};

const videoFetchThumbnailSuccess = (state, action) => {
    
    //const id = copyState.videosInfo.findIndex(info => info._id === action.payload.data.videoId);
    const updatedState =  updateObject(state, {
        fetchingThumbnail: false,
        videosInfo: updateObject(state.videosInfo, {
            [action.payload.data.videoInfoId]: updateObject(state.videosInfo[action.payload.data.videoInfoId], {
                loading: false,
                thumbnail: action.payload.data.thumbnail,
            }),
        }),
    });
    return updatedState;
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.VIDEO_UPLOAD_START: return videoUploadStart(state);
        case actionTypes.VIDEO_UPLOAD_FAILED: return videoUploadFailed(state, action);
        case actionTypes.VIDEO_UPLOAD_SUCCESS: return videoUploadSuccess(state);
        case actionTypes.VIDEO_FETCH_INFO_START: return videoFetchInfoStart(state);
        case actionTypes.VIDEO_FETCH_INFO_FAILED: return videoFetchInfoFailed(state, action);
        case actionTypes.VIDEO_FETCH_INFO_SUCCESS: return videoFetchInfoSuccess(state, action);
        case actionTypes.VIDEO_FETCH_THUMBNAIL_START: return videoFetchThumbnailStart(state);
        case actionTypes.VIDEO_FETCH_THUMBNAIL_FAILED: return videoFetchThumbnailFailed(state, action);
        case actionTypes.VIDEO_FETCH_THUMBNAIL_SUCCESS: return videoFetchThumbnailSuccess(state, action);
        default: return state;
    }
};

export default reducer;