// PlanetScale-specific database configuration
// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

const mysql = require("mysql2");  
require("dotenv").config();

// For PlanetScale, you can use either the connection string or individual parameters
const pool = mysql.createPool({
  connectionLimit: 10,
  waitForConnections: true,
  host: process.env.DB_HOST || "aws.connect.psdb.cloud",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "your_database_name",
  ssl: {
    rejectUnauthorized: true
  }
}).promise();

// Export it for use in our application
module.exports = pool; 