import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";

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

function App() {
  return (
    <div id="app" className="flex flex-col min-h-screen bg-white">
      <Nav />
      <div className="flex flex-1 flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dps" element={<Dps />} />
            <Route path="/lrsa" element={<Lrsa />} />
            <Route path="/riset" element={<Riset />} />
            <Route path="/buletin" element={<Buletin />} />
            <Route path="/regulasi" element={<Regulasi />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
      <Footer />
      <useScrollTop />
    </div>
  );
}

export default App;
