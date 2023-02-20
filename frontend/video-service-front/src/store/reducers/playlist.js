import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import * as modes from '../../shared/playlistModalModes';

const initialState = {
    playlists: new Map(),
    playlistId: null,
    showPlaylistForm: false,
    playlistFormMode: modes.UPLOADING,
    uploading: false,
    fetching: false,
};

const playlistShowForm = (state, action) => {
    return updateObject(state, { 
        showPlaylistForm: true,
        playlistFormMode: action.mode
    });
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
    });
};

const playlistUploadFailed = (state, action) => {
    return updateObject(state, { uploading: false, });
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
    return updateObject(state, { fetching: false, });
};

const playlistFetchVideoInfoStart = (state) => {
    return updateObject(state, { fetching: true });
};

const playlistFetchVideoInfoSuccess = (state, action) => {
    const updatedPlaylists = new Map([...state.playlists]);
    updatedPlaylists.set(action.playlist._id, action.playlist);
    return updateObject(state, {
        fetching: false,
        playlists: updatedPlaylists,
    });
};

const playlistFetchVideoInfoFailed = (state) => {
    return updateObject( state, { fetching: false });
}

const playlistEditSuccess = (state, action) => {
    const updatedPlaylists = new Map([...state.playlists]);
    updatedPlaylists.set(action.playlist._id, action.playlist);
    return updateObject( state, { playlists: updatedPlaylists });
};

const playlistEditFailed = (state) => {
    return updateObject(state, {});
};

const playlistDeleteSuccess = (state, action) => {
    const updPlaylists = new Map([...state.playlists]);
    updPlaylists.delete(action.id);
    return updateObject(state, { playlists: updPlaylists });
};

const playlistDeleteFailed = (state) => { return state; } 

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.PLAYLIST_SHOW_FORM: return playlistShowForm(state, action); 
        case actionTypes.PLAYLIST_CLOSE_FORM: return playlistCloseForm(state); 
        case actionTypes.PLAYLIST_UPLOAD_START: return playlistUploadStart(state);
        case actionTypes.PLAYLIST_UPLOAD_FAILED: return playlistUploadFailed(state, action);
        case actionTypes.PLAYLIST_UPLOAD_SUCCESS: return playlistUploadSuccess(state, action);
        case actionTypes.PLAYLIST_FETCH_DATA_START: return playlistFetchDataStart(state);
        case actionTypes.PLAYLIST_FETCH_DATA_SUCCESS: return playlistFetchDataSuccess(state, action);
        case actionTypes.PLAYLIST_FETCH_DATA_FAILED: return playlistFetchDataFailed(state, action);
        case actionTypes.PLAYLIST_FETCH_VIDEO_INFO_START: return playlistFetchVideoInfoStart(state);
        case actionTypes.PLAYLIST_FETCH_VIDEO_INFO_SUCCESS: return playlistFetchVideoInfoSuccess(state, action);
        case actionTypes.PLAYLIST_FETCH_VIDEO_INFO_FAILED: return playlistFetchVideoInfoFailed(state);
        case actionTypes.PLAYLIST_EDIT_SUCCESS: return playlistEditSuccess(state, action);
        case actionTypes.PLAYLIST_EDIT_FAILED: return playlistEditFailed(state);
        case actionTypes.PLAYLIST_DELETE_SUCCESS: return playlistDeleteSuccess(state, action);
        case actionTypes.PLAYLIST_DELETE_FAILED: return playlistDeleteFailed(state);
        default: return state;
    }
};

export default reducer;