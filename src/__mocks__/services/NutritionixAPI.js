import { urlMatchesEndpoint, respondWith, requiredKeysPresent } from '__mocks__/helpers/server';

const NutritionixAPI = (request, responses={}) => {
  const {instantSearch={}, naturalSearch={}} = responses;

  if (urlMatchesEndpoint('instantSearch', request.url, instantSearch.params)) {
    if (requiredKeysPresent(request, 'instantSearch')) return respondWith(instantSearch);
  }

  if (urlMatchesEndpoint('naturalSearch', request.url, naturalSearch.params)) {
    if (requiredKeysPresent(request, 'naturalSearch')) return respondWith(naturalSearch);
  }
};

export default NutritionixAPI;
