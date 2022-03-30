import { screen, waitFor } from '@testing-library/react';
import { mockServers } from '__mocks__';
import { appleSearchResults, expectedResults } from '__tests__/fixtures/nutritionix/instant_search';
import { appleFoodItem, appleResults } from '__tests__/fixtures/nutritionix/natural_search';

const user = {
  email: 'jones@example.com',
  password: 'password'
};
const token = 'token';
const authenticatedUser = {...user, token};
const searchText = 'apple';
const initialEntries = ['/nutrition'];

describe('The Nutrition Page', () => {
  const login = {
    data: authenticatedUser
  };
  const instantSearch = {
    params: searchText,
    data: appleSearchResults
  };
  const naturalSearch = {
    data: appleResults
  };

  mockServers({login, naturalSearch, instantSearch});

  it('selects the food item', async () => {
    const {container} = mountApp({user: authenticatedUser}, {initialEntries});

    expect(container).toHaveTextContent('Nutrition Page');
    fillIn('Search for Foods').with(searchText);

    await screen.findAllByText(searchText);

    expectedResults.forEach(({food_name}) => {
      expect(container).toHaveTextContent(food_name);
    });
  });

  it('selects the food item', async () => {
    const {container} = mountApp({user: authenticatedUser}, {initialEntries});

    fillIn('Search for Foods').with(searchText);
    await waitFor(() => expect(container).toHaveTextContent(searchText));

    const foodItem = _.first(expectedResults);

    clickOn(foodItem.food_name);
    await waitFor(() => expect(container).toHaveTextContent('Total'));

    expect(container).toHaveTextContent(appleFoodItem.food_name);
    expect(container).toHaveTextContent(appleFoodItem.nf_calories);
    expect(container).toHaveTextContent(appleFoodItem.nf_total_fat);
    expect(container).toHaveTextContent(appleFoodItem.nf_total_carbohydrate);
  });
});
