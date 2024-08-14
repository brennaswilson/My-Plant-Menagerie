// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");

// Returns Plants due for watering
const getPlantsDueWatering = async (req, res) => {
  const { displayName_Input } = req.params;
  try {
    const query = `
        SELECT 
        Plants.plantID, 
        Plants.displayName, 
        MAX(WateringEvents.wateringDate) AS 'LastWateredDate', 
        DATE(MAX(WateringEvents.wateringDate) + INTERVAL Plants.waterInterval DAY) AS 'NextWateringDate',
        'NextWateringDate' AS 'DueForWatering'
      FROM 
        Plants
      LEFT JOIN 
        WateringEvents ON Plants.plantID = WateringEvents.plantID
      GROUP BY 
        Plants.plantID
      HAVING
        MAX(WateringEvents.wateringDate) IS NOT NULL
      ORDER BY
        NextWateringDate ASC
    `;
    const [rows] = await db.query(query, [displayName_Input]);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching Plants due for watering:", error);
    res.status(500).json({ error: "Error fetching Plants due for watering" });
  }
};


// Export the functions as methods of an object
module.exports = {
  getPlantsDueWatering, 
};
