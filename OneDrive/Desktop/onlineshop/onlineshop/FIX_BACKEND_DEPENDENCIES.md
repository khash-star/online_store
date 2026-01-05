# Backend Dependencies Суулгах

## 🔴 Асуудал:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'pg' imported from create-admin.js
```

**Шалтгаан:** Backend directory-д `node_modules` байхгүй эсвэл dependencies суулгаагүй.

---

## ✅ Засах:

### 1. Backend directory руу очих

```powershell
cd C:\Users\khash\OneDrive\Desktop\onlineshop\onlineshop\backend
```

### 2. Dependencies суулгах

```powershell
npm install
```

### 3. Script ажиллуулах

```powershell
node scripts/create-admin.js
```

---

## ⚠️ Хэрэв package.json байхгүй бол:

Backend directory-д `package.json` файл байхгүй бол backend code бүрэн байхгүй байна. Энэ тохиолдолд backend code үүсгэх эсвэл backend code-г хэрэглэгчээс авах хэрэгтэй.

---

## 🎯 Хүлээгдэж буй Үр дүн:

```powershell
npm install
# Олон packages суулгагдана...

node scripts/create-admin.js
# ✅ User khashpay@gmail.com updated to admin role
# ✅ Admin user setup complete!
```

