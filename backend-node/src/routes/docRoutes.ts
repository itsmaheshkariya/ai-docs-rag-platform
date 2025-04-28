import { Router } from 'express';
import { uploadDoc, getDocs, deleteDocument, updateDocument } from '@/controllers/documentController';
import { authenticateJWT } from '@/middleware/authMiddleware';

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

/**
 * @swagger
 * /documents/{id}:
 *   delete:
 *     summary: Delete a document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the document to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Document deleted successfully
 *       404:
 *         description: Document not found
 */
router.delete('/:id', deleteDocument);

/**
 * @swagger
 * /documents/{id}:
 *   patch:
 *     summary: Update a document
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the document to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *                 example: "PROCESSING"
 *     responses:
 *       200:
 *         description: Document updated successfully
 *       404:
 *         description: Document not found
 */
router.patch('/:id', updateDocument);

export default router;
