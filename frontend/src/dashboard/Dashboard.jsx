import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register components
ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  // Simulasi data API
  useEffect(() => {
    const fetchData = async () => {
      // Fetch data dari backend (contoh data statis)
      const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Regulasi",
            data: [12, 19, 10, 15, 22, 18],
            borderColor: "#4682A9",
            backgroundColor: "rgba(70, 130, 169, 0.5)",
            borderWidth: 2,
          },
          {
            label: "DPS",
            data: [5, 10, 6, 7, 8, 10],
            borderColor: "#749BC2",
            backgroundColor: "rgba(116, 155, 194, 0.5)",
            borderWidth: 2,
          },
        ],
      };

      setChartData(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {loading ? (
        <p>Loading charts...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Line Chart */}
          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              Trend Regulasi
            </h2>
            <Line data={chartData} />
          </div>

          {/* Bar Chart */}
          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Jumlah DPS</h2>
            <Bar data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
