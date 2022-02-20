import '@testing-library/jest-dom/extend-expect';
import { checkRequiredKeysFor, mockSuccess, mockFailure } from '../helpers/server';

const NAME = 'login';

const login = ({config: {failure}={}, data}) => {
  if (failure) return mockFailure(NAME, failure);

  checkRequiredKeysFor(NAME, data, () => {
    mockSuccess(NAME, data);
  });
};

export default login;
