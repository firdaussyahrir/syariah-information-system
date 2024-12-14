import React, { useState, useEffect } from "react";
import axios from "axios";

function EditDps({ dpsId }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    jenis: "",
    nomor: "",
    tanggalMasehi: "",
    judul: "",
    kelompok: "",
    kategori: "",
    subKategori: "",
    fileDps: null,
  });

  // Load existing DPS data on component mount
  useEffect(() => {
    const fetchDpsData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/dps/${dpsId}`
        );
        const dpsData = response.data;

        // Format date for input (yyyy-mm-dd)
        const formattedDate = new Date(dpsData.tanggalMasehi)
          .toISOString()
          .split("T")[0];

        setFormData({
          jenis: dpsData.jenis,
          nomor: dpsData.nomor,
          tanggalMasehi: formattedDate, // formatted date for date input
          judul: dpsData.judul,
          kelompok: dpsData.kelompok,
          kategori: dpsData.kategori,
          subKategori: dpsData.subKategori,
          fileDps: null, // not showing the previous file, just allowing the user to upload a new one
        });
        setShowModal(true);
      } catch (error) {
        console.error("Error fetching DPS data:", error);
        alert("Failed to load DPS data.");
      }
    };
    fetchDpsData();
  }, [dpsId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, fileDps: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Debugging: log formData to see if values are correct
    console.log("Form data before submit:", formData);

    // Prepare form data to send
    const formDataToSend = new FormData();

    // Append form fields (including file)
    Object.keys(formData).forEach((key) => {
      if (key === "fileDps" && formData[key]) {
        console.log("Appending fileDps:", formData[key]); // Debugging: Check if file is being added
        formDataToSend.append(key, formData[key]);
      } else if (key !== "fileDps") {
        console.log(`Appending ${key}:`, formData[key]); // Debugging: Check all other data
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.put(
        `http://localhost:3000/api/dps/${dpsId}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Response from server:", response); // Debugging: Check response
      alert(response.data.message);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating DPS:", error);
      alert("Failed to update DPS.");
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-md"
        onClick={() => setShowModal(true)}>
        Edit DPS
      </button>
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md max-w-[800px] w-full p-6 space-y-4">
            <h2 className="text-xl font-medium text-center text-gray-800">
              Edit File DPS
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700">Jenis</label>
                  <select
                    name="jenis"
                    value={formData.jenis}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">Select</option>
                    <option value="Opini DPS">Opini DPS</option>
                    <option value="Risalah Rapat">Risalah Rapat</option>
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
                    Kelompok
                  </label>
                  <select
                    name="kelompok"
                    value={formData.kelompok}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    <option value="Lain-Lain">Lain-Lain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Kategori
                  </label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    <option value="Lain-Lain">Lain-Lain</option>
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
                    File DPS
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  className="bg-blue-500 text-white px-6 py-3 rounded-md">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditDps;
