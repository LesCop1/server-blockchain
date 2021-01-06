import { Request, Response } from "express";
import Controller from "./controller";
import SUser from "../services/user.service";
import IUser from "../interfaces/user.interface";

async function getDashboard(req: Request, res: Response): Promise<void> {
	try {
		const { _id } = <IUser>req.user;
		const user = await SUser.getById(_id!);
		const stockPrices = new Array(20).fill({ date: null, value: null });
		for (let i = 0; i < stockPrices.length; i++) {
			stockPrices[i].date = new Date().setSeconds(3 * i);
			stockPrices[i].value = 5 + Math.random() * 5;
		}

		return Controller.sendSuccessResponse(res, { user, stockPrices });
	} catch (e) {
		return Controller.sendFailureResponse(res, e);
	}
}

async function getUserByEmail(req: Request, res: Response): Promise<void> {
	try {
		const user = await SUser.getByEmail(<string>req.query.email);
		return Controller.sendSuccessResponse(res, { user: user });
	} catch (e) {
		return Controller.sendFailureResponse(res, e);
	}
}

export default {
	getDashboard,
	getUserByEmail,
};
