const API_BASE_URL = "http://localhost:5001/api";

const API_ENDPOINTS = {
  registerUser: `${API_BASE_URL}/user/register`,
  loginUser: `${API_BASE_URL}/user/login`,
  fetchCurrentUser: `${API_BASE_URL}/user/current`,

  fetchStudents: `${API_BASE_URL}/user`,
  updateStudents: (studentId) => `${API_BASE_URL}/user/${studentId}`,
  deleteStudent: (studentId) => `${API_BASE_URL}/user/${studentId}`,
  fetchCourses: `${API_BASE_URL}/courses`,
  createCourse: `${API_BASE_URL}/courses`,
  updateCourse: (coursesId) => `${API_BASE_URL}/courses/${coursesId}`,
  deleteCourse: (coursesId) => `${API_BASE_URL}/courses/${coursesId}`,
  fetchProducts: `${API_BASE_URL}/products`,
  createProduct: `${API_BASE_URL}/products`,
  updateProduct: (productId) => `${API_BASE_URL}/products/${productId}`,
  deleteProduct: (productId) => `${API_BASE_URL}/products/${productId}`,
};

export { API_BASE_URL, API_ENDPOINTS };
