import express from 'express';
import { body, validationResult, query } from 'express-validator';
import pool from '../config/database.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all messages (Admin only) or user's own messages
router.get('/',
  authenticate,
  [
    query('sort').optional().trim(),
    query('is_read').optional().isBoolean()
  ],
  async (req, res, next) => {
    try {
      const { sort = '-created_at', is_read } = req.query;
      const user = req.user; // From authenticate middleware

      let queryText = 'SELECT * FROM messages WHERE 1=1';
      const params = [];
      let paramCount = 1;

      // If user is not admin, only show their own messages
      if (user.role !== 'admin') {
        queryText += ` AND LOWER(TRIM(email)) = LOWER(TRIM($${paramCount++}))`;
        params.push(user.email);
      }

      if (is_read !== undefined) {
        queryText += ` AND is_read = $${paramCount++}`;
        params.push(is_read === 'true');
      }

      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';
      queryText += ` ORDER BY ${sortField} ${sortOrder}`;

      const result = await pool.query(queryText, params);

      res.json({ messages: result.rows });
    } catch (error) {
      console.error('[GET /messages] Error:', error);
      next(error);
    }
  }
);

// Create message
router.post('/',
  [
    body('name').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('phone').optional().trim(),
    body('subject').optional().trim(),
    body('message').notEmpty().trim()
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation error',
          details: errors.array()
        });
      }

      const { name, email, phone, subject, message } = req.body;

      const result = await pool.query(
        `INSERT INTO messages (name, email, phone, subject, message)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [name, email, phone || null, subject || null, message]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Get single message by ID
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

// Mark message as read (Admin can mark any, user can mark their own)
router.put('/:id/read',
  authenticate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user;

      // First, check if message exists and get its email
      const checkResult = await pool.query(
        'SELECT id, email FROM messages WHERE id = $1',
        [id]
      );

      if (checkResult.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Message not found'
        });
      }

      const message = checkResult.rows[0];

      // If user is not admin, they can only mark their own messages as read
      if (user.role !== 'admin' && message.email !== user.email) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'You can only mark your own messages as read'
        });
      }

      // Update message as read
      const result = await pool.query(
        'UPDATE messages SET is_read = true WHERE id = $1 RETURNING *',
        [id]
      );

      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Delete message (Admin only)
router.delete('/:id',
  authenticate,
  requireAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        'DELETE FROM messages WHERE id = $1 RETURNING id',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Message not found'
        });
      }

      res.json({
        message: 'Message deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

// Reply to message (Admin only)
router.post('/:id/reply',
  authenticate,
  requireAdmin,
  [
    body('reply').notEmpty().trim()
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation error',
          details: errors.array()
        });
      }

      const { id } = req.params;
      const { reply } = req.body;

      // First, verify the message exists
      const checkResult = await pool.query(
        'SELECT id, email, name FROM messages WHERE id = $1',
        [id]
      );

      if (checkResult.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Message not found'
        });
      }

      const message = checkResult.rows[0];

      // Update the message with reply
      const result = await pool.query(
        `UPDATE messages 
         SET reply = $1, replied_at = NOW(), is_read = true 
         WHERE id = $2 
         RETURNING *`,
        [reply.trim(), id]
      );

      if (result.rows.length === 0) {
        return res.status(500).json({
          error: 'Internal Server Error',
          message: 'Failed to update message'
        });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Reply error:', error);
      next(error);
    }
  }
);

export default router;

