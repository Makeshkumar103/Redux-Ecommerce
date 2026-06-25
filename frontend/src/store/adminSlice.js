import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async ({ name, price, description, category, seller, stock, image }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      const formData = new FormData();
      formData.append('image', image);
      const uploadRes = await axios.post(`${API_URL}/upload`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });

      const { data } = await axios.post(
        `${API_URL}/product/new`,
        { name, price, description, category, seller, stock, imageUrl: uploadRes.data.url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create product');
    }
  }
);

export const updateProductStock = createAsyncThunk(
  'admin/updateProductStock',
  async ({ id, stock }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put(`${API_URL}/admin/product/${id}`, { stock }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update stock');
    }
  }
);

export const fetchExpenses = createAsyncThunk(
  'admin/fetchExpenses',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${API_URL}/admin/expenses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data.expenses;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch expenses');
    }
  }
);

export const createExpense = createAsyncThunk(
  'admin/createExpense',
  async ({ title, amount, category }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.post(`${API_URL}/admin/expense/new`,
        { title, amount, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return data.expense;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add expense');
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'admin/deleteExpense',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/admin/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete expense');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    expenses: [],
    expensesLoading: false,
    expensesError: null,
    productCreating: false,
    productCreateError: null,
    stockUpdating: null,
    stockUpdateError: null,
    expenseCreating: false,
    expenseCreateError: null,
    expenseDeleting: null,
    expenseDeleteError: null,
  },
  reducers: {
    clearAdminErrors: (state) => {
      state.productCreateError = null;
      state.stockUpdateError = null;
      state.expensesError = null;
      state.expenseCreateError = null;
      state.expenseDeleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.productCreating = true;
        state.productCreateError = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.productCreating = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.productCreating = false;
        state.productCreateError = action.payload;
      })
      .addCase(updateProductStock.pending, (state, action) => {
        state.stockUpdating = action.meta.arg.id;
        state.stockUpdateError = null;
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        state.stockUpdating = null;
      })
      .addCase(updateProductStock.rejected, (state, action) => {
        state.stockUpdating = null;
        state.stockUpdateError = action.payload;
      })
      .addCase(fetchExpenses.pending, (state) => {
        state.expensesLoading = true;
        state.expensesError = null;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.expensesLoading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.expensesLoading = false;
        state.expensesError = action.payload;
      })
      .addCase(createExpense.pending, (state) => {
        state.expenseCreating = true;
        state.expenseCreateError = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.expenseCreating = false;
        state.expenses.unshift(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.expenseCreating = false;
        state.expenseCreateError = action.payload;
      })
      .addCase(deleteExpense.pending, (state, action) => {
        state.expenseDeleting = action.meta.arg;
        state.expenseDeleteError = null;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenseDeleting = null;
        state.expenses = state.expenses.filter((e) => e._id !== action.payload);
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.expenseDeleting = null;
        state.expenseDeleteError = action.payload;
      });
  },
});

export const { clearAdminErrors } = adminSlice.actions;
export default adminSlice.reducer;
