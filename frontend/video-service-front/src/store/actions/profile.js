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
export const profileFetchData = (userId, token) => {
    /*return async dispatch => {
        dispatch(profileFetchDataStart());
        axios
            .get('/user/get', { 
                params: { userId: userId },
                headers: {'Authorization': token}
            })
            .then(response => {
                const data = response.data.data;
                dispatch(profileFetchDataSuccess(data));
            })
            .catch(error => {
                dispatch(profileFetchDataFail(error.data));
            });
    }*/
    return {
        type: actions.PROFILE_FETCH_DATA,
        userId: userId,
        token: token,
    };
};