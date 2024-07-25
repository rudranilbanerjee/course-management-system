import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from './../../services/api'

const initialState = { memberList:[], courseList: [], course: null, info:null, loading: false, error: null }

export const fetchCourses = createAsyncThunk('courses/list-course', async ({ rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/courses/list-course');
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

export const fetchNotAssignedMember = createAsyncThunk('courses/unassigned-members', async (id,{ rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/courses/unassigned-members/${id}`);
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

export const createCourses = createAsyncThunk('courses/create-course', async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/courses/create-course', userData);
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

export const assignedCourse = createAsyncThunk('courses/assign-course-member', async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/courses/assign-course-member', userData);
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







const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        resetCourseSliceInfo: (state, action) => {
            return {
                ...state,
                info:null,
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courseList = action.payload.courses;
                state.error = null;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    console.log(action.payload.error)
                    state.error = action.payload.error;
                }

            })
            .addCase(fetchNotAssignedMember.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchNotAssignedMember.fulfilled, (state, action) => {
                state.loading = false;
                state.memberList = action.payload.unassignedMembers;
                state.error = null;
            })
            .addCase(fetchNotAssignedMember.rejected, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    console.log(action.payload.error)
                    state.error = action.payload.error;
                }

            })
            .addCase(createCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.course = action.payload.course;
                state.error = null;
            })
            .addCase(createCourses.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload.error)
                state.error = action.payload.error;
            })
            .addCase(assignedCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(assignedCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.info = action.payload;
                state.error = null;
            })
            .addCase(assignedCourse.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload.error)
                state.error = action.payload.error;
            })
    },
});

export const { resetCourseSliceInfo } = courseSlice.actions;
export default courseSlice.reducer;
