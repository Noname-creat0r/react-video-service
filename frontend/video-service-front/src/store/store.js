import { configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import profileReducer from './reducers/profile';

export default configureStore({
    reducer : {
        auth: authReducer,
        profile: profileReducer,
    },
    devTools: true,
});    