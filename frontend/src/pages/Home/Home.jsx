import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaRegFileAlt,
  FaBook,
  FaRegNewspaper,
  FaClipboardList,
  FaQuoteRight,
  FaArrowRight,
} from "react-icons/fa";

function Home() {
  const [hadith, setHadith] = useState("");

  const hadiths = [
    "The best among you are those who have the best manners and character.",
    "The best of you are those who learn the Quran and teach it.",
    "Make things easy for people and do not make it difficult for them.",
    "A kind word is a form of charity.",
    "The strong man is not the one who is strong in wrestling, but the one who controls himself in anger.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * hadiths.length);
      setHadith(hadiths[randomIndex]);
    }, 5000); // Change hadith every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 text-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-blue-700 mb-4">
            Syariah Information System
          </h1>
          <p className="text-lg text-gray-600">
            Simplifying Syariah Data Management with Elegance
          </p>
        </header>

        <main>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/regulasi"
              className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg hover:scale-105 transition transform">
              <FaClipboardList className="text-blue-600 text-5xl mb-4" />
              <span className="text-xl font-semibold">Regulasi</span>
            </Link>
            <Link
              to="/lrsa"
              className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg hover:scale-105 transition transform">
              <FaBook className="text-green-600 text-5xl mb-4" />
              <span className="text-xl font-semibold">LRSA</span>
            </Link>
            <Link
              to="/dps"
              className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg hover:scale-105 transition transform">
              <FaRegFileAlt className="text-yellow-600 text-5xl mb-4" />
              <span className="text-xl font-semibold">DPS</span>
            </Link>
            <Link
              to="/riset"
              className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg hover:scale-105 transition transform">
              <FaRegNewspaper className="text-purple-600 text-5xl mb-4" />
              <span className="text-xl font-semibold">Riset</span>
            </Link>
            <Link
              to="/buletin"
              className="flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-lg hover:scale-105 transition transform">
              <FaRegNewspaper className="text-red-600 text-5xl mb-4" />
              <span className="text-xl font-semibold">Buletin</span>
            </Link>
          </section>

          <section className="mt-16">
            <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-8 rounded-xl shadow-md text-center">
              <FaQuoteRight className="text-blue-600 text-6xl mx-auto mb-6" />
              <p className="text-2xl italic text-gray-700">"{hadith}"</p>
              <p className="mt-6 text-gray-500">- Hadith</p>
            </div>
          </section>

          <section className="mt-16 text-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 text-lg font-medium transition">
              Explore More <FaArrowRight className="ml-3 text-lg" />
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Home;
