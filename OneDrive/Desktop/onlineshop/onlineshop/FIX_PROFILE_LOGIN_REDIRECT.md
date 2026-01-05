# Profile Page Login Redirect Засах

## ✅ Зарласан:

Profile page дээр нэвтрээгүй user-ийн хувьд login page руу автоматаар redirect хийх логик нэмлээ.

---

## 🔍 Асуудал:

Цэс дээр "Профайл" дархад нэвтрээгүй user Profile page руу очиж байгаа ч login page руу redirect хийгдэхгүй байсан.

---

## 🔧 Зассан код:

### 1. `useNavigate` hook нэмсэн:
```javascript
import { Link, useNavigate } from "react-router-dom";
const navigate = useNavigate();
```

### 2. `isAuthenticated` болон `loading` state ашигласан:
```javascript
const { user: authUser, updateUser, logout: authLogout, isAuthenticated, loading: authLoading } = useAuth();
```

### 3. useEffect дээр redirect логик нэмсэн:
```javascript
useEffect(() => {
  // Нэвтрээгүй бол login page руу redirect хийх
  if (!authLoading && !isAuthenticated) {
    navigate(createPageUrl("Login"));
    return;
  }
  
  if (isAuthenticated) {
    loadUser();
  }
}, [isAuthenticated, authLoading, navigate]);
```

### 4. Loading state-ийг зассан:
- Auth loading эсвэл нэвтрээгүй бол loading spinner харуулна
- Нэвтрээгүй бол `null` буцаана (redirect хийгдэх ёстой)

---

## 📝 Үр дүн:

Одоо нэвтрээгүй user:
1. Mobile bottom navigation дээр "Профайл" дарвал
2. Profile page руу очих гэж байгаа ч
3. Автоматаар Login page руу redirect хийгдэнэ

---

## ⚠️ Анхаарах зүйлс:

- `useEffect` dependencies дээр `isAuthenticated`, `authLoading`, `navigate` нэмсэн
- Auth loading үед redirect хийхгүй (infinite loop-оос сэргийлэх)
- Нэвтрээгүй бол `null` буцаана (redirect хийгдэх ёстой)

