import * as actionTypes from '../actions/actionTypes';

export const profileFetchDataStart = () => {
    return {
        type: actionTypes.PROFILE_FETCH_DATA_START,
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

export const profileClearData = () => {
    return { type: actionTypes.PROFILE_CLEAR_DATA, };
};

export const profileEdit = (token, editData) => {
    return {
        type: actionTypes.PROFILE_EDIT,
        token: token,
        data: editData,
    };
};

export const profileEditSuccess = (profile) => {
    return {
        type: actionTypes.PROFILE_EDIT_SUCCESS,
        profile: profile,
    };
};

export const profileEditFailed = () => {
    return { type: actionTypes.PROFILE_EDIT_FAILED }
};

export const profileDelete = (token, profileId) => {
    return {
        type: actionTypes.PROFILE_DELETE,
        token: token,
        profileId: profileId,
    };
};

export const profileDeleteSuccess = (profileId) => {
    return {
        type: actionTypes.PROFILE_DELETE_SUCCESS,
        profileId: profileId,
    };
};

export const profileDeleteFailed = () => {
    return { type: actionTypes.PROFILE_DELETE_FAILED }
};