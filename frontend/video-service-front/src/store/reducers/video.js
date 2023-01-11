import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    uploading: false,
    streaming: false,
    fetchingInfo: false,
    videosInfo: {},
    error: null,
    loading: false,
    videoId: null,
    interupted: false,
};

const videoUploadStart = (state, action) => {
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

const videoUploadSuccess = (state, action) => {
    return updateObject(state, {
        uploading: false,
    });
};

const videoFetchInfoStart = (state, action) => {
    return updateObject(state, {
        fetchingInfo: true,
    });
}

const videoFetchInfoFailed = (state, action) => {
    return updateObject(state, {
        fetchingInfo: false,
        error: action.error
    });
}

const videoFetchInfoSuccess = (state, action) => {
    return updateObject(state, {
        fetchingInfo: false,
        videosInfo: action.payload.data,
    });
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.VIDEO_UPLOAD_START: return videoUploadStart(state, action);
        case actionTypes.VIDEO_UPLOAD_FAILED: return videoUploadFailed(state, action);
        case actionTypes.VIDEO_UPLOAD_SUCCESS: return videoUploadSuccess(state, action);
        case actionTypes.VIDEO_FETCH_INFO_START: return videoFetchInfoStart(state, action);
        case actionTypes.VIDEO_FETCH_INFO_FAILED: return videoFetchInfoFailed(state, action);
        case actionTypes.VIDEO_FETCH_INFO_SUCCESS: return videoFetchInfoSuccess(state, action);
        default: return state;
    }
};

export default reducer;