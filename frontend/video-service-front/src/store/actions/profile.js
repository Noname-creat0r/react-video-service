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
                })
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.PROFILE_FETCH_DATA_FAIL,
                    error: error.response.data.message,
                })
            });
    };
};


/*export const profileEdit = (token, editData) => {
    return {
        type: actionTypes.PROFILE_EDIT,
        token: token,
        data: editData,
    };
};*/


/*export const profileDelete = (token, profileId) => {
    return {
        type: actionTypes.PROFILE_DELETE,
        token: token,
        profileId: profileId,
    };
};*/
