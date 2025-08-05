#!/bin/bash

echo "🌱 Supabase Setup for Your Plant Menagerie"
echo "=========================================="

# Install PostgreSQL driver
echo "📦 Installing PostgreSQL driver..."
cd webapp/backend
npm install pg

# Create .env file for Supabase
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file for Supabase..."
    cat > .env << EOF
# Supabase Database Configuration
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
PORT=10000

# Environment
NODE_ENV=production
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

# Create .env file for frontend
cd ../frontend
if [ ! -f ".env" ]; then
    echo "📝 Creating frontend .env file..."
    cat > .env << EOF
# API Configuration
VITE_API_URL=https://your-backend-url.onrender.com/api/
EOF
    echo "✅ Frontend .env file created"
else
    echo "✅ Frontend .env file already exists"
fi

cd ../..

echo ""
echo "📋 Next Steps:"
echo "1. Sign up at https://supabase.com"
echo "2. Create a new project"
echo "3. Go to Settings → Database to get your connection string"
echo "4. Update webapp/backend/.env with your actual DATABASE_URL"
echo "5. Run the PostgreSQL schema: webapp/backend/database/schema-postgresql.sql"
echo "6. Test connection: cd webapp/backend && node test-supabase.js"
echo ""
echo "�� Happy planting!" 