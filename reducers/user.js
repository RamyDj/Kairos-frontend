import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    token: null, 
    name: null, 
    firstname: null,
    email: null, },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.firstname = action.payload.firstname;
      state.value.name = action.payload.name;
      state.value.email = action.payload.email
      // state.value = { ...state.value, ...action.payload }; 
    },
    logout: (state) => {
      state.value.token = null;
      state.value.firstname = null;
      state.value.name = null;
      state.value.email = null
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;