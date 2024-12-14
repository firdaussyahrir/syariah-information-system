import React, { useState } from "react";
import axios from "axios";

function AddLrsa() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    jenis: "",
    nomor: "",
    tanggalMasehi: "",
    judul: "",
    namaPIC: "",
    proposedDirectorat: "",
    directorate: "",
    business: "",
    project: "",
    review: "",
    lrsaType: "",
    classific: "",
    fileLrsa: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, fileLrsa: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/lrsa",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(response.data.message);
      setShowModal(false);
    } catch (error) {
      console.error("Error creating LRSA:", error.response || error);
      alert("Failed to create LRSA.");
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-md"
        onClick={() => setShowModal(true)}>
        Upload LRSA
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-md w-2/3 lg:w-1/2 p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-center">
              Upload File LRSA
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Jenis */}
                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Jenis
                  </label>
                  <select
                    name="jenis"
                    value={formData.jenis}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
                    <option value="SAS">SAS</option>
                    <option value="SLA">SLA</option>
                  </select>
                </div>

                {/* Nomor */}
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

                {/* Tanggal Masehi */}
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

                {/* Judul */}
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

                {/* Nama PIC */}
                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Nama PIC
                  </label>
                  <select
                    name="namaPIC"
                    value={formData.namaPIC}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
                    <option value="YH Yogi Herdiana">YH Yogi Herdiana</option>
                    <option value="BHR Berlianto Haris">
                      BHR Berlianto Haris
                    </option>
                    <option value="MBS M Budi Setiawan">
                      MBS M Budi Setiawan
                    </option>
                    <option value="RRP Rudi Rinaldy Pratama">
                      RRP Rudi Rinaldy Pratama
                    </option>
                    <option value="DA Diah Arini">DA Diah Arini</option>
                    <option value="KD Karima Dewi">KD Karima Dewi</option>
                  </select>
                </div>

                {/* Proposed Directorate */}
                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Proposed Directorate
                  </label>
                  <select
                    name="proposedDirectorat"
                    value={formData.proposedDirectorat}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
                    <option value="SBB Shariah Business Banking">
                      SBB Shariah Business Banking
                    </option>
                    <option value="SCB Shariah Consumer Banking">
                      SCB Shariah Consumer Banking
                    </option>
                    <option value="SPBA Shariah Risk Control Unit">
                      SPBA Shariah Risk Control Unit
                    </option>
                    <option value="SAL Shariah Advisory & Legal">
                      SAL Shariah Advisory & Legal
                    </option>
                    <option value="SS Shariah Strategy">
                      SS Shariah Strategy
                    </option>
                  </select>
                </div>

                {/* Directorate */}
                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Directorate
                  </label>
                  <select
                    name="directorate"
                    value={formData.directorate}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
                    <option value="Shariah">Shariah</option>
                    <option value="Banking">Banking</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Banking & Financial Institution">
                      Banking & Financial Institution
                    </option>
                    <option value="Consumer Banking">Consumer Banking</option>
                    <option value="Risk Management">Risk Management</option>
                    <option value="Compliance Corporate">
                      Compliance Corporate
                    </option>
                    <option value="Affairs & Legal">Affairs & Legal</option>
                    <option value="Treasury & Capital Market Strategy">
                      Treasury & Capital Market Strategy
                    </option>
                    <option value="Finance & SPAPM">Finance & SPAPM</option>
                    <option value="Operation & IT">Operation & IT</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="DPS (Dewan Pengawas Syariah)">
                      DPS (Dewan Pengawas Syariah)
                    </option>
                  </select>
                </div>

                {/* Business */}
                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Business
                  </label>
                  <select
                    name="business"
                    value={formData.business}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
                    <option value="Business">Business</option>
                    <option value="Support">Support</option>
                  </select>
                </div>

                {/* Project */}
                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Project
                  </label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
                    <option value="Project">Project</option>
                    <option value="Non Project">Non Project</option>
                    <option value="Secretariat">Secretariat</option>
                    <option value="DPS">DPS</option>
                    <option value="Dana Kebajikan">Dana Kebajikan</option>
                  </select>
                </div>

                {/* Review */}
                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Review
                  </label>
                  <select
                    name="review"
                    value={formData.review}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
                    <option value="Review">Review</option>
                    <option value="Non Review">Non Review</option>
                  </select>
                </div>

                {/* LRSA Type */}
                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    LRSA Type
                  </label>
                  <select
                    name="lrsaType"
                    value={formData.lrsaType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
                    <option value="LRSA-SAS">LRSA-SAS</option>
                    <option value="E-LESA-SAS">E-LESA-SAS</option>
                    <option value="LRSA-SLA">LRSA-SLA</option>
                    <option value="E-LESA-SLA">E-LESA-SLA</option>
                    <option value="E-LRSA-SLA-NN">E-LRSA-SLA-NN</option>
                  </select>
                </div>

                {/* Classific */}
                <div>
                  <label className="block font-medium text-sm text-gray-600">
                    Classific
                  </label>
                  <select
                    name="classific"
                    value={formData.classific}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required>
                    <option value="">Select</option>
                    <option value="P&P Policy & Procedure">
                      P&P Policy & Procedure
                    </option>
                    <option value="P&S Product & Service">
                      P&S Product & Service
                    </option>
                    <option value="PRG Program">PRG Program</option>
                    <option value="FIN Financing">FIN Financing</option>
                    <option value="FUND Funding">FUND Funding</option>
                    <option value="MC MarComm">MC MarComm</option>
                    <option value="E Others">E Others</option>
                  </select>
                </div>

                {/* File LRSA */}
                <div className="col-span-2">
                  <label className="block font-medium text-sm text-gray-600">
                    File LRSA
                  </label>
                  <input
                    type="file"
                    name="fileLrsa"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
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

export default AddLrsa;
