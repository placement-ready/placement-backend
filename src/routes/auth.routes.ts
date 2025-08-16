import express from "express";
import { register, checkEmailExists, checkEmailVerification } from "../controllers/auth.controller";

const router = express.Router();

const authRoutes = () => {
	router.post("/register", register);
	router.get("/check-email/:email", checkEmailExists);
	router.get("/check-email-verification/:userId", checkEmailVerification);
	// router.post("/login",  login);
	// router.post("/logout",  logout);
	// router.get("/profile",  getProfile);
	// router.put("/profile",  updateProfile);
	// router.post("/forgot-password",  forgotPassword);
	// router.post("/reset-password",  resetPassword);
	// router.get("/verify-email/:token",  verifyEmail);

	return router;
};

export { authRoutes };
