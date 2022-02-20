import '@testing-library/jest-dom/extend-expect';
import _ from 'lodash';
import fetchMock from "jest-fetch-mock";
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { App } from './App';
import * as mocks from './__mocks__';
import * as globalHelpers from './__mocks__/helpers/global_helpers';

import userReducer from './app/reducers/user';
import { fitnessApiPath, fitnessApiReducer, fitnessApiMiddleware } from './app/services/fitnessApi';

const rootReducer = combineReducers({
  [fitnessApiPath]: fitnessApiReducer,
  user: userReducer
});

global.withStore = (preloadedState={}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (gDM) => (
      gDM({serializableCheck: false})
        .concat(fitnessApiMiddleware)
    )
  });
  setupListeners(store.dispatch);
  return store;
};

global._ = global._ || _;

_.assign(global, mocks);
_.assign(global, globalHelpers);

beforeEach(() => {
  fetchMock.enableMocks();
});

afterEach(() => {
  fetchMock.disableMocks();
});

global.mountApp = (state={}) => {
  const store = withStore(state);

  const DefaultApp = (
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
  return render(DefaultApp);
}
