import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';
import { loggedIn, loginError } from '../reducers/user';

const fitnessApi = createApi({
  reducerPath: 'fitnessApi',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_API_BASE}/api/v1`}),
  extractRehydrationInfo(action, {reducerPath}={}) {
    if (action.type === REHYDRATE && action.payload && action.payload[reducerPath]) {
      return action.payload[reducerPath];
    }
  },
  initialState: null,
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
        } catch (error) {
          dispatch(loginError(error));
        }
      },
    }),
  }),
  extraReducers: (builder) => {
    builder.addCase('APP_RESET', () => {
      return this.initialState;
    });
  },
});

export const {
  reducer:fitnessApiReducer,
  middleware:fitnessApiMiddleware,
  reducerPath:fitnessApiPath,
  useLoginMutation,
} = fitnessApi;

export default fitnessApi;
