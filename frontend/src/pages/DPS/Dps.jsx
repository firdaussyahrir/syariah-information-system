import React, { useState } from "react";
import AddDps from "./components/AddDps";
import ListDps from "./components/ListDps";

const Dps = () => {
  return (
    <div className="flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-100 to-blue-300 text-[#374151] py-6 shadow-md">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold">
            Dewan Pengawas Syariah (DPS)
          </h1>
          <p className="text-lg opacity-80 mt-2">
            Manajemen Data Opini dan Risalah Rapat
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Button to open Upload File Modal */}
          <div className="flex justify-end">
            <AddDps />
          </div>

          {/* Table Section */}
          <section className="bg-white p-6 rounded-lg shadow-lg">
            <ListDps />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dps;
