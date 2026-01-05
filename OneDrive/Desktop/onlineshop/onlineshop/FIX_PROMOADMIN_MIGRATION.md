# PromoAdmin.jsx Migration Засварласан

## ✅ Зарласан:

PromoAdmin.jsx файл дээр base44-ийн stub функцүүдийг бүх API функцүүдээр солив.

---

## 🔧 Зассан функцүүд:

### 1. API Imports нэмсэн:
- `getProducts` - products API
- `getMessages` - messages API
- `getPromos, createPromo, updatePromo, deletePromo` - promos API
- `getFeatured, addFeatured, removeFeatured` - featured API
- `getSearchQueries` - searchQueries API
- `useAuth` - authentication hook

### 2. Query функцүүдийг migration хийсэн:

#### Search Queries:
```javascript
const { data: searchQueriesData } = useQuery({
  queryKey: ['search-queries'],
  queryFn: async () => {
    const data = await getSearchQueries({ sort: "-count" });
    return data.search_queries || data || [];
  },
  enabled: isAuthenticated && user?.role === "admin",
});
```

#### Messages:
```javascript
const { data: messagesData } = useQuery({
  queryKey: ['admin-messages'],
  queryFn: async () => {
    const data = await getMessages({ sort: "-created_at" });
    return data.messages || data || [];
  },
  enabled: isAuthenticated && user?.role === "admin",
});
```

#### Promos:
```javascript
const { data: promosData } = useQuery({
  queryKey: ["promo-messages"],
  queryFn: async () => {
    const data = await getPromos({ sort: "-created_at" });
    return data.promos || data || [];
  },
  enabled: isAuthenticated && user?.role === "admin",
});
```

#### Products:
```javascript
const { data: productsData } = useQuery({
  queryKey: ["all-products"],
  queryFn: async () => {
    const data = await getProducts({ sort: "-created_at" });
    return data.products || data || [];
  },
  enabled: isAuthenticated && user?.role === "admin",
});
```

#### Featured Products:
```javascript
const { data: featuredData } = useQuery({
  queryKey: ["featured-products-admin"],
  queryFn: async () => {
    const featured = await getFeatured({ sort: "order" });
    const featuredList = featured.featured || featured || [];
    const productIds = featuredList.map(f => f.product_id);
    if (productIds.length === 0) return [];
    const prodsData = await getProducts();
    const prods = prodsData.products || prodsData || [];
    return featuredList.map(f => ({
      ...f,
      product: prods.find(p => p.id === f.product_id)
    }));
  },
  enabled: isAuthenticated && user?.role === "admin",
});
```

### 3. Mutation функцүүдийг migration хийсэн:

- `createMutation` → `createPromo`
- `updateMutation` → `updatePromo`
- `deleteMutation` → `deletePromo`
- `addFeaturedMutation` → `addFeatured`
- `removeFeaturedMutation` → `removeFeatured`

Бүх mutation функцүүдэд error handling нэмсэн.

### 4. Warning message устгасан:

"Энэ хуудас одоогоор migration хийгдээгүй байна" гэсэн warning message-ийг устгасан.

---

## 📝 Дараагийн алхам:

1. Browser refresh хийх (Ctrl+Shift+R)
2. Admin user-аар нэвтрэх (`khashpay@gmail.com`)
3. PromoAdmin page руу очих: `http://localhost:5173/PromoAdmin`
4. Бүх tab-уудыг шалгах:
   - Бараа
   - Зар
   - Онцлох
   - Мессеж
   - Холбоо

---

## ⚠️ Анхаарах зүйлс:

- Бүх query функцүүд зөвхөн admin user байхад л ажиллана (`enabled: isAuthenticated && user?.role === "admin"`)
- Error handling нэмэгдсэн
- API response format-ийг зөв parse хийж байна (data.promos, data.messages, гэх мэт)

