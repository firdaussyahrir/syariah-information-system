import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai"; // Import React icon

function ListDps() {
  const [dpsList, setDpsList] = useState([]);
  const [filteredDps, setFilteredDps] = useState([]);
  const [filter, setFilter] = useState({
    jenis: "",
    tahun: "",
    kelompok: "",
    kategori: "",
  });

  // Fetching DPS data from the backend
  useEffect(() => {
    const fetchDpsList = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dps");
        setDpsList(response.data);
        setFilteredDps(response.data); // Set initial list as filtered list
      } catch (error) {
        console.error("Error fetching DPS data:", error);
      }
    };

    fetchDpsList();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this DPS?"
    );
    if (!confirmDelete) return; // If user cancels, do nothing

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/dps/${id}`
      );
      alert(response.data.message);
      // Refresh the list after deletion
      setDpsList(dpsList.filter((dps) => dps._id !== id));
      setFilteredDps(filteredDps.filter((dps) => dps._id !== id)); // Remove from filtered list as well
    } catch (error) {
      console.error("Error deleting DPS:", error);
      alert("Failed to delete DPS.");
    }
  };

  // Helper function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID"); // Format to Indonesian date format (you can change locale)
  };

  // Filter data based on filter state
  useEffect(() => {
    const applyFilter = () => {
      const filtered = dpsList.filter((dps) => {
        return (
          (filter.jenis ? dps.jenis === filter.jenis : true) &&
          (filter.tahun
            ? new Date(dps.tanggalMasehi).getFullYear() ===
              parseInt(filter.tahun)
            : true) &&
          (filter.kelompok ? dps.kelompok === filter.kelompok : true) &&
          (filter.kategori ? dps.kategori === filter.kategori : true)
        );
      });
      setFilteredDps(filtered);
    };

    applyFilter();
  }, [filter, dpsList]);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  return (
    <div className="max-w-8xl mx-auto p-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        List Dokumen DPS
      </h2>

      {/* Filter Form */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="jenis"
              className="block text-sm font-medium text-gray-600">
              Jenis
            </label>
            <select
              id="jenis"
              name="jenis"
              value={filter.jenis}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">All</option>
              <option value="Opini DPS">Opini DPS</option>
              <option value="Risalah Rapat">Risalah Rapat</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="tahun"
              className="block text-sm font-medium text-gray-600">
              Tahun
            </label>
            <input
              type="number"
              id="tahun"
              name="tahun"
              value={filter.tahun}
              onChange={handleFilterChange}
              placeholder="Enter year"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="kelompok"
              className="block text-sm font-medium text-gray-600">
              Kelompok
            </label>
            <select
              id="kelompok"
              name="kelompok"
              value={filter.kelompok}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">All</option>
              <option value="Produk">Produk</option>
              <option value="Financing Model">Financing Model</option>
              <option value="Program">Program</option>
              <option value="Policy & Procedure">Policy & Procedure</option>
              <option value="Fitur Produk">Fitur Produk</option>
              <option value="Dana Kebajikan & Zakat">
                Dana Kebajikan & Zakat
              </option>
            </select>
          </div>
          <div>
            <label
              htmlFor="kategori"
              className="block text-sm font-medium text-gray-600">
              Kategori
            </label>
            <select
              id="kategori"
              name="kategori"
              value={filter.kategori}
              onChange={handleFilterChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">All</option>
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
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-800 border-b">
              <th className="px-8 py-5 text-left">#</th>
              <th className="px-8 py-5 text-left">Jenis</th>
              <th className="px-8 py-5 text-left">Nomor</th>
              <th className="px-8 py-5 text-left">Tanggal Masehi</th>
              <th className="px-8 py-5 text-left">Judul</th>
              <th className="px-8 py-5 text-left">Kelompok</th>
              <th className="px-8 py-5 text-left">Kategori</th>
              <th className="px-8 py-5 text-left">Sub Kategori</th>
              <th className="px-8 py-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDps.map((dps, index) => (
              <tr key={dps._id} className="border-b hover:bg-gray-50">
                <td className="px-8 py-4">{index + 1}</td>
                <td className="px-8 py-4">{dps.jenis}</td>
                <td className="px-8 py-4">{dps.nomor}</td>
                <td className="px-6 py-4">{formatDate(dps.tanggalMasehi)}</td>
                <td className="px-8 py-4">{dps.judul}</td>
                <td className="px-8 py-4">{dps.kelompok}</td>
                <td className="px-8 py-4">{dps.kategori}</td>
                <td className="px-8 py-4">{dps.subKategori}</td>
                <td className="px-8 py-4 text-center">
                  <button
                    onClick={() => handleDelete(dps._id)}
                    className="text-white bg-red-500 hover:bg-red-600 py-2 px-6 rounded-lg flex items-center justify-center">
                    <AiOutlineDelete className="mr-2" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListDps;
