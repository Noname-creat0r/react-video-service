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
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authCheckState = (path) => {
   return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date.getTime()) / 1000));
                
            }
        }
   }; 
};

 export const auth = (email, password, name) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };

        if (name !== undefined){
            authData["name"] = name;
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