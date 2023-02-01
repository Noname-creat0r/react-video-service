import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { clearNotification, clearNotifications }
     from './helpers/notification';

const initialState = {
    unsignedUpVideos: 10,
    settings: {},
    data: {},
    fetching: false,
    notifications: [],
}

const profileEditStart = (state, action) => {
    return updateObject(state, {});
}

const profileEditSuccess = (state, action) => {
    return updateObject(state, {
        notifications: [ ...state.notifications, { 
            message: action.notification,
            type: 'info' }],
    });
}

const profileEditFail = (state, action) => {
    return updateObject(state, {
        notifications: [ ...state.notifications, { message: action.error, type: 'warning' }],
    });
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
        notifications: [ ...state.notifications, { message: action.error, type: 'warning' }],
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ){
        case (actionTypes.PROFILE_FETCH_DATA_START) : return profileFetchDataStart(state, action);
        case (actionTypes.PROFILE_FETCH_DATA_SUCCESS) : return profileFetchDataSuccess(state, action);
        case (actionTypes.PROFILE_FETCH_DATA_FAIL) : return profileFetchDataFail(state, action);
        case (actionTypes.PROFILE_CLEAR_NOTIFICATION) : return clearNotification(state, action);
        case (actionTypes.PROFILE_CLEAR_NOTIFICATIONS) : return clearNotifications(state);
        default: return state;
    }
};

export default reducer;