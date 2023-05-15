const { createSlice } = require('@reduxjs/toolkit');

export const filterSlice = createSlice({
  name: 'filter',
  initialState: { query: '' },
  reducers: {
    setStatusFilter: (state, action) => action.payload,
  },
});

export const { updatedFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
