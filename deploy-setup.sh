#!/bin/bash

echo "🌱 Your Plant Menagerie - Deployment Setup"
echo "=========================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Create .env files if they don't exist
if [ ! -f "webapp/backend/.env" ]; then
    echo "Creating backend .env file..."
    cat > webapp/backend/.env << EOF
# Database Configuration
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_DATABASE=your-database-name
PORT=10000

# Environment
NODE_ENV=production
EOF
    echo "✅ Backend .env file created"
else
    echo "✅ Backend .env file already exists"
fi

if [ ! -f "webapp/frontend/.env" ]; then
    echo "Creating frontend .env file..."
    cat > webapp/frontend/.env << EOF
# API Configuration
VITE_API_URL=https://your-backend-url.onrender.com/api/
EOF
    echo "✅ Frontend .env file created"
else
    echo "✅ Frontend .env file already exists"
fi

echo ""
echo "📋 Next Steps:"
echo "1. Update the .env files with your actual database credentials"
echo "2. Push your code to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YourPlantMenagerie.git"
echo "   git push -u origin main"
echo "3. Follow the DEPLOYMENT_GUIDE.md for platform-specific instructions"
echo ""
echo "🌱 Happy deploying!" 