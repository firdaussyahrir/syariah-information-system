// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

// Fungsi untuk memeriksa apakah user sudah login
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Memeriksa token di localStorage

  // Jika tidak terautentikasi, arahkan ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika terautentikasi, tampilkan halaman yang dibungkus PrivateRoute
  return children;
};

export default PrivateRoute;
