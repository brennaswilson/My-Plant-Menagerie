// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const router = express.Router();
const {
  getPlantTypes,
  getPlantTypeByID,
  createPlantType,
  updatePlantType,
  deletePlantType,
} = require("../controllers/PlantTypesController");

router.get("/", getPlantTypes);
router.get("/:id", getPlantTypeByID);
router.post("/", createPlantType);
router.put("/:id", updatePlantType);
router.delete("/:id", deletePlantType);

module.exports = router;
