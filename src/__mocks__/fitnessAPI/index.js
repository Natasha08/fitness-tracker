import fetchMock from "jest-fetch-mock";
import login from './login';
import { failureSetup } from './required_keys';

const mockFitnessAPI = (responses={}) => {
  const {loginResponse={}} = responses;

  beforeEach(() => {
    failureSetup(login, loginResponse);
  });
};

export default mockFitnessAPI;
