import { Request, Response, NextFunction } from "express";
import { JwtUtils } from "../utils/jwt";
import { User } from "../models";

// Extend Request interface to include user
declare global {
	namespace Express {
		interface Request {
			user?: {
				userId: string;
				email: string;
				role: string;
			};
		}
	}
}

// Middleware to authenticate JWT tokens
export const authenticateToken = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const authHeader = req.headers.authorization;
		const token = JwtUtils.extractTokenFromHeader(authHeader);

		if (!token) {
			res.status(401).json({ error: "Access token required" });
			return;
		}

		// Verify the token
		const decoded = JwtUtils.verifyAccessToken(token);

		// Check if user still exists in database
		const user = await User.findById(decoded.userId);
		if (!user) {
			res.status(401).json({ error: "User no longer exists" });
			return;
		}

		// Check if user is blocked
		if (user.isBlocked) {
			res.status(403).json({ error: "Account is blocked" });
			return;
		}

		// Check if user is deleted
		if (user.isDeleted) {
			res.status(404).json({ error: "Account is deleted" });
			return;
		}

		// Attach user info to request
		req.user = {
			userId: decoded.userId,
			email: decoded.email,
			role: decoded.role,
		};

		next();
	} catch (error: any) {
		res.status(401).json({ error: error.message });
	}
};

// Middleware to authorize specific roles
export const authorizeRoles = (...roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		if (!req.user) {
			res.status(401).json({ error: "Authentication required" });
			return;
		}

		if (!roles.includes(req.user.role)) {
			res.status(403).json({ error: "Insufficient permissions" });
			return;
		}

		next();
	};
};
