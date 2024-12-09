import React, { useEffect, useState } from "react";
import axios from "axios";

const ListDps = () => {
  const [dpsData, setDpsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDps = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/dps");
      setDpsData(response.data);
    } catch (error) {
      console.error("Error fetching DPS data:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDps = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:3000/api/dps/${id}`);
        setDpsData((prev) => prev.filter((item) => item._id !== id));
        alert("DPS deleted successfully");
      } catch (error) {
        console.error("Error deleting DPS:", error);
      }
    }
  };

  useEffect(() => {
    fetchDps();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">List DPS</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Jenis</th>
            <th className="border border-gray-300 px-4 py-2">Nomor</th>
            <th className="border border-gray-300 px-4 py-2">Tanggal Masehi</th>
            <th className="border border-gray-300 px-4 py-2">Judul</th>
            <th className="border border-gray-300 px-4 py-2">Kelompok</th>
            <th className="border border-gray-300 px-4 py-2">Kategori</th>
            <th className="border border-gray-300 px-4 py-2">Sub-Kategori</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {dpsData.map((dps, index) => (
            <tr key={dps._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-center">
                {index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2">{dps.jenis}</td>
              <td className="border border-gray-300 px-4 py-2">{dps.nomor}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(dps.tanggalMasehi).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">{dps.judul}</td>
              <td className="border border-gray-300 px-4 py-2">
                {dps.kelompok}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {dps.kategori}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {dps.subKategori || "-"}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => alert("Viewing " + dps.judul)}
                  className="bg-blue-500 text-white px-3 py-1 mr-2 rounded hover:bg-blue-600">
                  View
                </button>
                <button
                  onClick={() => alert("Editing " + dps.judul)}
                  className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded hover:bg-yellow-600">
                  Edit
                </button>
                <button
                  onClick={() => deleteDps(dps._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
                <a
                  href={`http://localhost:3000/uploads/${dps.fileDps}`}
                  download
                  className="bg-green-500 text-white px-3 py-1 ml-2 rounded hover:bg-green-600">
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDps;
