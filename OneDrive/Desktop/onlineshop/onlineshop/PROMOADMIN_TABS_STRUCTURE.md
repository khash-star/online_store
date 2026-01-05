# PromoAdmin.jsx Табын Бүтэц

## 📋 Одоогийн Бүтэц (8 таб):

### TabsList (мөр 232-241):
```jsx
<TabsList className="grid w-full grid-cols-8">
  <TabsTrigger value="products">Бараа</TabsTrigger>
  <TabsTrigger value="promos">Зар</TabsTrigger>
  <TabsTrigger value="featured">Онцлох</TabsTrigger>
  <TabsTrigger value="users">Хэрэглэгч</TabsTrigger>
  <TabsTrigger value="search">Хайлт</TabsTrigger>
  <TabsTrigger value="views">Үзэлт</TabsTrigger>
  <TabsTrigger value="messages">Мессеж</TabsTrigger>
  <TabsTrigger value="contacts">Холбоо</TabsTrigger>
</TabsList>
```

---

## 📝 Табын Дэлгэрэнгүй:

### 1. Бараа (products) - мөр 243-245
- **Компонент:** `ProductManagement`
- **Props:** `products={filteredProducts}`
- **Функц:** Бараа нэмэх/засах/устгах, Import/Export

### 2. Зар (promos) - мөр 247-308
- **Компонент:** Inline Card компонент
- **Функц:** Промо мессеж CRUD (Create, Read, Update, Delete)
- **API:** `getPromos`, `createPromo`, `updatePromo`, `deletePromo`

### 3. Онцлох (featured) - мөр 310-369
- **Компонент:** Inline Card компонент
- **Функц:** Featured бараа сонгох/хасах
- **API:** `getFeatured`, `addFeatured`, `removeFeatured`

### 4. Хэрэглэгч (users) - мөр 371-383
- **Компонент:** Inline Card компонент (Placeholder)
- **Функц:** Хэрэглэгчдийн удирдлага (хөгжүүлж байна)
- **Статус:** ⚠️ Хөгжүүлж байна

### 5. Хайлт (search) - мөр 385-410
- **Компонент:** Inline Card компонент
- **Функц:** Хайлтын статистик (SearchQuery entity)
- **API:** `getSearchQueries`
- **Харуулдаг:** Query, Count

### 6. Үзэлт (views) - мөр 412-424
- **Компонент:** Inline Card компонент (Placeholder)
- **Функц:** Үзэлтийн статистик (Product view_count)
- **Статус:** ⚠️ Хөгжүүлж байна

### 7. Мессеж (messages) - мөр 426-446
- **Компонент:** Inline Card компонент
- **Функц:** Хэрэглэгчдийн мессежүүд (Message entity)
- **API:** `getMessages`
- **Харуулдаг:** Name, Email, Message

### 8. Холбоо (contacts) - мөр 448-450
- **Компонент:** `ContactManagement`
- **Функц:** Холбоо барих мэдээлэл удирдах
- **API:** `getContacts`, `createContact`, `updateContact`, `deleteContact`

---

## 🔧 Хэрэглэгдэж буй API функцүүд:

- `getProducts` - Бараанууд
- `getPromos`, `createPromo`, `updatePromo`, `deletePromo` - Промо мессеж
- `getFeatured`, `addFeatured`, `removeFeatured` - Онцлох бараа
- `getSearchQueries` - Хайлтын түүх
- `getMessages` - Мессежүүд
- `getContacts`, `createContact`, `updateContact`, `deleteContact` - Холбоо

---

## 📊 Статус:

- ✅ **Ажиллаж байна:** Бараа, Зар, Онцлох, Хайлт, Мессеж, Холбоо
- ⚠️ **Хөгжүүлж байна:** Хэрэглэгч, Үзэлт

---

## 🔄 Хэрэв 7 таб хэрэгтэй бол:

Хэрэв "Холбоо" табыг хасах хэрэгтэй бол:

1. `TabsList` дээр `grid-cols-8` → `grid-cols-7` болгох
2. "Холбоо" `TabsTrigger` устгах
3. "Холбоо" `TabsContent` устгах

Гэхдээ одоогоор 8 таб байгаа нь зөв байна - "Холбоо" таб ContactManagement компонент ашиглаж байна.

