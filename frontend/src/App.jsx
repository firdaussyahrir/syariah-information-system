import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import FirstNav from "./components/FirstNav";
import SecNav from "./components/SecNav";

import Home from "./pages/Home/Home";

import Dps from "./pages/DPS/Dps";

import "./App.css";

function App() {
  return (
    <div id="app" className="flex flex-col min-h-screen bg-white">
      <FirstNav />
      <SecNav />
      <div className="flex flex-1 flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dps" element={<Dps />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
