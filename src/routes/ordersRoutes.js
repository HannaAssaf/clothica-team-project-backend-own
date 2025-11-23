
import { Router } from "express"
import { authenticate } from "../middleware/authenticate.js"
import {
	createUserOrder,
	createUserOrderByUser,
	getUserOrders,
	patchOrder,
} from "../controllers/ordersController.js"
import { celebrate } from "celebrate"
import {
	createUserOrderSchema,
	patchOrderSchema,
} from "../validations/ordersValidation.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   - name: Order Routes
 *     description: Endpoints for managing user orders
 *
 * /api/orders:
 *   get:
 *     tags:
 *       - Order Routes
 *     summary: Get current user's orders
 *     description: Returns all orders of the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
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
 *   post:
 *     tags:
 *       - Order Routes
 *     summary: Create a new order
 *     description: Creates an order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/OrderProduct'
 *               comment:
 *                 type: string
 *                 default: ""
 *               userData:
 *                 $ref: '#/components/schemas/OrderUserData'
 *             required:
 *               - products
 *               - userData
 *     responses:
 *       201:
 *         description: Order successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 * /api/orders/user:
 *   post:
 *     tags:
 *       - Order Routes
 *     summary: Create a new order for authenticated user
 *     description: Creates a new order for authenticated user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/OrderProduct'
 *               comment:
 *                 type: string
 *                 default: ""
 *               userData:
 *                 $ref: '#/components/schemas/OrderUserData'
 *             required:
 *               - products
 *               - userData
 *     responses:
 *       201:
 *         description: Order successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *
 * /api/orders/{orderId}:
 *   patch:
 *     tags:
 *       - Order Routes
 *     summary: Update order status
 *     description: Updates the status of an order. Only accessible by admin users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *         description: The ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [processing, packing, success, declined]
 *             required:
 *               - status
 *     responses:
 *       200:
 *         description: Order successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Forbidden - only admin can update orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.get("/orders", authenticate, getUserOrders)
router.post("/orders", celebrate(createUserOrderSchema), createUserOrder)
router.post(
	"/orders/user",
	authenticate,
	celebrate(createUserOrderSchema),
	createUserOrderByUser
)
router.patch(
	"/orders/:orderId",
	authenticate,
	celebrate(patchOrderSchema),
	patchOrder
)

export default router
