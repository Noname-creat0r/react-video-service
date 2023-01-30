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
        yield console.log(response);
        yield put(actions.videoUploadSuccess());
    } catch (err) {
        yield put(actions.videoUploadFailed(err));
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
        //yield put(actions.videoUploadCommentSuccess(action.videoId, action.userId, action.text));
    } catch(error){
        yield console.log(error);
    }
};

export function* fetchVideoCommentsSaga(action) {
    try {
        const response = yield axios.get('/video/comment', {
            params: { videoId: action.videoId }, 
        });
        yield console.log(response.data.comments);
        yield put(actions.videoFetchCommentsSuccess(response.data.comments));
    } catch (error) {
        yield console.log(error);
    }
};

export function* rateVideoSaga(action) {
    try {
        yield put(actions.videoRateStart());
        const response = yield axios.post(`/video/${action.actionType}`,  {
            videoId: action.videoId,
            userId: action.userId,
        }, { headers: { 'Authorization': action.token, }});
        yield console.log(response.data.video);
        yield put(actions.videoRateSuccess(response.data.video[0]));
    } catch (error) {
        yield console.log(error);
    }
};
