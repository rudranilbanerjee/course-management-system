import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import courseReducer from '../features/course/courseSlice';
import createMemberReducer from '../features/auth/createMemberSlice';
import examReducer from '../features/exam/examSlice';
import resultReducer from '../features/result/fetchResults';
import { combineReducers } from 'redux';
import createFilter from 'redux-persist-transform-filter';

// Create the root reducer
const rootReducer = combineReducers({
    auth: authReducer,
    course: courseReducer,
    createMember:createMemberReducer,
    exam: examReducer,
    results:resultReducer
});

// Create a filter for persisting only the user field within auth slice
const saveSubsetFilter = createFilter('auth', ['logged', 'data']);

// Configure persist settings
const persistConfig = {
    key: 'course-management',
    storage,
    whitelist: ['auth'], // Add reducers you want to persist
    transforms: [saveSubsetFilter], // Apply the filter
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Create a persistor
export const persistor = persistStore(store);

export default store;
