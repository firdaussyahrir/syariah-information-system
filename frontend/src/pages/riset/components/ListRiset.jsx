import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa"; // Icon for delete button

function ListRiset() {
  const [risetData, setRisetData] = useState([]);
  const [filters, setFilters] = useState({
    tahun: "",
    kelompok: "",
    kategori: "",
  });

  // Fetching data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/riset"); // Update with correct API URL
        setRisetData(response.data);
      } catch (error) {
        console.error("Error fetching riset data:", error);
      }
    };

    fetchData();
  }, []);

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
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options); // 'id-ID' for Indonesian locale (adjust if needed)
  };

  // Filter the data based on selected filters
  const filteredData = risetData.filter((data) => {
    return (
      (!filters.tahun || data.tanggalMasehi.slice(0, 4) === filters.tahun) &&
      (!filters.kelompok || data.kelompok === filters.kelompok) &&
      (!filters.kategori || data.kategori === filters.kategori)
    );
  });

  const handleDelete = async (id) => {
    // Konfirmasi untuk menghapus riset
    const confirmed = window.confirm(
      "Are you sure you want to delete this riset?"
    );

    if (confirmed) {
      try {
        // Gantilah URL API dari dps menjadi riset
        const response = await axios.delete(
          `http://localhost:3000/api/riset/${id}`
        );

        if (response.status === 200) {
          // Perbarui state untuk menghapus data riset yang sudah dihapus dari daftar
          setRisetData((prevData) =>
            prevData.filter((riset) => riset.id !== id)
          );
          alert("Riset deleted successfully!");
        } else {
          alert("Failed to delete riset.");
        }
      } catch (error) {
        console.error("Error deleting riset:", error);
        alert("Failed to delete riset.");
      }
    }
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
          {risetData
            .map((data) => data.tanggalMasehi.slice(0, 4))
            .filter((value, index, self) => self.indexOf(value) === index) // Get unique years
            .map((year) => (
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
          {[
            "Produk",
            "Financing Model",
            "Program",
            "Policy & Procedure",
            "Fitur Produk",
            "Dana Kebajikan & Zakat",
          ].map((kelompok) => (
            <option key={kelompok} value={kelompok}>
              {kelompok}
            </option>
          ))}
        </select>

        <select
          name="kategori"
          value={filters.kategori}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg">
          <option value="">Kategori</option>
          {[
            "Financing",
            "Asuransi",
            "Kepatuhan Syariah",
            "Dana Kebajikan & Zakat",
            "Funding",
            "Syariah Card",
            "Investment",
            "Trade Finance",
            "Layanan Jasa",
            "Zakat",
            "Treasury",
            "DBLM",
          ].map((kategori) => (
            <option key={kategori} value={kategori}>
              {kategori}
            </option>
          ))}
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
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={data.id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{data.nomor}</td>
              <td className="py-2 px-4">{formatDate(data.tanggalMasehi)}</td>
              <td className="py-2 px-4">{data.judul}</td>
              <td className="py-2 px-4">{data.kelompok}</td>
              <td className="py-2 px-4">{data.kategori}</td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => handleDelete(data.id)}
                  className="text-red-500 hover:text-red-700">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListRiset;
