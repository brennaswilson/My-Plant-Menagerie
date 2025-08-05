-- Your Plant Menagerie PostgreSQL Schema
-- Converted from MySQL for Supabase compatibility
-- Project Group 29

-- Create tables with PostgreSQL syntax

CREATE TABLE PlantTypes (
  plantTypeID SERIAL PRIMARY KEY,
  commonName VARCHAR(150) NOT NULL,
  toxicCat SMALLINT NOT NULL DEFAULT 0,
  toxicDog SMALLINT NOT NULL DEFAULT 0,
  preferredLight VARCHAR(10) CHECK (preferredLight IN ('Low','Medium','High')),
  latinName VARCHAR(150)
);

CREATE TABLE Plants (
  plantID SERIAL PRIMARY KEY,
  displayName VARCHAR(50) NOT NULL,
  isInside SMALLINT NOT NULL DEFAULT 1,
  currentLight VARCHAR(10) CHECK (currentLight IN ('Low','Medium','High')),
  plantTypeID INTEGER REFERENCES PlantTypes(plantTypeID) ON DELETE SET NULL,
  waterInterval INTEGER DEFAULT 7,
  fertilizerInterval INTEGER DEFAULT 14,
  plantedDate DATE,
  UNIQUE(plantTypeID, displayName)
);

CREATE TABLE SoilTypes (
  soilID SERIAL PRIMARY KEY,
  soilType VARCHAR(100) NOT NULL,
  soilDescription VARCHAR(150)
);

CREATE TABLE PlantSoils (
  plantSoilID SERIAL PRIMARY KEY,
  plantID INTEGER NOT NULL REFERENCES Plants(plantID) ON DELETE CASCADE,
  soilID INTEGER NOT NULL REFERENCES SoilTypes(soilID) ON DELETE CASCADE
);

CREATE TABLE WateringEvents (
  eventID SERIAL PRIMARY KEY,
  wateringDate DATE NOT NULL,
  plantID INTEGER NOT NULL REFERENCES Plants(plantID) ON DELETE CASCADE
);

CREATE TABLE FertilizingEvents (
  eventID SERIAL PRIMARY KEY,
  fertilizingDate DATE NOT NULL,
  plantID INTEGER NOT NULL REFERENCES Plants(plantID) ON DELETE CASCADE
);

-- Insert sample data for PlantTypes
INSERT INTO PlantTypes (commonName, toxicCat, toxicDog, preferredLight, latinName)
VALUES 
  ('Pothos', 1, 1, 'Medium', 'Epipremmum aureum'),
  ('String of Pearls', 1, 1, 'High', 'Senecio rowleyanus'),
  ('Sungold Tomatoes', 1, 1, 'High', 'Lycopersicon esculentum');

-- Insert sample data for SoilTypes
INSERT INTO SoilTypes (soilType, soilDescription)
VALUES 
  ('Houseplant Potting Mix', 'pre-mix with compost'),
  ('sandy mix', 'sandier soil mix good for succulents'),
  ('topsoil', 'contains organic matter like leaves');

-- Insert sample data for Plants
INSERT INTO Plants (displayName, isInside, currentLight, plantTypeID, waterInterval, fertilizerInterval, plantedDate)
VALUES 
  ('Pothos in Living Room', 1, 'Medium', (SELECT plantTypeID FROM PlantTypes WHERE commonName = 'Pothos'), 6, 14, '2023-01-15'),
  ('Pothos in Dining Room', 1, 'Low', (SELECT plantTypeID FROM PlantTypes WHERE commonName = 'Pothos'), 14, 28, '2020-03-02'),
  ('String of Pearls', 1, 'High', (SELECT plantTypeID FROM PlantTypes WHERE latinName = 'Senecio rowleyanus'), 7, 0, '2024-04-17'),
  ('Orange Cherry Tomatoes', 0, 'High', (SELECT plantTypeID FROM PlantTypes WHERE commonName = 'Sungold Tomatoes'), 1, 28, '2024-06-01');

-- Insert sample data for WateringEvents
INSERT INTO WateringEvents (wateringDate, plantID)
VALUES 
  ('2024-06-30', (SELECT plantID FROM Plants WHERE displayName = 'String of Pearls')),
  ('2024-07-01', (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Dining Room')),
  ('2024-07-15', (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Living Room')),
  ('2024-07-16', (SELECT plantID FROM Plants WHERE displayName = 'Orange Cherry Tomatoes')),
  ('2024-08-12', (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Dining Room'));

-- Insert sample data for FertilizingEvents
INSERT INTO FertilizingEvents (fertilizingDate, plantID)
VALUES 
  ('2024-05-30', (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Living Room')),
  ('2024-05-30', (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Dining Room')),
  ('2024-06-15', (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Living Room')),
  ('2024-07-02', (SELECT plantID FROM Plants WHERE displayName = 'String of Pearls')),
  ('2024-07-03', (SELECT plantID FROM Plants WHERE displayName = 'Orange Cherry Tomatoes')),
  ('2024-08-12', (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Dining Room'));

-- Insert sample data for PlantSoils
INSERT INTO PlantSoils (plantID, soilID)
VALUES 
  ((SELECT plantID FROM Plants WHERE displayName = 'Pothos in Living Room'), (SELECT soilID FROM SoilTypes WHERE soilType = 'Houseplant Potting Mix')),
  ((SELECT plantID FROM Plants WHERE displayName = 'Pothos in Dining Room'), (SELECT soilID FROM SoilTypes WHERE soilType = 'Houseplant Potting Mix')),
  ((SELECT plantID FROM Plants WHERE displayName = 'String of Pearls'), (SELECT soilID FROM SoilTypes WHERE soilType = 'Houseplant Potting Mix')),
  ((SELECT plantID FROM Plants WHERE displayName = 'String of Pearls'), (SELECT soilID FROM SoilTypes WHERE soilType = 'sandy mix')),
  ((SELECT plantID FROM Plants WHERE displayName = 'Orange Cherry Tomatoes'), (SELECT soilID FROM SoilTypes WHERE soilType = 'topsoil')),
  ((SELECT plantID FROM Plants WHERE displayName = 'Orange Cherry Tomatoes'), (SELECT soilID FROM SoilTypes WHERE soilType = 'Houseplant Potting Mix')); 