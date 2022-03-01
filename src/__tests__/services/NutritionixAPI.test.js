import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';

import { appleSearchResults } from '__tests__/fixtures/nutritionix/instant_search';
import { naturalSearchExpectedResults, appleResults } from '__tests__/fixtures/nutritionix/natural_search';
import { INSTANT_SEARCH_PATH } from '__mocks__/helpers/required_keys';
import NutritionixAPIService, { useInstantSearchMutation, useNaturalSearchMutation, API_VERSION } from 'app/services/NutritionixAPI';

const search = 'apple';
const commonFoodItem = {
  'food_name': 'apple',
  'serving_unit': 'medium (3" dia)',
  'tag_name': 'apple',
  'serving_qty': 1,
  'common_type': null,
  'tag_id': '384',
  'photo': {'thumb': 'https://nix-tag-images.s3.amazonaws.com/384_thumb.jpg'},
  'locale': 'en_US'
};

describe('NutritionixAPI', () => {
  const instantSearch = {
    params: search,
    data: appleSearchResults
  };
  const naturalSearch = {
    data: appleResults
  };
  mockServers({naturalSearch, instantSearch});

  describe('search store dispatch', () => {
    it('hits the endpoint correctly', async () => {
      return withStore()
        .dispatch(NutritionixAPIService.endpoints.instantSearch.initiate(search))
          .then((response) => {
            const {method, headers, url} = fetchMock.mock.calls[0][0];
            const baseUrl = process.env.REACT_APP_NUTRITIONIX_API_BASE;
            const path = `${API_VERSION}/${INSTANT_SEARCH_PATH}?query=${search}`;

            expect(headers.get('x-app-id')).toBe(process.env.REACT_APP_NUTRITIONIX_APP_ID);
            expect(headers.get('x-app-key')).toBe(process.env.REACT_APP_NUTRITIONIX_API_KEY);
            expect(headers.get('x-remote-user-id')).toBe('0');
            expect(method).toBe('GET');
            expect(url).toBe(baseUrl + path);
            expect(_.keys(response.data)).toEqual(['common', 'branded']);
          });
    });
  });

  describe('instant search mutation', () => {
    it('responds with the correct data', async () => {
      const wrapper = ({children}) => {
        return <Provider store={withStore()}>{children}</Provider>;
      };

      const {result, waitForNextUpdate} = renderHook(() => useInstantSearchMutation(), {wrapper});
      const [instantSearch] = result.current;

      act(() => void instantSearch(search));

      await waitForNextUpdate({timeout: 2000});

      const responseData = _.get(result, 'current[1].data');
      expect(responseData).not.toBeUndefined();
      expect(_.keys(responseData)).toEqual(['common', 'branded']);
      const appleFoodItem = _.first(responseData.common);
      expect(appleFoodItem).toEqual(commonFoodItem);
    });
  });

  describe('natural language mutation', () => {
    it('hits the endpoint correctly', async () => {
      const search = {query: commonFoodItem.food_name};
      return withStore()
        .dispatch(NutritionixAPIService.endpoints.naturalSearch.initiate(search))
        .then((response) => {
          const {method, headers, body, url} = fetchMock.mock.calls[0][0];

          expect(headers.get('x-app-id')).toBe(process.env.REACT_APP_NUTRITIONIX_APP_ID);
          expect(headers.get('x-app-key')).toBe(process.env.REACT_APP_NUTRITIONIX_API_KEY);
          expect(headers.get('x-remote-user-id')).toBe('0');
          expect(method).toBe('POST');
          expect(JSON.parse(body)).toEqual(search);

          expect(_.keys(response.data)).toEqual(['foods']);
        });
    });

    it('responds with the correct data', async () => {
      const wrapper = ({children}) => (
        <Provider store={withStore()}>{children}</Provider>
      );

      const {result, waitForNextUpdate} = renderHook(() => useNaturalSearchMutation(), {wrapper});
      const [naturalSearch] = result.current;

      act(() => void naturalSearch(commonFoodItem.food_name));

      await waitForNextUpdate({timeout: 2000});

      const responseData = _.get(result, 'current[1].data');
      expect(responseData).not.toBeUndefined();
      const appleFoodItem = _.first(responseData.foods);
      expect(appleFoodItem).toEqual(expect.objectContaining(naturalSearchExpectedResults[0]));
    });
  });
});
