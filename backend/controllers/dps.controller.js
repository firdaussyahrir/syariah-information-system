const Dps = require("../models/dps.model.js");
const upload = require("../middleware/upload.js");

const getAllDps = async (req, res) => {
  try {
    const dps = await Dps.find({});
    res.status(200).json(dps);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getDps = async (req, res) => {
  try {
    const dps = await Dps.findById(req.params.id);
    if (!dps) return res.status(404).json({ message: "DPS not found" });
    res.status(200).json(dps);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createDps = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }
    const newDps = new Dps({
      fileDps: req.file.filename,
      jenis: req.body.jenis,
      nomor: req.body.nomor,
      tanggalMasehi: req.body.tanggalMasehi,
      judul: req.body.judul,
      kelompok: req.body.kelompok,
      kategori: req.body.kategori,
      subKategori: req.body.subKategori,
    });
    await newDps.save();
    res.status(201).json({ message: "DPS created successfully", data: newDps });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateDps = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDps = await Dps.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDps) {
      return res.status(404).json({ message: "DPS not found" });
    }
    res.status(200).json(updatedDps);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteDps = async (req, res) => {
  try {
    const { id } = req.params;
    const dps = await Dps.findByIdAndDelete(id);
    if (!dps) {
      return res.status(404).json({ message: "DPS not found" });
    }
    res.status(200).json({ message: `DPS with ID ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getAllDps, getDps, createDps, deleteDps, updateDps };
