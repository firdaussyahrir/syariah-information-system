const express = require("express");
const Buletin = require("../models/buletin.model.js");
const upload = require("../middleware/upload.js");
const router = express.Router();
const {
  getAllBuletin,
  createBuletin,
  getBuletin,
  updateBuletin,
  deleteBuletin,
} = require("../controllers/buletin.controller.js");

router.get("/", getAllBuletin);
router.get("/:id", getBuletin);
router.post("/", upload.single("fileBuletin"), createBuletin);
router.put("/:id", updateBuletin);
router.delete("/:id", deleteBuletin);

module.exports = router;
