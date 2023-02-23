import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    unsignedUpVideos: 10,
    settings: {},
    data: {},
    fetching: false,
}

const profileEditStart = (state, action) => {
    return updateObject(state, {});
}

const profileEditSuccess = (state, action) => {
    return updateObject(state, {
        
    });
}

const profileEditFail = (state, action) => {
    return updateObject(state, {
    });
}

const profileFetchDataStart = (state, action) => {
    return updateObject(state, { fetching: true });
}

const profileFetchDataSuccess = (state, action) => {
    return updateObject(state, { 
        fetching: false,
        data: action.data,
    });
};

const profileFetchDataFail = (state, action) => {
    return updateObject(state, {
        fetching: false,
    });
};

const profileClearData = (state) => {
    return updateObject(state, {
        data: {},
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ){
        case (actionTypes.PROFILE_FETCH_DATA_START) : return profileFetchDataStart(state, action);
        case (actionTypes.PROFILE_FETCH_DATA_SUCCESS) : return profileFetchDataSuccess(state, action);
        case (actionTypes.PROFILE_FETCH_DATA_FAIL) : return profileFetchDataFail(state, action);
        case (actionTypes.PROFILE_CLEAR_DATA): return profileClearData(state);
        default: return state;
    }
};

export default reducer;