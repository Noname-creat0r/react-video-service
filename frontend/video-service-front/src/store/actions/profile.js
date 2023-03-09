import axios from '../../axios-settings';
import * as actionTypes from '../actions/actionTypes';

export const profileClearData = () => {
    return { type: actionTypes.PROFILE_CLEAR_DATA, };
};


export const profileFetchData = (userId, token) => {
    return dispatch => {
        dispatch({ type: actionTypes.PROFILE_FETCH_DATA_START });
        return axios
            .get(
                '/user/get',
                { 
                    params: { userId: userId },
                    headers: {'Authorization': token}
                },
            )
            .then(response => {
                dispatch({
                    type: actionTypes.PROFILE_FETCH_DATA_SUCCESS,
                    data: response.data.data,
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.PROFILE_FETCH_DATA_FAIL,
                    error: error.response.data.message,
                });
            });
    };
};

export const profilePutBookmark = (userData, bookmarkData) => {
    return dispatch => {
        dispatch({ type: actionTypes.PROFILE_PUT_BOOKMARK_START });
        return axios
            .put(
                '/user/bookmark',
                {
                    userId: userData.userId,
                    videoId: bookmarkData.videoId,
                    playlistId: bookmarkData.playlistId
                },
                { headers: {'Authorization': userData.token}},
            )
            .then(response => {
                dispatch({
                    type: actionTypes.PROFILE_PUT_BOOKMARK_SUCCESS,
                    user: response.data.user,
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.PROFILE_PUT_BOOKMARK_FAIL,
                    error: error.response.data.message,
                });
            });
    };
}

