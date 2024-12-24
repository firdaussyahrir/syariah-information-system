import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaFilePdf } from "react-icons/fa"; // Import icon untuk file PDF

function ListRegulasi() {
  const [regulasiData, setRegulasiData] = useState([]);
  const [filters, setFilters] = useState({
    tahun: "",
    sektor: "",
    ojk: "",
  });

  // Fetching data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/regulasi"); // Update dengan URL API yang benar
        setRegulasiData(response.data);
      } catch (error) {
        console.error("Error fetching regulasi data:", error);
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
    return date.toLocaleDateString("id-ID", options); // 'id-ID' untuk format tanggal Indonesia
  };

  // Filter the data based on selected filters
  const filteredData = regulasiData.filter((data) => {
    return (
      (!filters.tahun || data.tanggal.slice(0, 4) === filters.tahun) &&
      (!filters.sektor || data.sektor === filters.sektor) &&
      (!filters.ojk || data.ojk === filters.ojk)
    );
  });

  const handleDelete = async (id) => {
    // Konfirmasi untuk menghapus regulasi
    const confirmed = window.confirm(
      "Are you sure you want to delete this regulasi?"
    );

    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/regulasi/${id}`
        );

        if (response.status === 200) {
          // Perbarui state untuk menghapus data regulasi yang sudah dihapus dari daftar
          setRegulasiData((prevData) =>
            prevData.filter((regulasi) => regulasi._id !== id)
          );
          alert("Regulasi deleted successfully!");
        } else {
          alert("Failed to delete regulasi.");
        }
      } catch (error) {
        console.error("Error deleting regulasi:", error);
        alert("Failed to delete regulasi.");
      }
    }
  };

  const handleOpenPDF = (fileRegulasi) => {
    const pdfUrl = `http://localhost:3000/uploads/${fileRegulasi}`;
    window.open(pdfUrl, "_blank");
  };

  return (
    <div className="container mx-auto p-6">
      {/* Filter Section */}
      <div className="flex space-x-4 mb-6">
        {/* Dynamic Tahun Filter */}
        <select
          name="tahun"
          value={filters.tahun}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Tahun</option>
          {regulasiData
            .map((data) => data.tanggal.slice(0, 4)) // Extract year from tanggal
            .filter((value, index, self) => self.indexOf(value) === index) // Get unique years
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>

        {/* Sektor Filter */}
        <select
          name="sektor"
          value={filters.sektor}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Sektor</option>
          {["Perbankan", "Pasar Modal", "Pasar Uang"].map((sektor) => (
            <option key={sektor} value={sektor}>
              {sektor}
            </option>
          ))}
        </select>

        {/* OJK Filter */}
        <select
          name="ojk"
          value={filters.ojk}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">OJK</option>
          {["POJK", "BI", "SEBI"].map((ojk) => (
            <option key={ojk} value={ojk}>
              {ojk}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <table className="min-w-full table-auto border-collapse bg-white rounded-md shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 text-sm font-medium text-gray-600">No</th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Nomor Peraturan
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Judul
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Sektor
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Kelompok
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Klasifikasi
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Sub Klasifikasi
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">OJK</th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Berlaku Untuk
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Tanggal
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={data._id} className="border-t">
              <td className="py-2 px-4 text-sm text-gray-800">{index + 1}</td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {data.nomorPeraturan}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">{data.judul}</td>
              <td className="py-2 px-4 text-sm text-gray-800">{data.sektor}</td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {data.kelompok}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {data.klasifikasi}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {data.subKlasifikasi || "-"}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">{data.ojk}</td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {data.berlakuUntuk}
              </td>
              <td className="py-2 px-4 text-sm text-gray-800">
                {formatDate(data.tanggal)}
              </td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => handleOpenPDF(data.fileRegulasi)}
                  className="text-blue-500 hover:text-blue-700 text-sm mr-2">
                  <FaFilePdf />
                </button>
                <button
                  onClick={() => handleDelete(data._id)}
                  className="text-red-500 hover:text-red-700 text-sm">
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

export default ListRegulasi;
