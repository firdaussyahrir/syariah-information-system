const mongoose = require("mongoose");
const upload = require("../middleware/upload.js");

const RegulasiSchema = new mongoose.Schema(
  {
    fileRegulasi: {
      type: String,
      required: true,
    },
    jenis: {
      type: String,
      enum: ["Peraturan", "Instruksi", "Ketentuan"],
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
        "Produk",
        "Financing Model",
        "Program",
        "Policy & Procedure",
        "Fitur Produk",
        "Dana Kebajikan & Zakat",
      ],
      default: "Lain-Lain",
      required: true,
    },
    kategori: {
      type: String,
      enum: [
        "Financing",
        "Asuransi",
        "Kepatuhan Syariah",
        "Dana Kebajikan & Zakat",
        "Funding",
        "Syariah Card",
        "Investment",
        "Trade Finance",
        "Layanan Jasa",
        "Zakat",
        "Treasury",
        "DBLM",
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

const regulasi = mongoose.model("Regulasi", RegulasiSchema);
module.exports = regulasi;