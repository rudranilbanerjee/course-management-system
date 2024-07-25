import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../services/api'

const initialState= { examList: [], examData:null, examResult:null, loading: false, error: null }

export const fetchExamLists = createAsyncThunk('exams/exam-list-by-courseId', async (id,{ rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/exams/exam-list-by-courseId/${id}`);
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

export const createExams = createAsyncThunk('exams/create-exam', async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/exams/create-exam', userData);
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

export const submitExam = createAsyncThunk('exams/submit-exam', async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/exams/submit-exam', userData);
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







const examSlice = createSlice({
    name: 'exams',
    initialState,
    reducers: {
        resetExamSlice:(state,action)=>{
            state=initialState;
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExamLists.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchExamLists.fulfilled, (state, action) => {
                state.loading = false;
                state.examList = action.payload.exams;
            })
            .addCase(fetchExamLists.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload.error)
                state.error = action.payload.error;
            })
            .addCase(createExams.pending, (state) => {
                state.loading = true;
            })
            .addCase(createExams.fulfilled, (state, action) => {
                state.loading = false;
                state.examData = action.payload;
            })
            .addCase(createExams.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload.error)
                state.error = action.payload.error;
            })
            .addCase(submitExam.pending, (state) => {
                state.loading = true;
            })
            .addCase(submitExam.fulfilled, (state, action) => {
                state.loading = false;
                state.examResult = action.payload;
            })
            .addCase(submitExam.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload.error)
                state.error = action.payload.error;
            })
    },
});

export const {resetExamSlice} = examSlice.actions;
export default examSlice.reducer;
