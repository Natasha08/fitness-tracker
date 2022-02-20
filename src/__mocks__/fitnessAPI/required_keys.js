const LOGIN_ENDPOINT = 'http://example.com';
const LOGIN_URL = 'login';
const LOGIN_REQUIRED_KEYS = ['email', 'password', 'token'];

const FAILURE_RESPONSES = {
  unauthorized: {
    status: 401,
    body: {error: 'Unauthorized'}
  }
};

export const checkRequiredKeysFor = (name, response, callback) => {
  const requiredKeys = `${_.upperCase(name)}_REQUIRED_KEYS`;
  const missingKeys = _.difference(requiredKeys, _.keys(response));
  const requiredKeysPresent = _.isEmpty(missingKeys);

  if (requiredKeysPresent) return callback();
  throw new Error(`Missing the following keys for ${endpoint}: ${missingKeys}`);
};

export const failureSetup = (endpoint, {fail=false, name, ...response}) => {
  if (!fail) return endpoint(response);

  fetchMock.mockResponse(({url}) => {
    if (url.startsWith(`${_.upperCase(name)}_ENDPOINT`) && url.endsWith(`${_.upperCase(name)}_URL`)) {
      return Promise.reject(JSON.stringify(FAILURE_RESPONSES[response.failure]));
    };
  });
};
