import DBDocument from "./dbdocument.interface";
import IUser from "./user.interface";

export default interface IPool extends DBDocument {
	miners: string[] | IUser[];
}
