import { Router } from "express"
import {
	getAllGoods,
	getGoodById,
	getCategories,
	getFeedbacks,
	createFeedback,
	getCategory,
} from "../controllers/goodsController.js"
import {
	createFeedbackSchema,
	getAllGoodsSchema,
	getCategoriesSchema,
	getCategorySchema,
	getFeedbacksSchema,
	goodIdSchema,
} from "../validations/goodsValidation.js"
import { celebrate } from "celebrate"

const router = Router()

/**
 * @swagger
 * tags:
 *   - name: Goods Routes
 *     description: Endpoints for managing goods
 *   - name: Categories Routes
 *     description: Endpoints for product categories
 *   - name: Feedback Routes
 *     description: Endpoints for product feedbacks
 *
 * /api/goods:
 *   get:
 *     tags:
 *       - Goods Routes
 *     summary: Get all goods
 *     description: Returns a paginated list of goods, with optional filtering by category, search, gender, price, color, and sizes
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 8
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Filter by category ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [men, women, unisex]
 *         description: Filter by gender
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *         description: Price range filter in format min,max
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: Filter by color
 *       - in: query
 *         name: sizes
 *         schema:
 *           type: string
 *         description: Filter by sizes (comma-separated)
 *     responses:
 *       200:
 *         description: List of goods
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 perPage:
 *                   type: integer
 *                 totalGoods:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 goods:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Good'
 *
 * /api/goods/{goodId}:
 *   get:
 *     tags:
 *       - Goods Routes
 *     summary: Get a single good by ID
 *     parameters:
 *       - in: path
 *         name: goodId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: The ID of the good
 *     responses:
 *       200:
 *         description: Good object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Good'
 *       404:
 *         description: Good not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 * /api/categories:
 *   get:
 *     tags:
 *       - Categories Routes
 *     summary: Get all categories
 *     description: Returns paginated list of categories
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 6
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 perPage:
 *                   type: integer
 *                 totalCategories:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *
 * /api/categories/{categoryId}:
 *   get:
 *     tags:
 *       - Categories Routes
 *     summary: Get a single category by ID
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: The ID of the category
 *     responses:
 *       200:
 *         description: Category object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 * /api/feedbacks:
 *   get:
 *     tags:
 *       - Feedback Routes
 *     summary: Get all feedbacks
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           default: 6
 *       - in: query
 *         name: goodId
 *         schema:
 *           type: string
 *           format: objectId
 *         description: Filter feedbacks by good ID
 *     responses:
 *       200:
 *         description: List of feedbacks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 perPage:
 *                   type: integer
 *                 totalFeedbacks:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 feedbacks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Feedback'
 *
 *   post:
 *     tags:
 *       - Feedback Routes
 *     summary: Create a new feedback
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               author:
 *                 type: string
 *               description:
 *                 type: string
 *               rate:
 *                 type: number
 *               goodId:
 *                 type: string
 *                 format: objectId
 *             required:
 *               - author
 *               - description
 *               - rate
 *               - goodId
 *     responses:
 *       201:
 *         description: Feedback successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Feedback'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.get("/goods", celebrate(getAllGoodsSchema), getAllGoods)
router.get("/goods/:goodId", celebrate(goodIdSchema), getGoodById)
router.get("/categories", celebrate(getCategoriesSchema), getCategories)
router.get("/categories/:categoryId", celebrate(getCategorySchema), getCategory)
router.get("/feedbacks", celebrate(getFeedbacksSchema), getFeedbacks)
router.post("/feedbacks", celebrate(createFeedbackSchema), createFeedback)

export default router
