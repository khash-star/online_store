# Database Setup - Quick Guide

## 🚀 Fastest Way: Docker (Recommended)

### 1. Install Docker Desktop
Download: https://www.docker.com/products/docker-desktop/

### 2. Run PostgreSQL Container
```powershell
docker run --name onlineshop-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=onlineshop -p 5432:5432 -d postgres:16
```

### 3. Run Schema
```powershell
# Wait a few seconds for container to start
Start-Sleep -Seconds 5

# Copy and execute schema
docker exec -i onlineshop-db psql -U postgres -d onlineshop -f - < backend/database/schema.sql
```

### 4. Create .env file
```powershell
cd backend
@"
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/onlineshop
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
"@ | Out-File -Encoding utf8 .env
```

### 5. Test Connection
```powershell
cd backend
npm run dev
```

---

## 📋 Manual Setup (PostgreSQL)

### 1. Install PostgreSQL
Download: https://www.postgresql.org/download/windows/

### 2. Create Database
```powershell
psql -U postgres
CREATE DATABASE onlineshop;
\q
```

### 3. Run Schema
```powershell
cd backend
psql -U postgres -d onlineshop -f database/schema.sql
```

### 4. Create .env file
Create `backend/.env`:
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/onlineshop
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

---

## ✅ Verify Setup

```powershell
cd backend
npm run dev
# Should see: "✅ Database connected"
```

---

**Done!** Database is ready. 🎉

