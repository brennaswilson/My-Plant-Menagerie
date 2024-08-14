// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const router = express.Router();
const {
  getPlantSoils,
  getPlantSoilByID,
  createPlantSoil,
  updatePlantSoil,
  deletePlantSoil,
} = require("../controllers/PlantSoilsController");

router.get("/", getPlantSoils);
router.get("/:id", getPlantSoilByID);
router.post("/", createPlantSoil);
router.put("/:id", updatePlantSoil);
router.delete("/:id", deletePlantSoil);

module.exports = router;
