import React from "react";
import { Link } from "react-router-dom";
import {
  FaUsers, // Ikon untuk Dewan Pengawas Syariah (DPS)
  FaFileAlt, // Ikon untuk Lembar Review Syariah (LRSA)
  FaBuilding, // Ikon untuk Regulasi Perbankan
  FaChartLine, // Ikon untuk Riset
  FaNewspaper, // Ikon untuk Buletin
  FaQuoteRight,
} from "react-icons/fa";

function Home() {
  // Hadith tetap yang akan ditampilkan
  const hadith =
    "The best among you are those who have the best manners and character.";

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Syariah Information System
        </h1>
        <p className="text-lg text-gray-600">
          Simplifying Syariah Data Management with Elegance
        </p>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12 max-w-screen-lg px-6">
        {[
          {
            to: "/dps",
            icon: <FaUsers className="text-blue-600 text-5xl mb-4" />,
            text: "Dewan Pengawas Syariah (DPS)",
          },
          {
            to: "/lrsa",
            icon: <FaFileAlt className="text-green-600 text-5xl mb-4" />,
            text: "Lembar Review Syariah (LRSA)",
          },
          {
            to: "/regulasi",
            icon: <FaBuilding className="text-yellow-600 text-5xl mb-4" />,
            text: "Regulasi Perbankan",
          },
          {
            to: "/riset",
            icon: <FaChartLine className="text-purple-600 text-5xl mb-4" />,
            text: "Riset",
          },
          {
            to: "/buletin",
            icon: <FaNewspaper className="text-red-600 text-5xl mb-4" />,
            text: "Buletin",
          },
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.to}
            className="flex flex-col items-center justify-center p-6 rounded-lg shadow-md border border-gray-300 text-center hover:bg-blue-50 transition-all duration-200">
            {item.icon}
            <span className="text-lg font-medium mt-4 text-gray-700">
              {item.text}
            </span>
          </Link>
        ))}
      </main>

      {/* Hadith Section - Card Statis */}
      <section className="mt-12 bg-white p-8 rounded-lg shadow-md text-center max-w-lg mx-auto">
        <FaQuoteRight className="text-blue-600 text-4xl mx-auto mb-6" />
        <p className="text-xl italic text-gray-700">"{hadith}"</p>
        <p className="mt-4 text-gray-500">- Hadith</p>
      </section>
    </div>
  );
}

export default Home;
