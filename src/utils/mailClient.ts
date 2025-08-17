import { Resend } from "resend";
import config from "../config";

const resend = new Resend(config.mail.apiKey);

export const sendVerificationEmail = async (mail: string, code: string) => {
	try {
		const { data, error } = await resend.emails.send({
			from: config.mail.from,
			to: mail,
			subject: "Verification Code",
			html: `<p>Your verification code is: <strong>${code}</strong></p>`,
		});
		if (error) {
			console.error("Error sending verification email:", error);
		}
		return data;
	} catch (error) {
		console.error("Error sending verification email:", error);
	}
};
