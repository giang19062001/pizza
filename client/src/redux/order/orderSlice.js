// src/features/todo/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrder: (state, action) => {

      state.status = true
      console.log(action.payload[0])

      let dataOrder = {id:action.payload[0],time:action.payload[1]}
      action.payload[2].emit("notification",dataOrder)
    },
    createOrderShutdown: (state, action) => {
        state.status = false
    }
  }
});

export const { createOrder, createOrderShutdown } = orderSlice.actions;


export default orderSlice.reducer;
