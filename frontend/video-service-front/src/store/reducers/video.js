import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    uploading: false,
    streaming: false,
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

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.VIDEO_UPLOAD_START: return videoUploadStart(state, action);
        case actionTypes.VIDEO_UPLOAD_FAILED: return videoUploadFailed(state, action);
        case actionTypes.VIDEO_UPLOAD_SUCCESS: return videoUploadSuccess(state, action);
        default: return state;
    }
};

export default reducer;