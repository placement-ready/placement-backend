import { CorsOptions } from "cors";

interface ServerConfig {
	port: number | string;
	env: string;
}

interface ApiConfig {
	prefix: string;
	version: string;
}

interface JwtConfig {
	secret: string;
	refreshSecret: string;
	expiresIn: string;
	refreshExpiresIn: string;
}

interface DatabaseConfig {
	uri: string;
}

interface AppConfig {
	server: ServerConfig;
	cors: CorsOptions;
	api: ApiConfig;
	jwt: JwtConfig;
	database: DatabaseConfig;
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

	// JWT configuration
	jwt: {
		secret: process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production",
		refreshSecret:
			process.env.JWT_REFRESH_SECRET || "your-super-secret-refresh-key-change-in-production",
		expiresIn: process.env.JWT_EXPIRES_IN || "15m",
		refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
	},

	// Database configuration
	database: {
		uri: process.env.MONGODB_URI || "mongodb://localhost:27017/placement-db",
	},
};

export default config;
