import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, PERSIST, REGISTER } from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import userReducer from './reducers/user';
import {fitnessApiPath, fitnessApiReducer, fitnessApiMiddleware} from './services/fitnessApi';

const rootReducer = combineReducers({
  [fitnessApiPath]: fitnessApiReducer,
  user: userReducer
});

const persistConfig = {
  key: 'root',
  storage: storage('Fitness-Tracker-development'),
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => (
    gDM({serializableCheck: {ignoredActions: [PERSIST, REGISTER]}})
    .concat(fitnessApiMiddleware)
  )
});
setupListeners(store.dispatch);

export default store;
