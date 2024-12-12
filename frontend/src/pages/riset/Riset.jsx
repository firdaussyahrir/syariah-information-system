import React from "react";
import ListRiset from "./components/ListRiset";
import AddRiset from "./components/AddRiset";

function Riset() {
  return (
    <div>
      <header className="bg-gradient-to-r from-blue-100 to-blue-300 text-[#374151] py-6 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold">Riset Syariah</h1>
          <p className="text-lg opacity-80 mt-2">
            Manajemen Papper Riset Perbankan Syariah
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex justify-end">
            <AddRiset />
          </div>
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <ListRiset />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Riset;
