import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    activity: null, 
    area: null, 
    date: null,
    score: null,
    
 },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchResult: (state, action) => {
        state.value.activity = action.payload.activity;
        state.value.area = action.payload.area;
        state.value.date = action.payload.date;
        state.value.score = action.payload.score;
    },
  },
});

export const { searchResult } = searchSlice.actions;
export default searchSlice.reducer;