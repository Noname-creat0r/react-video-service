import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import videoReducer from './reducers/video';
import playlistReducer from './reducers/playlist';
import categoryReducer from './reducers/category';
import notificationReducer from './reducers/notification';
import adminReducer from './reducers/admin';

export default configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        video: videoReducer,
        playlist: playlistReducer,
        category: categoryReducer,
        notification: notificationReducer,
        admin: adminReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ 
            serializableCheck: false })},
    devTools: true,
});    
