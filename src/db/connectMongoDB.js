import mongoose from "mongoose"
import { Good } from "../models/good.js"

export async function connectMongoDB() {
	try {
		await mongoose.connect(process.env.MONGO_URL)
		await Good.syncIndexes()
		console.log("✅ MongoDB connection established successfully")
	} catch (error) {
		console.log("❌ Failed to connect to MongoDB: ", error.message)
		process.exit(1)
	}
}
