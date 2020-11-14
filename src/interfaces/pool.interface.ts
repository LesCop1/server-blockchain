import DBDocument from "./dbdocument.interface";
import IUser from "./user.interface";
import { PoolTypes } from "../globals";

export default interface IPool extends DBDocument {
	miners: string[] | IUser[];
	type: PoolTypes;
}
