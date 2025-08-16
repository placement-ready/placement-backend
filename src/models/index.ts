import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		name: String,
		email: String,
		password: String,
		profileImage: String,
		role: String, // "student" | "admin" | "recruiter"
		loginMethods: [String], // ["google", "credentials"]
		emailVerified: Date,
		lastLoginAt: Date,
		isBlocked: Boolean,
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);
export { User };

const accountSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		provider: String, // "google", "linkedin"
		providerId: String, // OAuth profile ID
		accessToken: String,
		refreshToken: String,
	},
	{
		timestamps: true,
	}
);

const Account = mongoose.model("Account", accountSchema);
export { Account };

const Session = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		refreshToken: String,
		expiresAt: Date,
	},
	{
		timestamps: true,
	}
);

const SessionModel = mongoose.model("Session", Session);
export { SessionModel };

const verificationTokenSchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User" },
		token: String,
		expiresAt: Date,
		type: String, // "email_verification" | "passwordReset"
	},
	{
		timestamps: true,
	}
);

const VerificationTokenModel = mongoose.model("VerificationToken", verificationTokenSchema);
export { VerificationTokenModel };

// Pre/Post Hooks
userSchema.pre("save", async function (next): Promise<void> {
	// Only hash the password if it has been modified (or is new)
	if (!this.isModified("password")) return next();

	try {
		const saltRounds = 12;
		const hashedPassword = await bcryptjs.hash(this.password ?? "", saltRounds);
		this.password = hashedPassword;
		next();
	} catch (error: any) {
		next(error);
	}
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
	try {
		return await bcryptjs.compare(candidatePassword, this.password);
	} catch (error) {
		throw new Error("Password comparison failed");
	}
};
