import { Request, Response } from "express";
import Controller from "./controller";
import SUser from "../services/user.service";
import IUser from "../interfaces/user.interface";

async function getSelf(req: Request, res: Response): Promise<void> {
	try {
		if (req.user) {
			const { _id } = <IUser>req.user;
			const user = await SUser.getById(_id);
			return Controller.sendSuccessResponse(res, user);
		} else {
			return Controller.sendSuccessResponse(res);
		}
	} catch (e) {
		return Controller.sendFailureResponse(res, e);
	}
}

export default {
	getSelf,
};
