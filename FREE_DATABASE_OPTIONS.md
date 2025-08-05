# Free Database Options for Your Plant Menagerie

Since PlanetScale no longer offers a free tier, here are the best free alternatives for your plant management application:

## Option 1: Supabase (Recommended - PostgreSQL)

**Free Tier Includes:**
- 500MB database
- 50,000 monthly active users
- 2GB bandwidth
- 500MB file storage
- Real-time subscriptions

### Setup Steps:

1. **Sign up at [supabase.com](https://supabase.com)**
2. **Create a new project**
3. **Convert your MySQL schema to PostgreSQL:**

```sql
-- Convert your DDL to PostgreSQL syntax
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
  plantedDate DATE
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
```

4. **Update your database config:**

```javascript
// config-supabase.js
const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
```

5. **Install PostgreSQL driver:**
```bash
cd webapp/backend
npm install pg
```

## Option 2: Railway (PostgreSQL)

**Free Tier Includes:**
- $5/month credit
- PostgreSQL database
- Easy deployment

### Setup Steps:

1. **Sign up at [railway.app](https://railway.app)**
2. **Create a new project**
3. **Add a PostgreSQL database**
4. **Use the same PostgreSQL schema as above**
5. **Railway provides connection details automatically**

## Option 3: Neon (PostgreSQL)

**Free Tier Includes:**
- 3GB storage
- 10GB bandwidth
- Serverless PostgreSQL

### Setup Steps:

1. **Sign up at [neon.tech](https://neon.tech)**
2. **Create a new project**
3. **Use the PostgreSQL schema above**
4. **Get connection string from dashboard**

## Option 4: MongoDB Atlas (MongoDB)

**Free Tier Includes:**
- 512MB storage
- Shared clusters
- MongoDB (NoSQL alternative)

### Setup Steps:

1. **Sign up at [mongodb.com/atlas](https://mongodb.com/atlas)**
2. **Create a free cluster**
3. **Convert your schema to MongoDB collections**
4. **Update your code to use MongoDB driver**

## Option 5: SQLite (Local Database)

**Free and Simple:**
- File-based database
- No hosting required
- Perfect for development

### Setup Steps:

1. **Install SQLite:**
```bash
# macOS
brew install sqlite3

# Or download from sqlite.org
```

2. **Use your existing MySQL schema (SQLite is compatible)**
3. **Update your config:**

```javascript
// config-sqlite.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'plant-menagerie.db');
const db = new sqlite3.Database(dbPath);

module.exports = db;
```

4. **Install SQLite driver:**
```bash
cd webapp/backend
npm install sqlite3
```

## Recommended Approach: Supabase

I recommend **Supabase** because:
- ✅ Generous free tier
- ✅ PostgreSQL (very reliable)
- ✅ Built-in authentication
- ✅ Real-time features
- ✅ Easy to use dashboard
- ✅ Good documentation

## Migration Steps for Supabase:

### Step 1: Set Up Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create account and new project
3. Note your connection details

### Step 2: Update Your Code
1. **Install PostgreSQL driver:**
```bash
cd webapp/backend
npm install pg
```

2. **Create new config file:**
```javascript
// config-supabase.js
const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
```

3. **Update server.js:**
```javascript
// Change this line:
const db = require('./database/config-supabase.js');
```

4. **Set environment variable:**
```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

### Step 3: Convert Your Schema
Use the PostgreSQL schema provided above in the Supabase SQL editor.

## Cost Comparison:

| Service | Free Tier | Paid Plans |
|---------|-----------|------------|
| **Supabase** | 500MB, 50K users | $25/month |
| **Railway** | $5 credit/month | Pay per usage |
| **Neon** | 3GB storage | $0.12/GB |
| **MongoDB Atlas** | 512MB | $9/month |
| **SQLite** | Free | Free |

## Next Steps:

1. **Choose your preferred option** (I recommend Supabase)
2. **Set up your database**
3. **Update your application code**
4. **Test the connection**
5. **Deploy your application**

Would you like me to help you set up any of these options? I can create specific configuration files and migration scripts for whichever option you choose! 