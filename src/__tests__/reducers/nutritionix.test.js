import reducer from 'app/reducers/nutritionix';
import { appleSearchResults, expectedResults } from '__tests__/fixtures/nutritionix/instant_search';
import { appleResults, naturalSearchExpectedResults } from '__tests__/fixtures/nutritionix/natural_search';
import { instantSearchResults, naturalSearchResults } from  'app/reducers/nutritionix';

describe('Nutritionix Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  describe("Instant Search", () => {
    it('should return instant search results', () => {
      const action = instantSearchResults(appleSearchResults);
      expect(reducer(undefined, action)).toEqual({instantSearch: expectedResults});
    });

    it('works with plain actions', () => {
      const action = {type: 'nutritionix/instantSearchResults', payload: appleSearchResults};
      expect(reducer(undefined, action)).toEqual({instantSearch: expectedResults});
    });

    it('should return previous state', () => {
      const action = instantSearchResults(appleSearchResults);
      const previousState = {naturalSearch: [{food_name: 'banana'}]};
      expect(reducer(previousState, action)).toEqual({...previousState, instantSearch: expectedResults});
    });
  });

  describe("Natural Search", () => {
    it('should return instant search results', () => {
      const action = naturalSearchResults(appleResults);

      expect(reducer(undefined, action)).toEqual({naturalSearch: naturalSearchExpectedResults});
    });

    it('works with plain actions', () => {
      const action = {type: 'nutritionix/naturalSearchResults', payload: appleResults};
      expect(reducer(undefined, action)).toEqual({naturalSearch: naturalSearchExpectedResults});
    });

    it('should return previous state', () => {
      const action = naturalSearchResults(appleResults);
      const previousState = {instantSearch: [{food_name: 'apple'}]};
      expect(reducer(previousState, action)).toEqual({...previousState, naturalSearch: naturalSearchExpectedResults});
    });
  });
});
