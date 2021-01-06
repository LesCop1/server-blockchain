import { NextFunction, Request, Response } from "express";
import passport from "passport";
import Controller from "../controllers/controller";

function authHandler(req: Request, res: Response, next: NextFunction): void {
	return auth(req, res, next);
}

function auth(
	req: Request,
	res: Response,
	next: NextFunction,
	cb?: (req: Request, res: Response, next: NextFunction, user: unknown) => unknown
): void {
	passport.authenticate("local", function (err, user) {
		if (err) return Controller.sendFailureResponse(res, err);
		if (!user) return Controller.sendFailureResponse(res, new Error("Credentials do not match."));

		req.logIn(user, function (err) {
			if (err) {
				return Controller.sendFailureResponse(res, err);
			}

			if (cb) {
				return cb(req, res, next, user);
			} else {
				return next();
			}
		});
	})(req, res, next);
}

function signout(req: Request, _res: Response, next: NextFunction): void {
	req.logOut();

	return next();
}

function isAuth(req: Request, _res: Response, next: NextFunction): void {
	if (req.isAuthenticated()) return next();
	return;
}

export default { auth, signout, isAuth, authHandler };
