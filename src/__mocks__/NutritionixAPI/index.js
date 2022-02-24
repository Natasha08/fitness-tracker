import instantSearch from './instantSearch';

const mockNutritionixAPI = (responses={}) => {
  const {instantSearchResponse={}} = responses;

  beforeEach(() => {
    instantSearch(instantSearchResponse);
  });
};

export default mockNutritionixAPI;
