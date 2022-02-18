import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {reducerPath, reducer, middleware} from './services/user';

const store = configureStore({
  reducer: {
    [reducerPath]: reducer,
  },
  middleware: (gDM) =>
    gDM().concat(middleware),
});

setupListeners(store.dispatch);

export default store;
