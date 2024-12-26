import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem("token"); // Cek token di localStorage

  return (
    <Route
      {...rest}
      element={token ? <Element /> : <Navigate to="/login" />} // Jika tidak ada token, redirect ke login
    />
  );
};

export default PrivateRoute;
