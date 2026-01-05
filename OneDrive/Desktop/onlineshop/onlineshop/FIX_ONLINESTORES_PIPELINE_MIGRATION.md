# OnlineStores.jsx болон Pipeline.jsx Migration Засварласан

## ✅ Зарласан:

OnlineStores.jsx болон Pipeline.jsx файлууд дээр base44-ийн stub функцүүдийг бүх API функцүүдээр солив.

---

## 🔧 Зассан файлууд:

### 1. OnlineStores.jsx

**API Imports нэмсэн:**
- `getStores, createStore, updateStore, deleteStore` - stores API
- `useAuth` - authentication hook

**Query функцүүдийг migration хийсэн:**
```javascript
const { data: storesData, isLoading } = useQuery({
  queryKey: ["onlineStores"],
  queryFn: async () => {
    const data = await getStores({ sort: "order" });
    return data.stores || data || [];
  },
});
```

**Mutation функцүүдийг migration хийсэн:**
- `createMutation` → `createStore`
- `updateMutation` → `updateStore`
- `deleteMutation` → `deleteStore`

**Admin check засварласан:**
```javascript
const { isAuthenticated, user } = useAuth();
const isAdmin = isAuthenticated && user?.role === "admin";
```

**Warning message устгасан**

---

### 2. Pipeline.jsx

**API Imports нэмсэн:**
- `getDeals, createDeal, updateDeal, deleteDeal` - deals API

**Query функцүүдийг migration хийсэн:**
```javascript
const { data: dealsData, isLoading } = useQuery({
  queryKey: ["deals"],
  queryFn: async () => {
    const data = await getDeals({ sort: "-created_at" });
    return data.deals || data || [];
  },
});
```

**Mutation функцүүдийг migration хийсэн:**
- `createMutation` → `createDeal`
- `updateMutation` → `updateDeal`
- `deleteMutation` → `deleteDeal`

**Warning message устгасан**

---

### 3. PopularStores.jsx (Component)

**API Import засварласан:**
- `base44` → `getStores`

**Query функцүүдийг migration хийсэн:**
```javascript
const { data: storesData } = useQuery({
  queryKey: ["onlineStores"],
  queryFn: async () => {
    const data = await getStores({ sort: "order" });
    return data.stores || data || [];
  },
});
```

---

## 📝 Дараагийн алхам:

1. Browser refresh хийх (Ctrl+Shift+R)
2. OnlineStores page шалгах: `http://localhost:5173/OnlineStores`
3. Pipeline page шалгах: `http://localhost:5173/Pipeline`
4. Shop page дээр PopularStores компонент uncomment хийх (хэрэв хэрэгтэй бол)

---

## ⚠️ Анхаарах зүйлс:

- OnlineStores page дээр admin user байхад л нэмэх/засах/устгах товч харагдана
- Бүх API response format-ийг зөв parse хийж байна (data.stores, data.deals, гэх мэт)
- Error handling нэмэгдсэн

