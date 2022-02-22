import { screen } from '@testing-library/react';
import { fillIn } from '__tests__/helpers/global_helpers';

const user = {
  email: 'jones@example.com',
  password: 'password'
};
const token = 'token';
const authenticatedUser = {...user, token};

describe('Login', () => {
  const loginResponse = {
    data: authenticatedUser
  };

  mockFitnessAPI({loginResponse});

  it('logs the user in', async () => {
    mountApp();

    fillIn(screen, 'Enter your Email').with(user.email);
    fillIn(screen, 'Enter your Password').with(user.password);

    clickOn(screen, 'Login');

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

    mockFitnessAPI({
      loginResponse: {
        config: {failure: 'unauthorized'},
        data: unknownUser
      }
    });

    it('displays an error message on login attempt', async () => {
      mountApp();

      fillIn(screen, 'Enter your Email').with(unknownUser.email);
      fillIn(screen, 'Enter your Password').with(unknownUser.password);

      clickOn(screen, 'Login');
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
