# Backend: GET /api/messages/:id Endpoint нэмэх заавар

## Асуудал
Console дээр `GET http://localhost:3000/api/messages/:id` 404 (Not Found) алдаа гарч байна.
Энэ нь backend дээр `GET /api/messages/:id` endpoint байхгүй байна гэсэн утга.

## Шийдэл

`backend/routes/messages.js` файлд дараах endpoint нэмнэ үү:

```javascript
// GET /api/messages/:id - Get single message by ID
router.get('/:id',
  authenticate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user;

      // Get message from database
      const result = await pool.query(
        'SELECT * FROM messages WHERE id = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Message not found'
        });
      }

      const message = result.rows[0];

      // Check permissions: user can only see their own messages, admin can see all
      if (user.role !== 'admin' && message.email !== user.email) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You do not have permission to view this message'
        });
      }

      res.json(message);
    } catch (error) {
      console.error('Get message error:', error);
      next(error);
    }
  }
);
```

## Route Order (Чухал!)

Энэ endpoint-ийг бусад routes-ийн дараа, гэхдээ `/messages/:id/reply` endpoint-ийн өмнө байрлуулна:

```javascript
router.get('/', ...); // List messages
router.post('/', ...); // Create message
router.get('/:id', ...); // Get single message (NEW - энд нэмнэ)
router.put('/:id/read', ...); // Mark as read
router.post('/:id/reply', ...); // Reply to message
router.delete('/:id', ...); // Delete message
```

## Database Schema

Messages table-д дараах талбарууд байх ёстой:
- `id` (UUID)
- `email` (VARCHAR)
- `message` (TEXT)
- `reply` (TEXT, nullable)
- `replied_at` (TIMESTAMP, nullable)
- `created_at` (TIMESTAMP)

## Testing

```bash
# Get message as user (own message)
GET /api/messages/{message-id}
Authorization: Bearer {user-token}

# Get message as admin (any message)
GET /api/messages/{message-id}
Authorization: Bearer {admin-token}
```

## Алхам

1. `backend/routes/messages.js` файлыг нээнэ үү
2. Дээрх endpoint кодыг нэмнэ үү
3. Route order-ийг шалгана уу (дээрх дарааллаар байх ёстой)
4. Backend server-ийг restart хийгээрэй
5. Frontend-ийг refresh хийгээрэй

## Тэмдэглэл

- `authenticate` middleware шаардлагатай
- Admin: бүх мессежийг харна
- User: зөвхөн өөрийн мессежийг харна (email-ээр шалгана)
- Response: Message object-ийг шууд буцаана (reply, replied_at, created_at бүгд орно)

