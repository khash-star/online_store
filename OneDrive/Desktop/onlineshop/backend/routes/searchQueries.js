import express from 'express';
import { body, validationResult, query } from 'express-validator';
import pool from '../config/database.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all search queries (Admin only)
router.get('/',
  authenticate,
  requireAdmin,
  [
    query('sort').optional().trim()
  ],
  async (req, res, next) => {
    try {
      const { sort = '-count' } = req.query;

      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      const sortOrder = sort.startsWith('-') ? 'DESC' : 'ASC';
      const allowedSortFields = ['count', 'created_at'];
      const validSortField = allowedSortFields.includes(sortField) ? sortField : 'count';

      const result = await pool.query(
        `SELECT * FROM search_queries 
         ORDER BY ${validSortField} ${sortOrder}`
      );

      res.json({ queries: result.rows });
    } catch (error) {
      next(error);
    }
  }
);

// Create or update search query
router.post('/',
  [
    body('query').notEmpty().trim()
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

      const { query: searchQuery } = req.body;

      // Check if query exists
      const existingResult = await pool.query(
        'SELECT * FROM search_queries WHERE query = $1',
        [searchQuery]
      );

      if (existingResult.rows.length > 0) {
        // Update count
        const result = await pool.query(
          `UPDATE search_queries 
           SET count = count + 1, updated_at = CURRENT_TIMESTAMP
           WHERE query = $1
           RETURNING *`,
          [searchQuery]
        );

        return res.json(result.rows[0]);
      } else {
        // Create new
        const result = await pool.query(
          `INSERT INTO search_queries (query, count)
           VALUES ($1, 1)
           RETURNING *`,
          [searchQuery]
        );

        return res.status(201).json(result.rows[0]);
      }
    } catch (error) {
      if (error.code === '23505') {
        // Retry update if unique constraint violation
        const result = await pool.query(
          `UPDATE search_queries 
           SET count = count + 1, updated_at = CURRENT_TIMESTAMP
           WHERE query = $1
           RETURNING *`,
          [req.body.query]
        );
        return res.json(result.rows[0]);
      }
      next(error);
    }
  }
);

export default router;

