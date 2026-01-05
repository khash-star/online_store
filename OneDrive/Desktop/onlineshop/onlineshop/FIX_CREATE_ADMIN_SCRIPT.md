# create-admin.js Script Засах

## 🔴 Асуудал:

Terminal дээр:
```
Error: Cannot find module 'C:\Users\khash\OneDrive\Desktop\onlineshop\backend\scripts\create-admin.js'
```

**Шалтгаан:** Terminal нь workspace root-оос гадуур байгаа directory-д байна.

---

## ✅ Засах:

### Workspace Root-оос Backend Directory руу очих

Workspace root нь: `C:\Users\khash\OneDrive\Desktop\onlineshop\onlineshop`

**Terminal дээр:**

```powershell
# Workspace root руу очих (onlineshop/onlineshop)
cd C:\Users\khash\OneDrive\Desktop\onlineshop\onlineshop

# Backend directory руу очих
cd backend

# Script ажиллуулах
node scripts/create-admin.js
```

---

## 🎯 Эсвэл Workspace Root-оос Шууд:

```powershell
# Workspace root-оос
cd C:\Users\khash\OneDrive\Desktop\onlineshop\onlineshop

# Script ажиллуулах (workspace root-оос)
node backend/scripts/create-admin.js
```

---

## ✅ Хүлээгдэж буй Үр дүн:

```
✅ User khashpay@gmail.com updated to admin role
✅ Admin user setup complete!
```

Эсвэл:

```
✅ Admin user created: khashpay@gmail.com
⚠️  Temporary password: xxxxxxxxxxxxxx
⚠️  Please change password after first login!
✅ Admin user setup complete!
```

---

## 🔍 Шалгах:

Backend directory-д байгаа эсэхийг:

```powershell
Get-Location
# C:\Users\khash\OneDrive\Desktop\onlineshop\onlineshop\backend байх ёстой

# Файл байгаа эсэхийг шалгах
Test-Path "scripts\create-admin.js"
# True байх ёстой
```

