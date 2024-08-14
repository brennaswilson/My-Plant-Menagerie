// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows in PlantSoils
const getPlantSoils = async (req, res) => {
  try {
    // Select all rows from the "PlantSoils" table
    const query = "SELECT plantSoilID, Plants.plantID, SoilTypes.soilID, Plants.displayName, SoilTypes.soilType FROM PlantSoils JOIN Plants ON PlantSoils.plantID = Plants.plantID JOIN SoilTypes ON PlantSoils.soilID = SoilTypes.soilID ORDER BY plantSoilID ASC";    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching PlantSoils from the database:", error);
    res.status(500).json({ error: "Error fetching PlantSoils" });
  }
};

// Returns a single PlantSoil by its unique ID from PlantSoils
const getPlantSoilByID = async (req, res) => {
  try {
    const plantSoilID = req.params.id;
    const query = "SELECT * FROM PlantSoils WHERE plantSoilID = ?";
    const [result] = await db.query(query, [plantSoilID]);
    // Check if PlantSoil was found
    if (result.length === 0) {
      return res.status(404).json({ error: "PlantSoil not found" });
    }
    const PlantSoil = result[0];
    res.json(PlantSoil);
  } catch (error) {
    console.error("Error fetching PlantSoil from the database:", error);
    res.status(500).json({ error: "Error fetching PlantSoil" });
  }
};

// Returns status of creation of new event in PlantSoils
const createPlantSoil = async (req, res) => {
  try {
    const { plantID, soilID } = req.body;
    const query =
      "INSERT INTO PlantSoils (plantID, soilID) VALUES (?, ?)";

    const response = await db.query(query, [
      plantID,
      soilID,
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating PlantSoil:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating PlantSoil" });
  }
};


const updatePlantSoil = async (req, res) => {
  // Get the PlantSoil ID
  const plantSoilID = req.params.id;
  // Get the PlantSoil object
  const newPlantSoil = req.body;

  try {
    const [data] = await db.query("SELECT * FROM PlantSoils WHERE plantSoilID = ?", [
      plantSoilID,
    ]);

    const oldPlantSoil = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newPlantSoil, oldPlantSoil)) {
      const query =
        "UPDATE PlantSoils SET plantID=?, soilID=? WHERE plantSoilID=?";

      const values = [
        newPlantSoil.plantID,
        newPlantSoil.soilID,
        plantSoilID,
      ];

      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "PlantSoil updated successfully." });
    }

    res.json({ message: "PlantSoil details are the same, no update" });
  } catch (error) {
    console.log("Error updating PlantSoil", error);
    res
      .status(500)
      .json({ error: `Error updating the PlantSoil with id ${plantSoilID}` });
  }
};

// Endpoint to delete a PlantSoil from the database
const deletePlantSoil = async (req, res) => {
  console.log("Deleting PlantSoil with id:", req.params.id);
  const plantSoilID = req.params.id;

  try {
    // Ensure the PlantSoil exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM PlantSoils WHERE plantSoilID = ?",
      [plantSoilID]
    );

    // If the PlantSoil doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("PlantSoil not found");
    }

    // Delete related records from the intersection table (see FK contraints DeletePlantSoils)
    const [response] = await db.query(
      "DELETE FROM PlantSoils WHERE plantSoilID = ?",
      [plantSoilID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from DeletePlantSoils intersection table"
    );

    // Delete the event from PlantSoils
    await db.query("DELETE FROM PlantSoils WHERE plantSoilID = ?", [plantSoilID]);

    // Return the appropriate status code
    res.status(204).json({ message: "PlantSoil deleted successfully" })
  } catch (error) {
    console.error("Error deleting PlantSoil from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getPlantSoils,
  getPlantSoilByID,
  createPlantSoil,
  updatePlantSoil,
  deletePlantSoil,
};
