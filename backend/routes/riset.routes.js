const express = require("express");
const Riset = require("../models/riset.model.js");
const upload = require("../middleware/upload.js");
const router = express.Router();
const {
  getAllRiset,
  createRiset,
  getRiset,
  updateRiset,
  deleteRiset,
} = require("../controllers/riset.controller.js");

router.get("/", getAllRiset);
router.get("/:id", getRiset);
router.post("/", upload.single("fileRiset"), createRiset);
router.put("/:id", updateRiset);
router.delete("/:id", deleteRiset);

module.exports = router;
