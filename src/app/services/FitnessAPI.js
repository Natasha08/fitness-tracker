import { loggedIn } from 'app/reducers/user';
import { createApiService } from 'app/helpers/services';
import { LOGIN_ENDPOINT, LOGIN_PATH } from '__mocks__/helpers/required_keys';
export const API_VERSION = '/api/v1';

const reducerPath = 'FitnessAPI';
const baseUrl = `${LOGIN_ENDPOINT}${API_VERSION}`;
const tagTypes = ['user-auth'];

const endpoints = {
  login: {
    url: LOGIN_PATH,
    method: 'POST',
    onSuccess: loggedIn
  },
};

const FitnessAPI = createApiService({
  reducerPath,
  baseOptions: {baseUrl},
  tagTypes,
  endpoints
});

/*
  Mutation Naming (generated):
  - format: `use${endpointName}Mutation`
  - camelcase
*/

export const {useLoginMutation} = FitnessAPI;

export default FitnessAPI;
