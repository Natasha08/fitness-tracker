import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { findByText } from '@testing-library/dom'

import { App } from '../App';

const user = {
  email: 'jones@example.com',
  password: 'password'
};
const token = 'token';

describe('Login', () => {
  const loginResponse = {
    name: 'login',
    data: {...user, token}
  };
  mockFitnessAPI({loginResponse});
  const { container } = render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  it('logs the user in', async () => {
    fillIn({labelText: 'Enter your Email', value: user.email, screen});
    fillIn({labelText: 'Enter your Password', value: user.password, screen});

    clickOn('Login', {screen});


    const homePageText = await findByText(container, /Welcome/i);
    expect(homePageText).toHaveTextContent(user.email);
  });

  describe('unauthorized user', () => {
    const unknownUser = {
      email: 'unknown@example.com',
      password: 'password'
    };
    mockFitnessAPI({loginResponse: {
      name: 'login',
      failure: 'unauthorized'
    }});


    it('state is reset during tests', async () => {
      expect(container.textContent).not.toContain(user.email);
    });

    it('displays an error message on login attempt', async() => {

    });
  });
});

