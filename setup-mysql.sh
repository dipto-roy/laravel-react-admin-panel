#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== MySQL Database Setup for Laravel Admin Panel ===${NC}\n"

# Get database credentials
echo -e "${YELLOW}Enter MySQL configuration:${NC}"
read -p "Database name (default: laravel_admin): " DB_NAME
DB_NAME=${DB_NAME:-laravel_admin}

read -p "MySQL username (default: root): " DB_USER
DB_USER=${DB_USER:-root}

read -sp "MySQL password (press Enter if no password): " DB_PASS
echo ""

read -p "MySQL host (default: 127.0.0.1): " DB_HOST
DB_HOST=${DB_HOST:-127.0.0.1}

read -p "MySQL port (default: 3306): " DB_PORT
DB_PORT=${DB_PORT:-3306}

# Test MySQL connection
echo -e "\n${YELLOW}Testing MySQL connection...${NC}"
if [ -z "$DB_PASS" ]; then
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -e "SELECT 1;" > /dev/null 2>&1
else
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -e "SELECT 1;" > /dev/null 2>&1
fi

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ MySQL connection successful!${NC}"
else
    echo -e "${RED}✗ Failed to connect to MySQL. Please check your credentials.${NC}"
    exit 1
fi

# Create database
echo -e "\n${YELLOW}Creating database '$DB_NAME'...${NC}"
if [ -z "$DB_PASS" ]; then
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
else
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASS" -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
fi

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database created successfully!${NC}"
else
    echo -e "${RED}✗ Failed to create database.${NC}"
    exit 1
fi

# Update .env file
echo -e "\n${YELLOW}Updating .env file...${NC}"
sed -i "s/DB_DATABASE=.*/DB_DATABASE=$DB_NAME/" .env
sed -i "s/DB_USERNAME=.*/DB_USERNAME=$DB_USER/" .env
sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$DB_PASS/" .env
sed -i "s/DB_HOST=.*/DB_HOST=$DB_HOST/" .env
sed -i "s/DB_PORT=.*/DB_PORT=$DB_PORT/" .env

echo -e "${GREEN}✓ .env file updated!${NC}"

# Display summary
echo -e "\n${GREEN}=== Configuration Summary ===${NC}"
echo -e "Database: ${YELLOW}$DB_NAME${NC}"
echo -e "Host: ${YELLOW}$DB_HOST:$DB_PORT${NC}"
echo -e "Username: ${YELLOW}$DB_USER${NC}"
echo -e "Password: ${YELLOW}$([ -z "$DB_PASS" ] && echo "(empty)" || echo "********")${NC}"

echo -e "\n${GREEN}=== Next Steps ===${NC}"
echo -e "1. Run migrations: ${YELLOW}php artisan migrate${NC}"
echo -e "2. (Optional) Seed database: ${YELLOW}php artisan db:seed${NC}"
echo -e "3. Start development server: ${YELLOW}php artisan serve${NC}"

echo -e "\n${GREEN}Setup complete! 🎉${NC}"
