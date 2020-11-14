import DBDocument from "./dbdocument.interface";
import ITransaction from "./transaction.interface";
import IPool from "./pool.interface";
import IUser from "./user.interface";

export default interface IBlock extends DBDocument {
	index: number;
	transactions: string[] | ITransaction[];
	pool: string | IPool;
	verification: [
		{
			controller?: string | IUser;
			result?: boolean;
		}
	];
	previousHash: string;
	hash: string;
}
