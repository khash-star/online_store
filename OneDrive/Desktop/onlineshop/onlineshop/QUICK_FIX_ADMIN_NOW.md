# Админ Ажиллахгүй - Хурдан Засах

## ⚡ Хурдан Арга (30 секунд):

### 1. Browser Console (F12) дээр:

```javascript
// Шалгах
const user = JSON.parse(localStorage.getItem('user'));
console.log('Role:', user?.role);

// Хэрэв role !== "admin" бол:
localStorage.removeItem('user');
localStorage.removeItem('token');
location.href = '/Login';
```

### 2. Login page дээр:

- **Email:** `khashpay@gmail.com`
- **Password:** (өмнө үүсгэсэн password)

### 3. Дараа нь:

- PromoAdmin page руу очих
- Бараа, Зар нэмэх оролдлого хийх

---

## 🔧 Хэрэв Admin User байхгүй бол:

### SQL ашиглах (pgAdmin 4 эсвэл psql):

```sql
-- 1. User шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';

-- 2. Admin эрх өгөх
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

-- 3. Шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';
```

**Дараа нь:**
1. Browser дээр logout хийх
2. Дахин login хийх
3. Browser refresh (Ctrl+Shift+R)

---

## ✅ Шалгах:

Browser Console дээр:

```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('Role:', user?.role); // "admin" байх ёстой ✅
```

---

## 🎯 Хүлээгдэж буй үр дүн:

- ✅ 403 алдаа алга болно
- ✅ Бараа нэмэх/засах/устгах ажиллана
- ✅ Зар нэмэх ажиллана
- ✅ Бүх admin функц ажиллана

