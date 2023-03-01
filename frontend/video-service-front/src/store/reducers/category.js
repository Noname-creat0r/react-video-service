import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    pedndingRequests: 0,
    categories: [],
};

const categoryFetchStart = (state, action) => {
    return updateObject(state, {
        fetching: true,
        pendingRequests: state.pendingRequests + 1,
    });
};

const categoryFetchFailed = (state, action) => {
    return updateObject(state, {
        fetching: true,
        pendingRequests: state.pendingRequests - 1,
    });
};


const categoryFetchSuccess = (state, action) => {
    return updateObject(state, {
        fetching: false,
        //pendingRequests: state.pendingRequests - 1,
        categories: action.categories,
    });
};

const categoryUploadSuccess = (state, action) => {
    return updateObject(state, {
        categories: [...state.categories, action.category]
    });
};

const categoryDeleteSuccess = (state, action) => {
    return updateObject(state, { 
        categories: state.categories.filter(category => category._id !== action.id) 
    });
};

const categoryEditSuccess = (state, action) => {
    const updCategories =  [...state.categories];
    const categoryId = updCategories.findIndex(category => category._id === action.category._id);
    updCategories[categoryId] = action.category;
    return updateObject(state, { categories: updCategories })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CATEGORY_FETCH_SUCCESS: return categoryFetchSuccess(state, action);
        case actionTypes.CATEGORY_UPLOAD_SUCCESS: return categoryUploadSuccess(state, action);
        case actionTypes.CATEGORY_UPLOAD_FAILED: return state;
        case actionTypes.CATEGORY_DELETE_SUCCESS: return categoryDeleteSuccess(state, action);
        case actionTypes.CATEGORY_DELETE_FAILED: return state;
        case actionTypes.CATEGORY_EDIT_SUCCESS: return categoryEditSuccess(state, action);
        case actionTypes.CATEGORY_EDIT_FAILED: return state;
        default: return state; 
    }
}

export default reducer;