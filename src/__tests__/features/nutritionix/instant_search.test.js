import { screen } from '@testing-library/react';
import { fillIn } from '__tests__/helpers/global_helpers';
import { appleSearchResults } from '__tests__/fixtures/instant_search';

const user = {
  email: 'jones@example.com',
  password: 'password'
};
const token = 'token';
const authenticatedUser = {...user, token};
const expectedResults = _.flatten([...appleSearchResults.common, ...appleSearchResults.branded]);
const searchText = 'apple';

describe('Instant search', () => {
  const loginResponse = {
    data: authenticatedUser
  };
  const instantSearchResponse = {
    config: {params: searchText},
    data: appleSearchResults
  };

  mockFitnessAPI({loginResponse});
  mockNutritionixAPI({instantSearchResponse});

  it('displays the search results', async () => {
    const initialEntries = ['/nutrition'];
    const {container} = mountApp({user: authenticatedUser}, {initialEntries});

    expect(container).toHaveTextContent('Nutrition Page');
    fillIn(screen, 'Search for Foods').with(searchText);

    await screen.findAllByText(searchText);

    expectedResults.map(({food_name}) => {
      expect(container).toHaveTextContent(food_name);
    })

    expect(container).toHaveTextContent(searchText);
  });
});
