import axios from '../../axios-settings';
import * as actions from '../actions/actionTypes';

export const profileFetchDataStart = () => {
    return {
        type: actions.PROFILE_FETCH_DATA_START
    };
};

export const profileFetchDataSuccess = (data) => {
    return {
        type: actions.PROFILE_FETCH_DATA_SUCCESS,
        payload: {
            data: data
        }
    };
};

export const profileFetchDataFail = (error) => {
    return {
        type: actions.PROFILE_FETCH_DATA_FAIL,
        error: error
    };
};

// Improve this method in future by adding param object or array
export const fetchData = (userId, token) => {
    return dispatch => {
        dispatch(profileFetchDataStart());
        axios
            .get('/user/get', { 
                params: { userId: userId },
                headers: {'Authorization': token}
            })
            .then(response => {
                dispatch(profileFetchDataSuccess(...response.data));
            })
            .catch(error => {
                dispatch(profileFetchDataFail(error.data));
            });
    }

};