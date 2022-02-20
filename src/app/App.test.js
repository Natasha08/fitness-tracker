import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

const user = {
  email: 'jones@example.com',
  password: 'password'
};
const token = 'token';

describe('Loggin in', () => {
  let app = null;
  const loginResponse = {
    data: {...user, token}
  };
  mockFitnessAPI({loginResponse});

  beforeEach(() => {
    app = render(<App/>);
  });

  it('logs the user in', async () => {
    fillIn({labelText: 'Enter your Email', value: user.email, app});
    fillIn({labelText: 'Enter your Password', value: user.password, app});

    clickOn('Login', {app});

    const homePageText = await app.findAllByText(/Welcome/i);
    expect(_.first(homePageText)).toHaveTextContent(user.email);
  });
});
