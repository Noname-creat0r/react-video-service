import axios from '../../axios-settings';
import * as actionTypes from '../actions/actionTypes';
import * as actions from './index';

export const playlistOn = () => ({ type: actionTypes.PLAYLIST_ON })
export const playlistOff = () => ({ type: actionTypes.PLAYLIST_OFF });

export const playlistUpload = (data) => {
    return dispatch => {
        dispatch({ type: actionTypes.PLAYLIST_UPLOAD_START });
        return axios
            .post(
                '/playlist',
                {...data}, 
                { headers: { 
                    'Authorization': data.token,
                    'Content-Type': 'multipart/form-data'}
                }
            )
            .then(response => {
                dispatch({
                    type: actionTypes.PLAYLIST_UPLOAD_SUCCESS,
                    playlist: response.data.playlist,
                });
                dispatch(actions.notificationSend(
                    'You have created a new playlist',
                    'info'));
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.PLAYLIST_UPLOAD_FAILED,
                    error: error.response.data.message,
                });
                dispatch(actions.notificationSend(
                    'Failed to upload a playlist',
                    'warning'));
            });
    }
};


export const playlistFetchData = (endpoint, options) => {
    return dispatch => {
        dispatch({ type: actionTypes.PLAYLIST_FETCH_DATA_START });
        return axios
            .get(
                `/playlist${endpoint}`,
                {params: {...options}},
            )
            .then(response => {
                const data = new Map();
                response.data.playlists.forEach( playlist => 
                    data.set(playlist._id, playlist)    
                );
                dispatch({
                    type: actionTypes.PLAYLIST_FETCH_DATA_SUCCESS,
                    playlists: data,
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.PLAYLIST_FETCH_DATA_FAILED,
                    error: error.response.data.message,
                });
                dispatch(actions.notificationSend(
                    'Failed to upload a playlist',
                    'warning'));
            });
    }
};

export const playlistEdit = (token, playlistId, actionType, videoId) => {
    return dispatch => {
        dispatch({ type: actionTypes.PLAYLIST_EDIT_START });
        return axios
            .put(
                '/playlist',
                { 
                    playlistId: playlistId,
                    actionType: actionType,
                    videoId: videoId 
                },
                { headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data' }
                }
            )
            .then(response => {
                dispatch({
                    type: actionTypes.PLAYLIST_EDIT_SUCCESS,
                    playlists: response.data.playlist,
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.PLAYLIST_EDIT_FAILED,
                    error: error.response.data.message,
                });
                dispatch(actions.notificationSend(
                    'Failed to edit a playlist',
                    'warning'));
            });
    }
};


export const playlistDelete = (playlistId, token, userId) => {
    return dispatch => {
        dispatch({ type: actionTypes.PLAYLIST_DELETE_START });
        return axios
            .delete(
                '/playlist',
                {
                    params: {
                        userId: userId,
                        playlistId: playlistId,
                    }, 
                    headers: { 'Authorization': token,}
                },
            )
            .then(response => {
                dispatch({
                    type: actionTypes.PLAYLIST_DELETE_SUCCESS,
                    playlists: response.data.playlistId,
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.PLAYLIST_DELETE_FAILED,
                    error: error.response.data.message,
                });
            });
    }
};


