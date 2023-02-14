import CryptoJS from 'crypto-js';
import { put } from 'redux-saga/effects';
import { updateObject } from '../../shared/utility';

import axios from '../../axios-settings';
import * as actions from '../actions/index';

export function* uploadVideoSaga(action) {
    try {
        yield put(actions.videoUploadStart());
        yield console.log(action.videoData);
        const response = yield axios.post('/video/',
            {...action.videoData}, 
            { headers: { 
                'Authorization': action.userData.token,
                'Content-Type': 'multipart/form-data'
            },
        });
        //yield console.log(response);
        yield put(actions.videoUploadSuccess(response.data.video));
        yield put(actions.notificationSend(
            'You have uploaded a video.',
            'info'));
    } catch (err) {
        yield put(actions.videoUploadFailed(err));
        yield put(actions.notificationSend(
            'Failed to upload video.',
            'danger'));
    }
};

export function* fetchVideoInfoSaga(action) {
    try {
        yield put(actions.videoFetchInfoStart());
        const response = yield axios.get(`/video/${action.endpoint}`, {
            params: { ...action.options },
        });
        const infos = yield new Map();
        yield response.data.videos.forEach( video => 
            infos.set(video._id, video)
        );
        //yield console.log(infos);
        /*const infos = yield response.data.videos.map( video => 
            updateObject(video, { key: video._id, loading: true })
        );*/
        yield put(actions.videoFetchInfoSuccess(infos));
    } catch (error) {
        yield put(actions.videoFetchInfoFailed(error));
    }
};

export function* uploadVideoCommentsSaga(action) {
    try {
        const response = yield axios.post('/video/comment', {
            videoId: action.videoId,
            userId: action.userId,
            text: action.text,
        }, { headers: { 'Authorization': action.token, }});
        //yield console.log(response.data.comment);
        yield put(actions.videoUploadCommentSuccess(response.data.comment[0]));
        yield put(actions.notificationSend(
            'You have posted a comment.',
            'info'));
    } catch(error){
        yield put(actions.videoUploadCommentFailed(error));
        yield put(actions.notificationSend(
            'Failed to post a comment. ' + error.response.data.message,
            'danger'));
    }
};

export function* fetchVideoCommentsSaga(action) {
    try {
        const response = yield axios.get('/video/comment', {
            params: { videoId: action.videoId }, 
        });
        //yield console.log(response.data.comments);
        yield put(actions.videoFetchCommentsSuccess(response.data.comments));
    } catch (error) {
        yield put(actions.videoFetchCommentsFailed(error));
    }
};

export function* rateVideoSaga(action) {
    try {
        yield put(actions.videoRateStart());
        const response = yield axios.post(`/video/${action.actionType}`,  {
            videoId: action.videoId,
            userId: action.userId,
        }, { headers: { 'Authorization': action.token, }});
        //yield console.log(response.data.video);
        yield put(actions.videoRateSuccess(response.data.video[0]));
    } catch (error) {
        yield put(actions.videoRateFailed(error));
        yield put(actions.notificationSend(
            'Failed to rate a video: ' + error.response.data.message,
            'danger'));
        //yield console.log(error);
    }
};

export function* addViewSaga(action) {
    try {
        //console.log(action);
        const response = yield axios.post('/video/view', 
            { videoId: action.videoId, });
        //yield put(actions.videoAddViewSuccess());
        const unauthViews = localStorage.getItem('views');
        let views = 3;

        if (unauthViews) {
            views = views === 0 ? 0 : Number(unauthViews) - 1;
        }
        localStorage.setItem('views', views);
        console.log(views);
    } catch(error) {
        //yield put(actions.videoAddViewFailed());
    }
};

export function* fetchCategoreisSaga(action) {
    try {
        const response = yield axios.get('/video/categories');
        yield put(actions.videoFetchCategoreisSuccess(response.data.categories));
    } catch(error) {
        yield put(actions.videoFetchCategoreisFailed());
    }
};