// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const router = express.Router();
const {
  getSoilTypes,
  getSoilTypeByID,
  createSoilType,
  updateSoilType,
  deleteSoilType,
} = require("../controllers/SoilTypesController");

router.get("/", getSoilTypes);
router.get("/:id", getSoilTypeByID);
router.post("/", createSoilType);
router.put("/:id", updateSoilType);
router.delete("/:id", deleteSoilType);

module.exports = router;
