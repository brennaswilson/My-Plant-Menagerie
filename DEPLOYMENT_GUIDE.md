# Your Plant Menagerie - Deployment Guide

This guide will help you deploy your plant management application online. You have several options depending on your needs and budget.

## Prerequisites

Before deploying, you'll need:
1. A GitHub account (to host your code)
2. A database hosting service (for your MySQL database)
3. A deployment platform account

## Option 1: Render (Recommended - Free Tier)

Render is a great platform for full-stack applications with a generous free tier.

### Step 1: Database Setup

1. **Sign up for a free database service:**
   - **PlanetScale** (MySQL-compatible, free tier available)
   - **Railway** (PostgreSQL, free tier available)
   - **Supabase** (PostgreSQL, free tier available)

2. **Create your database and get connection details**

### Step 2: Prepare Your Code

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YourPlantMenagerie.git
   git push -u origin main
   ```

2. **Update environment variables:**
   Create `.env` files in both backend and frontend directories with your database credentials.

### Step 3: Deploy Backend

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name:** your-plant-menagerie-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Root Directory:** `webapp/backend`

5. Add environment variables:
   - `DB_HOST` - Your database host
   - `DB_USER` - Your database username
   - `DB_PASSWORD` - Your database password
   - `DB_DATABASE` - Your database name
   - `PORT` - 10000

6. Deploy and note the URL (e.g., `https://your-plant-menagerie-backend.onrender.com`)

### Step 4: Deploy Frontend

1. In Render, click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name:** your-plant-menagerie-frontend
   - **Build Command:** `cd webapp/frontend && npm install && npm run build`
   - **Publish Directory:** `webapp/frontend/dist`
   - **Root Directory:** `webapp/frontend`

4. Add environment variable:
   - `VITE_API_URL` - `https://your-plant-menagerie-backend.onrender.com/api/`

5. Deploy

## Option 2: Railway (Alternative)

Railway is another excellent platform with a free tier.

### Step 1: Database Setup
1. Create a PostgreSQL database in Railway
2. Update your database config to use PostgreSQL instead of MySQL

### Step 2: Deploy
1. Connect your GitHub repo to Railway
2. Railway will auto-detect your Node.js app
3. Set environment variables
4. Deploy

## Option 3: Vercel + PlanetScale

### Step 1: Database
1. Sign up for [PlanetScale](https://planetscale.com)
2. Create a MySQL database
3. Get connection details

### Step 2: Deploy Backend
1. Use Railway or Render for the backend (as above)

### Step 3: Deploy Frontend
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure build settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `webapp/frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. Add environment variable:
   - `VITE_API_URL` - Your backend URL

## Database Migration

You'll need to set up your database schema. Here are your options:

### Option A: Use your existing DDL
1. Connect to your new database
2. Run the SQL from `webapp/backend/database/ddl.sql`

### Option B: Use a migration tool
1. Install a migration tool like `db-migrate`
2. Create migration files for your schema
3. Run migrations

## Environment Variables

Create `.env` files in your backend directory:

```env
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_DATABASE=your-database-name
PORT=10000
```

## Troubleshooting

### Common Issues:

1. **CORS errors:** Make sure your backend CORS settings allow your frontend domain
2. **Database connection:** Verify your database credentials and connection string
3. **Build failures:** Check that all dependencies are in package.json
4. **Environment variables:** Ensure all required variables are set in your deployment platform

### Debugging:
- Check deployment logs in your platform's dashboard
- Use console.log statements in your backend to debug
- Test your API endpoints using tools like Postman

## Cost Considerations

- **Render:** Free tier includes 750 hours/month for web services
- **Railway:** Free tier includes $5/month credit
- **Vercel:** Free tier for frontend hosting
- **PlanetScale:** Free tier includes 1 database
- **Supabase:** Free tier includes 500MB database

## Next Steps

1. Choose your preferred platform
2. Set up your database
3. Deploy your backend
4. Deploy your frontend
5. Test your application
6. Set up a custom domain (optional)

Your application should now be accessible online! 🌱 