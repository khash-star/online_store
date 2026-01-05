import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all contacts (Admin only)
router.get('/',
  authenticate,
  requireAdmin,
  async (req, res, next) => {
    try {
      const result = await pool.query(
        'SELECT * FROM contact_info ORDER BY created_at DESC'
      );

      res.json({ contacts: result.rows });
    } catch (error) {
      next(error);
    }
  }
);

// Create contact (Admin only)
router.post('/',
  authenticate,
  requireAdmin,
  [
    body('name').notEmpty().trim(),
    body('phone').optional().trim(),
    body('email').optional().isEmail().normalizeEmail(),
    body('address').optional().trim(),
    body('notes').optional().trim()
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

      const { name, phone, email, address, notes } = req.body;

      const result = await pool.query(
        `INSERT INTO contact_info (name, phone, email, address, notes)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [name, phone || null, email || null, address || null, notes || null]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Update contact (Admin only)
router.put('/:id',
  authenticate,
  requireAdmin,
  [
    body('name').optional().trim(),
    body('phone').optional().trim(),
    body('email').optional().isEmail().normalizeEmail(),
    body('address').optional().trim(),
    body('notes').optional().trim()
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

      const allowedFields = ['name', 'phone', 'email', 'address', 'notes'];
      
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          updates.push(`${field} = $${paramCount++}`);
          values.push(req.body[field]);
        }
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
        `UPDATE contact_info 
         SET ${updates.join(', ')} 
         WHERE id = $${paramCount}
         RETURNING *`,
        values
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Contact not found'
        });
      }

      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Delete contact (Admin only)
router.delete('/:id',
  authenticate,
  requireAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        'DELETE FROM contact_info WHERE id = $1 RETURNING id',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Contact not found'
        });
      }

      res.json({
        message: 'Contact deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

