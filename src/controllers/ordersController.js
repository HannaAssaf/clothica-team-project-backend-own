import { Order } from "../models/order.js"
import { Good } from "../models/good.js"
import createHttpError from "http-errors"

export const getUserOrders = async (req, res) => {
	const orders = await Order.find({
		$or: [{ userId: req.user._id }, { "userData.phone": req.user.phone }],
	})

	res.status(200).json(orders)
}

const getRandomNumber = (min, max) => {
	return Math.ceil(Math.random() * (max - min) + min)
}

export const createUserOrder = async (req, res) => {
	const { products, comment, userData } = req.body

	const date = new Date().toISOString().split("T")[0]
	const orderNum = getRandomNumber(1111111, 9999999)
	const ids = products.map(product => product.id)
	const goods = await Good.find().in("_id", ids)
	goods.forEach(good => (ids[good._id] = good))
	const sum = products.reduce((acc, product) => {
		if (ids[product.id]) acc += product.amount * ids[product.id].price.value
		return acc
	}, 0)

	const order = await Order.create({
		products,
		sum: Math.ceil(sum),
		date,
		orderNum,
		comment,
		userData,
	})

	res.status(201).json(order)
}

export const createUserOrderByUser = async (req, res) => {
	const { products, comment, userData } = req.body

	const date = new Date().toISOString().split("T")[0]
	const orderNum = getRandomNumber(1111111, 9999999)
	const ids = products.map(product => product.id)
	const goods = await Good.find().in("_id", ids)
	goods.forEach(good => (ids[good._id] = good))
	const sum = products.reduce((acc, product) => {
		if (ids[product.id]) acc += product.amount * ids[product.id].price.value
		return acc
	}, 0)

	const order = await Order.create({
		products,
		sum: Math.ceil(sum),
		date,
		userId: req.user._id,
		orderNum,
		comment,
		userData,
	})

	res.status(201).json(order)
}

export const patchOrder = async (req, res) => {
	const { orderId } = req.params
	const { status } = req.body

	if (req.user.role !== "admin") {
		throw createHttpError(403, "Access restricted")
	}

	const order = await Order.findByIdAndUpdate(
		orderId,
		{ status },
		{ new: true }
	)

	res.status(200).json(order)
}
