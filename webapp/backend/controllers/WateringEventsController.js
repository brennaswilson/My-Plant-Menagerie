// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of events in WateringEvents
const getWateringEvents = async (req, res) => {
  try {
    // Select all rows from the "WateringEvents" table, and also pull in the displayName from Plants to improve readability on the webapp
    const query = "SELECT eventID, wateringDate, Plants.plantID, Plants.displayName FROM WateringEvents JOIN Plants ON WateringEvents.plantID = Plants.plantID;"

    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching WateringEvents from the database:", error);
    res.status(500).json({ error: "Error fetching WateringEvents" });
  }
};

// Returns a single event by its unique ID from WateringEvents
const getWateringEventByID = async (req, res) => {
  try {
    const eventID = req.params.id;
    const query = "SELECT * FROM WateringEvents WHERE eventID = ?";
    const [result] = await db.query(query, [eventID]);
    // Check if WateringEvent was found
    if (result.length === 0) {
      return res.status(404).json({ error: "WateringEvent not found" });
    }
    const WateringEvent = result[0];
    res.json(WateringEvent);
  } catch (error) {
    console.error("Error fetching WateringEvent from the database:", error);
    res.status(500).json({ error: "Error fetching WateringEvent" });
  }
};

// Returns status of creation of new event in WateringEvents
const createWateringEvent = async (req, res) => {
  try {
    const { wateringDate, plantID } = req.body;
    const query =
      "INSERT INTO WateringEvents (wateringDate, plantID) VALUES (?, ?)";

    const response = await db.query(query, [
      wateringDate,
      plantID,
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating WateringEvent:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating WateringEvent" });
  }
};


const updateWateringEvent = async (req, res) => {
  // Get the WateringEvent ID
  const eventID = req.params.id;
  // Get the WateringEvent object
  const newWateringEvent = req.body;

  try {
    const [data] = await db.query("SELECT * FROM WateringEvents WHERE eventID = ?", [
      eventID,
    ]);

    const oldWateringEvent = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newWateringEvent, oldWateringEvent)) {
      const query =
        "UPDATE WateringEvents SET wateringDate=?, plantID=? WHERE eventID=?";

      const values = [
        newWateringEvent.wateringDate,
        newWateringEvent.plantID,
        eventID,
      ];

      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "WateringEvent updated successfully." });
    }

    res.json({ message: "WateringEvent details are the same, no update" });
  } catch (error) {
    console.log("Error updating WateringEvent", error);
    res
      .status(500)
      .json({ error: `Error updating the WateringEvent with id ${eventID}` });
  }
};

// Endpoint to delete a WateringEvent from the database
const deleteWateringEvent = async (req, res) => {
  console.log("Deleting WateringEvent with id:", req.params.id);
  const eventID = req.params.id;

  try {
    // Ensure the WateringEvent exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM WateringEvents WHERE eventID = ?",
      [eventID]
    );

    // If the WateringEvent doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("WateringEvent not found");
    }

    // Delete related records from the intersection table (see FK contraints DeleteWateringEvents)
    const [response] = await db.query(
      "DELETE FROM WateringEvents WHERE eventID = ?",
      [eventID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from DeleteWateringEvents intersection table"
    );

    // Delete the event from WateringEvents
    await db.query("DELETE FROM WateringEvents WHERE eventID = ?", [eventID]);

    // Return the appropriate status code
    res.status(204).json({ message: "WateringEvent deleted successfully" })
  } catch (error) {
    console.error("Error deleting WateringEvent from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getWateringEvents,
  getWateringEventByID,
  createWateringEvent,
  updateWateringEvent,
  deleteWateringEvent,
};
