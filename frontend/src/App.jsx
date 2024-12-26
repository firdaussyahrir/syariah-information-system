import { Routes, Route } from "react-router-dom";
import React from "react";

import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import About from "./pages/about/About";
import Login from "./pages/login/Login";

import Dps from "./pages/dps/Dps";
import Lrsa from "./pages/lrsa/Lrsa";
import Riset from "./pages/riset/Riset";
import Buletin from "./pages/buletin/Buletin";
import Regulasi from "./pages/regulasi/Regulasi";

import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute
import UseScrollTop from "./components/UseScrollTop"; // Import untuk scroll top

function App() {
  return (
    <div id="app" className="flex flex-col min-h-screen bg-white">
      <Nav />
      <div className="flex flex-1 flex-col">
        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/dps"
              element={
                <PrivateRoute>
                  <Dps />
                </PrivateRoute>
              }
            />
            <Route
              path="/lrsa"
              element={
                <PrivateRoute>
                  <Lrsa />
                </PrivateRoute>
              }
            />
            <Route
              path="/riset"
              element={
                <PrivateRoute>
                  <Riset />
                </PrivateRoute>
              }
            />
            <Route
              path="/buletin"
              element={
                <PrivateRoute>
                  <Buletin />
                </PrivateRoute>
              }
            />
            <Route
              path="/regulasi"
              element={
                <PrivateRoute>
                  <Regulasi />
                </PrivateRoute>
              }
            />

            {/* Protect dashboard and profile routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
      <Footer />
      <UseScrollTop /> {/* Menambahkan fitur scroll ke atas */}
    </div>
  );
}

export default App;
