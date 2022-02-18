import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {fitnessApiPath, fitnessApiReducer, fitnessApimiddleware} from './services/fitnessApi';
import userReducer from './reducers/user';

const store = configureStore({
  reducer: {
    [fitnessApiPath]: fitnessApiReducer,
    user: userReducer
  },
  middleware: (gDM) =>
    gDM().concat(fitnessApimiddleware),
});

setupListeners(store.dispatch);

export default store;