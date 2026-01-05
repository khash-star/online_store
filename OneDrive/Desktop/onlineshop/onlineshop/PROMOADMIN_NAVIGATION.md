# PromoAdmin Page-д Орох Заавар

## 🎯 PromoAdmin Page-д Орох Арга:

### Арга 1: Settings Товч (⚙️) - Shop Page-н Баруун Дээд Булан

Shop page дээр баруун дээд буланд **Settings (⚙️)** товч байна:

```281:289:src/pages/Shop.jsx
<Link to={createPageUrl("PromoAdmin")} className="hidden sm:block">
  <Button
    variant="ghost"
    size="icon"
    className="text-slate-600 hover:text-purple-600"
  >
    <Settings className="w-5 h-5" />
  </Button>
</Link>
```

**Анхаарах зүйлс:**
- ⚠️ `hidden sm:block` class байгаа тул **жижиг дэлгэц дээр харагдахгүй** (зөвхөн desktop/tablet дээр харагдана)
- ✅ Settings товч дээр дарвал `/PromoAdmin` page руу очино

---

### Арга 2: URL-ээр Шууд Орох

Browser address bar дээр:

```
http://localhost:5173/PromoAdmin
```

---

## 📍 Shop Page Header Бүтэц:

Shop page-н header дээр (баруун тал):
1. **User icon** (Login/Profile) - `isAuthenticated` байвал Profile, эсвэл Login
2. **Heart icon** (Favorites) - Дуртай бараанууд
3. **Settings icon** (⚙️) - PromoAdmin page-д орох

---

## ✅ Баталгаажуулалт:

- ✅ Settings товч Shop.jsx файлын **281-289 мөрөнд** байна
- ✅ `createPageUrl("PromoAdmin")` ашиглаж байна
- ✅ Route зөв тохируулагдсан (`/PromoAdmin` route index.jsx-д байна)
- ✅ Settings icon (`lucide-react`-ээс) ашиглаж байна

---

## 🔍 Хэрэв Settings Товч Харагдахгүй Бол:

1. **Desktop/Tablet дээр харагдана:** `hidden sm:block` class-ийн улмаас зөвхөн жижиг дэлгэцээс дээш харагдана
2. **Эсвэл URL-ээр шууд орох:** `http://localhost:5173/PromoAdmin`
3. **Mobile дээр:** Settings товч харагдахгүй (header хэт нарийн болох тул)

---

## 🎯 Хүлээгдэж буй Үр дүн:

Settings товч дээр дарвал:
- ✅ `/PromoAdmin` page руу очино
- ✅ PromoAdmin page-н 8 таб харагдана:
  1. Бараа
  2. Зар
  3. Онцлох
  4. Хэрэглэгч
  5. Хайлт
  6. Үзэлт
  7. Мессеж
  8. Холбоо

