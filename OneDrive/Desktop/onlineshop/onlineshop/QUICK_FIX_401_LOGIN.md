# 401 Login Error - Хурдан Засах

## Асуудал:

- Console: `POST /api/auth/login 401 (Unauthorized)`
- `user?.role` нь `undefined`

**Энэ нь login амжилтгүй болсон!**

---

## Засах (2 минут):

### 1. Register Хийх (Хамгийн Хурдан)

1. Browser: `http://localhost:5173/Login`
2. **"Бүртгүүлэх" таб:**
   - Email: `khashpay@gmail.com`
   - Password: (өөрийн password)
   - Full Name: (нэрийг оруулах)
3. **"Бүртгүүлэх" товч дарх**

### 2. Admin Role Өгөх

pgAdmin 4 эсвэл psql:

```sql
UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';
```

### 3. Logout → Login

1. Logout хийх
2. Login: `khashpay@gmail.com` + password
3. Browser refresh: Ctrl+Shift+R

### 4. Console Шалгах

```javascript
const user = JSON.parse(localStorage.getItem('user'));
console.log('Role:', user?.role); // "admin" байх ёстой ✅
```

---

✅ Дараа нь PromoAdmin page ажиллана!

