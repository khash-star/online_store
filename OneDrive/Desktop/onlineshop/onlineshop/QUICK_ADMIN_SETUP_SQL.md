# Admin User Засах (SQL) - Хамгийн Хурдан Арга

## 🔴 Асуудал:

Backend dependencies суулгаагүй тул Node.js script ажиллахгүй байна.

---

## ✅ Засах (SQL) - Хамгийн Хурдан:

Backend script-ийн оронд **SQL ашиглах** нь хурдан.

### pgAdmin 4 эсвэл psql ашиглах:

#### Арга 1: pgAdmin 4

1. **pgAdmin 4 нээх**
2. **Query Tool нээх** (Tools → Query Tool)
3. **Энэ SQL-ийг ажиллуулах:**

```sql
-- Admin user-ийг шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';

-- Хэрэв user байгаа бол admin эрх өгөх
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

-- Хэрэв user байхгүй бол үүсгэх (password: admin123)
-- (Password hash-ийг backend-ээс авах хэрэгтэй, гэхдээ одоогоор register хийх нь илүү хялбар)
```

#### Арга 2: psql (Command Line)

```powershell
# PostgreSQL руу холбогдох
psql -U postgres -d onlineshop

# SQL ажиллуулах
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

# Шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';

# Гарах
\q
```

---

## 🎯 Илүү Хурдан Арга: Login Page Ашиглах

1. **Login page руу очих:** `http://localhost:5173/Login`
2. **Register хийх:**
   - Email: `khashpay@gmail.com`
   - Password: (өөрийн password)
3. **pgAdmin/psql ашиглаад admin эрх өгөх:**
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';
   ```
4. **Browser refresh:** Ctrl+Shift+R
5. **Login хийх:** `khashpay@gmail.com`-аар нэвтрэх

---

## ✅ Хүлээгдэж буй Үр дүн:

- ✅ `khashpay@gmail.com` user-д `role = 'admin'` байх ёстой
- ✅ Login хийсний дараа `user?.role === "admin"` байх ёстой
- ✅ PromoAdmin page дээр бүх функц ажиллана

---

## 📝 Дэлгэрэнгүй:

- Backend dependencies суулгах: `FIX_BACKEND_DEPENDENCIES.md`
- Login заавар: `QUICK_FIX_LOGIN_NOW.md`

