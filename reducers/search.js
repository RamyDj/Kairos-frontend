import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addSearch: (state, action) => {
        state.value.push(action.payload)
    },
    fillWithAllUserSearches : (state, action)=>{
      state.value = action.payload
    },
    deleteSearches: (state, action) => {
      state.value = [];
    }
  },
});

export const { addSearch, fillWithAllUserSearches, deleteSearches } = searchSlice.actions;
export default searchSlice.reducer;