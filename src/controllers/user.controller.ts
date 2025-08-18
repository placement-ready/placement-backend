import { Request, Response } from "express";
import { User } from "../models";
import Profile from "../models/profile";

// Get current user profile
export const getProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.user) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		const user = await User.findById(req.user.userId).select("-password");
		if (!user) {
			res.status(404).json({ error: "User not found" });
			return;
		}

		const profile = await Profile.findOne({ userId: user._id });
		if (!profile) {
			res.status(404).json({ error: "Profile not found" });
			return;
		}

		res.status(200).json({ ...profile });
	} catch (error: any) {
		console.error("Get profile error:", error);
		res.status(500).json({ error: "Internal server error while fetching profile" });
	}
};
