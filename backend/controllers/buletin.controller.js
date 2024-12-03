const Buletin = require("../models/buletin.model.js");
const upload = require("../middleware/upload.js");

const getAllBuletin = async (req, res) => {
  try {
    const buletin = await Buletin.find({});
    res.status(200).json(buletin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getBuletin = async (req, res) => {
  try {
    const buletin = await Buletin.findById(req.params.id);
    if (!buletin) return res.status(404).json({ message: "Buletin not found" });
    res.status(200).json(buletin);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createBuletin = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }
    const existingBuletin = await Buletin.findOne({ nomor: req.body.nomor });
    if (existingBuletin) {
      return res.status(400).json({ message: "Nomor already exists" });
    }
    const newBuletin = new Buletin({
      fileBuletin: req.file.filename,
      jenis: req.body.jenis,
      nomor: req.body.nomor,
      tanggalMasehi: req.body.tanggalMasehi,
      judul: req.body.judul,
      kelompok: req.body.kelompok,
      kategori: req.body.kategori,
      subKategori: req.body.subKategori,
    });
    await newBuletin.save();
    res
      .status(201)
      .json({ message: "Buletin created successfully", data: newBuletin });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateBuletin = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBuletin = await Buletin.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBuletin) {
      return res.status(404).json({ message: "Buletin not found" });
    }
    res.status(200).json(updatedBuletin);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteBuletin = async (req, res) => {
  try {
    const { id } = req.params;
    const buletin = await Buletin.findByIdAndDelete(id);
    if (!buletin) {
      return res.status(404).json({ message: "Buletin not found" });
    }
    res
      .status(200)
      .json({ message: `Buletin with ID ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllBuletin,
  getBuletin,
  createBuletin,
  deleteBuletin,
  updateBuletin,
};
