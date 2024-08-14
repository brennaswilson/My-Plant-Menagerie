// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns all types of plants in PlantTypes
const getPlantTypes = async (req, res) => {
  try {
    // Select all rows from the "PlantTypes" table
    const query = "SELECT * FROM PlantTypes";
    // Execute the query using the "db" object from the configuration file
    const [rows] = await db.query(query);
    // Send back the rows to the client
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching PlantTypes from the database:", error);
    res.status(500).json({ error: "Error fetching PlantTypes" });
  }
};

// Returns a single PlantType by their unique ID from PlantTypes
const getPlantTypeByID = async (req, res) => {
  try {
    const plantTypeID = req.params.id;
    const query = "SELECT * FROM PlantTypes WHERE plantTypeID = ?";
    const [result] = await db.query(query, [plantTypeID]);
    // Check if PlantType was found
    if (result.length === 0) {
      return res.status(404).json({ error: "PlantType not found" });
    }
    const PlantType = result[0];
    res.json(PlantType);
  } catch (error) {
    console.error("Error fetching PlantType from the database:", error);
    res.status(500).json({ error: "Error fetching PlantType" });
  }
};

// Returns status of creation of new PlantType in PlantTypes
const createPlantType = async (req, res) => {
  try {
    let { commonName, latinName, toxicCat, toxicDog, preferredLight } = req.body;
    const query =
      "INSERT INTO PlantTypes (commonName, latinName, toxicCat, toxicDog, preferredLight) VALUES (?, ?, ?, ?, ?)";

    console.log(query);
    console.log('commonName=' + commonName + ', latinName=' + latinName + ', toxicCat=' + toxicCat + ' toxicDog=' + toxicDog + 'preferredLight=' + preferredLight);

    // let sanitizedpreferredLight ? preferredLight : NULL;
    // if (preferredLight = ''){
    //   const = NULL;
    // }
    // console.log('preferredLight=' + preferredLight);
    // if (preferredLight ===  ){
    //   console.log('preferredLight is NULL')
    // }

    const response = await db.query(query, [
      commonName,
      latinName,
      Number(toxicCat), 
      Number(toxicDog), 
      preferredLight
    ]);
    res.status(201).json(response);
  } catch (error) {
    // Print the error for the dev
    console.error("Error creating PlantType:", error);
    // Inform the client of the error
    res.status(500).json({ error: "Error creating PlantType" });
  }
};


const updatePlantType = async (req, res) => {
  // Get the PlantType ID
  const plantTypeID = req.params.id;
  // Get the PlantType object
  const newPlantType = req.body;

  try {
    const [data] = await db.query("SELECT * FROM PlantTypes WHERE plantTypeID = ?", [
      plantTypeID,
    ]);

    const oldPlantType = data[0];

    // If any attributes are not equal, perform update
    if (!lodash.isEqual(newPlantType, oldPlantType)) {
      const query =
        "UPDATE PlantTypes SET commonName=?, toxicCat=?, toxicDog=?, preferredLight=?, latinName=? WHERE plantTypeID=?";

      const values = [
        newPlantType.commonName,
        Number(newPlantType.toxicCat),
        Number(newPlantType.toxicDog),
        newPlantType.preferredLight,
        newPlantType.latinName,
        plantTypeID,
      ];

      // Perform the update
      await db.query(query, values);
      // Inform client of success and return 
      return res.json({ message: "PlantType updated successfully." });
    }

    res.json({ message: "PlantType details are the same, no update" });
  } catch (error) {
    console.log("Error updating PlantType", error);
    res
      .status(500)
      .json({ error: `Error updating the PlantType with id ${plantTypeID}` });
  }
};

// Endpoint to delete a type of plant from the database
const deletePlantType = async (req, res) => {
  console.log("Deleting PlantType with id:", req.params.id);
  const plantTypeID = req.params.id;

  try {
    // Ensure the PlantType exists
    const [isExisting] = await db.query(
      "SELECT 1 FROM PlantTypes WHERE plantTypeID = ?",
      [plantTypeID]
    );

    // If the PlantType doesn't exist, return an error
    if (isExisting.length === 0) {
      return res.status(404).send("PlantType not found");
    }

    // Delete related records from the intersection table (see FK contraints DeletePlantTypes)
    const [response] = await db.query(
      "DELETE FROM PlantTypes WHERE plantTypeID = ?",
      [plantTypeID]
    );

    console.log(
      "Deleted",
      response.affectedRows,
      "rows from DeletePlantTypes intersection table"
    );

    // Delete the PlantType from PlantTypes
    await db.query("DELETE FROM PlantTypes WHERE plantTypeID = ?", [plantTypeID]);

    // Return the appropriate status code
    res.status(204).json({ message: "PlantType deleted successfully" })
  } catch (error) {
    console.error("Error deleting PlantType from the database:", error);
    res.status(500).json({ error: error.message });
  }
};

// Export the functions as methods of an object
module.exports = {
  getPlantTypes,
  getPlantTypeByID,
  createPlantType,
  updatePlantType,
  deletePlantType,
};
