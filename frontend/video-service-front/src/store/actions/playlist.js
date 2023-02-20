import * as actionTypes from '../actions/actionTypes';

export const playlistShowForm = (mode) => {
    return { 
        type: actionTypes.PLAYLIST_SHOW_FORM,
        mode: mode,
    }
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
    return { type: actionTypes.PLAYLIST_UPLOAD_FAILED, }
};

export const playlistFetchData = (endpoint, options) => {
    return {
        type: actionTypes.PLAYLIST_FETCH_DATA,
        endpoint: endpoint,
        options: options,
    }
};

export const playlistFetchDataStart = () => {
    return { type: actionTypes.PLAYLIST_FETCH_DATA_START, }
};

export const playlistFetchDataSuccess = (playlists) => {
    return {
        type: actionTypes.PLAYLIST_FETCH_DATA_SUCCESS,
        playlists: playlists,
    }
};

export const playlistFetchDataFailed = (error) => {
    return { type: actionTypes.PLAYLIST_FETCH_DATA_FAILED,}
};

export const playlistFetchVideoInfo = (playlistId) => {
    return {
        type: actionTypes.PLAYLIST_FETCH_VIDEO_INFO,
        playlistId: playlistId,
    }
};

export const playlistFetchVideoInfoStart = () => {
    return { type: actionTypes.PLAYLIST_FETCH_VIDEO_INFO_START,}
};

export const playlistFetchVideoInfoFailed = () => {
    return { type: actionTypes.PLAYLIST_FETCH_VIDEO_INFO_FAILED, }
};

export const playlistFetchVideoInfoSuccess = (playlistWithVideos) => {
    return {
        type: actionTypes.PLAYLIST_FETCH_VIDEO_INFO_SUCCESS,
        playlist: playlistWithVideos,
    }
};

export const playlistEdit = (token, playlistId, actionType, videoId) => {
    return {
        type: actionTypes.PLAYLIST_EDIT,
        token: token,
        editData: {
            playlistId: playlistId,
            actionType: actionType,
            videoId: videoId
        },
    }
};

export const playlistEditSuccess = (updatedPlaylist) => {
    return {
        type: actionTypes.PLAYLIST_EDIT_SUCCESS,
        playlist: updatedPlaylist,
    }
};

export const playlistEditFailed = (error) => {
    return { type: actionTypes.PLAYLIST_EDIT_FAILED }
};

export const playlistDelete = (playlistId, token, userId) => {
    return {
        type: actionTypes.PLAYLIST_DELETE,
        playlistId: playlistId,
        token: token,
        userId: userId,
    };
};

export const playlistDeleteSuccess = (id) => {
    return { 
        type: actionTypes.PLAYLIST_DELETE_SUCCESS,
        id: id,
    }
};

export const playlistDeleteFailed = () => {
    return {type: actionTypes.PLAYLIST_DELETE_FAILED}
};