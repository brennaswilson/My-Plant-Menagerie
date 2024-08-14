// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

// Load db config
const db = require("../database/config");
// Load .env variables
require("dotenv").config();
// Util to deep-compare two objects
const lodash = require("lodash");


// Returns Plants due for fertilizing
const getPlantsDueFertilizing = async (req, res) => {
    const { displayName_Input } = req.params;
    try {
      const query = `
          SELECT 
          Plants.plantID, 
          Plants.displayName, 
          MAX(FertilizingEvents.fertilizingDate) AS 'LastFertilizedDate', 
          DATE(MAX(FertilizingEvents.fertilizingDate) + INTERVAL Plants.fertilizerInterval DAY) AS 'NextFertilizingDate',
          'NextFertilizingDate' AS 'DueForFertilizing'
        FROM 
          Plants
        LEFT JOIN 
          FertilizingEvents ON Plants.plantID = FertilizingEvents.plantID
        GROUP BY 
          Plants.plantID
        HAVING
          MAX(FertilizingEvents.fertilizingDate) IS NOT NULL
        ORDER BY
          NextFertilizingDate ASC
      `;
      const [rows] = await db.query(query, [displayName_Input]);
  
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching Plants due for fertilizing:", error);
      res.status(500).json({ error: "Error fetching Plants due for fertilizing" });
    }
  };

// Export the functions as methods of an object
module.exports = {
  getPlantsDueFertilizing, 
};
