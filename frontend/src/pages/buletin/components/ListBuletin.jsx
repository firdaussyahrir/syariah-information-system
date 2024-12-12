import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // Import React icon for delete button

const ListBuletin = () => {
  const [buletins, setBuletins] = useState([]);
  const [filters, setFilters] = useState({
    tahun: "",
    kelompok: "",
    kategori: "",
    subKategori: "",
  });

  useEffect(() => {
    // Fetching the data from the server
    const fetchBuletins = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/buletin");
        setBuletins(response.data);
      } catch (error) {
        console.error("Error fetching Buletin data:", error);
      }
    };
    fetchBuletins();
  }, []);

  // Handle changes in the filter dropdowns
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Handle delete action with confirmation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Buletin?"
    );
    if (!confirmDelete) {
      return; // Do nothing if the user cancels
    }

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/buletin/${id}`
      );
      alert(response.data.message);
      setBuletins(buletins.filter((buletin) => buletin._id !== id));
    } catch (error) {
      console.error("Error deleting Buletin:", error);
      alert("Failed to delete Buletin.");
    }
  };

  // Filter the buletins based on selected filters
  const filteredBuletins = buletins.filter((buletin) => {
    return (
      (!filters.tahun ||
        new Date(buletin.tanggalMasehi).getFullYear().toString() ===
          filters.tahun) &&
      (!filters.kelompok || buletin.kelompok === filters.kelompok) &&
      (!filters.kategori || buletin.kategori === filters.kategori) &&
      (!filters.subKategori || buletin.subKategori === filters.subKategori)
    );
  });

  // Format the date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options); // 'id-ID' for Indonesian locale
  };

  return (
    <div className="container mx-auto p-6">
      {/* Filter Section */}
      <div className="flex space-x-4 mb-6">
        <select
          name="tahun"
          value={filters.tahun}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg">
          <option value="">Tahun</option>
          {Array.from(
            new Set(
              buletins.map((buletin) =>
                new Date(buletin.tanggalMasehi).getFullYear()
              )
            )
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          name="kelompok"
          value={filters.kelompok}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg">
          <option value="">Kelompok</option>
          <option value="Produk">Produk</option>
          <option value="Financing Model">Financing Model</option>
          <option value="Program">Program</option>
          <option value="Policy & Procedure">Policy & Procedure</option>
          <option value="Fitur Produk">Fitur Produk</option>
          <option value="Dana Kebajikan & Zakat">Dana Kebajikan & Zakat</option>
        </select>

        <select
          name="kategori"
          value={filters.kategori}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg">
          <option value="">Kategori</option>
          <option value="Financing">Financing</option>
          <option value="Asuransi">Asuransi</option>
          <option value="Kepatuhan Syariah">Kepatuhan Syariah</option>
          <option value="Dana Kebajikan & Zakat">Dana Kebajikan & Zakat</option>
          <option value="Funding">Funding</option>
          <option value="Syariah Card">Syariah Card</option>
          <option value="Investment">Investment</option>
          <option value="Trade Finance">Trade Finance</option>
          <option value="Layanan Jasa">Layanan Jasa</option>
          <option value="Zakat">Zakat</option>
          <option value="Treasury">Treasury</option>
          <option value="DBLM">DBLM</option>
        </select>

        <select
          name="subKategori"
          value={filters.subKategori}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg">
          <option value="">Sub-Kategori</option>
          <option value="Sub-Kategori 1">Sub-Kategori 1</option>
          <option value="Sub-Kategori 2">Sub-Kategori 2</option>
          <option value="Sub-Kategori 3">Sub-Kategori 3</option>
        </select>
      </div>

      {/* Table Section */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Nomor</th>
            <th className="py-2 px-4 border-b">Tanggal Masehi</th>
            <th className="py-2 px-4 border-b">Judul</th>
            <th className="py-2 px-4 border-b">Kelompok</th>
            <th className="py-2 px-4 border-b">Kategori</th>
            <th className="py-2 px-4 border-b">Sub-Kategori</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBuletins.map((buletin, index) => (
            <tr key={buletin._id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{buletin.nomor}</td>
              <td className="py-2 px-4">{formatDate(buletin.tanggalMasehi)}</td>
              <td className="py-2 px-4">{buletin.judul}</td>
              <td className="py-2 px-4">{buletin.kelompok}</td>
              <td className="py-2 px-4">{buletin.kategori}</td>
              <td className="py-2 px-4">{buletin.subKategori || "-"}</td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => handleDelete(buletin._id)}
                  className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBuletin;
