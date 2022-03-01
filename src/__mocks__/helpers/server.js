import * as keys from './required_keys';

const upperSnakeCase = (name) => _.split(_.upperCase(name), ' ').join('_');
const requestJson = ({body}) => !!body ? JSON.parse(body.toString()) : {};

export const respondWith = ({data, error}) => {
  if (error) {
    return Promise.reject(JSON.stringify(error));
  } else
  return Promise.resolve(JSON.stringify(data));
};

export const urlMatchesEndpoint = (name, url, params) => {
  const endpointName = upperSnakeCase(name);
  const startsWithEndpoint = url.startsWith(keys[`${endpointName}_ENDPOINT`]);
  const endsWithEndpointOrParams = url.endsWith(keys[`${endpointName}_PATH`]) || url.endsWith(params);
  return startsWithEndpoint && endsWithEndpointOrParams;
};

export const requiredKeysPresent = (request, name) => {
  const requiredKeys = keys[`${upperSnakeCase(name)}_REQUIRED_KEYS`];
  const missingKeys = _.difference(requiredKeys, _.keys(requestJson(request)));
  const requiredKeysPresent = _.isEmpty(missingKeys);

  if (requiredKeysPresent) return true;
  return Promise.reject(`Missing the following keys in the api request for ${name}: ${missingKeys}`);
};
