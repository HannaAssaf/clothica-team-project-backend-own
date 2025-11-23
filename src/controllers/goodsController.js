import createHttpError from "http-errors"
import { Good } from "../models/good.js"
import { Category } from "../models/category.js"
import { Feedback } from "../models/feedback.js"
import mongoose from "mongoose"

export async function getAllGoods(req, res) {
	const {
		page = 1,
		perPage = 8,
		category,
		search,
		gender,
		price,
		color,
		sizes,
		sort,
	} = req.query

	const skip = (page - 1) * perPage

	const matches = {}

	if (gender) matches.gender = gender
	if (category) matches.category = new mongoose.Types.ObjectId(category)
	if (color) matches.colors = color
	if (sizes) matches.sizes = { $in: sizes.split(",") }

	if (price) {
		const [priceFrom, priceTo] = price.split(",").map(Number)
		matches["price.value"] = { $gte: priceFrom, $lte: priceTo }
	}

	if (search) {
		matches.$text = { $search: search }
	}

	const pipeline = [
		{ $match: matches },
		{
			$lookup: {
				from: "categories",
				localField: "category",
				foreignField: "_id",
				as: "category",
			},
		},
		{ $unwind: "$category" },
		{
			$lookup: {
				from: "feedbacks",
				localField: "_id",
				foreignField: "goodId",
				as: "feedbacks",
			},
		},
		{
			$addFields: {
				stars: {
					$cond: [
						{ $gt: [{ $size: "$feedbacks" }, 0] },
						{
							$divide: [
								{
									$round: [
										{
											$multiply: [
												{
													$avg: "$feedbacks.rate",
												},
												2,
											],
										},
									],
								},
								2,
							],
						},
						0,
					],
				},
				feedbacksCount: { $size: "$feedbacks" },
				feedbacks: {
					$map: {
						input: "$feedbacks",
						as: "f",
						in: {
							_id: "$$f._id",
							author: "$$f.author",
							date: "$$f.date",
							description: "$$f.description",
							rate: "$$f.rate",
							goodId: {
								_id: "$_id",
								name: "$name",
							},
						},
					},
				},
			},
		},
		{ $sort: sort ? { stars: -1, feedbacksCount: -1, _id: 1 } : { _id: -1 } },
		{ $project: { feedbacksCount: 0 } },
		{ $skip: Number(skip) },
		{ $limit: Number(perPage) },
	]

	const [goods, totalGoods] = await Promise.all([
		Good.aggregate(pipeline),
		Good.countDocuments(matches),
	])

	const totalPages = Math.ceil(totalGoods / perPage)

	res.status(200).json({
		page,
		perPage,
		totalGoods,
		totalPages,
		goods,
	})
}

export const getGoodById = async (req, res) => {
	const { goodId } = req.params

	const [good] = await Good.aggregate([
		{ $match: { _id: new mongoose.Types.ObjectId(String(goodId)) } },
		{
			$lookup: {
				from: "categories",
				localField: "category",
				foreignField: "_id",
				as: "category",
			},
		},
		{ $unwind: "$category" },
		{
			$lookup: {
				from: "feedbacks",
				localField: "_id",
				foreignField: "goodId",
				as: "feedbacks",
			},
		},
		{
			$addFields: {
				feedbacks: {
					$map: {
						input: "$feedbacks",
						as: "f",
						in: {
							_id: "$$f._id",
							author: "$$f.author",
							date: "$$f.date",
							description: "$$f.description",
							rate: "$$f.rate",
							goodId: {
								_id: "$_id",
								name: "$name",
							},
						},
					},
				},
				stars: {
					$cond: [
						{ $gt: [{ $size: "$feedbacks" }, 0] },
						{
							$divide: [
								{
									$round: [
										{
											$multiply: [
												{
													$avg: "$feedbacks.rate",
												},
												2,
											],
										},
									],
								},
								2,
							],
						},
						0,
					],
				},
			},
		},
		{
			$project: {
				name: 1,
				image: 1,
				category: { _id: 1, name: 1 },
				prevDescription: 1,
				colors: 1,
				sizes: 1,
				gender: 1,
				description: 1,
				price: 1,
				characteristics: 1,
				feedbacks: {
					_id: 1,
					author: 1,
					date: 1,
					description: 1,
					rate: 1,
					goodId: 1,
				},
				stars: 1,
			},
		},
	])

	if (!good) {
		throw createHttpError(404, "Good not found")
	}

	res.status(200).json(good)
}

export const getCategories = async (req, res) => {
	const { page = 1, perPage = 6 } = req.query
	const skip = (page - 1) * perPage

	const categoryQuery = Category.find()

	const [totalCategories, categories] = await Promise.all([
		categoryQuery.clone().countDocuments(),
		categoryQuery.skip(skip).limit(perPage),
	])

	const totalPages = Math.ceil(totalCategories / perPage)
	res.status(200).json({
		page,
		perPage,
		totalCategories,
		totalPages,
		categories,
	})
}

export const getCategory = async (req, res) => {
	const { categoryId } = req.params

	const category = await Category.findById(categoryId)

	if (!category) {
		throw createHttpError(404, "Category not found")
	}

	res.status(200).json(category)
}

export const getFeedbacks = async (req, res) => {
	const { page = 1, perPage = 6, goodId } = req.query
	const skip = (page - 1) * perPage

	const feedbackQuery = Feedback.find()

	if (goodId) {
		feedbackQuery.where("goodId").equals(goodId)
	}

	feedbackQuery.populate("goodId", "name")

	const [totalFeedbacks, feedbacks] = await Promise.all([
		feedbackQuery.clone().countDocuments(),
		feedbackQuery.skip(skip).limit(perPage),
	])

	const totalPages = Math.ceil(totalFeedbacks / perPage)
	res.status(200).json({
		page,
		perPage,
		totalFeedbacks,
		totalPages,
		feedbacks,
	})
}

export const createFeedback = async (req, res) => {
	const { author, description, rate, goodId } = req.body

	const date = new Date().toISOString().split("T")[0]

	const feedback = await Feedback.create({
		author,
		date,
		description,
		rate,
		goodId,
	})

	res.status(201).json(feedback)
}
