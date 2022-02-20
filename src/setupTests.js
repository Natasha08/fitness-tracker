import '@testing-library/jest-dom/extend-expect';
import _ from 'lodash';
import fetchMock from "jest-fetch-mock";
import * as mocks from './__mocks__';
import * as globalHelpers from './__mocks__/helpers/global_helpers';
import store from './app/store';
import { APP_RESET } from './app/reducers/user';

global._ = global._ || _;
global.store = store;

_.assign(global, mocks);
_.assign(global, globalHelpers);

beforeEach(() => {
  fetchMock.enableMocks();
  store.dispatch(APP_RESET());
});

afterEach(() => {
  fetchMock.disableMocks();
});
