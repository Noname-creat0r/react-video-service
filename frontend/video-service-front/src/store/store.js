import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools  } from '@reduxjs/toolkit/dist/devtoolsExtension';
import authReducer from './reducers/auth';

export default configureStore({
    reducer : {
        auth: authReducer,
    },
});