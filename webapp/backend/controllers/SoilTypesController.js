// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of SoilTypes in SoilTypes
const getSoilTypes = async (req, res) => {
  try {
    // Select all rows from the "SoilTypes" table
    const query = "SELECT * FROM SoilTypes";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching SoilTypes from the database:", error);
    res.status(500).json({ error: "Error fetching SoilTypes" });
  }
};

// Returns a single SoilType by their unique ID from SoilTypes
const getSoilTypeByID = async (req, res) => {
  try {
    const soilID = req.params.id;
    const query = "SELECT * FROM SoilTypes WHERE soilID = ?";
    const [result] = await db.query(query, [soilID]);
    // Check if SoilType was found
    if (result.length === 0) {
      return res.status(404).json({ error: "SoilType not found" });
    }
    const SoilType = result[0];
    res.json(SoilType);
  } catch (error) {
    console.error("Error fetching SoilType from the database:", error);
    res.status(500).json({ error: "Error fetching SoilType" });
  }
};

// Returns status of creation of new SoilType in SoilTypes
const createSoilType = async (req, res) => {
  try {
    const { soilType, soilDescription } = req.body;
    const query =
      "INSERT INTO SoilTypes (soilType, soilDescription) VALUES (?, ?)";

    const response = await db.query(query, [
      soilType,
      soilDescription,
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating SoilType:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating SoilType" });
  }
};


const updateSoilType = async (req, res) => {
  // Get the SoilType ID
  const soilID = req.params.id;
  // Get the SoilType object
  const newSoilType = req.body;

  try {
    const [data] = await db.query("SELECT * FROM SoilTypes WHERE soilID = ?", [
      soilID,
    ]);

    const oldSoilType = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newSoilType, oldSoilType)) {
      const query =
        "UPDATE SoilTypes SET soilType=?, soilDescription=? WHERE soilID=?";

      const values = [
        newSoilType.soilType,
        newSoilType.soilDescription,
        soilID,
      ];

      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "SoilType updated successfully." });
    }

    res.json({ message: "SoilType details are the same, no update" });
  } catch (error) {
    console.log("Error updating SoilType", error);
    res
      .status(500)
      .json({ error: `Error updating the SoilType with id ${soilID}` });
  }
};

// Endpoint to delete a type of soil from the database
const deleteSoilType = async (req, res) => {
  console.log("Deleting SoilType with id:", req.params.id);
  const soilID = req.params.id;

  try {
    // Ensure the SoilType exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM SoilTypes WHERE soilID = ?",
      [soilID]
    );

    // If the SoilType doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("SoilType not found");
    }

    // Delete related records from the intersection table (see FK contraints DeleteSoilTypes)
    const [response] = await db.query(
      "DELETE FROM SoilTypes WHERE soilID = ?",
      [soilID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from DeleteSoilTypes intersection table"
    );

    // Delete the SoilType from SoilTypes
    await db.query("DELETE FROM SoilTypes WHERE soilID = ?", [soilID]);

    // Return the appropriate status code
    res.status(204).json({ message: "SoilType deleted successfully" })
  } catch (error) {
    console.error("Error deleting SoilType from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getSoilTypes,
  getSoilTypeByID,
  createSoilType,
  updateSoilType,
  deleteSoilType,
};
