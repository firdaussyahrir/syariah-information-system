const express = require("express");
const Lrsa = require("../models/lrsa.model.js");
const upload = require("../middleware/upload.js");
const router = express.Router();
const {
  getAllLrsa,
  createLrsa,
  getLrsa,
  updateLrsa,
  deleteLrsa,
} = require("../controllers/lrsa.controller.js");

router.get("/", getAllLrsa);
router.get("/:id", getLrsa);
router.post("/", upload.single("fileLrsa"), createLrsa);
router.put("/:id", updateLrsa);
router.delete("/:id", deleteLrsa);

module.exports = router;
