# password_hash Column Алдаа - Засах

## 🔴 Асуудал:

```
ERROR: column "password_hash" of relation "users" does not exist
SQL state: 42703
```

**Энэ нь users table-д `password_hash` column байхгүй гэсэн үг!**

---

## ✅ Засах:

### 1. Users Table Schema Шалгах

pgAdmin 4 дээр:

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

### 2. Column Нэрийг Шалгах

Магадгүй column нэр нь:
- `password` (эсвэл `password_hash` байхгүй)
- `password_hash` (байхгүй)

---

### 3. SQL Script Засах

Хэрэв column нэр өөр байвал `sample_data_all_tables.sql` файлыг засах хэрэгтэй.

**Хэрэв `password` column байвал:**

```sql
INSERT INTO users (id, email, password, role, full_name, created_at, updated_at)
VALUES 
    ...
```

**Хэрэв column огт байхгүй бол:**

Users table-д password column-ийг нэмэх эсвэл SQL script-ээс password column-ийг хасах хэрэгтэй.

---

## 🔍 Хамгийн Хурдан Засах:

### Сонголт 1: Password Column Хэсгийг Хасах

SQL script-ээс users INSERT-ийг засах:

```sql
-- Password column-гүйгээр
INSERT INTO users (id, email, role, full_name, created_at, updated_at)
VALUES 
    (gen_random_uuid(), 'admin@example.com', 'admin', 'Админ Хэрэглэгч', NOW(), NOW()),
    ...
```

**Эсвэл password column-ийг NULL хийх:**

```sql
INSERT INTO users (id, email, password_hash, role, full_name, created_at, updated_at)
VALUES 
    (gen_random_uuid(), 'admin@example.com', NULL, 'admin', 'Админ Хэрэглэгч', NOW(), NOW()),
    ...
```

---

## 📝 Дэлгэрэнгүй:

1. **pgAdmin 4-д users table-ийн columns-ийг шалгах**
2. **Column нэрийг тодорхойлох**
3. **SQL script-ийг засах**

