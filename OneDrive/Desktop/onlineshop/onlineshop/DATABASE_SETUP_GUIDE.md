# Database Setup Guide

## 🗄️ PostgreSQL Database Setup

### Current Status
⚠️ **PostgreSQL is not installed or not in PATH**

---

## Step 1: Install PostgreSQL

### Windows

#### Option 1: Installer (Recommended)
1. Download PostgreSQL: https://www.postgresql.org/download/windows/
2. Run installer
3. Choose installation directory (default: `C:\Program Files\PostgreSQL\16`)
4. Set password for `postgres` user (REMEMBER THIS!)
5. Port: 5432 (default)
6. Finish installation

#### Option 2: Using Chocolatey
```powershell
choco install postgresql
```

#### Option 3: Using Scoop
```powershell
scoop install postgresql
```

### After Installation
Add PostgreSQL to PATH:
- Path: `C:\Program Files\PostgreSQL\16\bin`
- Add to System Environment Variables

Or use full path:
```powershell
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" --version
```

---

## Step 2: Start PostgreSQL Service

### Windows
```powershell
# Check if service is running
Get-Service postgresql*

# Start service (if not running)
Start-Service postgresql-x64-16  # Adjust version number
```

Or use Services GUI:
1. Open `services.msc`
2. Find `postgresql-x64-16` service
3. Start if not running

---

## Step 3: Create Database

### Using psql
```powershell
# Connect to PostgreSQL
psql -U postgres

# Enter password when prompted

# Create database
CREATE DATABASE onlineshop;

# Exit
\q
```

### Using createdb command
```powershell
createdb -U postgres onlineshop
```

### Using SQL file
```powershell
# Create SQL file
echo "CREATE DATABASE onlineshop;" | Out-File -Encoding utf8 create_db.sql

# Execute
psql -U postgres -f create_db.sql
```

---

## Step 4: Run Schema

```powershell
cd backend
psql -U postgres -d onlineshop -f database/schema.sql
```

Or using full path:
```powershell
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -d onlineshop -f database\schema.sql
```

---

## Step 5: Verify Database

```powershell
# Connect to database
psql -U postgres -d onlineshop

# List tables
\dt

# Check users table
\d users

# Check products table
\d products

# Exit
\q
```

---

## Step 6: Configure Backend .env

Create `.env` file in `backend/` directory:

```env
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/onlineshop

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

**Important**: Replace `YOUR_PASSWORD` with your PostgreSQL password!

---

## Alternative: Docker (Easier Option)

If PostgreSQL installation is complicated, use Docker:

### Install Docker Desktop
1. Download: https://www.docker.com/products/docker-desktop/
2. Install and start Docker Desktop

### Run PostgreSQL in Docker
```powershell
docker run --name onlineshop-db `
  -e POSTGRES_PASSWORD=postgres `
  -e POSTGRES_DB=onlineshop `
  -p 5432:5432 `
  -d postgres:16
```

### Run Schema
```powershell
# Copy schema to container
docker cp backend/database/schema.sql onlineshop-db:/schema.sql

# Execute schema
docker exec -i onlineshop-db psql -U postgres -d onlineshop -f /schema.sql
```

### .env Configuration
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/onlineshop
```

---

## Alternative: Use Cloud Database (Free Tier)

### Option 1: Render PostgreSQL (Free)
1. Sign up: https://render.com
2. Create PostgreSQL database
3. Get connection string
4. Use in DATABASE_URL

### Option 2: Railway PostgreSQL (Free)
1. Sign up: https://railway.app
2. Create PostgreSQL database
3. Get connection string
4. Use in DATABASE_URL

### Option 3: Supabase (Free)
1. Sign up: https://supabase.com
2. Create project
3. Get connection string
4. Use in DATABASE_URL

---

## Quick Setup Script (PowerShell)

Save as `setup_db.ps1`:

```powershell
# Database setup script
$DB_NAME = "onlineshop"
$DB_USER = "postgres"
$DB_PASSWORD = Read-Host "Enter PostgreSQL password" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($DB_PASSWORD)
$PLAIN_PASSWORD = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

# Check if psql exists
$psqlPath = "C:\Program Files\PostgreSQL\16\bin\psql.exe"
if (-not (Test-Path $psqlPath)) {
    Write-Host "PostgreSQL not found. Please install PostgreSQL first."
    exit
}

# Set password in environment
$env:PGPASSWORD = $PLAIN_PASSWORD

# Create database
Write-Host "Creating database..."
& $psqlPath -U $DB_USER -c "CREATE DATABASE $DB_NAME;" 2>&1 | Out-Null

# Run schema
Write-Host "Running schema..."
& $psqlPath -U $DB_USER -d $DB_NAME -f "backend\database\schema.sql"

# Clear password
$env:PGPASSWORD = ""

Write-Host "Database setup complete!"
Write-Host "Update backend/.env with: DATABASE_URL=postgresql://$DB_USER`:$PLAIN_PASSWORD@localhost:5432/$DB_NAME"
```

---

## Troubleshooting

### "psql is not recognized"
- PostgreSQL not installed, or
- Not in PATH
- Solution: Add PostgreSQL bin to PATH, or use full path

### "Connection refused"
- PostgreSQL service not running
- Solution: Start PostgreSQL service

### "Password authentication failed"
- Wrong password
- Solution: Check password in .env file

### "Database already exists"
- Database already created
- Solution: Skip creation, or drop and recreate

### "Permission denied"
- User doesn't have permissions
- Solution: Use postgres superuser

---

## Next Steps After Database Setup

1. ✅ Database created
2. ✅ Schema applied
3. ✅ .env configured
4. ⏭️ Test backend connection
5. ⏭️ Start backend server
6. ⏭️ Test API endpoints

---

## Test Database Connection

```powershell
cd backend
node -e "import('./config/database.js').then(m => m.default.query('SELECT NOW()').then(r => console.log('Connected!', r.rows[0])))"
```

Or start backend and check logs:
```powershell
cd backend
npm run dev
# Should see: "✅ Database connected"
```

---

**Need help?** Check:
- `backend/database/setup.md` - Detailed setup guide
- `backend/README.md` - Backend documentation
- PostgreSQL docs: https://www.postgresql.org/docs/

