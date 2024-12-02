const express = require("express");
const Dps = require("../models/dps.model.js");
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

router.post("/", createDps);

// update a product
router.put("/:id", updateDps);

// delete a product
router.delete("/:id", deleteDps);

module.exports = router;
