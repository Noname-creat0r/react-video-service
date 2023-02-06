import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import { clearNotification, clearNotifications } 
    from './helpers/notification';

const initialState = {
    playlists: new Map(),
    playlistId: null,
    showPlaylistForm: false,
    uploading: false,
    fetching: false,
    notifications: [],
};

const playlistShowForm = (state) => {
    return updateObject(state, { showPlaylistForm: true });
};

const playlistCloseForm = (state) => {
    return updateObject(state, { showPlaylistForm: false });
};

const playlistUploadStart = (state) => {
    return updateObject(state, { uploading: true});
};

const playlistUploadSuccess = (state, action) => {
    return updateObject(state, { 
        uploading: false,
        playlists: new Map([...state.playlists, [action.playlist._id,
             action.playlist]]),
        notifications: action.message ? 
            [ ...state.notifications,
                { message: action.message, type: 'info' }] : 
            state.notifications,
    });
};

const playlistUploadFailed = (state, action) => {
    return updateObject(state, { 
        uploading: false,
        notifications: [ ...state.notifications, 
            { message: action.error, type: 'danger' }],
    });
};

const playlistFetchDataStart = (state) => {
    return updateObject(state, { fetching: true });
};

const playlistFetchDataSuccess = (state, action) => {
    return updateObject(state, {
        fetching: false,
        playlists: action.playlists,
    });
};

const playlistFetchDataFailed = (state, action) => {
    return updateObject(state, {
        fetching: false,
        notifications: [ ...state.notifications, 
            { message: action.error, type: 'danger' }],
    })
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.PLAYLIST_SHOW_FORM: return playlistShowForm(state); 
        case actionTypes.PLAYLIST_CLOSE_FORM: return playlistCloseForm(state); 
        case actionTypes.PLAYLIST_UPLOAD_START: return playlistUploadStart(state);
        case actionTypes.PLAYLIST_UPLOAD_FAILED: return playlistUploadFailed(state, action);
        case actionTypes.PLAYLIST_UPLOAD_SUCCESS: return playlistUploadSuccess(state, action);
        case actionTypes.PLAYLIST_FETCH_DATA_START: return playlistFetchDataStart(state);
        case actionTypes.PLAYLIST_FETCH_DATA_SUCCESS: return playlistFetchDataSuccess(state, action);
        case actionTypes.PLAYLIST_FETCH_DATA_FAILED: return playlistFetchDataFailed(state, action);
        case actionTypes.PLAYLIST_CLEAR_NOTIFICATION: return clearNotification(state, action)
        case actionTypes.PLAYLIST_CLEAR_NOTIFICATIONS: return clearNotifications(state);
        default: return state;
    }
};

export default reducer;