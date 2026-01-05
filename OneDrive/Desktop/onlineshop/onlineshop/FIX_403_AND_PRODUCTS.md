# 403 Forbidden болон Бараа Харагдахгүй Асуудал Засах

## 🔴 Асуудлууд:

1. **403 Forbidden алдаа** - Зар нэмэхэд admin эрх шаардлагатай
2. **Бараанууд харагдахгүй** - PromoAdmin page дээр бараанууд харагдахгүй байна

---

## ✅ Зассан зүйлс:

### 1. Query Key засварласан:

**Өмнө:**
```javascript
queryKey: ["all-products"]
```

**Одоо:**
```javascript
queryKey: ["products"]
```

Энэ нь ProductManagement компонент-тай тохирохын тулд.

---

## 🔧 403 Forbidden алдаа засах:

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

5. **PromoAdmin page шалгах:**
   - `http://localhost:5173/PromoAdmin`
   - "Бараа" tab - бараанууд харагдах ёстой
   - "Зар" tab - зар нэмэх ажиллах ёстой

---

### Арга 2: Одоогийн user-д admin эрх өгөх (SQL)

pgAdmin 4 эсвэл psql ашиглах:

```sql
-- PostgreSQL-д нэвтрэх
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';

-- Эсвэл одоогийн email-ийн хувьд:
-- UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

**Дараа нь:**
1. Browser дээр logout/login хийх (token шинэчлэгдэх үүднээс)
2. Browser refresh хийх

---

### Арга 3: Backend script ашиглах

```powershell
cd backend
node scripts/create-admin.js
```

---

## ✅ Шалгах:

### Browser Console дээр (F12):

```javascript
// User мэдээлэл харах
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user?.role); // "admin" байх ёстой

// Token харах
const token = localStorage.getItem('token');
console.log('Token:', token ? 'Байна ✅' : 'Байхгүй ❌');
```

---

## 📝 Дараагийн алхам:

1. ✅ Query key зассан (["all-products"] → ["products"])
2. ⚠️ Admin user-аар нэвтрэх (403 алдааг засах)
3. ✅ Browser refresh хийх
4. ✅ PromoAdmin page дээр бараанууд шалгах
5. ✅ Зар нэмэх оролдлого хийх

---

## 🎯 Хүлээгдэж буй үр дүн:

- ✅ PromoAdmin page дээр бараанууд харагдана
- ✅ Зар нэмэх ажиллана (403 алдаа алга болно)
- ✅ Бараа нэмэх/засах/устгах ажиллана

