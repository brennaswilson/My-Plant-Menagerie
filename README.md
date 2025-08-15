# Your Plant Menagerie 🌱

A full-stack web application for managing your plant collection, tracking watering and fertilizing schedules, and maintaining detailed plant care records.

## 🎯 Features

This project is designed to work immediately with:

- ✅ **Zero External Dependencies** - Works completely offline with SQLite
- ✅ **One-Command Setup** - Automated startup scripts
- ✅ **Complete Full-Stack** - React frontend with Express backend
- ✅ **Professional Architecture** - Clean separation of concerns
- ✅ **Sample Data Included** - Ready to use immediately
- ✅ **Cross-Platform** - Works on macOS, Linux, and Windows

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### 🎯 **One-Command Setup (Recommended)**

**macOS/Linux:**
```bash
# Make the script executable (first time only)
chmod +x start.sh

# Run the startup script
./start.sh
```

**Windows:**
```cmd
start.bat
```

### ✨ **What the Script Does Automatically:**

- ✅ **Checks prerequisites** (Node.js, npm)
- ✅ **Installs all dependencies** (backend + frontend)
- ✅ **Creates configuration files** (.env files)
- ✅ **Starts both servers** (backend + frontend)
- ✅ **Shows you the URLs** to access the application
- ✅ **Handles errors gracefully** with clear messages

### 🌐 **After Running the Script:**

You'll see output like:
```
🌱 Starting Your Plant Menagerie
================================
✅ Node.js and npm found
📦 Installing backend dependencies...
📦 Installing frontend dependencies...
✅ All dependencies installed successfully
🔧 Creating .env file for backend...
✅ Created .env file
🚀 Starting the application...

The application will be available at:
  Frontend: http://localhost:5173
  Backend API: http://localhost:8500
```

### 🛑 **To Stop the Application:**
Press `Ctrl+C` in the terminal where you ran the script.

---

### 📋 **Manual Setup (Alternative)**

If you prefer to set up manually or need to troubleshoot:

1. **Clone and Navigate:**
   ```bash
   git clone <your-repo-url>
   cd YourPlantMenagerie
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd webapp/backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start Backend Server:**
   ```bash
   cd ../backend
   npm start
   ```
   You should see: "Server running on http://localhost:10000"

5. **Start Frontend Server (New Terminal):**
   ```bash
   cd webapp/frontend
   npm run dev
   ```
   You should see: "Local: http://localhost:5173" (or similar port)

6. **Access the Application:**
   - **Frontend**: http://localhost:5173 (or the port shown in terminal)
   - **Backend API**: http://localhost:10000/api/

## 🗄️ Database

### SQLite (Default - Portfolio Friendly)
- **No external dependencies** - Works completely offline
- **Perfect for portfolio demonstrations** - No cloud services needed
- **Automatic setup** - Creates database and sample data automatically
- **Zero configuration** - Works out of the box

The application automatically:
- Creates a local SQLite database file
- Sets up all required tables
- Loads sample data (plants, soil types, events)
- Handles all database operations

### Sample Data Included
- **3 Plant Types**: Pothos, String of Pearls, Tomatoes
- **3 Soil Types**: Houseplant mix, Sandy mix, Topsoil
- **4 Plants**: With different care schedules
- **5 Watering Events**: Historical care records
- **6 Fertilizing Events**: Complete care history

## 🌱 Features

### Plant Management
- Add, edit, and delete plants
- Track plant types and care requirements
- Monitor light conditions and location

### Care Scheduling
- Automated watering reminders
- Fertilizing schedule tracking
- Historical care event logging

### Soil Management
- Track different soil types
- Associate soils with specific plants
- Maintain soil descriptions

### Dashboard
- Overview of all plants
- Next watering/fertilizing dates
- Quick access to plant details

## 🛠️ Technical Stack

### Frontend
- **React.js** - Modern component-based UI
- **SCSS** - Advanced styling with variables and mixins
- **Vite** - Fast development and build tooling

### Backend
- **Node.js/Express.js** - RESTful API server
- **Multi-Database Support** - SQLite, PostgreSQL, MySQL
- **Database Abstraction** - Consistent interface across databases

### Database
- **Relational Design** - Proper normalization and relationships
- **Foreign Key Constraints** - Data integrity
- **Sample Data** - Ready-to-use demonstration data

## 📁 Project Structure

```
YourPlantMenagerie/
├── start.sh                    # macOS/Linux startup script
├── start.bat                   # Windows startup script
├── PORTFOLIO_SETUP.md          # Detailed portfolio guide
├── webapp/
│   ├── backend/
│   │   ├── controllers/        # API controllers
│   │   ├── database/
│   │   │   ├── config.js       # Smart database switcher
│   │   │   ├── config-sqlite.js # SQLite configuration
│   │   │   ├── db-adapter.js   # Database interface
│   │   │   └── schema-*.sql    # Database schemas
│   │   ├── routes/             # API routes
│   │   └── server.js           # Express server
│   └── frontend/
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── pages/          # React pages
│       │   └── App.jsx         # Main app component
│       └── public/             # Static assets
```

## 🎯 Portfolio Highlights

### Technical Achievements
1. **One-Command Setup** - Automated startup scripts for instant demonstrations
2. **Full-Stack Development** - Complete React + Express application
3. **Database Design** - Proper normalization with foreign key relationships
4. **API Design** - RESTful endpoints with comprehensive error handling
5. **Cross-Platform Compatibility** - Works seamlessly on all operating systems

### Business Logic
1. **Plant Care Management** - Complete lifecycle tracking
2. **Automated Scheduling** - Smart reminder system
3. **Data Relationships** - Complex plant-soil-type associations
4. **Event History** - Complete audit trail of care activities

## 🔧 Configuration

### Environment Variables (Optional)

The application works out of the box with SQLite. If you want to customize settings, create `webapp/backend/.env`:

```env
# Server Configuration
PORT=10000

