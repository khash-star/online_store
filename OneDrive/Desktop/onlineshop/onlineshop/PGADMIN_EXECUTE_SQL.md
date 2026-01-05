# pgAdmin 4 - SQL Ажиллуулах Заавар

## ✅ SQL командууд зөв оруулсан байна!

Query editor-д 3 мөр SQL код байна:
1. `SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';`
2. `UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';`
3. `SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';`

---

## 🎯 Ажиллуулах Арга:

### Арга 1: Бүгдийг нь Нэг Дор Ажиллуулах

1. **Бүх SQL командыг сонгох:**
   - Mouse-аар бүх мөрийг drag хийх
   - Эсвэл `Ctrl+A` дарж бүгдийг нь сонгох

2. **Execute button дарх:**
   - Toolbar дээр **▶️ Execute/Refresh** button (эсвэл F5)
   - Эсвэл `F5` товч дарх

3. **Үр дүн харах:**
   - "Data Output" tab-д SELECT query-ийн үр дүн харагдана
   - "Messages" tab-д `UPDATE 1` гэж харагдана (амжилттай)

---

### Арга 2: Нэг Нэгээр нь Ажиллуулах (Илүү тодорхой)

#### Алхам 1: User шалгах

1. **Эхний SELECT query-ийг сонгох:**
   ```sql
   SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';
   ```

2. **Execute (F5) дарх**

3. **"Data Output" tab-д үр дүн харагдана:**
   - User байгаа бол: `id`, `email`, `role` талбарууд харагдана
   - User байхгүй бол: Хоосон үр дүн

#### Алхам 2: Admin role өгөх

1. **UPDATE query-ийг сонгох:**
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'khashpay@gmail.com';
   ```

2. **Execute (F5) дарх**

3. **"Messages" tab-д шалгах:**
   - `UPDATE 1` → Амжилттай ✅
   - `UPDATE 0` → User олдсонгүй ❌

#### Алхам 3: Шалгах

1. **Сүүлийн SELECT query-ийг сонгох:**
   ```sql
   SELECT id, email, role FROM users WHERE email = 'khashpay@gmail.com';
   ```

2. **Execute (F5) дарх**

3. **"Data Output" tab-д үр дүн харагдана:**
   - `role = 'admin'` байх ёстой ✅

---

## 📝 Анхаарах зүйлс:

- **SQL командыг сонгох хэрэгтэй:** Execute хийхээс өмнө SQL командыг сонгох
- **Эсвэл бүгдийг нь сонгох:** `Ctrl+A` дарж бүгдийг нь сонгоод Execute хийх
- **"Messages" tab шалгах:** UPDATE query-ийн үр дүнг "Messages" tab-д харах
- **"Data Output" tab шалгах:** SELECT query-ийн үр дүнг "Data Output" tab-д харах

---

## ✅ Хүлээгдэж буй Үр дүн:

1. **Эхний SELECT:** User-ийн мэдээлэл харагдана (эсвэл хоосон)
2. **UPDATE:** `UPDATE 1` (амжилттай)
3. **Сүүлийн SELECT:** `role = 'admin'` байх ёстой ✅

---

## 🔍 Хэрэв UPDATE 0 байвал:

User байхгүй гэсэн үг. Эхлээд Browser дээр register хийх:
- `http://localhost:5173/Login`
- "Бүртгүүлэх" таб
- Email: `khashpay@gmail.com`
- Password: (өөрийн password)

