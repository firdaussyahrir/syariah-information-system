const mongoose = require("mongoose");

const RegulasiSchema = new mongoose.Schema(
  {
    fileRegulasi: {
      type: String,
      required: true,
    },
    sektor: {
      type: String,
      enum: ["Perbankan", "Pasar Modal", "Pasar Uang"],
      required: true,
    },
    kelompok: {
      type: String,
      required: true,
    },
    klasifikasi: {
      type: String,
      required: true,
    },
    subKlasifikasi: {
      type: String,
    },
    ojk: {
      type: String,
      enum: ["POJK", "BI", "SEBI"],
      required: true,
    },
    berlakuUntuk: {
      type: String,
      enum: ["BU", "BUK", "BUS", "UUS", "Lain-lain"],
      required: true,
    },
    nomorPeraturan: {
      type: String,
      required: true,
    },
    tanggal: {
      type: Date,
      required: true,
    },
    judul: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Regulasi = mongoose.model("Regulasi", RegulasiSchema);
module.exports = Regulasi;
