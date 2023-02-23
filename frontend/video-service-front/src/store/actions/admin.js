import * as actionTypes from './actionTypes';


export const adminFetchProfilesFailed = () => {
    return { type: actionTypes.ADMIN_FETCH_PROFILES_FAILED}
};

export const adminFetchProfilesSuccess = (profiles) => {
    return { 
        type: actionTypes.ADMIN_FETCH_PROFILES_SUCCESS,
        profile: profiles,
    }
};

export const adminFetchVideosSuccess = (videos) => {
    return { 
        type: actionTypes.ADMIN_FETCH_VIDEOS_SUCCESS,
        videos: videos,
    }
};

export const adminFetchVideosFailed = () => {
    return { type: actionTypes.ADMIN_FETCH_VIDEOS_FAILED}
};