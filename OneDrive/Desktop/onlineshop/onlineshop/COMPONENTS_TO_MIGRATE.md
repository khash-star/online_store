# Migrate хийх шаардлагатай Components

## Түр comment хийгдсэн (Shop.jsx ажиллахын тулд):

1. **FeaturedProducts** - base44.entities.FeaturedProduct, base44.entities.Product ашиглаж байна
2. **ProductMarquee** - base44.entities.PromoMessage ашиглаж байна  
3. **PopularStores** - base44.entities.OnlineStore ашиглаж байна

## Зассан:

✅ **ProductCard.jsx** - base44 устгалаа (view_count update optional болгосон)

## Дараа нь migrate хийх:

1. **FeaturedProducts.jsx**
   - getFeaturedProducts API function үүсгэх
   - getProducts API function ашиглах

2. **ProductMarquee.jsx**
   - getPromos API function ашиглах (promos.js байна)

3. **PopularStores.jsx**
   - getStores API function ашиглах (stores.js байна)

## Admin pages (дараа нь):

- OnlineStores.jsx
- Pipeline.jsx
- PromoAdmin.jsx
- ContactManagement.jsx
- ProductManagement.jsx

