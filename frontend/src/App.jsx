import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import FirstNav from "./components/FirstNav";
import SecNav from "./components/SecNav";

import "./App.css";

function App() {
  return (
    <div className="App">
      <FirstNav />
      <SecNav />
      <main className="pt-12">
        <h1 className="text-4xl font-bold text-center">
          Welcome to Syariah Information System!
        </h1>
      </main>
    </div>
  );
}

export default App;
