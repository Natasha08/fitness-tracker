

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from './store';
import App from '../App';

const user = {
  email: 'jones@example.com',
  password: 'password'
};
const token = 'token';

describe('Loggin in', () => {
  let container = null;
  mockServer({loginResponse: {...user, token}});

  beforeEach(() => {
    container = render(<Provider store={store}><App/></Provider>);
  });

  it('logs the user in', async () => {
    const { getByLabelText, getByText, findAllByText } = container
    const emailInput = getByLabelText('Enter your Email');
    const passwordInput = getByLabelText('Enter your Password');

    fireEvent.change(emailInput, {target: {value: user.email}});
    fireEvent.change(passwordInput, {target: {value: user.password}});

    expect(emailInput.value).toBe(user.email);
    expect(passwordInput.value).toBe(user.password);

    fireEvent(
      getByText('Login'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );

    const welcome = await findAllByText(/Welcome/i);
    expect(welcome[0]).toHaveTextContent(user.email);
  });
});
