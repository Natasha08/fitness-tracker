import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';
import _ from 'lodash';

const defaultRehydration = (action, {reducerPath} = {}) => {
  if (action.type === REHYDRATE && action.payload && action.payload[reducerPath]) {
    return action.payload[reducerPath];
  }
};

const defaultQuery = ({url, method, params}) => (body) => ({
  url,
  method,
  ..._.isFunction(params) ? params(body) : {body},
});

const defaultOnQueryStarted = ({onSuccess, onFailure}) => async (id, {dispatch, queryFulfilled}) => {
  try {
    const {data} = await queryFulfilled;
    _.isFunction(onSuccess) && dispatch(onSuccess(data));
  } catch (error) {
    _.isFunction(onFailure) && dispatch(onFailure(error));
  }
};

const defaultExtraReducers = (builder) => {
  builder.addCase('APP_RESET', () => {
    return this.initialState;
  });
};

const build = ({
  query=defaultQuery,
  onQueryStarted=defaultOnQueryStarted,
  extraReducers=defaultExtraReducers,
  ...config
}) => ({
  query: query(config),
  onQueryStarted: onQueryStarted(config),
  extraReducers,
});

const createApiService = ({
  reducerPath,
  initialState=null,
  baseOptions,
  tagTypes=[],
  endpoints
}) => {
  return createApi({
    reducerPath,
    baseQuery: fetchBaseQuery(baseOptions),
    extractRehydrationInfo: defaultRehydration,
    initialState,
    tagTypes,
    endpoints: (builder) => (
      _.mapValues(endpoints, (endpoint) => (
        builder.mutation(build(endpoint))
      ))
    )
  });
};

export default createApiService;
