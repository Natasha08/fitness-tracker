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
      return {error: "Error logging in, please try again"};
    },
    logOut: () => {
      return initialState;
    }
  },
});

export const { loggedIn, logOut, loginError } = user.actions;
export default user.reducer;
