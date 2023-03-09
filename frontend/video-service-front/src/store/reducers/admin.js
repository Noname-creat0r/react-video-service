import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  pendingRequests: 0,
  users: [],
};

const adminEditUser = (state, action) => {
  const updatedUsers = [...state.users];
  return updateObject(state, {
    users: updatedUsers,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADMIN_FETCH_PROFILES_START:
      return updateObject(state, { pendingRequests: state.pendingRequests + 1 });
    case actionTypes.ADMIN_FETCH_PROFILES_SUCCESS:
      return updateObject(state, {
        pendingRequests: state.pendingRequests - 1,
        users: action.users,
      });
    case actionTypes.ADMIN_FETCH_PROFILES_FAILED:
      return updateObject(state, {
        pendingRequests: state.pendingRequests - 1,
        error: action.error,
      });
    case actionTypes.ADMIN_DELETE_USER:
      return updateObject(state, {
        users: [...state.users].filter(user => user._id !== action.id),
      });
    case actionTypes.ADMIN_EDIT_USER:
      return updateObject(state, {
        users: [...state.users].map(user => user._id === action.user._id ? action.user : user),
      });
    case actionTypes.ADMIN_CREATE_USER:
      return updateObject(state, {
        users: [...state.users, action.user]
      })
    default:
      return state;
  }
};

export default reducer;
