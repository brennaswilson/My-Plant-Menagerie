// SQLite database configuration for portfolio-friendly local development
// This provides a fully functional local database without external dependencies

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database file in the database directory
const dbPath = path.join(__dirname, 'plant_menagerie.db');

// Create/connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database at:', dbPath);
    initializeDatabase();
  }
});

// Initialize database with schema and sample data
function initializeDatabase() {
  // Enable foreign keys
  db.run('PRAGMA foreign_keys = ON');
  
  // Create tables
  const createTables = `
    CREATE TABLE IF NOT EXISTS PlantTypes (
      plantTypeID INTEGER PRIMARY KEY AUTOINCREMENT,
      commonName TEXT NOT NULL,
      toxicCat INTEGER NOT NULL DEFAULT 0,
      toxicDog INTEGER NOT NULL DEFAULT 0,
      preferredLight TEXT CHECK (preferredLight IN ('Low','Medium','High')),
      latinName TEXT
    );

    CREATE TABLE IF NOT EXISTS Plants (
      plantID INTEGER PRIMARY KEY AUTOINCREMENT,
      displayName TEXT NOT NULL,
      isInside INTEGER NOT NULL DEFAULT 1,
      currentLight TEXT CHECK (currentLight IN ('Low','Medium','High')),
      plantTypeID INTEGER,
      waterInterval INTEGER DEFAULT 7,
      fertilizerInterval INTEGER DEFAULT 14,
      plantedDate TEXT,
      FOREIGN KEY (plantTypeID) REFERENCES PlantTypes(plantTypeID) ON DELETE SET NULL,
      UNIQUE(plantTypeID, displayName)
    );

    CREATE TABLE IF NOT EXISTS SoilTypes (
      soilID INTEGER PRIMARY KEY AUTOINCREMENT,
      soilType TEXT NOT NULL,
      soilDescription TEXT
    );

    CREATE TABLE IF NOT EXISTS PlantSoils (
      plantSoilID INTEGER PRIMARY KEY AUTOINCREMENT,
      plantID INTEGER NOT NULL,
      soilID INTEGER NOT NULL,
      FOREIGN KEY (plantID) REFERENCES Plants(plantID) ON DELETE CASCADE,
      FOREIGN KEY (soilID) REFERENCES SoilTypes(soilID) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS WateringEvents (
      eventID INTEGER PRIMARY KEY AUTOINCREMENT,
      wateringDate TEXT NOT NULL,
      plantID INTEGER NOT NULL,
      FOREIGN KEY (plantID) REFERENCES Plants(plantID) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS FertilizingEvents (
      eventID INTEGER PRIMARY KEY AUTOINCREMENT,
      fertilizingDate TEXT NOT NULL,
      plantID INTEGER NOT NULL,
      FOREIGN KEY (plantID) REFERENCES Plants(plantID) ON DELETE CASCADE
    );
  `;

  db.exec(createTables, (err) => {
    if (err) {
      console.error('Error creating tables:', err.message);
    } else {
      console.log('Database tables created successfully');
      insertSampleData();
    }
  });
}

// Insert sample data
function insertSampleData() {
  // Check if data already exists
  db.get("SELECT COUNT(*) as count FROM PlantTypes", (err, row) => {
    if (err) {
      console.error('Error checking data:', err.message);
      return;
    }
    
    if (row.count === 0) {
      console.log('Inserting sample data...');
      
      // Insert sample data
      const sampleData = `
        INSERT INTO PlantTypes (commonName, toxicCat, toxicDog, preferredLight, latinName)
        VALUES 
          ('Pothos', 1, 1, 'Medium', 'Epipremmum aureum'),
          ('String of Pearls', 1, 1, 'High', 'Senecio rowleyanus'),
          ('Sungold Tomatoes', 1, 1, 'High', 'Lycopersicon esculentum');

        INSERT INTO SoilTypes (soilType, soilDescription)
        VALUES 
          ('Houseplant Potting Mix', 'pre-mix with compost'),
          ('sandy mix', 'sandier soil mix good for succulents'),
          ('topsoil', 'contains organic matter like leaves');

        INSERT INTO Plants (displayName, isInside, currentLight, plantTypeID, waterInterval, fertilizerInterval, plantedDate)
        VALUES 
          ('Pothos in Living Room', 1, 'Medium', 1, 6, 14, '2023-01-15'),
          ('Pothos in Dining Room', 1, 'Low', 1, 14, 28, '2020-03-02'),
          ('String of Pearls', 1, 'High', 2, 7, 0, '2024-04-17'),
          ('Orange Cherry Tomatoes', 0, 'High', 3, 1, 28, '2024-06-01');

        INSERT INTO WateringEvents (wateringDate, plantID)
        VALUES 
          ('2024-06-30', 3),
          ('2024-07-01', 2),
          ('2024-07-15', 1),
          ('2024-07-16', 4),
          ('2024-08-12', 2);

        INSERT INTO FertilizingEvents (fertilizingDate, plantID)
        VALUES 
          ('2024-05-30', 1),
          ('2024-05-30', 2),
          ('2024-06-15', 1),
          ('2024-07-02', 3),
          ('2024-07-03', 4),
          ('2024-08-12', 2);

        INSERT INTO PlantSoils (plantID, soilID)
        VALUES 
          (1, 1),
          (2, 1),
          (3, 1),
          (3, 2),
          (4, 3),
          (4, 1);
      `;

      db.exec(sampleData, (err) => {
        if (err) {
          console.error('Error inserting sample data:', err.message);
        } else {
          console.log('Sample data inserted successfully');
        }
      });
    } else {
      console.log('Sample data already exists');
    }
  });
}

// Export a promise-based interface for easier use
const dbAsync = {
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  
  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
  
  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  }
};

module.exports = dbAsync;
