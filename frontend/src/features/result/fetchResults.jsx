import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../services/api'

const initialState = { resultList: [], loading: false, error: null }

export const fetchResults = createAsyncThunk('results', async ({ rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/results');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error.response.data)
        if (error.response && error.response.data) {
            return rejectWithValue({ error: error.response.data.message }); // Return the error response data
        } else {
            return rejectWithValue({ error: error.message });
        }
    }
});








const resultSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        resetResultSlice: (state, action) => {
            state = initialState;
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResults.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchResults.fulfilled, (state, action) => {
                state.loading = false;
                state.resultList = action.payload.results;
                state.error = null;
            })
            .addCase(fetchResults.rejected, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    console.log(action.payload.error)
                    state.error = action.payload.error;
                }

            })
    },
});

export const { resetResultSlice } = resultSlice.actions;
export default resultSlice.reducer;
