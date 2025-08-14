import { CorsOptions } from "cors";

interface ServerConfig {
	port: number | string;
	env: string;
}

interface ApiConfig {
	prefix: string;
	version: string;
}

interface AppConfig {
	server: ServerConfig;
	cors: CorsOptions;
	api: ApiConfig;
}

export const config: AppConfig = {
	// Server configuration
	server: {
		port: process.env.PORT || 5000,
		env: process.env.NODE_ENV || "development",
	},

	// CORS options
	cors: {
		origin: process.env.CORS_ORIGIN || "*",
		methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		allowedHeaders: ["Content-Type", "Authorization"],
	},

	// API configuration
	api: {
		prefix: "/api",
		version: "v1",
	},
};

export default config;
