import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Select from "react-select";
import { format } from "date-fns";

function Dashboard() {
  const [dataBuletin, setDataBuletin] = useState([]);
  const [dataDps, setDataDps] = useState([]);
  const [dataLrsa, setDataLrsa] = useState([]);
  const [dataRegulasi, setDataRegulasi] = useState([]);
  const [dataRiset, setDataRiset] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("month");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("12");

  const categories = [
    { value: "lrsa", label: "LRSA" },
    { value: "dps", label: "DPS" },
    { value: "regulasi", label: "Regulasi" },
    { value: "riset", label: "Riset" },
    { value: "buletin", label: "Buletin" },
    { value: "all", label: "Semua" },
  ];

  const timeFrames = [
    { value: "month", label: "Bulan" },
    { value: "year", label: "Tahun" },
    { value: "day", label: "Tanggal" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buletinRes = await axios.get("http://localhost:3000/api/buletin");
        const dpsRes = await axios.get("http://localhost:3000/api/dps");
        const lrsaRes = await axios.get("http://localhost:3000/api/lrsa");
        const regulasiRes = await axios.get(
          "http://localhost:3000/api/regulasi"
        );
        const risetRes = await axios.get("http://localhost:3000/api/riset");

        setDataBuletin(buletinRes.data?.data || []);
        setDataDps(dpsRes.data?.data || []);
        setDataLrsa(lrsaRes.data?.data || []);
        setDataRegulasi(regulasiRes.data?.data || []);
        setDataRiset(risetRes.data?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterData = () => {
    let filteredData = [];

    if (selectedCategory === "all") {
      filteredData = [
        ...dataBuletin,
        ...dataDps,
        ...dataLrsa,
        ...dataRegulasi,
        ...dataRiset,
      ];
    } else {
      switch (selectedCategory) {
        case "lrsa":
          filteredData = dataLrsa;
          break;
        case "dps":
          filteredData = dataDps;
          break;
        case "regulasi":
          filteredData = dataRegulasi;
          break;
        case "riset":
          filteredData = dataRiset;
          break;
        case "buletin":
          filteredData = dataBuletin;
          break;
        default:
          filteredData = [];
      }
    }

    return filteredData.filter((item) => {
      const date = new Date(
        item.tanggalMasehi || item.tanggal || item.createdAt
      );
      const itemMonth = date.getMonth() + 1;
      const itemYear = date.getFullYear();

      if (
        selectedTimeFrame === "month" &&
        itemMonth !== parseInt(selectedMonth)
      ) {
        return false;
      }
      if (selectedTimeFrame === "year" && itemYear !== parseInt(selectedYear)) {
        return false;
      }
      if (
        selectedTimeFrame === "day" &&
        format(date, "yyyy-MM-dd") !== format(new Date(), "yyyy-MM-dd")
      ) {
        return false;
      }

      return true;
    });
  };

  const createCategoryCounts = (filteredData) => {
    const counts = filteredData.reduce((acc, curr) => {
      acc[curr.kategori] = (acc[curr.kategori] || 0) + 1;
      return acc;
    }, {});
    return counts;
  };

  const generateTimeSeriesData = (filteredData) => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const countByMonth = months.map((month) => {
      return filteredData.filter((item) => {
        const date = new Date(
          item.tanggalMasehi || item.tanggal || item.createdAt
        );
        return date.getMonth() + 1 === month;
      }).length;
    });
    return countByMonth;
  };

  const filteredData = filterData();
  const categoryStats = createCategoryCounts(filteredData);
  const trendData = generateTimeSeriesData(filteredData);

  const barChartData = {
    labels: Object.keys(categoryStats),
    datasets: [
      {
        label: "Jumlah File per Kategori",
        data: Object.values(categoryStats),
        backgroundColor: "#4e73df",
        borderColor: "#4e73df",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(categoryStats),
    datasets: [
      {
        label: "Distribusi Kategori",
        data: Object.values(categoryStats),
        backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1"],
      },
    ],
  };

  const doughnutChartData = {
    labels: Object.keys(categoryStats),
    datasets: [
      {
        label: "Kategori Distribusi",
        data: Object.values(categoryStats),
        backgroundColor: ["#FFC300", "#DAF7A6", "#C70039", "#900C3F"],
      },
    ],
  };

  const lineChartData = {
    labels: Array.from({ length: 12 }, (_, i) =>
      format(new Date(2024, i), "MMM")
    ),
    datasets: [
      {
        label: "Jumlah File per Bulan",
        data: trendData,
        fill: false,
        borderColor: "#FF5733",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700">
            Filter Kategori:
          </label>
          <Select
            options={categories}
            onChange={(e) => setSelectedCategory(e.value)}
            value={categories.find(
              (option) => option.value === selectedCategory
            )}
          />
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700">
            Filter Waktu:
          </label>
          <Select
            options={timeFrames}
            onChange={(e) => setSelectedTimeFrame(e.value)}
            value={timeFrames.find(
              (option) => option.value === selectedTimeFrame
            )}
          />
        </div>
      </div>

      {/* Charts Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Jumlah File per Kategori
          </h3>
          <Bar data={barChartData} />
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Distribusi Kategori
          </h3>
          <Pie data={pieChartData} />
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Kategori Distribusi
          </h3>
          <Doughnut data={doughnutChartData} />
        </div>

        <div className="p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Jumlah File per Bulan
          </h3>
          <Line data={lineChartData} />
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Data Terfilter
        </h3>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Nomor</th>
              <th className="px-4 py-2 text-left">Judul</th>
              <th className="px-4 py-2 text-left">Kategori</th>
              <th className="px-4 py-2 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.nomor}</td>
                <td className="px-4 py-2">{item.judul}</td>
                <td className="px-4 py-2">{item.kategori}</td>
                <td className="px-4 py-2">
                  {new Date(
                    item.tanggalMasehi || item.tanggal
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
