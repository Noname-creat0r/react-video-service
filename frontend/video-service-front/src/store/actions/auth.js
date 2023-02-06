import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, auto) => {
    let message = 'Signed in successfully';
    const payload = {
        token: token,
        userId: userId,
    };

    if (!token){
        message = 'Signed up successfully';
    }

    return {
        type: actionTypes.AUTH_SUCCESS,
        message: auto ? null : message,
        payload: payload,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = (message) => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT,
        message: message,
    };
};

export const logoutSucceed = (message) => {
    return {
        type: actionTypes.AUTH_LOGOUT,
        message: message,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime,
    }
};

export const authCheckState = () => {
   return {
    type: actionTypes.AUTH_CHECK_STATE,
   }
};

export const auth = (email, password, name) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        name: name,
    }
};

export const authClearNotification = (index) => {
    return {
        type: actionTypes.AUTH_CLEAR_NOTIFICATION,
        index: index,
    }
};

export const authClearNotifications = () => {
    return {
        type: actionTypes.AUTH_CLEAR_NOTIFICATIONS,
    };
};