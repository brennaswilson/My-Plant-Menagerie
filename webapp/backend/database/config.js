// Smart database configuration switcher
// Automatically chooses the best database option based on environment
// Perfect for portfolio demonstrations and development

require("dotenv").config();

let db;
let dbType;

// Determine which database to use based on environment
if (process.env.DATABASE_TYPE === 'sqlite' || !process.env.DATABASE_URL) {
  // Use SQLite for local development and portfolio
  console.log('Using SQLite database (local development)');
  db = require('./config-sqlite.js');
  dbType = 'sqlite';
} else {
  // Default to SQLite for safety
  console.log('No database type specified, using SQLite (local development)');
  db = require('./config-sqlite.js');
  dbType = 'sqlite';
}

// Export both the database connection and type
module.exports = {
  db,
  dbType,
  // Helper function to check if we're using SQLite
  isSQLite: () => dbType === 'sqlite',
  // Helper function to get database info
  getInfo: () => ({
    type: dbType,
    description: dbType === 'sqlite' ? 'Local SQLite database (local development)' : 'Unknown'
  })
};
