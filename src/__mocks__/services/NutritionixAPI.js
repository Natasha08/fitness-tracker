import { urlMatchesEndpoint, respondWith } from '__mocks__/helpers/server';

const NutritionixAPI = (url, responses={}) => {
  const {instantSearch={}, naturalSearch={}} = responses;

  if (urlMatchesEndpoint('instantSearch', url, instantSearch.params)) {
    return respondWith(instantSearch);
  }

  if (urlMatchesEndpoint('naturalSearch', url, naturalSearch.params)) {
    return respondWith(naturalSearch);
  }
};

export default NutritionixAPI;
