import '@testing-library/jest-dom/extend-expect';
import { checkRequiredKeysFor, mockSuccess, mockFailure } from '../helpers/server';

const login = ({config: {name="login", failure}={}, data}) => {
  if (failure) return mockFailure(name, failure);

  checkRequiredKeysFor(name, data, () => {
    mockSuccess(name, data);
  });
};

export default login;
