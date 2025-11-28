# MySQL Connection Setup Guide

## Quick Setup

Run the automated setup script:

```bash
./setup-mysql.sh
```

The script will:

1. Ask for your MySQL credentials
2. Test the connection
3. Create the database
4. Update your `.env` file

---

## Manual Setup

### Step 1: Create MySQL Database

Login to MySQL:

```bash
mysql -u root -p
```

Create database:

```sql
CREATE DATABASE laravel_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
EXIT;
```

### Step 2: Configure .env File

Update these lines in your `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_admin
DB_USERNAME=root
DB_PASSWORD=your_password_here
```

### Step 3: Test Connection

```bash
php artisan tinker
```

Then in tinker:

```php
DB::connection()->getPdo();
exit;
```

---

## Run Migrations

After configuring the database, run:

```bash
php artisan migrate
```

This will create the following tables:

- `users` - User accounts
- `cards` - Student/card records
- `courses` - Course information
- `table_data` - Table module data
- `classes` - Class information
- `departments` - Department records
- `subjects` - Subject listings
- `sessions` - Session management
- `cache` - Application cache
- `migrations` - Migration tracking

---

## Common MySQL Issues

### Issue 1: Access Denied

**Error:** `Access denied for user 'root'@'localhost'`

**Solution:**

```bash
sudo mysql -u root
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
EXIT;
```

### Issue 2: Connection Refused

**Error:** `Connection refused (SQLSTATE[HY000] [2002])`

**Solution:** Start MySQL service

```bash
sudo systemctl start mysql
sudo systemctl enable mysql
sudo systemctl status mysql
```

### Issue 3: Database Already Exists

**Error:** `Database already exists`

**Solution:** Drop and recreate

```bash
mysql -u root -p
DROP DATABASE laravel_admin;
CREATE DATABASE laravel_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Issue 4: PDO Extension Not Found

**Error:** `could not find driver`

**Solution:** Install PHP MySQL extension

```bash
sudo apt-get install php-mysql
sudo systemctl restart apache2  # or nginx
```

---

## Database Seeding (Optional)

Create test data:

```bash
php artisan db:seed
```

Or create a custom seeder:

```bash
php artisan make:seeder CardSeeder
```

---

## Verify Database Tables

After migration:

```bash
mysql -u root -p laravel_admin
SHOW TABLES;
DESCRIBE cards;
EXIT;
```

---

## Connection Status Check

```bash
php artisan migrate:status
```

Shows which migrations have been run.

---

## Environment Variables Reference

```env
# Database Configuration
DB_CONNECTION=mysql          # Database driver
DB_HOST=127.0.0.1           # Database host (localhost)
DB_PORT=3306                # MySQL default port
DB_DATABASE=laravel_admin   # Your database name
DB_USERNAME=root            # MySQL username
DB_PASSWORD=                # MySQL password (leave empty if no password)

# MySQL Socket (optional)
DB_SOCKET=/var/run/mysqld/mysqld.sock

# MySQL SSL (optional for production)
MYSQL_ATTR_SSL_CA=/path/to/ca-cert.pem
```

---

## Production Considerations

For production deployment:

1. **Use strong database password**

   ```env
   DB_PASSWORD=strong_random_password_here
   ```

2. **Restrict database user privileges**

   ```sql
   CREATE USER 'laravel_user'@'localhost' IDENTIFIED BY 'strong_password';
   GRANT ALL PRIVILEGES ON laravel_admin.* TO 'laravel_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Enable SSL connections**

   ```env
   DB_CONNECTION=mysql
   MYSQL_ATTR_SSL_CA=/etc/mysql/ssl/ca-cert.pem
   ```

4. **Configure connection pooling**
   Update `config/database.php`:
   ```php
   'options' => [
       PDO::ATTR_PERSISTENT => true,
   ]
   ```

---

## Backup Database

Create a backup:

```bash
mysqldump -u root -p laravel_admin > backup_$(date +%Y%m%d).sql
```

Restore from backup:

```bash
mysql -u root -p laravel_admin < backup_20241125.sql
```

---

## Success!

Once connected, you should see:

```
Migration table created successfully.
Migrating: 2024_01_01_000001_create_cards_table
Migrated:  2024_01_01_000001_create_cards_table (123.45ms)
...
```

Your MySQL database is now connected! 🎉
