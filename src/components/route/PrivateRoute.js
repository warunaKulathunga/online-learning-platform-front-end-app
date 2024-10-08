import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, roles }) => {
  const { token, user } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check if the user's role matches the allowed roles for the route
  if (roles && !roles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/admin" />;
    } else if (user.role === "student") {
      return <Navigate to="/dashboard" />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return children;
};

export default PrivateRoute;
