# Database Setup - pgAdmin 4 Ашиглах

## ✅ PostgreSQL Холбогдсон

pgAdmin 4-д "Local PostgreSQL" server харагдаж байна. Одоо database үүсгэх хэрэгтэй!

---

## 📊 Step 1: Database Үүсгэх (pgAdmin 4)

### Арга 1: pgAdmin GUI-ээр

1. **Left pane-д "Local PostgreSQL" server-ийг expand хийх:**
   - "Local PostgreSQL" дээр дар (expand)
   - "Databases" харагдана

2. **"Databases" дээр right click:**
   - "Create" → "Database..."

3. **Database Properties:**
   - **Database name**: `onlineshop`
   - **Owner**: `postgres` (default)
   - **Encoding**: `UTF8` (default)
   - Бусад settings default-оор үлдээх

4. **"Save"** товч дар

5. ✅ Database үүсгэгдсэн! "Databases" доор "onlineshop" харагдана

---

### Арга 2: Query Tool-оор (SQL)

1. **Left pane-д "Local PostgreSQL" дээр right click:**
   - "Query Tool" сонго

2. **Query window-д SQL бичих:**
   ```sql
   CREATE DATABASE onlineshop;
   ```

3. **Execute (F5 эсвэл ⚡ icon)**

4. ✅ Database үүсгэгдсэн!

---

## 🔧 Step 2: Schema Ажиллуулах

### pgAdmin Query Tool-оор:

1. **"onlineshop" database-д холбогдох:**
   - Left pane-д "onlineshop" database-д дар
   - Right click → "Query Tool"

2. **Schema SQL файлыг нээх:**
   - File → Open File
   - `backend/database/schema.sql` файл сонго

3. **Execute:**
   - F5 дар эсвэл ⚡ Execute button дар
   - Эсвэл Ctrl+Enter

4. ✅ **Schema ажилттай ажилласан!**

5. **Verify:**
   - Left pane-д "onlineshop" database expand хийх
   - "Schemas" → "public" → "Tables"
   - Бүх tables харагдах ёстой:
     - users
     - products
     - orders
     - order_items
     - favorite_products
     - online_stores
     - messages
     - promo_messages
     - featured_products
     - search_queries
     - contact_info
     - deals

---

## 🧪 Step 3: Verify Database

### Tables-ийг шалгах:

1. **Left pane-д:**
   - "onlineshop" database expand
   - "Schemas" → "public" → "Tables"

2. **Tables list харагдана:**
   - 12 tables байх ёстой
   - Tables дээр дарвал columns харагдана

### Sample query:

Query Tool-д:
```sql
-- Tables-ийг list хийх
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Users table structure
\d users;
```

---

## ⚙️ Step 4: Backend .env Тохируулах

Backend-д `.env` файл үүсгэх хэрэгтэй:

1. **backend/.env файл үүсгэх**

2. **Энэ content-ийг оруулах:**
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/onlineshop
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:5173
   ```

3. **YOUR_PASSWORD-ийг солих:**
   - PostgreSQL суулгах явцад оруулсан password

---

## ✅ Step 5: Backend Test

```powershell
cd backend
npm run dev
```

**Амжилттай бол:**
```
✅ Database connected
🚀 Server running on http://localhost:3000
```

---

## 📋 Quick Summary

1. ✅ pgAdmin 4-д холбогдсон
2. ⏭️ Database үүсгэх: "onlineshop"
3. ⏭️ Schema ажиллуулах: `backend/database/schema.sql`
4. ⏭️ .env файл үүсгэх
5. ⏭️ Backend test хийх

---

**Database үүсгэсний дараа schema ажиллуулаад хэлээрэй!** 🚀

