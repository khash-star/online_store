# 403 Forbidden Алдаа - Хурдан Засах

## ⚡ Хурдан Шалгах:

### Browser Console дээр (F12):

1. **Console tab нээх** (F12)
2. **Дараах командыг ажиллуулах:**

```javascript
// User мэдээлэл харах
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user?.role);

// Token харах
const token = localStorage.getItem('token');
console.log('Token:', token ? 'Байна ✅' : 'Байхгүй ❌');
```

### Шалгах:

- **`role: "admin"`** байх ёстой
- **Token** байх ёстой

---

## 🔧 Засах:

### Арга 1: Admin user-аар нэвтрэх (Хамгийн хурдан)

1. **Logout хийх:**
   - Profile page руу очих
   - "Системээс гарах" товч дарна

2. **Login page руу очих:**
   - `http://localhost:5173/Login`

3. **Admin user-аар нэвтрэх:**
   - Email: `khashpay@gmail.com`
   - Password: (өмнө үүсгэсэн password)

4. **Browser refresh хийх:** Ctrl+Shift+R

5. **PromoAdmin page руу очих:**
   - `http://localhost:5173/PromoAdmin`
   - "Бараа" tab
   - "Бараа нэмэх" товч

---

### Арга 2: Одоогийн user-д admin эрх өгөх (SQL)

pgAdmin 4 эсвэл psql ашиглах:

```sql
-- PostgreSQL-д нэвтрэх
-- pgAdmin: Servers > PostgreSQL > Databases > onlineshop > Query Tool

UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

-- Эсвэл өөр email-ийн хувьд:
-- UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

**Дараа нь:**
1. Browser дээр logout/login хийх (token шинэчлэгдэх үүднээс)
2. Browser refresh хийх

---

### Арга 3: Backend script ашиглах

Backend terminal дээр:

```powershell
cd backend
node scripts/create-admin.js
```

Эсвэл SQL файл ажиллуулах:

```powershell
psql -U postgres -d onlineshop -f scripts/create-admin.sql
```

---

## ✅ Шалгах:

Browser console дээр дахин:

```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('Role:', user?.role); // "admin" байх ёстой
```

Дараа нь бараа нэмэх оролдлого хийх - 403 алдаа алга болох ёстой!

---

## ⚠️ Анхаарах зүйлс:

- Products API нь **зөвхөн admin user-д** зориулагдсан
- Backend server ажиллаж байгаа эсэхийг шалгах (`cd backend && npm run dev`)
- Browser console дээр user мэдээлэл зөв эсэхийг шалгах

