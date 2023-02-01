import { updateObject } from "../../../shared/utility";

export const clearNotification = (state, action) => {
    const updatedNotifications = [...state.notifications];
    updatedNotifications.splice(action.index, 1);
    return updateObject(state, {
        notifications: updatedNotifications,
    })
};

export const clearNotifications = (state) => {
    return updateObject(state, {
        notifications: [],
    });
};