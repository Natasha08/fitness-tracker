import '@testing-library/jest-dom/extend-expect';
import { checkRequiredKeysFor, mockSuccess, mockFailure } from '__mocks__/helpers/server';

const NAME = 'instantSearch';

const instantSearch = ({config: {failure, params}={}, data}) => {
  if (failure) return mockFailure(NAME, failure);

  checkRequiredKeysFor(NAME, data, () => {
    mockSuccess(NAME, data, params);
  });
};

export default instantSearch;
