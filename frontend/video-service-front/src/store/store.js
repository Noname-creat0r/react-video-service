import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import videoReducer from './reducers/video';
import { watchAuth, watchProfile, watchVideo } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        video: videoReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
    },
    devTools: true,
});    

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchProfile);
sagaMiddleware.run(watchVideo);