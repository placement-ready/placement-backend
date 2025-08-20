import express from "express";
import { getProfile, updateProfile } from "../controllers/user.controller";
import { authenticateToken } from "../middleware/auth";
import { ValidationUtils, authValidationRules } from "../utils/validation";

const router = express.Router();

const userRoutes = () => {
	router.get("/profile", authenticateToken, getProfile);
	router.put("/profile", authenticateToken, updateProfile);

	return router;
};

export { userRoutes };
