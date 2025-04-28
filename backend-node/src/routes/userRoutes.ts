import { Router } from 'express';
import { updateUserRole, getAllUsers } from '@/controllers/userController';
import { authenticateJWT } from '@/middleware/authMiddleware';
import { authorizeRole } from '@/middleware/roleMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: APIs for user management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', authenticateJWT, getAllUsers); // 👈 Added for fetching all users

/**
 * @swagger
 * /users/{id}/role:
 *   patch:
 *     summary: Update a user's role (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, editor, viewer]
 *                 example: editor
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.patch('/:id/role', authenticateJWT, authorizeRole('admin'), updateUserRole);

export default router;
