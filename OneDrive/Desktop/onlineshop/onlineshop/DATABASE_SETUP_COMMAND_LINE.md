# Database Setup - Command Line (Alternative)

## 💻 Command Line-ээр Database Үүсгэх

pgAdmin-ийн оронд command line ашиглаж болно:

---

## Step 1: PostgreSQL Path Тохируулах

```powershell
# Path нэмэх (хэрэв command олдохгүй бол)
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"
```

Эсвэл full path ашиглах:
```powershell
& "C:\Program Files\PostgreSQL\16\bin\psql.exe"
```

---

## Step 2: Database Үүсгэх

```powershell
# PostgreSQL-д холбогдох
psql -U postgres

# Password оруулах (далдалсан байна)

# Database үүсгэх
CREATE DATABASE onlineshop;

# Database list-ийг шалгах
\l

# onlineshop database харагдах ёстой

# Гарах
\q
```

---

## Step 3: Schema Ажиллуулах

```powershell
# Schema файлыг execute хийх
cd backend
psql -U postgres -d onlineshop -f database/schema.sql
```

**Password асуувал**: PostgreSQL password оруулах

---

## Step 4: Verify

```powershell
# Database-д холбогдох
psql -U postgres -d onlineshop

# Tables list харах
\dt

# 12 tables харагдах ёстой

# Гарах
\q
```

---

## Step 5: .env Файл

`backend/.env` файл үүсгэх:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/onlineshop
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
```

---

**Command line нь pgAdmin-аас хурдан!** ⚡

