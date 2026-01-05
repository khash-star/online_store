# Admin Role Шалгах - Засах

## 🔴 Асуудал:

"Admin хэрэглэгч 2-г ялгахгүй байна" - Энэ нь login хийсний дараа user object-д `role` талбар буцаахгүй эсвэл backend-д admin role шалгалт зөв хийгдэхгүй байна гэсэн үг.

---

## ✅ Засах Алхмууд:

### 1. Console дээр User Object Шалгах

Browser Console (F12) дээр:

```javascript
// User object-ийг харах
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user?.role);

// Хүлээгдэж буй үр дүн:
// User: { id: "...", email: "khashpay@gmail.com", role: "admin", ... }
// Role: "admin"
```

**Хэрэв `role` талбар байхгүй эсвэл `undefined` бол:**

### 2. Database-д Admin Role Шалгах

pgAdmin 4 эсвэл psql ашиглах:

```sql
-- User-ийг шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';

-- Хүлээгдэж буй үр дүн:
-- role = "admin" байх ёстой
```

**Хэрэв `role` талбар `NULL` эсвэл `"user"` бол:**

```sql
-- Admin эрх өгөх
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

-- Шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';
```

### 3. Logout → Login хийх

1. **Browser дээр logout хийх** (хэрэв login хийсэн бол)
2. **Browser refresh:** Ctrl+Shift+R
3. **Login хийх:**
   - Email: `khashpay@gmail.com`
   - Password: (өөрийн password)
4. **Console дээр дахин шалгах:**

```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('Role:', user?.role); // "admin" байх ёстой ✅
```

---

## 🎯 Backend-д Шалгах (Хэрэв Backend Code Байвал):

### Backend Login Endpoint-д:

Backend login endpoint-д user object буцаахдаа `role` талбар багтаах ёстой:

```javascript
// Backend login route-д
res.json({
  user: {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role, // ✅ Энэ талбар байх ёстой
    ...
  },
  token: token
});
```

### Backend Admin Middleware-д:

```javascript
// Admin middleware
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
```

---

## 📝 Frontend-д Шалгах:

### PromoAdmin.jsx файл дээр:

```javascript
// PromoAdmin.jsx-д
const { isAuthenticated, user } = useAuth();

// Query-ууд дээр admin check
enabled: isAuthenticated && user?.role === "admin"
```

**Энэ нь зөв байна!** Асуудал нь backend-аас `role` талбар буцаахгүй байгаа эсвэл database-д `role` талбар зөв тохируулаагүй байгаа.

---

## ✅ Хүлээгдэж буй Үр дүн:

1. ✅ Database-д: `role = 'admin'`
2. ✅ Login хийсний дараа: `user.role === 'admin'`
3. ✅ Console дээр: `user?.role === "admin"`
4. ✅ PromoAdmin page дээр: Бүх функц ажиллана

---

## ⚠️ Анхаарах зүйлс:

- **Backend server ажиллаж байх ёстой:** `cd backend && npm run dev`
- **Database-д `role` талбар байх ёстой:** `SELECT role FROM users WHERE email = '...'`
- **Login хийсний дараа user object-д `role` талбар байх ёстой**

