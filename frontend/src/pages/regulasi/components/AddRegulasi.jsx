import React, { useState } from "react";
import axios from "axios";

function AddRegulasi() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fileRegulasi: null,
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
        "http://localhost:3000/api/regulasi",
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
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-md"
        onClick={() => setShowModal(true)}>
        Upload Regulasi
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md max-w-[800px] w-full p-6 space-y-4">
            <h2 className="text-xl font-medium text-center text-gray-800">
              Upload Regulasi
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700">Sektor</label>
                  <select
                    name="sektor"
                    value={formData.sektor}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required>
                    <option value="">Select</option>
                    <option value="Perbankan">Perbankan</option>
                    <option value="Pasar Modal">Pasar Modal</option>
                    <option value="Pasar Uang">Pasar Uang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Kelompok
                  </label>
                  <input
                    type="text"
                    name="kelompok"
                    value={formData.kelompok}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Klasifikasi
                  </label>
                  <input
                    type="text"
                    name="klasifikasi"
                    value={formData.klasifikasi}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Sub-Klasifikasi
                  </label>
                  <input
                    type="text"
                    name="subKlasifikasi"
                    value={formData.subKlasifikasi}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">OJK</label>
                  <select
                    name="ojk"
                    value={formData.ojk}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required>
                    <option value="">Select</option>
                    <option value="POJK">POJK</option>
                    <option value="BI">BI</option>
                    <option value="SEBI">SEBI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-700">
                    Berlaku Untuk
                  </label>
                  <select
                    name="berlakuUntuk"
                    value={formData.berlakuUntuk}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                  <label className="block text-sm text-gray-700">
                    Nomor Peraturan
                  </label>
                  <input
                    type="text"
                    name="nomorPeraturan"
                    value={formData.nomorPeraturan}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700">Tanggal</label>
                  <input
                    type="date"
                    name="tanggal"
                    value={formData.tanggal}
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
                    File Regulasi
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

export default AddRegulasi;
