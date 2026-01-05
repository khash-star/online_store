# Алдаа шалгах заавар

## 1. Frontend ажиллуулах

```bash
npm install
npm run dev
```

## 2. Browser Console-д алдаа харах

1. Browser-д F12 дарах
2. **Console** tab-д орох
3. Алдааны мэдээллийг харах

## 3. Түгээмэл алдаанууд

### ❌ "Cannot find module '@/api/base44Client'"
**Шалтгаан:** base44Client.js файл устгагдсан (зөв)
**Шийдэл:** Файлд base44 import үлдсэн байгаа эсэхийг шалгах

### ❌ "useAuth is not defined"
**Шалтгаан:** useAuth hook import хийгээгүй
**Шийдэл:** `import { useAuth } from "@/hooks/useAuth";` нэмэх

### ❌ "Module not found: @tanstack/react-query"
**Шалтгаан:** Dependencies суусангүй
**Шийдэл:** `npm install` ажиллуулах

### ❌ "axios is not defined"
**Шалтгаан:** axios package суусангүй
**Шийдэл:** `npm install` ажиллуулах

## 4. Migrate хийгдсэн файлууд

✅ Shop.jsx
✅ Profile.jsx  
✅ Checkout.jsx
✅ Favorites.jsx (FIXED)
✅ CategoryProducts.jsx
✅ MyOrders.jsx
✅ Contact.jsx

## 5. Base44 SDK файлууд

✅ Устгагдсан:
- src/api/base44Client.js
- src/api/entities.js
- src/api/integrations.js

✅ package.json шинэчлэгдсэн:
- @base44/sdk устгагдсан
- axios нэмэгдсэн
- @tanstack/react-query нэмэгдсэн

## 6. Алдаа олдохгүй бол

1. Browser-ийн cache цэвэрлэх (Ctrl+Shift+Delete)
2. `npm run dev` дахин ажиллуулах
3. Terminal-д гарч буй алдааг шалгах

