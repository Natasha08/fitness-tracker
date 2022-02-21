import React from 'react';
import { act, renderHook } from "@testing-library/react-hooks";
import { Provider } from 'react-redux';
import fetchMock from "jest-fetch-mock";

import FitnessAPIService, { useLoginMutation, API_VERSION } from '../../app/services/FitnessAPI';

const user = {
  email: 'jones@example.com',
  password: 'password'
};
const token = 'token';
const data = {...user, token};

describe('FitnessAPI', () => {
  mockFitnessAPI({loginResponse: {data}});

  describe('login store dispatch', () => {
    it('hits the endpoint correctly', async () => {
      return withStore()
        .dispatch(FitnessAPIService.endpoints.login.initiate(user))
          .then((response) => {
            expect(fetchMock).toBeCalledTimes(1);
            const {method, headers, url} = fetchMock.mock.calls[0][0];
            const authorization = headers.get(Headers.Authorization);

            expect(method).toBe("POST");
            expect(authorization).toBeNull();
            expect(url).toBe(`${process.env.REACT_APP_API_BASE}${API_VERSION}/login`);
            expect(response).toEqual({data});
          });
    });
  });

  describe('login mutation', () => {
    it('responds with the correct data', async () => {
      const wrapper = ({children}) => {
        return <Provider store={withStore()}>{children}</Provider>;
      };

      const {result, waitForNextUpdate} = renderHook(() => useLoginMutation(), {wrapper});
      const [loginUser] = result.current;

      act(() => void loginUser(user));

      await waitForNextUpdate();

      const responseData = _.get(result, 'current[1].data');
      expect(responseData).not.toBeUndefined();
      expect(responseData).toEqual(data);
    });
  });
});
