import DBDocument from "./dbdocument.interface";
import ITransaction from "./transaction.interface";
import IUser from "./user.interface";

export default interface IBlock extends DBDocument {
	index: number;
	transactions: string[] | ITransaction[];
	pools: string[];
	verifications: [
		{
			controller: string | IUser;
			nonce: number;
		}?
	];
	previousHash: string;
	hash?: string;
	nonce?: number;
}
