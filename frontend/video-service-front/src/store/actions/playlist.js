import * as actionTypes from '../actions/actionTypes';

export const playlistShowForm = () => {
    return { type: actionTypes.PLAYLIST_SHOW_FORM }
};

export const playlistCloseForm = () => {
    return { type: actionTypes.PLAYLIST_CLOSE_FORM }
};

export const playlistUpload = (data) => {
    return {
        type: actionTypes.PLAYLIST_UPLOAD,
        data: data,
    }
};

export const playlistUploadStart = () => {
    return { type: actionTypes.PLAYLIST_UPLOAD_START }
};

export const playlistUploadSuccess = (playlist) => {
    return {
        type: actionTypes.PLAYLIST_UPLOAD_SUCCESS,
        playlist: playlist,
    }
};

export const playlistUploadFailed = (error) => {
    return {
        type: actionTypes.PLAYLIST_UPLOAD_FAILED,
    }
};

export const playlistFetchData = (endpoint, options) => {
    return {
        type: actionTypes.PLAYLIST_FETCH_DATA,
        endpoint: endpoint,
        options: options,
    }
};

export const playlistFetchDataStart = () => {
    return {
        type: actionTypes.PLAYLIST_FETCH_DATA_START,
    }
};

export const playlistFetchDataSuccess = (playlists) => {
    return {
        type: actionTypes.PLAYLIST_FETCH_DATA_SUCCESS,
        playlists: playlists,
    }
};

export const playlistFetchDataFailed = (error) => {
    return {
        type: actionTypes.PLAYLIST_UPLOAD_FAILED,
    }
};