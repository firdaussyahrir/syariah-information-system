const express = require("express");
const Regulasi = require("../models/regulasi.model.js");
const upload = require("../middleware/upload.js");
const router = express.Router();
const {
  getAllRegulasi,
  createRegulasi,
  getRegulasi,
  updateRegulasi,
  deleteRegulasi,
} = require("../controllers/regulasi.controller.js");

router.get("/", getAllRegulasi);
router.get("/:id", getRegulasi);
router.post("/", upload.single("fileRegulasi"), createRegulasi);
router.put("/:id", updateRegulasi);
router.delete("/:id", deleteRegulasi);

module.exports = router;
