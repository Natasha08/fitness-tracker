import { urlMatchesEndpoint, respondWith } from '__mocks__/helpers/server';

const FitnessAPI = (url, responses = {}) => {
  const {login} = responses;

  if (urlMatchesEndpoint('login', url, login.params)) {
    return respondWith(login);
  }
};

export default FitnessAPI;
