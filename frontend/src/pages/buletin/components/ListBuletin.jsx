import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt, FaEye, FaEdit } from "react-icons/fa"; // Import Edit icon

const ListBuletin = () => {
  const [buletins, setBuletins] = useState([]);
  const [filters, setFilters] = useState({
    tahun: "",
    kelompok: "",
    kategori: "",
  });
  const [selectedBuletin, setSelectedBuletin] = useState(null); // State for editing a specific Buletin
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State to manage modal visibility
  const [formData, setFormData] = useState({
    nomor: "",
    tanggalMasehi: "",
    judul: "",
    kelompok: "",
    kategori: "",
    subKategori: "",
    fileBuletin: "",
  }); // State to handle form input

  useEffect(() => {
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
    if (!confirmDelete) return;

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

  // Handle view PDF (open in a new tab)
  const handleViewPdf = (fileName) => {
    const pdfUrl = `http://localhost:3000/uploads/${fileName}`;
    window.open(pdfUrl, "_blank");
  };

  // Format the date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
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

  // Handle opening the modal to edit a Buletin
  const handleEdit = (buletin) => {
    setFormData({
      nomor: buletin.nomor,
      tanggalMasehi: buletin.tanggalMasehi,
      judul: buletin.judul,
      kelompok: buletin.kelompok,
      kategori: buletin.kategori,
      subKategori: buletin.subKategori || "",
      fileBuletin: buletin.fileBuletin,
    });
    setSelectedBuletin(buletin);
    setIsEditModalOpen(true); // Open the modal
  };

  // Handle form input changes for editing
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle submitting the edited Buletin
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/buletin/${selectedBuletin._id}`,
        formData
      );
      alert(response.data.message);
      setBuletins(
        buletins.map((buletin) =>
          buletin._id === selectedBuletin._id
            ? { ...buletin, ...formData }
            : buletin
        )
      );
      setIsEditModalOpen(false); // Close the modal after success
    } catch (error) {
      console.error("Error updating Buletin:", error);
      alert("Failed to update Buletin.");
    }
  };

  // Filter the buletins based on selected filters
  const filteredBuletins = buletins.filter((buletin) => {
    return (
      (!filters.tahun ||
        new Date(buletin.tanggalMasehi).getFullYear().toString() ===
          filters.tahun) &&
      (!filters.kelompok || buletin.kelompok === filters.kelompok) &&
      (!filters.kategori || buletin.kategori === filters.kategori)
    );
  });

  return (
    <div className="container mx-auto p-6">
      {/* Filter Section */}
      <div className="flex space-x-4 mb-6">
        <select
          name="tahun"
          value={filters.tahun}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Tahun</option>
          {getYearRange().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          name="kelompok"
          value={filters.kelompok}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
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
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
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
      <table className="min-w-full table-auto border-collapse bg-white rounded-md shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 text-sm font-medium text-gray-600">No</th>
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
          {filteredBuletins.map((buletin, index) => (
            <tr key={buletin._id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{buletin.nomor}</td>
              <td className="py-2 px-4">{formatDate(buletin.tanggalMasehi)}</td>
              <td className="py-2 px-4">{buletin.judul}</td>
              <td className="py-2 px-4">{buletin.kelompok}</td>
              <td className="py-2 px-4">{buletin.kategori}</td>
              <td className="py-2 px-4">{buletin.subKategori}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleViewPdf(buletin.fileBuletin)}
                  className="text-blue-500 hover:text-blue-700 mr-4">
                  <FaEye />
                </button>
                <button
                  onClick={() => handleEdit(buletin)}
                  className="text-yellow-500 hover:text-yellow-700 mr-4">
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(buletin._id)}
                  className="text-red-500 hover:text-red-700">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Edit Buletin */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Edit Buletin</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="nomor"
                  className="block text-sm font-medium text-gray-700">
                  Nomor
                </label>
                <input
                  type="text"
                  id="nomor"
                  name="nomor"
                  value={formData.nomor}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="tanggalMasehi"
                  className="block text-sm font-medium text-gray-700">
                  Tanggal Masehi
                </label>
                <input
                  type="date"
                  id="tanggalMasehi"
                  name="tanggalMasehi"
                  value={formData.tanggalMasehi}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="judul"
                  className="block text-sm font-medium text-gray-700">
                  Judul
                </label>
                <input
                  type="text"
                  id="judul"
                  name="judul"
                  value={formData.judul}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="kelompok"
                  className="block text-sm font-medium text-gray-700">
                  Kelompok
                </label>
                <input
                  type="text"
                  id="kelompok"
                  name="kelompok"
                  value={formData.kelompok}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="kategori"
                  className="block text-sm font-medium text-gray-700">
                  Kategori
                </label>
                <input
                  type="text"
                  id="kategori"
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subKategori"
                  className="block text-sm font-medium text-gray-700">
                  Sub Kategori
                </label>
                <input
                  type="text"
                  id="subKategori"
                  name="subKategori"
                  value={formData.subKategori}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Update Buletin
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListBuletin;
