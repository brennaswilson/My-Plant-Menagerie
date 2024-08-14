// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all rows of events in Plants
const getPlants = async (req, res) => {
  try {
    // Select all rows from the "Plants" table
    const query = 
    "SELECT plantID, displayName, isInside, currentLight, PlantTypes.plantTypeID, PlantTypes.commonName, waterInterval, fertilizerInterval, plantedDate FROM Plants LEFT JOIN PlantTypes ON Plants.plantTypeID = PlantTypes.plantTypeID";
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching Plants from the database:", error);
    res.status(500).json({ error: "Error fetching Plants" });
  }
};

// Returns a single event by its unique ID from Plants
const getPlantByID = async (req, res) => {
  try {
    const plantID = req.params.id;
    const query = "SELECT * FROM Plants WHERE plantID = ?";
    const [result] = await db.query(query, [plantID]);
    // Check if Plant was found
    if (result.length === 0) {
      return res.status(404).json({ error: "Plant not found" });
    }
    const Plant = result[0];
    res.json(Plant);
  } catch (error) {
    console.error("Error fetching Plant from the database:", error);
    res.status(500).json({ error: "Error fetching Plant" });
  }
};

// Returns status of creation of new event in Plants
const createPlant = async (req, res) => {
  try {
    const { displayName, isInside, currentLight, plantTypeID, waterInterval, fertilizerInterval, plantedDate } = req.body;
    const query =
      "INSERT INTO Plants (displayName, isInside, currentLight, plantTypeID, waterInterval, fertilizerInterval, plantedDate) VALUES (?, ?, ?, ?, ?, ?, ?)";

    console.log(query);
    console.log('displayName=' + displayName + ', isInside=' + isInside + ', currentLight=' + currentLight + '\n plantTypeID=' + plantTypeID + ' waterInterval=' + waterInterval + ' fertilizerInterval=' + fertilizerInterval + ' plantedDate=' + plantedDate);
  

    const response = await db.query(query, [
        displayName,
        Number(isInside),
        currentLight,
        plantTypeID === "" ? null : parseInt(plantTypeID), 
        waterInterval, 
        fertilizerInterval,
        plantedDate, 
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating Plant:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating Plant" });
  }
};


const updatePlant = async (req, res) => {
  // Get the Plant ID
  const plantID = req.params.id;
  // Get the Plant object
  const newPlant = req.body;

  try {
    const [data] = await db.query("SELECT * FROM Plants WHERE plantID = ?", [
      plantID,
    ]);

    const oldPlant = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newPlant, oldPlant)) {
      const query =
        "UPDATE Plants SET displayName=?, isInside=?, currentLight=?, plantTypeID=?, waterInterval=?, fertilizerInterval=?, plantedDate=? WHERE plantID=?";

      // Homeoworld is NULL-able FK in bsg_people, has to be valid INT FK ID or NULL
      // const plantn = newPlant.plantTypeID === "" ? null : newPlant.plantTypeID;

      const values = [
        newPlant.displayName,
        Number(newPlant.isInside),
        newPlant.currentLight,
        newPlant.plantTypeID === "" ? null : parseInt(newPlant.plantTypeID), 
        newPlant.waterInterval,
        newPlant.fertilizerInterval, 
        newPlant.plantedDate,
        plantID,
      ];

      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "Plant updated successfully." });
    }

    res.json({ message: "Plant details are the same, no update" });
  } catch (error) {
    console.log("Error updating Plant", error);
    res
      .status(500)
      .json({ error: `Error updating the Plant with id ${plantID}` });
  }
};

// Endpoint to delete a Plant from the database
const deletePlant = async (req, res) => {
  console.log("Deleting Plant with id:", req.params.id);
  const plantID = req.params.id;

  try {
    // Ensure the Plant exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM Plants WHERE plantID = ?",
      [plantID]
    );

    // If the Plant doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("Plant not found");
    }

    // Delete related records from the intersection table (see FK contraints DeletePlants)
    const [response] = await db.query(
      "DELETE FROM Plants WHERE plantID = ?",
      [plantID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from DeletePlants intersection table"
    );

    // Delete the event from Plants
    await db.query("DELETE FROM Plants WHERE plantID = ?", [plantID]);

    // Return the appropriate status code
    res.status(204).json({ message: "Plant deleted successfully" })
  } catch (error) {
    console.error("Error deleting Plant from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getPlants,
  getPlantByID,
  createPlant,
  updatePlant,
  deletePlant,
};
