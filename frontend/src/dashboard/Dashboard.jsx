import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";
import axios from "axios";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

function Dashboard() {
  const [userStats, setUserStats] = useState([]);
  const [fileStats, setFileStats] = useState([]);
  const [chartsData, setChartsData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Januari = 1

  // Fetch user statistics
  useEffect(() => {
    const fetchUserStats = async () => {
      const response = await axios.get("http://localhost:3000/api/users/stats");
      setUserStats(response.data);
    };
    fetchUserStats();
  }, []);

  // Fetch file statistics based on year and month
  useEffect(() => {
    const fetchFileStats = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/files/stats?year=${year}&month=${month}`
      );
      setFileStats(response.data);
    };
    fetchFileStats();
  }, [year, month]);

  // Fetch chart statistics data
  useEffect(() => {
    const fetchChartsData = async () => {
      const response = await axios.get("http://localhost:3000/api/charts");
      setChartsData(response.data);
    };
    fetchChartsData();
  }, []);

  // Line Chart Data
  const lineChartData = {
    labels: chartsData?.labels || [],
    datasets: [
      {
        label: "Dataset 1",
        data: chartsData?.lineData?.dataset1 || [],
        borderColor: "#4CAF50",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Dataset 2",
        data: chartsData?.lineData?.dataset2 || [],
        borderColor: "#FF9800",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Bar Chart Data
  const barChartData = {
    labels: chartsData?.labels || [],
    datasets: [
      {
        label: "Bar Dataset 1",
        data: chartsData?.barData?.dataset1 || [],
        backgroundColor: "#2196F3",
      },
      {
        label: "Bar Dataset 2",
        data: chartsData?.barData?.dataset2 || [],
        backgroundColor: "#FF5722",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Card 1: Statistik Semua Pengguna */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Statistik Semua Pengguna
          </h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left py-2 px-4">Username</th>
                <th className="text-left py-2 px-4">Jumlah Upload</th>
                <th className="text-left py-2 px-4">Tanggal Terakhir Upload</th>
              </tr>
            </thead>
            <tbody>
              {userStats.map((user) => (
                <tr key={user.username} className="border-b">
                  <td className="py-2 px-4">{user.username}</td>
                  <td className="py-2 px-4">{user.uploadCount}</td>
                  <td className="py-2 px-4">
                    {new Date(user.lastUpload).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card 2: Jumlah Data File dengan Filter */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Jumlah Data File Upload
          </h2>

          <div className="flex items-center space-x-4 mb-6">
            <div>
              <label className="text-gray-700">Tahun</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-gray-100 p-2 rounded">
                {/* Menampilkan tahun dari 2020 sampai tahun sekarang */}
                {[...Array(10).keys()].map((i) => {
                  const yearOption = 2020 + i;
                  return (
                    <option key={yearOption} value={yearOption}>
                      {yearOption}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="text-gray-700">Bulan</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="bg-gray-100 p-2 rounded">
                {[...Array(12).keys()].map((i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Data File:
            </h3>
            <ul className="space-y-2">
              {fileStats.map((file) => (
                <li key={file.id} className="bg-gray-50 p-3 rounded-lg shadow">
                  <p className="font-medium text-gray-800">{file.name}</p>
                  <p className="text-gray-600">Jumlah: {file.count}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 3: Statistik Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Statistik Upload
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Line Chart Example
              </h3>
              <Line data={lineChartData} options={{ responsive: true }} />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Bar Chart Example
              </h3>
              <Bar data={barChartData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
