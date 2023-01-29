import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from '../actions/actionTypes';
import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from './auth';
import {
     profileFetchDataSaga, 
} from "./profile";
import {
    uploadVideoSaga,
    fetchVideoInfoSaga,
    uploadVideoCommentsSaga,
    fetchVideoCommentsSaga,
    rateVideoSaga,
} from './video';

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga)
    ]);
};

export function* watchProfile() {
    yield all([
        takeEvery(actionTypes.PROFILE_FETCH_DATA, profileFetchDataSaga),
    ]);
};

export function* watchVideo() {
    yield all([
        takeEvery(actionTypes.VIDEO_UPLOAD, uploadVideoSaga),
        takeEvery(actionTypes.VIDEO_FETCH_INFO, fetchVideoInfoSaga),
        takeEvery(actionTypes.VIDEO_UPLOAD_COMMENTS, uploadVideoCommentsSaga),
        takeEvery(actionTypes.VIDEO_FETCH_COMMENTS, fetchVideoCommentsSaga),
        takeEvery(actionTypes.VIDEO_RATE, rateVideoSaga),
    ]);
};