import "dotenv/config";
import logger from "./src/logger";
import app from "./src/app";
import database from "./src/config/database";

export default async function start(): Promise<void> {
	try {
		logger.log("info", "Starting API");
		await database.connect();
		app.listen(process.env.PORT, () => {
			logger.log("info", "API Listening");
		});
	} catch (error) {
		logger.log("error", "An error occurs");
		await database.disconnect();
	}
}

void start();
