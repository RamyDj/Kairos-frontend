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
  },
});

export const { addSearch } = searchSlice.actions;
export default searchSlice.reducer;