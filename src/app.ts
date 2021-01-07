import express from "express";
import session, { SessionOptions } from "express-session";
import mongoose from "mongoose";
import connectMongo from "connect-mongo";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import passportConfig from "./config/passport";
import routes from "./routes";

const MongoStore = connectMongo(session);

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

const sessionOpts: SessionOptions = {
	name: <string>process.env.SESSION_NAME,
	secret: <string>process.env.SESSION_SECRET,

	saveUninitialized: false,
	resave: false,
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	cookie: {
		maxAge: 604800000,
		httpOnly: false,
	},
	rolling: true,
};

if (process.env.NODE_ENV === "production") {
	app.set("trust proxy", 1);
	// @ts-ignore
	sessionOpts.cookie.secure = true;
}

app.use(session(sessionOpts));
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use(routes);

app.use("*", (_req, res) => {
	res.status(404).end();
});

export default app;
