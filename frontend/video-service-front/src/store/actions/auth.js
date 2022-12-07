import axios from '../../axios-settings';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

 export const auth = (email, password, name, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            name: name,
        };

        if (!isSignUp){
            axios
                .post('/auth/signup/', authData)
                .then( response => {
                    dispatch(authSuccess(response.data.token, response.data.userId));
                })
                .catch(err => {
                    dispatch(authFail(err.response.data.error));
                })
        }
        else {
            axios
                .post('/auth/signin/', authData)
                .then( response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    dispatch(authSuccess(response.data.token, response.data.userId));
                })
                .catch(err =>{
                    dispatch(authFail(err.response.data.error));
                });
        }

    }
};