import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';

import NutritionixAPIService, { useInstantSearchMutation, useNaturalSearchMutation } from 'app/services/NutritionixAPI';
import { naturalSearchExpectedResults } from '__tests__/fixtures/nutritionix/natural_search';

const search = 'apple';
const commonFoodItem = {
  food_name: 'apple',
  serving_unit: 'medium (3" dia)',
  tag_name: 'apple',
  serving_qty: 1,
  common_type: null,
  tag_id: '384',
  photo: {thumb: 'https://nix-tag-images.s3.amazonaws.com/384_thumb.jpg'},
  locale: 'en_US'
};

describe('NutritionixAPI', () => {
  beforeEach(() => {
    fetchMock.disableMocks();
  });

  afterEach(() => {
    fetchMock.enableMocks();
  });

  describe('search store dispatch', () => {
    it('hits the endpoint correctly', async () => {
      return withStore()
        .dispatch(NutritionixAPIService.endpoints.instantSearch.initiate(search))
          .then((response) => {
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
      return withStore()
        .dispatch(NutritionixAPIService.endpoints.naturalSearch.initiate(commonFoodItem.food_name))
        .then((response) => expect(_.keys(response.data)).toEqual(['foods']))
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
