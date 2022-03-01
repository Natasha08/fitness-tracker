import { urlMatchesEndpoint, respondWith, requiredKeysPresent } from '__mocks__/helpers/server';

const FitnessAPI = (request, responses = {}) => {
  const {login} = responses;

  if (urlMatchesEndpoint('login', request.url, login.params)) {
    if (requiredKeysPresent(request, 'login')) {
      return respondWith(login);
    }
  }
};

export default FitnessAPI;
