// src/features/todo/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notify: [],
};

export const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    addNotify: (state, action) => {
        console.log(action.payload)
        state.notify = [...state.notify,action.payload]
    },
  }
});

export const { addNotify } = notifySlice.actions;


export default notifySlice.reducer;
