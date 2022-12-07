import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
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

export const signup = (authData) => {
    return dispatch => {
        axios
            .post("http://localhost:8080/auth/signup/", authData)
            .then( response => {
                dispatch(authSuccess(response.data.token, response.data.userId));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
};

export const signin = (authData) => {
    return dispatch => {
        axios
            .post("http://localhost:8080/auth/signin/", authData)
            .then( response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                dispatch(authSuccess(response.data.token, response.data.userId));
            })
            .catch(err =>{
                dispatch(authFail(err.response.data.error));
            });
    }
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
           signin(authData);
        }
        else {
           signup(authData);
        }

    }
};