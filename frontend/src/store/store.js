import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import adminReducer from './adminSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    admin: adminReducer,
  },
});

export default store;
