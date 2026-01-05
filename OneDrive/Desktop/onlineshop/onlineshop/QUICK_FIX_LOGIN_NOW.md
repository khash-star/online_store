# 🔴 Ажиллахгүй байна - Засах (Хурдан)

## Асуудал:

Console дээр:
```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('Role:', user?.role); // undefined
```

**Энэ нь login хийгээгүй гэсэн үг!**

---

## ✅ Засах (2 минут):

### 1. Login Page руу очих

Browser дээр:
```
http://localhost:5173/Login
```

### 2. Admin User үүсгэх/засах

**Сонголт A: Backend Script (Хамгийн хурдан)**

```powershell
cd backend
node scripts/create-admin.js
```

**Сонголт B: SQL (pgAdmin 4 эсвэл psql)**

```sql
-- Хэрэв user байгаа бол admin эрх өгөх
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

-- Хэрэв user байхгүй бол үүсгэх (password: admin123)
-- (password hash хэрэгтэй - create-admin.js script ашиглах нь дээр)
```

### 3. Login хийх

1. **Email:** `khashpay@gmail.com`
2. **Password:** (өмнө үүсгэсэн password эсвэл script-аас гарсан temporary password)
3. **"Нэвтрэх" товч дарх**

### 4. Browser Refresh

```
Ctrl + Shift + R
```

### 5. Шалгах

Console дээр:
```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user?.role); // "admin" байх ёстой ✅
```

---

## 🎯 Хүлээгдэж буй үр дүн:

- ✅ `user?.role === "admin"` байх ёстой
- ✅ PromoAdmin page дээр бүх функц ажиллана
- ✅ 403 Forbidden алдаа алга болно
- ✅ Бараа, Зар, Онцлох гэх мэт бүх таб ажиллана

---

## ⚠️ Анхаарах зүйлс:

- **Backend server ажиллаж байх ёстой:**
  ```powershell
  cd backend
  npm run dev
  ```

- **Login хийсний дараа** localStorage дээр user хадгалагдана

- **Admin user байх ёстой:** `khashpay@gmail.com` email-тэй user-д `role = 'admin'`

