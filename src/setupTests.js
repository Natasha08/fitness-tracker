import '@testing-library/jest-dom/extend-expect';
import _ from 'lodash';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import App from 'App';
import * as mocks from '__mocks__';
import * as globalHelpers from '__tests__/helpers/global_helpers';

import rootReducer from 'app/reducers';
import FitnessAPI from 'app/services/FitnessAPI';
import NutritionixAPI from 'app/services/NutritionixAPI';

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

beforeAll(() => {
  fetchMock.enableMocks();
});

afterAll(() => {
  fetchMock.disableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

global.mountApp = (state={}, {initialEntries}={}) => (
  render(<App providedStore={withStore(state)} initialEntries={initialEntries} InitRouter={MemoryRouter}/>)
);
