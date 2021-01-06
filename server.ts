import "dotenv/config";
import http from "http";
import logger from "./src/logger";
import app from "./src/app";
import database from "./src/config/database";
import ws from "./src/websockets";

export default async function start(): Promise<void> {
	try {
		logger.log("info", "Creating server");
		const server = http.createServer(app);
		ws.init(server);
		await database.connect();
		server.listen(process.env.PORT, () => {
			logger.log("info", "Server now listening");
		});
	} catch (error) {
		logger.log("error", "An error occurred");
		await database.disconnect();
	}
}

void start();
