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
    }
  },
});

export const { addSearch, fillWithAllUserSearches } = searchSlice.actions;
export default searchSlice.reducer;