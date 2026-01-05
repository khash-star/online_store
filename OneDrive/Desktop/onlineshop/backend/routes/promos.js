import express from 'express';
import { body, validationResult, query } from 'express-validator';
import pool from '../config/database.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all promo messages
router.get('/',
  [
    query('is_active').optional().isBoolean(),
    query('sort').optional().trim()
  ],
  async (req, res, next) => {
    try {
      const { is_active, sort = '-created_at' } = req.query;

      let queryText = 'SELECT * FROM promo_messages WHERE 1=1';
      const params = [];
      let paramCount = 1;

      if (is_active !== undefined) {
        queryText += ` AND is_active = $${paramCount++}`;
        params.push(is_active === 'true');
      }

      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';
      queryText += ` ORDER BY ${sortField} ${sortOrder}`;

      const result = await pool.query(queryText, params);

      res.json({ promos: result.rows });
    } catch (error) {
      next(error);
    }
  }
);

// Create promo (Admin only)
router.post('/',
  authenticate,
  requireAdmin,
  [
    body('message').notEmpty().trim(),
    body('is_active').optional().isBoolean()
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

      const { message, is_active = true } = req.body;

      const result = await pool.query(
        `INSERT INTO promo_messages (message, is_active)
         VALUES ($1, $2)
         RETURNING *`,
        [message, is_active]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Update promo (Admin only)
router.put('/:id',
  authenticate,
  requireAdmin,
  [
    body('message').optional().trim(),
    body('is_active').optional().isBoolean()
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
      const updates = [];
      const values = [];
      let paramCount = 1;

      if (req.body.message !== undefined) {
        updates.push(`message = $${paramCount++}`);
        values.push(req.body.message);
      }

      if (req.body.is_active !== undefined) {
        updates.push(`is_active = $${paramCount++}`);
        values.push(req.body.is_active);
      }

      if (updates.length === 0) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'No fields to update'
        });
      }

      updates.push('updated_at = CURRENT_TIMESTAMP');
      values.push(id);

      const result = await pool.query(
        `UPDATE promo_messages 
         SET ${updates.join(', ')} 
         WHERE id = $${paramCount}
         RETURNING *`,
        values
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Promo message not found'
        });
      }

      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Delete promo (Admin only)
router.delete('/:id',
  authenticate,
  requireAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        'DELETE FROM promo_messages WHERE id = $1 RETURNING id',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Promo message not found'
        });
      }

      res.json({
        message: 'Promo message deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

