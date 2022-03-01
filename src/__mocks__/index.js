import fetchMock from 'jest-fetch-mock';
import NutritionixAPI from '__mocks__/services/NutritionixAPI';
import FitnessAPI from '__mocks__/services/FitnessAPI';

export const mockServers = (responses={}) => {
  beforeEach(() => {
    fetchMock.mockResponse(({url}) => {
      if (url.startsWith(process.env.REACT_APP_API_BASE)) {
        return FitnessAPI(url, responses);
      }

      if (url.startsWith(process.env.REACT_APP_NUTRITIONIX_API_BASE)) {
        return NutritionixAPI(url, responses);
      }
    });
  });
};

