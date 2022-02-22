import { loggedIn, loginError } from 'app/reducers/user';
import { createApiService } from 'app/helpers/services';

export const API_VERSION = '/api/v1';

const reducerPath = 'FitnessAPI';
const baseUrl = `${process.env.REACT_APP_API_BASE}${API_VERSION}`;
const tagTypes = ['user-auth'];

const endpoints = {
  login: {
    url: 'login',
    method: 'POST',
    onSuccess: loggedIn,
    onFailure: loginError
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
