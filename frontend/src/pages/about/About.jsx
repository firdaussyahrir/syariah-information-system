import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Tentang Syariah Information System (SIS)
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Syariah Information System (SIS) adalah sistem berbasis web yang
          dirancang untuk mengorganisir dan mengelola berbagai informasi dan
          dokumen yang berkaitan dengan syariah secara efisien. SIS berfungsi
          sebagai alat yang komprehensif untuk mendukung berbagai fungsi di
          bidang keuangan dan perbankan syariah.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Fitur Utama
        </h2>

        <ul className="space-y-6 text-gray-700">
          <li className="flex items-start space-x-4">
            <span className="text-2xl text-blue-500">📝</span>
            <div>
              <strong className="text-xl text-gray-800">
                Dewan Pengawas Syariah (DPS)
              </strong>
              : Platform untuk mengelola tugas dan tanggung jawab Dewan Pengawas
              Syariah di lembaga keuangan syariah.
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <span className="text-2xl text-blue-500">📜</span>
            <div>
              <strong className="text-xl text-gray-800">
                Lembar Review Syariah Advisory (LRSA)
              </strong>
              : Alat untuk meninjau dan memberikan saran mengenai kepatuhan
              terhadap hukum syariah dan pedoman dalam praktik keuangan.
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <span className="text-2xl text-blue-500">📚</span>
            <div>
              <strong className="text-xl text-gray-800">
                Regulasi Perbankan
              </strong>
              : Tempat penyimpanan regulasi dan undang-undang yang terkait
              dengan kepatuhan syariah dalam sektor perbankan.
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <span className="text-2xl text-blue-500">🔍</span>
            <div>
              <strong className="text-xl text-gray-800">Riset Syariah</strong>:
              Pusat riset untuk melakukan studi dan mengumpulkan informasi
              tentang berbagai aspek keuangan dan hukum syariah.
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <span className="text-2xl text-blue-500">📢</span>
            <div>
              <strong className="text-xl text-gray-800">Buletin Syariah</strong>
              : Papan pengumuman untuk membagikan pembaruan, berita, dan
              publikasi terkait dengan keuangan dan perbankan syariah.
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
