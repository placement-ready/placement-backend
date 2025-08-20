import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IProfile extends mongoose.Document {
	userId: mongoose.Types.ObjectId;
	name: string;
	email: string;
	phone?: string;
	image?: string;
	location?: string;
	bio?: string;
	skills?: string[];
	experience?: {
		company: string;
		role: string;
		description: string;
		type: string;
		duration: string;
	}[];
	education?: {
		institution: string;
		degree: string;
		fieldOfStudy: string;
		grade: string;
		startDate: Date;
		endDate: Date;
	}[];
	projects?: {
		title: string;
		description: string;
		technologies: string[];
		liveDemo: string;
		sourceCode: string;
	}[];
	achievements?: {
		title: string;
		description: string;
		category: string;
	}[];
	createdAt: Date;
	updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>({
	userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
	name: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String },
	image: { type: String },
	location: { type: String },
	bio: { type: String },
	skills: { type: [String] },
	experience: [
		{
			company: { type: String, required: true },
			role: { type: String, required: true },
			description: { type: String, required: true },
			type: { type: String, required: true },
			duration: { type: String, required: true },
		},
	],
	education: [
		{
			institution: { type: String, required: true },
			degree: { type: String, required: true },
			fieldOfStudy: { type: String, required: true },
			grade: { type: String, required: true },
			startDate: { type: Date, required: true },
			endDate: { type: Date, required: true },
		},
	],
	projects: [
		{
			title: { type: String, required: true },
			description: { type: String, required: true },
			technologies: { type: [String], required: true },
			liveDemo: { type: String, required: true },
			sourceCode: { type: String, required: true },
		},
	],
	achievements: [
		{
			title: { type: String, required: true },
			description: { type: String, required: true },
			category: { type: String, required: true },
		},
	],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);

export default Profile;
