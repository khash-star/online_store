# 403 Forbidden - Register Хийсний Дараа Засах

## 🔴 Асуудал:

Console дээр:
- `POST /api/promos 403 (Forbidden)` алдаа
- `user?.role` нь `undefined`

**Энэ нь register хийсэн боловч:**
1. ✅ Login хийгээгүй байна
2. ✅ Database-д admin role өгөөгүй байна

---

## ✅ Засах Алхмууд:

### 1. Login Хийх (Register Хийсний Дараа)

1. **Browser дээр Login page руу очих:** `http://localhost:5173/Login`
2. **Email:** `khashpay@gmail.com`
3. **Password:** (register хийхэд оруулсан password)
4. **"Нэвтрэх" товч дарх**

**Хүлээгдэж буй үр дүн:**
- Network tab дээр `/login` request нь **200 OK** байх ёстой (401 биш!)
- Console дээр 401/403 алдаа алга болох ёстой

### 2. Database-д Admin Role Өгөх

pgAdmin 4 эсвэл psql:

```sql
-- User-ийг шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';

-- Admin role өгөх
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

-- Шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';
-- role = 'admin' байх ёстой ✅
```

### 3. Logout → Login (Admin Role Шинэчлэх)

1. **Browser дээр logout хийх** (хэрэв login хийсэн бол)
2. **Browser refresh:** Ctrl+Shift+R
3. **Login хийх:** `khashpay@gmail.com` + password
4. **Console дээр шалгах:**

```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user?.role); // "admin" байх ёстой ✅
```

---

## 🎯 Хүлээгдэж буй Үр дүн:

1. ✅ Login амжилттай: Network tab дээр `/login` → 200 OK
2. ✅ Database-д: `role = 'admin'`
3. ✅ Console дээр: `user?.role === "admin"`
4. ✅ 403 Forbidden алдаа алга болно
5. ✅ PromoAdmin page дээр: Бүх функц ажиллана

---

## ⚠️ Анхаарах зүйлс:

- **Register хийсний дараа login хийх хэрэгтэй!** Register хийх нь зөвхөн user үүсгэх, login хийх нь token авах.
- **Database-д admin role өгөх хэрэгтэй!** Register хийхэд анхдагч role нь `"user"` байна.
- **Login хийсний дараа browser refresh хийх:** localStorage дээр user object шинэчлэгдэнэ.

