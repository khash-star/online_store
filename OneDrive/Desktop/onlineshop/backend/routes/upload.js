import express from 'express';
import { uploadSingle } from '../middleware/upload.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import { getFileUrl } from '../middleware/upload.js';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import pool from '../config/database.js';

const router = express.Router();

// Configure S3 client for Cloudflare R2
const s3Client = process.env.R2_ENDPOINT ? new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
}) : null;

// Upload file (public)
router.post('/',
  authenticate,
  uploadSingle,
  (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'No file uploaded'
        });
      }

      let fileUrl;
      if (process.env.R2_ENDPOINT && req.file.location) {
        // R2 upload
        fileUrl = req.file.location;
      } else {
        // Local upload
        fileUrl = getFileUrl(req.file.filename);
      }

      res.json({
        file_url: fileUrl,
        file_id: req.file.key || req.file.filename
      });
    } catch (error) {
      next(error);
    }
  }
);

// Upload private file
router.post('/private',
  authenticate,
  uploadSingle,
  async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'No file uploaded'
        });
      }

      const fileId = req.file.key || req.file.filename;

      // Store file info in database for private files (optional)
      // You can create a files table to track private files

      res.json({
        file_id: fileId,
        file_url: `/api/files/${fileId}` // Proxy endpoint
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get signed URL for private file
router.get('/files/:id/signed-url',
  authenticate,
  async (req, res, next) => {
    try {
      if (!s3Client) {
        return res.status(501).json({
          error: 'Not Implemented',
          message: 'R2 not configured'
        });
      }

      const { id } = req.params;

      const command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: id,
      });

      const signedUrl = await getSignedUrl(s3Client, command, {
        expiresIn: 3600, // 1 hour
      });

      res.json({
        signed_url: signedUrl,
        expires_at: new Date(Date.now() + 3600 * 1000).toISOString()
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;

