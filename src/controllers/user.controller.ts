import { Request, Response } from "express";
import moment from "moment";
import Controller from "./controller";
import SUser from "../services/user.service";
import IUser from "../interfaces/user.interface";

async function getDashboard(req: Request, res: Response): Promise<void> {
	try {
		const { _id } = <IUser>req.user;
		const user = await SUser.getById(_id!);
		// @ts-ignore
		const stockPrices = [];
		for (let i = 0; i < 20; i++) {
			const date = moment().seconds(i * 3);
			stockPrices.push({
				date: date.format("YYYY-MM-DD hh:mm:ss"),
				value: 5 + Math.random() * 5,
			});
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
