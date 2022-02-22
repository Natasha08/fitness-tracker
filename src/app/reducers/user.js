import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      return action.payload;
    },
    loginError: (err) => {
      return {error: 'Error logging in, please try again'};
    },
    APP_RESET: () => {
      return initialState;
    }
  },
});

export const { loggedIn, APP_RESET, loginError } = user.actions;
export default user.reducer;
