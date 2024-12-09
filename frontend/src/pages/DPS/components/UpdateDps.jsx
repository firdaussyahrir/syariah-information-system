import React, { useState } from "react";
import axios from "axios";

function UpdateDps({ dps, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    jenis: dps.jenis,
    nomor: dps.nomor,
    tanggalMasehi: dps.tanggalMasehi,
    judul: dps.judul,
    kelompok: dps.kelompok,
    kategori: dps.kategori,
    subKategori: dps.subKategori,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/dps/${dps._id}`,
        formData
      );
      alert("DPS updated successfully.");
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating DPS:", error);
      alert("Failed to update DPS.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-2xl font-bold mb-4">Edit DPS</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Judul</label>
            <input
              type="text"
              name="judul"
              value={formData.judul}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          {/* Add other input fields for jenis, nomor, tanggalMasehi, etc. */}
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
              onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateDps;
