import express from "express";
import {
	register,
	login,
	refreshToken,
	logout,
	logoutAll,
	checkEmailExists,
	checkEmailVerification,
	createVerificationToken,
	verifyEmail,
} from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth";
import { ValidationUtils, authValidationRules } from "../utils/validation";

const router = express.Router();

const authRoutes = () => {
	// Public routes (no authentication required)
	router.post("/register", ValidationUtils.validateRequest(authValidationRules.register), register);
	router.post("/login", ValidationUtils.validateRequest(authValidationRules.login), login);
	router.post("/refresh-token", ValidationUtils.validateRequest(authValidationRules.refreshToken), refreshToken);
	router.post("/verify-email", verifyEmail);
	router.post("/create-verification-token", createVerificationToken);

	// Utility routes
	router.get("/check-email/:email", checkEmailExists);
	router.get("/check-email-verification/:email", checkEmailVerification);

	// Protected routes (authentication required)
	router.post("/logout", authenticateToken, logout);
	router.post("/logout-all", authenticateToken, logoutAll);

	return router;
};

export { authRoutes };
