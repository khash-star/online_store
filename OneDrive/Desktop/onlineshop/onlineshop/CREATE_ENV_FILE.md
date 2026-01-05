# Backend .env Файл Үүсгэх

## 📝 .env Файл Үүсгэх Заавар

Backend-д `.env` файл үүсгэх хэрэгтэй. Энэ файл нь environment variables-ийг агуулна.

---

## 🔐 Шаардлагатай Мэдээлэл

- **PostgreSQL Password**: PostgreSQL суулгах явцад оруулсан password
- **JWT Secret**: Ямар нэг random string (security-д зориулсан)

---

## 📋 .env Файл Content

`backend/.env` файл үүсгэх:

```env
# Server
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/onlineshop

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Cloudflare R2 (Optional - development-д хэрэггүй)
# R2_ACCOUNT_ID=
# R2_ACCESS_KEY_ID=
# R2_SECRET_ACCESS_KEY=
# R2_BUCKET_NAME=
# R2_ENDPOINT=
# R2_PUBLIC_URL=

# Email (Optional - development-д хэрэггүй)
# SMTP_HOST=
# SMTP_PORT=587
# SMTP_USER=
# SMTP_PASS=
```

---

## 🔧 Үүсгэх Арга

### Арга 1: PowerShell (Recommended)

```powershell
cd backend

# .env файл үүсгэх
@"
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/onlineshop
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
"@ | Out-File -Encoding utf8 .env
```

**Анхаар**: `YOUR_PASSWORD`-ийг PostgreSQL password-оор солих!

### Арга 2: Notepad/Text Editor

1. `backend/.env` файл үүсгэх (Text Editor-ээр)
2. Дээрх content-ийг copy-paste хийх
3. `YOUR_PASSWORD`-ийг PostgreSQL password-оор солих
4. Save хийх

### Арга 3: Command Line (echo)

```powershell
cd backend

echo "NODE_ENV=development" > .env
echo "PORT=3000" >> .env
echo "DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/onlineshop" >> .env
echo "JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars" >> .env
echo "JWT_EXPIRES_IN=7d" >> .env
echo "FRONTEND_URL=http://localhost:5173" >> .env
```

---

## 🔑 JWT Secret Generate

JWT Secret нь random string байх хэрэгтэй. Generate хийх:

### PowerShell:
```powershell
# Random string generate
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

### Online:
- https://randomkeygen.com/
- 32+ characters сонгох

---

## ✅ Verify .env Файл

```powershell
cd backend

# Файл байгаа эсэхийг шалгах
Test-Path .env

# Content-ийг харах (password далдалсан байгаа ч харагдана)
Get-Content .env
```

---

## ⚠️ Security Анхаарах Зүйлс

1. **.env файл нь .gitignore-д байх ёстой** ✅ (бидний .gitignore-д байна)
2. **Production-д JWT_SECRET-ийг солих хэрэгтэй**
3. **Password-ийг хэнд ч хуваалцах хэрэггүй**

---

## 🧪 Test

.env файл үүсгэсний дараа:

```powershell
cd backend
npm run dev
```

**Амжилттай бол:**
```
✅ Database connected
🚀 Server running on http://localhost:3000
```

**Алдаа гарвал:**
- DATABASE_URL-ийг шалгах (password зөв эсэх)
- PostgreSQL service ажиллаж байгаа эсэх

---

## 📝 Example .env File

Жишээ (password: `postgres123`):

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/onlineshop
JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

---

**.env файл үүсгэсний дараа backend-ийг test хийх!** 🚀

