# 401 Login Error - Засах

## 🔴 Асуудал:

Console дээр:
- `POST http://localhost:3000/api/auth/login 401 (Unauthorized)` алдаа
- `user?.role` нь `undefined`

**Энэ нь login амжилтгүй болсон гэсэн үг!**

---

## ✅ Засах Алхмууд:

### 1. Database-д User Байгаа Эсэхийг Шалгах

pgAdmin 4 эсвэл psql ашиглах:

```sql
-- User-ийг хайх
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';
```

**Хэрэв user байхгүй бол:**

#### Сонголт A: Register хийх (Хамгийн хурдан)

1. Browser дээр Login page руу очих: `http://localhost:5173/Login`
2. **"Бүртгүүлэх" таб дээр:**
   - Email: `khashpay@gmail.com`
   - Password: (өөрийн password)
   - Full Name: (нэрийг оруулах)
3. **"Бүртгүүлэх" товч дарх**
4. **pgAdmin/psql ашиглаад admin эрх өгөх:**
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';
   ```
5. **Browser refresh:** Ctrl+Shift+R
6. **Login хийх:** `khashpay@gmail.com`-аар нэвтрэх

#### Сонголт B: SQL-ээр User Үүсгэх (Password hash хэрэгтэй)

```sql
-- Password hash-ийг backend-ээс авах хэрэгтэй (хэцүү)
-- Тиймээс Register хийх нь илүү хялбар!
```

### 2. Хэрэв User Байгаа Боловч Password Буруу Бол:

1. **pgAdmin/psql ашиглаад password reset хийх** (хэцүү - password hash хэрэгтэй)
2. **Эсвэл шинэ user register хийх**

### 3. Login Хийх (User Байгаа Бол):

1. Browser дээр Login page руу очих: `http://localhost:5173/Login`
2. Email: `khashpay@gmail.com`
3. Password: (өмнө үүсгэсэн password)
4. **"Нэвтрэх" товч дарх**

**Хэрэв login амжилттай бол:**
- Network tab дээр `/login` request нь 200 OK байх ёстой
- Console дээр 401 алдаа алга болох ёстой

### 4. Admin Role Шалгах

pgAdmin/psql:

```sql
-- Role шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';

-- Хэрэв role != 'admin' бол admin эрх өгөх
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

-- Шалгах
SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';
```

### 5. Browser Refresh → Login → Console Шалгах

1. **Browser refresh:** Ctrl+Shift+R
2. **Logout хийх** (хэрэв login хийсэн бол)
3. **Login хийх:** `khashpay@gmail.com`
4. **Console дээр шалгах:**

```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user?.role); // "admin" байх ёстой ✅
```

---

## 🎯 Хүлээгдэж буй Үр дүн:

1. ✅ Database-д user байна: `email = 'khashpay@gmail.com'`
2. ✅ Login амжилттай: Network tab дээр `/login` → 200 OK
3. ✅ Admin role: `role = 'admin'`
4. ✅ Console дээр: `user?.role === "admin"`
5. ✅ PromoAdmin page дээр: Бүх функц ажиллана

---

## ⚠️ Анхаарах зүйлс:

- **Backend server ажиллаж байх ёстой:** `cd backend && npm run dev`
- **Password зөв байх ёстой:** Login хийхэд 401 алдаа гарахгүй
- **Database-д user байх ёстой:** Register хийх эсвэл SQL-ээр үүсгэх

