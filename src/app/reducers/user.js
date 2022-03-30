import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      return action.payload;
    },
    APP_RESET: () => {
      return initialState;
    }
  },
});

export const { loggedIn, APP_RESET } = user.actions;
export default user;
