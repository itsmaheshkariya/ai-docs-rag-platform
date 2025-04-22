import { Router } from 'express';
import { uploadDoc, getDocs } from '../controllers/documentController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Endpoints for document upload and retrieval
 */

router.use(authenticateJWT);

/**
 * @swagger
 * /documents/upload:
 *   post:
 *     summary: Upload a new document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My Report.pdf"
 *     responses:
 *       200:
 *         description: Document uploaded successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/upload', uploadDoc);

/**
 * @swagger
 * /documents:
 *   get:
 *     summary: Get list of uploaded documents by authenticated user
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of documents
 *       401:
 *         description: Unauthorized
 */
router.get('/', getDocs);

export default router;
