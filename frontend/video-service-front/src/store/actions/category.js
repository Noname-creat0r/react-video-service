import * as actionTypes from './actionTypes';
import * as actions from './index';
import axios from '../../axios-settings';

export const categoryFetch = () => {
    return dispatch => {
        dispatch({ type: actionTypes.CATEGORY_FETCH_START });
        return axios
            .get('/category')
            .then(response => {
                dispatch({
                    type: actionTypes.CATEGORY_FETCH_SUCCESS,
                    categories: response.data.categories,
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.CATEGORY_FETCH_FAILED,
                    error: error.response.data.message,
                })
            });
    }
};

export const categoryUpload = (payload) => {
    return dispatch => {
        return axios
            .post(
                '/category',
                {   
                    categoryId: payload.categoryId ,
                    title: payload.title,
                }, { headers: { 'Authorization': payload.token, } }
            )
            .then(response => {
                dispatch({
                    type: actionTypes.CATEGORY_UPLOAD_SUCCESS,
                    category: response.data.category,
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.CATEGORY_UPLOAD_FAILED,
                });
            });
    };
};

export const categoryEdit = (payload) => {
    return dispatch => {
        return axios
            .put(
                '/category',
                {   
                    categoryId: payload.categoryId ,
                    title: payload.title,
                }, { headers: { 'Authorization': payload.token, } }
            )
            .then(response => {
                dispatch({
                    type: actionTypes.CATEGORY_EDIT_SUCCESS,
                    category: response.data.category,
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.CATEGORY_EDIT_FAILED,
                });
            });
    };
};

export const categoryDelete = (payload) => {
    return dispatch => {
        return axios
            .delete(
                '/category',
                { 
                    params: { categoryId: payload.categoryId },
                    headers: { 'Authorization': payload.token, } 
                }
            )
            .then(response => {
                dispatch({
                    type: actionTypes.CATEGORY_DELETE_SUCCESS,
                    id: payload.categoryId,
                });
            })
            .catch(error => {
                dispatch({
                    type: actionTypes.CATEGORY_DELETE_FAILED,
                });
            });
    };
};