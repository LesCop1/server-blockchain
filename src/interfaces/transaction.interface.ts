import DBDocument from "./dbdocument.interface";
import IUser from "./user.interface";
import IBlock from "./block.interface";

export default interface ITransaction extends DBDocument {
	from: string | IUser;
	to: string | IUser;
	amount: number[];
	type: "coin" | "usd";
	block?: string | IBlock;
}
