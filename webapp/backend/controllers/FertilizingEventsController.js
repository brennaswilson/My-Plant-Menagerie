// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app


// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of events in FertilizingEvents
const getFertilizingEvents = async (req, res) => {
  try {
    // Select all rows from the "FertilizingEvents" table, and also pull in the displayName from Plants to improve readability on the webapp
    const query = "SELECT eventID, fertilizingDate, Plants.plantID, Plants.displayName FROM FertilizingEvents JOIN Plants ON FertilizingEvents.plantID = Plants.plantID;"

    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching FertilizingEvents from the database:", error);
    res.status(500).json({ error: "Error fetching FertilizingEvents" });
  }
};

// Returns a single event by its unique ID from FertilizingEvents
const getFertilizingEventByID = async (req, res) => {
  try {
    const eventID = req.params.id;
    const query = "SELECT * FROM FertilizingEvents WHERE eventID = ?";
    const [result] = await db.query(query, [eventID]);
    // Check if FertilizingEvent was found
    if (result.length === 0) {
      return res.status(404).json({ error: "FertilizingEvent not found" });
    }
    const FertilizingEvent = result[0];
    res.json(FertilizingEvent);
  } catch (error) {
    console.error("Error fetching FertilizingEvent from the database:", error);
    res.status(500).json({ error: "Error fetching FertilizingEvent" });
  }
};

// Returns status of creation of new event in FertilizingEvents
const createFertilizingEvent = async (req, res) => {
  try {
    const { fertilizingDate, plantID } = req.body;
    const query =
      "INSERT INTO FertilizingEvents (fertilizingDate, plantID) VALUES (?, ?)";

    const response = await db.query(query, [
      fertilizingDate,
      plantID,
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating FertilizingEvent:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating FertilizingEvent" });
  }
};


const updateFertilizingEvent = async (req, res) => {
  // Get the FertilizingEvent ID
  const eventID = req.params.id;
  // Get the FertilizingEvent object
  const newFertilizingEvent = req.body;

  try {
    const [data] = await db.query("SELECT * FROM FertilizingEvents WHERE eventID = ?", [
      eventID,
    ]);

    const oldFertilizingEvent = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newFertilizingEvent, oldFertilizingEvent)) {
      const query =
        "UPDATE FertilizingEvents SET fertilizingDate=?, plantID=? WHERE eventID=?";

      const values = [
        newFertilizingEvent.fertilizingDate,
        newFertilizingEvent.plantID,
        eventID,
      ];

      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "FertilizingEvent updated successfully." });
    }

    res.json({ message: "FertilizingEvent details are the same, no update" });
  } catch (error) {
    console.log("Error updating FertilizingEvent", error);
    res
      .status(500)
      .json({ error: `Error updating the FertilizingEvent with id ${eventID}` });
  }
};

// Endpoint to delete a FertilizingEvent from the database
const deleteFertilizingEvent = async (req, res) => {
  console.log("Deleting FertilizingEvent with id:", req.params.id);
  const eventID = req.params.id;

  try {
    // Ensure the FertilizingEvent exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM FertilizingEvents WHERE eventID = ?",
      [eventID]
    );

    // If the FertilizingEvent doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("FertilizingEvent not found");
    }

    // Delete related records from the intersection table (see FK contraints DeleteFertilizingEvents)
    const [response] = await db.query(
      "DELETE FROM FertilizingEvents WHERE eventID = ?",
      [eventID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from DeleteFertilizingEvents intersection table"
    );

    // Delete the event from FertilizingEvents
    await db.query("DELETE FROM FertilizingEvents WHERE eventID = ?", [eventID]);

    // Return the appropriate status code
    res.status(204).json({ message: "FertilizingEvent deleted successfully" })
  } catch (error) {
    console.error("Error deleting FertilizingEvent from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getFertilizingEvents,
  getFertilizingEventByID,
  createFertilizingEvent,
  updateFertilizingEvent,
  deleteFertilizingEvent,
};
