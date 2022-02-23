import { nutritionixSearchResults, searchError } from 'app/reducers/nutritionix';
import { createApiService } from 'app/helpers/services';

export const API_VERSION = '/v2' ;

const reducerPath = 'NutritionixAPI';
const baseUrl = process.env.REACT_APP_NUTRITIONIX_API_BASE + API_VERSION;
const tagTypes = ['nutritionix-api'];

const endpoints = {
  instantSearch: {
    url: 'search/instant',
    method: 'GET',
    query: ({url, method}) => (search) => ({
      url,
      method,
      params: `query=${search}`
    }),
    onSuccess: nutritionixSearchResults,
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

export const {useInstantSearchMutation} = NutritionixAPI;
export default NutritionixAPI;
