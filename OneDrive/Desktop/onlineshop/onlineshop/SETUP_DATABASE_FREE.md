# Database Setup - Үнэгүй Сонголт

## 🆓 Үнэгүй Сонголтууд

### Сонголт 1: Docker (Хамгийн Хялбар) ⭐

Docker Desktop суулгасан бол энэ арга нь хамгийн хялбар!

#### Шаардлага:
- Docker Desktop (үнэгүй)
- Download: https://www.docker.com/products/docker-desktop/

#### Setup:
```powershell
# 1. PostgreSQL container ажиллуулах
docker run --name onlineshop-db `
  -e POSTGRES_PASSWORD=postgres `
  -e POSTGRES_DB=onlineshop `
  -p 5432:5432 `
  -d postgres:16

# 2. Хэдэн секунд хүлээх (container start хийхэд)
Start-Sleep -Seconds 5

# 3. Schema ажиллуулах
Get-Content backend/database/schema.sql | docker exec -i onlineshop-db psql -U postgres -d onlineshop

# 4. .env файл үүсгэх
cd backend
@"
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/onlineshop
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
"@ | Out-File -Encoding utf8 .env
```

#### Заавар:
- Container stop хийх: `docker stop onlineshop-db`
- Container start хийх: `docker start onlineshop-db`
- Container устгах: `docker rm -f onlineshop-db`

---

### Сонголт 2: PostgreSQL Local Install (Үнэгүй) ⭐⭐

#### Шаардлага:
- PostgreSQL (үнэгүй, open source)
- Download: https://www.postgresql.org/download/windows/

#### Setup:

1. **PostgreSQL суулгах:**
   - Download: https://www.postgresql.org/download/windows/
   - Installer ажиллуулах
   - Password санах (postgres user-ийн)
   - Port: 5432 (default)

2. **Database үүсгэх:**
   ```powershell
   # PostgreSQL-д холбогдох
   psql -U postgres
   
   # Database үүсгэх
   CREATE DATABASE onlineshop;
   
   # Гарах
   \q
   ```

3. **Schema ажиллуулах:**
   ```powershell
   cd backend
   psql -U postgres -d onlineshop -f database/schema.sql
   ```

4. **.env файл үүсгэх:**
   ```powershell
   cd backend
   @"
   NODE_ENV=development
   PORT=3000
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/onlineshop
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:5173
   "@ | Out-File -Encoding utf8 .env
   ```
   **Анхаар**: `YOUR_PASSWORD`-ийг өөрийн PostgreSQL password-оор солих!

---

### Сонголт 3: Cloud Database (Үнэгүй Tier) - Development-д тохиромжгүй

Хэрэв local setup хийх боломжгүй бол:

#### Render PostgreSQL (Free Tier)
- ✅ Үнэгүй
- ✅ Managed service
- ❌ Development-д удаан (network latency)
- ❌ Free tier хязгаарлалт

#### Railway PostgreSQL (Free Tier)
- ✅ Үнэгүй ($5 credit/month)
- ✅ Managed service
- ❌ Development-д тохиромжгүй

**Тайлбар**: Production-д cloud database сайн, гэхдээ development-д local database илүү тохиромжтой (хурдан, найдвартай).

---

## 🎯 Санал: Docker Сонгох

**Яагаад Docker?**
- ✅ Хамгийн хялбар
- ✅ Бүх зүйл automated
- ✅ Clean setup (container-д тусгаарлагдсан)
- ✅ Устгах хялбар (docker rm)
- ✅ Үнэгүй
- ✅ Production-тай ойролцоо орчин

**Яагаад PostgreSQL local install биш?**
- ❌ Суулгах процесс урт
- ❌ System-д суулгах шаардлагатай
- ✅ Гэхдээ хэрэв Docker суулгах боломжгүй бол энэ нь сайн сонголт

---

## ✅ Дараагийн Алхам

### Docker сонгосон бол:
1. Docker Desktop суулгах (хэрэв байхгүй бол)
2. Дээрх Docker командуудыг ажиллуулах
3. Done! ✅

### PostgreSQL local сонгосон бол:
1. PostgreSQL суулгах
2. Database үүсгэх
3. Schema ажиллуулах
4. .env файл үүсгэх
5. Done! ✅

---

## 🧪 Test

```powershell
cd backend
npm run dev
# Should see: "✅ Database connected"
```

---

**Сонголт хийсэн үед хэлээрэй, би тусална!** 🚀

