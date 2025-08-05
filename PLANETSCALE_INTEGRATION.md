# PlanetScale Integration Guide

This guide will help you integrate PlanetScale (MySQL-compatible database) with your plant management application.

## What is PlanetScale?

PlanetScale is a MySQL-compatible serverless database platform that offers:
- **Free tier**: 1 database, 1 billion reads/month, 10 million writes/month
- **MySQL compatibility**: Works with your existing MySQL code
- **Serverless**: No database management required
- **Branching**: Database schema versioning like Git

## Step 1: Create PlanetScale Account

1. Go to [planetscale.com](https://planetscale.com)
2. Sign up for a free account
3. Verify your email

## Step 2: Create Your Database

1. **Create a new database:**
   - Click "New Database"
   - Choose "Create new database"
   - Name it `your-plant-menagerie` (or your preferred name)
   - Select your region (choose closest to you)
   - Click "Create database"

2. **Get your connection details:**
   - Go to your database dashboard
   - Click "Connect" → "Connect with MySQL"
   - Copy the connection string

## Step 3: Set Up Your Database Schema

### Option A: Using PlanetScale CLI (Recommended)

1. **Install PlanetScale CLI:**
   ```bash
   # macOS
   brew install planetscale/tap/pscale
   
   # Or download from: https://github.com/planetscale/cli/releases
   ```

2. **Login to PlanetScale:**
   ```bash
   pscale auth login
   ```

3. **Create a development branch:**
   ```bash
   pscale branch create your-plant-menagerie main
   ```

4. **Apply your schema:**
   ```bash
   # Connect to your database
   pscale connect your-plant-menagerie main
   
   # In another terminal, run your DDL
   mysql -h 127.0.0.1 -P 3306 -u root -p your-plant-menagerie < webapp/backend/database/ddl.sql
   ```

### Option B: Using PlanetScale Dashboard

1. Go to your database dashboard
2. Click "Console" → "Query"
3. Copy and paste the contents of `webapp/backend/database/ddl.sql`
4. Execute the queries

## Step 4: Update Your Application Configuration

### Option A: Use PlanetScale-Specific Config

1. **Update your server.js to use the PlanetScale config:**
   ```javascript
   // In server.js, change this line:
   const db = require('./database/config-planetscale.js');
   ```

2. **Create environment variables:**
   Create a `.env` file in `webapp/backend/`:
   ```env
   DB_HOST=aws.connect.psdb.cloud
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_DATABASE=your-plant-menagerie
   PORT=10000
   ```

### Option B: Use Connection String

1. **Update config.js to support connection strings:**
   ```javascript
   const mysql = require("mysql2");
   require("dotenv").config();

   let pool;
   
   if (process.env.DATABASE_URL) {
     // Use connection string (PlanetScale)
     pool = mysql.createPool(process.env.DATABASE_URL).promise();
   } else {
     // Use individual parameters
     pool = mysql.createPool({
       connectionLimit: 10,
       waitForConnections: true,
       host: process.env.DB_HOST || "localhost",
       user: process.env.DB_USER || "root",
       password: process.env.DB_PASSWORD || "",
       database: process.env.DB_DATABASE || "your_database_name",
       ssl: process.env.DB_HOST?.includes('psdb.cloud') ? {
         rejectUnauthorized: true
       } : false
     }).promise();
   }

   module.exports = pool;
   ```

2. **Set environment variable:**
   ```env
   DATABASE_URL=mysql://username:password@aws.connect.psdb.cloud:3306/your-plant-menagerie?sslaccept=strict
   ```

## Step 5: Test Your Connection

1. **Create a test script:**
   ```javascript
   // test-connection.js
   const db = require('./database/config-planetscale.js');

   async function testConnection() {
     try {
       const [rows] = await db.query('SELECT 1 as test');
       console.log('✅ Database connection successful!');
       console.log('Test result:', rows[0]);
     } catch (error) {
       console.error('❌ Database connection failed:', error);
     } finally {
       process.exit(0);
     }
   }

   testConnection();
   ```

2. **Run the test:**
   ```bash
   cd webapp/backend
   node test-connection.js
   ```

## Step 6: Deploy with PlanetScale

### For Render Deployment:

1. **Add environment variables in Render:**
   - Go to your backend service in Render
   - Go to "Environment" tab
   - Add these variables:
     ```
     DB_HOST=aws.connect.psdb.cloud
     DB_USER=your_username
     DB_PASSWORD=your_password
     DB_DATABASE=your-plant-menagerie
     ```

2. **Or use connection string:**
   ```
   DATABASE_URL=mysql://username:password@aws.connect.psdb.cloud:3306/your-plant-menagerie?sslaccept=strict
   ```

### For Railway Deployment:

1. **Add environment variables in Railway:**
   - Go to your project in Railway
   - Go to "Variables" tab
   - Add the same variables as above

## Step 7: Database Management

### Viewing Your Data:

1. **PlanetScale Dashboard:**
   - Go to your database
   - Click "Console" → "Query"
   - Run: `SELECT * FROM Plants;`

2. **Using CLI:**
   ```bash
   pscale connect your-plant-menagerie main
   ```

### Making Schema Changes:

1. **Create a new branch:**
   ```bash
   pscale branch create your-plant-menagerie feature-name
   ```

2. **Make your changes:**
   ```bash
   pscale connect your-plant-menagerie feature-name
   # Make your schema changes
   ```

3. **Deploy to main:**
   ```bash
   pscale branch deploy your-plant-menagerie feature-name main
   ```

## Troubleshooting

### Common Issues:

1. **SSL Connection Errors:**
   - Make sure you're using the correct SSL configuration
   - PlanetScale requires SSL connections

2. **Authentication Errors:**
   - Verify your username and password
   - Check that your IP is allowed (if using IP restrictions)

3. **Connection Timeout:**
   - Check your network connection
   - Verify the host URL is correct

4. **Schema Issues:**
   - Make sure your DDL is compatible with PlanetScale
   - Some MySQL features might not be supported

### Debugging:

1. **Check connection details:**
   ```bash
   pscale connect your-plant-menagerie main --debug
   ```

2. **View logs:**
   - Check your application logs
   - Use PlanetScale's query insights

## PlanetScale Features

### Free Tier Limits:
- 1 database
- 1 billion reads/month
- 10 million writes/month
- 5GB storage
- 1,000 concurrent connections

### Branching:
- Create development branches
- Test schema changes safely
- Merge changes like Git

### Insights:
- Query performance monitoring
- Slow query detection
- Connection analytics

## Next Steps

1. Set up your PlanetScale database
2. Apply your schema
3. Update your application configuration
4. Test the connection
5. Deploy your application
6. Monitor your usage

Your plant management app will now be running on a production-ready, serverless MySQL database! 🌱 