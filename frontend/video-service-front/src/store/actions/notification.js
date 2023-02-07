import * as actionTypes from '../actions/actionTypes';

export const notificationSend = (message, messageType) => {
    return { 
        type: actionTypes.NOTIFICATION_SEND,
        message: message,
        messageType: messageType,
    }
};

export const notificationClose = (id) => {
    return { type: actionTypes.NOTIFICATION_CLOSE, index: id }
};

export const notificationCloseAll = () => {
    return { type: actionTypes.NOTIFICATION_CLOSE_ALL }
};