import dotenv from "dotenv";
import { config } from "./config";
import { connectMongo } from "./utils/connection";
dotenv.config();
import app from "./server";
const port = config.server.port;
const SERVER_START_MSG = `Server running on port: ${port}`;

(async () => {
	app.listen(port, () => {
		connectMongo();
		console.log(SERVER_START_MSG);
	});
})();
