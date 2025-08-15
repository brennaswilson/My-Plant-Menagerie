#!/bin/bash

# Your Plant Menagerie - Portfolio Startup Script
# This script sets up and starts the application for portfolio demonstrations

echo "🌱 Starting Your Plant Menagerie"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm found"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd webapp/backend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

echo "✅ All dependencies installed successfully"

# Create .env file for backend if it doesn't exist
cd ../backend
if [ ! -f .env ]; then
    echo "🔧 Creating .env file for backend..."
    cat > .env << EOF
# Database Configuration (SQLite - Local Development)
DATABASE_TYPE=sqlite

# Server Configuration
PORT=8500

# Optional: Uncomment to use external databases
# DATABASE_TYPE=postgresql
# DATABASE_TYPE=mysql
# DATABASE_URL=your_database_connection_string
EOF
    echo "✅ Created .env file"
fi

# Start the application
echo "🚀 Starting the application..."
echo ""
echo "The application will be available at:"
echo "  Frontend: http://localhost:5173"
echo "  Backend API: http://localhost:8500"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
echo "🔧 Starting backend server..."
cd ../backend
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait
