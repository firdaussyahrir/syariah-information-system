const Lrsa = require("../models/lrsa.model.js");
const upload = require("../middleware/upload.js");

const getAllLrsa = async (req, res) => {
  try {
    const lrsa = await Lrsa.find({});
    res.status(200).json(lrsa);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getLrsa = async (req, res) => {
  try {
    const lrsa = await Lrsa.findById(req.params.id);
    if (!lrsa) return res.status(404).json({ message: "LRSA not found" });
    res.status(200).json(lrsa);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createLrsa = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }
    const existingLrsa = await Lrsa.findOne({ nomor: req.body.nomor });
    if (existingLrsa) {
      return res.status(400).json({ message: "Nomor already exists" });
    }
    const newLrsa = new Lrsa({
      fileLrsa: req.file.filename,
      jenis: req.body.jenis,
      nomor: req.body.nomor,
      tanggalMasehi: req.body.tanggalMasehi,
      judul: req.body.judul,
      namaPIC: req.body.namaPIC,
      proposedDirectorat: req.body.proposedDirectorat,
      directorate: req.body.directorate,
      business: req.body.business,
      project: req.body.project,
      review: req.body.review,
      lrsaType: req.body.lrsaType,
      classific: req.body.classific,
    });
    await newLrsa.save();
    res
      .status(201)
      .json({ message: "LRSA created successfully", data: newLrsa });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateLrsa = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLrsa = await Lrsa.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedLrsa) {
      return res.status(404).json({ message: "LRSA not found" });
    }
    res.status(200).json(updatedLrsa);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteLrsa = async (req, res) => {
  try {
    const { id } = req.params;
    const lrsa = await Lrsa.findByIdAndDelete(id);
    if (!lrsa) {
      return res.status(404).json({ message: "LRSA not found" });
    }
    res
      .status(200)
      .json({ message: `LRSA with ID ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getAllLrsa, getLrsa, createLrsa, deleteLrsa, updateLrsa };
