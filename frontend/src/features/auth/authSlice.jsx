import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/api'
const initialState={ data: null, logged:false, loading: false, error: null }

export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error.response.data)
    if (error.response && error.response.data) {
      return rejectWithValue({error:error.response.data.message}); // Return the error response data
    } else {
      return rejectWithValue({ error: error.message });
    }
  }
});

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/auth/login', userData);
    console.log(response.data)
    return response.data;
  }catch (error) {
    console.log(error.response.data.message)
    if (error.response && error.response.data) {
      return rejectWithValue({error:error.response.data.message}); // Return the error response data
    } else {
      return rejectWithValue({ error: error.message });
    }
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await axiosInstance.post('/auth/logout');
  console.log(response.data)
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthSlice:(state,action)=>{
      state=initialState;
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.logged=true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        if(action.payload){
          console.log(action.payload.error)
          state.error = action.payload.error;
        }
        
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.logged=true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload.error)
        state.error = action.payload.error;
      })
      .addCase(logout.fulfilled, (state) => {
        state.data = null;
        state.logged=false;
      });
  },
});

export const {resetAuthSlice} = authSlice.actions;

export default authSlice.reducer;
