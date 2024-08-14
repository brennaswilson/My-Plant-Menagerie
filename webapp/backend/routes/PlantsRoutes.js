// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const router = express.Router();
const {
  getPlants,
  getPlantByID,
  createPlant,
  updatePlant,
  deletePlant,
} = require("../controllers/PlantsController");

router.get("/", getPlants);
router.get("/:id", getPlantByID);
router.post("/", createPlant);
router.put("/:id", updatePlant);
router.delete("/:id", deletePlant);

module.exports = router;
