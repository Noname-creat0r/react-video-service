import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import videoReducer from './reducers/video';
 
const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        video: videoReducer,
    },
    middleware: [ (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
    }), sagaMiddleware()],
    devTools: true,
});    