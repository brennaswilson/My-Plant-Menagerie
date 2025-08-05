#!/bin/bash

echo "🌱 PlanetScale Setup for Your Plant Menagerie"
echo "============================================="

# Check if PlanetScale CLI is installed
if ! command -v pscale &> /dev/null; then
    echo "📦 Installing PlanetScale CLI..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install planetscale/tap/pscale
    else
        echo "Please install PlanetScale CLI manually:"
        echo "Visit: https://github.com/planetscale/cli/releases"
        echo "Or run: curl -sL https://github.com/planetscale/cli/releases/latest/download/pscale_$(uname -s)_$(uname -m).tar.gz | tar -xz && sudo mv pscale /usr/local/bin/"
    fi
else
    echo "✅ PlanetScale CLI is already installed"
fi

# Create .env file for PlanetScale
if [ ! -f "webapp/backend/.env" ]; then
    echo "📝 Creating .env file for PlanetScale..."
    cat > webapp/backend/.env << EOF
# PlanetScale Database Configuration
DB_HOST=aws.connect.psdb.cloud
DB_USER=your_username
DB_PASSWORD=your_password
DB_DATABASE=your-plant-menagerie
PORT=10000

# Environment
NODE_ENV=production
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Create .env file for frontend
if [ ! -f "webapp/frontend/.env" ]; then
    echo "📝 Creating frontend .env file..."
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
echo "1. Sign up at https://planetscale.com"
echo "2. Create a new database"
echo "3. Get your connection details from the dashboard"
echo "4. Update webapp/backend/.env with your actual credentials"
echo "5. Run: pscale auth login"
echo "6. Test connection: cd webapp/backend && node test-planetscale.js"
echo ""
echo "�� Happy planting!" 