import {configureStore } from '@reduxjs/toolkit'

import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware();
    },
    devTools: true,
});

export default store;