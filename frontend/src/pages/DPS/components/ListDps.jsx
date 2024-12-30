import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaFilePdf } from "react-icons/fa"; // Removed FaEdit
import { Link } from "react-router-dom"; // Still keep Link if you plan to use it elsewhere

function ListDps() {
  const [dpsList, setDpsList] = useState([]);
  const [filters, setFilters] = useState({
    jenis: "",
    tanggal: "", // Filter for Date
    kelompok: "",
    kategori: "",
  });

  // Fetching DPS data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dps", {
          params: filters, // Send filters as query params
        });
        setDpsList(response.data);
      } catch (error) {
        console.error("Error fetching DPS data:", error);
      }
    };

    fetchData();
  }, [filters]); // Refetch when filters change

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Format the date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this DPS?"
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/dps/${id}`
        );
        if (response.status === 200) {
          setDpsList((prevData) => prevData.filter((dps) => dps._id !== id));
          alert("DPS deleted successfully!");
        } else {
          alert("Failed to delete DPS.");
        }
      } catch (error) {
        console.error("Error deleting DPS:", error);
        alert("Failed to delete DPS.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Filter Section */}
      <div className="flex space-x-4 mb-6">
        {/* Filter Jenis */}
        <div>
          <label
            htmlFor="jenis"
            className="block text-sm font-medium text-gray-700">
            Jenis
          </label>
          <select
            name="jenis"
            id="jenis"
            value={filters.jenis}
            onChange={handleFilterChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">All Jenis</option>
            <option value="Opini DPS">Opini DPS</option>
            <option value="Risalah Rapat">Risalah Rapat</option>
          </select>
        </div>

        {/* Filter Tanggal */}
        <div>
          <label
            htmlFor="tanggal"
            className="block text-sm font-medium text-gray-700">
            Tanggal
          </label>
          <input
            type="date"
            name="tanggal"
            id="tanggal"
            value={filters.tanggal}
            onChange={handleFilterChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Filter Kelompok */}
        <div>
          <label
            htmlFor="kelompok"
            className="block text-sm font-medium text-gray-700">
            Kelompok
          </label>
          <select
            name="kelompok"
            id="kelompok"
            value={filters.kelompok}
            onChange={handleFilterChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">All Kelompok</option>
            <option value="Produk">Produk</option>
            <option value="Financing Model">Financing Model</option>
            <option value="Program">Program</option>
            <option value="Policy & Procedure">Policy & Procedure</option>
            <option value="Fitur Produk">Fitur Produk</option>
            <option value="Dana Kebajikan & Zakat">
              Dana Kebajikan & Zakat
            </option>
            <option value="Lain-Lain">Lain-Lain</option>
          </select>
        </div>

        {/* Filter Kategori */}
        <div>
          <label
            htmlFor="kategori"
            className="block text-sm font-medium text-gray-700">
            Kategori
          </label>
          <select
            name="kategori"
            id="kategori"
            value={filters.kategori}
            onChange={handleFilterChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">All Kategori</option>
            <option value="Financing">Financing</option>
            <option value="Asuransi">Asuransi</option>
            <option value="Kepatuhan Syariah">Kepatuhan Syariah</option>
            <option value="Dana Kebajikan & Zakat">
              Dana Kebajikan & Zakat
            </option>
            <option value="Funding">Funding</option>
            <option value="Syariah Card">Syariah Card</option>
            <option value="Investment">Investment</option>
            <option value="Trade Finance">Trade Finance</option>
            <option value="Layanan Jasa">Layanan Jasa</option>
            <option value="Zakat">Zakat</option>
            <option value="Treasury">Treasury</option>
            <option value="DBLM">DBLM</option>
            <option value="Lain-Lain">Lain-Lain</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <table className="min-w-full table-auto border-collapse bg-white rounded-md shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 text-sm font-medium text-gray-600">No</th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Jenis
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Nomor
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Tanggal Masehi
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Judul
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Kelompok
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Kategori
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Sub Kategori
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {dpsList.map((dps, index) => (
            <tr key={dps._id} className="border-t">
              <td className="py-2 px-4 text-sm text-gray-800">{index + 1}</td>
              <td className="py-2 px-4 text-sm text-gray-800">{dps.jenis}</td>
              <td className="py-2 px-4 text-sm text-gray-800">{dps.nomor}</td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {formatDate(dps.tanggalMasehi)}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">{dps.judul}</td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {dps.kelompok}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {dps.kategori}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {dps.subKategori}
              </td>
              <td className="py-2 px-4 text-center space-x-4">
                <button
                  onClick={() => handleDelete(dps._id)}
                  className="text-red-500 hover:text-red-700 p-1 rounded-full focus:outline-none">
                  <FaTrashAlt size={16} />
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `http://localhost:3000/uploads/${dps.fileDps}`,
                      "_blank"
                    )
                  }
                  className="text-green-500 hover:text-green-700 p-1 rounded-full focus:outline-none">
                  <FaFilePdf size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListDps;
