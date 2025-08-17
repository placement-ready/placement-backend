import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config";

interface JwtPayload {
	userId: string;
	email: string;
	role: string;
}

interface TokenPair {
	accessToken: string;
	refreshToken: string;
}

export class JwtUtils {
	// Generate access token
	static generateAccessToken(payload: JwtPayload): string {
		const options: SignOptions = {
			expiresIn: config.jwt.expiresIn as any,
			issuer: "placement-backend",
			audience: "placement-frontend",
		};
		return jwt.sign(payload, config.jwt.secret, options);
	}

	// Generate refresh token
	static generateRefreshToken(payload: JwtPayload): string {
		const options: SignOptions = {
			expiresIn: config.jwt.refreshExpiresIn as any,
			issuer: "placement-backend",
			audience: "placement-frontend",
		};
		return jwt.sign(payload, config.jwt.refreshSecret, options);
	}

	// Generate both access and refresh tokens
	static generateTokenPair(payload: JwtPayload): TokenPair {
		return {
			accessToken: this.generateAccessToken(payload),
			refreshToken: this.generateRefreshToken(payload),
		};
	}

	// Verify access token
	static verifyAccessToken(token: string): JwtPayload {
		try {
			return jwt.verify(token, config.jwt.secret, {
				issuer: "placement-backend",
				audience: "placement-frontend",
			}) as JwtPayload;
		} catch (error) {
			throw new Error("Invalid or expired access token");
		}
	}

	// Verify refresh token
	static verifyRefreshToken(token: string): JwtPayload {
		try {
			return jwt.verify(token, config.jwt.refreshSecret, {
				issuer: "placement-backend",
				audience: "placement-frontend",
			}) as JwtPayload;
		} catch (error) {
			throw new Error("Invalid or expired refresh token");
		}
	}

	// Extract token from Authorization header
	static extractTokenFromHeader(authHeader: string | undefined): string | null {
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return null;
		}
		return authHeader.substring(7); // Remove "Bearer " prefix
	}

	// Get token expiration date
	static getTokenExpiration(token: string): Date | null {
		try {
			const decoded = jwt.decode(token) as any;
			if (decoded && decoded.exp) {
				return new Date(decoded.exp * 1000); // Convert to milliseconds
			}
			return null;
		} catch (error) {
			return null;
		}
	}
}
