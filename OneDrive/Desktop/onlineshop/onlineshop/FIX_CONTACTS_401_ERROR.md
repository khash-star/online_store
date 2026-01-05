# Contacts API 401 Unauthorized Алдаа Засах

## ✅ Зарласан:

`ContactManagement.jsx` компонент дээр дараах засварууд хийгдлээ:

1. **`created_date` → `created_at`**: Database schema-тай тохируулсан
2. **Authentication check нэмсэн**: `useAuth` hook ашиглаж, зөвхөн admin user байхад л contacts API дуудна
3. **Error handling сайжруулсан**: 401 алдааны тохиолдолд toast notification харуулахгүй

---

## 🔍 Асуудал:

Contacts API нь **Admin only** байгаа тул:
- Нэвтрэх шаардлагатай
- Admin эрх шаардлагатай (`user.role === "admin"`)

401 Unauthorized алдаа гарч байсан нь:
- Нэвтрээгүй байгаа эсвэл
- Admin эрхгүй байгаа эсвэл
- Token алга/хүчингүй байгаа гэсэн үг

---

## 🔧 Зассан код:

### 1. `useAuth` hook нэмсэн:
```javascript
const { isAuthenticated, user } = useAuth();
```

### 2. Query-ийг зөвхөн admin user байхад л идэвхжүүлсэн:
```javascript
enabled: isAuthenticated && user?.role === "admin"
```

### 3. Sort параметрийг зассан:
```javascript
getContacts({ sort: "-created_at" })  // created_date → created_at
```

### 4. Error handling сайжруулсан:
- 401 алдааны тохиолдолд toast notification харуулахгүй (silent fail)
- Бусад алдаануудыг toast notification-оор харуулна

---

## 📝 Дараагийн алхам:

1. **Browser refresh хийх** (Ctrl+Shift+R)
2. **Нэвтрэх** (admin user: `khashpay@gmail.com`)
3. **PromoAdmin page нээх**: `http://localhost:5173/PromoAdmin`
4. **"Холбоо" tab сонгох**

401 алдаа алга болох ёстой!

---

## ⚠️ Анхаарах зүйлс:

- Contacts API нь зөвхөн admin user-д зориулагдсан
- Нэвтрэхгүйгээр contacts API дуудлага хийхгүй
- Admin эрхгүй user contacts API дуудлага хийхгүй

