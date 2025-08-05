// Supabase-specific database configuration
// This module adapted from the CS340 starter code.
// Date Accessed: 1 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

const { Pool } = require('pg');
require("dotenv").config();

// For Supabase, we use the connection string
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});

// Export it for use in our application
module.exports = pool; 