import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    guest: false,
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.payload.token,
        userId: action.payload.userId,
        loading: false,
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
    });
};  


const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
};

export default reducer;
