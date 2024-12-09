import React from "react";
import ListDps from "./components/ListDps";
import AddDps from "./components/AddDps";

function Dps() {
  return (
    <div>
      <h1>Dewan Pengawas Syariah</h1>
      <AddDps />
      <ListDps />
    </div>
  );
}

export default Dps;
