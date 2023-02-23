import axios from '../../axios-settings';
import * as actionTypes from './actionTypes';
import * as actions from './index';

export const adminFetchProfiles = (token) => {
    return dispatch => {
        dispatch({type: actionTypes.ADMIN_FETCH_PROFILES_START});
        return axios
            .get(
                '/user/all',
                { headers: {'Authorization': token} }
            )
            .then(response => {
                dispatch({
                    type: actionTypes.ADMIN_FETCH_PROFILES_SUCCESS,
                    users: response.data.users
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.ADMIN_FETCH_PROFILES_FAILED,
                    error: error.response.data.message,
                });
            });
    };
};

export const adminFetchVideos = () => {
    return dispatch => {

    };
};