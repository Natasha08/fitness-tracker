import * as keys from './required_keys';

const upperSnakeCase = (name) => _.split(_.upperCase(name), ' ').join('_');

export const urlMatchesEndpoint = (name, url, params) => {
  const endpointName = upperSnakeCase(name);
  const startsWithEndpoint = url.startsWith(keys[`${endpointName}_ENDPOINT`]);
  const endsWithEndpointOrParams = url.endsWith(keys[`${endpointName}_URL`]) || url.endsWith(params);
  return startsWithEndpoint && endsWithEndpointOrParams;
};

export const checkRequiredKeysFor = (name, response, next) => {
  const requiredKeys = keys[`${upperSnakeCase(name)}_REQUIRED_KEYS`];
  const missingKeys = _.difference(requiredKeys, _.keys(response));
  const requiredKeysPresent = _.isEmpty(missingKeys);

  if (requiredKeysPresent) return next();
  throw new Error(`Missing the following keys for ${name}: ${missingKeys}`);
};
