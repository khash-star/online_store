# Database Үүсгэх - Алхам алхмаар

## 🎯 Database үүсгэх 2 арга

### Арга 1: pgAdmin 4 (Хамгийн Хялбар) ⭐

1. **pgAdmin 4 нээх**
2. **Left pane-д "Local PostgreSQL" expand хийх:**
   - "Databases" харагдана

3. **"Databases" дээр right click:**
   - "Create" → "Database..."

4. **Database Properties:**
   - **Database name**: `onlineshop`
   - **Owner**: `postgres` (default)
   - Бусад settings default-оор үлдээх

5. **"Save"** товч дар

6. ✅ **Database үүсгэгдсэн!**
   - "Databases" доор "onlineshop" харагдана

---

### Арга 2: Command Line (SQL)

PostgreSQL path олсон бол:

```powershell
# PostgreSQL path нэмэх (version-оос хамаарна)
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"
# Эсвэл
$env:Path += ";C:\Program Files\PostgreSQL\15\bin"
# Эсвэл өөрийн path

# Database үүсгэх (password асууна)
psql -U postgres -c "CREATE DATABASE onlineshop;"
```

**Эсвэл interactive:**

```powershell
psql -U postgres

# Password оруулах

# Database үүсгэх
CREATE DATABASE onlineshop;

# Verify
\l

# Гарах
\q
```

---

## ✅ Database үүсгэсний дараа

1. ✅ Database: `onlineshop` үүсгэгдсэн
2. ⏭️ Schema ажиллуулах: `backend/database/schema.sql`
3. ⏭️ .env файл үүсгэх
4. ⏭️ Backend test хийх

---

## 📝 Schema Ажиллуулах (pgAdmin 4)

Database үүсгэсний дараа:

1. **"onlineshop" database дээр right click**
2. **"Query Tool" сонго**
3. **File → Open File**
4. **`backend/database/schema.sql` сонго**
5. **F5 дар (Execute)**
6. ✅ **Schema ажилттай ажилласан!**

---

**pgAdmin 4 ашиглах нь хамгийн хялбар!** 🎯

