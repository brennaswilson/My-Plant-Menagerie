/*  Your Plant Menagerie by Brenna Wilson & Brianna Kromrey
    Project Group 29

    Code for the creation of tables modified from a dump from 
    MariaDB dump 10.19  Distrib 10.5.22-MariaDB, for Linux (x86_64)
    after forward engineering the code from our schema in mySQLWorkbench,
    per instructions in the assignment page.
    
    Generated on 2024-07-16 18:44:08
*/


-- disable foreign key checks & autocommit to minimize errors
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;



-- -----------------------------------------------------
-- CREATE TABLES
-- -----------------------------------------------------


-- create table for PlantTypes
CREATE OR REPLACE TABLE PlantTypes (
  plantTypeID int(11) NOT NULL AUTO_INCREMENT,
  commonName varchar(150) NOT NULL,
  toxicCat tinyint(4) NOT NULL DEFAULT 0,
  toxicDog tinyint(4) NOT NULL DEFAULT 0,
  preferredLight enum('Low','Medium','High') DEFAULT NULL,
  latinName varchar(150) DEFAULT NULL,
  PRIMARY KEY (plantTypeID),
  UNIQUE KEY plantTypeID_UNIQUE (plantTypeID)
);



-- create table for Plants
CREATE OR REPLACE TABLE Plants (
  plantID int(11) NOT NULL AUTO_INCREMENT,
  displayName varchar(50) NOT NULL,
  isInside tinyint(4) NOT NULL DEFAULT 1,
  currentLight enum('Low','Medium','High') DEFAULT NULL,
  plantTypeID int(11) DEFAULT NULL,
  waterInterval int(11) DEFAULT 7,
  fertilizerInterval int(11) DEFAULT 14,
  plantedDate date DEFAULT NULL,
  PRIMARY KEY (plantID),
  UNIQUE KEY unique_plant (plantTypeID, displayName),
  FOREIGN KEY (plantTypeID) REFERENCES PlantTypes (plantTypeID) ON DELETE SET NULL ON UPDATE CASCADE
);


-- create table for SoilTypes
CREATE OR REPLACE TABLE SoilTypes (
  soilID int(11) NOT NULL AUTO_INCREMENT,
  soilType varchar(100) NOT NULL,
  soilDescription varchar(150) DEFAULT NULL,
  PRIMARY KEY (soilID),
  UNIQUE KEY soilID_UNIQUE (soilID)
);

-- create table for PlantSoils
CREATE OR REPLACE TABLE PlantSoils (
  plantSoilID int(11) NOT NULL AUTO_INCREMENT, 
  plantID int(11) NOT NULL,
  soilID int(11) NOT NULL,
  PRIMARY KEY (plantSoilID),
  UNIQUE KEY plantSoilID_unique (plantSoilID),
  FOREIGN KEY (plantID) REFERENCES Plants (plantID) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (soilID) REFERENCES SoilTypes (soilID) ON DELETE CASCADE ON UPDATE CASCADE
);


