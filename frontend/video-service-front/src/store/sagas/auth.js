import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import axios from '../../axios-settings';
import * as actions from '../actions/index';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
};

export function* checkAuthTimeoutSaga(action) {
    yield console.log('CHECK_AUTH_TIMEOUT (expDate): ' + action.expirationTime);
    yield console.log('DELAY: ' + new Date(action.expirationTime).getTime());
    yield delay(new Date(action.expirationTime).getTime());
    yield put(actions.logout());
};

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    yield console.log('AUTH_CHECK_STATE(token): ' + token);
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(
            localStorage.getItem("expirationDate")
        );
        yield console.log('AUTH_CHECK_STATE(expDate): ' + expirationDate);
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem("userId");
            yield console.log("AUTH_CHECK_STATE (to timeout): " + (expirationDate.getTime() - new Date().getTime()).toString());
            yield put(actions.authSuccess(token, userId));
            yield put(actions.checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()))
            );
        }
    }
};

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password
    };
    try {
        if (action.name !== undefined){
            authData["name"] = action.name;
            const response = yield axios.post('/auth/signup/', authData);
           // yield put(actions.authSuccess(response.data.token, response.data.userId);
        }
        else {
            const response = yield axios.post('/auth/signin/', authData)
            const expirationDate = new Date(response.data.expiresIn);
            //yield console.log(expirationDate);
            yield localStorage.setItem('token', response.data.token);
            yield localStorage.setItem('userId', response.data.userId);
            yield localStorage.setItem('expirationDate', expirationDate);
            yield put(actions.authSuccess(response.data.token, response.data.userId))
            yield put(actions.checkAuthTimeout(expirationDate));
    }

    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
};