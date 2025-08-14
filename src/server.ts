import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { config } from "./config";

// Load environment variables
dotenv.config();

const app: Express = express();

app.use("/api/health", async (req, res) => {
	res.status(200).json({ status: "Ok! Server is running" });
});

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 404 handler for undefined routes
app.use((req, res, next) => {
	res.status(404).json({
		error: {
			message: "Route not found",
			path: req.path,
		},
	});
});

export default app;
