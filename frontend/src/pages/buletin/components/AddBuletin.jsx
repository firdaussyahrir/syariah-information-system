import React, { useState } from "react";
import axios from "axios";

function AddBuletin() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fileBuletin: null, // Ganti dengan field yang sesuai di schema
    nomor: "",
    tanggalMasehi: "",
    judul: "",
    kelompok: "",
    kategori: "",
    subKategori: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, fileBuletin: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/buletin", // Endpoint yang sesuai untuk Buletin
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data.message);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating buletin:", error);
      alert("Failed to create buletin.");
    }
  };

  return (
    <div>
      {/* Button to Open Modal */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        onClick={() => setShowModal(true)}>
        Upload Buletin
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-1/3 p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-center">
              Upload Buletin
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Kelompok
                  </label>
                  <select
                    name="kelompok"
                    value={formData.kelompok}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
                    <option value="Produk">Produk</option>
                    <option value="Financing Model">Financing Model</option>
                    <option value="Program">Program</option>
                    <option value="Policy & Procedure">
                      Policy & Procedure
                    </option>
                    <option value="Fitur Produk">Fitur Produk</option>
                    <option value="Dana Kebajikan & Zakat">
                      Dana Kebajikan & Zakat
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Nomor
                  </label>
                  <input
                    type="text"
                    name="nomor"
                    value={formData.nomor}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Tanggal Masehi
                  </label>
                  <input
                    type="date"
                    name="tanggalMasehi"
                    value={formData.tanggalMasehi}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Judul
                  </label>
                  <input
                    type="text"
                    name="judul"
                    value={formData.judul}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Kategori
                  </label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
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

                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Sub-Kategori
                  </label>
                  <input
                    type="text"
                    name="subKategori"
                    value={formData.subKategori}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    File Buletin
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddBuletin;
