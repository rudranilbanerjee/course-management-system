import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../services/api'

const initialState = { data: null, loading: false, error: null };

export const createMember = createAsyncThunk('auth/register-member', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/auth/register-member', userData);
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



const createMemberSlice = createSlice({
  name: 'create member',
  initialState,
  reducers: {
    resetCreateMember:(state,action)=>{
        state=initialState;
        return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMember.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error=null;
      })
      .addCase(createMember.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload.error)
        state.error = action.payload.error;
      })
  },
});

export const {resetCreateMember} = createMemberSlice.actions;

export default createMemberSlice.reducer;
