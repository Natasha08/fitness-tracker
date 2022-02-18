import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { loggedIn, loginError } from '../reducers/user';

const fitnessApi = createApi({
  reducerPath: 'fitnessApi',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_BASE}/api/v1`}),
  tagTypes: ['user-auth'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
      async onQueryStarted(id, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(loggedIn(data));
        } catch {
          dispatch(loginError());
        }
      },
    }),
  })
});

export const {
  reducer:fitnessApiReducer,
  middleware:fitnessApimiddleware,
  reducerPath:fitnessApiPath,
  useLoginMutation,
} = fitnessApi;

export default fitnessApi;
