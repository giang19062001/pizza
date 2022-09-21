// src/features/todo/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action) => {
      const cartItemExists = state.carts?.find((item)=>item._id===action.payload._id); 
      if(cartItemExists === undefined){
          state.carts.push(action.payload);
      } else{
        const carts = state.carts.map(cartItem =>
          cartItem._id === action.payload._id
            ? {...cartItem, quantity: parseInt(cartItem.quantity) + parseInt(action.payload.quantity)}
            : {...cartItem}
        );
        
        state.carts = carts
        
      } 
    },
    removeCart: (state, action) => {
      state.carts = [...state.carts.filter((item) => item._id!==action.payload)]
    }
  }
});

export const { addCart, removeCart } = cartSlice.actions;


export default cartSlice.reducer;
