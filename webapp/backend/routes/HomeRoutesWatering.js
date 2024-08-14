// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const router = express.Router();
const {
    getPlantsDueWatering,
} = require("../controllers/HomeControllerWatering");

router.get("/", getPlantsDueWatering);

module.exports = router;
