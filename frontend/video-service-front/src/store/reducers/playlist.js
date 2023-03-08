import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import * as modes from "../../shared/playlistModalModes";

const initialState = {
    playlists: new Map(),
    playlistId: null,
    currentVideoId: null,
    pendingRequests: 0,
    uploading: false,
    playing: false,
    editing: false,
};

const playlistUploadStart = state => {
    return updateObject(state, { uploading: true });
};

const playlistUploadSuccess = (state, action) => {
    return updateObject(state, {
        uploading: false,
        playlists: new Map([...state.playlists, [action.playlist._id, action.playlist]]),
    });
};

const playlistUploadFailed = (state, action) => {
    return updateObject(state, { uploading: false });
};

const playlistFetchDataStart = state => {
    return updateObject(state, { pendingRequests: state.pendingRequests + 1 });
};

const playlistFetchDataSuccess = (state, action) => {
    return updateObject(state, {
        pendingRequests: state.pendingRequests - 1,
        playlists: action.playlists,
    });
};

const playlistFetchDataFailed = (state, action) => {
    return updateObject(state, { pendingRequests: state.pendingRequests - 1 });
};

const playlistFetchVideoInfoStart = state => {
    return updateObject(state, { pendingRequests: state.pendingRequests + 1 });
};

const playlistFetchVideoInfoSuccess = (state, action) => {
    const updatedPlaylists = new Map([...state.playlists]);
    updatedPlaylists.set(action.playlist._id, action.playlist);
    return updateObject(state, {
        pendingRequests: state.pendingRequests - 1,
        playlists: updatedPlaylists,
    });
};

const playlistFetchVideoInfoFailed = state => {
    return updateObject(state, {
        pendingRequests: state.pendingRequests - 1,
    });
};

const playlistEditStart = (state, action) => {
    return updateObject(state, { editing: true });
};

const playlistEditSuccess = (state, action) => {
    const updatedPlaylists = new Map([...state.playlists]);
    updatedPlaylists.set(action.playlist._id, action.playlist);
    return updateObject(state, { playlists: updatedPlaylists, editing: false });
};

const playlistEditFailed = state => {
    return updateObject(state, { editing: false });
};

const playlistDeleteSuccess = (state, action) => {
    const updPlaylists = new Map([...state.playlists]);
    updPlaylists.delete(action.id);
    return updateObject(state, { playlists: updPlaylists });
};

const playlistDeleteFailed = state => {
    return state;
};

const playlistOn = (state, action) => {
    return updateObject(state, {
        playing: true,
    });
};

const playlistOff = state => {
    return updateObject(state, { playing: false });
};

const playlistSetCurrentVideo = (state, action) => {
    return updateObject(state, {
        currentVideoId: action.videoId,
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PLAYLIST_UPLOAD_START:
            return playlistUploadStart(state);
        case actionTypes.PLAYLIST_UPLOAD_FAILED:
            return playlistUploadFailed(state, action);
        case actionTypes.PLAYLIST_UPLOAD_SUCCESS:
            return playlistUploadSuccess(state, action);
        case actionTypes.PLAYLIST_FETCH_DATA_START:
            return playlistFetchDataStart(state);
        case actionTypes.PLAYLIST_FETCH_DATA_SUCCESS:
            return playlistFetchDataSuccess(state, action);
        case actionTypes.PLAYLIST_FETCH_DATA_FAILED:
            return playlistFetchDataFailed(state, action);
        case actionTypes.PLAYLIST_FETCH_VIDEO_INFO_START:
            return playlistFetchVideoInfoStart(state);
        case actionTypes.PLAYLIST_FETCH_VIDEO_INFO_SUCCESS:
            return playlistFetchVideoInfoSuccess(state, action);
        case actionTypes.PLAYLIST_FETCH_VIDEO_INFO_FAILED:
            return playlistFetchVideoInfoFailed(state);
        case actionTypes.PLAYLIST_EDIT_START:
            return playlistEditStart(state);
        case actionTypes.PLAYLIST_EDIT_SUCCESS:
            return playlistEditSuccess(state, action);
        case actionTypes.PLAYLIST_EDIT_FAILED:
            return playlistEditFailed(state);
        case actionTypes.PLAYLIST_DELETE_START:
            return state;
        case actionTypes.PLAYLIST_DELETE_SUCCESS:
            return playlistDeleteSuccess(state, action);
        case actionTypes.PLAYLIST_DELETE_FAILED:
            return playlistDeleteFailed(state);
        case actionTypes.PLAYLIST_ON:
            return playlistOn(state, action);
        case actionTypes.PLAYLIST_OFF:
            return playlistOff(state);
        case actionTypes.PLAYLIST_SET_CURRENT_VIDEO:
            return playlistSetCurrentVideo(state, action);
        default:
            return state;
    }
};

export default reducer;
