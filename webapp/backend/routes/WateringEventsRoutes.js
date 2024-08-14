// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

const express = require("express");
const router = express.Router();
const {
  getWateringEvents,
  getWateringEventByID,
  createWateringEvent,
  updateWateringEvent,
  deleteWateringEvent,
} = require("../controllers/WateringEventsController");

router.get("/", getWateringEvents);
router.get("/:id", getWateringEventByID);
router.post("/", createWateringEvent);
router.put("/:id", updateWateringEvent);
router.delete("/:id", deleteWateringEvent);

module.exports = router;
