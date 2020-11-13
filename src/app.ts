import express from "express";
import bodyParser from "body-parser";
import session, { SessionOptions } from "express-session";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import passportConfig from "./config/passport";
import routes from "./routes";

const MongoStore = connectMongo(session);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const sessionOpts: SessionOptions = {
	name: <string>process.env.SESSION_NAME,
	secret: <string>process.env.SESSION_SECRET,
	saveUninitialized: false,
	resave: false,
	// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	cookie: {
		maxAge: parseInt(<string>process.env.SESSION_MAXAGE),
	},
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
