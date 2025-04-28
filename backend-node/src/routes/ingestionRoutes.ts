import { Router } from 'express';
import { askQuestion } from '@/controllers/ingestionController';
import multer from 'multer';
import { authenticateJWT } from '@/middleware/authMiddleware';

const upload = multer({ dest: 'uploads/' });

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Ingestion
 *   description: APIs for document ingestion and Q&A interaction
 */

/**
 * @swagger
 * /ingestion/ask-question:
 *   post:
 *     summary: Ask a question using uploaded document (calls Python RAG backend)
 *     tags: [Ingestion]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: PDF file to process
 *               question:
 *                 type: string
 *                 description: Question to ask about the document
 *     responses:
 *       200:
 *         description: Successful answer generated
 *       400:
 *         description: Missing file or question
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/ask-question', authenticateJWT, upload.single('file'), askQuestion);

export default router;
