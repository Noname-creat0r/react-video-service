import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    unsignedUpVideos: 10,
    settings: {},
    data: {},
    fetching: false,
    error: null,
}

const profileEditStart = (state, action) => {
    return updateObject(state, {});
}

const profileEditSuccess = (state, action) => {
    return updateObject(state, {});
}

const profileEditFail = (state, action) => {
    return updateObject(state, {});
}

const profileFetchDataStart = (state, action) => {
    return updateObject(state, { fetching: true });
}

const profileFetchDataSuccess = (state, action) => {
    return updateObject(state, { 
        fetching: false,
        data: action.payload.data,
    });
};

const profileFetchDataFail = (state, action) => {
    return updateObject(state, {
        fetching: false,
        error: action.error
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ){
        case (actionTypes.PROFILE_FETCH_DATA_START) : return profileFetchDataStart(state, action);
        case (actionTypes.PROFILE_FETCH_DATA_SUCCESS) : return profileFetchDataSuccess(state, action);
        case (actionTypes.PROFILE_FETCH_DATA_FAIL) : return profileFetchDataFail(state, action);
        default: return state;
    }
};

export default reducer;