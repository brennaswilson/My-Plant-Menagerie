# Supabase Setup Steps

## Step 1: Get Your Connection String

1. Go to your Supabase project dashboard
2. Click "Settings" in the left sidebar
3. Click "Database"
4. Scroll down to "Connection string"
5. Copy the connection string that looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```

## Step 2: Create Environment File

Create a file called `.env` in `webapp/backend/` with this content:

```env
# Supabase Database Configuration
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
PORT=10000
NODE_ENV=production
```

Replace `[YOUR-PASSWORD]` and `[YOUR-PROJECT-REF]` with your actual values from Supabase.

## Step 3: Install Dependencies

Run these commands in your terminal:

```bash
cd webapp/backend
npm install pg
```

## Step 4: Set Up Your Database Schema

1. Go to your Supabase dashboard
2. Click "SQL Editor" in the left sidebar
3. Copy the entire contents of `webapp/backend/database/schema-postgresql.sql`
4. Paste it into the SQL editor
5. Click "Run" to execute the queries

## Step 5: Test Your Connection

```bash
cd webapp/backend
node test-supabase.js
```

## Step 6: Update Your Application

In `webapp/backend/server.js`, change this line:
```javascript
// Change from:
const db = require('./database/config.js');
// To:
const db = require('./database/config-supabase.js');
```

## Step 7: Test Your Application

```bash
cd webapp/backend
npm start
```

Your application should now be connected to Supabase! 🌱 