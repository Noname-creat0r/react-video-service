import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fetching: false,
    users: [],
    playlists: [],
    categories: [],
};

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        default: return state;
    }
};

export default reducer;