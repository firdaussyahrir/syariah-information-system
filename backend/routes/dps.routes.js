const express = require("express");
const Dps = require("../models/dps.model.js");
const upload = require("../middleware/upload.js");
const router = express.Router();
const {
  getAllDps,
  createDps,
  getDps,
  updateDps,
  deleteDps,
} = require("../controllers/dps.controller.js");

router.get("/", getAllDps);
router.get("/:id", getDps);
router.post("/", upload.single("fileDps"), createDps);
router.put("/:id", updateDps);
router.delete("/:id", deleteDps);

module.exports = router;
