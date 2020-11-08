import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(winston.format.colorize(), winston.format.timestamp(), winston.format.json()),
	transports: [
		new DailyRotateFile({
			dirname: "logs",
			filename: "%DATE%.log",
			datePattern: "YYYY-MM-DD-HH",
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "14d",
		}),
	],
});

if (process.env.NODE_ENV !== "production") {
	logger.add(new winston.transports.Console());
}

export default logger;
