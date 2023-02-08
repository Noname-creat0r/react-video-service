import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    playlists: new Map(),
    playlistId: null,
    showPlaylistForm: false,
    uploading: false,
    fetching: false,
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
}

const playlistFetchVideoInfoSuccess = (state, action) => {
    const updatedPlaylists = {...state.playlists};
    updatedPlaylists.set(action.playlist._id, action.playlist);
    return updateObject(state, {
        fetching: false,
        playlists: updatedPlaylists,
    })
}

const playlistFetchVideoInfoFailed = (state) => {
    return updateObject( state, { fetching: false });
}

const playlistEditSuccess = (state, action) => {
    const updatedPlaylists = {...state.playlists};
    updatedPlaylists.set(action.playlist._id, action.playlist);
    return updateObject( state, { playlists: updatedPlaylists });
}

const playlistEditFailed = (state) => {
    return updateObject(state, {});
}

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
        case actionTypes.PLAYLIST_FETCH_VIDEO_INFO_START: return playlistFetchVideoInfoStart(state);
        case actionTypes.PLAYLIST_FETCH_VIDEO_INFO_SUCCESS: return playlistFetchVideoInfoSuccess(state, action);
        case actionTypes.PLAYLIST_FETCH_VIDEO_INFO_FAILED: return playlistFetchVideoInfoFailed(state);
        case actionTypes.PLAYLIST_EDIT_SUCCESS: return playlistEditSuccess(state, action);
        case actionTypes.PLAYLIST_EDIT_FAILED: return playlistEditFailed(state);
        default: return state;
    }
};

export default reducer;