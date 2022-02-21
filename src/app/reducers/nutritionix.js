import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const nutritionix = createSlice({
  name: 'nutritionix',
  initialState,
  reducers: {
    nutritionixSearchResults: (state, action) => {
      return action.payload;
    },
    searchError: (err) => {
      return { error: "Error logging in, please try again" };
    },
    APP_RESET: () => {
      return initialState;
    }
  },
});

export const { nutritionixSearchResults, searchError } = nutritionix.actions;
export default nutritionix.reducer;
