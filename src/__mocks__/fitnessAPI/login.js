import fetchMock from "jest-fetch-mock";
import '@testing-library/jest-dom/extend-expect';
import { checkRequiredKeysFor } from './required_keys';

const LOGIN_ENDPOINT ='http://example.com';
const UNAUTHORIZED = {
  status: 401,
  body: {error: 'Unauthorized'}
};

const login = ({data}) => {
  checkRequiredKeysFor('login', data, () => {
    fetchMock.mockResponse(({url}) => {
      if (url.startsWith(LOGIN_ENDPOINT) && url.endsWith('login')) {
        return Promise.resolve(JSON.stringify(data));
      };
    });
  })
};

export default login;
