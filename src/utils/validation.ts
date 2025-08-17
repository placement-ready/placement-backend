import { Request, Response, NextFunction } from "express";

export interface ValidationRule {
	field: string;
	required?: boolean;
	type?: "string" | "number" | "email" | "boolean";
	minLength?: number;
	maxLength?: number;
	pattern?: RegExp;
	custom?: (value: any) => boolean | string;
}

export class ValidationUtils {
	// Validate email format
	static isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	// Validate password strength
	static isValidPassword(password: string): { valid: boolean; message?: string } {
		if (password.length < 8) {
			return { valid: false, message: "Password must be at least 8 characters long" };
		}

		if (password.length > 128) {
			return { valid: false, message: "Password must be less than 128 characters long" };
		}

		// Check for at least one number, one letter, and one special character
		const hasNumber = /\d/.test(password);
		const hasLetter = /[a-zA-Z]/.test(password);
		const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

		if (!hasNumber || !hasLetter || !hasSpecial) {
			return {
				valid: false,
				message: "Password must contain at least one number, one letter, and one special character",
			};
		}

		return { valid: true };
	}

	// Generic validation function
	static validateRequest(rules: ValidationRule[]) {
		return (req: Request, res: Response, next: NextFunction): void => {
			const errors: string[] = [];

			for (const rule of rules) {
				const value = req.body[rule.field];

				// Check if required field is present
				if (rule.required && (value === undefined || value === null || value === "")) {
					errors.push(`${rule.field} is required`);
					continue;
				}

				// Skip validation if field is not present and not required
				if (value === undefined || value === null || value === "") {
					continue;
				}

				// Type validation
				if (rule.type) {
					switch (rule.type) {
						case "string":
							if (typeof value !== "string") {
								errors.push(`${rule.field} must be a string`);
								continue;
							}
							break;
						case "number":
							if (typeof value !== "number" && isNaN(Number(value))) {
								errors.push(`${rule.field} must be a number`);
								continue;
							}
							break;
						case "email":
							if (typeof value !== "string" || !ValidationUtils.isValidEmail(value)) {
								errors.push(`${rule.field} must be a valid email address`);
								continue;
							}
							break;
						case "boolean":
							if (typeof value !== "boolean") {
								errors.push(`${rule.field} must be a boolean`);
								continue;
							}
							break;
					}
				}

				// Length validation
				if (rule.minLength && value.length < rule.minLength) {
					errors.push(`${rule.field} must be at least ${rule.minLength} characters long`);
				}

				if (rule.maxLength && value.length > rule.maxLength) {
					errors.push(`${rule.field} must be less than ${rule.maxLength} characters long`);
				}

				// Pattern validation
				if (rule.pattern && !rule.pattern.test(value)) {
					errors.push(`${rule.field} format is invalid`);
				}

				// Custom validation
				if (rule.custom) {
					const result = rule.custom(value);
					if (result !== true) {
						errors.push(typeof result === "string" ? result : `${rule.field} is invalid`);
					}
				}
			}

			if (errors.length > 0) {
				res.status(400).json({ error: "Validation failed", details: errors });
				return;
			}

			next();
		};
	}
}

// Predefined validation rules for common use cases
export const authValidationRules = {
	register: [
		{ field: "email", required: true, type: "email" as const },
		{
			field: "password",
			required: true,
			type: "string" as const,
			custom: (value: string) => {
				const result = ValidationUtils.isValidPassword(value);
				return result.valid || result.message || false;
			},
		},
		{ field: "name", required: false, type: "string" as const, maxLength: 100 },
		{
			field: "role",
			required: false,
			type: "string" as const,
			pattern: /^(student|admin|recruiter)$/,
		},
	],
	login: [
		{ field: "email", required: true, type: "email" as const },
		{ field: "password", required: true, type: "string" as const },
	],
	refreshToken: [{ field: "refreshToken", required: true, type: "string" as const }],
};
