import { celebrate } from "celebrate"
import { Router } from "express"
import {
	loginUserSchema,
	registerUserSchema,
	subscribeEmailSchema,
} from "../validations/authValidation.js"
import {
	getCurrentUser,
	loginUser,
	logoutUser,
	refreshUserSession,
	registerUser,
	subscribeEmail,
} from "../controllers/authController.js"
import { authenticate } from "../middleware/authenticate.js"

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *         name:
 *           type: string
 *         image:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Feedback:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *         author:
 *           type: string
 *         date:
 *           type: string
 *         description:
 *           type: string
 *         rate:
 *           type: number
 *         goodId:
 *           type: string
 *           format: objectId
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     Good:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *         name:
 *           type: string
 *         image:
 *           type: string
 *         category:
 *           type: string
 *           format: objectId
 *         prevDescription:
 *           type: string
 *         colors:
 *           type: array
 *           items:
 *             type: string
 *             enum: [white, black, grey, blue, green, red, pastel]
 *         sizes:
 *           type: array
 *           items:
 *             type: string
 *             enum: [XXS, XS, S, M, L, XL, XXL]
 *         gender:
 *           type: string
 *           enum: [men, women, unisex]
 *         description:
 *           type: string
 *         price:
 *           type: object
 *           properties:
 *             value:
 *               type: number
 *               minimum: 0
 *             currency:
 *               type: string
 *               enum: [грн]
 *         feedbacks:
 *           type: array
 *           items:
 *             type: string
 *             format: objectId
 *         stars:
 *            type: number
 *            minimum: 0
 *         characteristics:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     OrderProduct:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: objectId
 *         amount:
 *           type: number
 *           minimum: 1
 *         size:
 *           type: string
 *           enum: [XXS, XS, S, M, L, XL, XXL]
 *         color:
 *           type: string
 *           enum: [white, black, grey, blue, green, red, pastel]
 *
 *     OrderUserData:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         phone:
 *           type: string
 *         city:
 *           type: string
 *         postalOffice:
 *           type: number
 *
 *     Order:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: objectId
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OrderProduct'
 *         sum:
 *           type: number
 *           minimum: 1
 *         userId:
 *           type: string
 *           format: objectId
 *           nullable: true
 *         date:
 *           type: string
 *         orderNum:
 *           type: number
 *         comment:
 *           type: string
 *           nullable: true
 *         status:
 *           type: string
 *           enum: [processing, packing, success, declined]
 *         userData:
 *           $ref: '#/components/schemas/OrderUserData'
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth Routes
 *     summary: Register a new user
 *     description: Creates a new user account and initiates a session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - firstName
 *               - phone
 *               - password
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth Routes
 *     summary: User login
 *     description: Authenticates a user and returns a session
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - phone
 *               - password
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth Routes
 *     summary: Logout user
 *     description: Deletes the user session and clears authentication cookies
 *     responses:
 *       204:
 *         description: Successfully logged out
 *
 * /api/auth/refresh:
 *   get:
 *     tags:
 *       - Auth Routes
 *     summary: Refresh user session
 *     description: Refreshes the session using a valid refresh token
 *     responses:
 *       200:
 *         description: Session successfully refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Session not found or expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Auth Routes
 *     summary: Get current user
 *     description: Returns the currently authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 * /api/subscriptions:
 *   post:
 *     tags:
 *       - Subscription Routes
 *     summary: Subscribe an email
 *     description: Adds an email to the subscription list and sends a confirmation email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Successfully subscribed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Email already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Failed to send subscription email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.post("/auth/register", celebrate(registerUserSchema), registerUser)
router.post("/auth/login", celebrate(loginUserSchema), loginUser)
router.post("/auth/logout", logoutUser)
router.get("/auth/refresh", refreshUserSession)
router.get("/auth/me", authenticate, getCurrentUser)
router.post("/subscriptions", celebrate(subscribeEmailSchema), subscribeEmail)

export default router
