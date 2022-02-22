import '@testing-library/jest-dom/extend-expect';
import _ from 'lodash';
import fetchMock from 'jest-fetch-mock';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { App } from './App';
import * as mocks from './__mocks__';
import * as globalHelpers from './__tests__/helpers/global_helpers';

import { rootReducer } from './app/store';
import FitnessAPI from './app/services/FitnessAPI';
import NutritionixAPI from './app/services/NutritionixAPI';

global.withStore = (preloadedState={}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (gDM) => (
      gDM({serializableCheck: false})
        .concat(FitnessAPI.middleware)
        .concat(NutritionixAPI.middleware)
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
