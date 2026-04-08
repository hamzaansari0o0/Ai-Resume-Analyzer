import express from 'express';
import { upload } from '../middlewares/uploadMiddleware.js';
import { analyzeResume } from '../controllers/resumeController.js';

const router = express.Router();

// POST route: /api/resume/analyze
// Pehle multer middleware chalega, phir controller chalega
router.post('/analyze', upload.single('resume'), analyzeResume);

export default router;