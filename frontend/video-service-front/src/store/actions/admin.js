import axios from '../../axios-settings';
import * as actionTypes from './actionTypes';
import * as actions from './index';

export const adminFetchProfiles = (token) => {
    return dispatch => {
        dispatch({type: actionTypes.ADMIN_FETCH_PROFILES_START});
        return axios
            .get(
                '/user/all',
                { headers: {'Authorization': token} }
            )
            .then(response => {
                dispatch({
                    type: actionTypes.ADMIN_FETCH_PROFILES_SUCCESS,
                    users: response.data.users
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.ADMIN_FETCH_PROFILES_FAILED,
                    error: error.response.data.message,
                });
            });
    };
};

export const adminFetchVideos = () => {
     };

export const adminCreateUser = (payload) => {
  return dispatch => {
    return axios
      .post(
        '/user',
         {...payload},
         { headers: { 
          'Authorization': payload.token, 
          'Content-Type': 'multipart/form-data'}} 
      )
      .then(response => {
        dispatch({
          type: actionTypes.ADMIN_CREATE_USER,
          user: response.data.user
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export const adminEditUser = (payload) => {
  return dispatch => {
    return axios
      .put(
        '/user', 
        {...payload},
        { headers: { 
          'Authorization': payload.token, 
          'Content-Type': 'multipart/form-data'}}
      )
      .then(response => {
        dispatch({
          type: actionTypes.ADMIN_EDIT_USER,
          user: response.data.user
        }) 
      })
      .catch(error => console.log(error))
  }  
}

export const adminDeleteUser = (payload) => {
  return dispatch => {
    return axios
      .delete(
        '/user', 
        { 
          params: {
            userId: payload.userId,
            token: payload.token
          },
          headers: { 'Authorization': payload.token } 
        }
      )
      .then(response => {
        dispatch({
          type: actionTypes.ADMIN_DELETE_USER,
          id: response.data.id
        }) 
      })
      .catch(error => console.log(error))
  }
}
