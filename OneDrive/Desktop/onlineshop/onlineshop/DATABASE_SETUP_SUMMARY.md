# Database Setup - Summary

## 📊 Current Status

✅ **Schema file created**: `backend/database/schema.sql`
⚠️ **PostgreSQL**: Not installed or not in PATH
❌ **Database**: Not created yet
❌ **.env file**: Not created yet

---

## 🚀 Quick Start Options

### Option 1: Docker (EASIEST) ⭐ Recommended

```powershell
# 1. Install Docker Desktop (if not installed)
# Download: https://www.docker.com/products/docker-desktop/

# 2. Run PostgreSQL
docker run --name onlineshop-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=onlineshop -p 5432:5432 -d postgres:16

# 3. Wait a few seconds, then run schema
Start-Sleep -Seconds 5
docker exec -i onlineshop-db psql -U postgres -d onlineshop -f - < backend/database/schema.sql

# 4. Create .env file
cd backend
@"
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/onlineshop
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
"@ | Out-File -Encoding utf8 .env
```

### Option 2: Install PostgreSQL

1. **Download & Install**: https://www.postgresql.org/download/windows/
2. **Create database**:
   ```powershell
   psql -U postgres
   CREATE DATABASE onlineshop;
   \q
   ```
3. **Run schema**:
   ```powershell
   cd backend
   psql -U postgres -d onlineshop -f database/schema.sql
   ```
4. **Create .env** (see Option 1 step 4, but change password)

### Option 3: Cloud Database (Free Tier)

Use Render/Railway/Supabase free PostgreSQL:
1. Create database
2. Get connection string
3. Use in `.env` DATABASE_URL

---

## ✅ Verification

After setup, test connection:

```powershell
cd backend
npm run dev
# Should see: "✅ Database connected"
```

---

## 📚 Detailed Guides

- **Quick Guide**: `DATABASE_SETUP_QUICK.md`
- **Full Guide**: `DATABASE_SETUP_GUIDE.md`
- **Backend Setup**: `backend/database/setup.md`

---

**Next Step**: Choose an option above and set up database! 🎯

