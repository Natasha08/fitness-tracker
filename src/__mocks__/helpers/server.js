import fetchMock from 'jest-fetch-mock';
import * as keys from './required_keys';

const FAILURE_RESPONSES = {
  unauthorized: {
    status: 401,
    body: {error: 'Unauthorized'}
  }
};
const upperSnakeCase = (name) => _.split(_.upperCase(name), ' ').join('_');

const urlMatchesEndpoint = (url, name, params) => {
  const endpointName = upperSnakeCase(name);
  const startsWithEndpoint = url.startsWith(keys[`${endpointName}_ENDPOINT`]);
  const endsWithEndpointOrParams = url.endsWith(keys[`${endpointName}_URL`]) || url.endsWith(params);

  return startsWithEndpoint && endsWithEndpointOrParams;
};

export const checkRequiredKeysFor = (name, response, callback) => {
  const requiredKeys = keys[`${_.upperCase(name)}_REQUIRED_KEYS`];
   const missingKeys = _.difference(requiredKeys, _.keys(response));
  const requiredKeysPresent = _.isEmpty(missingKeys);

  if (requiredKeysPresent) return callback();
  throw new Error(`Missing the following keys for ${name}: ${missingKeys}`);
};

export const mockFailure = (name, failure, params) => {
  fetchMock.mockReject(({url}) => {
    if (urlMatchesEndpoint(url, name, params)) {
      return Promise.reject(JSON.stringify(FAILURE_RESPONSES[failure]));
    }
  });
};

export const mockSuccess = (name, data, params) => {
  fetchMock.mockResponse(({url}) => {
    if (urlMatchesEndpoint(url, name, params)) {
      return Promise.resolve(JSON.stringify(data));
    }
  });
};
