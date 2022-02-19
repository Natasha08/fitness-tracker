import fetchMock from "jest-fetch-mock";
import '@testing-library/jest-dom/extend-expect';

const LOGIN_REQUIRED_KEYS = ['email', 'password', 'token'];
const LOGIN_ENDPOINT ='http://example.com';
const UNAUTHORIZED = {
  status: 401,
  body: {error: 'Unauthorized'}
};
const NOT_FOUND = {
  status: 404,
  body: { error: 'Not found' }
};

export const setLoginResponse = (response) => {
  const missing_keys = _.difference(LOGIN_REQUIRED_KEYS, _.keys(response));
  const requiredKeysPresent = _.isEmpty(missing_keys);

  if (requiredKeysPresent) {
    fetchMock.mockResponse(({url}) => {
      if (url.startsWith(LOGIN_ENDPOINT) && url.endsWith('login')) {
        return Promise.resolve(JSON.stringify(response));
      };
      return Promise.reject(JSON.stringify(UNAUTHORIZED));
    });
  }
};

export const mockServer = (responses={}) => {
  const {loginResponse={}} = responses;

  beforeEach(() => {
    fetchMock.enableMocks();
    fetchMock.enableFetchMocks();

    setLoginResponse(loginResponse);
  });
};
