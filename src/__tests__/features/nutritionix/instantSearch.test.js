import { screen } from '@testing-library/react';
// import { act } from '@testing-library/react-hooks';
import { fillIn } from '__tests__/helpers/global_helpers';

const user = {
  email: 'jones@example.com',
  password: 'password'
};
const token = 'token';
const authenticatedUser = {...user, token};

describe.only('Instant search', () => {
  const loginResponse = {
    data: authenticatedUser
  };

  mockFitnessAPI({loginResponse});

  it('displays the search results', async () => {
    const initialEntries = ['/nutrition'];
    const {container} = mountApp({user: authenticatedUser}, {initialEntries});
    const searchText = 'banana';

    expect(container).toHaveTextContent('Nutrition Page');

    fillIn(screen, 'Search for Foods').with(searchText);

    console.log("SCREEN", screen);
    expect(container).toHaveTextContent(searchText);
  });
});
