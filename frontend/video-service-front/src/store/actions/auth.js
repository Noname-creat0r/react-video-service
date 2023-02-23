import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from '../../axios-settings';

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload:  {
            token: token,
            userId: userId,
        }
    };
};

export const logout = (message) => {
    return dispatch => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        dispatch({ type: actionTypes.AUTH_LOGOUT });
        if (message)
            dispatch(actions.notificationSend(
                'You were logged out!',
                'warning'));
    }
};

export const checkAuthTimeout = (expirationTime) => {
    //console.log('CHECK_AUTH_TIMEOUT (expDate): ' + action.expirationTime);
    //console.log('DELAY: ' + new Date(action.expirationTime).getTime());
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, new Date(expirationTime).getTime() - new Date().getTime());
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        //console.log('AUTH_CHECK_STATE(token): ' + token);
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(
                localStorage.getItem("expirationDate")
            );
            //console.log('AUTH_CHECK_STATE(expDate): ' + expirationDate);
            if (expirationDate <= new Date()) {
                dispatch(logout('You were loged out! Auth token has expired!'));
            } else {
                const userId = localStorage.getItem("userId");
                //console.log("AUTH_CHECK_STATE (to timeout): " + (expirationDate.getTime() - new Date().getTime()).toString());
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(expirationDate.getTime() ));
            }
        }
    }
};

export const auth = (email, password, name) => {
    return dispatch => {
        dispatch({ type: actionTypes.AUTH_START});
        const authData = {
            email: email,
            password: password
        };
        if (name !== undefined){
            authData["name"] = name;
            axios
                .post('/auth/signup/', authData)
                .then(response => {
                    dispatch(actions.notificationSend(
                        'You created a new profile.',
                        'info'));
                });
        }
        else {
            axios
                .post('/auth/signin/', authData)
                .then(response => {
                    const expirationDate = new Date(response.data.expiresIn);
                    //console.log(expirationDate);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('expirationDate', expirationDate);
                    dispatch(authSuccess(response.data.token, response.data.userId));
                    dispatch(checkAuthTimeout(expirationDate));

                    dispatch(actions.profileFetchData(
                        localStorage.getItem('userId'),
                        localStorage.getItem('token')));

                    dispatch(actions.notificationSend(
                        'Signed in successfully. Welcome!',
                        'success'));
                })
                .catch(error => {
                    dispatch({
                        type: actionTypes.AUTH_FAIL,
                        error: error.response.data.error
                    });
                    dispatch(actions.notificationSend(
                        error.response.data.message,
                        'danger'));
                });
        }
    }
};
