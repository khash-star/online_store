# pgAdmin 4 - Server Register Заавар

## 🔐 Password Оруулах

pgAdmin 4-д server register хийхдээ **Password** оруулах шаардлагатай!

### Алхам:

1. **"Register - Server"** dialog box-д:
   - **"Connection"** tab дээр байна ✅

2. **Password field олох:**
   - "Username" field-ийн доор (эсвэл ойролцоо)
   - "Password" гэсэн field байх ёстой
   - Хэрэв харагдахгүй бол scroll down хийх

3. **Password оруулах:**
   - PostgreSQL суулгах явцад оруулсан password-ийг оруулах
   - Жишээ: `postgres123` (өөрийн password)

4. **"Save password?"** checkbox:
   - ✅ Сонгож болно (password санах)
   - Эсвэл ❌ үлдээж болно (security-д илүү сайн)

5. **"Save"** товч дар

---

## 🔍 Password Field Харагдахгүй Бол

Хэрэв password field харагдахгүй бол:

1. Dialog box-ийг томруулах (drag corner)
2. Scroll down хийх
3. "Connection" tab дотор бүх fields-ийг шалгах

**Normal fields:**
- Host name/address: `localhost`
- Port: `5432`
- Maintenance database: `postgres`
- Username: `postgres`
- **Password**: `[өөрийн password]` ⚠️ Энэ field хэрэгтэй!
- Kerberos authentication: Off

---

## ✅ Амжилттай Холбогдвол

Амжилттай бол:
- Error алга болно
- Server "Servers" list-д харагдана
- Database-үүд харагдана

---

## ❓ Password Мартсан Бол

### PostgreSQL password reset:

1. **pg_hba.conf файл олох:**
   - Location: `C:\Program Files\PostgreSQL\16\data\pg_hba.conf`

2. **File edit хийх:**
   - Admin эрхээр нээх (Notepad as Administrator)
   - Энэ мөрийг олох:
     ```
     host    all             all             127.0.0.1/32            scram-sha-256
     ```
   - Энэ мөрийг солих:
     ```
     host    all             all             127.0.0.1/32            trust
     ```

3. **PostgreSQL service restart:**
   ```powershell
   Restart-Service postgresql-x64-16
   ```

4. **psql-ээр password солих:**
   ```powershell
   psql -U postgres
   ALTER USER postgres WITH PASSWORD 'new_password';
   \q
   ```

5. **pg_hba.conf буцаах:**
   - `trust` → `scram-sha-256` солих
   - Service restart

---

## 🎯 Command Line-ээр Connect Хийх

pgAdmin-ийн оронд command line ашиглаж болно:

```powershell
# PostgreSQL bin folder руу очих
cd "C:\Program Files\PostgreSQL\16\bin"

# Connect
.\psql.exe -U postgres

# Password оруулах (далдалсан байна)
```

Эсвэл password-ийг command line-аар:

```powershell
$env:PGPASSWORD='your_password'
.\psql.exe -U postgres
```

---

**Password оруулсны дараа "Save" дар, амжилттай холбогдох ёстой!** ✅

