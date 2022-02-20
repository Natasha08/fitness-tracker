import React from 'react';
import { screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { findByText } from '@testing-library/dom';

import { App } from '../App';

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
  const app = (
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
  mountApp(app);

  it('logs the user in', async () => {
    const {container} = TestApp;

    fillIn({labelText: 'Enter your Email', value: user.email, screen});
    fillIn({labelText: 'Enter your Password', value: user.password, screen});

    clickOn('Login', {screen});

    const homePageText = await findByText(container, /Welcome/i);
    expect(homePageText).toHaveTextContent(user.email);
  });

  describe('state between tests', () => {
    it('state is reset between tests', () => {
      const { container } = TestApp;
      expect(container.textContent).toContain('Fitness');
      expect(container.textContent).not.toContain(user.email);
    });
  });

  describe('unauthorized user', () => {
    const unknownUser = {
      email: 'unknown@example.com',
      password: 'password'
    };

    mockFitnessAPI({
      loginResponse: {
        config: {name: 'login', failure: 'unauthorized'},
        data: unknownUser
      }
    });

    it('displays an error message on login attempt', async () => {
      const {container} = TestApp;

      fillIn({labelText: 'Enter your Email', value: unknownUser.email, screen});
      fillIn({labelText: 'Enter your Password', value: unknownUser.password, screen});

      clickOn('Login', {screen});
      const homePageText = await findByText(container, /Error/i);
      expect(homePageText).toHaveTextContent('Error logging in, please try again');
    });
  });
});

