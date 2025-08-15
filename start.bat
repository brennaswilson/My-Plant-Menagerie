@echo off
REM Your Plant Menagerie - Portfolio Startup Script (Windows)
REM This script sets up and starts the application for portfolio demonstrations

echo 🌱 Starting Your Plant Menagerie
echo ===============================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ Node.js and npm found

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd webapp\backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)

echo ✅ All dependencies installed successfully

REM Create .env file for backend if it doesn't exist
cd ..\backend
if not exist .env (
    echo 🔧 Creating .env file for backend...
    (
        echo # Database Configuration (SQLite - Local Development)
        echo DATABASE_TYPE=sqlite
        echo.
        echo # Server Configuration
        echo PORT=8500
        echo.
        echo # Optional: Uncomment to use external databases
        echo # DATABASE_TYPE=postgresql
        echo # DATABASE_TYPE=mysql
        echo # DATABASE_URL=your_database_connection_string
    ) > .env
    echo ✅ Created .env file
)

REM Start the application
echo 🚀 Starting the application...
echo.
echo The application will be available at:
echo   Frontend: http://localhost:5173
echo   Backend API: http://localhost:8500
echo.
echo Press Ctrl+C to stop both servers
echo.

REM Start backend in background
echo 🔧 Starting backend server...
start "Backend Server" cmd /c "npm start"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo 🎨 Starting frontend server...
start "Frontend Server" cmd /c "cd ..\frontend && npm run dev"

echo.
echo ✅ Both servers started successfully!
echo.
echo The application is now running. You can:
echo - Open http://localhost:5173 in your browser
echo - Close this window when done
echo.
pause
