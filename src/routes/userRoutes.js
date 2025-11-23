import { Router } from "express"
import { authenticate } from "../middleware/authenticate.js"
import {
	updateUserAvatar,
	updateUserData,
} from "../controllers/userController.js"
import { upload } from "../middleware/multer.js"
import { updateUserDataSchema } from "../validations/userValidation.js"
import { celebrate } from "celebrate"

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *           nullable: true
 *         phone:
 *           type: string
 *         city:
 *           type: string
 *           nullable: true
 *         postalOffice:
 *           type: number
 *           nullable: true
 *         avatar:
 *           type: string
 *         avatar_id:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */


/**
 * @swagger
 * /api/users/me:
 *   patch:
 *     tags:
 *       - User Routes
 *     summary: Update current user's data
 *     description: Updates the authenticated user's profile information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 32
 *               lastName:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 32
 *               phone:
 *                 type: string
 *                 pattern: "^[0-9]{10,13}$"
 *               city:
 *                 type: string
 *               postalOffice:
 *                 type: number
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Updated user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.patch(
	"/users/me",
	authenticate,
	celebrate(updateUserDataSchema),
	updateUserData
)

router.patch(
	"/users/me/avatar",
	authenticate,
	upload.single("avatar"),
	updateUserAvatar
)

export default router
