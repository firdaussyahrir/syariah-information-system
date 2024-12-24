import React from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaFileAlt,
  FaBuilding,
  FaChartLine,
  FaNewspaper,
  FaQuoteRight,
} from "react-icons/fa";

function Home() {
  const hadith =
    "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lain. (HR. Ahmad, Thabrani)";
  "Allah tidak akan membebani seseorang melainkan sesuai dengan kesanggupannya. (QS. Al-Baqarah: 286)",
    "Barang siapa bersabar, maka Allah akan menjadikannya sabar. (HR. Bukhari)",
    "Jangan marah, maka bagimu surga. (HR. Thabrani)",
    "Setiap kesulitan pasti ada kemudahan. (QS. Al-Insyirah: 6)",
    "Tidak ada penyakit yang Allah turunkan, kecuali Dia juga turunkan obatnya. (HR. Bukhari)",
    "Kamu tidak akan pernah gagal sampai kamu berhenti mencoba. (HR. Muslim)",
    "Barang siapa menempuh jalan mencari ilmu, Allah mudahkan baginya jalan ke surga. (HR. Muslim)",
    "Sedekah tidak akan mengurangi harta. (HR. Muslim)",
    "Bertakwalah kepada Allah di mana pun kamu berada. (HR. Tirmidzi)",
    "Allah mencintai seseorang yang bekerja dengan profesional. (HR. Thabrani)",
    "Senyummu kepada saudaramu adalah sedekah. (HR. Tirmidzi)",
    "Orang kuat bukanlah yang menang dalam perkelahian, tetapi yang mampu menahan amarah. (HR. Bukhari & Muslim)",
    "Setiap amal bergantung pada niatnya. (HR. Bukhari & Muslim)",
    "Tolonglah saudaramu, baik dia dalam keadaan menzalimi atau dizalimi. (HR. Bukhari)",
    "Hiduplah seperti musafir. (HR. Bukhari)",
    "Orang yang berjalan untuk menolong saudaranya, itu lebih baik dari i’tikaf sebulan. (HR. Thabrani)",
    "Jika engkau bersyukur, niscaya Aku akan menambah (nikmat)-Ku kepadamu. (QS. Ibrahim: 7)",
    "Jadilah orang yang pemaaf dan maafkan kesalahan orang lain. (QS. Al-A’raf: 199)",
    "Siapa yang berusaha menjaga kehormatan diri, maka Allah akan menjaga kehormatannya. (HR. Bukhari & Muslim)",
    "Dunia adalah tempat menanam, dan akhirat adalah tempat memanen. (HR. Ahmad)",
    "Setiap langkah yang engkau ambil menuju shalat adalah sedekah. (HR. Muslim)",
    "Tidak akan masuk surga orang yang di hatinya ada kesombongan. (HR. Muslim)",
    "Allah bersama orang-orang yang sabar. (QS. Al-Baqarah: 153)",
    "Bersikap lemah lembutlah, karena kelembutan itu menghiasi setiap sesuatu. (HR. Muslim)",
    "Barang siapa bertawakal kepada Allah, maka Allah akan mencukupkannya. (QS. At-Talaq: 3)",
    "Bangunlah di malam hari (untuk beribadah), karena itulah kebiasaan orang-orang saleh. (HR. Tirmidzi)",
    "Dunia ini terlaknat kecuali zikir kepada Allah, orang berilmu, dan orang belajar ilmu. (HR. Tirmidzi)",
    "Katakanlah yang baik, atau diam. (HR. Bukhari & Muslim)",
    "Allah Maha Pengampun dan Maha Penyayang. (QS. An-Nisa: 110)";

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
            text: "Riset Syariah",
          },
          {
            to: "/buletin",
            icon: <FaNewspaper className="text-red-600 text-5xl mb-4" />,
            text: "Buletin Syariah",
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
