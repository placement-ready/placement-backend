import express from "express";
import { getProfile } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth";
import { ValidationUtils, authValidationRules } from "../utils/validation";

const router = express.Router();

const userRoutes = () => {
	router.get("/profile", authenticateToken, getProfile);

	return router;
};

export { userRoutes };
