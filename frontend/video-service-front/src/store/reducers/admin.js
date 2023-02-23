import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    pendingRequests: 0,
    users: [],
    videos: [],
};


const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.ADMIN_FETCH_PROFILES_START: 
            return updateObject(state, { pendingRequests: state.pendingRequests + 1, });
        case actionTypes.ADMIN_FETCH_PROFILES_SUCCESS: 
            return updateObject(state, { 
                pendingRequests: state.pendingRequests - 1,
                users: action. users });
        case actionTypes.ADMIN_FETCH_PROFILES_FAILED: 
            return updateObject(state, { 
                pendingRequests: state.pendingRequests - 1,
                error: action.error });
        default: return state;
    }
};

export default reducer;