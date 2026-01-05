# PostgreSQL Суулгах Заавар - Windows

## 📥 Step 1: PostgreSQL Татаж Авах

1. **Вебсайт руу ор**: https://www.postgresql.org/download/windows/
2. **"Download the installer"** дээр дар
3. **Windows x86-64** сонго (64-bit)
4. **Хамгийн сүүлийн хувилбар** сонго (жишээ: PostgreSQL 16)

Эсвэл шууд:
- **Direct link**: https://www.postgresql.org/download/windows/
- **EnterpriseDB installer** ашиглах (хамгийн хялбар)

---

## 🔧 Step 2: Installer Ажиллуулах

1. Татаж авсан `.exe` файлыг ажиллуулах
2. **"Next"** дар
3. **Installation Directory** сонго (default: `C:\Program Files\PostgreSQL\16`)
4. **"Next"** дар
5. **Components** сонго (бүгдийг нь сонго):
   - ✅ PostgreSQL Server
   - ✅ pgAdmin 4 (GUI tool)
   - ✅ Stack Builder
   - ✅ Command Line Tools
6. **"Next"** дар
7. **Data Directory** сонго (default: `C:\Program Files\PostgreSQL\16\data`)
8. **"Next"** дар

---

## 🔐 Step 3: Password Тохируулах

1. **PostgreSQL Superuser Password** оруулах:
   - Password оруулах (ЖИШЭЭ: `postgres123`)
   - ⚠️ **ЭНЭ PASSWORD-ИЙГ САНАХ!**
   - ⚠️ Баталгаажуулах password дахин оруулах
2. **"Next"** дар
3. **Port**: 5432 (default) - байгаагаар үлдээх
4. **"Next"** дар

---

## 🌍 Step 4: Locale Тохируулах

1. **Advanced Options**:
   - Locale: [Default locale]
2. **"Next"** дар
3. **Ready to Install** харагдана
4. **"Next"** дар
5. **Installation хийгдэж байна** (хэдэн минут)
6. **"Finish"** дар

---

## ✅ Step 5: PostgreSQL Service Шалгах

### Services-ээр шалгах:
1. `Win + R` дарах
2. `services.msc` бичиж Enter дарах
3. `postgresql-x64-16` (эсвэл ойролцоо нэр) хайх
4. **Status: Running** байх ёстой

### Command Line-аар шалгах:
```powershell
Get-Service postgresql*
```

---

## 🧪 Step 6: PostgreSQL Шалгах

### PowerShell-д:
```powershell
# PostgreSQL path-ийг нэмэх (хэрэв command олдохгүй бол)
$env:Path += ";C:\Program Files\PostgreSQL\16\bin"

# Version шалгах
psql --version

# PostgreSQL-д холбогдох
psql -U postgres
```

**Хэрэв password асуувал**, өмнө оруулсан password-ийг оруулах.

**Хэрэв амжилттай бол:**
```
postgres=#
```
Энэ нь PostgreSQL-д холбогдсон гэсэн үг!

**Гарах:**
```
\q
```

---

## 📝 Step 7: PATH Environment Variable Нэмэх (Optional)

Хэрэв `psql` command олдохгүй бол:

1. **System Properties** нээх:
   - `Win + R` → `sysdm.cpl` → Enter
2. **Advanced** tab → **Environment Variables**
3. **System variables** → **Path** → **Edit**
4. **New** дар
5. Энэ path нэмэх: `C:\Program Files\PostgreSQL\16\bin`
6. **OK** дар (бүх цонхонд)
7. PowerShell-ийг дахин нээх

---

## 🎉 Step 8: Database Үүсгэх

PostgreSQL суулгагдсаны дараа:

```powershell
# PostgreSQL-д холбогдох
psql -U postgres

# Password оруулах (далдалсан байна)

# Database үүсгэх
CREATE DATABASE onlineshop;

# Баталгаажуулах
\l  # (list databases - onlineshop харагдах ёстой)

# Гарах
\q
```

---

## ❓ Troubleshooting

### "psql is not recognized"
- **Шалтгаан**: PATH-д байхгүй
- **Шийдэл**: Step 7-г хийх, эсвэл full path ашиглах:
  ```powershell
  & "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres
  ```

### "Password authentication failed"
- **Шалтгаан**: Буруу password
- **Шийдэл**: Суулгах явцад оруулсан password-ийг санах, эсвэл password reset хийх

### "Connection refused"
- **Шалтгаан**: PostgreSQL service ажиллахгүй байна
- **Шийдэл**: Services-ээр service start хийх

### Service start хийх:
```powershell
Start-Service postgresql-x64-16
```

Эсвэл Services GUI-аар:
1. `services.msc` нээх
2. `postgresql-x64-16` олох
3. Right click → **Start**

---

## ✅ Дараагийн Алхам

PostgreSQL суулгагдсаны дараа:

1. ✅ Database үүсгэх (Step 8)
2. ⏭️ Schema ажиллуулах
3. ⏭️ .env файл үүсгэх
4. ⏭️ Backend connection test хийх

---

## 📚 Нэмэлт Хэрэгслүүд

### pgAdmin 4 (GUI Tool)
- PostgreSQL-ийг GUI-ээр удирдах
- Start menu-оос нээх боломжтой
- Visual database management

### Command Line Tools
- `psql` - PostgreSQL command line client
- `pg_ctl` - Service control
- `createdb` - Database үүсгэх
- `dropdb` - Database устгах

---

**PostgreSQL суулгасны дараа хэлээрэй, database setup-ийг үргэлжлүүлье!** 🚀

