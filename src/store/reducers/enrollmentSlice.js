import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "./../../apiConfig";

const initialState = {
  enrollments: [],
  status: "idle",
  error: null,
};

export const fetchEnrollment = createAsyncThunk(
  "enrollment/fetchEnrollment",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(API_ENDPOINTS.fetchEnrollment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createEnrollment = createAsyncThunk(
  "enrollment/createEnrollment",
  async (enrollmentData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.post(
        API_ENDPOINTS.createEnrollment,
        enrollmentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const updateEnrollment = createAsyncThunk(
  "enrollment/updateEnrollment",
  async (enrollmentData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.put(
        API_ENDPOINTS.updateEnrollment(enrollmentData._id),
        enrollmentData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteEnrollment = createAsyncThunk(
  "enrollment/deleteEnrollment",
  async (enrollmentId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(API_ENDPOINTS.deleteEnrollment(enrollmentId), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return enrollmentId;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEnrollment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enrollments = action.payload;
      })
      .addCase(fetchEnrollment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createEnrollment.fulfilled, (state, action) => {
        state.enrollments.push(action.payload);
      })
      .addCase(updateEnrollment.fulfilled, (state, action) => {
        const index = state.enrollments.findIndex(
          (enrollment) => enrollment._id === action.payload._id
        );
        if (index !== -1) {
          state.enrollments[index] = action.payload;
        }
      })
      .addCase(deleteEnrollment.fulfilled, (state, action) => {
        state.enrollments = state.enrollments.filter(
          (enrollment) => enrollment._id !== action.payload
        );
      });
  },
});

export default enrollmentSlice.reducer;
