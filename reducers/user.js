import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    token: null, 
    name: null, 
    firstname: null,
    email: null, 
    searches : [],
    skills : {},
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userInfo: (state, action) => {
      state.value.token = action.payload.token;
      state.value.firstname = action.payload.firstname;
      state.value.name = action.payload.name;
      state.value.email = action.payload.email;
      // state.value = { ...state.value, ...action.payload }; 
    },
    userSkill : (state,action) => {
        state.value.skills = { ...state.value.skills, ...action.payload.skills }; 
    },
    logout: (state) => {
      state.value.token = null;
      state.value.firstname = null;
      state.value.name = null;
      state.value.email = null;
      state.value.searches = [];
      state.value.skills = {};
    },
    addIdOfASearch : (state, action)=>{
      state.value.searches.push(action.payload)
    },
    fillSearchesWithAllId: (state, action)=>{
      state.value.searches = action.payload
    }
  },
});

export const { userInfo,userSkill, logout, addIdOfASearch, fillSearchesWithAllId } = userSlice.actions;
export default userSlice.reducer;