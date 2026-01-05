# Админ Удирдлага Бүгд Ажиллахгүй - 403 Forbidden Засах

## 🔴 Асуудал:

Админ удирдлага бүх функц ажиллахгүй байна - 403 Forbidden алдаа гарч байна.

**Шалтгаан:** Admin эрхгүй user-аар нэвтэрсэн байна.

---

## ✅ Засах (Хамгийн хурдан арга):

### 1. Browser Console дээр шалгах (F12):

```javascript
// User мэдээлэл харах
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user?.role);

// Token харах
const token = localStorage.getItem('token');
console.log('Token:', token ? 'Байна ✅' : 'Байхгүй ❌');
```

**Хэрэв `role !== "admin"` байвал:**

---

### 2. Logout хийх:

1. Profile page руу очих: `http://localhost:5173/Profile`
2. "Системээс гарах" товч дарах
3. Эсвэл Browser Console дээр:
   ```javascript
   localStorage.removeItem('user');
   localStorage.removeItem('token');
   location.reload();
   ```

---

### 3. Admin user-аар нэвтрэх:

1. Login page руу очих: `http://localhost:5173/Login`
2. **Email:** `khashpay@gmail.com`
3. **Password:** (өмнө үүсгэсэн password)

---

### 4. Browser refresh хийх:

- **Ctrl+Shift+R** (hard refresh)
- Эсвэл **F5**

---

### 5. Шалгах:

Browser Console дээр дахин:

```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('Role:', user?.role); // "admin" байх ёстой ✅
```

---

## 🔧 Хэрэв Admin User байхгүй бол:

### Арга 1: SQL ашиглах (pgAdmin 4 эсвэл psql):

```sql
-- Admin user үүсгэх эсвэл засах
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

-- Эсвэл шинэ admin user үүсгэх:
INSERT INTO users (id, email, password_hash, role, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'khashpay@gmail.com',
  '$2b$10$...', -- bcrypt hash (password хэшлэх хэрэгтэй)
  'admin',
  NOW(),
  NOW()
);
```

---

### Арга 2: Backend Script ашиглах:

```powershell
cd backend
node scripts/create-admin.js
```

Эсвэл SQL файл:

```powershell
psql -U postgres -d onlineshop -f backend/scripts/create-admin.sql
```

---

## 📝 Дараагийн алхам:

1. ✅ Logout хийх
2. ✅ Admin user-аар нэвтрэх (`khashpay@gmail.com`)
3. ✅ Browser refresh (Ctrl+Shift+R)
4. ✅ PromoAdmin page шалгах:
   - Бараа нэмэх/засах/устгах
   - Зар нэмэх
   - Онцлох бараа нэмэх
   - Бусад функцүүд

---

## 🎯 Хүлээгдэж буй үр дүн:

- ✅ Бүх admin функцүүд ажиллана
- ✅ 403 Forbidden алдаа алга болно
- ✅ Бараа, Зар, Онцлох бараа нэмэх/засах/устгах ажиллана

---

## ⚠️ Анхаарах зүйлс:

- **Backend server ажиллаж байх ёстой:** `cd backend && npm run dev`
- **Admin user байх ёстой:** `khashpay@gmail.com` email-тэй user-д `role = 'admin'`
- **Token зөв байх ёстой:** Login хийсний дараа token localStorage-д хадгалагдана

