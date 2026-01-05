import express from 'express';
import { body, validationResult, query } from 'express-validator';
import pool from '../config/database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all deals
router.get('/',
  authenticate,
  [
    query('sort').optional().trim(),
    query('stage').optional().trim()
  ],
  async (req, res, next) => {
    try {
      const { sort = '-created_at', stage } = req.query;

      let queryText = 'SELECT * FROM deals WHERE 1=1';
      const params = [];
      let paramCount = 1;

      if (stage) {
        queryText += ` AND stage = $${paramCount++}`;
        params.push(stage);
      }

      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';
      queryText += ` ORDER BY ${sortField} ${sortOrder}`;

      const result = await pool.query(queryText, params);

      res.json({ deals: result.rows });
    } catch (error) {
      next(error);
    }
  }
);

// Create deal
router.post('/',
  authenticate,
  [
    body('title').notEmpty().trim(),
    body('company').optional().trim(),
    body('amount').optional().isFloat({ min: 0 }),
    body('stage').optional().trim(),
    body('probability').optional().isInt({ min: 0, max: 100 }),
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

      const {
        title,
        company,
        amount,
        stage = 'prospecting',
        probability = 0,
        notes
      } = req.body;

      const result = await pool.query(
        `INSERT INTO deals (title, company, amount, stage, probability, notes, created_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [title, company || null, amount || null, stage, probability, notes || null, req.user.id]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Update deal
router.put('/:id',
  authenticate,
  [
    body('title').optional().trim(),
    body('company').optional().trim(),
    body('amount').optional().isFloat({ min: 0 }),
    body('stage').optional().trim(),
    body('probability').optional().isInt({ min: 0, max: 100 }),
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

      const allowedFields = ['title', 'company', 'amount', 'stage', 'probability', 'notes'];
      
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
        `UPDATE deals 
         SET ${updates.join(', ')} 
         WHERE id = $${paramCount}
         RETURNING *`,
        values
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Deal not found'
        });
      }

      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Delete deal
router.delete('/:id',
  authenticate,
  async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        'DELETE FROM deals WHERE id = $1 RETURNING id',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Not Found',
          message: 'Deal not found'
        });
      }

      res.json({
        message: 'Deal deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

