#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Laravel + Inertia.js Admin Panel - Complete Setup      ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}\n"

# Check if Laravel is already installed
if [ -f "composer.json" ]; then
    echo -e "${GREEN}✓ Laravel installation detected${NC}"
else
    echo -e "${RED}✗ Laravel not installed${NC}"
    echo -e "${YELLOW}This project needs Laravel to work with Inertia.js${NC}\n"
    
    echo -e "${YELLOW}Choose installation method:${NC}"
    echo "1) Install Laravel here (will merge with existing files)"
    echo "2) Create fresh Laravel in parent directory and copy Inertia files"
    echo "3) Manual installation guide"
    read -p "Choice (1-3): " choice
    
    case $choice in
        1)
            echo -e "\n${YELLOW}Installing Laravel in current directory...${NC}"
            composer create-project laravel/laravel temp-laravel --prefer-dist
            
            # Copy Laravel files
            cp -r temp-laravel/* .
            cp temp-laravel/.gitignore .
            rm -rf temp-laravel
            
            echo -e "${GREEN}✓ Laravel installed${NC}"
            ;;
        2)
            echo -e "\n${YELLOW}Please run these commands:${NC}"
            echo "cd .."
            echo "composer create-project laravel/laravel laravel-admin"
            echo "cd laravel-admin"
            echo "cp -r ../frontend/resources ."
            echo "cp -r ../frontend/routes ."
            echo "cp -r ../frontend/app ."
            echo "cp -r ../frontend/database ."
            echo "cp ../frontend/vite.config.js ."
            echo "cp ../frontend/package.json ."
            echo "cp ../frontend/.env ."
            exit 0
            ;;
        3)
            echo -e "\n${BLUE}=== Manual Installation Guide ===${NC}"
            echo "1. Install Laravel: composer create-project laravel/laravel project-name"
            echo "2. Copy these directories to Laravel project:"
            echo "   - resources/"
            echo "   - routes/"
            echo "   - app/"
            echo "   - database/"
            echo "3. Copy these files:"
            echo "   - vite.config.js"
            echo "   - package.json"
            echo "   - .env"
            echo "4. Run: composer require inertiajs/inertia-laravel"
            echo "5. Run: npm install"
            echo "6. Run: php artisan migrate"
            exit 0
            ;;
    esac
fi

# Install Inertia Laravel package
echo -e "\n${YELLOW}Installing Inertia.js Laravel adapter...${NC}"
composer require inertiajs/inertia-laravel tightenco/ziggy

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Inertia Laravel installed${NC}"
else
    echo -e "${RED}✗ Failed to install Inertia Laravel${NC}"
    exit 1
fi

# Publish Inertia middleware
echo -e "\n${YELLOW}Publishing Inertia middleware...${NC}"
php artisan inertia:middleware

# Install NPM dependencies
echo -e "\n${YELLOW}Installing NPM dependencies...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ NPM packages installed${NC}"
else
    echo -e "${RED}✗ Failed to install NPM packages${NC}"
    exit 1
fi

# Generate app key if not set
if ! grep -q "APP_KEY=base64:" .env; then
    echo -e "\n${YELLOW}Generating application key...${NC}"
    php artisan key:generate
    echo -e "${GREEN}✓ App key generated${NC}"
fi

# Run migrations
echo -e "\n${YELLOW}Running database migrations...${NC}"
read -p "Do you want to run migrations now? (y/n): " run_migrations

if [ "$run_migrations" = "y" ]; then
    php artisan migrate
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Migrations completed${NC}"
    else
        echo -e "${RED}✗ Migration failed. Check your database connection in .env${NC}"
    fi
fi

# Summary
echo -e "\n${BLUE}╔══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                 Installation Complete! 🎉                ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════╝${NC}\n"

echo -e "${GREEN}Next steps:${NC}"
echo -e "1. Start Vite dev server:  ${YELLOW}npm run dev${NC}"
echo -e "2. Start Laravel server:   ${YELLOW}php artisan serve${NC}"
echo -e "3. Visit your app:         ${YELLOW}http://localhost:8000${NC}"

echo -e "\n${YELLOW}Important:${NC} Keep both terminals running (npm and php artisan serve)"
echo -e "\n${GREEN}Your Inertia.js admin panel is ready!${NC}"
