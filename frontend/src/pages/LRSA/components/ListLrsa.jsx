import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa"; // Importing trash icon

function ListLrsa() {
  const [lrsaData, setLrsaData] = useState([]);
  const [filters, setFilters] = useState({
    jenis: "",
    tahun: "",
    namaPIC: "",
    directorate: "",
    project: "",
    lrsaType: "",
    proposedDirectorat: "",
    business: "",
    review: "",
    classific: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch LRSA data from the API
  const fetchLrsaData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/lrsa", {
        params: filters, // Send filters as query params to the API
      });
      setLrsaData(response.data); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching LRSA data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLrsaData(); // Initial data load
  }, [filters]); // Reload data whenever filters change

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Get the current year and create a range for the last 5 years dynamically
  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let i = 0; i < 5; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  // Handle delete action with confirmation
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this LRSA?"
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/lrsa/${id}`
        );
        if (response.data.success) {
          alert("LRSA deleted successfully");
          fetchLrsaData(); // Refresh data after deletion
        }
      } catch (error) {
        console.error("Error deleting LRSA:", error);
        alert("Failed to delete LRSA");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Filter Section */}
      <div className="flex space-x-4 mb-6">
        <select
          name="jenis"
          value={filters.jenis}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Jenis</option>
          <option value="SAS">SAS</option>
          <option value="SLA">SLA</option>
        </select>

        <select
          name="tahun"
          value={filters.tahun}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Semua Tahun</option>
          {getYearRange().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          name="namaPIC"
          value={filters.namaPIC}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Nama PIC</option>
          <option value="YH Yogi Herdiana">YH Yogi Herdiana</option>
          <option value="BHR Berlianto Haris">BHR Berlianto Haris</option>
          <option value="MBS M Budi Setiawan">MBS M Budi Setiawan</option>
          <option value="RRP Rudi Rinaldy Pratama">
            RRP Rudi Rinaldy Pratama
          </option>
          <option value="DA Diah Arini">DA Diah Arini</option>
          <option value="KD Karima Dewi">KD Karima Dewi</option>
        </select>

        <select
          name="directorate"
          value={filters.directorate}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Directorate</option>
          <option value="Shariah">Shariah</option>
          <option value="Banking">Banking</option>
          <option value="Corporate">Corporate</option>
        </select>

        <select
          name="project"
          value={filters.project}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Project</option>
          <option value="Project">Project</option>
          <option value="Non Project">Non Project</option>
          <option value="Secretariat">Secretariat</option>
          <option value="DPS">DPS</option>
          <option value="Dana Kebajikan">Dana Kebajikan</option>
        </select>
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
              Nama PIC
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Proposed Directorate
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Directorate
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Business
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Project
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Review
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              LRSA Type
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Classific
            </th>
            <th className="py-2 px-4 text-sm font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="13" className="text-center py-4">
                Loading...
              </td>
            </tr>
          ) : (
            lrsaData.map((item, index) => (
              <tr key={item._id} className="border-t">
                <td className="py-2 px-4 text-sm text-gray-800">{index + 1}</td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {item.jenis}
                </td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {item.nomor}
                </td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {new Date(item.tanggalMasehi).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {item.judul}
                </td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {item.namaPIC}
                </td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {item.proposedDirectorat}
                </td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {item.directorate}
                </td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {item.business}
                </td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {item.project}
                </td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {item.review}
                </td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {item.lrsaType}
                </td>
                <td className="py-2 px-4 text-sm text-gray-800">
                  {item.classific}
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700 text-sm">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ListLrsa;
