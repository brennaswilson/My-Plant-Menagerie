// Database adapter to provide consistent interface across different database types
// This allows controllers to work with SQLite, PostgreSQL, and MySQL without changes

const { db, dbType } = require('./config.js');

// Create a consistent interface that works with all database types
const dbAdapter = {
  // Query method that returns [rows, fields] like MySQL2
  query: async (sql, params = []) => {
    if (dbType === 'sqlite') {
      // SQLite returns rows directly, we need to simulate MySQL2 format
      try {
        const rows = await db.all(sql, params);
        return [rows, []]; // Return empty fields array for compatibility
      } catch (error) {
        throw error;
      }
    } else {
      // PostgreSQL/MySQL already return [rows, fields] format
      return await db.query(sql, params);
    }
  },

  // Get single row
  get: async (sql, params = []) => {
    if (dbType === 'sqlite') {
      return await db.get(sql, params);
    } else {
      const [rows] = await db.query(sql, params);
      return rows[0];
    }
  },

  // Get all rows
  all: async (sql, params = []) => {
    if (dbType === 'sqlite') {
      return await db.all(sql, params);
    } else {
      const [rows] = await db.query(sql, params);
      return rows;
    }
  },

  // Execute without returning rows (INSERT, UPDATE, DELETE)
  execute: async (sql, params = []) => {
    if (dbType === 'sqlite') {
      return await db.run(sql, params);
    } else {
      return await db.query(sql, params);
    }
  },

  // Get database type
  getType: () => dbType,

  // Check if using SQLite
  isSQLite: () => dbType === 'sqlite'
};

module.exports = dbAdapter;
