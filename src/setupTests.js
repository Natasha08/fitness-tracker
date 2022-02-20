import '@testing-library/jest-dom/extend-expect';
import _ from 'lodash';
import fetchMock from "jest-fetch-mock";
import * as mocks from './__mocks__';
import * as globalHelpers from './__mocks__/helpers/global_helpers';

global._ = global._ || _;
_.assign(global, mocks);
_.assign(global, globalHelpers);

beforeEach(() => {
  fetchMock.enableMocks();
});
