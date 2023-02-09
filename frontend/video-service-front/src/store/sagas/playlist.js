import { put } from 'redux-saga/effects';
import axios from '../../axios-settings';
import * as actions from '../actions/index';

export function* uploadPlaylistSaga(action) {
    try {
        yield console.log(action);
        yield put(actions.playlistUploadStart());
        const response = yield axios.post('/playlist',
            {...action.data}, 
            { headers: { 
                'Authorization': action.data.token,
                'Content-Type': 'multipart/form-data'}
            }
        );
        yield put(actions.playlistUploadSuccess(response.data.playlist));
        yield put(actions.notificationSend(
            'You have created a new playlist!',
            'info'));
    } catch(error) {
        yield put(actions.playlistUploadFailed(error));
        yield put(actions.notificationSend(
            'Failed to upload a playlist!',
            'danger'));
    }
};

export function* fetchPlaylistsSaga(action) {
    try {
        yield put(actions.playlistFetchDataStart());
        const response = yield axios.get(`/playlist${action.endpoint}`,{
            params: {...action.options}, 
        });
        const data = yield new Map();
        yield response.data.playlists.forEach( playlist => 
            data.set(playlist._id, playlist)    
        );
        //yield console.log(data);
        yield put(actions.playlistFetchDataSuccess(data));
    } catch(error) {
        yield put(actions.playlistFetchDataFailed(error));
        yield put(actions.notificationSend(
            error.response.data.message,
            'danger'));
    }
};

export function* fetchPlaylistVideoInfoSaga(action) {
    try {
        yield put(actions.playlistFetchVideoInfoStart());
        const response = yield axios.get('/playlist/info', {
            params: { playlistId: action.playlistId }
        })
        yield put(actions.playlistFetchVideoInfoSuccess(response.data.playlist[0]));
        console.log(response.data.playlist);
    } catch(error) {
        console.log(error);
        yield put(actions.playlistFetchVideoInfoFailed());
    }
};

export function* editPlaylistSaga(action) {
    try {
        const response = yield axios.patch('/playlist', 
            { ...action.editData } ,
            { headers: {
                'Authorization': action.data.token,
                'Content-Type': 'multipart/form-data' }
            }
        );
        yield put(actions.playlistEditSuccess(response.data.playlist));
        yield put(actions.notificationSend(
            'Edited playlist!',
            'info'));
    } catch(error) {
        yield put(actions.playlistEditFailed(error));
        yield put(actions.notificationSend(
            'Failed to edit a playlist!',
            'danger'));
    }
}

export function* deletePlaylistSaga(){

}
