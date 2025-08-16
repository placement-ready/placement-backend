import { Request, Response } from "express";
import { User, Account, SessionModel, VerificationTokenModel } from "../models";

export const register = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;
		const user = new User({ username, email, password });
		await user.save();
		res.status(201).json({ message: "User registered successfully", user });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};

export const checkEmailExists = async (email: string) => {
	try {
		const user = await User.findOne({ email });
		return user !== null;
	} catch (error: any) {
		throw new Error(error.message);
	}
};

export const checkEmailVerification = async (userId: string) => {
	try {
		const token = await User.findOne({ _id: userId, emailVerified: null });
		return token === null;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
