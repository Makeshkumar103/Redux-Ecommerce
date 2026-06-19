import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, qty } = action.payload;
      const exists = state.items.find(item => item.product._id === product._id);
      if (!exists) {
        state.items.push({ product, qty });
      }
    },
    increaseQty: (state, action) => {
      const item = state.items.find(i => i.product._id === action.payload);
      if (item && item.qty < item.product.stock) {
        item.qty += 1;
      }
    },
    decreaseQty: (state, action) => {
      const item = state.items.find(i => i.product._id === action.payload);
      if (item && item.qty > 1) {
        item.qty -= 1;
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.product._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
