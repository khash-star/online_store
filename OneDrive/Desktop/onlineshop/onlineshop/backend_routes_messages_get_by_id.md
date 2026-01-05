# Backend: GET /api/messages/:id Endpoint

Энэ endpoint-ийг `backend/routes/messages.js` файлд нэмнэ үү.

## Endpoint Code

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

## Implementation Notes

1. **Authentication**: `authenticate` middleware шаардлагатай
2. **Authorization**: 
   - Admin: бүх мессежийг харна
   - User: зөвхөн өөрийн мессежийг харна (email-ээр шалгана)
3. **Response**: Message object-ийг шууд буцаана (reply, replied_at, created_at бүгд орно)
4. **Error Handling**: 404 (not found), 403 (forbidden)

## Database Schema

Messages table-д дараах талбарууд байх ёстой:
- `id` (UUID)
- `email` (VARCHAR)
- `message` (TEXT)
- `reply` (TEXT, nullable)
- `replied_at` (TIMESTAMP, nullable)
- `created_at` (TIMESTAMP)

## Route Order

Энэ endpoint-ийг бусад routes-ийн дараа, гэхдээ `/messages/:id/reply` endpoint-ийн өмнө байрлуулна:

```javascript
router.get('/', ...); // List messages
router.post('/', ...); // Create message
router.get('/:id', ...); // Get single message (NEW)
router.put('/:id/read', ...); // Mark as read
router.post('/:id/reply', ...); // Reply to message
router.delete('/:id', ...); // Delete message
```

## Testing

```bash
# Get message as user (own message)
GET /api/messages/{message-id}
Authorization: Bearer {user-token}

# Get message as admin (any message)
GET /api/messages/{message-id}
Authorization: Bearer {admin-token}
```

