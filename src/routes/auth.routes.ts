import express from "express";
import {
	register,
	login,
	refreshToken,
	logout,
	logoutAll,
	getProfile,
	checkEmailExists,
	checkEmailVerification,
} from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth";
import { ValidationUtils, authValidationRules } from "../utils/validation";

const router = express.Router();

const authRoutes = () => {
	// Public routes (no authentication required)
	router.post("/register", ValidationUtils.validateRequest(authValidationRules.register), register);
	router.post("/login", ValidationUtils.validateRequest(authValidationRules.login), login);
	router.post("/refresh-token", ValidationUtils.validateRequest(authValidationRules.refreshToken), refreshToken);
	router.post("/logout", ValidationUtils.validateRequest(authValidationRules.refreshToken), logout);

	// Utility routes
	router.get("/check-email/:email", checkEmailExists);
	router.get("/check-email-verification/:email", checkEmailVerification);

	// Protected routes (authentication required)
	router.get("/profile", authenticateToken, getProfile);
	router.post("/logout-all", authenticateToken, logoutAll);

	// router.put("/profile", authenticateToken, updateProfile);
	// router.post("/forgot-password", forgotPassword);
	// router.post("/reset-password", resetPassword);
	// router.get("/verify-email/:token", verifyEmail);
	// router.post("/change-password", authenticateToken, changePassword);

	return router;
};

export { authRoutes };
