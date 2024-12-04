const mongoose = require("mongoose");

const LrsaSchema = new mongoose.Schema(
  {
    fileLrsa: {
      type: String,
      required: true,
    },
    jenis: {
      type: String,
      enum: ["SAS", "SLA"],
      required: true,
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
    namaPIC: {
      type: String,
      enum: [
        "YH Yogi Herdiana",
        "BHR Berlianto Haris",
        "MBS M Budi Setiawan",
        "RRP Rudi Rinaldy Pratama",
        "DA Diah Arini",
        "KD Karima Dewi",
      ],
      required: true,
    },
    proposedDirectorat: {
      type: String,
      enum: [
        "SBB Shariah Business Banking",
        "SCB Shariah Consumer Banking",
        "SPBA Shariah Risk Control Unit",
        "SAL Shariah Advisory & Legal",
        "SS Shariah Strategy",
      ],
      required: true,
    },
    directorate: {
      type: String,
      enum: [
        "Shariah",
        "Banking",
        "Corporate",
        "Banking & Financial Institution",
        "Consumer Banking",
        "Risk Management",
        "Compliance Corporate",
        "Affairs & Legal",
        "Treasury & Capital Market Strategy",
        "Finance & SPAPM",
        "Operation & IT",
        "Human Resources",
        "DPS (Dewan Pengawas Syariah)",
      ],
      required: true,
    },
    business: {
      type: String,
      enum: ["Business", "Support"],
      required: true,
    },
    project: {
      type: String,
      enum: ["Project", "Non Project", "Secretariat", "DPS", "Dana Kebajikan"],
      required: true,
    },
    review: {
      type: String,
      enum: ["Review", "Non Review"],
      required: true,
    },
    lrsaType: {
      type: String,
      enum: [
        "LRSA-SAS",
        "E-LESA-SAS",
        "LRSA-SLA",
        "E-LESA-SLA",
        "E-LRSA-SLA-NN",
      ],
      required: true,
    },
    classific: {
      type: String,
      enum: [
        "P&P Policy & Procedure",
        "P&S Product & Service",
        "PRG Program",
        "FIN Financing",
        "FUND Funding",
        "MC MarComm",
        "E Others",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lrsa = mongoose.model("Lrsa", LrsaSchema);
module.exports = Lrsa;
