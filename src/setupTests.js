import '@testing-library/jest-dom/extend-expect';
import _ from 'lodash';
import fetchMock from "jest-fetch-mock";
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';

import { App } from './App';
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

const DEFAULT_APP = (
  <Provider store={store}>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </Provider>
);

global.mountApp = (app=DEFAULT_APP) => {
  beforeEach(() => {
    global.TestApp = render(app);
  });

  afterEach(() => {
    if (!_.isEmpty(global.TestApp)) {
      const {container} = TestApp;
      unmountComponentAtNode(container);
      container.remove();
      global.TestApp = undefined;
    }
  });
}
