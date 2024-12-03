const Regulasi = require("../models/regulasi.model.js");
const upload = require("../middleware/upload.js");

const getAllRegulasi = async (req, res) => {
  try {
    const regulasi = await Regulasi.find({});
    res.status(200).json(regulasi);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getRegulasi = async (req, res) => {
  try {
    const regulasi = await Regulasi.findById(req.params.id);
    if (!regulasi)
      return res.status(404).json({ message: "Regulasi not found" });
    res.status(200).json(regulasi);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createRegulasi = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }
    const existingRegulasi = await Regulasi.findOne({ nomor: req.body.nomor });
    if (existingRegulasi) {
      return res.status(400).json({ message: "Nomor already exists" });
    }
    const newRegulasi = new Regulasi({
      fileRegulasi: req.file.filename,
      jenis: req.body.jenis,
      nomor: req.body.nomor,
      tanggalMasehi: req.body.tanggalMasehi,
      judul: req.body.judul,
      kelompok: req.body.kelompok,
      kategori: req.body.kategori,
      subKategori: req.body.subKategori,
    });
    await newRegulasi.save();
    res
      .status(201)
      .json({ message: "Regulasi created successfully", data: newRegulasi });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateRegulasi = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRegulasi = await Regulasi.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedRegulasi) {
      return res.status(404).json({ message: "Regulasi not found" });
    }
    res.status(200).json(updatedRegulasi);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteRegulasi = async (req, res) => {
  try {
    const { id } = req.params;
    const regulasi = await Regulasi.findByIdAndDelete(id);
    if (!regulasi) {
      return res.status(404).json({ message: "Regulasi not found" });
    }
    res
      .status(200)
      .json({ message: `Regulasi with ID ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllRegulasi,
  getRegulasi,
  createRegulasi,
  deleteRegulasi,
  updateRegulasi,
};
