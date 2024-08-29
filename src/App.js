import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import StudentPage from "./pages/StudentPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/route/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import CoursePage from "./pages/CoursePage";
import EnrollmentPage from "./pages/EnrollmentPage";

function App() {
  return (
    // <Provider store={store}>
    //   <Router>
    //     <div>
    //       <ToastContainer />
    //       <Routes>
    //         <Route path="/login" element={<LoginPage />} />
    //         <Route path="/register" element={<RegisterPage />} />
    //         <Route
    //           path="/dashboard"
    //           element={
    //             <PrivateRoute>
    //               <DashboardPage />
    //             </PrivateRoute>
    //           }
    //         />
    //         <Route path="*" element={<LoginPage />} />
    //       </Routes>
    //     </div>
    //   </Router>
    // </Provider>

    <Provider store={store}>
      <Router>
        <div>
          <ToastContainer />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute roles={["student"]}>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute roles={["admin"]}>
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/student"
              element={
                <PrivateRoute roles={["admin"]}>
                  <StudentPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/course"
              element={
                <PrivateRoute roles={["admin"]}>
                  <CoursePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/enrollment"
              element={
                <PrivateRoute roles={["admin"]}>
                  <EnrollmentPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<LoginPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
