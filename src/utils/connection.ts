import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/funds-backend";

export const connectMongo = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
};
