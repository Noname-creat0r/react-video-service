import axios from 'axios';
import * as actionTypes from './actionTypes';

export const fetchStart = label => ({
  type: actionTypes.FETCH_STARTED,
  payload: label,
});

export const fetchFinish = (label) => ({
  type: actionTypes.FETCH_FINISHED,
  payload: label,
});

export const fetchError = error => ({
  type: actionTypes.FETCH_FAILED,
  error,
});

export const fetchSucceeded = label => ({
  type: actionTypes.FETCH_SUCCEEDED,
  payload: label,
});

function fetchAction({
    url = "",
    method = "GET",
    data = null,
    onSuccess = () => {},
    onFailure = () => {},
    label = ""
  }) {
    return {
      //type: actionTypes.FETCH_STARTED,
      payload: {
        url,
        method,
        data,
        onSuccess,
        onFailure,
        label
      }
    };
};

export const fetchRequest = (payload) => {
  return dispatch => {
   const {
    url,
    method,
    data,
    accessToken,
    onStart,
    onSuccess,
    onFailure,
    label,
    headers,
  } = payload;

  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  //axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
  axios.defaults.headers.common["Content-Type"]="application/json";   

  dispatch(onStart());

  return axios
    .request({
        url,
        method,
        headers,
        [dataOrParams]: data
    })
    .then(({ data }) => {
        dispatch(onSuccess(data));
    })
    .catch(error => {
        //dispatch(apiError(error));
        dispatch(onFailure(error));

    })
    .finally(() => {
        //dispatch(apiEnd(label));
    });
  }
};