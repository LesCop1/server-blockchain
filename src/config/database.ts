import mongoose from "mongoose";
import app from "../app";
import { MongoMemoryServer } from "mongodb-memory-server";

async function connect(): Promise<void> {
	let uri: string;
	if (app.get("env") === "production") {
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
			.then(() => resolve())
			.catch((err) => {
				throw Error(err);
			});
	});
}

async function disconnect(): Promise<void> {
	await mongoose.disconnect();
}

export default { connect, disconnect };
