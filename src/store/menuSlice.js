import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchMenu: (state) => {
      state.loading = true;
    },
    fetchMenuSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchMenuFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchMenu, fetchMenuSuccess, fetchMenuFailure } =
  menuSlice.actions;

export default menuSlice.reducer;
