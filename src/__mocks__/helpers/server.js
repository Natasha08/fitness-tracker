import fetchMock from "jest-fetch-mock";
import * as keys from "./required_keys";

const FAILURE_RESPONSES = {
  unauthorized: {
    status: 401,
    body: {error: 'Unauthorized'}
  }
};

export const checkRequiredKeysFor = (name, response, callback) => {
  const requiredKeys = keys[`${_.upperCase(name)}_REQUIRED_KEYS`];
   const missingKeys = _.difference(requiredKeys, _.keys(response));
  const requiredKeysPresent = _.isEmpty(missingKeys);

  if (requiredKeysPresent) return callback();
  throw new Error(`Missing the following keys for ${name}: ${missingKeys}`);
};

export const mockFailure = (name, failure) => {
  fetchMock.mockReject(({url}) => {
    if (url.startsWith(keys[`${_.upperCase(name)}_ENDPOINT`]) && url.endsWith(keys[`${_.upperCase(name)}_URL`])) {
      return Promise.reject(JSON.stringify(FAILURE_RESPONSES[failure]));
    };
  });
};

export const mockSuccess = (name, data) => {
  fetchMock.mockResponse(({url}) => {
    if (url.startsWith(keys[`${_.upperCase(name)}_ENDPOINT`]) && url.endsWith(keys[`${_.upperCase(name)}_URL`])) {
      return Promise.resolve(JSON.stringify(data));
    };
  });
};
