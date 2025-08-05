#!/bin/bash

echo "🌱 Preparing Your Plant Menagerie for Deployment"
echo "================================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo "📝 Creating .gitignore..."
    cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build files
dist/
build/

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
EOF
    echo "✅ .gitignore created"
else
    echo "✅ .gitignore already exists"
fi

echo ""
echo "📋 Next Steps for Deployment:"
echo "1. Push your code to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YourPlantMenagerie.git"
echo "   git push -u origin main"
echo ""
echo "2. Choose your deployment platform:"
echo "   - Render (recommended): https://render.com"
echo "   - Railway: https://railway.app"
echo "   - Vercel: https://vercel.com"
echo ""
echo "3. Set environment variables in your deployment platform:"
echo "   DATABASE_URL=postgresql://postgres.iyailcjpwniyvgnxpumz:Specific3898!@aws-0-us-east-2.pooler.supabase.com:6543/postgres"
echo "   PORT=10000"
echo "   NODE_ENV=production"
echo ""
echo "🌱 Happy deploying!" 