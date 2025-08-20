import { Request, Response } from "express";
import mongoose from "mongoose";
import { Account, User } from "../models";
import { randomBytes } from "crypto";

// Register a user via Google OAuth
// Stores only the provided data from frontend
export const googleRegister = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, name, image, accessToken, refreshToken, provider, providerId, emailVerified } = req.body;

		if (!email || !provider || !providerId || !accessToken || !refreshToken) {
			res.status(400).json({ error: "Missing required fields" });
			return;
		}

		// Check if user already exists
		let user = await User.findOne({ email });
		if (!user) {
			user = new User({
				_id: new mongoose.Types.ObjectId(),
				email,
				name,
				profileImage: image,
				role: "student",
				loginMethod: "google",
				emailVerified: emailVerified ? new Date(emailVerified) : undefined,
				isBlocked: false,
				isDeleted: false,
				password: randomBytes(16).toString("hex"),
			});
			await user.save();
		}

		// Store account info
		let account = await Account.findOne({ providerId });
		if (!account) {
			account = new Account({
				userId: user._id,
				provider,
				providerId,
				accessToken,
				refreshToken,
			});
			await account.save();
		}

		res.status(201).json({
			message: "Google user registered successfully",
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
				profileImage: user.profileImage,
				role: user.role,
				loginMethod: user.loginMethod,
				emailVerified: user.emailVerified,
			},
			account: {
				provider: account.provider,
				providerId: account.providerId,
				accessToken: account.accessToken,
				refreshToken: account.refreshToken,
			},
		});
	} catch (error: any) {
		console.error("Google Register Error:", error);
		res.status(500).json({ error: "Internal server error during Google registration" });
	}
};
