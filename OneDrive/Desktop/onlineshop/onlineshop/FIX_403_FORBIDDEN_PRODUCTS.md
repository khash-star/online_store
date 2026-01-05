# 403 Forbidden Алдаа Засах (Products API)

## 🔍 Асуудал:

Console-д `POST /api/products 403 (Forbidden)` алдаа гарч байна.

Энэ нь:
- User нэвтэрч байгаа ч **admin эрхгүй** байгаа эсвэл
- Backend дээр admin middleware зөв ажиллахгүй байгаа эсвэл
- Token зөв дамжуулаагүй байгаа

---

## ✅ Шалгах зүйлс:

### 1. Admin User эсэхийг шалгах:

Browser console дээр:
```javascript
// LocalStorage-аас user мэдээлэл харах
JSON.parse(localStorage.getItem('user'))
```

Эсвэл Profile page дээр ороод "Эрх" хэсэг шалгах (Admin эсэхийг).

**Admin user байх ёстой:**
- Email: `khashpay@gmail.com`
- Role: `admin`

### 2. Token байгаа эсэхийг шалгах:

Browser console дээр:
```javascript
localStorage.getItem('token')
```

Token байх ёстой.

### 3. Backend server ажиллаж байгаа эсэхийг шалгах:

```powershell
cd backend
npm run dev
```

### 4. Backend admin middleware шалгах:

Backend code workspace-д олдохгүй байна. Backend routes дээр admin middleware зөв ажиллаж байгаа эсэхийг шалгах хэрэгтэй.

---

## 🔧 Шийдэл:

### 1. Admin user-аар нэвтрэх:

1. Logout хийх (одоогийн user-аас)
2. Login page руу очих: `http://localhost:5173/Login`
3. Admin user-аар нэвтрэх:
   - Email: `khashpay@gmail.com`
   - Password: (өмнө үүсгэсэн password)

### 2. Admin user үүсгэх (хэрэв байхгүй бол):

Backend terminal дээр:
```powershell
cd backend
node scripts/create-admin.js
```

Эсвэл SQL:
```sql
-- pgAdmin эсвэл psql ашиглах
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';
```

### 3. Backend middleware шалгах:

Backend code workspace-д олдохгүй байна. Backend routes дээр:
- Admin middleware зөв ажиллаж байгаа эсэхийг
- Token-ийг зөв validate хийж байгаа эсэхийг
- Role-ийг зөв шалгаж байгаа эсэхийг

шалгах хэрэгтэй.

---

## 📝 Дараагийн алхам:

1. **Browser console дээр user мэдээлэл шалгах:**
   ```javascript
   JSON.parse(localStorage.getItem('user'))
   ```
   - `role: "admin"` байх ёстой

2. **Admin user-аар нэвтрэх:**
   - Logout хийх
   - `khashpay@gmail.com` ашиглаж нэвтрэх

3. **Browser refresh хийх** (Ctrl+Shift+R)

4. **Бараа нэмэх оролдлого хийх:**
   - PromoAdmin page: `http://localhost:5173/PromoAdmin`
   - "Бараа" tab
   - "Бараа нэмэх" товч

403 алдаа алга болох ёстой!

---

## ⚠️ Анхаарах зүйлс:

- Products API нь зөвхөн admin user-д зориулагдсан
- Backend дээр admin middleware зөв ажиллах ёстой
- Token зөв дамжуулагдаж байх ёстой

