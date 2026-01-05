# Бараа болон Дэлгүүр Нэмэх Заавар

## 🛍️ Бараа Нэмэх

### 1. PromoAdmin Page-аас нэмэх:

1. Browser дээр `http://localhost:5173/PromoAdmin` руу очих
2. Admin user-аар нэвтрэх (`khashpay@gmail.com`)
3. "Бараа" tab сонгох
4. "+ Бараа нэмэх" товч дарах
5. Дараах мэдээлэл оруулах:
   - Нэр: (жишээ: "iPhone 15 Pro")
   - Тайлбар: (жишээ: "Apple-ийн шинэ утас")
   - Үнэ: (жишээ: 2500000)
   - Зураг URL: (жишээ: "https://example.com/iphone.jpg")
   - Ангилал: (сонгох)
   - Хүйс: (сонгох)
   - Хэмжээ: (сонгох)
   - Өнгө: (сонгох)
   - Барааны тоо: (жишээ: 50)
   - Хөнгөлөлт (%): (жишээ: 10)
   - Affiliate Link: (сонголттой)
6. "Нэмэх" товч дарах

### 2. CSV Import ашиглах:

1. PromoAdmin page дээр "Импорт" товч дарах
2. CSV файл сонгох (жишээ формат доор)

**CSV Format:**
```csv
name,description,price,image_url,category,gender,size,color,stock,discount_percent,affiliate_link
"iPhone 15 Pro","Apple-ийн шинэ утас",2500000,"https://example.com/iphone.jpg","электроникс","унисекс","","Хар",50,10,"https://example.com/iphone"
"Samsung Galaxy S24","Samsung-ийн утас",2000000,"https://example.com/samsung.jpg","электроникс","унисекс","","Цэнхэр",30,5,"https://example.com/samsung"
```

---

## 🏪 Дэлгүүр Нэмэх

### 1. OnlineStores Page-аас нэмэх:

1. Browser дээр `http://localhost:5173/OnlineStores` руу очих
2. Admin user-аар нэвтрэх (`khashpay@gmail.com`)
3. "Дэлгүүр нэмэх" товч дарах (admin байхад л харагдана)
4. Дараах мэдээлэл оруулах:
   - Нэр: (жишээ: "Amazon")
   - Лого URL: (жишээ: "https://example.com/amazon-logo.png")
   - Вэбсайт URL: (жишээ: "https://www.amazon.com")
   - Ангилал: (сонгох)
   - Градиент: (сонгох)
   - Дараалал: (жишээ: 1)
5. "Нэмэх" товч дарах

---

## 📝 Жишээ Бараанууд

### Электроникс:
- iPhone 15 Pro - 2,500,000₮
- Samsung Galaxy S24 - 2,000,000₮
- MacBook Pro - 5,000,000₮
- iPad Air - 1,500,000₮

### Хувцас:
- Nike Air Max - 300,000₮
- Adidas Ultraboost - 350,000₮
- Zara Coat - 200,000₮

### Ном:
- Rich Dad Poor Dad - 42,000₮
- The 48 Laws of Power - 55,000₮
- Deep Work - 40,000₮

---

## 📝 Жишээ Дэлгүүрүүд

1. **Amazon**
   - URL: https://www.amazon.com
   - Лого: https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg

2. **eBay**
   - URL: https://www.ebay.com
   - Лого: https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg

3. **AliExpress**
   - URL: https://www.aliexpress.com
   - Лого: https://upload.wikimedia.org/wikipedia/commons/8/8a/AliExpress_logo.svg

---

## ⚠️ Анхаарах зүйлс:

1. **Backend Server ажиллаж байх ёстой:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Admin user-аар нэвтрэх:**
   - Email: `khashpay@gmail.com`
   - Password: (таны password)

3. **Зураг URL:**
   - Зураг URL оруулах эсвэл "Хуулах" товч ашиглан зураг upload хийх

4. **CSV Import:**
   - CSV файл зөв форматтай байх ёстой
   - Header мөр байх ёстой
   - UTF-8 encoding ашиглах

---

## 🚀 Хурдан арга:

1. Backend server эхлүүлэх
2. Browser дээр PromoAdmin page руу очих
3. Admin user-аар нэвтрэх
4. Бараа нэмэх (эсвэл CSV import)
5. OnlineStores page руу очих
6. Дэлгүүр нэмэх

