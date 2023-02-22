import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import videoReducer from './reducers/video';
import playlistReducer from './reducers/playlist';
import notificationReducer from './reducers/notification';
import adminReducer from './reducers/admin';
import { watchAuth, watchProfile,
     watchVideo, watchPlaylist, watchAdmin } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        video: videoReducer,
        playlist: playlistReducer,
        notification: notificationReducer,
        admin: adminReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ 
            thunk: false, 
            serializableCheck: false }).prepend(sagaMiddleware);
    },
    devTools: true,
});    

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchProfile);
sagaMiddleware.run(watchVideo);
sagaMiddleware.run(watchPlaylist);
sagaMiddleware.run(watchAdmin);