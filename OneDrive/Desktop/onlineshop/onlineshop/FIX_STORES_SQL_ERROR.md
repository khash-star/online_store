# Fix Stores SQL Error - Засах заавар

## Асуудал

Terminal дээр:
```
Error: error: syntax error at or near "order"
at backend/routes/stores.js:22:22
```

## Шалтгаан

PostgreSQL дээр `ORDER` нь reserved keyword. Column нэр болгон ашиглахдаа double quotes (`"order"`) ашиглах хэрэгтэй.

## Засах

`backend/routes/stores.js` файлын 22-р мөрөнд засах:

### ❌ Буруу:
```javascript
const result = await db.query(
  `SELECT * FROM online_stores ORDER BY order ASC`
);
```

### ✅ Зөв:
```javascript
const result = await db.query(
  `SELECT * FROM online_stores ORDER BY "order" ASC`
);
```

## Бүрэн жишээ

```javascript
// backend/routes/stores.js
router.get('/', async (req, res) => {
  try {
    const { sort = 'order' } = req.query;
    
    let orderBy = 'ORDER BY "order" ASC';  // ← "order" double quotes ашиглах
    if (sort === '-created_at') {
      orderBy = 'ORDER BY created_at DESC';
    } else if (sort === 'order') {
      orderBy = 'ORDER BY "order" ASC';  // ← "order" double quotes ашиглах
    }
    
    const result = await db.query(
      `SELECT * FROM online_stores ${orderBy}`
    );
    
    res.json({ stores: result.rows });
  } catch (error) {
    console.error('Get stores error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

## Чухал

PostgreSQL дээр reserved keywords:
- `ORDER` - ORDER BY clause-д ашиглана
- `SELECT`, `FROM`, `WHERE`, `GROUP`, `HAVING`, `LIMIT`, `OFFSET`, гэх мэт

Column нэр болгон ашиглахдаа **double quotes** ашиглах:
- ✅ `"order"` - Column нэр
- ❌ `order` - Reserved keyword (syntax error)

## Шалгах

Backend server дахин ажиллуулах:
```bash
cd backend
npm run dev
```

Browser дээр:
```
http://localhost:3000/api/stores?sort=order
```

Одоо ажиллах ёстой! ✅

