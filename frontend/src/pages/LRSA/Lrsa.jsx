import React from "react";
import AddLrsa from "./components/AddLrsa";

function Lrsa() {
  return (
    <div>
      <header className="bg-gradient-to-r from-blue-100 to-blue-300 text-[#374151] py-6 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold">
            Lembar Reviews Syariah Advisory (LRSA)
          </h1>
          <p className="text-lg opacity-80 mt-2">
            Manajemen Data Legal dan Syariah Advisory
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex justify-end">
            <AddLrsa />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Lrsa;
