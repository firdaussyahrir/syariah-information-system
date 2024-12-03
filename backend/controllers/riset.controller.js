const Riset = require("../models/riset.model.js");
const upload = require("../middleware/upload.js");

const getAllRiset = async (req, res) => {
  try {
    const riset = await Riset.find({});
    res.status(200).json(riset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getRiset = async (req, res) => {
  try {
    const riset = await Riset.findById(req.params.id);
    if (!riset) return res.status(404).json({ message: "Riset not found" });
    res.status(200).json(riset);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createRiset = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }
    // Duplicate nomor
    const existingRiset = await Riset.findOne({ nomor: req.body.nomor });
    if (existingRiset) {
      return res.status(400).json({ message: "Nomor already exists" });
    }
    const newRiset = new Riset({
      fileRiset: req.file.filename,
      jenis: req.body.jenis,
      nomor: req.body.nomor,
      tanggalMasehi: req.body.tanggalMasehi,
      judul: req.body.judul,
      kelompok: req.body.kelompok,
      kategori: req.body.kategori,
      subKategori: req.body.subKategori,
    });

    await newRiset.save();
    res
      .status(201)
      .json({ message: "Riset created successfully", data: newRiset });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateRiset = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRiset = await Riset.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedRiset) {
      return res.status(404).json({ message: "Riset not found" });
    }
    res.status(200).json(updatedRiset);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteRiset = async (req, res) => {
  try {
    const { id } = req.params;
    const riset = await Riset.findByIdAndDelete(id);
    if (!riset) {
      return res.status(404).json({ message: "Riset not found" });
    }
    res
      .status(200)
      .json({ message: `Riset with ID ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllRiset,
  getRiset,
  createRiset,
  deleteRiset,
  updateRiset,
};
