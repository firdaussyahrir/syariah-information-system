import React from "react";
import ListBuletin from "./components/ListBuletin";
import AddBuletin from "./components/AddBuletin";

function Buletin() {
  return (
    <div>
      <header className="bg-gradient-to-r from-blue-100 to-blue-300 text-[#374151] py-6 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold">Buletin Syariah</h1>
          <p className="text-lg opacity-80 mt-2">
            Manajemen Papper Riset Perbankan Syariah
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex justify-end">
            <AddBuletin />
          </div>
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <ListBuletin />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Buletin;
