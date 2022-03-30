import { screen } from '@testing-library/react';
import { mockServers } from '__mocks__';

const user = {
  email: 'jones@example.com',
  password: 'password'
};
const token = 'token';
const authenticatedUser = {...user, token};

describe('Login', () => {
  const login = {data: authenticatedUser};

  mockServers({login});

  it('logs the user in', async () => {
    mountApp();

    fillIn('Enter your Email').with(user.email);
    fillIn('Enter your Password').with(user.password);

    clickOn('Login');

    const homePageText = await screen.findByText(/Welcome/i);
    expect(homePageText).toHaveTextContent(user.email);
  });

  describe('state between tests', () => {
    it('state is reset between tests', () => {
      const {container} = mountApp();
      expect(container.textContent).toContain('Fitness Tracker');
      expect(container.textContent).toContain('Enter your Email');
      expect(container.textContent).not.toContain(user.email);
      expect(container.textContent).not.toContain('Error logging in, please try again');
    });
  });

  describe('unauthorized user', () => {
    const unknownUser = {
      email: 'unknown@example.com',
      password: 'password'
    };

    mockServers({login: {error: 'unauthorized', data: unknownUser}});

    it('displays an error message on login attempt', async () => {
      mountApp();

      fillIn('Enter your Email').with(unknownUser.email);
      fillIn('Enter your Password').with(unknownUser.password);

      clickOn('Login');

      const homePageText = await screen.findByText(/Error/i);
      expect(homePageText).toHaveTextContent('Error logging in, please try again');
    });
  });

  describe('user already logged in', () => {
    const userData = {
      email: 'sam@example.com',
      password: 'password',
      token: 'token'
    };

    it('displays the welcome message', async() => {
      mountApp({user: userData});
      const homePageText = await screen.findByText(/Welcome/i);
      expect(homePageText).toHaveTextContent(userData.email);
    });
  });
});