# Database Configuration (SQLite is default)
DATABASE_TYPE=sqlite

# Optional: For cloud deployments
# DATABASE_TYPE=postgresql
# DATABASE_TYPE=mysql
# DATABASE_URL=your_connection_string
```

**Note**: No configuration is required for portfolio demonstrations - the app works immediately!

## 📊 Sample Data

The application comes with comprehensive sample data ready for demonstrations:

- **Plant Types**: Pothos, String of Pearls, Tomatoes
- **Soil Types**: Houseplant mix, Sandy mix, Topsoil  
- **Plants**: Multiple plants with different care schedules
- **Events**: Historical watering and fertilizing records

All data is automatically loaded when you first start the application!

## 🚀 Deployment Options

### Local Development
- Uses SQLite database
- No external dependencies
- Perfect for demonstrations
- **One-command setup** with automated scripts

### Cloud Deployment
- Supports Render, Heroku, Vercel, etc.
- Can use PostgreSQL, MySQL, or other cloud databases
- Environment-based configuration

## 📝 API Endpoints

### Plants
- `GET /api/Plants` - List all plants
- `POST /api/Plants` - Create new plant
- `PUT /api/Plants/:id` - Update plant
- `DELETE /api/Plants/:id` - Delete plant

### Plant Types
- `GET /api/plantTypes` - List plant types
- `POST /api/plantTypes` - Create plant type
- `PUT /api/plantTypes/:id` - Update plant type
- `DELETE /api/plantTypes/:id` - Delete plant type

### Soil Types
- `GET /api/soilTypes` - List soil types
- `POST /api/soilTypes` - Create soil type
- `PUT /api/soilTypes/:id` - Update soil type
- `DELETE /api/soilTypes/:id` - Delete soil type

### Events
- `GET /api/WateringEvents` - List watering events
- `POST /api/WateringEvents` - Create watering event
- `GET /api/FertilizingEvents` - List fertilizing events
- `POST /api/FertilizingEvents` - Create fertilizing event

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change `PORT` in `.env` file
   - Default: 10000

2. **Frontend not loading**
   - Check the terminal output for the correct port
   - Try refreshing the browser or clearing cache
   - Make sure both servers are running

3. **Database not found**
   - SQLite database is created automatically
   - Check `webapp/backend/database/` directory

4. **Dependencies not installed**
   - Run `npm install` in both backend and frontend directories
   - Or use the automated startup scripts

### Quick Fixes
- **Hard refresh**: Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac)
- **Clear browser cache**: Open in incognito/private window
- **Restart servers**: Stop both servers and run the startup script again

### Reset Database
```bash
cd webapp/backend/database
rm plant_menagerie.db
# Restart server to recreate database
```

## 👥 Contributors

- **Brenna Wilson** - **Brianna Kromrey** 


## 🎯 **Ready to Use!** 🌟

This project showcases:
- **Full-stack development** with React + Express
- **Database design** with SQLite
- **API development** with RESTful endpoints
- **Problem-solving** with elegant architecture
- **Professional code** with clean documentation

**Clone, run, and explore!** 🚀



