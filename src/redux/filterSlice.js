const { createSlice } = require('@reduxjs/toolkit');

export const filterSlice = createSlice({
  name: 'filter',
  initialState: { query: '' },
  reducers: {
    updatedFilter(state, action) {
      state.query = action.payload;
    },
  },
});

export const { updatedFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
