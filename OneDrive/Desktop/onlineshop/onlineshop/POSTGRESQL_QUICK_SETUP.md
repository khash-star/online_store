# PostgreSQL Суулгах - Хурдан Заавар

## 🚀 3 Алхам

### 1️⃣ Татаж Авах
- https://www.postgresql.org/download/windows/
- **Windows x86-64** сонго
- **EnterpriseDB installer** ашиглах

### 2️⃣ Суулгах
- Installer ажиллуулах
- **Password оруулах** (САНАХ!)
- Port: 5432 (default)
- Бүх components сонго
- Finish

### 3️⃣ Шалгах
```powershell
# Path нэмэх (хэрэв command олдохгүй бол)
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"

# Test
psql --version
psql -U postgres
```

**Password асуувал**: Суулгах явцад оруулсан password

**Амжилттай бол**: `postgres=#` харагдана
**Гарах**: `\q`

---

## ✅ Database Үүсгэх

```powershell
psql -U postgres
CREATE DATABASE onlineshop;
\q
```

---

## 📝 Дэлгэрэнгүй

- **Full guide**: `POSTGRESQL_INSTALL_GUIDE.md`
- **Troubleshooting**: Дээрх guide-д байна

---

**Суулгасны дараа хэлээрэй!** 🎯

