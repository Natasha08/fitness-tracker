import fetchMock from 'jest-fetch-mock';
import NutritionixAPI from '__mocks__/services/NutritionixAPI';
import FitnessAPI from '__mocks__/services/FitnessAPI';

export const mockServers = (responses={}) => {
  beforeEach(() => {
    fetchMock.mockResponse((request) => {
      if (request.url.startsWith(process.env.REACT_APP_API_BASE)) {
        return FitnessAPI(request, responses);
      }

      if (request.url.startsWith(process.env.REACT_APP_NUTRITIONIX_API_BASE)) {
        return NutritionixAPI(request, responses);
      }
    });
  });
};

