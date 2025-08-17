import mongoose from "mongoose";
import { config } from "../config";

export const connectMongo = async () => {
	try {
		await mongoose.connect(config.database.uri);
		console.log("Connected to MongoDB");
		console.log(`Database: ${config.database.uri}`);
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1);
	}
};
