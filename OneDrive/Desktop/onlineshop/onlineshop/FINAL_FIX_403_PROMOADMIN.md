# 403 Forbidden - PromoAdmin Page Засах (Эцсийн Заавар)

## 🔴 Асуудал:

PromoAdmin page дээр:
- ✅ Бүх 8 таб харагдаж байна (Бараа, Зар, Онцлох, Хэрэглэгч, Хайлт, Үзэлт, Мессеж, Холбоо)
- ❌ `POST /api/promos 403 (Forbidden)` алдаа
- ❌ Бүх admin функц ажиллахгүй

**Энэ нь admin user-аар login хийгээгүй эсвэл database-д admin role өгөөгүй гэсэн үг!**

---

## ✅ Засах (3 Алхам):

### Алхам 1: Database-д Admin Role Шалгах/Өгөх

pgAdmin 4 эсвэл psql ашиглах:

```sql
-- User-ийг шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';

-- Хэрэв user байхгүй бол register хийх хэрэгтэй
-- Хэрэв user байгаа боловч role != 'admin' бол:

-- Admin role өгөх
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

-- Шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';
-- role = 'admin' байх ёстой ✅
```

### Алхам 2: Browser дээр Logout → Login

1. **Browser дээр logout хийх** (хэрэв login хийсэн бол)
   - Profile page руу очиж logout товч дарх
   - Эсвэл Console дээр: `localStorage.clear()`

2. **Browser refresh:** Ctrl+Shift+R (эсвэл F5)

3. **Login хийх:**
   - Browser: `http://localhost:5173/Login`
   - Email: `khashpay@gmail.com`
   - Password: (өөрийн password)
   - "Нэвтрэх" товч дарх

### Алхам 3: Console дээр Шалгах

Browser Console (F12) дээр:

```javascript
// User object шалгах
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user?.role); // "admin" байх ёстой ✅

// Хэрэв role === "admin" бол:
// ✅ Бүх admin функц ажиллана!
// ✅ 403 Forbidden алдаа алга болно!
```

---

## 🎯 Хүлээгдэж буй Үр дүн:

1. ✅ Database-д: `role = 'admin'`
2. ✅ Login амжилттай: Network tab дээр `/login` → 200 OK
3. ✅ Console дээр: `user?.role === "admin"`
4. ✅ PromoAdmin page дээр:
   - ✅ Бүх таб ажиллана
   - ✅ Зар нэмэх ажиллана
   - ✅ Бараа нэмэх/засах/устгах ажиллана
   - ✅ 403 Forbidden алдаа алга болно

---

## ⚠️ Анхаарах зүйлс:

- **Backend server ажиллаж байх ёстой:** `cd backend && npm run dev`
- **Database-д admin role өгсний дараа logout → login хийх:** localStorage дээр user object шинэчлэгдэнэ
- **Password зөв байх ёстой:** Login хийхэд 401 алдаа гарахгүй

---

## 🔍 Хэрэв Асуудал Шийдэгдэхгүй Бол:

1. **Backend server ажиллаж байгаа эсэхийг шалгах:** `http://localhost:3000/api/health`
2. **Database connection шалгах:** Backend console дээр алдаа байгаа эсэхийг шалгах
3. **Browser cache цэвэрлэх:** Ctrl+Shift+Delete
4. **LocalStorage цэвэрлэх:** Console дээр `localStorage.clear()`

