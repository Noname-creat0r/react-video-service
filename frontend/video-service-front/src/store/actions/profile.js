import * as actionTypes from '../actions/actionTypes';

export const profileFetchDataStart = () => {
    return {
        type: actionTypes.PROFILE_FETCH_DATA_START
    };
};

export const profileFetchDataSuccess = (data) => {
    return {
        type: actionTypes.PROFILE_FETCH_DATA_SUCCESS,
        payload: {
            data: data
        }
    };
};

export const profileFetchDataFail = (error) => {
    return {
        type: actionTypes.PROFILE_FETCH_DATA_FAIL,
        error: 'Failed to fetch data of this profile.'
    };
};

// Improve this method in future by adding param object or array
export const profileFetchData = (userId, token) => {
    return {
        type: actionTypes.PROFILE_FETCH_DATA,
        userId: userId,
        token: token,
    };
};

export const profileClearNotification = (index) => {
    return {
        type: actionTypes.PROFILE_CLEAR_NOTIFICATION,
        index: index,
    }
}

export const profileClearNotifications = () => {
    return {
        type: actionTypes.PROFILE_CLEAR_NOTIFICATIONS,
    };
};