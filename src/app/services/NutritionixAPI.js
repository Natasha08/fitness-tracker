import { instantSearchResults, searchError } from 'app/reducers/nutritionix';
import { createApiService } from 'app/helpers/services';
import { INSTANT_SEARCH_ENDPOINT, INSTANT_SEARCH_URL, NATURAL_SEARCH_URL } from '__mocks__/helpers/required_keys';

export const API_VERSION = '/v2' ;

const reducerPath = 'NutritionixAPI';
const baseUrl = INSTANT_SEARCH_ENDPOINT + API_VERSION;
const tagTypes = ['nutritionix-api'];

const endpoints = {
  instantSearch: {
    url: INSTANT_SEARCH_URL,
    method: 'GET',
    params: (query) => ({params: `query=${query}`}),
    onSuccess: instantSearchResults,
    onFailure: searchError,
  },
  naturalSearch: {
    url: NATURAL_SEARCH_URL,
    method: 'POST',
    query: ({url, method}) => (query) => ({
      url,
      method,
      body: {query}
    }),
    onSuccess: instantSearchResults,
    onFailure: searchError,
  },
};

const headers = (headers) => {
  headers.set('x-app-id', process.env.REACT_APP_NUTRITIONIX_APP_ID);
  headers.set('x-app-key', process.env.REACT_APP_NUTRITIONIX_API_KEY);
  headers.set('x-remote-user-id', 0);

  return headers;
};
const baseOptions = {baseUrl, prepareHeaders: headers};

const NutritionixAPI = createApiService({
  reducerPath,
  baseOptions,
  tagTypes,
  endpoints
});

/*
  Mutation Naming (generated):
  - format: `use${endpointName}Mutation`
  - camelcase
*/

export const {useInstantSearchMutation, useNaturalSearchMutation} = NutritionixAPI;
export default NutritionixAPI;
