# Бүх алдаа засах заавар

## Одоогийн асуудал:

Зарим components (FeaturedProducts, PopularStores, ProductMarquee, ImportProductDialog) одоогоор base44 SDK ашиглаж байна.

## Шийдэл:

Эдгээр components-уудыг одоогийн байдлаар ашиглаж болно гэхдээ алдаа гарч болно. 
Дараа нь migrate хийх шаардлагатай.

## Түр шийдэл:

Shop.jsx-д эдгээр components-уудыг comment хийх эсвэл өөр components-оор солих.

## Дараагийн алхам:

1. `npm install` - Dependencies суулгах
2. `npm run dev` - Frontend ажиллуулах
3. Browser Console (F12) - Алдааг харах
4. Алдаа гарсан components-уудыг migrate хийх эсвэл comment хийх

## Migrate хийх шаардлагатай файлууд:

1. src/components/shop/FeaturedProducts.jsx
2. src/components/shop/PopularStores.jsx  
3. src/components/shop/ProductMarquee.jsx
4. src/components/shop/ImportProductDialog.jsx (хэрэв base44 ашиглаж байвал)
5. src/components/shop/ProductCard.jsx (хэрэв base44 ашиглаж байвал)

## Одоогоор migrate хийгдсэн:

✅ Shop.jsx
✅ Profile.jsx
✅ Checkout.jsx
✅ Favorites.jsx
✅ CategoryProducts.jsx
✅ MyOrders.jsx
✅ Contact.jsx

