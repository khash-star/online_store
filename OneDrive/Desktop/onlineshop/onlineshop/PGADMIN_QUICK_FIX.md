# pgAdmin 4 - Хурдан Засвар

## ⚠️ Алдаа: "no password supplied"

**Шалтгаан**: Password field-д password оруулаагүй байна.

## ✅ Засвар:

1. **"Register - Server"** dialog box-д:
   - "Connection" tab дээр байна

2. **Password field олох:**
   - "Username: postgres" field-ийн доор
   - "Password:" гэсэн field байх ёстой
   - Scroll down хийх (хэрэв харагдахгүй бол)

3. **Password оруулах:**
   - PostgreSQL суулгах явцад оруулсан password
   - Жишээ: `postgres123`

4. **"Save"** товч дар

---

## 🔍 Password Field Олох

Dialog box-д эдгээр fields байх ёстой:
- ✅ Host name/address: `localhost`
- ✅ Port: `5432`
- ✅ Maintenance database: `postgres`
- ✅ Username: `postgres`
- ⚠️ **Password: `[ОРУУЛАХ]`** ← Энэ field хэрэгтэй!
- ✅ Kerberos authentication: Off

---

**Password оруулсны дараа амжилттай болно!** 🎯

