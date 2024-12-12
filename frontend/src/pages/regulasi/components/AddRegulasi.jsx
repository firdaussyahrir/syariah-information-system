import React, { useState } from "react";
import axios from "axios";

function AddRegulasi() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fileRegulasi: null, // Ganti field sesuai dengan schema
    sektor: "",
    kelompok: "",
    klasifikasi: "",
    subKlasifikasi: "",
    ojk: "",
    berlakuUntuk: "",
    nomorPeraturan: "",
    tanggal: "",
    judul: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, fileRegulasi: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/regulasi", // Endpoint yang sesuai untuk Regulasi
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data.message);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating regulasi:", error);
      alert("Failed to create regulasi.");
    }
  };

  return (
    <div>
      {/* Button to Open Modal */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        onClick={() => setShowModal(true)}>
        Upload Regulasi
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-1/3 p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-center">
              Upload Regulasi
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-3">
                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Sektor
                  </label>
                  <select
                    name="sektor"
                    value={formData.sektor}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
                    <option value="Perbankan">Perbankan</option>
                    <option value="Pasar Modal">Pasar Modal</option>
                    <option value="Pasar Uang">Pasar Uang</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Kelompok
                  </label>
                  <input
                    type="text"
                    name="kelompok"
                    value={formData.kelompok}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Klasifikasi
                  </label>
                  <input
                    type="text"
                    name="klasifikasi"
                    value={formData.klasifikasi}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Sub-Klasifikasi
                  </label>
                  <input
                    type="text"
                    name="subKlasifikasi"
                    value={formData.subKlasifikasi}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    OJK
                  </label>
                  <select
                    name="ojk"
                    value={formData.ojk}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
                    <option value="POJK">POJK</option>
                    <option value="BI">BI</option>
                    <option value="SEBI">SEBI</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Berlaku Untuk
                  </label>
                  <select
                    name="berlakuUntuk"
                    value={formData.berlakuUntuk}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
                    <option value="BU">BU</option>
                    <option value="BUK">BUK</option>
                    <option value="BUS">BUS</option>
                    <option value="UUS">UUS</option>
                    <option value="Lain-lain">Lain-lain</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Nomor Peraturan
                  </label>
                  <input
                    type="text"
                    name="nomorPeraturan"
                    value={formData.nomorPeraturan}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
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
                    File Regulasi
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

export default AddRegulasi;
