import { put } from 'redux-saga/effects';

import axios from '../../axios-settings';
import * as actions from '../actions/index';

export function* profileFetchDataSaga(action){
    try { 
        yield put(actions.profileFetchDataStart());
        const response = yield axios.get('/user/get', { 
                params: { userId: action.userId },
                headers: {'Authorization': action.token}
            });
        const data = yield response.data.data;
        yield put(actions.playlistFetchData(
            '/', 
            { userId: localStorage.getItem('userId') }
        ));
        yield put(actions.profileFetchDataSuccess(data));
    } catch (error) {
        yield put(actions.profileFetchDataFail(error.response.data.error));
    } 
}
