import React, { useState } from "react";
import axios from "axios";

function AddRiset() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fileRiset: null,
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
    setFormData({ ...formData, fileRiset: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/riset", // Ganti dengan URL endpoint yang sesuai
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data.message);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating riset:", error);
      alert("Failed to create riset.");
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-md"
        onClick={() => setShowModal(true)}>
        Upload Riset
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md max-w-[800px] w-full p-6 space-y-4">
            <h2 className="text-xl font-medium text-center text-gray-800">
              Upload File Riset
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700">Jenis</label>
                  <select
                    name="kelompok"
                    value={formData.kelompok}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
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
                  <label className="block text-sm text-gray-700">Nomor</label>
                  <input
                    type="text"
                    name="nomor"
                    value={formData.nomor}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Tanggal Masehi
                  </label>
                  <input
                    type="date"
                    name="tanggalMasehi"
                    value={formData.tanggalMasehi}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">Judul</label>
                  <input
                    type="text"
                    name="judul"
                    value={formData.judul}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Kategori
                  </label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
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
                  <label className="block text-sm text-gray-700">
                    Sub-Kategori
                  </label>
                  <input
                    type="text"
                    name="subKategori"
                    value={formData.subKategori}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    File Riset
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-md">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-3 rounded-md">
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

export default AddRiset;
