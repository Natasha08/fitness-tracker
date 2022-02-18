import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      return action.payload;
    },
    logOut: (user) => {
      return initialState;
    }
  },
})

export const { loggedIn, logOut } = user.actions;
export default user.reducer;
