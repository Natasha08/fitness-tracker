import { screen } from '@testing-library/react';
import { findByText } from '@testing-library/dom';

const user = {
  email: 'jones@example.com',
  password: 'password'
};
const token = 'token';

describe('Login', () => {
  const loginResponse = {
    data: {...user, token}
  };

  mockFitnessAPI({loginResponse});
  mountApp();

  it('logs the user in', async () => {
    fillIn({labelText: 'Enter your Email', value: user.email, screen});
    fillIn({labelText: 'Enter your Password', value: user.password, screen});

    clickOn('Login', {screen});

    const homePageText = await screen.findByText(/Welcome/i);
    expect(homePageText).toHaveTextContent(user.email);
  });

  describe('state between tests', () => {
    it('state is reset between tests', () => {
      const {container} = TestApp;
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
      fillIn({labelText: 'Enter your Email', value: unknownUser.email, screen});
      fillIn({labelText: 'Enter your Password', value: unknownUser.password, screen});

      clickOn('Login', {screen});
      const homePageText = await screen.findByText(/Error/i);
      expect(homePageText).toHaveTextContent('Error logging in, please try again');
    });
  });
});

