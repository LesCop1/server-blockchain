import { Request, Response } from "express";
import Controller from "./controller";
import SUser from "../services/user.service";
import STransaction from "../services/transaction.service";
import BlockEventEmitter from "../events/BlockEventEmitter";
import IUser from "../interfaces/user.interface";

async function get(req: Request, res: Response): Promise<void> {
	try {
		const { _id } = <IUser>req.user;
		const userData = await SUser.getByEmail(_id!);

		return Controller.sendSuccessResponse(res, { user: userData });
	} catch (e) {
		return Controller.sendFailureResponse(res, e);
	}
}

async function create(req: Request, res: Response): Promise<void> {
	try {
		const { _id } = await STransaction.create(req.body.from, req.body.to, req.body.currency, req.body.amount);
		BlockEventEmitter.emit("transactionCreated", _id!);

		return Controller.sendSuccessResponse(res);
	} catch (e) {
		return Controller.sendFailureResponse(res, e);
	}
}

export default {
	get,
	create,
};
