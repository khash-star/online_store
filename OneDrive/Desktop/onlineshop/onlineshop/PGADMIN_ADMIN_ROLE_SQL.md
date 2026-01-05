# pgAdmin 4 - Admin Role Өгөх SQL

## ✅ Query Editor дээр Энэ SQL-ийг Ажиллуулах:

### 1. User-ийг Шалгах:

```sql
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';
```

**Хүлээгдэж буй үр дүн:**
- Хэрэв user байгаа бол: `id`, `email`, `role` талбарууд харагдана
- Хэрэв user байхгүй бол: Хоосон үр дүн (0 rows)

---

### 2. Admin Role Өгөх:

**Хэрэв user байгаа бол:**

```sql
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';
```

**Хэрэв user байхгүй бол:**

Эхлээд register хийх хэрэгтэй (Browser дээр Login page-аас register хийх).

---

### 3. Шалгах:

```sql
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';
```

**Хүлээгдэж буй үр дүн:**
- `role = 'admin'` байх ёстой ✅

---

## 🎯 Бүх SQL Командууд (Дарааллаар):

```sql
-- 1. User-ийг шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';

-- 2. Admin role өгөх (хэрэв user байгаа бол)
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

-- 3. Шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';
```

---

## 📝 Query Editor-д Ажиллуулах Арга:

1. **SQL командыг Query editor-д бичих**
2. **Execute button дарх** (▶️ icon, эсвэл F5)
3. **"Messages" tab-д үр дүн харагдана:**
   - `UPDATE 1` → Амжилттай ✅
   - `UPDATE 0` → User олдсонгүй ❌
4. **Шалгах query-ийг ажиллуулах**

---

## ⚠️ Анхаарах зүйлс:

- **User байхгүй бол:** Эхлээд Browser дээр register хийх (`http://localhost:5173/Login`)
- **SQL-ийг нэг нэгээр нь ажиллуулах:** Эсвэл бүгдийг нь сонгож ажиллуулах
- **Database зөв сонгогдсон эсэхийг шалгах:** Object Explorer-д "onlineshop" database сонгогдсон байх ёстой

