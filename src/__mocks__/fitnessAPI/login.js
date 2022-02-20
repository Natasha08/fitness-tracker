import '@testing-library/jest-dom/extend-expect';
import { checkRequiredKeysFor, mockSuccess, mockFailure } from '../helpers/server';

const login = ({failure, name, data}) => {
  if (failure) return mockFailure(name, failure);

  checkRequiredKeysFor('login', data, () => {
    mockSuccess(name, data);
  });
};

export default login;
