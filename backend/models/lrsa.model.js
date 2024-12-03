const mongoose = require("mongoose");
const upload = require("../middleware/upload.js");

const LrsaSchema = new mongoose.Schema(
  {
    fileLrsa: {
      type: String,
      required: true,
    },
    jenis: {
      type: String,
      enum: ["SAS", "SLA"],
    },
    nomor: {
      type: String,
      required: true,
    },
    tanggalMasehi: {
      type: Date,
      required: true,
    },
    judul: {
      type: String,
      required: true,
    },
    kelompok: {
      type: String,
      enum: [
        "Dokumen Legal",
        "Analisis Riset",
        "Laporan Keuangan",
        "Sertifikasi",
        "Pelatihan",
        "Evaluasi Internal",
      ],
      default: "Lain-Lain",
      required: true,
    },
    kategori: {
      type: String,
      enum: [
        "Regulasi",
        "Audit Internal",
        "Kepatuhan Syariah",
        "Pelatihan Syariah",
        "Infrastruktur Syariah",
        "Manajemen Risiko",
        "Investasi",
        "Pembiayaan",
        "Dana Kebajikan",
      ],
      default: "Lain-Lain",
      required: true,
    },
    subKategori: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const lrsa = mongoose.model("Lrsa", LrsaSchema);
module.exports = lrsa;
