import { put } from 'redux-saga/effects';
import { updateObject } from '../../shared/utility';

import axios from '../../axios-settings';
import * as actions from '../actions/index';

export function* uploadVideoSaga(action) {

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
        yield put(actions.videoFetchInfoFailed(error.response.data.error));
    }
};