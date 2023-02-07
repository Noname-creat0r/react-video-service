import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    notifications: [],
};

const notificationSend = (state, action) => {
    const updatedNotifications = [...state.notifications];
    updatedNotifications.push({
        message: action.message,
        type: action.messageType,
    });
    return updateObject(state, {
        notifications: updatedNotifications,
    });
};

const notificationClose = (state, action) => {
    const updatedNotifications = [...state.notifications];
    updatedNotifications.splice(action.index, 1);
    return updateObject(state, {
        notifications: updatedNotifications,
    })
};

const notificationCloseAll = (state) => {
    return updateObject(state, {
        notifications: [],
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
       case actionTypes.NOTIFICATION_SEND: return notificationSend(state, action);
       case actionTypes.NOTIFICATION_CLOSE: return notificationClose(state, action);
       case actionTypes.NOTIFICATION_CLOSE_ALL: return notificationCloseAll(state);
       default: return state; 
    }
}

export default reducer;