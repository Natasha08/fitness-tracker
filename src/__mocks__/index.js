import fetchMock from 'jest-fetch-mock';
import { urlMatchesEndpoint } from '__mocks__/helpers/server';

const responseWith = ({data, error}) => {
  if (error) {
    return Promise.reject(JSON.stringify(error));
  }
  return Promise.resolve(JSON.stringify(data));
};

export const mockServers = (responses={}) => {
  const {instantSearch={}, naturalSearch={}, login={}} = responses;

  beforeEach(() => {
    fetchMock.mockResponse(({url}) => {
      if (urlMatchesEndpoint('instantSearch', url, instantSearch.params)) {
        return responseWith(instantSearch);
      }

      if (urlMatchesEndpoint('naturalSearch', url, naturalSearch.params)) {
        return responseWith(naturalSearch);
      }

      if (urlMatchesEndpoint('login', url)) {
        return responseWith(login);
      }
    });
  });
};

