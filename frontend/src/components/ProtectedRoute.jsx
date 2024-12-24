import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute hanya memberikan akses jika ada token yang valid
const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Jika tidak ada token, arahkan ke halaman login
    return <Navigate to="/login" />;
  }

  // Jika ada token, tampilkan element yang diberikan (misal: Dashboard)
  return element;
};

export default ProtectedRoute;
