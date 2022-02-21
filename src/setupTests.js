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
import { FitnessAPIPath, FitnessAPIReducer, FitnessAPIMiddleware } from './app/services/FitnessAPI';

const rootReducer = combineReducers({
  [FitnessAPIPath]: FitnessAPIReducer,
  user: userReducer
});

global.withStore = (preloadedState={}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (gDM) => (
      gDM({serializableCheck: false})
        .concat(FitnessAPIMiddleware)
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

global.mountApp = (state={}) => (
  render(
    <Provider store={withStore(state)}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  )
);
