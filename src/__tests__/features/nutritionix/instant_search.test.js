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


describe('Instant search', () => {
  const loginResponse = {
    data: authenticatedUser
  };
  const instantSearchResponse = {
    config: {params: 'apple'},
    data: appleSearchResults
  };

  mockFitnessAPI({loginResponse});
  mockNutritionixAPI({instantSearchResponse});

  it('displays the search results', async () => {
    const initialEntries = ['/nutrition'];
    const {container} = mountApp({user: authenticatedUser}, {initialEntries});
    const searchText = 'apple';

    expect(container).toHaveTextContent('Nutrition Page');
    fillIn(screen, 'Search for Foods').with(searchText);

    await screen.findAllByText('apple');

    expectedResults.map(({food_name}) => {
      expect(container).toHaveTextContent(food_name);
    })

    expect(container).toHaveTextContent(searchText);
  });
});
