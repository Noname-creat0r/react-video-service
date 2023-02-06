import { put } from 'redux-saga/effects';
import axios from '../../axios-settings';
import * as actions from '../actions/index';

export function* uploadPlaylistSaga(action) {
    try {
        yield put(actions.playlistUploadStart());
        const response = yield axios.post('/playlist',
            {...action.data}, 
            { headers: { 
                'Authorization': action.data.token,
                'Content-Type': 'multipart/form-data'
            },
        });
        yield put(actions.playlistUploadSuccess(response.data.playlist));
    } catch(error) {
        yield put(actions.playlistUploadFailed(error));
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
        yield console.log(data);
        yield put(actions.playlistFetchDataSuccess(data));
    } catch(error) {
        yield put(actions.playlistFetchDataFailed(error));
    }
};

export function* deletePlaylistSaga(){

}
