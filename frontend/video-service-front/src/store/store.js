import { configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';
import videoReducer from './reducers/video';

export default configureStore({
    reducer : {
        auth: authReducer,
        profile: profileReducer,
        video: videoReducer,
    },
    devTools: true,
});    