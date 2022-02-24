import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const nutritionix = createSlice({
  name: 'nutritionix',
  initialState,
  reducers: {
    instantSearchResults: (state, action) => {
      const newState = _.omit(state, 'instantSearch');
      const {common, branded} = action.payload;

      return {
        ...newState,
        instantSearch: [...common, ...branded]
      };
    },
    naturalSearchResults: (state, action) => {
      const newState = _.omit(state, 'naturalSearch');
      const {foods} = action.payload;

      return {
        ...newState,
        naturalSearch: foods
      };
    },
    searchError: (err) => {
      return {error: 'Error searching, please try again'};
    },
    APP_RESET: () => {
      return initialState;
    }
  },
});

export const {instantSearchResults, naturalSearchResults, searchError} = nutritionix.actions;
export default nutritionix.reducer;
