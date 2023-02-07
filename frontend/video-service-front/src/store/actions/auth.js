import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload:  {
            token: token,
            userId: userId,
        }
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
    };
};

export const logout = (message, messageType) => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT,
        message: message,
        messageType: messageType,
    };
};

export const logoutSucceed = (message) => {
    return {
        type: actionTypes.AUTH_LOGOUT,
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
