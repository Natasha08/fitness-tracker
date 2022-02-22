import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';
import { nutritionixSearchResults, searchError } from '../reducers/nutritionix';

export const API_VERSION = '/v2' ;

const NutritionixAPI = createApi({
  reducerPath: 'NutritionixAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_NUTRITIONIX_API_BASE}${API_VERSION}`,
    prepareHeaders: (headers) => {
      headers.set('x-app-id', process.env.REACT_APP_NUTRITIONIX_APP_ID);
      headers.set('x-app-key', process.env.REACT_APP_NUTRITIONIX_API_KEY);
      headers.set('x-remote-user-id', 0);

      return headers
    },
  }),
  extractRehydrationInfo(action, { reducerPath } = {}) {
    if (action.type === REHYDRATE && action.payload && action.payload[reducerPath]) {
      return action.payload[reducerPath];
    }
  },
  initialState: null,
  tagTypes: ['user-auth'],
  endpoints: (builder) => ({
    instantSearch: builder.mutation({
      query: (search) => ({
        url: 'search/instant',
        method: 'GET',
        params: `query=${search}`
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(nutritionixSearchResults(data));
        } catch (error) {
          dispatch(searchError(error));
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

export const { useInstantSearchMutation } = NutritionixAPI;

export default NutritionixAPI;
