import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import productReducer from "./reducers/productSlice";
import studentReducer from "./reducers/studentSlice";
import courseReducer from "./reducers/courseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentReducer,
    products: productReducer,
    courses: courseReducer,
  },
});
