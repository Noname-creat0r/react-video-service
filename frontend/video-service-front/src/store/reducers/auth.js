import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { clearNotification, clearNotifications } 
    from './helpers/notification';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    notifications: [],
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.payload.token,
        userId: action.payload.userId,
        loading: false,
        notifications: action.message ? 
            [ ...state.notifications,
                 { message: action.message, type: 'info' }] : 
            state.notifications,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        notifications: [ ...state.notifications, { message: action.error, type: 'danger' }],
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        notifications: action.message ? 
        [ ...state.notifications,
            { message: action.message, type: 'warning' }] : 
        state.notifications,
    });
};  

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path});
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_CLEAR_NOTIFICATION: return clearNotification(state, action)
        case actionTypes.AUTH_CLEAR_NOTIFICATIONS: return clearNotifications(state);
        default: return state;
    }
};

export default reducer;