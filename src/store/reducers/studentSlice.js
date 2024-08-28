import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "./../../apiConfig";

const initialState = {
  students: [],
  status: "idle",
  error: null,
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(API_ENDPOINTS.fetchStudents, {
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

// export const createProduct = createAsyncThunk(
//   "products/createProduct",
//   async (productData, { getState, rejectWithValue }) => {
//     try {
//       const token = getState().auth.token;
//       const response = await axios.post(
//         API_ENDPOINTS.createProduct,
//         productData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (studentData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.put(
        API_ENDPOINTS.updateStudents(studentData._id),
        studentData,
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

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await axios.delete(API_ENDPOINTS.deleteStudent(studentId), {
        headers: { Authorization: `Bearer ${token}` },
      });
      return studentId;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // .addCase(createProduct.fulfilled, (state, action) => {
      //   state.products.push(action.payload);
      // });
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.students.findIndex(
          (student) => student._id === action.payload._id
        );
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student._id !== action.payload
        );
      });
  },
});

export default studentSlice.reducer;
