import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import logger from "../logger";

async function connect(): Promise<void> {
	let uri: string;
	if (process.env.NODE_ENV === "production") {
		uri = `${<string>process.env.MONGO_URL}${<string>process.env.MONGO_NAME}`;
	} else {
		const mongod = new MongoMemoryServer();
		uri = await mongod.getUri();
	}

	await new Promise((resolve) => {
		mongoose
			.connect(uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				logger.log("info", "Successfully connected to DB");
				resolve();
			})
			.catch((err) => {
				logger.log("error", "Failed to connected to DB");
				throw Error(err);
			});
	});
}

async function disconnect(): Promise<void> {
	await mongoose
		.disconnect()
		.then(() => {
			logger.log("info", "Successfully disconnected to DB");
		})
		.catch((err) => {
			logger.log("error", "Failed to disconnected to DB");
			throw Error(err);
		});
}

export default { connect, disconnect };
