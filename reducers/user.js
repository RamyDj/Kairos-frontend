import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    token: null, 
    lastName: null, 
    firstName: null,
    mail: null, },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.firstName = action.payload.firstName;
      state.value.lastName = action.payload.lastName;
      state.value.mail = action.payload.mail
    },
    logout: (state) => {
      state.value.token = null;
      state.value.firstName = null;
      state.value.lastName = null;
      state.value.mail = null
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;