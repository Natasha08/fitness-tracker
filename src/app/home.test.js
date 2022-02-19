

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import fetchMock from "jest-fetch-mock";

import store from './store';
import App from '../App';

let container = null;

beforeEach(() => {
  container = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  process.env.REACT_APP_API_BASE = 'http://example.com';
  fetchMock.resetMocks();

  fetchMock.mockIf(/^http?:\/\/example.com.*$/, req => {
    if (req.url.endsWith('/login')) {
      return {email: 'natasha@example.com', token: 'token', exp: 'tomorrow'};
    } else {
      return {
        status: 404,
        body: 'Not Found'
      }
    }
  })
});

test('login', async () => {
  const { getByLabelText, getByText, findAllByText } = container
  const email = 'natasha@example.com';
  const password = 'password';
  const emailInput = getByLabelText('Enter your Email');
  const passwordInput = getByLabelText('Enter your Password');

  fireEvent.change(emailInput, {target: {value: email}});
  fireEvent.change(passwordInput, {target: {value: password}});

  expect(emailInput.value).toBe(email);
  expect(passwordInput.value).toBe(password);

  fireEvent(
    getByText('Login'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }),
  );

  const welcome = await findAllByText(/Welcome/i);
  expect(welcome[0].textContent).toEqual("Welcome!");
});
