import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const nutritionix = createSlice({
  name: 'nutritionix',
  initialState,
  reducers: {
    nutritionixSearchResults: (state, action) => {
      const newState = _.omit(state, 'instantSearch');
      const {common, branded} = action.payload;

      return {
        ...newState,
        instantSearch: [...common, ...branded]
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

export const {nutritionixSearchResults, searchError} = nutritionix.actions;
export default nutritionix.reducer;
