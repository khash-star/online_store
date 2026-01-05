# .env Файл Үүсгэх - Хурдан Заавар

## ⚡ Хамгийн Хурдан Арга

### Option 1: PowerShell Script (Автомат) ⭐

```powershell
cd backend
.\create-env.ps1
```

Script нь:
- PostgreSQL password асуух
- JWT Secret generate хийх (эсвэл өөрийн оруулах)
- .env файл үүсгэх

---

### Option 2: Manual (Хуурал)

```powershell
cd backend

# .env файл үүсгэх (YOUR_PASSWORD-ийг солих!)
@"
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/onlineshop
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
"@ | Out-File -Encoding utf8 .env
```

**⚠️ Анхаар**: `YOUR_PASSWORD`-ийг PostgreSQL password-оор солих!

---

### Option 3: Notepad

1. `backend/.env` файл үүсгэх
2. Энэ content-ийг оруулах:
   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/onlineshop
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:5173
   ```
3. `YOUR_PASSWORD`-ийг солих
4. Save

---

## ✅ Verify

```powershell
cd backend
Get-Content .env
```

---

## 🧪 Test Backend

```powershell
cd backend
npm run dev
```

**Амжилттай бол:**
```
✅ Database connected
🚀 Server running on http://localhost:3000
```

---

**Дэлгэрэнгүй**: `CREATE_ENV_FILE.md`

