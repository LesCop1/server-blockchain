import app from "./src/app";
import dotenv from "dotenv";
import database from "./src/config/database";

export default async function start(): Promise<void> {
	try {
		dotenv.config();
		await database.connect();
		app.listen(process.env.PORT, () => {
			// eslint-disable-next-line no-console
			console.log("API Ready");
		});
	} catch (error) {
		await database.disconnect();
	}
}

void start();
