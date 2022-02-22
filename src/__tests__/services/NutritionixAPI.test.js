import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';

import NutritionixAPIService, { useInstantSearchMutation } from '../../app/services/NutritionixAPI';

const search = 'banana';

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
      const bananaFoodItem = _.first(responseData.common);

      expect(bananaFoodItem).toEqual({
        food_name: 'banana',
        serving_unit: 'medium (7" to 7-7/8" long)',
        tag_name: 'banana',
        serving_qty: 1,
        common_type: null,
        tag_id: '399',
        photo: {
          thumb: 'https://nix-tag-images.s3.amazonaws.com/399_thumb.jpg',
        },
        locale: 'en_US'
      });
    });
  });
});
