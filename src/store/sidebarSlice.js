// src/store/sidebarSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeIcon: 'home', // Default active icon is "home"
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setActiveIcon: (state, action) => {
      state.activeIcon = action.payload;
    },
  },
});

export const { setActiveIcon } = sidebarSlice.actions;
export default sidebarSlice.reducer;
