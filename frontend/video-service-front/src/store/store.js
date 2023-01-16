import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import videoReducer from './reducers/video';
 
export default configureStore({
    reducer : {
        auth: authReducer,
        profile: profileReducer,
        video: videoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
    }),
    devTools: true,
});    