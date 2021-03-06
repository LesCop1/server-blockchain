import { NextFunction, Request, Response } from "express";
import Controller from "./controller";
import SUser from "../services/user.service";
import IUser from "../interfaces/user.interface";
import guard from "../utils/guard";

async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
	const { firstname, lastname, nationality, birthDate, email, password } = <IUser>req.body;
	try {
		const userExists = await SUser.getByEmail(email);
		if (userExists) {
			return Controller.sendFailureResponse(res, new Error("Email already in use."));
		} else {
			await SUser.create(firstname, lastname, nationality, <string>birthDate, email, password!);

			guard.auth(req, res, next, (_req1, res1, _next1, user) => {
				return Controller.sendSuccessResponse(res1, user);
			});
		}
	} catch (e) {
		return Controller.sendFailureResponse(res, e);
	}
}

function signin(_req: Request, res: Response): void {
	try {
		return Controller.sendSuccessResponse(res);
	} catch (e) {
		return Controller.sendFailureResponse(res, e);
	}
}

function signout(req: Request, res: Response): void {
	try {
		req.logOut();
		return Controller.sendSuccessResponse(res);
	} catch (err) {
		return Controller.sendFailureResponse(res, err);
	}
}

export default {
	signup,
	signin,
	signout,
};
