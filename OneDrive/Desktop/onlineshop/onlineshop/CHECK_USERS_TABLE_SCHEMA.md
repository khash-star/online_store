# Users Table Schema Шалгах

## 🔴 Асуудал:

`password_hash` column байхгүй байна.

---

## ✅ Users Table Schema Шалгах:

### pgAdmin 4-д:

1. **"onlineshop" database expand хийх**
2. **"Schemas" → "public" → "Tables" → "users" дээр right click**
3. **"Properties" сонгох**
4. **"Columns" tab-д харах**

Эсвэл Query Tool-д:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;
```

---

## 📝 Хэрэв Password Column Байхгүй Бол:

Users table-д password column байхгүй бол sample data-д user оруулахгүй байх нь зөв.

**Хэрэв user хэрэгтэй бол:**
1. Browser дээр register хийх (`http://localhost:5173/Login`)
2. Эсвэл backend script ашиглах (`backend/scripts/create-admin.js`)

---

## ✅ Засах:

`sample_data_all_tables.sql` файлын users INSERT-ийг comment хийсэн (алгасна).

Одоо бусад 11 tables-ийн өгөгдөл оруулах болно.