-- create table for WateringEvents
CREATE OR REPLACE TABLE WateringEvents (
  eventID int(11) NOT NULL AUTO_INCREMENT,
  wateringDate date NOT NULL,
  plantID int(11) NOT NULL,
  PRIMARY KEY (eventID,plantID),
  UNIQUE KEY wateringID_UNIQUE (eventID),
  FOREIGN KEY (plantID) REFERENCES Plants (plantID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- create table for FertilizingEvents
CREATE OR REPLACE TABLE FertilizingEvents (
  eventID int(11) NOT NULL AUTO_INCREMENT,
  fertilizingDate date NOT NULL,
  plantID int(11) NOT NULL,
  PRIMARY KEY (eventID,plantID),
  UNIQUE KEY eventID_UNIQUE (eventID),
  FOREIGN KEY (plantID) REFERENCES Plants (plantID) ON DELETE CASCADE ON UPDATE CASCADE
);



-- -----------------------------------------------------
--   ADD SAMPLE DATA 
-- -----------------------------------------------------



-- import data for table PlantTypes
INSERT INTO PlantTypes (
    commonName,
    toxicCat,
    toxicDog,
    preferredLight,
    latinName
)
VALUES (
    "Pothos",
    1,
    1,
    "Medium",
    "Epipremmum aureum"
),
(
    "String of Pearls",
    1,
    1,
    "High",
    "Senecio rowleyanus"
),
(
    "Sungold Tomatoes",
    1,
    1,
    "High",
    "Lycopersicon esculentum"
);



-- import data for table SoilTypes
INSERT INTO SoilTypes (
    soilType,
    soilDescription
)
VALUES (
    "Houseplant Potting Mix",
    "pre-mix with compost"
),
(
    "sandy mix",
    "sandier soil mix good for succulents"
),
(
    "topsoil",
    "contains organic matter like leaves"
);

-- import data for table Plants
INSERT INTO Plants (
    displayName,
    isInside,
    currentLight,
    plantTypeID,
    waterInterval,
    fertilizerInterval,
    plantedDate 
)
VALUES (
    "Pothos in Living Room",
    1,
    "Medium",
    (SELECT plantTypeID FROM PlantTypes WHERE commonName = "Pothos"),
    6,
    14,
    "2023-01-15"   
), 
(
    "Pothos in Dining Room",
    1,
    "Low",
    (SELECT plantTypeID FROM PlantTypes WHERE commonName = "Pothos"),
    14,
    28,
    "2020-03-02"    
),
( 
    "String of Pearls",
    1,
    "High",
    (SELECT plantTypeID FROM PlantTypes WHERE latinName = "Senecio rowleyanus"),
    7,
    0,
    "2024-04-17"
),
(
    "Orange Cherry Tomatoes",
    0,
    "High",
    (SELECT plantTypeID FROM PlantTypes WHERE commonName = "Sungold Tomatoes"),
    1,
    28,
    "2024-06-01"
);



-- import data for table WateringEvents
INSERT INTO WateringEvents (
    wateringDate,
    plantID
)
VALUES (
    '2024-06-30',
    (SELECT plantID FROM Plants WHERE displayName = 'String of Pearls')
), 
( 
    '2024-07-01',
    (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Dining Room')
), 
( 
    '2024-07-15',
    (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Living Room')
),
( 
    '2024-07-16',
    (SELECT plantID FROM Plants WHERE displayName = 'Orange Cherry Tomatoes')
),
( 
    '2024-08-12',
    (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Dining Room')
);
    
-- import data for table FertilizingEvents
INSERT INTO FertilizingEvents (
    fertilizingDate,
    plantID
)
VALUES (
    '2024-05-30',
    (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Living Room')   
), 
( 
    '2024-05-30',
    (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Dining Room')
), 
( 
    '2024-06-15',
    (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Living Room')   
),
( 
    '2024-07-02',
    (SELECT plantID FROM Plants WHERE displayName = 'String of Pearls')
),
( 
    '2024-07-03',
    (SELECT plantID FROM Plants WHERE displayName = 'Orange Cherry Tomatoes')
),
( 
    '2024-08-12',
    (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Dining Room')   
);

-- Data for table PlantSoils

INSERT INTO PlantSoils (
    plantID,
    soilID
)
VALUES (
    (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Living Room'), 
    (SELECT soilID FROM SoilTypes WHERE soilType = 'Houseplant Potting Mix')
), 
( 
    (SELECT plantID FROM Plants WHERE displayName = 'Pothos in Dining Room'),
    (SELECT soilID FROM SoilTypes WHERE soilType = 'Houseplant Potting Mix')
), 
( 
    (SELECT plantID FROM Plants WHERE displayName = 'String of Pearls'),
    (SELECT soilID FROM SoilTypes WHERE soilType = 'Houseplant Potting Mix')
),
( 
    (SELECT plantID FROM Plants WHERE displayName = 'String of Pearls'),
    (SELECT soilID FROM SoilTypes WHERE soilType = 'sandy mix')
),
( 
    (SELECT plantID FROM Plants WHERE displayName = 'Orange Cherry Tomatoes'),
    (SELECT soilID FROM SoilTypes WHERE soilType = 'topsoil')
),
( 
    (SELECT plantID FROM Plants WHERE displayName = 'Orange Cherry Tomatoes'),
    (SELECT soilID FROM SoilTypes WHERE soilType = 'Houseplant Potting Mix')
);

-- re-enable foreign key checks & autocommit that we previously disabled
SET FOREIGN_KEY_CHECKS=1;
COMMIT;