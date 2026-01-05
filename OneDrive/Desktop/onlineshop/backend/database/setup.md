# Database Setup Guide

## PostgreSQL Database Setup

### Step 1: Install PostgreSQL (if not installed)

#### Windows:
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Run installer
3. Remember the password you set for `postgres` user
4. Default port: 5432

#### macOS:
```bash
brew install postgresql
brew services start postgresql
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

---

### Step 2: Create Database

#### Option 1: Using psql command line
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE onlineshop;

# Exit
\q
```

#### Option 2: Using createdb command
```bash
createdb -U postgres onlineshop
```

#### Option 3: Using SQL file
```bash
# Create database SQL file
echo "CREATE DATABASE onlineshop;" > create_db.sql
psql -U postgres -f create_db.sql
```

---

### Step 3: Run Schema

```bash
cd backend
psql -U postgres -d onlineshop -f database/schema.sql
```

Or using connection string:
```bash
psql postgresql://user:password@localhost:5432/onlineshop -f database/schema.sql
```

---

### Step 4: Verify Tables

```bash
psql -U postgres -d onlineshop

# List all tables
\dt

# Describe a table
\d users
\d products

# Exit
\q
```

---

### Step 5: Configure Backend .env

Create `.env` file in `backend/` directory:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/onlineshop
```

Replace `your_password` with your PostgreSQL password.

---

## Troubleshooting

### Connection Error
- Check PostgreSQL is running
- Verify username and password
- Check port (default: 5432)
- Verify database exists

### Permission Error
- Make sure user has CREATE DATABASE permission
- Or use postgres superuser

### Port Already in Use
- Check if PostgreSQL is running on port 5432
- Or change port in connection string

---

## Quick Setup Script (Linux/macOS)

```bash
#!/bin/bash
# setup_db.sh

DB_NAME="onlineshop"
DB_USER="postgres"

# Create database
createdb -U $DB_USER $DB_NAME

# Run schema
psql -U $DB_USER -d $DB_NAME -f backend/database/schema.sql

echo "Database setup complete!"
```

---

## Windows PowerShell Script

```powershell
# setup_db.ps1

$DB_NAME = "onlineshop"
$DB_USER = "postgres"

# Create database (if createdb is available)
# createdb -U $DB_USER $DB_NAME

# Or using psql
psql -U $DB_USER -c "CREATE DATABASE $DB_NAME;"

# Run schema
psql -U $DB_USER -d $DB_NAME -f backend/database/schema.sql

Write-Host "Database setup complete!"
```

