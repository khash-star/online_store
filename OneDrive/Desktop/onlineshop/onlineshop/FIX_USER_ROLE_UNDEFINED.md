# User Role Undefined - Засах

## 🔴 Асуудал:

Browser Console дээр:
```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('Role:', user?.role); // undefined
```

Энэ нь:
- localStorage дээр user байхгүй байна
- Эсвэл user object дээр role талбар байхгүй байна

---

## ✅ Засах:

### Арга 1: Login хийх (Хамгийн хурдан)

1. **Login page руу очих:**
   - `http://localhost:5173/Login`

2. **Admin user-аар нэвтрэх:**
   - Email: `khashpay@gmail.com`
   - Password: (өмнө үүсгэсэн password)

3. **Browser refresh хийх:** Ctrl+Shift+R

4. **Шалгах:**
   ```javascript
   const user = JSON.parse(localStorage.getItem('user'));
   console.log('User:', user);
   console.log('Role:', user?.role); // "admin" байх ёстой
   ```

---

### Арга 2: Admin User үүсгэх/засах (SQL)

pgAdmin 4 эсвэл psql ашиглах:

```sql
-- 1. User байгаа эсэхийг шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';

-- 2. Хэрэв user байхгүй бол үүсгэх
INSERT INTO users (id, email, password_hash, role, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'khashpay@gmail.com',
  '$2b$10$...', -- bcrypt hash (password хэшлэх хэрэгтэй)
  'admin',
  NOW(),
  NOW()
);

-- 3. Хэрэв user байгаа бол admin эрх өгөх
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

-- 4. Шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';
```

**Дараа нь:**
1. Browser дээр logout/login хийх
2. Browser refresh хийх

---

### Арга 3: Backend Script ашиглах

```powershell
cd backend
node scripts/create-admin.js
```

---

## 🔍 Шалгах:

Browser Console дээр:

```javascript
// User мэдээлэл
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user?.role); // "admin" байх ёстой ✅

// Token
const token = localStorage.getItem('token');
console.log('Token:', token ? 'Байна ✅' : 'Байхгүй ❌');
```

---

## ⚠️ Анхаарах зүйлс:

- **Backend server ажиллаж байх ёстой:** `cd backend && npm run dev`
- **Login хийсний дараа** localStorage дээр user хадгалагдана
- **Admin user байх ёстой:** `khashpay@gmail.com` email-тэй user-д `role = 'admin'`

---

## 🎯 Хүлээгдэж буй үр дүн:

- ✅ `user?.role === "admin"` байх ёстой
- ✅ PromoAdmin page дээр бүх функц ажиллана
- ✅ 403 Forbidden алдаа алга болно

